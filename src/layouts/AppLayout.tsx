import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { MapPin, Globe, Shield, Sparkles, ChevronLeft } from 'lucide-react';

interface AppLayoutProps {
  showBack?: boolean;
  step?: number;
  totalSteps?: number;
}

export const AppLayout: React.FC<AppLayoutProps> = () => {
  const { shop, shopSlug, lang, setLanguage, t, isLoading, error } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const isMerchantRoute = location.pathname.startsWith('/admin');
  const isLanding = location.pathname === `/shop/${shopSlug}` || location.pathname === `/shop/${shopSlug}/`;
  const canGoBack = !isLanding && !isMerchantRoute;

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
  };

  return (
    <div className="min-h-screen bg-[#F3EFE9] flex justify-center text-ink selection:bg-terracotta selection:text-white">
      {/* Mobile viewport constraint: max 480px width, centered with subtle shadow */}
      <div className="w-full max-w-[480px] min-h-screen bg-warm border-x border-line flex flex-col shadow-xl relative">
        
        {/* Boutique Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-warm/95 backdrop-blur-md border-b border-line px-4 py-3 flex items-center justify-between transition-all">
          <div className="flex items-center gap-2 overflow-hidden">
            {canGoBack && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-full bg-cream hover:bg-creamDark active:scale-95 flex items-center justify-center text-ink transition-colors mr-1 shrink-0"
                aria-label={t.back}
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-terracotta shrink-0 animate-pulse"></span>
                <span className="font-serif font-bold text-ink text-base tracking-tight truncate">
                  {shop?.name || t.storeDefaultName}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-muted truncate">
                <MapPin size={10} className="text-terracotta shrink-0" />
                <span className="truncate">{shop?.location || t.storeDefaultLocation}</span>
              </div>
            </div>
          </div>

          {/* Right Action Controls: Language Toggle & Merchant portal */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cream hover:bg-creamDark border border-line text-ink flex items-center gap-1 transition-all active:scale-95"
              title="Switch Language"
            >
              <Globe size={12} className="text-terracotta" />
              <span>{t.langToggle}</span>
            </button>

            {!isMerchantRoute && (
              <button
                type="button"
                onClick={() => navigate('/admin/login')}
                className="w-8 h-8 rounded-full bg-cream hover:bg-creamDark flex items-center justify-center text-muted hover:text-ink border border-line transition-colors"
                title={t.staffPortal}
              >
                <Shield size={13} />
              </button>
            )}
          </div>
        </header>

        {/* Global Boutique Banner / Status */}
        {error && (
          <div className="bg-terracotta/10 border-b border-terracotta/20 px-4 py-2 text-xs text-terracotta font-medium flex items-center gap-2">
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>

        {/* Subtle boutique footer mark */}
        <footer className="py-4 px-6 border-t border-line/60 text-center text-[11px] text-muted/70 bg-cream/30 flex items-center justify-center gap-2">
          <Sparkles size={11} className="text-gold" />
          <span>Puja Look AI Shopping Assistant &bull; Kolkata</span>
        </footer>
      </div>
    </div>
  );
};
