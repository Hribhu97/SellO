import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';
import { Shop, Product } from '../../types';
import { DEMO_SHOP, DEMO_PRODUCTS } from '../../data/demoShop';

// In-memory fallback state for smooth offline/dev execution
let localProducts = [...DEMO_PRODUCTS];

// Helper to check if using demo dummy credentials
const isDemoMode = !db.app.options.apiKey || db.app.options.apiKey === 'demo-api-key';

function withTimeout<T>(promise: Promise<T>, ms: number = 800): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore timeout, using local store')), ms)
    ),
  ]);
}

export async function getShopBySlug(slug: string): Promise<Shop | null> {
  if (isDemoMode) {
    if (slug === DEMO_SHOP.slug || slug === 'demo' || slug === 'default' || !slug) {
      return DEMO_SHOP;
    }
  }

  try {
    const shopsRef = collection(db, 'shops');
    const q = query(shopsRef, where('slug', '==', slug), where('active', '==', true));
    const snap = await withTimeout(getDocs(q), 1000);

    if (!snap.empty) {
      const docData = snap.docs[0];
      return { id: docData.id, ...docData.data() } as Shop;
    }
  } catch (err) {
    console.warn('Firestore shop query failed or timed out, using demo shop fallback:', err);
  }

  // Fallback to demo shop if slug matches
  if (slug === DEMO_SHOP.slug || slug === 'demo' || slug === 'default' || !slug) {
    return DEMO_SHOP;
  }

  return null;
}

export async function getShopProducts(shopId: string, category?: string): Promise<Product[]> {
  if (isDemoMode) {
    let filtered = localProducts.filter(p => p.shopId === shopId && p.isAvailable);
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return filtered;
  }

  try {
    const productsRef = collection(db, 'products');
    let q = query(
      productsRef, 
      where('shopId', '==', shopId), 
      where('isAvailable', '==', true)
    );

    if (category && category !== 'all') {
      q = query(q, where('category', '==', category));
    }

    const snap = await withTimeout(getDocs(q), 1000);
    if (!snap.empty) {
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
    }
  } catch (err) {
    console.warn('Firestore products query failed, using local product catalog:', err);
  }

  // Fallback to local products
  let filtered = localProducts.filter(p => p.shopId === shopId && p.isAvailable);
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  return filtered;
}

export async function getProductById(productId: string): Promise<Product | null> {
  if (isDemoMode) {
    return localProducts.find(p => p.id === productId) || null;
  }

  try {
    const prodRef = doc(db, 'products', productId);
    const snap = await withTimeout(getDoc(prodRef), 1000);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Product;
    }
  } catch (err) {
    console.warn('Firestore product getDoc failed, searching local fallback:', err);
  }

  return localProducts.find(p => p.id === productId) || null;
}

export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const now = new Date().toISOString();

  if (isDemoMode) {
    const localId = 'prod_' + Date.now();
    const newProd = {
      id: localId,
      ...productData,
      createdAt: now,
      updatedAt: now
    };
    localProducts.unshift(newProd);
    return newProd;
  }

  try {
    const productsRef = collection(db, 'products');
    const docRef = await withTimeout(addDoc(productsRef, {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }), 1500);

    const newProd = {
      id: docRef.id,
      ...productData,
      createdAt: now,
      updatedAt: now
    };
    localProducts.unshift(newProd);
    return newProd;
  } catch (err) {
    console.warn('Firestore createProduct failed, saving to local store:', err);
    const localId = 'prod_' + Date.now();
    const newProd = {
      id: localId,
      ...productData,
      createdAt: now,
      updatedAt: now
    };
    localProducts.unshift(newProd);
    return newProd;
  }
}

export async function updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
  const now = new Date().toISOString();

  if (!isDemoMode) {
    try {
      const prodRef = doc(db, 'products', productId);
      await withTimeout(updateDoc(prodRef, {
        ...updates,
        updatedAt: serverTimestamp()
      }), 1500);
    } catch (err) {
      console.warn('Firestore updateProduct failed, updating local store:', err);
    }
  }

  const idx = localProducts.findIndex(p => p.id === productId);
  if (idx !== -1) {
    localProducts[idx] = { ...localProducts[idx], ...updates, updatedAt: now };
    return localProducts[idx];
  }

  throw new Error('Product not found');
}

export async function deleteProduct(productId: string): Promise<boolean> {
  if (!isDemoMode) {
    try {
      const prodRef = doc(db, 'products', productId);
      await withTimeout(deleteDoc(prodRef), 1500);
    } catch (err) {
      console.warn('Firestore deleteProduct failed, removing from local store:', err);
    }
  }

  const idx = localProducts.findIndex(p => p.id === productId);
  if (idx !== -1) {
    localProducts.splice(idx, 1);
    return true;
  }
  return false;
}
