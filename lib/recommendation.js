// Puja Look — AI Recommendation Engine
// Combines Gemini 1.5 Flash API with deterministic fallback ranking
// Strictly ranks ONLY actual products from the boutique's database

const store = require('../data/store');

/**
 * Budget range parser helper
 */
function parseBudgetRange(budgetStr) {
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
      max: parseInt(parts[1], 10) || Infinity
    };
  }
  return { min: 0, max: Infinity };
}

/**
 * Deterministic scoring algorithm
 */
function scoreProduct(product, preferences) {
  let score = 0;
  const reasonsEn = [];
  const reasonsBn = [];

  const { min, max } = parseBudgetRange(preferences.budget);

  // 1. Budget match (+30 points)
  if (product.price >= min && product.price <= max) {
    score += 30;
    reasonsEn.push(`Fits your ${preferences.budget} budget`);
    reasonsBn.push(`আপনার ${preferences.budget} বাজেটের মধ্যে`);
  } else if (product.price < min) {
    score += 15; // lower than budget is okay
  } else if (product.price <= max * 1.15) {
    score += 10; // slightly above budget
  }

  // 2. Occasion match (+25 points)
  if (preferences.occasion && Array.isArray(product.occasions)) {
    const occMatch = product.occasions.some(o => 
      o.toLowerCase() === preferences.occasion.toLowerCase()
    );
    if (occMatch) {
      score += 25;
      reasonsEn.push(`ideal for ${preferences.occasion}`);
      reasonsBn.push(`${preferences.occasion}-এর জন্য সেরা`);
    }
  }

  // 3. Style match (+20 points)
  if (preferences.style && Array.isArray(product.styles)) {
    const styleMatch = product.styles.some(s => 
      s.toLowerCase() === preferences.style.toLowerCase()
    );
    if (styleMatch) {
      score += 20;
      reasonsEn.push(`${preferences.style.toLowerCase()} aesthetic`);
      reasonsBn.push(`${preferences.style} ঘরানার স্টাইল`);
    }
  }

  // 4. Colour tone match (+15 points)
  if (preferences.colour && preferences.colour !== 'Any colour') {
    if (product.colour_tone && product.colour_tone.toLowerCase() === preferences.colour.toLowerCase()) {
      score += 15;
      reasonsEn.push(`${preferences.colour.toLowerCase()} colour palette`);
      reasonsBn.push(`${preferences.colour} রঙের সম্ভার`);
    } else if (Array.isArray(product.colours)) {
      const colMatch = product.colours.some(c => 
        c.toLowerCase().includes(preferences.colour.toLowerCase())
      );
      if (colMatch) {
        score += 15;
        reasonsEn.push(`${preferences.colour.toLowerCase()} shade`);
        reasonsBn.push(`${preferences.colour} শেড`);
      }
    }
  }

  // 5. Size availability (+10 points)
  if (preferences.size && Array.isArray(product.sizes)) {
    if (product.sizes.includes(preferences.size) || product.sizes.includes('Free Size')) {
      score += 10;
    }
  }

  // Generate composite match reasons
  const matchReasonEn = reasonsEn.length > 0 
    ? reasonsEn.join(', ') + '.'
    : 'Curated match from current boutique inventory.';
  const matchReasonBn = reasonsBn.length > 0
    ? reasonsBn.join(', ') + '।'
    : 'দোকানের বর্তমান স্টক থেকে বাছাই করা লুক।';

  return { score, matchReasonEn, matchReasonBn };
}

/**
 * Call Gemini 1.5 Flash API if key is available
 */
async function callGeminiRanking(candidates, preferences) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const candidateSummary = candidates.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    styles: p.styles,
    occasions: p.occasions,
    colours: p.colours
  }));

  const prompt = `You are an expert fashion stylist at Maa Tara Bastralaya, an authentic ethnic boutique in Gariahat, Kolkata.
Rank the following real boutique inventory products for a shopper visiting during Durga Puja with these preferences:
- Occasion: ${preferences.occasion || 'Puja'}
- Budget: ${preferences.budget || 'Any'}
- Style: ${preferences.style || 'Traditional'}
- Colour tone: ${preferences.colour || 'Any'}
- Size: ${preferences.size || 'Any'}

Candidate Products (ONLY select from these IDs, DO NOT invent any product):
${JSON.stringify(candidateSummary, null, 2)}

Return a strict JSON object with this exact schema:
{
  "recommendations": [
    {
      "product_id": "valid_candidate_id",
      "match_reason": "Short 1-sentence explanation of why it matches preferences",
      "match_reason_bn": "Short 1-sentence explanation in authentic Bengali"
    }
  ]
}
Select top 3 products. If fewer than 3 fit, return all suitable ones.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    if (!Array.isArray(parsed.recommendations)) return null;

    // Validate that every product_id actually exists in candidates
    const validRecs = parsed.recommendations.filter(r => 
      candidates.some(c => c.id === r.product_id)
    );

    return validRecs.length > 0 ? validRecs : null;
  } catch (err) {
    console.warn('Gemini API call failed, falling back to deterministic ranker:', err.message);
    return null;
  }
}

/**
 * Main recommendation entrypoint
 */
async function getRecommendations(preferences = {}) {
  // Step 1 & 2: Fetch and filter available products with stock
  const allAvailable = store.getProducts({ availableOnly: true });

  if (allAvailable.length === 0) {
    return {
      recommendations: [],
      total_candidates: 0,
      note_en: "This shop hasn't added available products yet.",
      note_bn: "দোকানে বর্তমানে পর্যাপ্ত স্টক উপলব্ধ নেই।"
    };
  }

  // Step 3: Filter by budget band if specified
  const { min, max } = parseBudgetRange(preferences.budget);
  let candidates = allAvailable.filter(p => p.price >= min && p.price <= max);

  // If strict budget yields fewer than 3 items, expand slightly to avoid empty state
  if (candidates.length < 3) {
    const broader = allAvailable.filter(p => p.price >= min * 0.7 && p.price <= max * 1.3);
    candidates = [...new Set([...candidates, ...broader])];
    if (candidates.length === 0) candidates = allAvailable;
  }

  // Step 4: Filter by size where applicable
  if (preferences.size) {
    const sizeMatches = candidates.filter(p => 
      p.sizes.includes(preferences.size) || p.sizes.includes('Free Size')
    );
    if (sizeMatches.length >= 3) {
      candidates = sizeMatches;
    }
  }

  // Step 5: Try Gemini AI Ranking
  let aiResults = await callGeminiRanking(candidates, preferences);

  let finalProducts = [];
  let noteEn = "";
  let noteBn = "";

  if (aiResults && aiResults.length > 0) {
    // Map AI results to real product records
    for (const rec of aiResults.slice(0, 3)) {
      const prod = store.getProductById(rec.product_id);
      if (prod) {
        finalProducts.push({
          ...prod,
          match_reason: rec.match_reason || 'Fits your preferences.',
          match_reason_bn: rec.match_reason_bn || 'আপনার পছন্দের সাথে মানানসই।'
        });
      }
    }
  }

  // Fallback: Deterministic Ranking
  if (finalProducts.length === 0) {
    const scored = candidates.map(product => {
      const { score, matchReasonEn, matchReasonBn } = scoreProduct(product, preferences);
      return {
        product,
        score,
        matchReasonEn,
        matchReasonBn
      };
    });

    scored.sort((a, b) => b.score - a.score);

    const top3 = scored.slice(0, 3);
    finalProducts = top3.map(item => ({
      ...item.product,
      match_reason: item.matchReasonEn,
      match_reason_bn: item.matchReasonBn
    }));
  }

  // Check if fewer than 3
  if (finalProducts.length < 3) {
    noteEn = "We found fewer matches. Try adjusting your preferences.";
    noteBn = "কম ম্যাচ পাওয়া গেছে। অন্য বাজেট বা স্টাইল বেছে দেখুন।";
  }

  return {
    recommendations: finalProducts,
    total_candidates: candidates.length,
    note_en: noteEn,
    note_bn: noteBn
  };
}

module.exports = {
  getRecommendations,
  scoreProduct,
  parseBudgetRange
};
