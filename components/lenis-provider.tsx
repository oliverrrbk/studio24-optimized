'use client';

import React, { useEffect, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Disable automatic browser scroll restoration
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force browser to top
    window.scrollTo(0, 0);

    // Sync Lenis to top
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname, lenis]);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [isSafariDesktop, setIsSafariDesktop] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const isDesktop = window.innerWidth >= 768;
    setIsSafariDesktop(isSafari && isDesktop);
  }, []);

  // Safari Desktop: Use much lighter Lenis settings to avoid fighting WebKit's native compositor.
  // syncTouch must be false on desktop Safari — it intercepts trackpad events and creates
  // a "double-smoothing" conflict with WebKit's own scroll physics engine.
  const safariDesktopOptions = {
    lerp: 0.12,       // Faster convergence = less time fighting the compositor
    duration: 1.0,     // Shorter duration = fewer interpolation frames
    smoothWheel: true,
    syncTouch: false,  // CRITICAL: Let WebKit handle trackpad natively
    wheelMultiplier: 0.8,
    touchMultiplier: 1.2,
  };

  const defaultOptions = {
    lerp: 0.08,
    duration: 1.5,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.7,
    touchMultiplier: 1.2,
  };

  return (
    <ReactLenis root options={isSafariDesktop ? safariDesktopOptions : defaultOptions}>
      <ScrollToTop />
      {children}
    </ReactLenis>
  );
}
