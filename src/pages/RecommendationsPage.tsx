import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { RecommendedItem } from '../types';
import { getRecommendations } from '../services/firebase/recommendationService';
import { trackAnalyticsEvent } from '../analytics';
import { Sparkles, SlidersHorizontal, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const { shop, shopSlug, preferences, lang, t } = useShop();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<RecommendedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!shop) return;

    setLoading(true);
    setError(null);

    getRecommendations(shop.id, preferences, lang)
      .then((items) => {
        if (!isMounted) return;
        setRecommendations(items);
        trackAnalyticsEvent('recommendation_viewed', {
          count: items.length,
          shopId: shop.id,
          occasion: preferences.occasion,
        });
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Error fetching recommendations');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [shop, preferences, lang]);

  const handleSelectProduct = (productId: string) => {
    trackAnalyticsEvent('product_clicked', { productId, shopId: shop?.id });
    navigate(`/shop/${shopSlug}/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex-1 p-5 pt-3">
        <div className="h-6 w-32 rounded bg-creamDark animate-shimmer mb-2" />
        <div className="h-4 w-48 rounded bg-creamDark animate-shimmer mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl border border-line bg-cream/40 p-4 space-y-3">
              <div className="h-48 rounded-xl bg-creamDark animate-shimmer" />
              <div className="h-5 w-3/4 rounded bg-creamDark animate-shimmer" />
              <div className="h-4 w-1/3 rounded bg-creamDark animate-shimmer" />
              <div className="h-16 rounded-lg bg-creamDark animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-5 pt-3 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-3xl font-serif text-ink tracking-tight mb-1">
            {t.recsTitle} <span className="italic text-terracotta">{t.recsItalic}</span>
          </h1>
          <p className="text-xs text-muted">
            {t.recsSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/shop/${shopSlug}/preferences`)}
          className="p-2 rounded-xl bg-cream hover:bg-creamDark text-ink text-xs font-semibold flex items-center gap-1.5 border border-line shrink-0 transition-colors"
          title={t.adjustPreferences}
        >
          <SlidersHorizontal size={14} className="text-terracotta" />
          <span className="hidden sm:inline">{t.adjustPreferences}</span>
        </button>
      </div>

      {/* When no recommendations found */}
      {recommendations.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-cream/50 border border-line my-6">
          <div className="w-12 h-12 rounded-full bg-creamDark flex items-center justify-center mx-auto mb-4 text-terracotta">
            <RefreshCw size={24} />
          </div>
          <h3 className="text-xl font-serif font-bold text-ink mb-2">
            {t.noCandidatesTitle}
          </h3>
          <p className="text-xs text-muted max-w-xs mx-auto mb-6">
            {t.noCandidatesDesc}
          </p>
          <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => navigate(`/shop/${shopSlug}/intent`)}
              className="py-3 px-4 rounded-xl bg-terracotta hover:bg-terracottaDark text-white text-xs font-semibold"
            >
              {t.startOverCTA}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/shop/${shopSlug}/browse`)}
              className="py-2.5 px-4 rounded-xl bg-warm hover:bg-cream text-ink text-xs font-semibold border border-line"
            >
              {t.browseAllCTA}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Note when fewer than 3 matches */}
          {recommendations.length < 3 && (
            <div className="mb-4 px-3 py-2 rounded-lg bg-goldLight border border-gold/30 text-[12px] text-ink flex items-center gap-2">
              <Sparkles size={14} className="text-gold shrink-0" />
              <span>{t.fewerMatchesNote}</span>
            </div>
          )}

          {/* List of 3 Recommended Cards */}
          <div className="space-y-6">
            {recommendations.map((item, index) => {
              const { product } = item;
              const productName = lang === 'bn' && product.nameBn ? product.nameBn : product.name;
              const productDesc = lang === 'bn' && product.descriptionBn ? product.descriptionBn : product.description;
              const matchReason = lang === 'bn' && item.reasonBn ? item.reasonBn : item.reason;

              return (
                <div
                  key={product.id}
                  className="rounded-2xl border border-line bg-cream/40 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={productName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    {/* In-Store Badge */}
                    <div className="absolute top-3 left-3 bg-warm/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-line text-[11px] font-bold text-ink flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-templeGreen animate-pulse" />
                      <span>{t.inStoreMatches}</span>
                    </div>

                    {/* Rank Badge */}
                    <div className="absolute top-3 right-3 bg-ink/80 backdrop-blur-md px-2.5 py-1 rounded-full text-warm text-[11px] font-mono font-semibold">
                      #{index + 1}
                    </div>

                    {/* Price Ribbon */}
                    <div className="absolute bottom-3 left-3 bg-warm/95 backdrop-blur-md px-3 py-1 rounded-lg border border-line shadow-sm">
                      <span className="text-xs text-muted block text-[10px] uppercase font-bold tracking-wider">
                        {t.finalPriceLabel}
                      </span>
                      <span className="text-base font-serif font-bold text-terracotta">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h2 className="text-lg font-serif font-bold text-ink leading-snug group-hover:text-terracotta transition-colors">
                        {productName}
                      </h2>
                      <p className="text-xs text-muted mt-0.5 line-clamp-2">
                        {productDesc}
                      </p>
                    </div>

                    {/* "Why it matches" AI Reason Box */}
                    <div className="p-3 rounded-xl bg-goldLight/80 border border-gold/30 flex items-start gap-2.5 text-xs text-ink">
                      <Sparkles size={15} className="text-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[11px] uppercase tracking-wider text-ink/80 block">
                          {t.whyMatchesLabel}
                        </span>
                        <p className="text-xs font-medium text-ink leading-relaxed mt-0.5">
                          {matchReason}
                        </p>
                      </div>
                    </div>

                    {/* Sizes and Details Footer */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-medium text-muted mr-1">{t.availableSizes}:</span>
                        {product.sizes.map((sz) => (
                          <span
                            key={sz}
                            className="px-2 py-0.5 rounded bg-cream border border-line text-[11px] font-mono font-medium text-ink"
                          >
                            {sz}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      type="button"
                      onClick={() => handleSelectProduct(product.id)}
                      className="w-full mt-1 py-3 px-4 rounded-xl bg-terracotta hover:bg-terracottaDark text-white text-xs font-semibold shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 group min-h-[44px]"
                    >
                      <span>{t.viewLookCTA}</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary browse catalog action */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => navigate(`/shop/${shopSlug}/browse`)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
            >
              <ShoppingBag size={14} />
              <span>{t.browseAllCTA}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
