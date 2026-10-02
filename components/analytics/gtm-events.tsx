'use client';

import { useEffect } from 'react';
import { pushEvent } from '@/lib/gtm';

/**
 * phone_click / email_click for Google Tag Manager. One document-level,
 * capture-phase listener covers every tel:/mailto: link on the site —
 * including ones inside the booking and privacy overlays and any added later —
 * with no onClick in the markup. link_location comes from the nearest
 * [data-link-location] wrapper ("footer", "booking", "privatlivspolitik"),
 * falling back to "side".
 */
export function GtmEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const kind = href.startsWith('tel:') ? 'phone_click' : href.startsWith('mailto:') ? 'email_click' : null;
      if (!kind) return;
      pushEvent(kind, {
        link_url: href,
        link_location: link.closest('[data-link-location]')?.getAttribute('data-link-location') || 'side',
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
