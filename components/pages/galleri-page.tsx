'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { hardwareAccelerated } from '@/lib/utils';
import { Scissors, Leaf, Ruler, Droplet, Quote } from 'lucide-react';
import StickyScrollGallery from '@/components/ui/sticky-scroll';
import { SiteFooter } from '@/components/ui/site-footer';

// ----------------------------------------------------------------------
// High-Fidelity Hardware-Accelerated Framer Motion Variants for Lucide Icons
// ----------------------------------------------------------------------

const CuttingScissors = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full overflow-visible"
  >
    {/* Top blade & bottom loop */}
    <motion.g 
      variants={{
        initial: { rotate: 0 },
        hover: {
          rotate: [0, -12, 14, 0],
          transition: { 
            duration: 0.38, 
            times: [0, 0.3, 0.65, 1],
            ease: ["easeOut", "easeIn", "easeOut"] as any
          }
        }
      }}
      style={{ transformOrigin: '12px 12px' }}
    >
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12L12 12L22 22" />
    </motion.g>
    {/* Bottom blade & top loop */}
    <motion.g 
      variants={{
        initial: { rotate: 0 },
        hover: {
          rotate: [0, 12, -14, 0],
          transition: { 
            duration: 0.38, 
            times: [0, 0.3, 0.65, 1],
            ease: ["easeOut", "easeIn", "easeOut"] as any
          }
        }
      }}
      style={{ transformOrigin: '12px 12px' }}
    >
      <circle cx="6" cy="18" r="3" />
      <path d="M8.12 15.88L12 12L22 2" />
    </motion.g>
    {/* Central pivot screw */}
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
  </svg>
);

const leafVariants = {
  initial: { x: 0, y: 0, rotate: 0 },
  hover: {
    x: [0, 4, 6, 3, 0.5, 0],
    y: [0, -2, -3, -1, 0, 0],
    rotate: [0, 16, 22, 10, -3, 0],
    transition: { 
      duration: 1.25, 
      times: [0, 0.25, 0.5, 0.75, 0.9, 1],
      ease: [0.25, 1, 0.5, 1] as any
    }
  }
};

const rulerVariants = {
  initial: { y: 0, x: 0, rotate: 0 },
  hover: {
    y: [0, -5, -5, 0, -0.6, 0],
    x: [0, -1, -1, 0, 0, 0],
    rotate: [0, -8, -8, 0, 0, 0],
    transition: {
      duration: 1.15,
      times: [0, 0.35, 0.65, 0.82, 0.92, 1],
      ease: ["easeOut", "easeInOut", "easeIn", "easeOut", "easeIn", "easeOut"] as any
    }
  }
};

const dropletVariants = {
  initial: { scaleY: 1, scaleX: 1 },
  hover: {
    scaleY: [1, 0.82, 1.14, 0.96, 1],
    scaleX: [1, 1.14, 0.86, 1.02, 1],
    transition: { 
      duration: 0.75, 
      ease: [0.25, 1, 0.5, 1] as const
    }
  }
};

export default function GalleriPage() {

  return (
    <div className="bg-[#FDFBF7] text-[#4C433C] font-sans antialiased min-h-[100svh] flex flex-col selection:bg-[#D3B39E] selection:text-white">

      <main className="flex-1 pt-[clamp(6.8rem,10.2vw,10.2rem)] 2xl:pt-[clamp(8rem,12vw,12rem)] pb-0">
        
        {/* Intro Section */}
        <section className="mb-[clamp(5.1rem,8.5vw,6.8rem)] 2xl:mb-[clamp(6rem,10vw,8rem)] px-[clamp(1.275rem,4.25vw,3.4rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] max-w-3xl 2xl:max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 style={hardwareAccelerated} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-[clamp(2.975rem,5.1vw,4.675rem)] 2xl:text-[clamp(3.5rem,6vw,5.5rem)] text-[#4C433C] mb-[clamp(1.275rem,2.55vw,1.7rem)] 2xl:mb-[clamp(1.5rem,3vw,2rem)] tracking-tight font-light"
          >
            Mit håndværk
          </motion.h1>
          <motion.p style={hardwareAccelerated} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[clamp(0.935rem,1.19vw,1.147rem)] 2xl:text-[clamp(1.1rem,1.4vw,1.35rem)] text-[#6A5D55] leading-relaxed mb-[clamp(2.55rem,4.25vw,3.4rem)] 2xl:mb-[clamp(3rem,5vw,4rem)] font-light drop-shadow-sm"
          >
            Gå på opdagelse i nogle af de forvandlinger, jeg har skabt i salonen. Billederne her er din inspiration og et ærligt indblik i de færdige resultater – smukt, sundt og levende hår, der føles præcis lige så godt, som det ser ud.
          </motion.p>
          
          <motion.div style={hardwareAccelerated} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center flex-wrap gap-[clamp(1.7rem,3.4vw,3.4rem)] 2xl:gap-[clamp(2rem,4vw,4rem)] text-[#4C433C]/80 relative"
          >
            <motion.div 
              initial="initial"
              whileHover="hover"
              className="flex flex-col items-center gap-3 hover:text-[#D3B39E] transition-colors duration-300 relative z-10 cursor-default"
            >
              <div 
                className="w-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:h-[clamp(1.5rem,2vw,2rem)] flex items-center justify-center"
              >
                <CuttingScissors />
              </div>
              <span className="font-label text-[8.5px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold">Håndværk</span>
            </motion.div>

            <motion.div 
              initial="initial"
              whileHover="hover"
              className="flex flex-col items-center gap-3 hover:text-[#D3B39E] transition-colors duration-300 relative z-10 cursor-default"
            >
              <motion.div 
                variants={leafVariants}
                style={{ transformOrigin: 'bottom center' }}
                className="w-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:h-[clamp(1.5rem,2vw,2rem)] flex items-center justify-center"
              >
                <Leaf strokeWidth={1.5} className="w-full h-full" />
              </motion.div>
              <span className="font-label text-[8.5px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold">Naturlighed</span>
            </motion.div>

            <motion.div 
              initial="initial"
              whileHover="hover"
              className="flex flex-col items-center gap-3 hover:text-[#D3B39E] transition-colors duration-300 relative z-10 cursor-default"
            >
              <motion.div 
                variants={rulerVariants}
                style={{ transformOrigin: 'center' }}
                className="w-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:h-[clamp(1.5rem,2vw,2rem)] flex items-center justify-center"
              >
                <Ruler strokeWidth={1.5} className="w-full h-full" />
              </motion.div>
              <span className="font-label text-[8.5px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold">Præcision</span>
            </motion.div>

            <motion.div 
              initial="initial"
              whileHover="hover"
              className="flex flex-col items-center gap-3 hover:text-[#D3B39E] transition-colors duration-300 relative z-10 cursor-default"
            >
              <motion.div 
                variants={dropletVariants}
                style={{ transformOrigin: 'bottom center' }}
                className="w-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:h-[clamp(1.5rem,2vw,2rem)] flex items-center justify-center"
              >
                <Droplet strokeWidth={1.5} className="w-full h-full" />
              </motion.div>
              <span className="font-label text-[8.5px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold">Pleje</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Sticky Scroll Gallery */}
        <section className="mb-[clamp(0.85rem,1.7vw,1.7rem)] 2xl:mb-[clamp(1rem,2vw,2rem)] max-w-[1920px] mx-auto px-[clamp(1.275rem,4.25vw,3.4rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] relative z-10">

          {/* Background Gradient Blobs */}
          <div className="absolute top-[10%] left-[-5%] w-[clamp(255px,34vw,425px)] 2xl:w-[clamp(300px,40vw,500px)] aspect-square z-[-1] pointer-events-none opacity-30">
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(228,211,196,0.5) 0%, transparent 70%)'}}></div>
          </div>
          <div className="absolute bottom-[10%] right-[-5%] w-[clamp(255px,34vw,425px)] 2xl:w-[clamp(300px,40vw,500px)] aspect-square z-[-1] pointer-events-none opacity-30">
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(211,179,158,0.35) 0%, transparent 70%)'}}></div>
          </div>

          <StickyScrollGallery />
        </section>

        {/* Quote / CTA Section Merged */}
        <section className="relative w-full overflow-hidden pt-[clamp(3.4rem,6.8vw,6.8rem)] 2xl:pt-[clamp(4rem,8vw,8rem)] pb-[clamp(8.5rem,12.75vw,13.6rem)] 2xl:pb-[clamp(10rem,15vw,16rem)] bg-white">
          {/* Top Seamless Transition from #FDFBF7 to white */}
          <div className="absolute top-0 left-0 w-full h-[clamp(130px,27vw,270px)] 2xl:h-[clamp(150px,30vw,300px)] bg-gradient-to-b from-[#FDFBF7] to-transparent pointer-events-none z-10"></div>

          {/* Subtle pulsating background gradient fading up from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#D7C0B0]/10 via-[#D7C0B0]/[0.02] to-transparent pointer-events-none z-0"></div>

          {/* Amorphous Pulsating blobs */}
          <div className="absolute bottom-0 left-[10%] w-[clamp(270px,45vw,720px)] 2xl:w-[clamp(300px,50vw,800px)] aspect-square z-0 pointer-events-none opacity-40 translate-y-1/2">
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(215,192,175,0.25) 0%, transparent 70%)'}}></div>
          </div>
          <div className="absolute bottom-0 right-[10%] w-[clamp(270px,45vw,720px)] 2xl:w-[clamp(300px,50vw,800px)] aspect-square z-0 pointer-events-none opacity-40 translate-y-1/2">
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(215,192,175,0.25) 0%, transparent 70%)'}}></div>
          </div>

          <motion.div style={hardwareAccelerated} 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl 2xl:max-w-5xl mx-auto text-center px-[clamp(1.275rem,4.25vw,3.4rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] relative z-10 flex flex-col items-center"
          >
            <div className="relative mb-[clamp(0.85rem,1.7vw,1.275rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)] w-full max-w-3xl 2xl:max-w-4xl flex flex-col items-center">
              {/* Massive background quote icon, slightly left-aligned */}
              <Quote className="text-[#4C433C]/[0.03] w-[clamp(4.25rem,7.65vw,6.8rem)] md:w-[clamp(2rem,3vw,3rem)] 2xl:w-[clamp(5rem,9vw,8rem)] h-[clamp(4.25rem,7.65vw,6.8rem)] md:h-[clamp(2rem,3vw,3rem)] 2xl:h-[clamp(5rem,9vw,8rem)] absolute top-1/2 left-[12%] md:left-[15%] -translate-y-[110%] md:-translate-y-[150%] 2xl:-translate-y-[110%] -z-10 -rotate-3" />
              
              <blockquote className="font-headline text-[clamp(1.53rem,2.55vw,2.72rem)] 2xl:text-[clamp(1.8rem,3vw,3.2rem)] text-[#4C433C] leading-[1.15] relative z-10 italic font-light w-full">
                &quot;Jeg går meget op i, at lave et smukt resultat, som er lavet ud fra et ordentligt fundament, så det også er nemt at holde pænt i hverdagen.&quot;
              </blockquote>
            </div>

            {/* Author aligned right under quote */}
            <div className="w-full max-w-3xl 2xl:max-w-4xl flex justify-end pr-[0%] md:pr-[5%] mb-[clamp(2.125rem,3.4vw,2.975rem)] 2xl:mb-[clamp(2.5rem,4vw,3.5rem)]">
              <cite className="font-label text-[#92857C] tracking-[0.4em] uppercase text-[clamp(0.595rem,0.85vw,0.637rem)] 2xl:text-[clamp(0.7rem,1vw,0.75rem)] not-italic border-t border-[#4C433C]/10 pt-[clamp(0.85rem,1.7vw,1.275rem)] 2xl:pt-[clamp(1rem,2vw,1.5rem)] inline-block font-bold">
                Emilie, grundlægger
              </cite>
            </div>

            {/* CTA Button */}
            <Link href="?booking=true" scroll={false} className="inline-block bg-[#D3B39E] text-white px-[clamp(2.125rem,3.4vw,2.975rem)] 2xl:px-[clamp(2.5rem,4vw,3.5rem)] py-[clamp(0.85rem,1.275vw,1.062rem)] 2xl:py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.595rem,0.85vw,0.68rem)] 2xl:text-[clamp(0.7rem,1vw,0.8rem)] font-bold shadow-[0_15px_40px_rgba(211,179,158,0.4)] hover:shadow-[0_20px_50px_rgba(211,179,158,0.6)] hover:-translate-y-1 hover:bg-[#C9A189] transition duration-1000 ease-out relative z-20">
              Book din tid nu
            </Link>
          </motion.div>
          
          {/* Bottom Curve for Footer (Downwards slope) */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-30 pointer-events-none">
            <svg className="relative block w-full h-[clamp(42.5px,6.8vw,102px)] 2xl:h-[clamp(50px,8vw,120px)]" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
              <path className="text-[#FDFBF7]" d="M0,100 L0,0 C480,80 960,80 1440,0 L1440,100 Z" />
            </svg>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
