import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const env = (typeof import.meta !== 'undefined' && import.meta.env) 
  ? import.meta.env 
  : (typeof process !== 'undefined' && process.env ? process.env : {}) as any;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'puja-look-demo.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'puja-look-demo',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'puja-look-demo.appspot.com',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DEMOTAG',
};

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally (only in browser environments where supported)
export let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported && env.VITE_FIREBASE_MEASUREMENT_ID) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        console.warn('Firebase Analytics disabled in current environment.');
      }
    }
  });
}
