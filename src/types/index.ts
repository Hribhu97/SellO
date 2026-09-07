export type ProductCategory = 'saree' | 'kurta' | 'kurta-set' | 'dress' | 'shirt';

export type ReservationStatus = 'pending' | 'confirmed' | 'collected' | 'cancelled';

export type Occasion = 'puja' | 'dinner' | 'family' | 'office' | 'outing';

export type StyleAesthetic = 'traditional' | 'modern' | 'fusion' | 'simple';

export type BudgetTier = 'Under ₹2,000' | '₹2,000–₹4,000' | '₹4,000–₹7,000' | '₹7,000+';

export type ColorPreference = 'Any' | 'Light' | 'Dark' | 'Festive';

export type SizeOption = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size';

export interface Shop {
  id: string;
  name: string;
  nameBn?: string;
  slug: string;
  location: string;
  locationBn?: string;
  address: string;
  addressBn?: string;
  phone?: string;
  logoUrl?: string;
  description?: string;
  active: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
  sizes: string[];
  colours: string[];
  occasionTags: string[];
  styleTags: string[];
  stockQuantity: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSnapshot {
  name: string;
  nameBn?: string;
  price: number;
  imageUrl?: string;
}

export interface Reservation {
  id: string;
  shopId: string;
  productId: string;
  customerName: string;
  customerPhone: string;
  selectedSize: string;
  selectedColour: string;
  productSnapshot: ProductSnapshot;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string; // 2 hours from creation
}

export interface UserPreferences {
  occasion: Occasion;
  budget: BudgetTier;
  style: StyleAesthetic;
  color: ColorPreference;
  size: SizeOption;
}

export interface RecommendedItem {
  productId: string;
  product: Product;
  reason: string;
  reasonBn: string;
}

export interface RecommendationResponse {
  recommendations: RecommendedItem[];
  totalCandidates: number;
  noteEn?: string;
  noteBn?: string;
}

export interface MerchantStats {
  totalProducts: number;
  availableProducts: number;
  pendingReservations: number;
  confirmedReservations: number;
  collectedReservations: number;
}
