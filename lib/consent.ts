// Lightweight, dependency-free cookie-consent state.
// Marketing/statistics cookies (the Meta Pixel) may only load AFTER the visitor
// has actively accepted — required under the Danish/EU ePrivacy + GDPR rules.
// Consent lives in localStorage; a window event lets the pixel + banner react
// live, without a page reload.

export const CONSENT_KEY = 'sd-cookie-consent';
export const CONSENT_EVENT = 'sd-consent-change';

export type ConsentValue = 'granted' | 'denied';

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
}

export function setConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

// Clears a previous choice and re-opens the banner, so a visitor can change or
// withdraw consent as easily as they gave it (a GDPR requirement).
export function resetConsent(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}
