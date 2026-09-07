import * as admin from 'firebase-admin';

interface RecommendRequest {
  shopId: string;
  occasion?: string;
  budget?: string;
  style?: string;
  color?: string;
  size?: string;
}

function parseBudget(budgetStr?: string): { min: number; max: number } {
  if (!budgetStr) return { min: 0, max: Infinity };
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

export async function handleRecommendProducts(data: RecommendRequest) {
  const db = admin.firestore();
  const { shopId, occasion, budget, style, color, size } = data;

  if (!shopId) {
    throw new Error('shopId is required.');
  }

  // 1. Fetch available products belonging to this shop from Firestore
  const productsSnap = await db.collection('products')
    .where('shopId', '==', shopId)
    .where('isAvailable', '==', true)
    .get();

  if (productsSnap.empty) {
    return { recommendations: [], totalCandidates: 0 };
  }

  const allProducts = productsSnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as any[];

  // 2. Filter available products (stock > 0)
  const inStock = allProducts.filter(p => p.stockQuantity > 0);

  // 3. Filter by budget
  const { min, max } = parseBudget(budget);
  let candidates = inStock.filter(p => p.price >= min && p.price <= max);
  if (candidates.length < 3) {
    candidates = inStock; // Expand to ensure suggestions
  }

  // 4. Attempt secure Gemini 1.5 Flash API call
  const geminiApiKey = process.env.GEMINI_API_KEY;
  let aiResults: { productId: string; reason: string; reasonBn: string }[] | null = null;

  if (geminiApiKey) {
    try {
      const prompt = `You are an expert personal stylist at a local boutique in Kolkata during Durga Puja.
Rank the following real boutique inventory products for a shopper with these preferences:
- Occasion: ${occasion || 'Puja'}
- Budget: ${budget || 'Any'}
- Style: ${style || 'Traditional'}
- Colour tone: ${color || 'Any'}
- Size: ${size || 'Any'}

Candidate Products:
${JSON.stringify(candidates.map(c => ({
  id: c.id,
  name: c.name,
  category: c.category,
  price: c.price,
  styles: c.styleTags || [],
  occasions: c.occasionTags || [],
  colours: c.colours || []
})), null, 2)}

Return strict JSON with schema:
{
  "recommendations": [
    {
      "productId": "string",
      "reason": "Short 1-sentence explanation of match in English",
      "reasonBn": "Short 1-sentence explanation of match in Bengali"
    }
  ]
}
Select top 3 products. Do not invent products.`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
        })
      });

      if (res.ok) {
        const body: any = await res.json();
        const text = body?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed.recommendations)) {
            // Security invariant: Validate that every productId exists in candidates and belongs to shopId
            aiResults = parsed.recommendations.filter((r: any) =>
              candidates.some(c => c.id === r.productId)
            );
          }
        }
      }
    } catch (err) {
      console.warn('Gemini call failed, falling back to deterministic ranker:', err);
    }
  }

  // 5. Fallback deterministic ranking (Section 17)
  if (!aiResults || aiResults.length === 0) {
    const scored = candidates.map(product => {
      let score = 0;
      const reasonsEn: string[] = [];
      const reasonsBn: string[] = [];

      if (product.price >= min && product.price <= max) {
        score += 25;
        reasonsEn.push(`Fits your ${budget} budget`);
        reasonsBn.push(`আপনার ${budget} বাজেটের মধ্যে`);
      }

      if (occasion && Array.isArray(product.occasionTags)) {
        if (product.occasionTags.some((o: string) => o.toLowerCase() === occasion.toLowerCase())) {
          score += 30;
          reasonsEn.push(`matches ${occasion}`);
          reasonsBn.push(`${occasion}-এর জন্য সেরা`);
        }
      }

      if (style && Array.isArray(product.styleTags)) {
        if (product.styleTags.some((s: string) => s.toLowerCase() === style.toLowerCase())) {
          score += 20;
          reasonsEn.push(`${style.toLowerCase()} style`);
          reasonsBn.push(`${style} স্টাইল`);
        }
      }

      if (color && color !== 'Any colour' && Array.isArray(product.colours)) {
        if (product.colours.some((c: string) => c.toLowerCase().includes(color.toLowerCase()))) {
          score += 15;
          reasonsEn.push(`${color.toLowerCase()} shade`);
          reasonsBn.push(`${color} শেড`);
        }
      }

      if (size && Array.isArray(product.sizes)) {
        if (product.sizes.includes(size) || product.sizes.includes('Free Size')) {
          score += 10;
        }
      }

      return {
        product,
        score,
        reason: reasonsEn.length ? reasonsEn.join(', ') + '.' : 'Curated match from current boutique inventory.',
        reasonBn: reasonsBn.length ? reasonsBn.join(', ') + '।' : 'দোকানের বর্তমান স্টক থেকে বাছাই করা লুক।'
      };
    });

    scored.sort((a, b) => b.score - a.score);
    aiResults = scored.slice(0, 3).map(s => ({
      productId: s.product.id,
      reason: s.reason,
      reasonBn: s.reasonBn
    }));
  }

  // Fetch authoritative records and assemble response
  const finalRecommendations = aiResults.slice(0, 3).map(rec => {
    const prod = candidates.find(c => c.id === rec.productId);
    return {
      productId: rec.productId,
      product: prod,
      reason: rec.reason,
      reasonBn: rec.reasonBn
    };
  }).filter(r => !!r.product);

  return {
    recommendations: finalRecommendations,
    totalCandidates: candidates.length,
    noteEn: finalRecommendations.length < 3 ? "We found fewer matches. Try adjusting your preferences." : undefined,
    noteBn: finalRecommendations.length < 3 ? "কম ম্যাচ পাওয়া গেছে। অন্য বাজেট বা স্টাইল বেছে দেখুন।" : undefined
  };
}
