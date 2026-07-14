'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CONSENT_EVENT, getStoredConsent, setConsent } from '@/lib/consent';
import { PrivacyPolicyModal } from '@/components/ui/privacy-policy-modal';

/**
 * Cookie-consent pop-up, styled to match the site's booking/privacy overlays:
 * warm card, eyebrow label, italic serif headline, hairline divider, and the
 * same rose/outline pill buttons. Sits in the bottom-left corner with a little
 * breathing room from the edges. Shows until the visitor chooses, and re-opens
 * whenever consent is reset (via "Cookieindstillinger" in the footer).
 * The Meta Pixel only loads once "Accepter alle" is chosen.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const sync = () => setVisible(getStoredConsent() === null);
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  const decline = () => {
    // If the pixel already loaded this session (the visitor had accepted before
    // re-opening settings), reload so it's fully wiped from memory. Otherwise the
    // withdrawal only takes full effect on the next page load.
    const pixelWasLoaded = typeof window !== 'undefined' && typeof window.fbq === 'function';
    setConsent('denied');
    if (pixelWasLoaded) window.location.reload();
  };

  return (
    <>
      <div className="fixed inset-0 z-[90] pointer-events-none flex items-end justify-start p-[clamp(1rem,3vw,2rem)]">
        <AnimatePresence>
          {visible && (
            <motion.div
              role="region"
              aria-labelledby="cookie-consent-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', damping: 26, stiffness: 200, delay: 0.5 }}
              className="pointer-events-auto w-full max-w-[380px] bg-[#FDFBF7] border border-[#4C433C]/10 rounded-[25.5px] shadow-[0_25px_70px_-15px_rgba(44,38,33,0.28)] p-[clamp(1.75rem,3vw,2.5rem)] flex flex-col gap-[clamp(1.5rem,2.5vw,2rem)]"
            >
              <div>
                <span className="block font-label text-[clamp(0.55rem,0.7vw,0.62rem)] uppercase tracking-[0.4em] font-bold text-[#92857C] mb-[clamp(0.6rem,1vw,0.85rem)]">
                  Cookies
                </span>
                <h2
                  id="cookie-consent-title"
                  className="font-headline italic font-light text-[#1c1a18] text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[1.1] tracking-tight mb-[clamp(0.75rem,1.2vw,1rem)]"
                >
                  Må vi bruge cookies?
                </h2>
                <div className="w-8 h-[0.8px] bg-[#4C433C]/20 mb-[clamp(0.75rem,1.2vw,1rem)]" />
                <p className="font-body font-light text-[#6A5D55] leading-relaxed text-[clamp(0.85rem,1vw,0.95rem)] min-[1440px]:text-[0.85rem]">
                  Vi bruger cookies til statistik og markedsføring, så vi kan gøre
                  siden bedre og vise dig relevante annoncer. Du bestemmer selv.{' '}
                  <button
                    type="button"
                    onClick={() => setPrivacyOpen(true)}
                    className="underline underline-offset-2 hover:text-[#D3B39E] transition-colors cursor-pointer"
                  >
                    Læs mere
                  </button>
                  .
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={decline}
                  className="w-full text-center border border-[#4C433C]/20 text-[#4C433C] px-[clamp(1.5rem,2.5vw,2rem)] py-[clamp(0.8rem,1.1vw,0.95rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.6rem,0.8vw,0.68rem)] font-bold hover:bg-[#4C433C] hover:text-[#FDFBF7] transition-colors duration-500 cursor-pointer"
                >
                  Kun nødvendige
                </button>
                <button
                  type="button"
                  onClick={() => setConsent('granted')}
                  className="w-full text-center bg-[#D3B39E] text-white px-[clamp(1.75rem,3vw,2.5rem)] py-[clamp(0.8rem,1.1vw,0.95rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.6rem,0.8vw,0.68rem)] font-bold shadow-[0_10px_30px_rgba(211,179,158,0.4)] hover:bg-[#C9A189] hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(211,179,158,0.5)] transition duration-700 ease-out cursor-pointer"
                >
                  Accepter alle
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}
