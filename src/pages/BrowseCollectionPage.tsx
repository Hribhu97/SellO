import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory } from '../types';
import { getShopProducts } from '../services/firebase/shopService';
import { trackAnalyticsEvent } from '../analytics';
import { ChevronLeft, Filter, Sparkles } from 'lucide-react';

export const BrowseCollectionPage: React.FC = () => {
  const { shop, shopSlug, lang, t } = useShop();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!shop) return;

    setLoading(true);
    getShopProducts(shop.id)
      .then((items) => {
        if (!isMounted) return;
        setProducts(items);
      })
      .catch((err) => {
        console.error('Error fetching collection:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [shop]);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t.allCategory },
    { id: 'saree', label: t.sarees },
    { id: 'kurta', label: t.kurtas },
    { id: 'kurta-set', label: t.kurtaSets },
    { id: 'dress', label: t.dresses },
    { id: 'shirt', label: t.shirts },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleProductClick = (productId: string) => {
    trackAnalyticsEvent('product_clicked', { productId, shopId: shop?.id });
    navigate(`/shop/${shopSlug}/product/${productId}`);
  };

  return (
    <div className="flex-1 p-5 pt-3 pb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <button
            type="button"
            onClick={() => navigate(`/shop/${shopSlug}`)}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-ink mb-1 transition-colors"
          >
            <ChevronLeft size={16} />
            <span>{t.back}</span>
          </button>
          <h1 className="text-3xl font-serif text-ink tracking-tight">
            {t.browseTitle} <span className="italic text-terracotta">{t.browseItalic}</span>
          </h1>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-semibold text-muted bg-cream px-2.5 py-1 rounded-full border border-line">
            {filteredProducts.length} {t.itemsCount}
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all active:scale-95 ${
                isSelected
                  ? 'bg-terracotta text-white border-terracotta shadow-sm'
                  : 'bg-cream text-ink border-line hover:bg-creamDark'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="rounded-2xl border border-line bg-cream/40 p-2.5 space-y-2">
              <div className="aspect-[4/3] rounded-xl bg-creamDark animate-shimmer" />
              <div className="h-4 w-3/4 rounded bg-creamDark animate-shimmer" />
              <div className="h-3 w-1/2 rounded bg-creamDark animate-shimmer" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const productName = lang === 'bn' && product.nameBn ? product.nameBn : product.name;
            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="rounded-2xl border border-line bg-cream/30 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
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
                  <div className="absolute bottom-2 left-2 bg-warm/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-mono font-bold text-terracotta border border-line">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-2.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted font-bold block mb-0.5">
                    {product.category}
                  </span>
                  <h3 className="text-xs font-serif font-bold text-ink leading-tight line-clamp-2 group-hover:text-terracotta transition-colors">
                    {productName}
                  </h3>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-muted">
                    <span>{product.sizes.slice(0, 3).join(', ')}</span>
                    <span className="font-semibold text-templeGreen">On Rack</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
