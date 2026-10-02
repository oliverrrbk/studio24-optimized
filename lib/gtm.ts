// Google Tag Manager (PurposeAds, Google Ads) — shared constants + typed helpers.
// The container itself and the Consent Mode v2 defaults are inlined in
// app/layout.tsx's <head>, so they run before anything else. Everything here
// only pushes to dataLayer, which is safe with or without consent: Google's own
// tags read the consent state and hold back by themselves.

import type { ConsentValue } from '@/lib/consent';

export const GTM_ID = 'GTM-NZKL938S';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window.gtag === 'function') window.gtag(...args);
  // gtag only works with the real `arguments` object, never a plain array.
  // eslint-disable-next-line prefer-rest-params
  else (window.dataLayer = window.dataLayer || []).push(arguments);
}

// Every event carries page_path, because the site navigates client-side and
// GTM's own page variables keep describing the page that was loaded first.
export function pushEvent(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  (window.dataLayer = window.dataLayer || []).push({
    event,
    page_path: window.location.pathname,
    ...params,
  });
}

// Mirrors the inline default in layout.tsx: one switch for all four signals,
// because the banner only offers "Accepter alle" / "Kun nødvendige".
export function updateConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return;
  const state = value === 'granted' ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
  // Also as a plain event, so a tag can trigger on the moment of consent.
  pushEvent('consent_update', {
    analytics_consent: value === 'granted',
    marketing_consent: value === 'granted',
  });
}

// The inline <head> script: Consent Mode v2 defaults, then a returning
// visitor's stored choice — both before GTM loads, so no tag can ever fire
// unconsented. Keep in sync with public/tak-for-din-booking.html.
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','wait_for_update':500});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
try{var sdc=localStorage.getItem('sd-cookie-consent');
if(sdc==='granted'||sdc==='denied'){gtag('consent','update',{'ad_storage':sdc,'ad_user_data':sdc,'ad_personalization':sdc,'analytics_storage':sdc});}}catch(e){}
`;

// Character-for-character the snippet PurposeAds sent.
export const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
