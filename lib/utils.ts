import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safari Optimization Config (Hardware Acceleration only — no persistent will-change)
// will-change causes "layer explosion" in WebKit when applied to many elements.
// translateZ(0) alone is sufficient for GPU compositor promotion.
export const hardwareAccelerated: any = {
  WebkitTransform: "translateZ(0)",
  transform: "translate3d(0, 0, 0)",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
};

/**
 * Checks if the current browser is Safari on a desktop device (≥768px).
 * Returns false during SSR. Used to strip expensive CSS filter animations
 * (blur, drop-shadow) that cause scroll lag on WebKit's compositor.
 */
export function checkIsSafariDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  return isSafari && window.innerWidth >= 768;
}

/**
 * Animation variant factory: Returns Framer Motion variants with blur disabled
 * on Safari Desktop. The filter: blur() property forces WebKit to do full-layer
 * software rasterization on every animation frame, which decimates scroll FPS.
 * On Chrome/mobile Safari, the blur entrance effect is kept intact.
 */
export function getSafeFadeInUp(isSafariDesktop: boolean) {
  return {
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: isSafariDesktop ? "blur(0px)" : "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };
}

export function getSafeImageReveal(isSafariDesktop: boolean) {
  return {
    hidden: { 
      scale: 1.1, 
      opacity: 0, 
      filter: isSafariDesktop ? "blur(0px)" : "blur(10px)"
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
    }
  };
}
