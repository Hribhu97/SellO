import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Product, SizeOption } from '../types';
import { getProductById } from '../services/firebase/shopService';
import { trackAnalyticsEvent } from '../analytics';
import { ChevronLeft, ArrowRight } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { shop, shopSlug, preferences, lang, t } = useShop();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption | string>('');
  const [selectedColour, setSelectedColour] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!productId) return;

    setLoading(true);
    setError(null);

    getProductById(productId)
      .then((item) => {
        if (!isMounted) return;
        if (item) {
          setProduct(item);
          const preferredSizeMatch = item.sizes.find((s) => s === preferences.size);
          setSelectedSize(preferredSizeMatch || item.sizes[0] || 'M');
          setSelectedColour(item.colours[0] || 'Original');
          trackAnalyticsEvent('product_clicked', { productId: item.id, shopId: shop?.id });
        } else {
          setError('Product not found in this boutique');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Error loading product details');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId, shop, preferences.size]);

  const handleReserve = () => {
    if (!product) return;
    const query = new URLSearchParams({
      size: selectedSize,
      colour: selectedColour,
    }).toString();

    navigate(`/shop/${shopSlug}/reserve/${product.id}?${query}`);
  };

  if (loading) {
    return (
      <div className="flex-1 p-5 pt-3">
        <div className="h-6 w-36 rounded bg-creamDark animate-shimmer mb-4" />
        <div className="aspect-[4/3] rounded-2xl bg-creamDark animate-shimmer mb-4" />
        <div className="h-7 w-2/3 rounded bg-creamDark animate-shimmer mb-2" />
        <div className="h-5 w-1/4 rounded bg-creamDark animate-shimmer mb-4" />
        <div className="h-20 rounded-xl bg-creamDark animate-shimmer" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex-1 p-6 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-sm text-terracotta font-semibold mb-4">{error || 'Product not found'}</p>
        <button
          type="button"
          onClick={() => navigate(`/shop/${shopSlug}/recommendations`)}
          className="px-4 py-2 rounded-xl bg-cream text-ink text-xs font-semibold border border-line"
        >
          {t.backToRecs}
        </button>
      </div>
    );
  }

  const isAvailable = product.isAvailable && product.stockQuantity > 0;
  const productName = lang === 'bn' && product.nameBn ? product.nameBn : product.name;
  const productDesc = lang === 'bn' && product.descriptionBn ? product.descriptionBn : product.description;

  return (
    <div className="flex-1 flex flex-col justify-between p-5 pt-3 pb-8">
      <div>
        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-ink mb-3 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>{t.backToRecs}</span>
        </button>

        {/* Product Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line bg-cream mb-4 shadow-sm">
          <img
            src={product.imageUrl}
            alt={productName}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80';
            }}
          />
          {/* Status Badge */}
          <div className="absolute top-3 left-3 bg-warm/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-line text-[11px] font-bold text-ink flex items-center gap-1.5 shadow-sm">
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-templeGreen animate-pulse' : 'bg-terracotta'}`} />
            <span>{isAvailable ? t.inStockStatus : 'Reserved'}</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-ink/80 backdrop-blur-md px-2.5 py-1 rounded-full text-warm text-[11px] font-mono">
            {product.stockQuantity} in stock
          </div>
        </div>

        {/* Title and Category */}
        <div className="mb-4">
          <span className="text-[11px] uppercase tracking-wider text-muted font-bold block mb-1">
            {product.category}
          </span>
          <h1 className="text-2xl font-serif font-bold text-ink leading-snug">
            {productName}
          </h1>

          {/* Pricing Highlight */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t.finalPriceLabel}:
            </span>
            <span className="text-2xl font-serif font-bold text-terracotta">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Size Selector */}
        <div className="mb-4 pt-2 border-t border-line">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
            {t.selectSizeLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((sz) => {
              const isSelected = selectedSize === sz;
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all min-h-[42px] active:scale-95 ${
                    isSelected
                      ? 'bg-terracotta text-white border-terracotta shadow-sm'
                      : 'bg-cream/60 text-ink border-line hover:bg-cream'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Colour Selection */}
        {product.colours && product.colours.length > 0 && (
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
              {t.availableColoursLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colours.map((col) => {
                const isSelected = selectedColour === col;
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setSelectedColour(col)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-ink text-warm border-ink shadow-sm'
                        : 'bg-warm text-muted border-line hover:bg-cream'
                    }`}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Description / Story */}
        <div className="p-3.5 rounded-xl bg-cream/70 border border-line mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1">
            {t.aboutPieceLabel}
          </span>
          <p className="text-xs text-ink/90 leading-relaxed">
            {productDesc}
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!isAvailable}
          onClick={handleReserve}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-base shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 group min-h-[48px] ${
            isAvailable
              ? 'bg-terracotta hover:bg-terracottaDark text-white'
              : 'bg-creamDark text-muted cursor-not-allowed shadow-none'
          }`}
        >
          <span>{isAvailable ? t.reserveAtCounterCTA : 'Item Currently Unavailable'}</span>
          {isAvailable && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
        </button>

        <p className="text-[11px] text-center text-muted mt-2">
          No advance payment &bull; Held for 2 hours at Counter 3
        </p>
      </div>
    </div>
  );
};
