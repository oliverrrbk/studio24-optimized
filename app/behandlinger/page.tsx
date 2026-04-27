'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// Safari Optimization Config (Hardware Acceleration + will-change)

const PrivacyPolicyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  // Disable scroll on body when open
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#4C433C]/20 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-2xl bg-[#FDFBF7] shadow-2xl z-[101] overflow-y-auto overscroll-contain"
            data-lenis-prevent="true"
          >
            <div className="p-[clamp(2rem,5vw,4rem)] text-[#4C433C] relative">
              <button 
                onClick={onClose}
                className="absolute top-[clamp(1.5rem,4vw,2rem)] right-[clamp(1.5rem,4vw,2rem)] p-2 rounded-full bg-[#4C433C]/5 hover:bg-[#4C433C]/10 transition-colors"
                aria-label="Luk"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <h2 className="font-headline font-light text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-tight mb-8">
                Privatlivspolitik
              </h2>

              <div className="space-y-6 text-[#6A5D55] leading-relaxed font-body text-[clamp(0.95rem,1.1vw,1.05rem)]">
                <p>
                  Hos Studio 24 tager jeg beskyttelsen af dine personoplysninger alvorligt. For mig er det vigtigt, at du føler dig tryg, når du besøger min hjemmeside og kontakter mig. Herunder kan du læse præcis, hvilke oplysninger jeg indsamler, og hvordan jeg behandler dem.
                </p>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  1. Dataansvarlig
                </h3>
                <div className="bg-[#4C433C]/5 p-6 rounded-2xl text-[#4C433C]">
                  <p className="font-bold mb-1">Studio 24</p>
                  <p>Mariagervej 91</p>
                  <p>8920 Randers NV</p>
                  <p className="mt-2 text-sm uppercase tracking-wider text-[#6A5D55]">CVR-nr.: 44907917</p>
                  <div className="mt-4 space-y-1">
                    <p>Telefon: <a href="tel:29896069" className="hover:text-[#EDB7A9] transition-colors">29 89 60 69</a></p>
                    <p>E-mail: <a href="mailto:enistudio.24@gmail.com" className="hover:text-[#EDB7A9] transition-colors">enistudio.24@gmail.com</a></p>
                  </div>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  2. Hvilke oplysninger indsamler jeg og hvorfor?
                </h3>
                <p>
                  Jeg indsamler kun de oplysninger, der er strengt nødvendige for at kunne hjælpe dig.
                </p>

                <div className="border-l-4 border-[#EDB7A9] pl-6 my-6">
                  <h4 className="font-bold text-[#4C433C] mb-2">Når du booker tid:</h4>
                  <p>
                    Jeg benytter bookingplatformen <a href="https://planway.com" target="_blank" rel="noopener noreferrer" className="text-[#EDB7A9] hover:underline">Planway</a> til tidsbestilling. Når du klikker på &quot;Book tid&quot;, videredirigeres du til deres platform. Planway fungerer som databehandler, og de oplysninger du indtaster dér, behandles sikkert i overensstemmelse med deres privatlivspolitik for at kunne levere ydelsen til dig.
                  </p>
                  <p className="mt-2 text-sm text-[#92857C]">Behandlingsgrundlag: GDPR art. 6, stk. 1, litra b.</p>
                </div>

                <div className="border-l-4 border-[#EDB7A9] pl-6 my-6">
                  <h4 className="font-bold text-[#4C433C] mb-2">Når du bruger min kontaktformular:</h4>
                  <p>
                    For at kunne besvare din henvendelse, vurdere din opgave og kontakte dig med et svar, indsamler jeg de oplysninger, du selv indtaster i formularen. Jeg benytter en sikker tredjepartsformularudbyder til at videresende disse oplysninger sikkert til min e-mail.
                  </p>
                  <p className="mt-2 text-sm text-[#92857C]">Behandlingsgrundlag: GDPR art. 6, stk. 1, litra b (nødvendigt aftalegrundlag) samt vurderet legitim interesse i god kundeservice (GDPR art. 6, stk. 1, litra f).</p>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  3. Cookies og sporing
                </h3>
                <p>
                  Jeg går meget op i at beskytte dit privatliv, og derfor bruger jeg ingen markedsføringscookies eller tredjepartssporing på min hjemmeside.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Jeg benytter udelukkende Vercel Analytics og Google Search Console til fejlfinding og basale trafikmålinger.</li>
                  <li>Disse systemer indsamler data 100% anonymiseret og sætter ingen form for personhenførbare cookies på dit udstyr.</li>
                  <li>Mine fonte og scripts er hostet lokalt i løsningen, så din IP-adresse ikke deles med Google eller andre tredjeparter.</li>
                  <li>Eventuelle links til sociale medier (f.eks. Instagram) sporer dig ikke på min side, men når du aktivt klikker dig videre, gælder den pågældende platforms privatlivsvilkår.</li>
                </ul>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  4. Hvem deler jeg dine oplysninger med?
                </h3>
                <p>
                  Jeg sælger og deler aldrig dine personoplysninger med tredjeparter til markedsføring eller lignende.
                </p>
                <p>
                  Dine data fra kontaktformularen behandles primært i mit eget e-mailsystem via en sikker tredjepartsformularudbyder. Booking af tider håndteres udelukkende i bookingsystemet Planway. Selve hjemmesiden hostes sikkert via Vercel. 
                </p>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  5. Hvor længe gemmer jeg dine oplysninger?
                </h3>
                <p>
                  Jeg gemmer kun dine data, så længe de har et sagligt formål:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-[#4C433C]">Faktureringsoplysninger:</strong> Opbevares i 5 år efter regnskabsårets afslutning for at overholde gældende krav i den danske Bogføringslov.</li>
                  <li><strong className="text-[#4C433C]">Generelle henvendelser:</strong> Henvendelser fra en kontaktformular, der ikke udmønter sig i en ydelse/serviceaftale, slettes senest 6 måneder efter seneste korrespondance.</li>
                </ul>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  6. Dine rettigheder
                </h3>
                <p>
                  Efter databeskyttelsesreglerne (GDPR) har du ret til at få indsigt i, hvilke personoplysninger jeg har registreret om dig, få dem rettet, slettet eller gøre en række øvrige indsigelser mod min behandling.
                </p>
                <p>
                  Ønsker du at gøre brug af disse rettigheder, kan du kontakte mig på min e-mailadresse ovenfor. Du har desuden altid den grundlæggende ret til at klage over min behandling til <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-[#EDB7A9] hover:underline">Datatilsynet</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


function ScrollExtensionCard({ title, text, icon: Icon, delay, isMobile }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const mobileShadow = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], ["0 15px 40px rgba(28,26,24,0.03)", "0 20px 50px rgba(28,26,24,0.06)", "0 20px 50px rgba(28,26,24,0.06)", "0 15px 40px rgba(28,26,24,0.03)"]);
  
  const iconTranslateY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, -8, -8, 0]);
  const iconScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [1, 1.05, 1.05, 1]);
  
  const contentTranslateY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, -4, -4, 0]);
  const contentScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [1, 1.02, 1.02, 1]);
  
  const gradientOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const normalOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [1, 0, 0, 1]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      style={isMobile ? { boxShadow: mobileShadow } : undefined}
      className={`bg-white/60 backdrop-blur-md p-[clamp(2rem,3.2vw,2.4rem)] 2xl:p-[clamp(2.5rem,4vw,3rem)] rounded-[16px] 2xl:rounded-[20px] shadow-[0_15px_40px_rgba(28,26,24,0.03)] border border-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-pointer flex flex-col ${!isMobile ? 'hover:shadow-[0_20px_50px_rgba(28,26,24,0.06)]' : ''}`}
    >
      <motion.div 
        style={isMobile ? { y: iconTranslateY, scale: iconScale } : undefined}
        className={`mb-5 2xl:mb-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-[#EDB7A9] drop-shadow-sm ${!isMobile ? 'group-hover:-translate-y-2 group-hover:scale-[1.05] group-hover:drop-shadow-md' : ''}`}
      >
        {Icon}
      </motion.div>
      
      <motion.div 
        style={isMobile ? { y: contentTranslateY, scale: contentScale } : undefined}
        className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full flex flex-col items-start ${!isMobile ? 'group-hover:-translate-y-1 group-hover:scale-[1.02]' : ''}`}
      >
        <motion.div 
          style={isMobile ? { opacity: normalOpacity } : undefined}
          className={`w-full flex flex-col items-start space-y-4 transition-opacity duration-500 ease-in-out ${!isMobile ? 'opacity-100 group-hover:opacity-0' : ''}`}
        >
          <h3 className="text-[clamp(1.4rem,2vw,1.6rem)] 2xl:text-[clamp(1.7rem,2.2vw,2rem)] font-headline font-light text-[#4C433C] tracking-tight">{title}</h3>
          <p className="text-[1rem] text-[#6A5D55] leading-relaxed font-light font-sans">
            {text}
          </p>
        </motion.div>
        
        <motion.div 
          style={isMobile ? { opacity: gradientOpacity } : undefined}
          className={`absolute inset-0 pointer-events-none w-full flex flex-col items-start space-y-4 transition-opacity duration-500 ease-in-out ${!isMobile ? 'opacity-0 group-hover:opacity-100' : ''}`}
        >
          <h3 
            className="text-[clamp(1.4rem,2vw,1.6rem)] 2xl:text-[clamp(1.7rem,2.2vw,2rem)] font-headline font-light tracking-tight text-transparent animate-wave-rtl"
            style={{ 
              backgroundImage: "linear-gradient(to right, #4C433C 0%, #EDB7A9 25%, #4C433C 50%, #EDB7A9 75%, #4C433C 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}
          >
            {title}
          </h3>
          <p 
            className="text-[1rem] leading-relaxed font-light font-sans text-transparent animate-wave-ltr"
            style={{ 
              backgroundImage: "linear-gradient(to right, #6A5D55 0%, #EDB7A9 25%, #6A5D55 50%, #EDB7A9 75%, #6A5D55 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}
          >
            {text}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function BehandlingerPage() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-[#FDFBF7] text-[#4C433C] font-sans antialiased min-h-screen flex flex-col selection:bg-[#EDB7A9] selection:text-white">

      {/* Main content */}
      <main className="flex-1 pt-[clamp(6.4rem,9.6vw,9.6rem)] 2xl:pt-[clamp(8rem,12vw,12rem)] pb-0 overflow-x-hidden">
        
        {/* Main Header */}
        <section className="max-w-5xl 2xl:max-w-7xl mx-auto px-[clamp(1.2rem,4vw,3.2rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] mb-[clamp(1.6rem,3.2vw,4rem)] 2xl:mb-[clamp(2rem,4vw,5rem)] relative">
          <div className="text-center max-w-xl 2xl:max-w-3xl mx-auto space-y-5 2xl:space-y-6 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.8rem,4.8vw,4.8rem)] 2xl:text-[clamp(3.5rem,6vw,6rem)] font-headline text-[#4C433C] leading-tight tracking-tight font-light"
            >
              Behandlinger
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#6A5D55] text-[clamp(0.88rem,1.12vw,1.08rem)] 2xl:text-[clamp(1.1rem,1.4vw,1.35rem)] font-sans font-light leading-relaxed max-w-lg 2xl:max-w-2xl mx-auto drop-shadow-sm"
            >
              Forud for enhver behandling bruger jeg god tid på at læse dit hår. Jeg vurderer dets tilstand, fald og dine unikke træk, så vi i fællesskab kan skabe et resultat, der fremhæver dig på den mest naturlige og flatterende måde. Hver eneste detalje er velovervejet.
            </motion.p>
          </div>
        </section>

        {/* Menu Section */}
        <section className="max-w-4xl 2xl:max-w-6xl mx-auto px-[clamp(1.2rem,4vw,3.2rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] mb-[clamp(4.8rem,8vw,9.6rem)] 2xl:mb-[clamp(6rem,10vw,12rem)] relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/80 backdrop-blur-xl border border-[#4C433C]/5 rounded-2xl shadow-[0_10px_40px_rgba(28,26,24,0.03)] p-[clamp(2rem,4vw,4rem)] 2xl:p-[clamp(2.5rem,5vw,5rem)] relative z-10"
          >
            <div className="text-center mb-[clamp(2.4rem,4vw,3.2rem)] 2xl:mb-[clamp(3rem,5vw,4rem)]">
              <span className="font-label text-[0.7rem] uppercase tracking-[0.4em] text-[#92857C] mb-3 2xl:mb-4 block font-bold">Mit Håndværk</span>
              <h2 className="text-[clamp(1.6rem,2.4vw,2.4rem)] 2xl:text-[clamp(2rem,3vw,3rem)] font-headline italic font-light text-[#4C433C]">Signatur &amp; Essentielle</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(2.4rem,4.8vw,4.8rem)] 2xl:gap-x-[clamp(3rem,6vw,6rem)] gap-y-[clamp(2.4rem,4vw,3.2rem)] 2xl:gap-y-[clamp(3rem,5vw,4rem)]">
              {/* Signatur Column (4 items) */}
              <div className="space-y-[clamp(1.6rem,3.2vw,2.4rem)] 2xl:space-y-[clamp(2rem,4vw,3rem)]">
                <div className="flex items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
                  <div className="h-[0.8px] 2xl:h-[1px] flex-1 bg-[#EDB7A9]"></div>
                  <span className="font-label text-[8px] 2xl:text-[10px] uppercase tracking-[0.25em] text-[#EDB7A9] font-bold">Signatur</span>
                  <div className="h-[0.8px] 2xl:h-[1px] flex-1 bg-[#EDB7A9]"></div>
                </div>
                
                <div className="space-y-[clamp(1.2rem,2.4vw,2rem)] 2xl:space-y-[clamp(1.5rem,3vw,2.5rem)]">
                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h3 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Dameklip</h3>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Fra 650,-</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">Arkitektonisk klipning fuldt tilpasset dit ansigts form og fald.</p>
                  </div>
                  
                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h3 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Farvebehandling</h3>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Fra 950,-</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">Skræddersyet farve, reflekser og balayage med et naturligt udtryk.</p>
                  </div>

                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h4 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Permanent</h4>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Fra 1.200,-</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">Bløde, levende krøller og fald skabt med moderne, skånsom teknik.</p>
                  </div>
                  
                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h4 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Extensions</h4>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Pris v. konsultation</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">Diskret længde og volumen med 100% fokus på dit hårs sundhed.</p>
                  </div>
                </div>
              </div>

              {/* Essentials Column (5 items) */}
              <div className="space-y-[clamp(1.6rem,3.2vw,2.4rem)] 2xl:space-y-[clamp(2rem,4vw,3rem)]">
                <div className="flex items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
                  <div className="h-[0.8px] 2xl:h-[1px] flex-1 bg-[#EDB7A9]"></div>
                  <span className="font-label text-[8px] 2xl:text-[10px] uppercase tracking-[0.25em] text-[#EDB7A9] font-bold">Essentials</span>
                  <div className="h-[0.8px] 2xl:h-[1px] flex-1 bg-[#EDB7A9]"></div>
                </div>
                
                <div className="space-y-[clamp(1.2rem,2.4vw,2rem)] 2xl:space-y-[clamp(1.5rem,3vw,2.5rem)]">
                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h4 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Herreklip</h4>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Fra 450,-</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">Klassisk eller moderne herreklip inklusiv vask og styling.</p>
                  </div>
                  
                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h4 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Børneklip</h4>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Fra 350,-</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">En tryg, rolig og nærværende klippeoplevelse for de mindste.</p>
                  </div>
                  
                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h4 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Bryn &amp; Vipper</h4>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Fra 150,-</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">Præcis farvning og formning for et smukt indrammet ansigt.</p>
                  </div>

                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h4 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Vask &amp; Styling</h4>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Fra 400,-</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">Professionel føn og styling til hverdag eller særlige anledninger.</p>
                  </div>

                  <div className="group">
                    <div className="flex justify-between items-baseline border-b border-[#4C433C]/10 pb-2 2xl:pb-3 mb-2">
                      <h4 className="text-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:text-[clamp(1.5rem,2vw,2rem)] font-headline font-light text-[#4C433C] group-hover:text-[#EDB7A9] transition-colors duration-300">Kur &amp; Tillæg</h4>
                      <span className="font-label text-[8.8px] 2xl:text-[11px] tracking-[0.2em] text-[#6A5D55] uppercase font-bold group-hover:text-[#4C433C] transition-colors">Fra 150,-</span>
                    </div>
                    <p className="text-xs text-[#92857C] italic font-light mt-2 group-hover:text-[#6A5D55] transition-colors">Dybdegående og genopbyggende pleje for ultimativ glans.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-[clamp(3.2rem,4.8vw,4.8rem)] 2xl:mt-[clamp(4rem,6vw,6rem)] text-center">
              <p className="font-headline italic text-[#92857C] text-[clamp(0.68rem,0.88vw,0.8rem)] 2xl:text-[clamp(0.85rem,1.1vw,1rem)] mb-[clamp(1.2rem,2.4vw,1.6rem)] 2xl:mb-[clamp(1.5rem,3vw,2rem)]">Den præcise pris fastsættes altid ud fra den specifikke teknik, vi i fællesskab beslutter os for.</p>
              <Link href="?booking=true" scroll={false} className="inline-block border border-[#4C433C]/20 text-[#4C433C] px-[clamp(2rem,3.2vw,2.8rem)] 2xl:px-[clamp(2.5rem,4vw,3.5rem)] py-[clamp(0.7rem,1.2vw,0.9rem)] 2xl:py-[clamp(0.875rem,1.5vw,1.125rem)] rounded-full font-label text-[clamp(0.56rem,0.8vw,0.6rem)] 2xl:text-[clamp(0.7rem,1vw,0.75rem)] uppercase tracking-[0.2em] font-bold hover:bg-[#4C433C] hover:text-[#FDFBF7] hover:border-[#4C433C] hover:shadow-[0_15px_40px_rgba(76,67,60,0.2)] hover:-translate-y-1 active:scale-95 transition-all duration-400">
                Se fuld prisliste &amp; book tid
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Balayage Section */}
        <section className="max-w-5xl 2xl:max-w-7xl mx-auto px-[clamp(1.2rem,4vw,3.2rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] mb-[clamp(6.4rem,11.2vw,12.8rem)] 2xl:mb-[clamp(8rem,14vw,16rem)] relative" id="balayage">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[clamp(1.5rem,3vw,2.5rem)] lg:gap-[clamp(3.2rem,6.4vw,4.8rem)] 2xl:gap-[clamp(4rem,8vw,6rem)] items-center">
            
            {/* Mobile Title */}
            <div className="block lg:hidden w-full mb-6">
              <div className="flex items-center gap-3 2xl:gap-4 mb-[clamp(0.8rem,1.6vw,1.2rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)] opacity-80">
                 <div className="h-[0.8px] 2xl:h-[1px] w-[clamp(1.6rem,2.4vw,2.4rem)] 2xl:w-[clamp(2rem,3vw,3rem)] bg-[#EDB7A9]"></div>
                 <span className="font-label text-[clamp(0.56rem,0.8vw,0.6rem)] 2xl:text-[clamp(0.7rem,1vw,0.75rem)] uppercase tracking-[0.25em] text-[#EDB7A9] font-bold">Signature Service</span>
              </div>
              <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] 2xl:text-[clamp(2.5rem,4vw,3.5rem)] font-headline font-light text-[#4C433C] leading-[1.05] tracking-tight">Min tilgang til <br/><em className="italic font-light">Balayage</em></h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative group"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(160px,24vw,320px)] 2xl:w-[clamp(200px,30vw,400px)] aspect-square z-0 pointer-events-none opacity-40">
                 <div className="absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[#EDB7A9]/30 blur-[48px] 2xl:blur-[60px] animate-[spin_15s_linear_infinite]"></div>
              </div>

              <div className="aspect-[4/5] w-[85%] ml-[3%] mr-auto lg:w-full lg:mx-0 bg-[#EAD5C5]/20 rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] overflow-hidden shadow-[0_20px_50px_rgba(28,26,24,0.06)] relative z-10 -rotate-1">
                <img alt="Balayage transformation" className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105 brightness-[1.15] contrast-[1.05]" src="/gallerypics/14.png" />
              </div>

            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-[clamp(1.2rem,2.4vw,1.6rem)] 2xl:space-y-[clamp(1.5rem,3vw,2rem)] mt-6 lg:mt-0 relative z-20"
            >
              <div className="hidden lg:block">
                <div className="flex items-center gap-3 2xl:gap-4 mb-[clamp(0.8rem,1.6vw,1.2rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)] opacity-80">
                   <div className="h-[0.8px] 2xl:h-[1px] w-[clamp(1.6rem,2.4vw,2.4rem)] 2xl:w-[clamp(2rem,3vw,3rem)] bg-[#EDB7A9]"></div>
                   <span className="font-label text-[clamp(0.56rem,0.8vw,0.6rem)] 2xl:text-[clamp(0.7rem,1vw,0.75rem)] uppercase tracking-[0.25em] text-[#EDB7A9] font-bold">Signature Service</span>
                </div>
                <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] 2xl:text-[clamp(2.5rem,4vw,3.5rem)] font-headline font-light text-[#4C433C] leading-[1.05] tracking-tight">Min tilgang til <br/><em className="italic font-light">Balayage</em></h2>
              </div>
              <p className="font-sans text-[clamp(0.8rem,0.96vw,0.9rem)] 2xl:text-[clamp(1rem,1.2vw,1.125rem)] text-[#6A5D55] font-light leading-relaxed">
                For mig er balayage ikke bare en standardiseret teknik, man rutinemæssigt trækker ned over hovedet på alle. Det er et solidt håndværk, der kræver, at jeg faktisk forstår, præcis hvordan lige netop dit hår falder og bevæger sig. Målet er aldrig at det skal se stift eller overbehandlet ud.
              </p>
              <p className="font-sans text-[clamp(0.8rem,0.96vw,0.9rem)] 2xl:text-[clamp(1rem,1.2vw,1.125rem)] text-[#6A5D55] font-light leading-relaxed">
                Jeg bygger altid farven op med bløde, præcise strøg, så den smelter helt naturligt ind i din egen hårfarve. På den måde får du et ærligt og sundt resultat, som du let kan vedligeholde i din hverdag. Og bare rolig. Jeg skal nok vejlede dig i, hvordan du gør.
              </p>
              <div className="pt-2">
                <Link href="?booking=true" scroll={false} className="w-fit inline-flex items-center gap-3 2xl:gap-4 text-[#4C433C] font-label uppercase text-[0.8rem] tracking-[0.15em] font-bold hover:text-[#EDB7A9] transition-colors duration-300 group">
                  Find din tid her
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Extensions Section */}
        <section className="bg-[#F8F5F0] py-[clamp(4.8rem,9.6vw,9.6rem)] 2xl:py-[clamp(6rem,12vw,12rem)] relative" id="extensions">
          {/* Curve Graphics Overlay */}
          <div className="hidden md:block absolute top-[-10%] md:top-[-20%] left-0 w-[clamp(96px,20vw,520px)] 2xl:w-[clamp(120px,25vw,650px)] h-[120%] md:h-[140%] pointer-events-none drop-shadow-sm brightness-[0.95] opacity-60 z-0">
             <Image src="/images/curve_left.png" alt="Curve left" fill className="object-contain object-left-top" />
          </div>
          <div className="hidden md:block absolute bottom-[-10%] md:bottom-[-25%] right-0 w-[clamp(96px,21.6vw,560px)] 2xl:w-[clamp(120px,27vw,700px)] h-[120%] md:h-[150%] pointer-events-none drop-shadow-sm brightness-[0.95] opacity-60 z-0">
             <Image src="/images/curve_right.png" alt="Curve right" fill className="object-contain object-right-bottom" />
          </div>

          <div className="max-w-5xl 2xl:max-w-7xl mx-auto px-[clamp(1.2rem,4vw,3.2rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(4rem,8vw,6.4rem)] 2xl:gap-[clamp(5rem,10vw,8rem)] items-center lg:items-start">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-[clamp(2.4rem,4.8vw,3.2rem)] 2xl:space-y-[clamp(3rem,6vw,4rem)]"
              >
                <div className="space-y-[clamp(1.2rem,2.4vw,1.6rem)] 2xl:space-y-[clamp(1.5rem,3vw,2rem)]">
                  <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] 2xl:text-[clamp(2.5rem,4vw,3.5rem)] font-headline font-light text-[#4C433C] leading-[1.05] tracking-tight">Extensions <em className="italic font-light">på den rigtige måde</em></h2>
                  <p className="font-sans text-[clamp(0.88rem,1.12vw,1.04rem)] 2xl:text-[clamp(1.1rem,1.4vw,1.3rem)] text-[#6A5D55] font-light leading-relaxed italic border-l-2 border-[#EDB7A9]/40 pl-6 py-2">
                    En af de største bekymringer ved extensions er frygten for, at de føles forkerte, tunge eller er tydelige at se. Det forstår jeg utrolig godt, og netop derfor bygger min tilgang på to faste principper:
                  </p>
                </div>
                <style>{`
                  @keyframes text-wave-rtl {
                    0% { background-position: 200% center; }
                    100% { background-position: 0% center; }
                  }
                  @keyframes text-wave-ltr {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                  }
                  .animate-wave-rtl {
                    background-size: 200% auto;
                    animation: text-wave-rtl 7s linear infinite;
                  }
                  .animate-wave-ltr {
                    background-size: 200% auto;
                    animation: text-wave-ltr 7s linear infinite;
                  }
                `}</style>
                <div className="grid grid-cols-1 gap-[clamp(1.2rem,2.4vw,1.6rem)] 2xl:gap-[clamp(1.5rem,3vw,2rem)]">
                  <ScrollExtensionCard 
                    title="Ro til påsætningen"
                    text="Jeg tager mig altid den fulde nødvendige tid til at placere hver evig eneste tot fuldstændig perfekt. Det må nemlig aldrig nogensinde føles ubehageligt eller stramme i din hovedbund, når du træder ud af døren."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>}
                    delay={0.2}
                    isMobile={isMobile}
                  />

                  <ScrollExtensionCard 
                    title="Usynlige overgange"
                    text="Det absolut værste ved dårlige extensions er, når alle og enhver kan spotte dem på lang afstand. Jeg gør en enorm dyd ud af at klippe og blende håret så skarpt, at du næsten selv glemmer, det ikke er dit eget."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>}
                    delay={0.4}
                    isMobile={isMobile}
                  />
                </div>            
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-8 lg:mt-[clamp(4.8rem,8vw,6.4rem)] group"
              >
                <div className="aspect-[3/4] bg-[#EAD5C5]/20 rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] overflow-hidden shadow-[0_20px_60px_rgba(28,26,24,0.08)] relative z-10 w-full max-w-[400px] 2xl:max-w-[500px] ml-auto rotate-1">
                  <img alt="Hair Extensions results" className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]" src="/about/extensions_guarantee.png" />
                </div>
                <div className="absolute -left-[3%] bottom-[2%] md:left-auto md:-right-[5%] md:bottom-[5%] z-20 max-w-[240px] 2xl:max-w-[300px] group/guarantee">
                  <div className="bg-[#4C433C] p-[clamp(1.6rem,2.4vw,2rem)] 2xl:p-[clamp(2rem,3vw,2.5rem)] text-white rounded-[16px] 2xl:rounded-[20px] shadow-[0_30px_60px_rgba(28,26,24,0.2)] transition-transform duration-700 group-hover/guarantee:-translate-y-2">
                    <p className="font-headline text-[1.75rem] mb-3 2xl:mb-4 italic font-light tracking-tight underline underline-offset-4 decoration-1">Mit løfte</p>
                    <p className="font-sans text-[0.95rem] leading-relaxed opacity-90 font-light drop-shadow-sm">
                      Jeg monterer aldrig noget i dit hår, hvis jeg ikke hundrede procent kan stå inde for, at dit eget naturlige hår faktisk kan bære det.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Oplevelsen (Using the Landing Page Hero/CTA overlay style) */}
        <section className="relative w-full overflow-hidden pt-[clamp(4.8rem,8vw,6.4rem)] 2xl:pt-[clamp(6rem,10vw,8rem)] pb-[clamp(8rem,12vw,12.8rem)] 2xl:pb-[clamp(10rem,15vw,16rem)]">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#EDB7A9]/10 via-transparent to-transparent pointer-events-none z-0" />

          <div className="relative z-10 max-w-5xl 2xl:max-w-7xl mx-auto px-[clamp(1.2rem,4vw,3.2rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)]">
            <div className="relative flex flex-col-reverse lg:flex-row items-center gap-0 lg:gap-[clamp(3rem,6vw,5rem)]">
              
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[65%] h-[clamp(320px,40vw,480px)] 2xl:h-[clamp(400px,50vw,600px)] rounded-[16px] 2xl:rounded-[20px] overflow-hidden shadow-[0_25px_60px_rgba(28,26,24,0.1)] relative z-10 group -mt-[10%] lg:mt-0"
              >
                <Image alt="Salon Oplevelse" fill className="object-cover transition-transform duration-[5s] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]" src="/about/salon_experience_elegant.png" sizes="(min-width: 1024px) 65vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 pointer-events-none"></div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-[90%] mx-auto lg:w-[45%] lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 bg-white p-[clamp(2rem,4vw,3.2rem)] 2xl:p-[clamp(2.5rem,5vw,4rem)] rounded-[16px] 2xl:rounded-[20px] shadow-[0_30px_80px_rgba(28,26,24,0.08)] z-20"
              >
                <h2 className="text-[clamp(1.6rem,2.8vw,2.4rem)] 2xl:text-[clamp(2rem,3.5vw,3rem)] font-headline font-light text-[#4C433C] mb-[clamp(1.2rem,1.6vw,1.6rem)] 2xl:mb-[clamp(1.5rem,2vw,2rem)] leading-[1.05] tracking-tight">
                  <em className="italic font-light">Når du sidder</em> <br/>i min stol
                </h2>
                <p className="font-sans text-[#6A5D55] font-light text-[clamp(0.8rem,0.96vw,0.9rem)] 2xl:text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed mb-[clamp(2rem,2.8vw,2.4rem)] 2xl:mb-[clamp(2.5rem,3.5vw,3rem)]">
                  Når du sætter dig i stolen hos mig, skal skuldrene helt ned. Vi starter med at tale helt åbent om dine forventninger – og hvis du beder om noget, jeg af faglige årsager ikke mener gavner dit hår, så siger jeg det direkte til dig. Det handler om ren og skær tillid, en god kop kaffe i hånden og ordentlig tid til håndværket.
                </p>
                <Link href="?booking=true" scroll={false} className="inline-block bg-[#EDB7A9] text-white px-[clamp(1.6rem,2.8vw,2.4rem)] 2xl:px-[clamp(2rem,3.5vw,3rem)] py-[clamp(0.8rem,1.2vw,1rem)] 2xl:py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.56rem,0.8vw,0.64rem)] 2xl:text-[clamp(0.7rem,1vw,0.8rem)] font-bold shadow-[0_15px_40px_rgba(237,183,169,0.4)] hover:shadow-[0_20px_50px_rgba(237,183,169,0.6)] hover:-translate-y-1 hover:bg-[#e6a896] transition-all duration-400">
                  Book en behandling
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Bottom Curve for Footer (Downwards slope) */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-30 pointer-events-none">
            <svg className="relative block w-full h-[clamp(40px,6.4vw,96px)] 2xl:h-[clamp(50px,8vw,120px)]" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
              <path className="text-[#FDFBF7]" d="M0,100 L0,0 C480,80 960,80 1440,0 L1440,100 Z" />
            </svg>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#FDFBF7] text-[#4C433C]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(5rem,10vw,8rem)] max-w-[1400px] mx-auto w-full">
          <div className="max-w-[320px]">
            <div className="text-[clamp(1.75rem,3vw,2.5rem)] font-serif mb-[clamp(1rem,2vw,1.5rem)] italic tracking-tight leading-none text-[#1c1a18]">Studio 24</div>
            <p className="text-[#6A5D55] font-sans text-[clamp(1rem,1.2vw,1.125rem)] tracking-wide leading-relaxed font-light">
              Designet til at skabe kunst. Et sted hvor teknisk mesterskab møder den seneste vision inden for hår.
            </p>
          </div>
          <div className="flex flex-col">
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#4C433C] mb-[clamp(1.5rem,3vw,2rem)] font-label">Udforsk</h5>
            <ul className="space-y-[clamp(0.75rem,1.5vw,1rem)]">
              {[
                { name: 'Hjem', href: '/' },
                { name: 'Min Historie', href: '/min-historie' },
                { name: 'Behandlinger', href: '/behandlinger' },
                { name: 'Galleri', href: '/galleri' }
              ].map(item => (
                <li key={item.name}><Link className="text-[#6A5D55] font-sans text-[clamp(1rem,1.2vw,1.125rem)] tracking-wide hover:text-[#EAD5C5] hover:tracking-[0.05em] transition-all duration-300 inline-block font-light" href={item.href}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#4C433C] mb-[clamp(1.5rem,3vw,2rem)] font-label">Kontakt</h5>
            <ul className="space-y-[clamp(0.75rem,1.5vw,1rem)] text-[#6A5D55] font-sans text-[clamp(1rem,1.2vw,1.125rem)] font-light tracking-wide">
              <li>Tirsdag - Fredag: 09:00 - 17:30<br/>Lørdag: 09:00 - 13:00<br/>Søn, Man & Helligdage efter aftale</li>
              <li><a href="tel:+4529896069" className="hover:text-[#EAD5C5] transition-colors">+45 29 89 60 69</a></li>
              <li><a href="mailto:enistudio.24@gmail.com" className="hover:text-[#EAD5C5] transition-colors">enistudio.24@gmail.com</a></li>
              <li>Mariagervej 91<br/>8920 Randers NV</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#4C433C] mb-[clamp(1.5rem,3vw,2rem)] font-label">Følg med</h5>
            <div className="flex gap-[clamp(0.5rem,1.5vw,1rem)] items-center">
                <a className="flex items-center justify-center hover:scale-[1.12] active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group" href="https://www.facebook.com/p/Studio24-61564054917618/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg className="w-[clamp(2.5rem,4vw,3rem)] h-[clamp(2.5rem,4vw,3rem)] text-[#EDB7A9] opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm relative top-[-3px]" viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </a>
                <a className="flex items-center justify-center hover:scale-[1.12] active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group" href="https://www.instagram.com/__studio.24__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg className="w-[clamp(2.75rem,4.5vw,3.5rem)] h-[clamp(2.75rem,4.5vw,3.5rem)] text-[#EDB7A9] opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm relative top-[-2px]" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#4C433C]/10 w-full">
          <div className="max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)] py-[clamp(1.5rem,3vw,2rem)] flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <p className="text-[#92857C] font-sans text-[min(0.75rem,3vw)] md:text-[0.75rem] tracking-[0.2em] font-label uppercase text-left">
              © 2026 Studio 24. Alle rettigheder forbeholdes.
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }} className="text-[#92857C] font-sans text-[min(0.75rem,3vw)] md:text-[0.75rem] tracking-[0.2em] font-label uppercase hover:text-[#EAD5C5] transition-colors text-center md:text-right cursor-pointer">
              Privatlivspolitik
            </a>
          </div>
        </div>
      </footer>
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}
