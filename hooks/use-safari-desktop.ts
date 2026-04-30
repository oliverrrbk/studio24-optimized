'use client';

import { useState, useEffect } from 'react';

/**
 * Detects if the user is on Safari on a non-mobile (≥768px) device.
 * Used to conditionally disable expensive GPU effects that cause
 * scroll lag on Desktop Safari's WebKit compositor.
 */
export function useIsSafariDesktop() {
  const [isSafariDesktop, setIsSafariDesktop] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const isDesktop = window.innerWidth >= 768;
    setIsSafariDesktop(isSafari && isDesktop);

    const handleResize = () => {
      setIsSafariDesktop(isSafari && window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSafariDesktop;
}
