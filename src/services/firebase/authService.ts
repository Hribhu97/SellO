import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from './config';

export function onMerchantAuthStateChanged(callback: (user: User | null) => void) {
  try {
    return onAuthStateChanged(auth, callback);
  } catch (err) {
    // If Firebase Auth not configured, allow local dev session
    const localUser = localStorage.getItem('puja_merchant_user');
    callback(localUser ? { email: localUser } as any : null);
    return () => {};
  }
}

export async function loginMerchant(email: string, password: string): Promise<User> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  } catch (err: any) {
    // In local demo mode, support demo login: merchant@maatarabastra.com / demo123
    if (email === 'merchant@maatarabastra.com' && password === 'demo123') {
      const mockUser = { email: 'merchant@maatarabastra.com', uid: 'demo-merchant-uid' } as User;
      localStorage.setItem('puja_merchant_user', mockUser.email || '');
      return mockUser;
    }
    throw new Error(err.message || 'Invalid credentials');
  }
}

export async function logoutMerchant(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    // ignore
  }
  localStorage.removeItem('puja_merchant_user');
}
