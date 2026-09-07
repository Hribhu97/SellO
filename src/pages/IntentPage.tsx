import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Occasion } from '../types';
import { trackAnalyticsEvent } from '../analytics';
import { Sparkles, ArrowRight, Utensils, Users, Briefcase, Compass, Check } from 'lucide-react';

const occasionIcons: Record<Occasion, React.ReactNode> = {
  puja: <Sparkles size={20} className="text-terracotta" />,
  dinner: <Utensils size={20} className="text-gold" />,
  family: <Users size={20} className="text-templeGreen" />,
  office: <Briefcase size={20} className="text-muted" />,
  outing: <Compass size={20} className="text-terracottaDark" />,
};

export const IntentPage: React.FC = () => {
  const { shop, shopSlug, preferences, updatePreference, t } = useShop();
  const navigate = useNavigate();

  const handleSelectOccasion = (key: Occasion) => {
    updatePreference('occasion', key);
    trackAnalyticsEvent('intent_selected', { occasion: key, shopId: shop?.id });
  };

  const handleContinue = () => {
    navigate(`/shop/${shopSlug}/preferences`);
  };

  const occasionsList: Occasion[] = ['puja', 'dinner', 'family', 'office', 'outing'];

  return (
    <div className="flex-1 flex flex-col justify-between p-5 pt-3">
      <div>
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-muted">
            {t.step1of2}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-1.5 rounded-full bg-terracotta" />
            <div className="w-8 h-1.5 rounded-full bg-creamDark" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-serif text-ink tracking-tight mb-1.5">
          {t.intentTitle} <span className="italic text-terracotta">{t.intentItalic}</span>
        </h1>
        <p className="text-xs text-muted leading-relaxed mb-5">
          {t.intentSubtitle}
        </p>

        {/* Occasion Option Cards */}
        <div className="space-y-2.5">
          {occasionsList.map((key) => {
            const isSelected = preferences.occasion === key;
            const item = t.occasions[key];

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectOccasion(key)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between min-h-[56px] active:scale-[0.99] ${
                  isSelected
                    ? 'border-terracotta bg-cream shadow-sm ring-1 ring-terracotta/40'
                    : 'border-line bg-warm hover:bg-cream/50'
                }`}
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-warm border border-terracotta/30' : 'bg-cream'
                  }`}>
                    {occasionIcons[key]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink leading-tight">
                      {item.label}
                    </h3>
                    <p className="text-[12px] text-muted leading-tight mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-terracotta text-white' : 'border border-line'
                }`}>
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-6">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3.5 px-6 rounded-xl bg-terracotta hover:bg-terracottaDark text-white font-semibold text-base shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 group min-h-[48px]"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
