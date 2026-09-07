import { Product, UserPreferences, RecommendationResponse, RecommendedItem } from '../../types';
import { getShopProducts } from './shopService';

function parseBudget(budgetStr: string): { min: number; max: number } {
  const clean = budgetStr.replace(/[₹,\s]/g, '');
  if (clean.includes('+')) {
    const min = parseInt(clean.replace('+', ''), 10) || 7000;
    return { min, max: Infinity };
  }
  if (clean.includes('–') || clean.includes('-')) {
    const parts = clean.split(/[–-]/);
    return {
      min: parseInt(parts[0], 10) || 0,
      max: parseInt(parts[1], 10) || Infinity,
    };
  }
  return { min: 0, max: Infinity };
}

/**
 * Deterministic scoring function (Section 17: AI Fallback requirement)
 */
export function scoreProductLocally(product: Product, preferences: UserPreferences): {
  score: number;
  reasonEn: string;
  reasonBn: string;
} {
  let score = 0;
  const reasonsEn: string[] = [];
  const reasonsBn: string[] = [];

  const { min, max } = parseBudget(preferences.budget);

  // 1. Budget Match (+25)
  if (product.price >= min && product.price <= max) {
    score += 25;
    reasonsEn.push(`Fits your ${preferences.budget} budget`);
    reasonsBn.push(`আপনার ${preferences.budget} বাজেটের মধ্যে`);
  } else if (product.price < min) {
    score += 15;
  } else if (product.price <= max * 1.15) {
    score += 10;
  }

  // 2. Occasion Match (+30)
  const occKey = (preferences.occasion || 'puja').toLowerCase();
  const hasOccasion = product.occasionTags.some(t => t.toLowerCase() === occKey);
  if (hasOccasion) {
    score += 30;
    reasonsEn.push(`matches ${preferences.occasion}`);
    reasonsBn.push(`${preferences.occasion}-এর জন্য সেরা`);
  }

  // 3. Style Match (+20)
  const styleKey = (preferences.style || 'traditional').toLowerCase();
  const hasStyle = product.styleTags.some(t => t.toLowerCase() === styleKey);
  if (hasStyle) {
    score += 20;
    reasonsEn.push(`${preferences.style.toLowerCase()} aesthetic`);
    reasonsBn.push(`${preferences.style} স্টাইল`);
  }

  // 4. Colour Match (+15)
  if (preferences.color && preferences.color !== 'Any') {
    const colKey = preferences.color.toLowerCase();
    const hasColour = product.colours.some(c => c.toLowerCase().includes(colKey));
    if (hasColour) {
      score += 15;
      reasonsEn.push(`${preferences.color.toLowerCase()} palette`);
      reasonsBn.push(`${preferences.color} শেড`);
    }
  }

  // 5. Size Available (+10)
  if (preferences.size) {
    if (product.sizes.includes(preferences.size) || product.sizes.includes('Free Size')) {
      score += 10;
    }
  }

  const reasonEn = reasonsEn.length > 0 
    ? reasonsEn.join(', ') + '.' 
    : 'Curated match from current boutique inventory.';
  const reasonBn = reasonsBn.length > 0 
    ? reasonsBn.join(', ') + '।' 
    : 'দোকানের বর্তমান স্টক থেকে বাছাই করা লুক।';

  return { score, reasonEn, reasonBn };
}

/**
 * Recommends products strictly from the specified shop's inventory.
 * Attempts server-side Cloud Function / API call first, falling back to local deterministic ranking.
 */
export async function fetchRecommendations(
  shopId: string,
  preferences: UserPreferences
): Promise<RecommendationResponse> {
  // Try server-side Cloud Function / API first
  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopId, ...preferences })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.recommendations)) {
        return {
          recommendations: data.recommendations.map((r: any) => ({
            productId: r.id || r.productId,
            product: r.product || r,
            reason: r.match_reason || r.reason || 'Fits your preferences.',
            reasonBn: r.match_reason_bn || r.reasonBn || 'আপনার পছন্দের সাথে মানানসই।'
          })),
          totalCandidates: data.totalCandidates || data.recommendations.length,
          noteEn: data.noteEn || data.note_en,
          noteBn: data.noteBn || data.note_bn
        };
      }
    }
  } catch (err) {
    console.warn('Server-side recommendation unavailable, falling back to deterministic ranker:', err);
  }

  // Deterministic Fallback Pipeline (Section 14 & 17)
  const allProducts = await getShopProducts(shopId);

  // Invariant check: ensure every product belongs to shopId and isAvailable with stockQuantity > 0
  const available = allProducts.filter(p => p.shopId === shopId && p.isAvailable && p.stockQuantity > 0);

  if (available.length === 0) {
    return {
      recommendations: [],
      totalCandidates: 0,
      noteEn: "This shop hasn't added available products yet.",
      noteBn: "দোকানে বর্তমানে পর্যাপ্ত স্টক উপলব্ধ নেই।"
    };
  }

  // Budget filtering
  const { min, max } = parseBudget(preferences.budget);
  let candidates = available.filter(p => p.price >= min && p.price <= max);

  // If strict budget gives fewer than 3, expand slightly so customer gets suggestions
  if (candidates.length < 3) {
    const broader = available.filter(p => p.price >= min * 0.7 && p.price <= max * 1.3);
    candidates = Array.from(new Set([...candidates, ...broader]));
    if (candidates.length === 0) candidates = available;
  }

  // Score all candidates
  const scored = candidates.map(product => {
    const { score, reasonEn, reasonBn } = scoreProductLocally(product, preferences);
    return { product, score, reasonEn, reasonBn };
  });

  scored.sort((a, b) => b.score - a.score);

  const top3 = scored.slice(0, 3);
  const recommendations: RecommendedItem[] = top3.map(item => ({
    productId: item.product.id,
    product: item.product,
    reason: item.reasonEn,
    reasonBn: item.reasonBn
  }));

  return {
    recommendations,
    totalCandidates: candidates.length,
    noteEn: recommendations.length < 3 ? "We found fewer matches. Try adjusting your preferences." : undefined,
    noteBn: recommendations.length < 3 ? "কম ম্যাচ পাওয়া গেছে। অন্য বাজেট বা স্টাইল বেছে দেখুন।" : undefined
  };
}

export async function getRecommendations(
  shopId: string,
  preferences: UserPreferences,
  lang: string = 'en'
): Promise<RecommendedItem[]> {
  const res = await fetchRecommendations(shopId, preferences);
  return res.recommendations;
}
