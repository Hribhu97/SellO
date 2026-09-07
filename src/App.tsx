import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AppLayout } from './layouts/AppLayout';
import { ShopLandingPage } from './pages/ShopLandingPage';
import { IntentPage } from './pages/IntentPage';
import { PreferencesPage } from './pages/PreferencesPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ReservationPage } from './pages/ReservationPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { BrowseCollectionPage } from './pages/BrowseCollectionPage';
import { MerchantLoginPage } from './pages/MerchantLoginPage';
import { MerchantDashboardPage } from './pages/MerchantDashboardPage';

const DEFAULT_SHOP_SLUG = 'maa-tara-bastra';

// Wrapper component to ensure ShopProvider receives route params
const ShopRouteContainer: React.FC = () => {
  return (
    <ShopProvider>
      <AppLayout />
    </ShopProvider>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root Redirect to Default Kolkata Boutique */}
        <Route path="/" element={<Navigate to={`/shop/${DEFAULT_SHOP_SLUG}`} replace />} />

        {/* Buyer-Facing Flow Scoped to Boutique Slug */}
        <Route path="/shop/:shopSlug" element={<ShopRouteContainer />}>
          <Route index element={<ShopLandingPage />} />
          <Route path="intent" element={<IntentPage />} />
          <Route path="preferences" element={<PreferencesPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route path="product/:productId" element={<ProductDetailPage />} />
          <Route path="reserve/:productId" element={<ReservationPage />} />
          <Route path="confirmation/:reservationId" element={<ConfirmationPage />} />
          <Route path="browse" element={<BrowseCollectionPage />} />
        </Route>

        {/* Merchant Floor Portal */}
        <Route path="/admin" element={<ShopRouteContainer />}>
          <Route index element={<Navigate to="/admin/login" replace />} />
          <Route path="login" element={<MerchantLoginPage />} />
          <Route path="dashboard" element={<MerchantDashboardPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={`/shop/${DEFAULT_SHOP_SLUG}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
