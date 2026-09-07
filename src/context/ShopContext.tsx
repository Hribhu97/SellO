import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shop, UserPreferences } from '../types';
import { getShopBySlug } from '../services/firebase/shopService';
import { translations, Language } from '../i18n/translations';
import { trackAnalyticsEvent } from '../analytics';

interface ShopContextType {
  shop: Shop | null;
  shopSlug: string;
  lang: Language;
  t: typeof translations.en;
  setLanguage: (lang: Language) => void;
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  isLoading: boolean;
  error: string | null;
}

const defaultPreferences: UserPreferences = {
  occasion: 'puja',
  budget: '₹2,000–₹4,000',
  style: 'traditional',
  color: 'Festive',
  size: 'M',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { shopSlug = 'maa-tara-bastra' } = useParams<{ shopSlug: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('puja_look_lang') as Language) || 'en';
  });
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getShopBySlug(shopSlug)
      .then((shopData) => {
        if (!isMounted) return;
        if (shopData && shopData.active) {
          setShop(shopData);
          trackAnalyticsEvent('shop_viewed', { shopId: shopData.id, slug: shopSlug });
        } else {
          setError(t.shopNotFound);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Error loading boutique information');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [shopSlug, lang]);

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('puja_look_lang', newLang);
    trackAnalyticsEvent('language_selected', { language: newLang, shopSlug });
  };

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ShopContext.Provider
      value={{
        shop,
        shopSlug,
        lang,
        t,
        setLanguage,
        preferences,
        setPreferences,
        updatePreference,
        isLoading,
        error,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
