'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Paintbrush, Clock, Heart, Leaf } from 'lucide-react';
import { hardwareAccelerated, getSafeFadeInUp, getSafeImageReveal, checkIsSafariDesktop } from '@/lib/utils';
import { SiteFooter } from '@/components/ui/site-footer';

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
          className={`bg-[#FAF8F5] p-5 rounded-full mb-[clamp(1.5rem,2vw,2rem)] text-[#887A70] shadow-[0_4px_20px_rgba(28,26,24,0.03)] transition duration-1000 ease-out ${!isMobile ? 'group-hover:bg-[#F3EFE9] group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:text-[#EDB7A9] group-hover:shadow-[0_15px_30px_rgba(28,26,24,0.06)]' : ''}`}
        >
          <motion.div style={isMobile ? { color: mobileIconColor } : undefined} className={!isMobile ? "group-hover:text-[#EDB7A9] transition-colors duration-500" : ""}>
            <IconComponent className="w-6 h-6" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={isMobile ? { y: mobileTranslateY, scale: mobileContainerScale } : undefined}
          className={`relative w-full flex flex-col items-center transition-transform duration-700 ease-in-out ${!isMobile ? 'group-hover:-translate-y-2 group-hover:scale-[1.04]' : ''}`}
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

export default function MinHistoriePage() {

  const [isMobile, setIsMobile] = useState(false);
  const [isSafariDesktop, setIsSafariDesktop] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setIsSafariDesktop(checkIsSafariDesktop());
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize animation variants — on Safari Desktop, blur is stripped
  const fadeInUp = useMemo(() => getSafeFadeInUp(isSafariDesktop), [isSafariDesktop]);
  const imageReveal = useMemo(() => getSafeImageReveal(isSafariDesktop), [isSafariDesktop]);

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
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(234,213,197,0.45) 0%, transparent 70%)'}}></div>
             <div className="absolute inset-[-10%] rounded-full" style={{background: 'radial-gradient(circle, rgba(237,183,169,0.25) 0%, transparent 70%)'}}></div>
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
            <div className="relative w-[85%] ml-[11%] mr-auto md:w-[90%] md:ml-auto md:mr-0 mt-8 md:mt-0">
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
                className="absolute -bottom-6 -left-8 md:-bottom-8 md:-left-8 bg-[#FDFBF7] p-[clamp(1.2rem,2.5vw,2rem)] 2xl:p-[clamp(2rem,3vw,2.5rem)] max-w-[240px] md:max-w-[280px] 2xl:max-w-[320px] shadow-[-30px_40px_100px_rgba(237,183,169,0.15)] z-10 rounded-[2px]"
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
            <motion.div style={hardwareAccelerated} variants={imageReveal} className="flex-none w-[clamp(250px,27vw,360px)] 2xl:w-[clamp(280px,30vw,400px)] relative group cursor-pointer shadow-[0_10px_30px_rgba(28,26,24,0.06)] overflow-hidden rounded-[4px] hover:-translate-y-2 transition-transform duration-700 ease-in-out">
              <div className="w-full aspect-[4/5] relative">
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                  src="/about/swatches.png"
                  alt="Hair color swatches"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            <motion.div style={hardwareAccelerated} variants={imageReveal} className="flex-none w-[clamp(180px,22vw,270px)] 2xl:w-[clamp(200px,25vw,300px)] relative mt-16 group cursor-pointer shadow-[0_10px_30px_rgba(28,26,24,0.06)] overflow-hidden rounded-[4px] hover:-translate-y-2 transition-transform duration-700 ease-in-out">
              <div className="w-full aspect-square relative">
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                  src="/about/product_hands.png"
                  alt="Product application hands"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            <motion.div style={hardwareAccelerated} variants={imageReveal} className="flex-none w-[clamp(270px,31vw,450px)] 2xl:w-[clamp(300px,35vw,500px)] relative group cursor-pointer shadow-[0_10px_30px_rgba(28,26,24,0.06)] overflow-hidden rounded-[4px] hover:-translate-y-2 transition-transform duration-700 ease-in-out">
              <div className="w-full aspect-[4/3] relative">
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]"
                  src="/about/mirror.png"
                  alt="Mirror reflection"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a18]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
            <motion.div style={hardwareAccelerated} variants={imageReveal} className="flex-none w-[clamp(220px,25vw,310px)] 2xl:w-[clamp(250px,28vw,350px)] relative mt-8 group cursor-pointer shadow-[0_10px_30px_rgba(28,26,24,0.06)] overflow-hidden rounded-[4px] hover:-translate-y-2 transition-transform duration-700 ease-in-out">
              <div className="w-full aspect-[3/4] relative">
                <Image
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 contrast-[0.85] saturate-[0.85] brightness-[1.05]"
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
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(237,183,169,0.25) 0%, transparent 70%)'}}></div>
          </div>
          <div className="absolute bottom-0 right-[10%] w-[clamp(270px,45vw,720px)] 2xl:w-[clamp(300px,50vw,800px)] aspect-square z-0 pointer-events-none opacity-40 translate-y-1/2">
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(237,183,169,0.25) 0%, transparent 70%)'}}></div>
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
                className="inline-block bg-[#EDB7A9] text-white px-[clamp(1.8rem,3vw,2.7rem)] 2xl:px-[clamp(2rem,3.5vw,3rem)] py-[clamp(0.9rem,1.3vw,1.1rem)] 2xl:py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.6rem,0.9vw,0.7rem)] 2xl:text-[clamp(0.7rem,1vw,0.8rem)] font-bold shadow-[0_15px_40px_rgba(237,183,169,0.4)] hover:shadow-[0_20px_50px_rgba(237,183,169,0.6)] hover:-translate-y-1 hover:bg-[#e6a896] transition duration-1000 ease-out"
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

      <SiteFooter />
    </div>
  );
}
