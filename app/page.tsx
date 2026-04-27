'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Play, Paintbrush, Scissors, Sparkles, User, Quote, Globe, Share2, Camera, Star } from 'lucide-react';
import { CardTransformed, CardsContainer, ContainerScroll, ReviewStars } from "@/components/blocks/animated-cards-stack"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FAQAccordion } from "@/components/ui/faq-accordion"
// Safari Optimization Config (Hardware Acceleration + will-change)
const hardwareAccelerated = {
  WebkitTransform: "translateZ(0)",
  transform: "translate3d(0, 0, 0)",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  willChange: "transform, opacity",
} as React.CSSProperties;

function ScrollUSPItem({ ydelse, idx, isActive, isMobile }: any) {
  const IconComponent = ydelse.icon;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const mobileBorderColor = useTransform(scrollYProgress, [0.2, 0.4, 0.6], ["rgba(76,67,60,0.1)", "rgba(237,183,169,1)", "rgba(76,67,60,0.1)"]);
  const mobileShadow = useTransform(scrollYProgress, [0.2, 0.4, 0.6], ["0 0 0px rgba(237,183,169,0)", "0 0 30px rgba(237,183,169,0.3)", "0 0 0px rgba(237,183,169,0)"]);
  const mobileScale = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [1, 1.03, 1]);
  const mobileIconColor = useTransform(scrollYProgress, [0.2, 0.4, 0.6], ["rgba(76,67,60,0.6)", "rgba(237,183,169,1)", "rgba(76,67,60,0.6)"]);
  const mobileTextColor = useTransform(scrollYProgress, [0.2, 0.4, 0.6], ["rgba(76,67,60,1)", "rgba(237,183,169,1)", "rgba(76,67,60,1)"]);

  return (
    <Link href="?booking=true" scroll={false} className="w-full block">
      <motion.div style={hardwareAccelerated} 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center group cursor-pointer w-full"
      >
      <div
        ref={ref}
        className="w-full flex flex-col items-center"
      >
        <motion.div 
          style={isMobile ? { 
            borderColor: mobileBorderColor, 
            boxShadow: mobileShadow, 
            scale: mobileScale 
          } : undefined}
          className={`w-[clamp(6rem,8vw,7.5rem)] h-[clamp(6rem,8vw,7.5rem)] 2xl:w-[10rem] 2xl:h-[10rem] rounded-full flex items-center justify-center mb-[clamp(1.5rem,3vw,2.5rem)] mx-auto group-hover:bg-[#EAD5C5] group-hover:border-[#EAD5C5] transition-all duration-[2000ms] ease-out group-hover:duration-500 shadow-sm group-hover:shadow-[0_15px_40px_rgba(234,213,197,0.4)] group-hover:-translate-y-2 border ${!isMobile && isActive ? 'border-[#EDB7A9] shadow-[0_0_30px_rgba(237,183,169,0.3)] scale-[1.03]' : !isMobile ? 'border-[#4C433C]/10 scale-100' : 'border-[#4C433C]/10 scale-100'}`}
        >
          <motion.div style={isMobile ? { color: mobileIconColor } : undefined} className={`transition-all duration-[2000ms] ease-out group-hover:duration-300 group-hover:opacity-100 group-hover:text-[#4C433C] ${!isMobile && isActive ? 'opacity-100 text-[#EDB7A9]' : !isMobile ? 'opacity-60 text-[#4C433C]' : 'text-[#4C433C]'}`}>
             <IconComponent className={`w-[clamp(2rem,3vw,2.5rem)] h-[clamp(2rem,3vw,2.5rem)] 2xl:w-[3.5rem] 2xl:h-[3.5rem] stroke-[1]`} />
          </motion.div>
        </motion.div>
        <motion.h4 
          style={isMobile ? { color: mobileTextColor } : undefined}
          className={`font-headline font-medium text-[clamp(1.5rem,2vw,1.75rem)] mb-3 tracking-tight group-hover:text-[#EAD5C5] transition-colors duration-[2000ms] ease-out group-hover:duration-300 ${!isMobile && isActive ? 'text-[#EDB7A9]' : !isMobile ? 'text-[#4C433C]' : 'text-[#4C433C]'}`}
        >
          {ydelse.title}
        </motion.h4>
        <p className="font-body text-[#6A5D55] font-light leading-relaxed max-w-[280px]">{ydelse.desc}</p>
      </div>
      </motion.div>
    </Link>
  );
}

function ScrollStatsGrid({ isMobile }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const mobileScale = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [1, 1.08, 1.08, 1]);
  const mobileColor = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], ["rgba(76,67,60,1)", "rgba(234,213,197,1)", "rgba(234,213,197,1)", "rgba(76,67,60,1)"]);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#4C433C]/10 text-center lg:max-w-[900px] 2xl:max-w-none mx-auto">
      {[
        { num: "10+", label: "Års erfaring" },
        { num: "4½", label: "Års uddannelse" },
        { num: "50+", label: "5★ anmeldelser" },
        { num: "01", label: "Prisvindende salon" }
      ].map((stat, idx) => (
        <ScrollStatItem key={idx} stat={stat} idx={idx} isMobile={isMobile} mobileScale={mobileScale} mobileColor={mobileColor} />
      ))}
    </div>
  );
}

function ScrollStatItem({ stat, idx, isMobile, mobileScale, mobileColor }: any) {
  return (
    <motion.div style={hardwareAccelerated} 
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-35%" : "-20%" }}
      transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="w-full flex flex-col items-center">
        {isMobile ? (
          <motion.span style={{ ...hardwareAccelerated, scale: mobileScale, color: mobileColor }}
            className="font-headline text-[clamp(3rem,5vw,4.5rem)] 2xl:text-[clamp(4rem,7vw,6.5rem)] font-light italic leading-none mb-3 opacity-90 inline-block"
          >
            {stat.num}
          </motion.span>
        ) : (
          <motion.span style={hardwareAccelerated} 
            initial={{ scale: 1, color: "#4C433C" }}
            whileInView={{ scale: [1, 1.08, 1], color: ["#4C433C", "#EAD5C5", "#4C433C"] }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.4, delay: 0.5, times: [0, 0.3, 1], ease: "easeInOut" }}
            className="font-headline text-[clamp(3rem,5vw,4.5rem)] 2xl:text-[clamp(4rem,7vw,6.5rem)] font-light italic leading-none mb-3 opacity-90 inline-block"
          >
            {stat.num}
          </motion.span>
        )}
        <span className="font-label text-[clamp(0.6rem,0.8vw,0.75rem)] 2xl:text-[clamp(0.7rem,1vw,0.85rem)] uppercase tracking-[0.2em] text-[#92857C] font-bold">{stat.label}</span>
      </div>
    </motion.div>
  );
}

const TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "Michelle",
    date: "6. september 2025",
    rating: 5,
    description: "Emilie ved tydeligvis hvad hun laver. Jeg kom med en stor udfordring... Sort hjemmefarve gennem flere år. Det er ikke bare sådan lige at komme af med. Jeg gik derfra med et fantastisk smukt resultat ✨. Ud over at være yderst kompetent til sit arbejde, så er hun et enormt autentisk menneske, som er utrolig nem at være sammen med. Så 5.. herfra!",
  },
  {
    id: "testimonial-2",
    name: "Casper",
    date: "31. juli 2025",
    rating: 5,
    description: "Det er altid en kæmpe fornøjelse at træde inden for hos Emilie og hendes studio. Man bliver altid mødt af et kæmpe smil, godt humør og en god snak om hvad der nu rører sig. Klipningen er der heller ikke noget at komme efter. Den sidder lige i skabet hver gang. Kæmpe anbefaling for min side!",
  },
  {
    id: "testimonial-3",
    name: "Nadja",
    date: "14. februar 2026",
    rating: 5,
    description: "Randers bedste frisør! Jeg nød hele min oplevelse, og så nærværende, og lyttede efter min ønsker og passede på mit hår undervejs! Kæmpe anbefaling.",
  },
  {
    id: "testimonial-4",
    name: "Bente",
    date: "8. oktober 2025",
    rating: 5,
    description: "Emilie er en dygtig og dejlig frisør at besøge....hun er rolig, sød og afslappet, og kan sit kram. - det ER en ren fornøjelse at lade sig betjene af hende. - TAK Emilie..",
  },
  {
    id: "testimonial-5",
    name: "Sandie",
    date: "21. august 2025",
    rating: 5,
    description: "Jeg er altid super tilfreds, når jeg er hos Emilie. Hun er dygtig, lytter til mine ønsker og får altid mit hår til at se fantastisk ud. Kan varmt anbefales!",
  },
  {
    id: "testimonial-6",
    name: "Kimmie",
    date: "5. marts 2026",
    rating: 5,
    description: "Skøn salon, fik det smukkeste prinsesse hår som jeg altid har drømt om. Fantastisk frisør❤️",
  }
];

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
 style={hardwareAccelerated}            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#4C433C]/20 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
 style={hardwareAccelerated}            initial={{ x: "100%" }}
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

const ReviewModal = ({ review, onClose }: { review: any, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {review && (
        <>
          <motion.div
 style={hardwareAccelerated}            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#4C433C]/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
 style={hardwareAccelerated}            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] px-4"
          >
            <div className="bg-[#FDFBF7] rounded-[24px] p-8 md:p-10 shadow-[0_20px_60px_rgba(76,67,60,0.15)] flex flex-col items-center text-center relative border border-[#EAD5C5]/30">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-[#92857C] hover:text-[#4C433C] transition-colors p-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <ReviewStars className="text-[#EAD5C5] mb-6" rating={review.rating} />
              <div className="text-[1.125rem] font-body italic font-light leading-relaxed text-[#6A5D55] mb-8">
                &quot;{review.description}&quot;
              </div>
              <div className="flex flex-col items-center justify-center gap-1 pt-6 border-t border-[#4C433C]/5 w-full">
                <span className="block font-label uppercase tracking-[0.15em] text-[13px] font-bold text-[#4C433C]">
                  {review.name}
                </span>
                <span className="block text-[12px] font-body text-[#92857C] mt-1">
                  {review.date}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Page() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [activeServices, setActiveServices] = useState<number[]>([]);
  const [isHoveringServices, setIsHoveringServices] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isHoveringServices || isMobile) {
      if (isHoveringServices) setActiveServices([]);
      return;
    }

    let isCancelled = false;

    const runWave = async () => {
      while (!isCancelled) {
        for (let i = 0; i < 4; i++) {
          if (isCancelled) break;
          setActiveServices(prev => Array.from(new Set([...prev, i])));
          
          setTimeout(() => {
            if (!isCancelled) {
              setActiveServices(prev => prev.filter(x => x !== i));
            }
          }, 1100);

          await new Promise(r => setTimeout(r, 600)); // Shorter gap for overlapping wave
        }
        if (isCancelled) break;
        await new Promise(r => setTimeout(r, 3800));
      }
    };

    runWave();

    return () => {
      isCancelled = true;
    };
  }, [isHoveringServices]);

  return (
    <>
      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
      <main>
        {/* Hero Section */}
        <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[#FDFBF7]">
            <video
              src="/videos/hero_video_new.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-[#EAD5C5]/10 to-white/20 backdrop-blur-sm"></div>
          </div>

          {/* Left Lines */}
          <div className="absolute left-[min(4vw,4rem)] top-1/2 -translate-y-1/2 hidden md:flex items-center z-20 group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-[90px] md:w-[120px] h-[1px] bg-[#4C433C]/40 group-hover:w-[130px] md:group-hover:w-[160px] transition-all duration-700 relative">
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#4C433C] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          {/* Right Lines */}
          <div className="absolute right-[min(4vw,4rem)] top-1/2 -translate-y-1/2 hidden md:flex items-center z-20 group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-[90px] md:w-[120px] h-[1px] bg-[#4C433C]/40 group-hover:w-[130px] md:group-hover:w-[160px] transition-all duration-700 relative">
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#4C433C] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          <div className="relative z-10 text-center px-[clamp(1.5rem,4vw,4rem)] w-full max-w-4xl mx-auto mt-4 lg:-mt-4 2xl:mt-16">
            <motion.h1 style={hardwareAccelerated} 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline font-light text-[clamp(2.5rem,5.5vw,5rem)] 2xl:text-[clamp(2.5rem,6.5vw,5.5rem)] text-[#4C433C] leading-[1.05] tracking-tight mb-[clamp(1.5rem,3vw,2.5rem)] 2xl:mb-[clamp(2rem,3.5vw,3rem)]"
            >
              Dit hår fortjener<br/>
              <span className="italic font-light">en dygtig frisør</span>
            </motion.h1>
            <motion.p style={hardwareAccelerated} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-[#6A5D55] text-[clamp(0.95rem,1.15vw,1.0625rem)] 2xl:text-[clamp(1rem,1.25vw,1.125rem)] max-w-2xl mx-auto mb-[clamp(1.5rem,3vw,2.5rem)] 2xl:mb-[clamp(2rem,3.5vw,3rem)] font-light leading-relaxed drop-shadow-sm"
            >
              Mange har oplevet at sidde i stolen og få noget de slet ikke bad om. Her får du ærlig rådgivning fra én, der faktisk forstår din vision.
            </motion.p>
            <motion.div style={hardwareAccelerated} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <Link href="/behandlinger" className="inline-block bg-[#EDB7A9] text-white px-[clamp(2.25rem,3.5vw,3rem)] py-[clamp(0.8125rem,1.3vw,1.0625rem)] text-[0.9375rem] 2xl:px-[clamp(2.5rem,4vw,3.5rem)] 2xl:py-[clamp(0.875rem,1.5vw,1.125rem)] 2xl:text-[clamp(0.875rem,1vw,1rem)] font-body font-bold tracking-wide shadow-[0_10px_30px_rgba(237,183,169,0.3)] hover:shadow-[0_15px_40px_rgba(237,183,169,0.5)] hover:-translate-y-1 hover:bg-[#e6a896] transition-all duration-300">
                Udforsk ydelser
              </Link>
            </motion.div>
          </div>

          {/* Bottom Curve */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
            <svg className="relative block w-full h-[clamp(50px,8vw,120px)]" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
              <path className="text-[#FDFBF7]" d="M0,100 L0,80 C480,0 960,0 1440,80 L1440,100 Z" />
            </svg>
          </div>
        </section>

        {/* Min Historie (Using 11.png layout) */}
        <section id="min-historie" className="relative pt-[clamp(1.5rem,4vw,5rem)] pb-[clamp(5rem,12vw,8rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[#FDFBF7] text-[#4C433C]">
          {/* Glimmer Image overlay */}
          <div className="absolute right-0 top-[-9rem] md:top-[-22rem] w-[clamp(200px,25vw,600px)] z-[35] pointer-events-none drop-shadow-md brightness-90 saturate-[1.5] sepia-[0.3] hue-rotate-[-10deg] opacity-80">
             <Image src="/images/glitter.png" alt="Glitter graphic" width={800} height={1000} className="w-full h-auto object-contain object-right-top" />
          </div>

          <div className="max-w-[1400px] mx-auto flex flex-col items-center relative z-10 pt-4">
            
            <motion.div
 style={hardwareAccelerated}              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-[ clamp(3rem,5vw,4rem) ] h-[ clamp(3rem,5vw,4rem) ] rounded-full bg-[#4C433C]/[0.03] flex items-center justify-center mb-[clamp(1.5rem,3vw,2rem)] p-3"
            >
              <Scissors className="w-5 h-5 md:w-6 md:h-6 text-[#4C433C] opacity-70" />
            </motion.div>

            <motion.h2 style={hardwareAccelerated} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline font-light text-[clamp(2.5rem,5vw,4.5rem)] text-center leading-[1.1] tracking-tight max-w-4xl mx-auto"
            >
              <em className="italic font-light">Ingen ubehagelige overraskelser.</em><br/>
              <strong className="font-medium">Bare det resultat,</strong> <em className="italic font-light">vi aftalte.</em>
            </motion.h2>

            <motion.p
 style={hardwareAccelerated}              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-[clamp(1.5rem,3vw,2.5rem)] max-w-3xl font-body text-[#6A5D55] text-[clamp(0.875rem,1.2vw,1.125rem)] text-center leading-relaxed px-4"
            >
              Jeg oplever desværre ofte nye kunder, der kommer ind med fuldstændig smadret hår fra et tidligere frisørbesøg. Det sker næsten altid, fordi der mangler basal kommunikation. Derfor gennemgår vi altid alt i fællesskab her. Jeg kigger på dine referencebilleder og sikrer mig, at jeg forstår din vision, inden jeg rører saksen.
            </motion.p>

            <div className="grid md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1fr_1fr] 2xl:grid-cols-[1.3fr_1fr] gap-[clamp(4rem,8vw,10rem)] lg:gap-12 2xl:gap-[clamp(4rem,8vw,10rem)] mt-[clamp(2.5rem,4vw,4rem)] w-full items-start px-4 md:px-0 lg:translate-x-0 transition-transform">
              
              {/* LEFT SIDE */}
              <motion.div style={hardwareAccelerated} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full"
              >
                {/* Floating Title (Absolute to overlap left edge on Desktop) */}
                <div className="absolute top-[10%] lg:left-[12%] 2xl:left-[-10%] z-20 hidden lg:block transition-all duration-300">
                  <h3 className="font-headline text-[clamp(1.75rem,2.5vw,2.5rem)] 2xl:text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] text-[#4C433C] whitespace-nowrap [text-shadow:0_4px_24px_rgba(253,251,247,1),0_0_12px_rgba(253,251,247,0.8)]">
                    <strong className="font-medium">Ægte faglighed.</strong><br/>
                    <em className="italic font-light">Ingen smarte salgstaler.</em>
                  </h3>
                </div>
                {/* For mobile & small tablets, show natural flowing title */}
                <h3 className="font-headline text-[clamp(2.5rem,6vw,3.5rem)] leading-[1.05] text-[#4C433C] mb-6 block lg:hidden text-center md:text-left [text-shadow:0_4px_24px_rgba(253,251,247,1),0_0_12px_rgba(253,251,247,0.8)]">
                  <strong className="font-medium">Ægte faglighed.</strong><br/>
                  <em className="italic font-light">Ingen smarte salgstaler.</em>
                </h3>
                
                <div className="relative w-full md:w-[80%] lg:w-[68%] 2xl:w-[90%] ml-auto aspect-[1/1] rounded-[50%] overflow-hidden group transition-all duration-300">
                  <Image src="/images/solo_salon_hair_emilie.png" alt="Frisør behandling" fill className="object-cover transition-transform duration-[2s] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]" />
                </div>

                {/* Sticker Badge Overlaid Bottom Left (Decorative Scalloped Dashed Oval) */}
                <div className="absolute bottom-[-4%] left-[1%] md:bottom-[-4%] md:left-[8%] lg:left-[24%] 2xl:left-[2%] z-30 w-[clamp(6rem,12vw,10rem)] h-[clamp(6rem,12vw,10rem)] 2xl:w-[clamp(9rem,18vw,14rem)] 2xl:h-[clamp(9rem,18vw,14rem)] flex items-center justify-center opacity-70 transition-all duration-300">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-full h-full text-[#7A6F68] drop-shadow-sm overflow-visible">
                    <style>{`
                      @keyframes orbit-dash {
                        to { stroke-dashoffset: 200; }
                      }
                    `}</style>
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                      style={{ animation: 'orbit-dash 180s linear infinite' }}
                    />
                  </svg>
                </div>
              </motion.div>

              {/* RIGHT SIDE */}
              <motion.div style={hardwareAccelerated} 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center h-full max-w-[550px] mx-auto lg:mx-auto 2xl:ml-auto 2xl:mr-0 pt-[clamp(2rem,8vw,10rem)]"
              >
                 <div className="w-full md:w-[85%] aspect-[4/3] md:aspect-[1.4/1] rounded-[50%] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-[clamp(2rem,4vw,3rem)] group">
                    <Image src="/images/solo_salon_relaxing_emilie.png" alt="Frisør salon" fill className="object-cover transition-transform duration-[2s] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]" />
                 </div>
                 
                 <h4 className="font-headline font-medium text-[clamp(1.5rem,2.2vw,2.3rem)] 2xl:text-[clamp(1.75rem,2.5vw,2.5rem)] text-[#4C433C] leading-[1.1] text-center md:text-left md:w-[115%]">
                   Glem alt om det travle og <br/>upersonlige samlebåndsarbejde.
                 </h4>
                 
                 <p className="mt-[clamp(1rem,2vw,1.5rem)] font-body text-[clamp(0.875rem,1.1vw,1rem)] text-[#6A5D55] leading-relaxed text-center md:text-left">
                   Jeg har tidligere arbejdet i store saloner, hvor jeg følte mig som en maskine ved et samlebånd. Det nægtede jeg fuldstændig at fortsætte med. Min salon er skabt som et direkte modsvar, bygget på god tid og fuld respekt for dit hår. Ingen lappeløsninger hos mig.
                 </p>
                 
                 <div className="mt-[clamp(1.5rem,3vw,2rem)] text-center md:text-left w-full">
                   <Link href="?booking=true" scroll={false} className="inline-block bg-[#EDB7A9] text-white px-[clamp(2.5rem,4vw,3.5rem)] py-[clamp(1.25rem,2vw,1.5rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.75rem,1.2vw,0.875rem)] font-bold shadow-[0_15px_40px_rgba(237,183,169,0.4)] hover:shadow-[0_20px_50px_rgba(237,183,169,0.6)] hover:-translate-y-1 hover:bg-[#e6a896] transition-all duration-400">
                     Find en tid
                   </Link>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>



        {/* New Animated Stack Testimonials */}
        <section id="testimonials" className="relative pb-[clamp(5rem,8vw,8rem)] bg-[#FDFBF7] text-[#4C433C] overflow-clip z-20">
          <ContainerScroll className="container mx-auto h-[500vh]">
            <div className="sticky left-0 top-0 h-svh w-full py-12 flex flex-col justify-center items-center">
              
              {/* Title Section (Sticky Background) */}
              <div className="w-full max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)] z-0 shrink-0 mb-8 md:mb-12 pt-4 lg:pt-16 2xl:pt-0">
                <motion.h3 style={hardwareAccelerated} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center font-headline font-light text-[clamp(2rem,3vw,3rem)] 2xl:text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] tracking-tight mb-4"
                >
                  Det mener dem <em className="italic font-light">der sidder her</em>
                </motion.h3>
                <motion.p style={hardwareAccelerated} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mx-auto max-w-lg text-center text-[#6A5D55] font-body font-light text-[clamp(0.9rem,1.2vw,1rem)] 2xl:text-[clamp(1rem,1.5vw,1.125rem)]"
                >
                  Jeg kan sige meget, men mine kunders oplevelser ude fra hverdagen vejer altid tungest.
                </motion.p>
              </div>
              
              {/* Amorphous Pulsating Hues matched to the CTA button (#EDB7A9) */}
              <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-[clamp(250px,40vw,600px)] aspect-square z-0 pointer-events-none opacity-80">
                 <div className="absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[_#EAD5C5_]/40 blur-[80px] animate-[spin_15s_linear_infinite]"></div>
                 <div className="absolute inset-[-10%] rounded-[60%_40%_30%_70%/50%_40%_50%_60%] bg-[_#EAD5C5_]/30 blur-[100px] animate-[spin_20s_linear_infinite_reverse]"></div>
              </div>
              <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[clamp(250px,40vw,600px)] aspect-square z-0 pointer-events-none opacity-80">
                 <div className="absolute inset-0 rounded-[60%_40%_30%_70%/50%_40%_50%_60%] bg-[_#EAD5C5_]/30 blur-[90px] animate-[spin_18s_linear_infinite]"></div>
                 <div className="absolute inset-[-5%] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[_#EAD5C5_]/40 blur-[110px] animate-[spin_22s_linear_infinite_reverse]"></div>
              </div>

               {/* Six Floating Background Images (Left and Right) */}
              <div className="absolute inset-0 w-full max-w-[1400px] mx-auto z-0 pointer-events-none hidden md:block">
                 {/* Left Side Group */}
                 <div className="absolute top-[15%] 2xl:top-[16%] left-[8%] lg:left-[12%] 2xl:left-[4%] w-[clamp(120px,11vw,150px)] 2xl:w-[clamp(170px,14vw,230px)] aspect-[2/3] rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] overflow-hidden rotate-[-12deg] shadow-[0_15px_40px_rgba(28,26,24,0.15)]">
                    <div className="absolute inset-0 bg-[#EAD5C5]/10 mix-blend-multiply z-10"></div>
                    <Image src="/gallerypics/3.png" fill alt="Result 1" className="object-cover" />
                 </div>
                 <div className="absolute top-[42%] 2xl:top-[43%] left-[2%] lg:left-[6%] 2xl:-left-[2%] w-[clamp(110px,10vw,130px)] 2xl:w-[clamp(150px,12vw,200px)] aspect-[2/3] rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] overflow-hidden rotate-[8deg] shadow-[0_15px_40px_rgba(28,26,24,0.15)]">
                    <div className="absolute inset-0 bg-[#EAD5C5]/10 mix-blend-multiply z-10"></div>
                    <Image src="/gallerypics/15.png" fill alt="Result 2" className="object-cover" />
                 </div>
                 <div className="absolute top-[68%] 2xl:top-[66%] left-[12%] lg:left-[14%] 2xl:left-[6%] w-[clamp(130px,12vw,160px)] 2xl:w-[clamp(150px,12vw,200px)] aspect-[2/3] rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] overflow-hidden rotate-[-4deg] shadow-[0_15px_40px_rgba(28,26,24,0.15)]">
                    <div className="absolute inset-0 bg-[#EAD5C5]/10 mix-blend-multiply z-10"></div>
                    <Image src="/gallerypics/6.png" fill alt="Result 3" className="object-cover" />
                 </div>

                 {/* Right Side Group */}
                 <div className="absolute top-[18%] 2xl:top-[18%] right-[10%] lg:right-[12%] 2xl:right-[6%] w-[clamp(130px,12vw,160px)] 2xl:w-[clamp(180px,14vw,235px)] aspect-[2/3] rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] overflow-hidden rotate-[15deg] shadow-[0_15px_40px_rgba(28,26,24,0.15)]">
                    <div className="absolute inset-0 bg-[#EAD5C5]/10 mix-blend-multiply z-10"></div>
                    <Image src="/gallerypics/9.png" fill alt="Result 4" className="object-cover" />
                 </div>
                 <div className="absolute top-[45%] 2xl:top-[45%] right-[3%] lg:right-[6%] 2xl:right-[0%] w-[clamp(115px,10vw,140px)] 2xl:w-[clamp(160px,13vw,210px)] aspect-[2/3] rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] overflow-hidden rotate-[-10deg] shadow-[0_15px_40px_rgba(28,26,24,0.15)]">
                    <div className="absolute inset-0 bg-[#EAD5C5]/10 mix-blend-multiply z-10"></div>
                    <Image src="/gallerypics/1.png" fill alt="Result 5" className="object-cover" />
                 </div>
                 <div className="absolute top-[72%] 2xl:top-[70%] right-[12%] lg:right-[14%] 2xl:right-[8%] w-[clamp(110px,9vw,135px)] 2xl:w-[clamp(150px,12vw,200px)] aspect-[2/3] rounded-[40px] lg:rounded-[48px] 2xl:rounded-[60px] overflow-hidden rotate-[6deg] shadow-[0_15px_40px_rgba(28,26,24,0.15)]">
                    <div className="absolute inset-0 bg-[#EAD5C5]/10 mix-blend-multiply z-10"></div>
                    <Image src="/gallerypics/12.png" fill alt="Result 6" className="object-cover" />
                 </div>
              </div>

              {/* Central Stack */}
              <div className="relative z-10 w-full flex justify-center h-[360px] 2xl:h-[460px] mt-10 md:mt-12 lg:mt-8 2xl:mt-20">
                <div 
                  className="absolute -top-[250px] left-0 right-0 -bottom-[200px] pointer-events-none"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 11%, black 19%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 11%, black 19%, black 100%)'
                  }}
                >
                  <div className="absolute top-[250px] w-full flex justify-center h-[360px] 2xl:h-[460px] pointer-events-auto">
                    <CardsContainer className="relative size-full max-w-[280px] 2xl:max-w-[360px] px-4 md:px-0 -translate-x-3 md:translate-x-0">
                      {TESTIMONIALS.map((testimonial, index) => (
                        <CardTransformed
                          arrayLength={TESTIMONIALS.length}
                          key={testimonial.id}
                          variant="light"
                          index={index}
                          role="article"
                          className="flex flex-col justify-between h-[100%] p-5 pt-6 2xl:p-8 2xl:pt-10 rounded-[28px] rounded-tr-[56px] rounded-bl-[56px] 2xl:rounded-[40px] 2xl:rounded-tr-[80px] 2xl:rounded-bl-[80px]"
                        >
                          <div className="flex flex-col items-center space-y-4 text-center mt-2">
                            <ReviewStars
                              className="text-[#EAD5C5]"
                              rating={testimonial.rating}
                            />
                            <div className="mx-auto w-[90%] text-[clamp(0.9rem,1.1vw,1rem)] 2xl:text-[clamp(1.1rem,1.5vw,1.25rem)] font-body italic font-light leading-relaxed text-[#6A5D55]">
                              <blockquote cite="#">
                                &quot;{testimonial.description.length > 130 ? `${testimonial.description.substring(0, 130)}...` : testimonial.description}&quot;
                              </blockquote>
                              {testimonial.description.length > 130 && (
                                <button 
                                  onClick={() => setSelectedReview(testimonial)}
                                  className="mt-3 2xl:mt-4 text-[9px] 2xl:text-[11px] font-medium tracking-widest uppercase text-[#EDB7A9] hover:text-[#4C433C] transition-colors font-label"
                                >
                                  Læs mere
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center gap-1 mt-4 pt-4 2xl:mt-6 2xl:pt-5 border-t border-[#4C433C]/5 w-full text-center">
                              <span className="block font-label uppercase tracking-[0.15em] text-[10px] 2xl:text-[13px] font-bold text-[#4C433C]">
                                {testimonial.name}
                              </span>
                              <span className="block text-[9px] 2xl:text-[12px] font-body text-[#92857C] mt-1">
                                {testimonial.date}
                              </span>
                          </div>
                        </CardTransformed>
                      ))}
                    </CardsContainer>
                  </div>
                </div>
              </div>
              <motion.div style={hardwareAccelerated} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
                className="absolute -bottom-[4%] md:bottom-0 lg:-bottom-[4%] 2xl:bottom-[8%] z-10"
              >
                <a href="https://studio24-23056.planway.com/widget/reviews" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-2 py-1 opacity-80 hover:opacity-100 transition-opacity group cursor-pointer">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((i, idx) => (
                      <Star 
                        key={i} 
                        className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 fill-[#EDB7A9] text-[#EDB7A9] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[3px] group-hover:scale-110" 
                        style={{ transitionDelay: `${idx * 60}ms` }}
                      />
                    ))}
                  </div>
                  <div className="h-3 w-[1px] bg-[#4C433C]/30"></div>
                  <span className="text-[10px] 2xl:text-[11px] font-medium tracking-widest text-[#EDB7A9] uppercase pt-px">50+ femstjernede anmeldelser</span>
                </a>
              </motion.div>
            </div>
          </ContainerScroll>
        </section>

        {/* Ydelser (Using 33.png layout) */}
        <section id="ydelser" className="relative pt-[clamp(3rem,4vw,5rem)] pb-[clamp(6rem,12vw,10rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[#FDFBF7] text-[#4C433C] overflow-hidden z-30">

          <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.h2 style={hardwareAccelerated} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center font-headline font-light text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] tracking-tight mb-[clamp(2rem,4vw,3.5rem)]"
            >
              Mine kernekompetencer
            </motion.h2>

            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 2xl:gap-[clamp(3rem,5vw,4rem)] lg:max-w-[1100px] 2xl:max-w-none mx-auto"
              onMouseEnter={() => setIsHoveringServices(true)}
              onMouseLeave={() => setIsHoveringServices(false)}
            >
              {[
                { title: "Balayage", desc: "Skånsomme farveovergange der giver et naturligt look og kræver mindre vedligehold.", icon: Paintbrush },
                { title: "Klip og styling", desc: "En klipning tilpasset dit ansigt så frisuren også fungerer for dig derhjemme.", icon: Scissors },
                { title: "Farve og striber", desc: "En grundig farvekonsultation sikrer at vi rammer den rette nuance uden at ødelægge håret.", icon: Sparkles },
                { title: "Professionelle extensions", desc: "Få længde og fylde på en sikker måde. Jeg bærer dem selv dagligt.", icon: User }
              ].map((ydelse, idx) => {
                const IconComponent = ydelse.icon;
                const isActive = activeServices.includes(idx);
                
                return <ScrollUSPItem key={idx} ydelse={ydelse} idx={idx} isActive={isActive} isMobile={isMobile} />;
              })}
            </div>
          </div>
        </section>

        {/* Stats (Using 44.png layout) */}
        <section className="relative py-[clamp(6rem,12vw,10rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[#F8F5F0] text-[#4C433C] z-40">
          {/* Curve Graphics */}
          <div className="absolute top-[-10%] md:top-[-20%] left-0 w-[clamp(180px,25vw,650px)] h-[120%] md:h-[140%] pointer-events-none drop-shadow-sm brightness-[0.95] opacity-70">
             <Image src="/images/curve_left.png" alt="Curve left" fill className="object-contain object-left-top" />
          </div>
          <div className="absolute bottom-[-10%] md:bottom-[-25%] right-0 w-[clamp(180px,27vw,700px)] h-[120%] md:h-[150%] pointer-events-none drop-shadow-sm brightness-[0.95] opacity-70">
             <Image src="/images/curve_right.png" alt="Curve right" fill className="object-contain object-right-bottom" />
          </div>
          
          <div className="max-w-[1400px] mx-auto relative z-10">
             <div className="grid md:grid-cols-2 gap-[clamp(4rem,10vw,12rem)] items-center mb-[clamp(6rem,10vw,8rem)] max-w-[1200px] mx-auto">
                <div className="max-w-md ml-auto text-center md:text-right space-y-[clamp(1.5rem,3vw,2rem)] order-2 md:order-1 pt-8 md:pt-0">
                  <h3 className="font-headline font-light text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
                    Fra dygtig lærling til <em className="italic font-light">fuldt uafhængig</em> <em className="italic font-light">salonejer</em>
                  </h3>
                  <p className="font-body text-[#6A5D55] font-light text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed">
                    Med en lang uddannelse i bagagen kender jeg teorien til bunds. Men det er min erfaring på gulvet der gør den store forskel for dit endelige resultat, når du forlader stolen.
                  </p>
                </div>
                <motion.div style={hardwareAccelerated} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-[450px] aspect-square mx-auto md:ml-0 order-1 md:order-2"
                >
                   <div className="absolute top-0 right-0 w-[75%] h-[75%] rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-0 hover:z-20 transition-all duration-500 hover:scale-105">
                      <Image src="/images/landing_stats_1.png" fill alt="Detail" className="object-cover contrast-[0.85] saturate-[0.85] brightness-[1.05]" />
                   </div>
                   <div className="absolute bottom-0 left-0 w-[70%] h-[70%] rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] z-10 hover:z-20 transition-all duration-500 hover:scale-105">
                      <Image src="/images/landing_stats_2.png" fill alt="Tools" className="object-cover contrast-[0.85] saturate-[0.85] brightness-[1.05]" />
                   </div>
                </motion.div>
             </div>

             <ScrollStatsGrid isMobile={isMobile} />
          </div>
        </section>

        {/* Eksperter / Stifter (Founder) */}
        <section id="galleri" className="relative pt-[clamp(6rem,12vw,10rem)] pb-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[#FDFBF7] text-[#4C433C] z-10">
           <div className="max-w-[1400px] lg:max-w-[1100px] 2xl:max-w-[1400px] mx-auto grid md:grid-cols-2 gap-[clamp(5rem,10vw,8rem)] lg:gap-[5rem] 2xl:gap-[clamp(5rem,10vw,8rem)] items-center mb-[clamp(6rem,12vw,10rem)] pt-[clamp(2rem,4vw,4rem)]">
              {/* Left Image Composition */}
              <motion.div style={hardwareAccelerated} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[75%] md:w-full max-w-[500px] lg:max-w-[420px] 2xl:max-w-[500px] mx-auto md:mr-auto md:ml-0"
              >
                  <div className="w-full aspect-[3/4] rounded-t-[1000px] rounded-b-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] group relative z-10">
                    <Image src="/images/landing_founder.png" fill alt="Founder" className="object-cover transition-transform duration-[5s] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]" />
                  </div>
                  {/* Floating Galleri Image */}
                  <div className="absolute bottom-[-10%] right-[-10%] w-[55%] aspect-square rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-20 hover:-translate-y-2 transition-transform duration-700 group">
                    <Image src="/images/landing_founder_detail.png" fill alt="Salon work detail" className="object-cover transition-transform duration-[5s] group-hover:scale-110 contrast-[0.85] saturate-[0.85] brightness-[1.05]" />
                  </div>
                  {/* Subtle star SVG accent behind */}
                  <div className="absolute top-[10%] left-[-15%] z-0 text-[#EAD5C5] opacity-50 pointer-events-none w-[20%] aspect-square animate-[spin_40s_linear_infinite]">
                     <Sparkles className="w-full h-full stroke-[0.5]" />
                  </div>
              </motion.div>

              {/* Right Text Block */}
              <motion.div
 style={hardwareAccelerated}                 initial={{ opacity: 0, x: 40 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-20%" }}
                 transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                 className="flex flex-col justify-center max-w-xl lg:max-w-lg 2xl:max-w-xl mx-auto md:mx-0"
              >
                 <div className="flex items-center gap-4 mb-[clamp(1.5rem,3vw,2rem)] opacity-60">
                    <div className="h-[1px] w-[clamp(2rem,4vw,3rem)] bg-[#4C433C]"></div>
                    <span className="font-label uppercase tracking-[0.25em] text-[clamp(0.7rem,1vw,0.85rem)] font-bold">Din personlige frisør</span>
                 </div>
                 
                 <h2 className="font-headline font-light text-[clamp(2rem,3.5vw,3.5rem)] 2xl:text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-tight mb-[clamp(1.5rem,3vw,2.5rem)]">
                   Ærlig og nede<br/><em className="italic font-light">på jorden</em>
                 </h2>
                 
                 <p className="font-body text-[#6A5D55] font-light text-[clamp(1rem,1.35vw,1.18rem)] 2xl:text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed mb-[clamp(2rem,4vw,3rem)]">
                    For mig er tryghed at vide præcis hvad du går ind til. Du får absolut ingen urealistiske løfter her. Du får til gengæld en erfaren fagperson, der passer utroligt godt på dit eget naturlige hår under behandlingen.
                 </p>
                 
                 <div className="relative pl-[clamp(1.5rem,3vw,2rem)] border-l-2 border-[#EAD5C5]">
                    <p className="font-headline italic text-[clamp(1.15rem,1.35vw,1.35rem)] 2xl:text-[clamp(1.25rem,1.5vw,1.5rem)] text-[#4C433C]/90 leading-relaxed pt-2 relative z-10">
                       &quot;Jeg har altid hadet den der snobbede kultur, hvor man næsten ikke tør sige noget, når man sidder i frisørstolen. Min salon er skabt som det direkte modsvar. Den er elegant, ja – men den er først og fremmest jordnær.&quot;
                    </p>
                    <Quote className="absolute bottom-[-20%] right-[-5%] w-[clamp(4.5rem,6vw,6rem)] h-[clamp(4.5rem,6vw,6rem)] 2xl:w-[clamp(5rem,8vw,7rem)] 2xl:h-[clamp(5rem,8vw,7rem)] text-[#EAD5C5] opacity-25 stroke-[1] rotate-12 z-0" />
                 </div>
              </motion.div>
           </div>

           {/* Mirrored Glimmer Image overlay (Between Founder & FAQ) */}
           <div className="absolute left-0 bottom-[-5rem] md:bottom-[-26rem] w-[clamp(200px,25vw,600px)] z-[35] pointer-events-none drop-shadow-md brightness-90 saturate-[1.5] sepia-[0.3] hue-rotate-[-10deg] scale-x-[-1] opacity-80">
              <Image src="/images/glitter.png" alt="Glitter graphic mirrored" width={800} height={1000} className="w-full h-auto object-contain object-right-top" />
           </div>
        </section>

        {/* FAQ Section */}
        <FAQAccordion />

        {/* Booking CTA Background Parallax (Using 66.png layout) */}
        <section id="kontakt" className="relative pt-[clamp(4rem,8vw,8rem)] 2xl:pt-[clamp(8rem,15vw,12rem)] pb-[clamp(8rem,15vw,12rem)] px-[clamp(1.5rem,5vw,4rem)] overflow-hidden flex items-center justify-center">
           {/* Background Image and Overlay */}
           <div className="absolute inset-0 z-0 bg-[#FDFBF7]">
             <Image src="/images/cozy_small_salon.png" fill alt="Salon ambience" className="object-cover scale-[1.05] opacity-[0.45] contrast-[0.85] saturate-[0.85] brightness-[1.05]" />
             {/* Whitish tint matching hero video (slightly reduced for footer image) */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[#EAD5C5]/15 to-white/30 backdrop-blur-sm pointer-events-none z-10"></div>
             {/* Top fade gradient for a smooth transition from previous section */}
             <div className="absolute top-0 left-0 w-full h-[clamp(150px,25vw,300px)] bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent pointer-events-none z-20"></div>
           </div>

           <motion.div style={hardwareAccelerated} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mt-[clamp(2rem,6vw,5rem)] max-w-[650px] 2xl:max-w-[750px] w-full bg-white/40 backdrop-blur-xl p-10 lg:p-12 2xl:p-[clamp(2.5rem,6vw,4.5rem)] text-center shadow-[0_30px_80px_rgba(0,0,0,0.15)] rounded-tr-[70px] rounded-bl-[70px] 2xl:rounded-tr-[90px] 2xl:rounded-bl-[90px]"
           >
              <h2 className="font-headline font-light text-[clamp(1.8rem,2.8vw,2.5rem)] 2xl:text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05] text-[#6E625A] mb-6 2xl:mb-[clamp(1.5rem,3vw,2.5rem)] tracking-tight">
                Lyder det som noget for dig? <em className="italic font-light">Book en tid</em> hos os, så tager vi <em className="italic font-light">en snak</em> om dit hår.
              </h2>
              <a href="#book" className="inline-block bg-[#EDB7A9] text-white px-8 py-3.5 2xl:px-[clamp(2rem,3.5vw,3rem)] 2xl:py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[0.65rem] 2xl:text-[clamp(0.7rem,1vw,0.8rem)] font-bold shadow-[0_15px_40px_rgba(237,183,169,0.4)] hover:shadow-[0_20px_50px_rgba(237,183,169,0.6)] hover:-translate-y-1 hover:bg-[#e6a896] transition-all duration-400">
                Book en tid nu
              </a>
           </motion.div>

           {/* Bottom Curve for Footer (Opposite to Hero = U-shape dip) */}
           <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
             <svg className="relative block w-full h-[clamp(50px,8vw,120px)]" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
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
              Bygget på håndværk, ærlighed og en tro på at du fortjener en frisør der forstår dig.
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
    </>
  );
}
