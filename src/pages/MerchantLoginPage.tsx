import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginMerchant } from '../services/firebase/authService';
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const MerchantLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginMerchant(email.trim(), password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('merchant@maatarabastra.com');
    setPassword('demo123');
  };

  return (
    <div className="flex-1 p-5 flex flex-col justify-center max-w-sm mx-auto w-full">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-terracotta/10 border border-terracotta/20 text-terracotta flex items-center justify-center mx-auto mb-3">
          <Shield size={24} />
        </div>
        <h1 className="text-2xl font-serif font-bold text-ink">
          Merchant Floor Portal
        </h1>
        <p className="text-xs text-muted mt-1">
          Counter staff login for real-time holds & rack inventory.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-terracotta/10 border border-terracotta/20 text-xs text-terracotta flex items-start gap-2">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              <Mail size={15} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="merchant@maatarabastra.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-warm border border-line text-xs text-ink focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              <Lock size={15} />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-warm border border-line text-xs text-ink focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-terracotta hover:bg-terracottaDark text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
        >
          {loading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Floor Portal</span>
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials Quick-Fill Helper */}
      <div className="mt-6 pt-4 border-t border-line text-center">
        <p className="text-[11px] text-muted mb-2">Need quick testing credentials?</p>
        <button
          type="button"
          onClick={handleQuickFill}
          className="text-xs font-semibold text-terracotta hover:underline inline-flex items-center gap-1"
        >
          Use Demo Credentials (Gariahat Boutique)
        </button>
      </div>
    </div>
  );
};
