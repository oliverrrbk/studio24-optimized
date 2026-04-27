'use client';

import React, { useEffect, Suspense } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';


function BookingModalInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get('booking') === 'true';

  const close = () => {
    // Remove 'booking=true' from URL without reloading or scrolling
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('booking');
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#4C433C]/20 backdrop-blur-sm z-[100]"
            onClick={close}
          />
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 m-auto w-[90%] max-w-4xl 2xl:max-w-5xl h-[85vh] bg-[#FDFBF7] shadow-2xl z-[101] rounded-[25.5px] 2xl:rounded-[30px] overflow-hidden flex flex-col md:flex-row"
            data-lenis-prevent="true"
          >
            <button 
              onClick={close}
              className="absolute top-[clamp(1.275rem,3.4vw,1.7rem)] 2xl:top-[clamp(1.5rem,4vw,2rem)] right-[clamp(1.275rem,3.4vw,1.7rem)] 2xl:right-[clamp(1.5rem,4vw,2rem)] p-2 md:p-3 2xl:p-4 rounded-full bg-[#4C433C]/5 hover:bg-[#4C433C]/10 text-[#4C433C] transition-colors z-[102] backdrop-blur-md shadow-sm"
              aria-label="Luk"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Left Side: Image & Call to Action */}
            <section className="relative w-full md:w-1/2 h-[40vh] md:h-full overflow-hidden flex-shrink-0">
              <Image 
                src="/booking-modal.png" 
                alt="Atmospheric Interior" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover transition-transform duration-[15s] hover:scale-105" 
              />
              {/* Elegant Warm Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c2621]/90 via-[#2c2621]/20 to-transparent pointer-events-none"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-[clamp(2.55rem,5.1vw,4.25rem)] 2xl:pb-[clamp(3rem,6vw,5rem)] px-6 2xl:px-8">
                <span className="text-[#FDFBF7]/80 font-label text-[clamp(0.51rem,0.68vw,0.595rem)] 2xl:text-[clamp(0.6rem,0.8vw,0.7rem)] uppercase tracking-[0.4em] font-bold block mb-[clamp(0.85rem,1.275vw,1.275rem)] 2xl:mb-[clamp(1rem,1.5vw,1.5rem)] drop-shadow-sm">
                  Klar til at booke?
                </span>
                <h2 className="font-headline italic text-[#FDFBF7] text-[clamp(2.125rem,3.4vw,2.975rem)] 2xl:text-[clamp(2.5rem,4vw,3.5rem)] mb-[clamp(1.275rem,2.125vw,1.7rem)] 2xl:mb-[clamp(1.5rem,2.5vw,2rem)] font-light leading-none tracking-tight drop-shadow-md">
                  Bestil tid
                </h2>
                
                <a 
                  href="https://studio24-23056.planway.com/?fbclid=PAZXh0bgNhZW0CMTEAAabSSGkkKcugKZtVPz7PPvpalHT7XXpy_mXSoNzi8uBOwSFihIBcJT7VKyk_aem_9lVuJdIYwEp78fYfyZYV4g" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#EDB7A9] text-white px-[clamp(1.7rem,2.55vw,2.55rem)] 2xl:px-[clamp(2rem,3vw,3rem)] py-[clamp(0.85rem,1.275vw,1.062rem)] 2xl:py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.595rem,0.85vw,0.68rem)] 2xl:text-[clamp(0.7rem,1vw,0.8rem)] font-bold shadow-[0_15px_40px_rgba(237,183,169,0.4)] hover:shadow-[0_20px_50px_rgba(237,183,169,0.6)] hover:-translate-y-1 hover:bg-[#e6a896] transition-all duration-400 relative z-20"
                >
                  Gå til booking
                </a>
              </div>
            </section>

            {/* Right Side: Info & Contact Details */}
            <section className="w-full md:w-1/2 bg-[#FDFBF7] py-[clamp(1.7rem,3.4vw,3.4rem)] md:py-[clamp(2.55rem,4.25vw,4.25rem)] 2xl:py-[clamp(3rem,5vw,5rem)] px-[clamp(1.7rem,3.4vw,3.4rem)] 2xl:px-[clamp(2rem,4vw,4rem)] overflow-y-auto relative z-10 flex flex-col justify-start md:justify-center">
              <header className="mb-[clamp(2.125rem,3.4vw,2.975rem)] 2xl:mb-[clamp(2.5rem,4vw,3.5rem)] text-left mt-0 md:mt-[clamp(2.5rem,4vw,4rem)] 2xl:md:mt-[clamp(3.5rem,5vw,5rem)]">
                <span className="text-[#92857C] font-label text-[clamp(0.51rem,0.68vw,0.595rem)] 2xl:text-[clamp(0.6rem,0.8vw,0.7rem)] uppercase tracking-[0.4em] font-bold block mb-[clamp(0.85rem,1.7vw,1.275rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)]">
                  Booking & Rådgivning
                </span>
                <h1 className="font-headline text-[clamp(1.7rem,2.55vw,2.125rem)] 2xl:text-[clamp(2rem,3vw,2.5rem)] text-[#1c1a18] leading-[1.1] font-light mb-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:mb-[clamp(1.5rem,2vw,2rem)] italic tracking-tight">
                  Er du i tvivl om din booking?
                </h1>
                <div className="w-10 2xl:w-12 h-[0.8px] 2xl:h-[1px] bg-[#4C433C]/20 mb-[clamp(1.275rem,2.55vw,1.7rem)] 2xl:mb-[clamp(1.5rem,3vw,2rem)]"></div>
                <p className="text-[#6A5D55] font-body font-light leading-relaxed text-[clamp(0.807rem,0.935vw,0.892rem)] 2xl:text-[clamp(0.95rem,1.1vw,1.05rem)]">
                  Jeg vil meget hellere have, at du ringer, end du booker noget, du ikke er helt sikker omkring. På den måde er vi sikre på, at vi får sat den helt rigtige tid af til præcis dét, dit hår kræver.
                </p>
              </header>

              <div className="space-y-[clamp(2.125rem,3.4vw,2.975rem)] 2xl:space-y-[clamp(2.5rem,4vw,3.5rem)]">
                {/* Opening Hours */}
                <div>
                  <h3 className="font-label text-[clamp(0.51rem,0.68vw,0.595rem)] 2xl:text-[clamp(0.6rem,0.8vw,0.7rem)] uppercase tracking-[0.4em] font-bold text-[#92857C] mb-[clamp(0.85rem,1.7vw,1.275rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)] pb-[clamp(0.425rem,0.85vw,0.85rem)] 2xl:pb-[clamp(0.5rem,1vw,1rem)] border-b border-[#4C433C]/10">
                    Åbningstider
                  </h3>
                  <ul className="font-body text-[clamp(0.807rem,0.935vw,0.892rem)] 2xl:text-[clamp(0.95rem,1.1vw,1.05rem)] space-y-[clamp(0.637rem,1.275vw,0.85rem)] 2xl:space-y-[clamp(0.75rem,1.5vw,1rem)] text-[#4C433C] font-light">
                    <li className="flex justify-between items-baseline">
                      <span className="uppercase tracking-[0.2em] text-[clamp(0.595rem,0.765vw,0.68rem)] 2xl:text-[clamp(0.7rem,0.9vw,0.8rem)] font-bold">Tirsdag — Fredag</span>
                      <span className="font-medium">09:00 — 17:30</span>
                    </li>
                    <li className="flex justify-between items-baseline">
                      <span className="uppercase tracking-[0.2em] text-[clamp(0.595rem,0.765vw,0.68rem)] 2xl:text-[clamp(0.7rem,0.9vw,0.8rem)] font-bold">Lørdag</span>
                      <span className="font-medium">09:00 — 13:00</span>
                    </li>
                    <li className="flex justify-between items-baseline">
                      <span className="uppercase tracking-[0.2em] text-[clamp(0.595rem,0.765vw,0.68rem)] 2xl:text-[clamp(0.7rem,0.9vw,0.8rem)] font-bold">Søn, Man & Helligdage</span>
                      <span className="font-medium italic">Efter aftale</span>
                    </li>
                  </ul>
                </div>

                {/* Location and Direct Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(1.275rem,2.55vw,1.7rem)] 2xl:gap-[clamp(1.5rem,3vw,2rem)] pb-0 md:pb-[clamp(3.4rem,6.8vw,5.1rem)] 2xl:md:pb-[clamp(4rem,8vw,6rem)]">
                  <div>
                    <h3 className="font-label text-[clamp(0.51rem,0.68vw,0.595rem)] 2xl:text-[clamp(0.6rem,0.8vw,0.7rem)] uppercase tracking-[0.4em] font-bold text-[#92857C] mb-[clamp(0.85rem,1.7vw,1.275rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)]">
                      Lokation
                    </h3>
                    <p className="font-body text-[clamp(0.807rem,0.935vw,0.892rem)] 2xl:text-[clamp(0.95rem,1.1vw,1.05rem)] text-[#4C433C] leading-relaxed font-light">
                      Studio 24<br/>
                      Mariagervej 91<br/>
                      8920 Randers NV
                    </p>
                  </div>
                  <div>
                    <h3 className="font-label text-[clamp(0.51rem,0.68vw,0.595rem)] 2xl:text-[clamp(0.6rem,0.8vw,0.7rem)] uppercase tracking-[0.4em] font-bold text-[#92857C] mb-[clamp(0.85rem,1.7vw,1.275rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)]">
                      Direkte
                    </h3>
                    <p className="font-body text-[clamp(0.807rem,0.935vw,0.892rem)] 2xl:text-[clamp(0.95rem,1.1vw,1.05rem)] text-[#4C433C] leading-relaxed font-light">
                      <a className="hover:text-[#EDB7A9] transition-colors" href="tel:29896069">
                        29 89 60 69
                      </a>
                      <br/>
                      <a className="hover:text-[#EDB7A9] transition-colors" href="mailto:enistudio.24@gmail.com">
                        enistudio.24@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function BookingModal() {
  return (
    <Suspense fallback={null}>
      <BookingModalInner />
    </Suspense>
  );
}
