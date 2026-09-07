// Puja Look — Demo Data & In-Memory / File Persistent Store
// Configured for: Maa Tara Bastralaya, Gariahat, Kolkata

const shopConfig = {
  id: "maa-tara-gariahat",
  name: "Maa Tara Bastralaya",
  name_bn: "মা তারা বস্ত্রালয়",
  location: "Gariahat, Kolkata",
  location_bn: "গড়িয়াহাট, কলকাতা",
  address: "142/1 Rashbehari Avenue, Gariahat Crossing, Kolkata - 700029",
  address_bn: "১৪২/১ রাসবিহারী এভিনিউ, গড়িয়াহাট মোড়, কলকাতা - ৭০০০২৯",
  phone: "+91 98301 23456",
  tagline: "Pujor shopping, made personal",
  tagline_bn: "পুজোর শপিং, সহজ ও আপন",
  primary_language: "bn",
  maps_url: "https://maps.google.com/?q=Gariahat+Market+Kolkata"
};

const initialProducts = [
  // SAREES (6 items)
  {
    id: "prod_sar_01",
    shop_id: "maa-tara-gariahat",
    name: "Crimson Baluchari Silk Saree",
    name_bn: "লাল বালুচরী সিল্ক শাড়ি",
    category: "Sarees",
    price: 4950,
    image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    colours: ["Crimson Red", "Gold"],
    occasions: ["Puja", "Family function"],
    styles: ["Traditional"],
    colour_tone: "Festive",
    stock_quantity: 4,
    is_available: true,
    description: "Authentic Bishnupuri Baluchari weave depicting Mahabharata motif pallu with pure silk body in ceremonial crimson red.",
    description_bn: "মহাভারত মোটিফ আঁচল এবং উৎসবের উজ্জ্বল লাল জমিনসহ খাঁটি বিষ্ণুপুরী বালুচরী সিল্ক শাড়ি।"
  },
  {
    id: "prod_sar_02",
    shop_id: "maa-tara-gariahat",
    name: "Ivory Dhakai Jamdani Saree",
    name_bn: "ঘিয়ে ঢাকাই জামদানি শাড়ি",
    category: "Sarees",
    price: 3450,
    image_url: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    colours: ["Ivory", "Pastel"],
    occasions: ["Puja", "Family function", "Dinner"],
    styles: ["Traditional", "Simple"],
    colour_tone: "Light",
    stock_quantity: 6,
    is_available: true,
    description: "Fine cotton Jamdani handloom woven with golden floral boota work. Breathable, featherlight, perfect for Ashtami Anjali morning.",
    description_bn: "সূক্ষ্ম সুতির জামদানি হ্যান্ডলুম, অষ্টমী অঞ্জলির সকালের জন্য অত্যন্ত আরামদায়ক ও আভিজাত্যময়।"
  },
  {
    id: "prod_sar_03",
    shop_id: "maa-tara-gariahat",
    name: "Midnight Blue Tussar Silk Saree",
    name_bn: "নীল তসর সিল্ক শাড়ি",
    category: "Sarees",
    price: 5200,
    image_url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    colours: ["Dark Blue", "Bronze"],
    occasions: ["Dinner", "Going out", "Puja"],
    styles: ["Modern", "Traditional"],
    colour_tone: "Dark",
    stock_quantity: 3,
    is_available: true,
    description: "Rich Vidarbha Tussar silk in deep midnight blue with metallic copper Zari temple border. Ideal for Nabami night pandal hopping.",
    description_bn: "গভীর মধ্যরাত্রি নীল তসর সিল্ক, তাম্র জরি টেম্পল বর্ডারসহ নবমীর সন্ধ্যার জন্য মানানসই।"
  },
  {
    id: "prod_sar_04",
    shop_id: "maa-tara-gariahat",
    name: "Mustard Begumpuri Cotton Saree",
    name_bn: "হলুদ বেগমপুরী সুতি শাড়ি",
    category: "Sarees",
    price: 1850,
    image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    colours: ["Mustard Yellow", "Black"],
    occasions: ["Puja", "Office", "Going out"],
    styles: ["Simple", "Traditional"],
    colour_tone: "Light",
    stock_quantity: 8,
    is_available: true,
    description: "Classic handwoven Begumpuri pure cotton with contrasting serrated matha border. Crisp, elegant, and pocket-friendly.",
    description_bn: "হাতে বোনা খাঁটি বেগমপুরী সুতি শাড়ি। সপ্তমী দিনের জন্য পরিচ্ছন্ন, মার্জিত ও সাশ্রয়ী।"
  },
  {
    id: "prod_sar_05",
    shop_id: "maa-tara-gariahat",
    name: "Forest Green Kantha Stitch Silk Saree",
    name_bn: "গাঢ় সবুজ কাঁথাকাজের সিল্ক শাড়ি",
    category: "Sarees",
    price: 7800,
    image_url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    colours: ["Forest Green", "Multi"],
    occasions: ["Puja", "Family function"],
    styles: ["Traditional"],
    colour_tone: "Dark",
    stock_quantity: 2,
    is_available: true,
    description: "Handcrafted Bolpur Kantha embroidery on pure Bangalore mulberry silk. Heirloom piece celebrating Bengal's needlework heritage.",
    description_bn: "খাঁটি সিল্কের ওপর বোলপুরের নিপুণ হাতে তৈরি কাঁথা স্টিচ শাড়ি। পুজোর অন্যতম আভিজাত্য।"
  },
  {
    id: "prod_sar_06",
    shop_id: "maa-tara-gariahat",
    name: "Pastel Peach Organza Floral Saree",
    name_bn: "হালকা পিচ অরগানজা ফ্লোরাল শাড়ি",
    category: "Sarees",
    price: 3890,
    image_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    sizes: ["Free Size"],
    colours: ["Peach", "Pastel"],
    occasions: ["Dinner", "Going out", "Family function"],
    styles: ["Modern", "Fusion"],
    colour_tone: "Light",
    stock_quantity: 5,
    is_available: true,
    description: "Contemporary lightweight organza with delicate water-colour botanical prints and hand-scalloped Zari edges.",
    description_bn: "আধুনিক হালকা অরগানজা শাড়ি, হালকা রঙের ফ্লোরাল প্রিন্ট এবং জারদোসি বর্ডারসহ।"
  },

  // KURTAS (6 items)
  {
    id: "prod_kur_01",
    shop_id: "maa-tara-gariahat",
    name: "Ivory Handloom Jamdani Panjabi",
    name_bn: "ঘিয়ে জামদানি বুটি সুতির পাঞ্জাবি",
    category: "Kurtas",
    price: 2499,
    image_url: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    colours: ["Ivory", "White"],
    occasions: ["Puja", "Family function"],
    styles: ["Traditional", "Simple"],
    colour_tone: "Light",
    stock_quantity: 7,
    is_available: true,
    description: "Breathable Bengal khadi cotton with subtle Jamdani boota across chest and collar. The quintessential Ashtami morning look.",
    description_bn: "খাঁটি খাদি সুতি কাপড়ের ওপর জামদানি কাজের ধ্রুপদী পাঞ্জাবি। অষ্টমী অঞ্জলির শ্রেষ্ঠ পছন্দ।"
  },
  {
    id: "prod_kur_02",
    shop_id: "maa-tara-gariahat",
    name: "Deep Maroon Silk Tussar Kurta",
    name_bn: "গাঢ় মেরুন তসর সিল্ক কুর্তা",
    category: "Kurtas",
    price: 3250,
    image_url: "https://images.unsplash.com/photo-1610189012906-4b8f2e9e5f99?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Maroon", "Crimson Red"],
    occasions: ["Puja", "Dinner", "Family function"],
    styles: ["Traditional", "Modern"],
    colour_tone: "Festive",
    stock_quantity: 4,
    is_available: true,
    description: "Lustrous Tussar silk blend kurta tailored with wooden buttons and mandarin neck. Rich festive glow under evening pandal lights.",
    description_bn: "তসর সিল্কের মেরুন কুর্তা। কাঠের বোতাম ও মান্দারিন কলারসহ সন্ধ্যার জমকালো পুজোর জন্য শ্রেষ্ঠ।"
  },
  {
    id: "prod_kur_03",
    shop_id: "maa-tara-gariahat",
    name: "Indigo Dabu Hand-Printed Cotton Kurta",
    name_bn: "ইন্ডিগো ডাবু প্রিন্ট সুতি কুর্তা",
    category: "Kurtas",
    price: 1650,
    image_url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL"],
    colours: ["Dark Blue", "Indigo"],
    occasions: ["Office", "Going out", "Puja"],
    styles: ["Simple", "Fusion"],
    colour_tone: "Dark",
    stock_quantity: 9,
    is_available: true,
    description: "Natural indigo mud-resist Dabu craft kurta on 100% fine cambric cotton. Ultra soft, casual, and pandal-hopping ready.",
    description_bn: "ন্যাচারাল ডাবু মাড প্রিন্ট সুতি কুর্তা। ক্যাজুয়াল প্যান্ডেল হপিং বা বন্ধুদের আড্ডার জন্য আরামদায়ক।"
  },
  {
    id: "prod_kur_04",
    shop_id: "maa-tara-gariahat",
    name: "Olive Green Asymmetrical Fusion Kurta",
    name_bn: "অলিভ গ্রিন ফিউশন কুর্তা",
    category: "Kurtas",
    price: 2150,
    image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    colours: ["Olive Green", "Dark"],
    occasions: ["Dinner", "Going out"],
    styles: ["Modern", "Fusion"],
    colour_tone: "Dark",
    stock_quantity: 5,
    is_available: true,
    description: "Angrakha-inspired diagonal overlapping placket with subtle thread detailing in textured linen-cotton.",
    description_bn: "আঙ্গরাখা কাট ও আধুনিক স্ল্যান্টেড হেমলাইনযুক্ত ট্রেন্ডি কুর্তা। নবমী বা দশমীর সান্ধ্য আড্ডার জন্য।"
  },
  {
    id: "prod_kur_05",
    shop_id: "maa-tara-gariahat",
    name: "Raw Silk Ochre Yellow Kurta",
    name_bn: "হলুদ র সিল্ক পাঞ্জাবি",
    category: "Kurtas",
    price: 3600,
    image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    colours: ["Mustard Yellow", "Festive"],
    occasions: ["Puja", "Family function"],
    styles: ["Traditional"],
    colour_tone: "Festive",
    stock_quantity: 4,
    is_available: true,
    description: "Natural textured raw silk in auspicious Basanti yellow. Hand-finished button placket, regal and celebratory.",
    description_bn: "বাসন্তী হলুদ র সিল্কের জমকালো পাঞ্জাবি। ষষ্ঠী বা সপ্তমীর দিনের অনুষ্ঠানের জন্য চমৎকার।"
  },
  {
    id: "prod_kur_06",
    shop_id: "maa-tara-gariahat",
    name: "Charcoal Slate Khadi Short Kurta",
    name_bn: "চারকোল স্লেট খাদি শর্ট কুর্তা",
    category: "Kurtas",
    price: 1450,
    image_url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Dark", "Grey"],
    occasions: ["Going out", "Office"],
    styles: ["Simple", "Modern"],
    colour_tone: "Dark",
    stock_quantity: 6,
    is_available: true,
    description: "Modern knee-above short kurta made from handspun khadi. Pair effortlessly with rolled chinos or denim.",
    description_bn: "হালকা হ্যান্ডস্পান খাদি শর্ট কুর্তা। জিন্স বা চিনোসের সঙ্গে ক্যাজুয়াল স্টাইলের জন্য উপযুক্ত।"
  },

  // KURTA SETS (5 items)
  {
    id: "prod_set_01",
    shop_id: "maa-tara-gariahat",
    name: "Crimson Silk Baluchari Motif Kurta Set",
    name_bn: "লাল সিল্ক বালুচরী কুর্তা সেট",
    category: "Kurta sets",
    price: 3850,
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Crimson Red", "Gold"],
    occasions: ["Puja", "Family function"],
    styles: ["Traditional"],
    colour_tone: "Festive",
    stock_quantity: 3,
    is_available: true,
    description: "Complete festive coordinate set including woven Baluchari motif silk kurta paired with tailored cream churidar.",
    description_bn: "ঐতিহ্যবাহী লাল সিল্ক কুর্তা ও ঘিয়ে রঙের চোস্তা পাজামার সম্পূর্ণ সেট।"
  },
  {
    id: "prod_set_02",
    shop_id: "maa-tara-gariahat",
    name: "Emerald Green Chanderi Anarkali Set",
    name_bn: "পান্না সবুজ চান্দেরি আনারকলি সেট",
    category: "Kurta sets",
    price: 4600,
    image_url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL"],
    colours: ["Forest Green", "Gold"],
    occasions: ["Puja", "Dinner", "Family function"],
    styles: ["Traditional", "Modern"],
    colour_tone: "Festive",
    stock_quantity: 5,
    is_available: true,
    description: "3-piece set with flared Chanderi Anarkali tunic, matching cigarette pants, and organza hand-embroidered dupatta.",
    description_bn: "চান্দেরি কাপড়ের আনারকলি কুর্তি, সিগারেট প্যান্ট ও সুন্দর ওড়নার থ্রি-পিস উৎসবের সেট।"
  },
  {
    id: "prod_set_03",
    shop_id: "maa-tara-gariahat",
    name: "Blush Pink Embroidered Kurta Palazzo Set",
    name_bn: "হালকা গোলাপি এমব্রয়ডারি কুর্তা পালাজো সেট",
    category: "Kurta sets",
    price: 3200,
    image_url: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Pastel", "Peach"],
    occasions: ["Family function", "Dinner", "Going out"],
    styles: ["Modern", "Simple"],
    colour_tone: "Light",
    stock_quantity: 6,
    is_available: true,
    description: "Subtle Lucknowi Chikankari machine embroidery with comfortable flared cotton palazzos. Understated festive grace.",
    description_bn: "চিকনকারি কাজের সূক্ষ্ম কুর্তা ও আরামদায়ক পালাজোর সেট। দিনভর ঘুরে দেখার জন্য সেরা।"
  },
  {
    id: "prod_set_04",
    shop_id: "maa-tara-gariahat",
    name: "Royal Navy Jacquard Kurta Dhoti Set",
    name_bn: "নেভি ব্লু জ্যাকার্ড কুর্তা ধুতি সেট",
    category: "Kurta sets",
    price: 5400,
    image_url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL"],
    colours: ["Dark Blue", "Gold"],
    occasions: ["Puja", "Family function"],
    styles: ["Traditional"],
    colour_tone: "Dark",
    stock_quantity: 2,
    is_available: true,
    description: "Banarasi Jacquard woven kurta with pre-stitched pleated silk dhoti. Majestic styling for Sindoor Khela & Dashami evening.",
    description_bn: "বেনারসি জ্যাকার্ড কুর্তা ও রেডিমেড সিল্ক ধুতির রাজকীয় কম্বো সেট।"
  },
  {
    id: "prod_set_05",
    shop_id: "maa-tara-gariahat",
    name: "Mustard Cotton Straight Kurta & Pants",
    name_bn: "হলুদ কটন সোজা কুর্তা ও প্যান্ট সেট",
    category: "Kurta sets",
    price: 2199,
    image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: ["Mustard Yellow", "White"],
    occasions: ["Office", "Going out", "Puja"],
    styles: ["Simple"],
    colour_tone: "Light",
    stock_quantity: 7,
    is_available: true,
    description: "Clean straight-cut cotton kurti with side slits, pocketed trousers, and striped cotton dupatta.",
    description_bn: "সুতির ক্যাজুয়াল কুর্তা ও ট্রাউজার সেট। অফিসের পর পুজো প্যান্ডেলে যাওয়ার জন্য আদর্শ।"
  },

  // DRESSES & INDO-WESTERN (5 items)
  {
    id: "prod_drs_01",
    shop_id: "maa-tara-gariahat",
    name: "Rust Terracotta Tiered Festive Maxi Dress",
    name_bn: "টেরাকোটা টিয়ার্ড উৎসবের ম্যাক্সি ড্রেস",
    category: "Dresses",
    price: 2950,
    image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    colours: ["Terracotta", "Festive"],
    occasions: ["Going out", "Dinner", "Puja"],
    styles: ["Fusion", "Modern"],
    colour_tone: "Festive",
    stock_quantity: 4,
    is_available: true,
    description: "Flared tiered maxi dress crafted in earthy handspun cotton with gold tassel tie-ups and mirrorwork yoke.",
    description_bn: "মাটির রঙের সুতি ম্যাক্সি ড্রেস, হালকা জরি ও গলার কাজের সুন্দর ফিউশন ড্রেস।"
  },
  {
    id: "prod_drs_02",
    shop_id: "maa-tara-gariahat",
    name: "Teal Green Silk Flared Midi Dress",
    name_bn: "টিল গ্রিন সিল্ক ফ্লেয়ার্ড মিডি ড্রেস",
    category: "Dresses",
    price: 3650,
    image_url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L"],
    colours: ["Forest Green", "Dark Blue"],
    occasions: ["Dinner", "Going out"],
    styles: ["Modern"],
    colour_tone: "Dark",
    stock_quantity: 3,
    is_available: true,
    description: "Sophisticated Indo-western silhouette in art silk with structured waist pleats and side in-seam pockets.",
    description_bn: "আর্ট সিল্কের মার্জিত ড্রেস। পকেট ও বেল্টসহ মডার্ন উৎসবের আউটফিট।"
  },
  {
    id: "prod_drs_03",
    shop_id: "maa-tara-gariahat",
    name: "Ivory & Gold Block Print Angrakha Dress",
    name_bn: "ঘিয়ে ও গোল্ডেন ব্লকপ্রিন্ট আঙ্গরাখা ড্রেস",
    category: "Dresses",
    price: 2750,
    image_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Ivory", "Gold"],
    occasions: ["Puja", "Family function"],
    styles: ["Fusion", "Traditional"],
    colour_tone: "Light",
    stock_quantity: 5,
    is_available: true,
    description: "Pure cotton layered Angrakha dress with golden foil block motifs. Traditional soul with contemporary ease.",
    description_bn: "ঘিয়ে রঙে সোনালী ব্লকপ্রিন্টের আঙ্গরাখা ড্রেস। আরাম আর বাঙালিয়ানার মেলবন্ধন।"
  },
  {
    id: "prod_drs_04",
    shop_id: "maa-tara-gariahat",
    name: "Maroon Bohemian Handloom Cape Dress",
    name_bn: "মেরুন বোহেমিয়ান কেপ ড্রেস",
    category: "Dresses",
    price: 4200,
    image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL"],
    colours: ["Maroon", "Crimson Red"],
    occasions: ["Dinner", "Going out"],
    styles: ["Fusion", "Modern"],
    colour_tone: "Dark",
    stock_quantity: 3,
    is_available: true,
    description: "Dramatic overlay cape dress tailored in handwoven Bengal ikat silk-cotton. Stand out in the crowd at night.",
    description_bn: "ইক্কত হ্যান্ডলুমের আভিজাত্যময় কেপ ড্রেস। বন্ধুদের সাথে সান্ধ্য ডিনারের জন্য নিখুঁত।"
  },
  {
    id: "prod_drs_05",
    shop_id: "maa-tara-gariahat",
    name: "Beige Khadi Shirt Dress with Belt",
    name_bn: "হালকা বাদামি খাদি শার্ট ড্রেস",
    category: "Dresses",
    price: 1890,
    image_url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    colours: ["Pastel", "Light"],
    occasions: ["Office", "Going out"],
    styles: ["Simple", "Modern"],
    colour_tone: "Light",
    stock_quantity: 6,
    is_available: true,
    description: "Minimalist utilitarian shirt dress with shell buttons and fabric tie belt in 100% natural cotton khadi.",
    description_bn: "সুতির খাদি শার্ট ড্রেস। অত্যন্ত ছিমছাম ও আধুনিক দিনের জন্য।"
  },

  // SHIRTS (4 items)
  {
    id: "prod_shr_01",
    shop_id: "maa-tara-gariahat",
    name: "Tussar Silk Bandhgala Mandarin Shirt",
    name_bn: "তসর সিল্ক বন্ধগলা ফুল শার্ট",
    category: "Shirts",
    price: 2100,
    image_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL"],
    colours: ["Tussar", "Gold"],
    occasions: ["Puja", "Family function", "Dinner"],
    styles: ["Traditional", "Modern"],
    colour_tone: "Light",
    stock_quantity: 5,
    is_available: true,
    description: "Tussar textured cotton-silk shirt with Nehru collar and mother-of-pearl buttons. Pairs cleanly with trousers or dhoti.",
    description_bn: "তসর টেক্সচার্ড সুতি-সিল্ক শার্ট, নেহেরু কলারসহ প্যান্ট বা ধুতি উভয়ের সঙ্গেই মানানসই।"
  },
  {
    id: "prod_shr_02",
    shop_id: "maa-tara-gariahat",
    name: "Bengal Kantha Embroidered Linen Shirt",
    name_bn: "কাঁথাকাজ লিনেন ক্যাজুয়াল শার্ট",
    category: "Shirts",
    price: 2450,
    image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Ivory", "Multi"],
    occasions: ["Going out", "Dinner", "Office"],
    styles: ["Fusion", "Simple"],
    colour_tone: "Light",
    stock_quantity: 4,
    is_available: true,
    description: "Pure Belgian flax linen shirt featuring artisanal hand-run kantha geometric stitching down the pocket placket.",
    description_bn: "বিশুদ্ধ লিনেন কাপড়ে পকেটের ওপর সূক্ষ্ম কাঁথা স্টিচের আধুনিক ক্যাজুয়াল শার্ট।"
  },
  {
    id: "prod_shr_03",
    shop_id: "maa-tara-gariahat",
    name: "Crimson Festive Dobby Weave Casual Shirt",
    name_bn: "লাল ডবি উইভ ফেস্টিভ শার্ট",
    category: "Shirts",
    price: 1550,
    image_url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
    sizes: ["M", "L", "XL", "XXL"],
    colours: ["Crimson Red", "Festive"],
    occasions: ["Going out", "Dinner"],
    styles: ["Modern"],
    colour_tone: "Festive",
    stock_quantity: 6,
    is_available: true,
    description: "Breathable self-textured dobby weave in rich festive red. Soft spread collar, tailored slim fit.",
    description_bn: "উৎসবের লাল রঙে সেলফ ডবি উইভ সুতি শার্ট। রাতে ঘোরার জন্য স্টাইলিশ ও আরামদায়ক।"
  },
  {
    id: "prod_shr_04",
    shop_id: "maa-tara-gariahat",
    name: "Navy Blue Ikat Handwoven Cotton Shirt",
    name_bn: "নেভি ব্লু ইক্কত সুতি শার্ট",
    category: "Shirts",
    price: 1750,
    image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colours: ["Dark Blue", "Dark"],
    occasions: ["Office", "Going out"],
    styles: ["Simple", "Fusion"],
    colour_tone: "Dark",
    stock_quantity: 7,
    is_available: true,
    description: "Woven Ikat resist-dyed pure cotton shirt. Natural yarns, colourfast, tailored for all-day festive comfort.",
    description_bn: "ইক্কত হ্যান্ডলুম সুতি শার্ট। গরম ও ভিড়ে সারাদিন ঘোরার জন্য সেরা আরাম।"
  }
];

const initialReservations = [
  {
    id: "RES-88214",
    shop_id: "maa-tara-gariahat",
    product_id: "prod_kur_01",
    product_name: "Ivory Handloom Jamdani Panjabi",
    customer_name: "Subir Roy",
    customer_phone: "9831098765",
    selected_size: "M",
    selected_colour: "Ivory",
    final_price: 2499,
    status: "Pending", // 'Pending', 'Confirmed', 'Collected', 'Cancelled'
    created_at: new Date(Date.now() - 35 * 60 * 1000).toISOString()
  },
  {
    id: "RES-77402",
    shop_id: "maa-tara-gariahat",
    product_id: "prod_sar_01",
    product_name: "Crimson Baluchari Silk Saree",
    customer_name: "Ananya Ghosh",
    customer_phone: "9830543210",
    selected_size: "Free Size",
    selected_colour: "Crimson Red",
    final_price: 4950,
    status: "Confirmed",
    created_at: new Date(Date.now() - 95 * 60 * 1000).toISOString()
  }
];

// Persistent state management (in-memory with file backup)
class DataStore {
  constructor() {
    this.shop = { ...shopConfig };
    this.products = [...initialProducts];
    this.reservations = [...initialReservations];
    this.analytics = [];
  }

  getShop() {
    return this.shop;
  }

  updateShop(updates) {
    this.shop = { ...this.shop, ...updates };
    return this.shop;
  }

  getProducts(filter = {}) {
    let result = [...this.products];
    if (filter.availableOnly) {
      result = result.filter(p => p.is_available && p.stock_quantity > 0);
    }
    if (filter.category) {
      result = result.filter(p => p.category.toLowerCase() === filter.category.toLowerCase());
    }
    return result;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  addProduct(prod) {
    const newProduct = {
      id: "prod_" + Date.now().toString(36),
      shop_id: this.shop.id,
      name: prod.name || "Untitled Product",
      name_bn: prod.name_bn || prod.name || "পণ্য",
      category: prod.category || "Kurtas",
      price: Number(prod.price) || 1999,
      image_url: prod.image_url || "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=80",
      sizes: Array.isArray(prod.sizes) ? prod.sizes : ["M", "L", "XL"],
      colours: Array.isArray(prod.colours) ? prod.colours : ["Festive"],
      occasions: Array.isArray(prod.occasions) ? prod.occasions : ["Puja"],
      styles: Array.isArray(prod.styles) ? prod.styles : ["Traditional"],
      colour_tone: prod.colour_tone || "Festive",
      stock_quantity: Number(prod.stock_quantity) || 5,
      is_available: prod.is_available !== false,
      description: prod.description || "Authentic festive collection piece.",
      description_bn: prod.description_bn || "উৎসবের বিশেষ কালেকশন।",
      created_at: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id, updates) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates };
    return this.products[idx];
  }

  deleteProduct(id) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }

  getReservations() {
    return [...this.reservations];
  }

  addReservation(data) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newRes = {
      id: `RES-${randomNum}`,
      shop_id: this.shop.id,
      product_id: data.product_id,
      product_name: data.product_name,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      selected_size: data.selected_size,
      selected_colour: data.selected_colour,
      final_price: Number(data.final_price),
      status: "Pending",
      created_at: new Date().toISOString()
    };
    this.reservations.unshift(newRes);
    return newRes;
  }

  updateReservationStatus(id, status) {
    const res = this.reservations.find(r => r.id === id);
    if (!res) return null;
    res.status = status;
    return res;
  }

  logAnalytics(eventName, payload) {
    const event = {
      id: Date.now(),
      shop_id: this.shop.id,
      event_name: eventName,
      payload: payload || {},
      timestamp: new Date().toISOString()
    };
    this.analytics.push(event);
    return event;
  }

  getStats() {
    const total = this.products.length;
    const available = this.products.filter(p => p.is_available && p.stock_quantity > 0).length;
    const pending = this.reservations.filter(r => r.status === "Pending").length;
    const confirmed = this.reservations.filter(r => r.status === "Confirmed").length;
    const collected = this.reservations.filter(r => r.status === "Collected").length;
    return {
      totalProducts: total,
      availableProducts: available,
      pendingReservations: pending,
      confirmedReservations: confirmed,
      collectedReservations: collected,
      totalReservations: this.reservations.length
    };
  }
}

const store = new DataStore();
module.exports = store;
