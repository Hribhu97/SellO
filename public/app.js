// Puja Look — Mobile-First Client Application
// Bengali / English bilingual, guest-first boutique discovery flow

// --- BILINGUAL TRANSLATION DICTIONARY ---
const I18N = {
  en: {
    storeName: "Maa Tara Bastralaya",
    storeLocation: "Gariahat, Kolkata",
    landingEyebrow: "Pujo Festive Collection 2024",
    landingTitle: `Find your <br><em class="text-terracotta font-normal italic">Pujor look.</em>`,
    landingSubtitle: "Tell us what you're looking for. We'll help you find something you'll love from our racks right now.",
    landingTrustTitle: "Actual In-Store Stock",
    landingTrustSub: "Every recommendation is hanging on the racks at Gariahat today.",
    startDiscoveryText: "Find My Puja Look",
    browseAllText: "Browse Complete Collection",
    backText: "Back",
    
    // Screen 2
    intentHeading: `What are you <br><em class="text-terracotta font-normal italic">shopping for?</em>`,
    intentSubtitle: "Select the primary occasion for your outfit.",
    intentContinueText: "Continue",
    occasions: {
      "Puja": { label: "Puja", desc: "Anjali, evening pandal hopping, rituals", icon: "sparkles" },
      "Dinner": { label: "Dinner", desc: "Family feasts, festive restaurant outings", icon: "utensils" },
      "Family function": { label: "Family function", desc: "Get-togethers, Bijoya greetings", icon: "users" },
      "Office": { label: "Office", desc: "Pre-Puja festivities, ethnic workwear", icon: "briefcase" },
      "Going out": { label: "Going out", desc: "Casual hangout with friends, city lights", icon: "compass" }
    },

    // Screen 3
    prefHeading: `Your fit & <br><em class="text-terracotta font-normal italic">budget.</em>`,
    prefSubtitle: "Minimum details to pinpoint exact matches on the racks.",
    prefBudgetLabel: "Budget",
    prefStyleLabel: "Style Aesthetic",
    prefColourLabel: "Colour Tone",
    prefSizeLabel: "Size",
    findMatchesText: "Find My Look",
    styles: {
      "Traditional": "Traditional",
      "Modern": "Modern",
      "Fusion": "Fusion",
      "Simple": "Simple"
    },
    colours: {
      "Any colour": "Any colour",
      "Light": "Light / Pastel",
      "Dark": "Dark / Deep",
      "Festive": "Festive / Red / Gold"
    },

    // Screen 4
    recsHeading: `Your Puja <em class="text-terracotta font-normal italic">shortlist</em>`,
    recsSubtitle: "We found a few looks that match your preferences from our racks.",
    adjustFiltersText: "Adjust Preferences",
    candidateCountTag: "In-Store Matches",
    recsLoadingText: "Checking Maa Tara Bastralaya rack inventory...",
    recsNoteText: "We found fewer matches. Try adjusting your preferences.",
    viewLookText: "View Look",
    whyItMatchesLabel: "Why it matches",
    availableSizesLabel: "Sizes",
    restartFlowText: "Start with a different occasion",

    // Screen 5
    backToRecsText: "Back to Recommendations",
    finalPriceLabel: "Final price",
    detailStockStatus: "Available on Rack",
    detailSizeLabel: "Select Size for Trial",
    detailColourLabel: "Available Colours",
    detailDescLabel: "About this Piece",
    reserveAtCounterBtnText: "Reserve at Counter",

    // Screen 6
    reserveHeading: `Reserve this <br><em class="text-terracotta font-normal italic">look.</em>`,
    reserveSubtitle: "Staff will pull this item and have it ready for your trial. No advance payment needed.",
    resNameLabel: "Your Name",
    resPhoneLabel: "Mobile Number",
    resPhoneHint: "We only use this to identify your reservation at the counter.",
    confirmResBtnText: "Confirm Reservation",
    errPhoneInvalid: "Please enter a valid 10-digit mobile number.",
    errNameRequired: "Please enter your name.",

    // Screen 7
    confHeading: `Your item is <em class="text-terracotta font-normal italic">reserved.</em>`,
    confSubtitle: "Show this reservation ID at the counter to try on your selected piece.",
    confIdLabel: "Reservation ID",
    confItemLabel: "Item",
    confSizeColorLabel: "Size & Colour",
    confPriceLabel: "Payable Price",
    confInstructions: "Ask for <strong>Bapi Da</strong> at Counter 3. Held for 2 hours. Not an advance payment or guaranteed indefinite hold.",
    getDirectionsText: "Get Directions to Store",
    findAnotherText: "Find Another Look",

    // Screen 8
    browseHeading: `Boutique <em class="text-terracotta font-normal italic">Collection</em>`
  },

  bn: {
    storeName: "মা তারা বস্ত্রালয়",
    storeLocation: "গড়িয়াহাট, কলকাতা",
    landingEyebrow: "পুজো উৎসব সম্ভার ২০২৪",
    landingTitle: `আপনার পুজোর <br><em class="text-terracotta font-normal italic">লুক খুঁজুন।</em>`,
    landingSubtitle: "আপনি কী খুঁজছেন জানান। আমাদের বর্তমান স্টক থেকে সেরা পোশাকটি খুঁজে দেব।",
    landingTrustTitle: "দোকানের আসল স্টক",
    landingTrustSub: "প্রতিটি প্রস্তাবিত পোশাকই আজ গড়িয়াহাটের দোকানে মজুত রয়েছে।",
    startDiscoveryText: "আমার পুজোর লুক খুঁজুন",
    browseAllText: "সম্পূর্ণ কালেকশন দেখুন",
    backText: "পেছনে",
    
    // Screen 2
    intentHeading: `কী উপলক্ষের জন্য <br><em class="text-terracotta font-normal italic">কেনাকাটা করছেন?</em>`,
    intentSubtitle: "আপনার পোশাকের প্রধান উপলক্ষটি বেছে নিন।",
    intentContinueText: "এগিয়ে যান",
    occasions: {
      "Puja": { label: "পুজো / অঞ্জলি", desc: "সকালের অঞ্জলি, সন্ধ্যার আরতি ও ঘোরা", icon: "sparkles" },
      "Dinner": { label: "সান্ধ্য ডিনার", desc: "পারিবারিক ভোজ, উৎসবের রেস্তোরাঁ", icon: "utensils" },
      "Family function": { label: "পারিবারিক অনুষ্ঠান", desc: "বিজয়ার শুভেচ্ছা বিনিময় ও মিলনমেলা", icon: "users" },
      "Office": { label: "অফিস ও কর্মক্ষেত্র", desc: "অফিস পুজো উৎসব ও এথনিক দিন", icon: "briefcase" },
      "Going out": { label: "ঘোরাঘুরি ও আড্ডা", desc: "বন্ধুদের সঙ্গে প্যান্ডেল হপিং ও আড্ডা", icon: "compass" }
    },

    // Screen 3
    prefHeading: `আপনার সাইজ ও <br><em class="text-terracotta font-normal italic">বাজেট।</em>`,
    prefSubtitle: "র্যাকের সঠিক পোশাকটি খুঁজে বের করার জন্য প্রয়োজনীয় তথ্য।",
    prefBudgetLabel: "বাজেট",
    prefStyleLabel: "স্টাইল",
    prefColourLabel: "রঙের পছন্দ",
    prefSizeLabel: "সাইজ",
    findMatchesText: "আমার লুক খুঁজুন",
    styles: {
      "Traditional": "ঐতিহ্যবাহী",
      "Modern": "আধুনিক",
      "Fusion": "ফিউশন",
      "Simple": "ছিমছাম"
    },
    colours: {
      "Any colour": "যেকোনো রঙ",
      "Light": "হালকা / প্যাস্টেল",
      "Dark": "গাঢ় / উজ্জ্বল",
      "Festive": "উৎসবের / লাল / সোনালী"
    },

    // Screen 4
    recsHeading: `আপনার পুজোর <em class="text-terracotta font-normal italic">শর্টলিস্ট</em>`,
    recsSubtitle: "আমাদের স্টক থেকে আপনার পছন্দের সাথে মিলে যাওয়া সেরা লুক।",
    adjustFiltersText: "পছন্দ পরিবর্তন করুন",
    candidateCountTag: "স্টকে পাওয়া গেছে",
    recsLoadingText: "মা তারা বস্ত্রালয়ের র্যাক খোঁজা হচ্ছে...",
    recsNoteText: "কম ম্যাচ পাওয়া গেছে। অন্য বাজেট বা স্টাইল বেছে দেখুন।",
    viewLookText: "লুকটি দেখুন",
    whyItMatchesLabel: "কেন এটি মানানসই",
    availableSizesLabel: "সাইজ",
    restartFlowText: "অন্য কোনো উপলক্ষের জন্য খুঁজুন",

    // Screen 5
    backToRecsText: "তালিকায় ফিরে যান",
    finalPriceLabel: "ধার্য মূল্য",
    detailStockStatus: "দোকানের র্যাকে মজুত",
    detailSizeLabel: "ট্রায়ালের জন্য সাইজ বেছে নিন",
    detailColourLabel: "উপলব্ধ রঙ",
    detailDescLabel: "পোশাকের বিবরণ",
    reserveAtCounterBtnText: "কাউন্টারে বুক করুন",

    // Screen 6
    reserveHeading: `এই পোশাকটি <br><em class="text-terracotta font-normal italic">বুক করুন।</em>`,
    reserveSubtitle: "কাউন্টার স্টাফ আপনার ট্রায়ালের জন্য পোশাকটি আলাদা করে রাখবেন। কোনো অগ্রিম অর্থ লাগবে না।",
    resNameLabel: "আপনার নাম",
    resPhoneLabel: "মোবাইল নম্বর",
    resPhoneHint: "কাউন্টারে আপনার রিজার্ভেশন শনাক্ত করতে কেবল এই নম্বরটি লাগবে।",
    confirmResBtnText: "রিজার্ভেশন নিশ্চিত করুন",
    errPhoneInvalid: "অনুগ্রহ করে সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন।",
    errNameRequired: "অনুগ্রহ করে আপনার নাম লিখুন।",

    // Screen 7
    confHeading: `আপনার পোশাকটি <em class="text-terracotta font-normal italic">বুক হয়েছে।</em>`,
    confSubtitle: "কাউন্টারে এই রিজার্ভেশন নম্বরটি দেখিয়ে পোশাকটি ট্রায়াল রুমে নিন।",
    confIdLabel: "রিজার্ভেশন নম্বর",
    confItemLabel: "পোশাক",
    confSizeColorLabel: "সাইজ ও রঙ",
    confPriceLabel: "পরিশোধযোগ্য মূল্য",
    confInstructions: "কাউন্টার ৩-এ <strong>বাপি দা</strong>-এর কাছে এই আইডি দেখান। ২ ঘণ্টার জন্য সংরক্ষিত। কোনো অগ্রিম পেমেন্ট নেই।",
    getDirectionsText: "দোকানের ম্যাপ দেখুন",
    findAnotherText: "অন্য পোশাক খুঁজুন",

    // Screen 8
    browseHeading: `দোকানের সম্পূর্ণ <em class="text-terracotta font-normal italic">কালেকশন</em>`
  }
};

// --- APPLICATION STATE ---
const state = {
  currentLang: localStorage.getItem('puja_look_lang') || 'en',
  shop: null,
  preferences: {
    occasion: null,
    budget: '₹2,000–₹4,000',
    style: 'Traditional',
    colour: 'Festive',
    size: 'M'
  },
  recommendations: [],
  selectedProduct: null,
  selectedSize: null,
  selectedColour: null,
  latestReservation: null,
  allProducts: [],
  catalogCategory: 'all',
  merchantReservations: [],
  merchantTab: 'reservations'
};

// Available Options Configuration
const BUDGET_OPTIONS = ['₹1,000–₹2,000', '₹2,000–₹4,000', '₹4,000–₹7,000', '₹7,000+'];
const STYLE_OPTIONS = ['Traditional', 'Modern', 'Fusion', 'Simple'];
const COLOUR_OPTIONS = ['Any colour', 'Light', 'Dark', 'Festive'];
const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL'];

// Toast Notification Helper
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('appToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
  }, 3000);
}

// Analytics Event Logger
async function trackEvent(eventName, payload = {}) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_name: eventName, payload })
    });
  } catch (err) {
    // Fail silently, guest privacy preserved
  }
}

// Screen Transition Navigator
function showScreen(screenId) {
  document.querySelectorAll('.screen-view').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(screenId);
  if (!target) return;
  target.classList.remove('hidden');

  // Update progress bar
  const progBar = document.getElementById('flowProgressBar');
  const progFill = document.getElementById('flowProgressFill');
  if (screenId === 'screenIntent') {
    progBar.classList.remove('hidden');
    progFill.style.width = '50%';
  } else if (screenId === 'screenPreferences') {
    progBar.classList.remove('hidden');
    progFill.style.width = '100%';
  } else {
    progBar.classList.add('hidden');
    progFill.style.width = '0%';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  refreshIcons();
}

function refreshIcons() {
  if (window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
}

// --- LANGUAGE TRANSLATIONS RENDERER ---
function setLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('puja_look_lang', lang);

  const t = I18N[lang];
  const isBn = lang === 'bn';

  // Toggle button indicator
  document.getElementById('langLabelEn').className = isBn ? 'text-muted font-medium' : 'text-terracotta font-bold';
  document.getElementById('langLabelBn').className = isBn ? 'text-terracotta font-bold' : 'text-muted font-medium';

  // Store header
  document.getElementById('navStoreName').textContent = isBn && state.shop?.name_bn ? state.shop.name_bn : t.storeName;
  document.getElementById('navStoreLocation').textContent = isBn && state.shop?.location_bn ? state.shop.location_bn : t.storeLocation;

  // Screen 1: Landing
  document.getElementById('landingEyebrow').textContent = t.landingEyebrow;
  document.getElementById('landingTitle').innerHTML = t.landingTitle;
  document.getElementById('landingSubtitle').textContent = t.landingSubtitle;
  document.getElementById('landingTrustTitle').textContent = t.landingTrustTitle;
  document.getElementById('landingTrustSub').textContent = t.landingTrustSub;
  document.getElementById('startDiscoveryText').textContent = t.startDiscoveryText;
  document.getElementById('browseAllText').textContent = t.browseAllText;

  // Screen 2: Intent
  document.getElementById('intentHeading').innerHTML = t.intentHeading;
  document.getElementById('intentSubtitle').textContent = t.intentSubtitle;
  document.getElementById('intentContinueText').textContent = t.intentContinueText;
  renderIntentOptions();

  // Screen 3: Preferences
  document.getElementById('prefHeading').innerHTML = t.prefHeading;
  document.getElementById('prefSubtitle').textContent = t.prefSubtitle;
  document.getElementById('prefBudgetLabel').textContent = t.prefBudgetLabel;
  document.getElementById('prefStyleLabel').textContent = t.prefStyleLabel;
  document.getElementById('prefColourLabel').textContent = t.prefColourLabel;
  document.getElementById('prefSizeLabel').textContent = t.prefSizeLabel;
  document.getElementById('findMatchesText').textContent = t.findMatchesText;
  renderPreferenceChips();

  // Screen 4: Recommendations
  document.getElementById('recsHeading').innerHTML = t.recsHeading;
  document.getElementById('recsSubtitle').textContent = t.recsSubtitle;
  document.getElementById('adjustFiltersText').textContent = t.adjustFiltersText;
  document.getElementById('candidateCountTag').textContent = t.candidateCountTag;
  document.getElementById('recsLoadingText').textContent = t.recsLoadingText;
  document.getElementById('recsNoteText').textContent = t.recsNoteText;
  document.getElementById('restartFlowBtn').textContent = t.restartFlowText;
  if (state.recommendations.length > 0) renderRecommendations(state.recommendations);

  // Screen 5: Detail
  document.getElementById('backToRecsText').textContent = t.backToRecsText;
  document.getElementById('finalPriceLabel').textContent = t.finalPriceLabel;
  document.getElementById('detailStockStatus').textContent = t.detailStockStatus;
  document.getElementById('detailSizeLabel').textContent = t.detailSizeLabel;
  document.getElementById('detailColourLabel').textContent = t.detailColourLabel;
  document.getElementById('detailDescLabel').textContent = t.detailDescLabel;
  document.getElementById('reserveAtCounterBtnText').textContent = t.reserveAtCounterBtnText;
  if (state.selectedProduct) renderProductDetail(state.selectedProduct);

  // Screen 6: Reservation Form
  document.getElementById('reserveHeading').innerHTML = t.reserveHeading;
  document.getElementById('reserveSubtitle').textContent = t.reserveSubtitle;
  document.getElementById('resNameLabel').textContent = t.resNameLabel;
  document.getElementById('resPhoneLabel').textContent = t.resPhoneLabel;
  document.getElementById('resPhoneHint').textContent = t.resPhoneHint;
  document.getElementById('confirmResBtnText').textContent = t.confirmResBtnText;

  // Screen 7: Confirmation
  document.getElementById('confHeading').innerHTML = t.confHeading;
  document.getElementById('confSubtitle').textContent = t.confSubtitle;
  document.getElementById('confIdLabel').textContent = t.confIdLabel;
  document.getElementById('confItemLabel').textContent = t.confItemLabel;
  document.getElementById('confSizeColorLabel').textContent = t.confSizeColorLabel;
  document.getElementById('confPriceLabel').textContent = t.confPriceLabel;
  document.getElementById('confInstructions').innerHTML = t.confInstructions;
  document.getElementById('getDirectionsText').textContent = t.getDirectionsText;
  document.getElementById('findAnotherText').textContent = t.findAnotherText;

  // Screen 8: Catalog
  document.getElementById('browseHeading').innerHTML = t.browseHeading;
  if (state.allProducts.length > 0) renderCatalog(state.allProducts);

  // Update back buttons text
  document.querySelectorAll('.back-text').forEach(el => el.textContent = t.backText);

  trackEvent('language_selected', { language: lang });
  refreshIcons();
}

// --- RENDER SCREEN 2: OCCASION INTENT CARDS ---
function renderIntentOptions() {
  const container = document.getElementById('intentOptionsContainer');
  if (!container) return;
  const t = I18N[state.currentLang];

  container.innerHTML = Object.entries(t.occasions).map(([key, occ]) => {
    const isSelected = state.preferences.occasion === key;
    return `
      <button class="intent-card w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
        isSelected 
          ? 'bg-terracotta/10 border-terracotta text-ink shadow-sm' 
          : 'bg-warm border-line hover:border-terracotta/40 hover:bg-cream'
      }" data-occasion="${key}">
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center ${
            isSelected ? 'bg-terracotta text-white' : 'bg-cream text-muted border border-line'
          }">
            <i data-lucide="${occ.icon}" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="text-sm font-bold text-ink">${occ.label}</h4>
            <p class="text-[11px] text-muted leading-tight">${occ.desc}</p>
          </div>
        </div>
        <div class="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
          isSelected ? 'border-terracotta bg-terracotta text-white' : 'border-line bg-warm'
        }">
          ${isSelected ? '<i data-lucide="check" class="w-3 h-3"></i>' : ''}
        </div>
      </button>
    `;
  }).join('');

  // Bind click
  container.querySelectorAll('.intent-card').forEach(btn => {
    btn.addEventListener('click', () => {
      state.preferences.occasion = btn.dataset.occasion;
      renderIntentOptions();
      const continueBtn = document.getElementById('intentContinueBtn');
      continueBtn.removeAttribute('disabled');
      continueBtn.classList.remove('opacity-40', 'pointer-events-none');
    });
  });

  refreshIcons();
}

// --- RENDER SCREEN 3: PREFERENCE CHIPS ---
function renderPreferenceChips() {
  const t = I18N[state.currentLang];

  // 1. Budget Chips
  const budgetContainer = document.getElementById('budgetChipsContainer');
  budgetContainer.innerHTML = BUDGET_OPTIONS.map(b => {
    const isSel = state.preferences.budget === b;
    return `
      <button type="button" class="pref-chip pref-budget-chip p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
        isSel ? 'bg-terracotta text-white border-terracotta shadow-sm' : 'bg-warm border-line text-ink hover:bg-cream'
      }" data-val="${b}">${b}</button>
    `;
  }).join('');
  budgetContainer.querySelectorAll('.pref-budget-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.preferences.budget = btn.dataset.val;
      renderPreferenceChips();
    });
  });

  // 2. Style Chips
  const styleContainer = document.getElementById('styleChipsContainer');
  styleContainer.innerHTML = STYLE_OPTIONS.map(s => {
    const isSel = state.preferences.style === s;
    const label = t.styles[s] || s;
    return `
      <button type="button" class="pref-chip pref-style-chip p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
        isSel ? 'bg-terracotta text-white border-terracotta shadow-sm' : 'bg-warm border-line text-ink hover:bg-cream'
      }" data-val="${s}">${label}</button>
    `;
  }).join('');
  styleContainer.querySelectorAll('.pref-style-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.preferences.style = btn.dataset.val;
      renderPreferenceChips();
    });
  });

  // 3. Colour Chips
  const colourContainer = document.getElementById('colourChipsContainer');
  colourContainer.innerHTML = COLOUR_OPTIONS.map(c => {
    const isSel = state.preferences.colour === c;
    const label = t.colours[c] || c;
    return `
      <button type="button" class="pref-chip pref-colour-chip p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
        isSel ? 'bg-terracotta text-white border-terracotta shadow-sm' : 'bg-warm border-line text-ink hover:bg-cream'
      }" data-val="${c}">${label}</button>
    `;
  }).join('');
  colourContainer.querySelectorAll('.pref-colour-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.preferences.colour = btn.dataset.val;
      renderPreferenceChips();
    });
  });

  // 4. Size Chips
  const sizeContainer = document.getElementById('sizeChipsContainer');
  sizeContainer.innerHTML = SIZE_OPTIONS.map(sz => {
    const isSel = state.preferences.size === sz;
    return `
      <button type="button" class="pref-chip pref-size-chip py-2.5 rounded-lg border text-xs font-bold text-center transition-all ${
        isSel ? 'bg-terracotta text-white border-terracotta shadow-sm' : 'bg-warm border-line text-ink hover:bg-cream'
      }" data-val="${sz}">${sz}</button>
    `;
  }).join('');
  sizeContainer.querySelectorAll('.pref-size-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.preferences.size = btn.dataset.val;
      renderPreferenceChips();
    });
  });
}

// --- RENDER SCREEN 4: 3 RECOMMENDATIONS CARDS ---
function renderRecommendations(products) {
  const container = document.getElementById('recsListContainer');
  const t = I18N[state.currentLang];
  const isBn = state.currentLang === 'bn';

  if (!products || products.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center">
        <p class="text-sm text-muted mb-4">No matching looks found for this criteria.</p>
        <button class="back-to-screen px-4 py-2 rounded-xl bg-terracotta text-white text-xs font-semibold" data-target="screenPreferences">
          Adjust Preferences
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map((prod, idx) => {
    const name = isBn && prod.name_bn ? prod.name_bn : prod.name;
    const matchReason = isBn && prod.match_reason_bn ? prod.match_reason_bn : prod.match_reason;
    const sizes = Array.isArray(prod.sizes) ? prod.sizes.join(', ') : 'Standard';

    return `
      <article class="rec-card bg-cream border border-line rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
        <!-- Photo Container -->
        <div class="aspect-[4/3] w-full bg-creamDark relative overflow-hidden">
          <img src="${prod.image_url}" alt="${name}" class="w-full h-full object-cover">
          <span class="absolute top-2.5 left-2.5 bg-warm/95 backdrop-blur-sm border border-line text-[10px] font-mono px-2 py-0.5 rounded text-ink uppercase tracking-wider">
            Look 0${idx + 1}
          </span>
          <span class="absolute bottom-2.5 right-2.5 bg-ink/80 text-warm text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
            ${prod.category}
          </span>
        </div>

        <!-- Card Content -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-baseline justify-between gap-2">
              <h3 class="font-serif text-lg font-bold text-ink leading-snug">${name}</h3>
              <span class="text-base font-bold font-mono text-terracotta shrink-0">₹${Number(prod.price).toLocaleString('en-IN')}</span>
            </div>

            <!-- Sizes & Colours meta -->
            <div class="flex items-center gap-2 mt-2 text-[11px] text-muted">
              <span><strong>${t.availableSizesLabel}:</strong> ${sizes}</span>
              <span>•</span>
              <span>${prod.colours?.[0] || 'Festive'}</span>
            </div>

            <!-- Why it matches (Explicit master prompt requirement) -->
            <div class="mt-3 p-2.5 rounded-lg bg-goldLight border border-gold/40 text-[11px] text-ink/85 leading-relaxed flex items-start gap-2">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-gold shrink-0 mt-0.5"></i>
              <div>
                <strong class="font-semibold block text-[10px] text-gold uppercase tracking-wider">${t.whyItMatchesLabel}:</strong>
                <span>${matchReason}</span>
              </div>
            </div>
          </div>

          <!-- View Look CTA Button -->
          <div class="mt-4 pt-3 border-t border-line/60">
            <button class="view-look-btn w-full py-3 rounded-xl bg-ink hover:bg-black text-warm text-xs font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98]" data-id="${prod.id}">
              <span>${t.viewLookText}</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Bind View Look click
  container.querySelectorAll('.view-look-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prodId = btn.dataset.id;
      const product = products.find(p => p.id === prodId) || state.allProducts.find(p => p.id === prodId);
      if (product) {
        state.selectedProduct = product;
        state.selectedSize = product.sizes?.[0] || 'M';
        state.selectedColour = product.colours?.[0] || 'Festive';
        renderProductDetail(product);
        showScreen('screenProductDetail');
        trackEvent('product_viewed', { product_id: prodId, price: product.price });
      }
    });
  });

  refreshIcons();
}

// --- RENDER SCREEN 5: PRODUCT DETAIL ---
function renderProductDetail(product) {
  if (!product) return;
  const isBn = state.currentLang === 'bn';
  const name = isBn && product.name_bn ? product.name_bn : product.name;
  const desc = isBn && product.description_bn ? product.description_bn : product.description;
  const matchReason = isBn && product.match_reason_bn ? product.match_reason_bn : (product.match_reason || 'Fits your preferences from our boutique collection.');

  document.getElementById('detailImage').src = product.image_url;
  document.getElementById('detailCategory').textContent = product.category;
  document.getElementById('detailName').textContent = name;
  document.getElementById('detailFinalPrice').textContent = `₹${Number(product.price).toLocaleString('en-IN')}`;
  document.getElementById('detailMatchReason').textContent = matchReason;
  document.getElementById('detailDescription').textContent = desc;

  // Sizes selector
  const sizeContainer = document.getElementById('detailSizesContainer');
  sizeContainer.innerHTML = (product.sizes || ['Free Size']).map(sz => {
    const isSel = state.selectedSize === sz;
    return `
      <button class="detail-size-chip px-3.5 py-2 rounded-lg border text-xs font-bold transition-all ${
        isSel ? 'bg-terracotta text-white border-terracotta shadow-sm' : 'bg-warm border-line text-ink hover:bg-cream'
      }" data-size="${sz}">${sz}</button>
    `;
  }).join('');
  sizeContainer.querySelectorAll('.detail-size-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedSize = btn.dataset.size;
      renderProductDetail(product);
    });
  });

  // Colours selector
  const colourContainer = document.getElementById('detailColoursContainer');
  colourContainer.innerHTML = (product.colours || ['Festive']).map(col => {
    const isSel = state.selectedColour === col;
    return `
      <button class="detail-colour-chip px-3.5 py-2 rounded-lg border text-xs font-medium transition-all ${
        isSel ? 'bg-terracotta text-white border-terracotta shadow-sm' : 'bg-warm border-line text-ink hover:bg-cream'
      }" data-col="${col}">${col}</button>
    `;
  }).join('');
  colourContainer.querySelectorAll('.detail-colour-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedColour = btn.dataset.col;
      renderProductDetail(product);
    });
  });

  refreshIcons();
}

// --- RENDER SCREEN 8: CATALOGUE (BROWSE COLLECTION) ---
function renderCatalog(products) {
  const container = document.getElementById('catalogGrid');
  const countEl = document.getElementById('catalogCount');
  const isBn = state.currentLang === 'bn';

  let filtered = products;
  if (state.catalogCategory !== 'all') {
    filtered = products.filter(p => p.category.toLowerCase() === state.catalogCategory.toLowerCase());
  }

  if (countEl) countEl.textContent = `${filtered.length} Items`;

  container.innerHTML = filtered.map(prod => {
    const name = isBn && prod.name_bn ? prod.name_bn : prod.name;
    return `
      <div class="cat-item-card bg-cream border border-line rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all flex flex-col justify-between" data-id="${prod.id}">
        <div class="aspect-square w-full bg-creamDark overflow-hidden">
          <img src="${prod.image_url}" alt="${name}" class="w-full h-full object-cover">
        </div>
        <div class="p-2.5">
          <p class="text-[9px] font-mono text-muted uppercase tracking-wider">${prod.category}</p>
          <h4 class="text-xs font-bold text-ink truncate mt-0.5">${name}</h4>
          <p class="text-xs font-bold font-mono text-terracotta mt-1">₹${Number(prod.price).toLocaleString('en-IN')}</p>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.cat-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const prod = products.find(p => p.id === card.dataset.id);
      if (prod) {
        state.selectedProduct = prod;
        state.selectedSize = prod.sizes?.[0] || 'M';
        state.selectedColour = prod.colours?.[0] || 'Festive';
        renderProductDetail(prod);
        showScreen('screenProductDetail');
        trackEvent('product_viewed', { product_id: prod.id, price: prod.price });
      }
    });
  });

  refreshIcons();
}

// --- RENDER SCREEN 9: MERCHANT DASHBOARD ---
async function loadMerchantData() {
  try {
    const [statsRes, resRes, prodRes] = await Promise.all([
      fetch('/api/stats').then(r => r.json()),
      fetch('/api/reservations').then(r => r.json()),
      fetch('/api/products').then(r => r.json())
    ]);

    if (statsRes.success) {
      document.getElementById('statPendingRes').textContent = statsRes.stats.pendingReservations;
      document.getElementById('statConfirmedRes').textContent = statsRes.stats.confirmedReservations;
      document.getElementById('statAvailableProd').textContent = statsRes.stats.availableProducts;
      document.getElementById('statTotalProd').textContent = statsRes.stats.totalProducts;
      document.getElementById('tabResCount').textContent = statsRes.stats.totalReservations;
      document.getElementById('tabInvCount').textContent = statsRes.stats.totalProducts;
    }

    if (resRes.success) {
      state.merchantReservations = resRes.reservations;
      renderMerchantReservations(resRes.reservations);
    }

    if (prodRes.success) {
      state.allProducts = prodRes.products;
      renderMerchantProductList(prodRes.products);
    }
  } catch (err) {
    console.error('Error loading merchant data:', err);
  }
}

function renderMerchantReservations(reservations) {
  const container = document.getElementById('merchantReservationsPanel');
  if (!reservations || reservations.length === 0) {
    container.innerHTML = `<p class="text-xs text-muted text-center py-8">No reservations recorded yet.</p>`;
    return;
  }

  container.innerHTML = reservations.map(res => {
    let statusClass = 'bg-gold/20 text-gold border-gold/30';
    if (res.status === 'Confirmed') statusClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (res.status === 'Collected') statusClass = 'bg-blue-100 text-blue-800 border-blue-300';
    if (res.status === 'Cancelled') statusClass = 'bg-red-100 text-red-800 border-red-300';

    return `
      <div class="p-3.5 rounded-xl bg-warm border border-line space-y-2">
        <div class="flex items-center justify-between pb-2 border-b border-line/60">
          <div>
            <span class="text-[10px] font-mono font-bold text-terracotta">${res.id}</span>
            <p class="text-xs font-bold text-ink">${res.customer_name} <span class="text-muted font-normal">(${res.customer_phone})</span></p>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${statusClass}">${res.status}</span>
        </div>
        <div class="flex justify-between items-center text-xs">
          <div>
            <p class="font-medium text-ink">${res.product_name}</p>
            <p class="text-[11px] text-muted">${res.selected_size} • ${res.selected_colour}</p>
          </div>
          <span class="font-bold font-mono text-terracotta">₹${Number(res.final_price).toLocaleString('en-IN')}</span>
        </div>
        <!-- Status Action Buttons -->
        <div class="flex gap-1.5 pt-2 border-t border-line/40">
          <button class="status-action-btn flex-1 py-1.5 rounded bg-cream hover:bg-creamDark text-[10px] font-semibold text-ink border border-line" data-id="${res.id}" data-status="Confirmed">Confirm</button>
          <button class="status-action-btn flex-1 py-1.5 rounded bg-cream hover:bg-creamDark text-[10px] font-semibold text-emerald-800 border border-line" data-id="${res.id}" data-status="Collected">Collected</button>
          <button class="status-action-btn flex-1 py-1.5 rounded bg-cream hover:bg-creamDark text-[10px] font-semibold text-red-800 border border-line" data-id="${res.id}" data-status="Cancelled">Cancel</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.status-action-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const resId = btn.dataset.id;
      const status = btn.dataset.status;
      try {
        const r = await fetch(`/api/reservations/${resId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        if (r.ok) {
          showToast(`Reservation ${resId} marked ${status}`);
          loadMerchantData();
        }
      } catch (err) {
        showToast('Failed to update status');
      }
    });
  });
}

function renderMerchantProductList(products) {
  const container = document.getElementById('merchantProductList');
  container.innerHTML = products.map(p => `
    <div class="p-3 rounded-xl bg-warm border border-line flex items-center justify-between gap-3">
      <div class="w-12 h-14 rounded-lg bg-cream border border-line overflow-hidden shrink-0">
        <img src="${p.image_url}" alt="${p.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-ink truncate">${p.name}</h4>
        <p class="text-[11px] text-muted">${p.category} • ₹${Number(p.price).toLocaleString('en-IN')}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[10px] font-mono ${p.is_available && p.stock_quantity > 0 ? 'text-emerald-700' : 'text-red-700'}">
            ${p.is_available && p.stock_quantity > 0 ? `Stock: ${p.stock_quantity}` : 'Unavailable'}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <button class="edit-prod-btn p-2 text-muted hover:text-ink rounded-lg bg-cream" data-id="${p.id}" title="Edit">
          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
        </button>
        <button class="delete-prod-btn p-2 text-red-600 hover:text-red-800 rounded-lg bg-cream" data-id="${p.id}" title="Delete">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Bind Edit
  container.querySelectorAll('.edit-prod-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = products.find(p => p.id === btn.dataset.id);
      if (prod) openProductModal(prod);
    });
  });

  // Bind Delete
  container.querySelectorAll('.delete-prod-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to remove this item?')) return;
      try {
        const res = await fetch(`/api/products/${btn.dataset.id}`, { method: 'DELETE' });
        if (res.ok) {
          showToast('Product removed');
          loadMerchantData();
        }
      } catch (err) {
        showToast('Failed to delete product');
      }
    });
  });

  refreshIcons();
}

function openProductModal(prod = null) {
  const modal = document.getElementById('productEditModal');
  const title = document.getElementById('modalProductTitle');
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  if (prod) {
    title.textContent = 'Edit Product';
    document.getElementById('editProdId').value = prod.id;
    document.getElementById('editProdName').value = prod.name;
    document.getElementById('editProdNameBn').value = prod.name_bn || '';
    document.getElementById('editProdCategory').value = prod.category;
    document.getElementById('editProdPrice').value = prod.price;
    document.getElementById('editProdImg').value = prod.image_url;
    document.getElementById('editProdStock').value = prod.stock_quantity;
    document.getElementById('editProdAvailable').value = String(prod.is_available);
    document.getElementById('editProdSizes').value = Array.isArray(prod.sizes) ? prod.sizes.join(', ') : prod.sizes;
    document.getElementById('editProdColours').value = Array.isArray(prod.colours) ? prod.colours.join(', ') : prod.colours;
    document.getElementById('editProdDesc').value = prod.description || '';
    document.getElementById('editProdDescBn').value = prod.description_bn || '';
  } else {
    title.textContent = 'Add New Product';
    document.getElementById('productEditForm').reset();
    document.getElementById('editProdId').value = '';
    document.getElementById('editProdImg').value = "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=80";
  }
}

function closeProductModal() {
  const modal = document.getElementById('productEditModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// --- INITIALIZATION & EVENT BINDINGS ---
async function initApp() {
  // Fetch Store Info
  try {
    const shopRes = await fetch('/api/shop').then(r => r.json());
    if (shopRes.success) state.shop = shopRes.shop;
  } catch (err) {
    console.warn('Using default store info');
  }

  // Fetch initial catalogue
  try {
    const prodRes = await fetch('/api/products').then(r => r.json());
    if (prodRes.success) state.allProducts = prodRes.products;
  } catch (err) {
    console.warn('Using fallback catalogue');
  }

  // Set initial language
  setLanguage(state.currentLang);

  // Track initial QR Opened event
  trackEvent('qr_opened', { timestamp: new Date().toISOString() });

  // 1. Language Toggle Click
  document.getElementById('langToggleBtn')?.addEventListener('click', () => {
    const nextLang = state.currentLang === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
    showToast(nextLang === 'bn' ? 'বাংলা ভাষা সক্রিয় করা হয়েছে' : 'Switched to English');
  });

  // 2. Staff Toggle
  document.getElementById('staffToggleBtn')?.addEventListener('click', () => {
    showScreen('screenMerchant');
    loadMerchantData();
    trackEvent('merchant_view_opened');
  });
  document.getElementById('exitMerchantBtn')?.addEventListener('click', () => {
    showScreen('screenLanding');
  });

  // 3. Back buttons
  document.querySelectorAll('.back-to-screen').forEach(btn => {
    btn.addEventListener('click', () => {
      showScreen(btn.dataset.target);
    });
  });

  // 4. Start Discovery
  document.getElementById('startDiscoveryBtn')?.addEventListener('click', () => {
    showScreen('screenIntent');
    trackEvent('intent_started');
  });

  // 5. Browse Collection
  document.getElementById('browseAllBtn')?.addEventListener('click', () => {
    renderCatalog(state.allProducts);
    showScreen('screenAllProducts');
    trackEvent('browse_all_opened');
  });

  // 6. Intent Continue
  document.getElementById('intentContinueBtn')?.addEventListener('click', () => {
    if (!state.preferences.occasion) return;
    showScreen('screenPreferences');
    trackEvent('intent_selected', { occasion: state.preferences.occasion });
  });

  // 7. Find Matches Button (AI Recommendation Trigger)
  document.getElementById('findMatchesBtn')?.addEventListener('click', async () => {
    showScreen('screenRecommendations');
    document.getElementById('recsLoading').classList.remove('hidden');
    document.getElementById('recsListContainer').innerHTML = '';
    document.getElementById('recsNoteBanner').classList.add('hidden');

    trackEvent('preferences_completed', { ...state.preferences });

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.preferences)
      });

      const data = await res.json();
      document.getElementById('recsLoading').classList.add('hidden');

      if (data.success && data.recommendations) {
        state.recommendations = data.recommendations;
        renderRecommendations(data.recommendations);

        if (data.note_en) {
          const noteBanner = document.getElementById('recsNoteBanner');
          const noteText = document.getElementById('recsNoteText');
          noteText.textContent = state.currentLang === 'bn' ? data.note_bn : data.note_en;
          noteBanner.classList.remove('hidden');
        }

        trackEvent('recommendations_viewed', {
          count: data.recommendations.length,
          product_ids: data.recommendations.map(p => p.id)
        });
      } else {
        showToast('Could not fetch recommendations');
      }
    } catch (err) {
      document.getElementById('recsLoading').classList.add('hidden');
      showToast('Network error while fetching recommendations');
    }
  });

  // 8. Back to recs
  document.getElementById('backToRecsBtn')?.addEventListener('click', () => {
    showScreen('screenRecommendations');
  });

  // 9. Open Reservation Modal
  document.getElementById('openReservationModalBtn')?.addEventListener('click', () => {
    if (!state.selectedProduct) return;
    const isBn = state.currentLang === 'bn';
    const prod = state.selectedProduct;
    
    document.getElementById('resSummaryImg').src = prod.image_url;
    document.getElementById('resSummaryTitle').textContent = isBn && prod.name_bn ? prod.name_bn : prod.name;
    document.getElementById('resSummarySize').textContent = `Size ${state.selectedSize || 'M'}`;
    document.getElementById('resSummaryColour').textContent = state.selectedColour || 'Festive';
    document.getElementById('resSummaryPrice').textContent = `₹${Number(prod.price).toLocaleString('en-IN')}`;
    document.getElementById('resErrorBanner').classList.add('hidden');

    showScreen('screenReservation');
    trackEvent('reservation_started', { product_id: prod.id });
  });

  // 10. Submit Reservation
  document.getElementById('submitReservationBtn')?.addEventListener('click', async () => {
    const t = I18N[state.currentLang];
    const nameInput = document.getElementById('resCustomerName');
    const phoneInput = document.getElementById('resCustomerPhone');
    const errorBanner = document.getElementById('resErrorBanner');

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name) {
      errorBanner.textContent = t.errNameRequired;
      errorBanner.classList.remove('hidden');
      nameInput.focus();
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errorBanner.textContent = t.errPhoneInvalid;
      errorBanner.classList.remove('hidden');
      phoneInput.focus();
      return;
    }

    errorBanner.classList.add('hidden');

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: state.selectedProduct.id,
          customer_name: name,
          customer_phone: cleanPhone,
          selected_size: state.selectedSize,
          selected_colour: state.selectedColour
        })
      });

      const data = await res.json();
      if (data.success && data.reservation) {
        state.latestReservation = data.reservation;
        
        // Populate Confirmation Screen
        document.getElementById('confResId').textContent = `#${data.reservation.id}`;
        document.getElementById('confItemName').textContent = data.reservation.product_name;
        document.getElementById('confSizeColorVal').textContent = `${data.reservation.selected_size} • ${data.reservation.selected_colour}`;
        document.getElementById('confPriceVal').textContent = `₹${Number(data.reservation.final_price).toLocaleString('en-IN')}`;
        document.getElementById('confStatusBadge').textContent = data.reservation.status;

        showScreen('screenConfirmation');
        showToast(state.currentLang === 'bn' ? 'পোশাকটি কাউন্টারে বুক করা হয়েছে' : 'Item reserved at counter');
      } else {
        errorBanner.textContent = data.error || 'Reservation failed. Please try again.';
        errorBanner.classList.remove('hidden');
      }
    } catch (err) {
      errorBanner.textContent = 'Server error. Please try again.';
      errorBanner.classList.remove('hidden');
    }
  });

  // 11. Find Another Look
  document.getElementById('findAnotherLookBtn')?.addEventListener('click', () => {
    state.preferences.occasion = null;
    showScreen('screenLanding');
  });

  // 12. Restart Flow
  document.getElementById('restartFlowBtn')?.addEventListener('click', () => {
    state.preferences.occasion = null;
    showScreen('screenLanding');
  });

  // 13. Category Filter Chips on Catalog
  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach(c => {
        c.className = 'cat-chip px-3 py-1.5 rounded-full border border-line bg-cream hover:bg-creamDark text-ink text-xs font-medium whitespace-nowrap';
      });
      chip.className = 'cat-chip active px-3 py-1.5 rounded-full border border-terracotta bg-terracotta text-white text-xs font-semibold whitespace-nowrap';
      state.catalogCategory = chip.dataset.cat;
      renderCatalog(state.allProducts);
    });
  });

  // 14. Merchant Tabs
  document.getElementById('tabReservationsBtn')?.addEventListener('click', () => {
    document.getElementById('tabReservationsBtn').className = 'flex-1 py-2 text-xs font-bold border-b-2 border-terracotta text-terracotta';
    document.getElementById('tabInventoryBtn').className = 'flex-1 py-2 text-xs font-medium border-b-2 border-transparent text-muted hover:text-ink';
    document.getElementById('merchantReservationsPanel').classList.remove('hidden');
    document.getElementById('merchantInventoryPanel').classList.add('hidden');
  });
  document.getElementById('tabInventoryBtn')?.addEventListener('click', () => {
    document.getElementById('tabInventoryBtn').className = 'flex-1 py-2 text-xs font-bold border-b-2 border-terracotta text-terracotta';
    document.getElementById('tabReservationsBtn').className = 'flex-1 py-2 text-xs font-medium border-b-2 border-transparent text-muted hover:text-ink';
    document.getElementById('merchantInventoryPanel').classList.remove('hidden');
    document.getElementById('merchantReservationsPanel').classList.add('hidden');
  });

  // 15. Merchant Product Modal
  document.getElementById('openAddProductModalBtn')?.addEventListener('click', () => openProductModal(null));
  document.getElementById('closeProductModalBtn')?.addEventListener('click', closeProductModal);
  document.getElementById('cancelProductEditBtn')?.addEventListener('click', closeProductModal);

  document.getElementById('productEditForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editProdId').value;
    const body = {
      name: document.getElementById('editProdName').value.trim(),
      name_bn: document.getElementById('editProdNameBn').value.trim(),
      category: document.getElementById('editProdCategory').value,
      price: Number(document.getElementById('editProdPrice').value),
      image_url: document.getElementById('editProdImg').value.trim(),
      stock_quantity: Number(document.getElementById('editProdStock').value),
      is_available: document.getElementById('editProdAvailable').value === 'true',
      sizes: document.getElementById('editProdSizes').value.split(',').map(s => s.trim()).filter(Boolean),
      colours: document.getElementById('editProdColours').value.split(',').map(c => c.trim()).filter(Boolean),
      description: document.getElementById('editProdDesc').value.trim(),
      description_bn: document.getElementById('editProdDescBn').value.trim()
    };

    try {
      const url = id ? `/api/products/${id}` : '/api/products';
      const method = id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        showToast(id ? 'Product updated successfully' : 'Product added to inventory');
        closeProductModal();
        loadMerchantData();
      }
    } catch (err) {
      showToast('Error saving product');
    }
  });

  refreshIcons();
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
