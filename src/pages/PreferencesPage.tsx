import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { StyleAesthetic, BudgetTier, ColorPreference, SizeOption } from '../types';
import { trackAnalyticsEvent } from '../analytics';
import { Sparkles, ArrowRight } from 'lucide-react';

const budgetOptions: { id: BudgetTier; label: string }[] = [
  { id: 'Under ₹2,000', label: 'Under ₹2k' },
  { id: '₹2,000–₹4,000', label: '₹2k–₹4k' },
  { id: '₹4,000–₹7,000', label: '₹4k–₹7k' },
  { id: '₹7,000+', label: '₹7k+' },
];

const styleOptions: StyleAesthetic[] = ['traditional', 'modern', 'fusion', 'simple'];

const colorOptions: { id: ColorPreference; labelKey: 'any' | 'light' | 'dark' | 'festive' }[] = [
  { id: 'Any', labelKey: 'any' },
  { id: 'Light', labelKey: 'light' },
  { id: 'Dark', labelKey: 'dark' },
  { id: 'Festive', labelKey: 'festive' },
];

const sizeOptions: SizeOption[] = ['S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

export const PreferencesPage: React.FC = () => {
  const { shop, shopSlug, preferences, updatePreference, t } = useShop();
  const navigate = useNavigate();

  const handleFindLook = () => {
    trackAnalyticsEvent('preferences_submitted', {
      occasion: preferences.occasion,
      budget: preferences.budget,
      style: preferences.style,
      color: preferences.color,
      size: preferences.size,
      shopId: shop?.id,
    });
    navigate(`/shop/${shopSlug}/recommendations`);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 pt-3">
      <div>
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-muted">
            {t.step2of2}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-1.5 rounded-full bg-creamDark" />
            <div className="w-8 h-1.5 rounded-full bg-terracotta" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-serif text-ink tracking-tight mb-1">
          {t.prefTitle} <span className="italic text-terracotta">{t.prefItalic}</span>
        </h1>
        <p className="text-xs text-muted leading-relaxed mb-6">
          {t.prefSubtitle}
        </p>

        {/* 1. Budget Tier Selection */}
        <div className="mb-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
            {t.budgetLabel}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {budgetOptions.map((opt) => {
              const isSelected = preferences.budget === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updatePreference('budget', opt.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all min-h-[44px] active:scale-95 ${
                    isSelected
                      ? 'bg-terracotta text-white border-terracotta shadow-sm'
                      : 'bg-cream/60 text-ink border-line hover:bg-cream'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Style Aesthetic Selection */}
        <div className="mb-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
            {t.styleLabel}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {styleOptions.map((opt) => {
              const isSelected = preferences.style === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updatePreference('style', opt)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left transition-all min-h-[44px] flex items-center justify-between active:scale-[0.98] ${
                    isSelected
                      ? 'bg-cream border-terracotta text-ink ring-1 ring-terracotta/40 font-semibold'
                      : 'bg-warm border-line text-muted hover:bg-cream/50'
                  }`}
                >
                  <span>{t.styles[opt]}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Colour Tone Selection */}
        <div className="mb-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
            {t.colourLabel}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {colorOptions.map((opt) => {
              const isSelected = preferences.color === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updatePreference('color', opt.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left transition-all min-h-[44px] flex items-center justify-between active:scale-[0.98] ${
                    isSelected
                      ? 'bg-cream border-terracotta text-ink ring-1 ring-terracotta/40 font-semibold'
                      : 'bg-warm border-line text-muted hover:bg-cream/50'
                  }`}
                >
                  <span>{t.colours[opt.labelKey]}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Size Selection */}
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
            {t.sizeLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((opt) => {
              const isSelected = preferences.size === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updatePreference('size', opt)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all min-h-[42px] active:scale-95 ${
                    isSelected
                      ? 'bg-ink text-warm border-ink shadow-sm'
                      : 'bg-cream/50 text-ink border-line hover:bg-cream'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Find My Look CTA */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleFindLook}
          className="w-full py-3.5 px-6 rounded-xl bg-terracotta hover:bg-terracottaDark text-white font-semibold text-base shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 group min-h-[48px]"
        >
          <Sparkles size={18} className="text-gold" />
          <span>{t.findLookCTA}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform ml-auto" />
        </button>
      </div>
    </div>
  );
};
