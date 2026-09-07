# Puja Look — Production-Ready Buyer MVP & Merchant Portal

A mobile-first, guest-first AI shopping assistant designed for local fashion boutiques in Kolkata to help shoppers discover and reserve ethnic/festive outfits from actual boutique racks during Durga Puja.

Configured Demo Store: **Maa Tara Bastralaya, Gariahat, Kolkata**

---

## 🏛️ Architecture & Tech Stack

- **Client**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Google Fonts (`Cormorant Garamond` serif + `Plus Jakarta Sans`).
- **State & Routing**: React Router v7 with scoped store slug routing (`/shop/:shopSlug/*`) and Floor Portal (`/admin/*`).
- **Backend & Database**: Firebase Cloud Firestore (with composite indexes and strict security rules), Firebase Authentication, Firebase Storage.
- **Server-Side AI Engine**: Cloud Functions (`functions/src/recommendProducts.ts`) & Express API calling **Google Gemini 1.5 Flash** with candidate-only validation and deterministic scoring fallback.
- **Data Integrity & Concurrency**: Firestore atomic transactions decrement rack stock and create authoritative product snapshots with 2-hour holds (`#RES-XXXXX`).
- **Privacy & Security**: Zero customer PII sent to analytics; `GEMINI_API_KEY` strictly protected server-side; strict Firestore security rules reject direct client modification of prices or shop data.

---

## 📱 User Journeys

### 1. Guest-First Buyer Discovery Flow
1. **Entry via QR Code / URL**: `/shop/maa-tara-bastra`
2. **Screen 1 — Shop Landing**: Boutique branding, festive hero ("Find your *Pujor look.*"), real-stock guarantee, Bengali / English toggle.
3. **Screen 2 — Shopping Intent**: Step 1 of 2. Selects primary occasion (*Puja*, *Dinner*, *Family function*, *Office*, *Going out*).
4. **Screen 3 — Preferences**: Step 2 of 2. Selects Budget Tier, Style Aesthetic, Colour Tone, and Size.
5. **Screen 4 — AI Recommendations**: Top 3 matching outfits from actual boutique inventory, complete with genuine **"Why it matches"** explanations in English and authentic Bengali.
6. **Screen 5 — Product Detail**: `/shop/:shopSlug/product/:productId`. Large photo, verified rack availability, **Final price: ₹X,XXX** (no surprise fees), size & colour selector.
7. **Screen 6 — Counter Reservation**: `/shop/:shopSlug/reserve/:productId`. Customer Name and 10-digit mobile number. Explicit zero advance payment guarantee.
8. **Screen 7 — Confirmation Pass**: `#RES-XXXXX` reservation pass card, 2-hour hold timer, pickup instructions (*"Ask for Bapi Da at Counter 3"*), and Google Maps directions.
9. **Screen 8 — Secondary Catalog**: `/shop/:shopSlug/browse`. Full catalog filtering by Category (*Sarees, Kurtas, Kurta Sets, Dresses, Shirts*).

### 2. Merchant Floor Portal (`/admin`)
- **Login**: Email & Password auth with quick-fill demo credentials for floor staff (`merchant@maatarabastra.com` / `demo123`).
- **Real-Time Reservations Queue**: Filter holds, change status (`pending` → `confirmed` → `collected` / `cancelled`).
- **Rack Inventory Management**: Real-time stock toggle (`ON RACK` / `HIDDEN`), stock level updates, and instant product addition modal.

---

## 📁 Project Directory Structure

```text
WEBApp/
├── src/
│   ├── analytics/            # Privacy-safe Firebase Analytics tracker
│   ├── context/              # ShopContext providing shop, language, and preferences
│   ├── data/                 # Demo boutique data (Maa Tara Bastralaya + 26 products)
│   ├── i18n/                 # Authentic bilingual translations (English / বাংলা)
│   ├── layouts/              # Mobile-first AppLayout (max-width: 480px, boutique header)
│   ├── pages/                # 8 buyer screens + 2 merchant floor portal screens
│   │   ├── ShopLandingPage.tsx
│   │   ├── IntentPage.tsx
│   │   ├── PreferencesPage.tsx
│   │   ├── RecommendationsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ReservationPage.tsx
│   │   ├── ConfirmationPage.tsx
│   │   ├── BrowseCollectionPage.tsx
│   │   ├── MerchantLoginPage.tsx
│   │   └── MerchantDashboardPage.tsx
│   ├── services/firebase/    # Firebase config, shopService, recommendationService, reservationService, authService
│   ├── types/                # Domain interfaces (Shop, Product, Reservation, UserPreferences)
│   ├── App.tsx               # Client-side router configuration
│   ├── index.css             # Tailwind CSS directives and custom animations
│   └── main.tsx              # React entrypoint
├── functions/                # Cloud Functions (recommendProducts with Gemini, createReservation)
│   ├── src/
│   │   ├── recommendProducts.ts
│   │   ├── createReservation.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── firestore.rules           # Strict security rules for Firestore
├── storage.rules             # Image upload validation rules
├── firestore.indexes.json    # Composite indexes for queries
├── firebase.json             # Firebase Hosting, Functions, and Emulator configuration
├── test/
│   ├── test_suite.ts         # TypeScript test suite verifying domain & Firebase logic
│   └── verify.js             # End-to-end integration verification (20 checks)
├── index.html                # HTML root template with Google Fonts
├── tailwind.config.js        # Boutique color palette (warm, cream, terracotta, templeGreen, gold)
├── vite.config.ts            # Vite build configuration
└── package.json              # Scripts and dependencies
```

---

## 🔒 Security & Data Invariants

1. **Gemini API Isolation**: The Gemini API key is never exposed client-side. The client only communicates with the secure server-side endpoint.
2. **Hallucination Prevention**: The server supplies candidate product IDs from Firestore. Gemini is strictly instructed to rank and explain only those candidates.
3. **Price Authority**: The client cannot specify reservation price. Price is authoritatively read server-side during the Firestore atomic transaction.
4. **Overselling Protection**: Concurrent reservations on items with `stockQuantity: 1` are handled atomically via `runTransaction`.
5. **PII Sanitization**: Shopper telephone numbers and names are stripped before any analytics events are logged.

---

## ⚡ Quickstart & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your Firebase configuration keys and server-side `GEMINI_API_KEY`.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your mobile browser or DevTools mobile emulator.

### 4. Build for Production
```bash
npm run build
```
Generates optimized, minified assets into `dist/`.

### 5. Run Automated Tests
```bash
# Run complete verification test suite
npm test
```
- Executes `test/verify.js` (20 integration assertions)
- Executes `test/test_suite.ts` (TypeScript domain assertions)

---

## 🚀 Firebase Deployment

### 1. Deploy Cloud Firestore Rules & Indexes
```bash
firebase deploy --only firestore:rules,firestore:indexes
```

### 2. Set Cloud Functions Secret (Gemini API)
```bash
firebase functions:secrets:set GEMINI_API_KEY
```

### 3. Deploy Functions & Hosting
```bash
npm run build
firebase deploy --only functions,hosting
```
