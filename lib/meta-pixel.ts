// Meta (Facebook) Pixel — shared constants + typed helpers.
// The Pixel is only ever initialised by <MetaPixel /> AFTER cookie consent,
// so every helper here no-ops safely when fbq is absent (no consent / not loaded).

export const META_PIXEL_ID = '1149455719876218';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (params) window.fbq('track', event, params);
  else window.fbq('track', event);
}

// Fired when a visitor clicks through from the site to the external Planway
// booking system — our strongest on-site intent signal. The completed booking
// itself is tracked by Planway's own conversion on their thank-you page.
export function trackBooking(): void {
  track('Schedule');
}
