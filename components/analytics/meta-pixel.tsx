'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CONSENT_EVENT, getStoredConsent } from '@/lib/consent';
import { META_PIXEL_ID, track } from '@/lib/meta-pixel';

/**
 * Loads the Meta (Facebook) Pixel — but only once the visitor has accepted
 * cookies. The base snippet fires the initial PageView; client-side route
 * changes are handled by <PixelRouteEvents /> so nothing gets double-counted.
 */
export function MetaPixel() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => setGranted(getStoredConsent() === 'granted');
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!granted) return null;

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <PixelRouteEvents />
    </>
  );
}

/**
 * Next.js App Router navigates fully client-side, so only the very first page
 * load runs the base snippet's PageView. Here we fire PageView on every later
 * route change, plus a ViewContent for the two key service pages.
 */
function PixelRouteEvents() {
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;

    if (isFirstRun.current) {
      // Initial PageView is already sent by the base snippet — skip once so the
      // landing page isn't counted twice.
      isFirstRun.current = false;
    } else {
      track('PageView');
    }

    // ViewContent must also fire on a direct/ad landing straight onto these
    // pages, so it is intentionally NOT gated by the first-run guard above.
    if (pathname?.startsWith('/behandlinger')) {
      track('ViewContent', {
        content_name: 'Behandlinger og Priser',
        content_category: 'Ydelser',
      });
    } else if (pathname?.startsWith('/galleri')) {
      track('ViewContent', {
        content_name: 'Galleri og Inspiration',
        content_category: 'Billeder',
      });
    }
  }, [pathname]);

  return null;
}
