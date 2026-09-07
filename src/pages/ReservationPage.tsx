import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { getProductById } from '../services/firebase/shopService';
import { createReservation } from '../services/firebase/reservationService';
import { trackAnalyticsEvent } from '../analytics';
import { ShieldCheck, ArrowRight, Lock, AlertCircle, Sparkles } from 'lucide-react';

export const ReservationPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [searchParams] = useSearchParams();
  const { shop, shopSlug, lang, t } = useShop();
  const navigate = useNavigate();

  const selectedSize = searchParams.get('size') || 'M';
  const selectedColour = searchParams.get('colour') || 'Original';

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!productId) return;

    setLoading(true);
    getProductById(productId)
      .then((item) => {
        if (!isMounted) return;
        if (item) {
          setProduct(item);
        } else {
          setError('Product not found.');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Error loading product');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !shop) return;

    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError(t.errNameReq);
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError(t.errPhoneInvalid);
      return;
    }

    setSubmitting(true);
    try {
      const reservation = await createReservation({
        shopId: shop.id,
        productId: product.id,
        customerName: trimmedName,
        customerPhone: cleanPhone,
        selectedSize,
        selectedColour,
      });

      trackAnalyticsEvent('reservation_created', {
        reservationId: reservation.id,
        shopId: shop.id,
        productId: product.id,
        price: product.price,
      });

      // Navigate to Screen 7 (Confirmation) with the created reservation
      navigate(`/shop/${shopSlug}/confirmation/${reservation.id}`, {
        state: { reservation, product },
      });
    } catch (err: any) {
      setError(err.message || t.resFailedErr);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-5 pt-3">
        <div className="h-6 w-36 rounded bg-creamDark animate-shimmer mb-4" />
        <div className="h-24 rounded-xl bg-creamDark animate-shimmer mb-6" />
        <div className="h-12 rounded-xl bg-creamDark animate-shimmer mb-4" />
        <div className="h-12 rounded-xl bg-creamDark animate-shimmer" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 p-6 text-center">
        <p className="text-sm text-terracotta">{error || 'Product not found'}</p>
      </div>
    );
  }

  const productName = lang === 'bn' && product.nameBn ? product.nameBn : product.name;

  return (
    <div className="flex-1 flex flex-col justify-between p-5 pt-3 pb-8">
      <div>
        {/* Header */}
        <h1 className="text-3xl font-serif text-ink tracking-tight mb-1">
          {t.reserveTitle} <span className="italic text-terracotta">{t.reserveItalic}</span>
        </h1>
        <p className="text-xs text-muted leading-relaxed mb-5">
          {t.reserveSubtitle}
        </p>

        {/* Item Summary Card */}
        <div className="p-3.5 rounded-2xl bg-cream/70 border border-line flex items-center gap-3.5 mb-5 shadow-sm">
          <img
            src={product.imageUrl}
            alt={productName}
            className="w-16 h-16 rounded-xl object-cover object-center border border-line bg-cream shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-serif font-bold text-ink truncate">
              {productName}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {selectedSize} &bull; {selectedColour}
            </p>
            <p className="text-xs font-bold text-terracotta mt-0.5">
              {t.finalPriceLabel}: ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-terracotta/10 border border-terracotta/20 text-xs text-terracotta flex items-start gap-2 font-medium">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Reservation Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
              {t.nameLabel} <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-warm border border-line focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm text-ink placeholder:text-muted/60 transition-all min-h-[48px]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
              {t.phoneLabel} <span className="text-terracotta">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-semibold text-muted">
                +91
              </div>
              <input
                type="tel"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder={t.phonePlaceholder}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-warm border border-line focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-sm font-mono text-ink placeholder:text-muted/60 transition-all min-h-[48px]"
              />
            </div>
            <p className="text-[11px] text-muted mt-1 leading-normal">
              {t.phoneHint}
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="p-3 rounded-xl bg-cream/40 border border-line space-y-2 mt-4">
            <div className="flex items-center gap-2 text-[12px] text-templeGreen font-semibold">
              <ShieldCheck size={16} className="shrink-0" />
              <span>Zero Advance Payment &bull; Pay at Counter</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted">
              <Lock size={13} className="shrink-0" />
              <span>We never sell or spam your phone number.</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-xl bg-terracotta hover:bg-terracottaDark disabled:opacity-60 text-white font-semibold text-base shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Reserving on Rack...</span>
                </>
              ) : (
                <>
                  <span>{t.confirmReservationCTA}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
