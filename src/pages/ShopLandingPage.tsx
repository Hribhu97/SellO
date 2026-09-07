import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';

export const ShopLandingPage: React.FC = () => {
  const { shop, shopSlug, t, isLoading } = useShop();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-terracotta border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-muted">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between p-5 pt-4">
      {/* Top Banner / Eyebrow */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-goldLight border border-gold/30 text-ink text-xs font-semibold mb-4 tracking-wide">
          <Sparkles size={12} className="text-gold" />
          <span>{t.festiveEyebrow}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl font-serif text-ink tracking-tight leading-[1.15] mb-3">
          {t.landingHeroTitle} <span className="italic font-normal text-terracotta">{t.landingHeroItalic}</span>
        </h1>

        <p className="text-muted text-sm leading-relaxed mb-6">
          {t.landingSupporting}
        </p>

        {/* Boutique Visual Showcase Card */}
        <div className="relative rounded-2xl overflow-hidden border border-line bg-cream mb-6 aspect-[4/3] shadow-inner group">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
            alt="Durga Puja Handloom Saree"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent flex flex-col justify-end p-4 text-white">
            <span className="text-[11px] uppercase tracking-widest text-gold font-semibold">
              {shop?.name || t.storeDefaultName}
            </span>
            <p className="text-base font-serif font-medium leading-snug">
              Hand-picked handlooms, tussar silk, and Dhakai jamdani ready for trial.
            </p>
          </div>
        </div>

        {/* In-Store Trust Guarantees */}
        <div className="bg-cream/70 rounded-xl p-3.5 border border-line mb-6 flex flex-col gap-2">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-templeGreen shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-ink leading-tight">{t.trustStockTitle}</p>
              <p className="text-[12px] text-muted leading-tight mt-0.5">{t.trustStockDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 pt-2 border-t border-line/50 text-[11px] text-muted font-medium">
            <ShieldCheck size={14} className="text-terracotta shrink-0" />
            <span>{t.trustNoAccount} &bull; No advance payments</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate(`/shop/${shopSlug}/intent`)}
          className="w-full py-3.5 px-6 rounded-xl bg-terracotta hover:bg-terracottaDark text-white font-semibold text-base shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 group min-h-[48px]"
        >
          <span>{t.primaryCTA}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => navigate(`/shop/${shopSlug}/browse`)}
          className="w-full py-3 px-6 rounded-xl bg-cream hover:bg-creamDark text-ink font-medium text-sm border border-line transition-all flex items-center justify-center gap-2 min-h-[44px]"
        >
          <ShoppingBag size={16} className="text-muted" />
          <span>{t.secondaryCTA}</span>
        </button>
      </div>
    </div>
  );
};
