import { analytics } from '../services/firebase/config';
import { logEvent } from 'firebase/analytics';

export function trackAnalyticsEvent(eventName: string, params: Record<string, any> = {}) {
  // Sanitize: Do not send phone numbers or sensitive PII to analytics (Section 33 requirement)
  const safeParams = { ...params };
  delete safeParams.customerPhone;
  delete safeParams.phone;
  delete safeParams.mobile;

  if (analytics) {
    try {
      logEvent(analytics, eventName, safeParams);
    } catch (err) {
      // ignore
    }
  }

  // Also log to console in development
  const isDev = (typeof import.meta !== 'undefined' && import.meta.env?.DEV) || 
                (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development');
  if (isDev) {
    console.debug(`[Analytics: ${eventName}]`, safeParams);
  }
}
