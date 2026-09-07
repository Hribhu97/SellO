import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Reservation, Product } from '../types';
import { CheckCircle2, Clock, MapPin, ArrowRight, Sparkles, Navigation } from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { shop, shopSlug, t } = useShop();

  // Retrieve reservation and product from router state if available
  const state = location.state as { reservation?: Reservation; product?: Product } | undefined;
  const reservation = state?.reservation;
  const product = state?.product;

  const displayId = reservation?.id || reservationId || 'RES-DEMO';
  const itemName = reservation?.productSnapshot?.name || product?.name || 'Handloom Festive Piece';
  const itemPrice = reservation?.productSnapshot?.price || product?.price || 2499;
  const itemSize = reservation?.selectedSize || 'M';
  const itemColour = reservation?.selectedColour || 'Festive';

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    shop ? `${shop.name}, ${shop.address}` : 'Maa Tara Bastralaya, Gariahat, Kolkata'
  )}`;

  return (
    <div className="flex-1 flex flex-col justify-between p-5 pt-3 pb-8">
      <div>
        {/* Success Icon Animation */}
        <div className="flex items-center justify-center my-3">
          <div className="w-16 h-16 rounded-full bg-templeGreen/15 border border-templeGreen/30 flex items-center justify-center text-templeGreen shadow-sm">
            <CheckCircle2 size={36} className="animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-serif text-ink tracking-tight mb-1">
            {t.confTitle} <span className="italic text-terracotta">{t.confItalic}</span>
          </h1>
          <p className="text-xs text-muted max-w-xs mx-auto">
            {t.confSubtitle}
          </p>
        </div>

        {/* The Boutique Reservation Pass */}
        <div className="rounded-2xl border-2 border-dashed border-terracotta/40 bg-cream/70 p-5 shadow-sm relative overflow-hidden mb-5">
          {/* Subtle Top Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-terracotta via-gold to-templeGreen" />

          {/* Pass Header */}
          <div className="flex items-center justify-between border-b border-line pb-3 mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-muted font-bold block">
                {t.resIdLabel}
              </span>
              <span className="text-2xl font-mono font-bold text-terracotta tracking-wider">
                #{displayId}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-goldLight border border-gold/30 text-ink text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>{t.statusPending}</span>
            </div>
          </div>

          {/* Pass Details */}
          <div className="space-y-2.5 text-xs text-ink">
            <div className="flex justify-between items-start">
              <span className="text-muted font-medium">{t.itemLabel}:</span>
              <span className="font-bold font-serif text-sm text-right max-w-[220px]">
                {itemName}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted font-medium">{t.sizeColourLabel}:</span>
              <span className="font-mono font-semibold">
                {itemSize} &bull; {itemColour}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-line/60">
              <span className="text-muted font-medium">{t.payablePriceLabel}:</span>
              <span className="text-base font-serif font-bold text-terracotta">
                ₹{itemPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Staff Counter Instruction */}
          <div className="mt-4 p-3 rounded-xl bg-warm border border-line flex items-start gap-2.5 text-xs">
            <Sparkles size={16} className="text-gold shrink-0 mt-0.5" />
            <p
              className="text-ink text-[12px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t.counterInstruction }}
            />
          </div>

          {/* Expiry Warning */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-terracotta">
            <Clock size={13} />
            <span>{t.expiryNotice}</span>
          </div>
        </div>

        {/* Store Location Card */}
        <div className="p-3.5 rounded-xl bg-warm border border-line flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0 text-terracotta">
              <MapPin size={16} />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-ink truncate">
                {shop?.name || t.storeDefaultName}
              </h4>
              <p className="text-[11px] text-muted truncate">
                {shop?.address || t.storeDefaultLocation}
              </p>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-cream hover:bg-creamDark border border-line text-xs font-semibold text-ink flex items-center gap-1 shrink-0 transition-colors"
          >
            <Navigation size={12} className="text-terracotta" />
            <span>Map</span>
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-xl bg-templeGreen hover:bg-templeGreenDark text-white font-semibold text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Navigation size={16} />
          <span>{t.getDirectionsCTA}</span>
        </a>

        <button
          type="button"
          onClick={() => navigate(`/shop/${shopSlug}`)}
          className="w-full py-3 px-6 rounded-xl bg-cream hover:bg-creamDark text-ink font-medium text-xs border border-line transition-colors min-h-[44px]"
        >
          {t.continueShoppingCTA}
        </button>
      </div>
    </div>
  );
};
