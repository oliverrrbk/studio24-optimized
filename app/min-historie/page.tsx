'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Paintbrush, Clock, Heart, Leaf } from 'lucide-react';
import { hardwareAccelerated } from '@/lib/utils';

// Safari Optimization Config (Hardware Acceleration + will-change)

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const imageReveal = {
  hidden: { scale: 1.1, opacity: 0, filter: "blur(10px)" },
  visible: { 
    scale: 1, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
  }
};

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
            className="fixed top-0 right-0 h-[100svh] w-full max-w-2xl bg-[#FDFBF7] shadow-2xl z-[101] overflow-y-auto overscroll-contain"
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
                  Hos Studio 24 tager vi beskyttelsen af dine personoplysninger alvorligt. For os er det vigtigt, at du føler dig tryg, når du besøger vores hjemmeside og kontakter os. Herunder kan du læse præcis, hvilke oplysninger vi indsamler, og hvordan vi behandler dem.
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
                  2. Hvilke oplysninger indsamler vi og hvorfor?
                </h3>
                <p>
                  Vi indsamler kun de oplysninger, der er strengt nødvendige for at kunne hjælpe dig.
                </p>

                <div className="border-l-4 border-[#EDB7A9] pl-6 my-6">
                  <h4 className="font-bold text-[#4C433C] mb-2">Når du booker tid:</h4>
                  <p>
                    Vi benytter bookingplatformen <a href="https://planway.com" target="_blank" rel="noopener noreferrer" className="text-[#EDB7A9] hover:underline">Planway</a> til tidsbestilling. Når du klikker på &quot;Book tid&quot;, videredirigeres du til deres platform. Planway fungerer som databehandler, og de oplysninger du indtaster dér, behandles sikkert i overensstemmelse med deres privatlivspolitik for at kunne levere ydelsen til dig.
                  </p>
                  <p className="mt-2 text-sm text-[#92857C]">Behandlingsgrundlag: GDPR art. 6, stk. 1, litra b.</p>
                </div>

                <div className="border-l-4 border-[#EDB7A9] pl-6 my-6">
                  <h4 className="font-bold text-[#4C433C] mb-2">Når du bruger vores kontaktformular:</h4>
                  <p>
                    For at kunne besvare din henvendelse, vurdere din opgave og kontakte dig med et svar eller et tilbud, indsamler vi de oplysninger, du selv indtaster i formularen. Vi benytter en tredjepartsformularudbyder til at videresende disse oplysninger sikkert til vores e-mail.
                  </p>
                  <p className="mt-2 text-sm text-[#92857C]">Behandlingsgrundlag: GDPR art. 6, stk. 1, litra b (nødvendigt aftalegrundlag) samt vurderet legitim interesse i god kundeservice (GDPR art. 6, stk. 1, litra f).</p>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  3. Cookies og sporing
                </h3>
                <p>
                  Vi går meget op i at beskytte dit privatliv, og derfor bruger vi ingen markedsføringscookies eller tredjepartssporing på vores hjemmeside.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>Vi benytter udelukkende Vercel Analytics og Google Search Console til fejlfinding og basale trafikmålinger.</li>
                  <li>Disse systemer indsamler data 100% anonymiseret og sætter ingen form for personhenførbare cookies på dit udstyr.</li>
                  <li>Vores fonte og scripts er hostet lokalt i løsningen, så din IP-adresse ikke deles med Google eller andre tredjeparter.</li>
                  <li>Eventuelle links til sociale medier (f.eks. Instagram) sporer dig ikke på vores side, men når du aktivt klikker dig videre, gælder den pågældende platforms privatlivsvilkår.</li>
                </ul>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  4. Hvem deler vi dine oplysninger med?
                </h3>
                <p>
                  Vi sælger og deler aldrig dine personoplysninger med tredjeparter til markedsføringsvirksomheder eller lignende.
                </p>
                <p>
                  Dine data fra kontaktformularen behandles primært i vores eget e-mailsystem via en sikker tredjepartsformularudbyder. Booking af tider håndteres udelukkende i vores bookingsystem, Planway. Selve hjemmesiden hostes sikkert via Vercel. 
                </p>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  5. Hvor længe gemmer vi dine oplysninger?
                </h3>
                <p>
                  Vi gemmer kun dine data, så længe de har et sagligt formål:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-[#4C433C]">Faktureringsoplysninger:</strong> Opbevares i 5 år efter regnskabsårets afslutning for at overholde gældende krav i den danske Bogføringslov.</li>
                  <li><strong className="text-[#4C433C]">Generelle henvendelser:</strong> Henvendelser fra en kontaktformular, der ikke udmønter sig i en ydelse/serviceaftale, slettes senest 6 måneder efter seneste korrespondance.</li>
                </ul>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  6. Dine rettigheder
                </h3>
                <p>
                  Efter databeskyttelsesreglerne (GDPR) har du ret til at få indsigt i, hvilke personoplysninger vi har registreret om dig, få dem rettet, slettet eller gøre en række øvrige indsigelser mod vores behandling.
                </p>
                <p>
                  Ønsker du at gøre brug af disse rettigheder, bedes du kontakte os på vores e-mailadresse ovenfor. Du har desuden altid den grundlæggende ret til at klage over vores behandling til <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-[#EDB7A9] hover:underline">Datatilsynet</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function MinHistoriePage() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-[#FDFBF7] text-[#1c1a18] font-sans antialiased min-h-[100svh] flex flex-col selection:bg-[#EDB7A9] selection:text-white">

      <main className="flex-1 pt-[clamp(7rem,10vw,10rem)] 2xl:pt-[clamp(10rem,12vw,12rem)] pb-0 overflow-x-hidden">
        {/* Hero Section: Editorial Intro */}
        <motion.section style={hardwareAccelerated} 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-[1200px] 2xl:max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)] mb-[clamp(5rem,8vw,8rem)] 2xl:mb-[clamp(8rem,10vw,10rem)] relative"
        >
          {/* Subtle pulsating gradient blob in top right corner */}
          <div className="absolute top-[-15%] right-[-10%] w-[clamp(270px,45vw,500px)] 2xl:w-[clamp(500px,50vw,600px)] aspect-square z-0 pointer-events-none opacity-40">
             <div className="absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[#EAD5C5]/40 blur-[80px] animate-[spin_15s_linear_infinite]"></div>
             <div className="absolute inset-[-10%] rounded-[60%_40%_30%_70%/50%_40%_50%_60%] bg-[#EDB7A9]/20 blur-[100px] animate-[spin_20s_linear_infinite_reverse]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(3.5rem,6vw,6rem)] 2xl:gap-[clamp(6rem,8vw,8rem)] items-center relative z-10">
            <div className="flex flex-col relative z-10">
              <motion.span style={hardwareAccelerated} variants={fadeInUp} className="font-label text-[clamp(0.6rem,0.7vw,0.7rem)] 2xl:text-[clamp(0.7rem,0.8vw,0.75rem)] uppercase tracking-[0.3em] text-[#92857C] mb-[clamp(1.3rem,2.5vw,2rem)] 2xl:mb-[clamp(2rem,3vw,2.5rem)] block">
                Baggrunden
              </motion.span>
              <motion.h1 style={hardwareAccelerated} variants={fadeInUp} className="text-[clamp(2.7rem,4.5vw,4.5rem)] 2xl:text-[clamp(4.5rem,5vw,5.5rem)] font-headline text-[#1c1a18] font-light leading-[1.05] tracking-tight mb-[clamp(1.8rem,3.5vw,2.5rem)] 2xl:mb-[clamp(2.5rem,4vw,3rem)]">
                Et oprør mod <br /> <span className="italic">samlebåndet.</span>
              </motion.h1>
              <motion.p style={hardwareAccelerated} variants={fadeInUp} className="text-[clamp(1rem,1.2vw,1.2rem)] 2xl:text-[clamp(1.2rem,1.4vw,1.35rem)] font-sans text-[#6A5D55] font-light leading-relaxed max-w-[450px] 2xl:max-w-[500px]">
                Jeg skabte Studio 24, fordi jeg nægtede at arbejde i en branche, hvor uret bestemmer. For mig tager et godt resultat den tid, det tager. Længere er den egentlig ikke.
              </motion.p>
            </div>
            <div className="relative w-[85%] ml-[11%] mr-auto md:w-full md:mx-0 mt-8 md:mt-0">
              <motion.div style={hardwareAccelerated} variants={imageReveal} className="w-full aspect-[3/4] relative overflow-hidden rounded-[4px] shadow-[0_20px_40px_rgba(28,26,24,0.08)]">
                <Image
                  fill
                  priority
                  className="object-cover contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                  src="/about/emilie.png"
                  alt="Elegant close-up portrait of Emilie"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-6 -left-8 md:-bottom-8 md:-left-8 bg-[#FDFBF7]/80 backdrop-blur-md p-[clamp(1.2rem,2.5vw,2rem)] 2xl:p-[clamp(2rem,3vw,2.5rem)] max-w-[240px] md:max-w-[280px] 2xl:max-w-[320px] shadow-[-30px_40px_100px_rgba(237,183,169,0.15)] z-10 rounded-[2px]"
                style={{ WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}
              >
                <p className="font-headline italic text-[#1c1a18] text-[clamp(0.95rem,1.2vw,1.1rem)] 2xl:text-[clamp(1.1rem,1.4vw,1.25rem)] leading-[1.4] mb-4 2xl:mb-5">
                  &quot;Jeg undgår det overfladiske. Du får min ærlige mening, og vi finder en løsning, der rent faktisk giver mening for dig.&quot;
                </p>
                <p className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-[#92857C]">
                  — Emilie, Indehaver
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* The Narrative: Asymmetric Layout */}
        <motion.section style={hardwareAccelerated} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={staggerContainer}
          className="bg-[#FAF8F5] py-[clamp(5rem,8vw,8rem)] 2xl:py-[clamp(6rem,10vw,10rem)] overflow-hidden relative"
        >
          <div className="max-w-[1100px] 2xl:max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(3.5rem,7vw,8rem)] 2xl:gap-[clamp(4rem,8vw,10rem)] items-center">
              <div className="relative order-2 md:order-1">
                <div className="grid grid-cols-2 gap-[clamp(0.9rem,1.8vw,1.2rem)] 2xl:gap-[clamp(1rem,2vw,1.5rem)]">
                  <div className="space-y-[clamp(0.9rem,1.8vw,1.2rem)] 2xl:space-y-[clamp(1rem,2vw,1.5rem)] pt-12">
                    <motion.div style={hardwareAccelerated} variants={imageReveal} className="w-full aspect-square relative overflow-hidden rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] shadow-[0_15px_30px_rgba(28,26,24,0.06)]">
                      <Image
                        fill
                        className="object-cover contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                        src="/about/tools.png"
                        alt="Hair styling tools"
                      />
                    </motion.div>
                    <motion.div style={hardwareAccelerated} variants={imageReveal} className="w-full aspect-[3/4] relative overflow-hidden rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] shadow-[0_15px_30px_rgba(28,26,24,0.06)]">
                      <Image
                        fill
                        className="object-cover contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                        src="/about/interior.png"
                        alt="Atelier interior"
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-[clamp(0.9rem,1.8vw,1.2rem)] 2xl:space-y-[clamp(1rem,2vw,1.5rem)]">
                    <motion.div style={hardwareAccelerated} variants={imageReveal} className="w-full aspect-[3/4] relative overflow-hidden rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] shadow-[0_15px_30px_rgba(28,26,24,0.06)]">
                      <Image
                        fill
                        className="object-cover contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                        src="/about/hair_closeup.png"
                        alt="Hair styling close-up"
                      />
                    </motion.div>
                    <motion.div style={hardwareAccelerated} variants={imageReveal} className="w-full aspect-square relative overflow-hidden rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] shadow-[0_15px_30px_rgba(28,26,24,0.06)]">
                      <Image
                        fill
                        className="object-cover contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                        src="/about/client_coffee.png"
                        alt="Client relaxing"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 self-center relative z-10">
                <motion.h2 style={hardwareAccelerated} variants={fadeInUp} className="text-[clamp(2.2rem,3.5vw,3rem)] 2xl:text-[clamp(2.5rem,4vw,3.5rem)] font-headline text-[#1c1a18] font-light leading-[1.1] tracking-tight mb-[clamp(1.3rem,2.5vw,2rem)] 2xl:mb-[clamp(1.5rem,3vw,2.5rem)]">
                  Min vej hertil
                </motion.h2>
                <motion.div style={hardwareAccelerated} variants={fadeInUp} className="space-y-6 font-sans text-[clamp(0.95rem,1.2vw,1rem)] 2xl:text-[clamp(1.05rem,1.4vw,1.15rem)] font-light text-[#6A5D55] leading-relaxed">
                  <p>
                    Med en 4½-årig frisøruddannelse i bagagen, har jeg stået i saloner, hvor kalenderen var booket til bristepunktet. Det handlede om at få så mange kunder igennem systemet som muligt. Det var mekanisk, travlt og enormt upersonligt.
                  </p>
                  <p>
                    Det gad jeg simpelthen ikke mere. Jeg valgte at starte for mig selv, for at skære alt det overflødige væk. Ingen forhastede behandlinger, ingen smarte genveje, ingen stressende atmosfære.
                  </p>
                  <p className="font-semibold text-[#4C433C] hidden md:block">
                    Mit håndværk bygger på tillid. Vi skal finde det look, der fungerer for dig. Det kræver ærlig rådgivning, og frem for alt, at jeg har tid til at lytte til dig.
                  </p>
                </motion.div>
                <div className="mt-[clamp(2.5rem,3.5vw,3.5rem)] 2xl:mt-[clamp(3rem,4vw,4rem)] hidden md:flex items-center justify-center gap-6">
                  <div className="h-px bg-[#4C433C]/20 flex-grow"></div>
                  <motion.div 
                    initial={{ rotate: -180, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <Paintbrush className="w-5 h-5 text-[#887A70]" strokeWidth={1.5} />
                  </motion.div>
                  <div className="h-px bg-[#4C433C]/20 flex-grow"></div>
                </div>
              </div>
              
              <div className="order-3 md:hidden self-center relative z-10 -mt-[1rem]">
                <motion.div style={hardwareAccelerated} variants={fadeInUp} className="font-sans text-[clamp(0.95rem,1.2vw,1rem)] 2xl:text-[clamp(1.05rem,1.4vw,1.15rem)] font-light text-[#6A5D55] leading-relaxed">
                  <p className="font-semibold text-[#4C433C]">
                    Mit håndværk bygger på tillid. Vi skal finde det look, der fungerer for dig. Det kræver ærlig rådgivning, og frem for alt, at jeg har tid til at lytte til dig.
                  </p>
                </motion.div>
                <div className="mt-[clamp(2.5rem,3.5vw,3.5rem)] flex items-center justify-center gap-6">
                  <div className="h-px bg-[#4C433C]/20 flex-grow"></div>
                  <motion.div 
                    initial={{ rotate: -180, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <Paintbrush className="w-5 h-5 text-[#887A70]" strokeWidth={1.5} />
                  </motion.div>
                  <div className="h-px bg-[#4C433C]/20 flex-grow"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Manifesto Section */}
        <motion.section style={hardwareAccelerated} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={staggerContainer}
          className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] py-[clamp(5rem,8vw,8rem)] 2xl:py-[clamp(6rem,10vw,10rem)] text-center relative"
        >
          <motion.div style={hardwareAccelerated} variants={fadeInUp} className="mb-[clamp(4rem,6vw,8rem)]">
            <span className="font-label text-[clamp(0.7rem,0.8vw,0.75rem)] uppercase tracking-[0.3em] text-[#92857C] mb-[clamp(1.5rem,3vw,2.5rem)] block">
              Mit løfte
            </span>
            <h2 className="text-[clamp(2.5rem,4vw,4.5rem)] font-headline text-[#1c1a18] font-light leading-[1.05] tracking-tight">
              Hvad jeg <span className="italic">står for.</span>
            </h2>
          </motion.div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(4rem,6vw,6rem)]">
            {[
              { icon: Clock, title: "God tid", text: "Jeg har altid god tid til dig. Ingen stress, ingen lappeløsninger – bare ro til at nørde detaljerne." },
              { icon: Heart, title: "Ærlig rådgivning", text: "Jeg guider dig altid ærligt. Du får en behandling, der fungerer for dig, og solid vejledning til din hverdag." },
              { icon: Leaf, title: "Høj faglighed", text: "Med min 4½-årige uddannelse går jeg aldrig på kompromis. Jeg ved, hvad der virker bedst for dit hår." }
            ].map((item, idx) => (
              <ScrollManifestoItem key={idx} item={item} idx={idx} isMobile={isMobile} />
            ))}
          </div>
        </motion.section>

        {/* Signature Component: Stylist Narrative (Horizontal Scroll) */}
        <motion.section style={hardwareAccelerated} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
          variants={staggerContainer}
          className="pt-[clamp(5rem,8vw,8rem)] 2xl:pt-[clamp(6rem,10vw,10rem)] pb-4 bg-[#FAF8F5] overflow-hidden"
        >
          <div className="max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)] mb-[clamp(2.5rem,4vw,4rem)] 2xl:mb-[clamp(3rem,5vw,5rem)] flex justify-between items-end border-b border-[#4C433C]/10 pb-6">
            <h2 className="text-[clamp(2.2rem,2.7vw,3.1rem)] 2xl:text-[clamp(2.5rem,3vw,3.5rem)] font-headline text-[#1c1a18] font-light leading-[1.1]">Mit håndværk</h2>
            <span className="font-label text-[clamp(0.6rem,0.7vw,0.65rem)] 2xl:text-[clamp(0.6rem,0.8vw,0.7rem)] uppercase tracking-[0.2em] text-[#92857C]">
              Detaljerne bag facaden
            </span>
          </div>
          <div className="flex overflow-x-auto items-center xl:justify-center pb-12 px-[clamp(1.5rem,5vw,4rem)] gap-[clamp(1.3rem,2.5vw,2.5rem)] 2xl:gap-[clamp(1.5rem,3vw,3rem)] no-scrollbar scroll-smooth">
            <motion.div style={hardwareAccelerated} variants={imageReveal} className="flex-none w-[clamp(250px,27vw,360px)] 2xl:w-[clamp(280px,30vw,400px)] relative group cursor-pointer shadow-[0_10px_30px_rgba(28,26,24,0.06)] overflow-hidden rounded-[4px] hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div className="w-full aspect-[4/5] relative">
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                  src="/about/swatches.png"
                  alt="Hair color swatches"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            <motion.div style={hardwareAccelerated} variants={imageReveal} className="flex-none w-[clamp(180px,22vw,270px)] 2xl:w-[clamp(200px,25vw,300px)] relative mt-16 group cursor-pointer shadow-[0_10px_30px_rgba(28,26,24,0.06)] overflow-hidden rounded-[4px] hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div className="w-full aspect-square relative">
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                  src="/about/product_hands.png"
                  alt="Product application hands"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            <motion.div style={hardwareAccelerated} variants={imageReveal} className="flex-none w-[clamp(270px,31vw,450px)] 2xl:w-[clamp(300px,35vw,500px)] relative group cursor-pointer shadow-[0_10px_30px_rgba(28,26,24,0.06)] overflow-hidden rounded-[4px] hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div className="w-full aspect-[4/3] relative">
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                  src="/about/mirror.png"
                  alt="Mirror reflection"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            <motion.div style={hardwareAccelerated} variants={imageReveal} className="flex-none w-[clamp(220px,25vw,310px)] 2xl:w-[clamp(250px,28vw,350px)] relative mt-8 group cursor-pointer shadow-[0_10px_30px_rgba(28,26,24,0.06)] overflow-hidden rounded-[4px] hover:-translate-y-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div className="w-full aspect-[3/4] relative">
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                  src="/about/waiting.png"
                  alt="Cozy waiting table"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Final CTA: The Invitation */}
        <motion.section style={hardwareAccelerated} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full relative px-[clamp(1.5rem,5vw,4rem)] pt-[clamp(5rem,7vw,9rem)] 2xl:pt-[clamp(6rem,8vw,10rem)] pb-[clamp(7rem,12vw,10rem)] 2xl:pb-[clamp(8rem,14vw,12rem)] overflow-hidden flex flex-col items-center justify-center text-center bg-white"
        >
          {/* Top Seamless Transition from #FAF8F5 to white */}
          <div className="absolute top-0 left-0 w-full h-[clamp(130px,27vw,270px)] 2xl:h-[clamp(150px,30vw,300px)] bg-gradient-to-b from-[#FAF8F5] to-transparent pointer-events-none z-10"></div>

          {/* Subtle pulsating background gradient fading up from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#EDB7A9]/10 via-[#EDB7A9]/[0.02] to-transparent pointer-events-none z-0"></div>

          {/* Amorphous Pulsating blobs to match the landing page effect but much subtler */}
          <div className="absolute bottom-0 left-[10%] w-[clamp(270px,45vw,720px)] 2xl:w-[clamp(300px,50vw,800px)] aspect-square z-0 pointer-events-none opacity-40 translate-y-1/2">
             <div className="absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[#EDB7A9]/20 blur-[80px] animate-[spin_15s_linear_infinite]"></div>
          </div>
          <div className="absolute bottom-0 right-[10%] w-[clamp(270px,45vw,720px)] 2xl:w-[clamp(300px,50vw,800px)] aspect-square z-0 pointer-events-none opacity-40 translate-y-1/2">
             <div className="absolute inset-0 rounded-[60%_40%_30%_70%/50%_40%_50%_60%] bg-[#EDB7A9]/20 blur-[90px] animate-[spin_18s_linear_infinite_reverse]"></div>
          </div>

          <div className="relative z-10 max-w-[800px] mx-auto">
            <motion.h2 style={hardwareAccelerated} variants={fadeInUp} className="font-headline font-light text-[clamp(2.2rem,3.5vw,3.6rem)] 2xl:text-[clamp(2.5rem,4vw,4rem)] text-[#1c1a18] leading-[1.1] mb-[clamp(0.9rem,1.8vw,1.3rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)] tracking-tight">
              Skal vi kigge på dit hår?
            </motion.h2>
            <motion.p style={hardwareAccelerated} variants={fadeInUp} className="text-[clamp(1rem,1.3vw,1.15rem)] 2xl:text-[clamp(1.1rem,1.5vw,1.3rem)] font-sans text-[#6A5D55] font-light leading-relaxed mb-[clamp(2.2rem,3.5vw,3.1rem)] 2xl:mb-[clamp(2.5rem,4vw,3.5rem)] max-w-xl mx-auto">
              Oplev forskellen ved et besøg, hvor der rent faktisk er sat ordentlig tid af til dig.
            </motion.p>
            <motion.div style={hardwareAccelerated} variants={fadeInUp}>
              <Link 
                className="inline-block bg-[#EDB7A9] text-white px-[clamp(1.8rem,3vw,2.7rem)] 2xl:px-[clamp(2rem,3.5vw,3rem)] py-[clamp(0.9rem,1.3vw,1.1rem)] 2xl:py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.6rem,0.9vw,0.7rem)] 2xl:text-[clamp(0.7rem,1vw,0.8rem)] font-bold shadow-[0_15px_40px_rgba(237,183,169,0.4)] hover:shadow-[0_20px_50px_rgba(237,183,169,0.6)] hover:-translate-y-1 hover:bg-[#e6a896] transition-all duration-400"
                href="?booking=true"
                scroll={false}
              >
                Find din tid her
              </Link>
            </motion.div>
          </div>

          {/* Bottom Curve for Footer */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
            <svg className="relative block w-full h-[clamp(45px,7vw,100px)] 2xl:h-[clamp(50px,8vw,120px)]" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
              <path className="text-[#FDFBF7]" d="M0,100 L0,0 C480,80 960,80 1440,0 L1440,100 Z" />
            </svg>
          </div>
        </motion.section>
      </main>

      {/* Footer from Landing Page */}
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

function ScrollManifestoItem({ item, idx, isMobile }: any) {
  const IconComponent = item.icon;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Mobile scroll-scrub animations similar to page.tsx
  const mobileTranslateY = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [0, -8, -8, 0]);
  const mobileScale = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [1, 1.02, 1.02, 1]);
  const mobileContainerScale = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [1, 1.04, 1.04, 1]);
  const mobileBg = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], ["#FAF8F5", "#F3EFE9", "#F3EFE9", "#FAF8F5"]);
  const mobileIconColor = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], ["#887A70", "#EDB7A9", "#EDB7A9", "#887A70"]);
  const mobileShadow = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], ["0 4px 20px rgba(28,26,24,0.03)", "0 15px 30px rgba(28,26,24,0.06)", "0 15px 30px rgba(28,26,24,0.06)", "0 4px 20px rgba(28,26,24,0.03)"]);
  const mobileOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [0, 1, 1, 0]);
  const mobileTextOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.7], [1, 0, 0, 1]);

  return (
    <motion.div 
      key={idx} 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center group cursor-default"
    >
      <div ref={ref} className="w-full flex flex-col items-center">
        <motion.div 
          style={isMobile ? { backgroundColor: mobileBg, y: mobileTranslateY, scale: mobileScale, boxShadow: mobileShadow } : undefined}
          className={`bg-[#FAF8F5] p-5 rounded-full mb-[clamp(1.5rem,2vw,2rem)] text-[#887A70] shadow-[0_4px_20px_rgba(28,26,24,0.03)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isMobile ? 'group-hover:bg-[#F3EFE9] group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:text-[#EDB7A9] group-hover:shadow-[0_15px_30px_rgba(28,26,24,0.06)]' : ''}`}
        >
          <motion.div style={isMobile ? { color: mobileIconColor } : undefined} className={!isMobile ? "group-hover:text-[#EDB7A9] transition-colors duration-500" : ""}>
            <IconComponent className="w-6 h-6" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={isMobile ? { y: mobileTranslateY, scale: mobileContainerScale } : undefined}
          className={`relative w-full flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isMobile ? 'group-hover:-translate-y-2 group-hover:scale-[1.04]' : ''}`}
        >
          <motion.div 
            style={isMobile ? { opacity: mobileTextOpacity } : undefined}
            className={`w-full flex flex-col items-center transition-opacity duration-500 ease-in-out ${!isMobile ? 'opacity-100 group-hover:opacity-0' : ''}`}
          >
            <h4 className="font-headline text-[clamp(1.5rem,2vw,1.75rem)] text-[#1c1a18] font-light mb-4 whitespace-nowrap">{item.title}</h4>
            <p className="text-[clamp(1rem,1.2vw,1.1rem)] font-sans font-light text-[#6A5D55] leading-relaxed max-w-[280px]">
              {item.text}
            </p>
          </motion.div>
          
          <motion.div 
            style={isMobile ? { opacity: mobileOpacity } : undefined}
            className={`absolute inset-0 pointer-events-none w-full flex flex-col items-center transition-opacity duration-500 ease-in-out ${!isMobile ? 'opacity-0 group-hover:opacity-100' : ''}`}
          >
            <h4 
              className="font-headline text-[clamp(1.5rem,2vw,1.75rem)] font-light mb-4 text-transparent whitespace-nowrap animate-wave-rtl"
              style={{ 
                backgroundImage: "linear-gradient(to right, #1c1a18 0%, #EDB7A9 25%, #1c1a18 50%, #EDB7A9 75%, #1c1a18 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text"
              }}
            >
              {item.title}
            </h4>
            <p 
              className="text-[clamp(1rem,1.2vw,1.1rem)] font-sans font-light leading-relaxed max-w-[280px] text-transparent animate-wave-ltr"
              style={{ 
                backgroundImage: "linear-gradient(to right, #1c1a18 0%, #EDB7A9 25%, #1c1a18 50%, #EDB7A9 75%, #1c1a18 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text"
              }}
            >
              {item.text}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
