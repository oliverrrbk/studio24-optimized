'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { hardwareAccelerated } from '@/lib/utils';
import { Scissors, Leaf, Ruler, Droplet, Quote } from 'lucide-react';
import StickyScrollGallery from '@/components/ui/sticky-scroll';
import { SiteFooter } from '@/components/ui/site-footer';


export default function GalleriPage() {


  return (
    <div className="bg-[#FDFBF7] text-[#4C433C] font-sans antialiased min-h-[100svh] flex flex-col selection:bg-[#EDB7A9] selection:text-white">


      <main className="flex-1 pt-[clamp(6.8rem,10.2vw,10.2rem)] 2xl:pt-[clamp(8rem,12vw,12rem)] pb-0">
        
        {/* Intro Section */}
        <section className="mb-[clamp(5.1rem,8.5vw,6.8rem)] 2xl:mb-[clamp(6rem,10vw,8rem)] px-[clamp(1.275rem,4.25vw,3.4rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] max-w-3xl 2xl:max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 style={hardwareAccelerated} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-[clamp(2.975rem,5.1vw,4.675rem)] 2xl:text-[clamp(3.5rem,6vw,5.5rem)] text-[#4C433C] mb-[clamp(1.275rem,2.55vw,1.7rem)] 2xl:mb-[clamp(1.5rem,3vw,2rem)] tracking-tight font-light"
          >
            Mit Håndværk
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
            <div className="flex flex-col items-center gap-3 hover:text-[#EDB7A9] transition-colors duration-300 relative z-10">
              <Scissors strokeWidth={1.5} className="w-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:h-[clamp(1.5rem,2vw,2rem)]" />
              <span className="font-label text-[8.5px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold">Håndlavet</span>
            </div>
            <div className="flex flex-col items-center gap-3 hover:text-[#EDB7A9] transition-colors duration-300 relative z-10">
              <Leaf strokeWidth={1.5} className="w-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:h-[clamp(1.5rem,2vw,2rem)]" />
              <span className="font-label text-[8.5px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold">Organisk</span>
            </div>
            <div className="flex flex-col items-center gap-3 hover:text-[#EDB7A9] transition-colors duration-300 relative z-10">
              <Ruler strokeWidth={1.5} className="w-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:h-[clamp(1.5rem,2vw,2rem)]" />
              <span className="font-label text-[8.5px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold">Præcision</span>
            </div>
            <div className="flex flex-col items-center gap-3 hover:text-[#EDB7A9] transition-colors duration-300 relative z-10">
              <Droplet strokeWidth={1.5} className="w-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:w-[clamp(1.5rem,2vw,2rem)] h-[clamp(1.275rem,1.7vw,1.7rem)] 2xl:h-[clamp(1.5rem,2vw,2rem)]" />
              <span className="font-label text-[8.5px] 2xl:text-[10px] tracking-[0.2em] uppercase font-bold">Essens</span>
            </div>
          </motion.div>
        </section>

        {/* Sticky Scroll Gallery */}
        <section className="mb-[clamp(0.85rem,1.7vw,1.7rem)] 2xl:mb-[clamp(1rem,2vw,2rem)] max-w-[1920px] mx-auto px-[clamp(1.275rem,4.25vw,3.4rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] relative z-10">

          {/* Background Gradient Blobs */}
          <div className="absolute top-[10%] left-[-5%] w-[clamp(255px,34vw,425px)] 2xl:w-[clamp(300px,40vw,500px)] aspect-square z-[-1] pointer-events-none opacity-30">
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(234,213,197,0.5) 0%, transparent 70%)'}}></div>
          </div>
          <div className="absolute bottom-[10%] right-[-5%] w-[clamp(255px,34vw,425px)] 2xl:w-[clamp(300px,40vw,500px)] aspect-square z-[-1] pointer-events-none opacity-30">
             <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(237,183,169,0.35) 0%, transparent 70%)'}}></div>
          </div>

          <StickyScrollGallery />
        </section>

        {/* Quote / CTA Section Merged */}
        <section className="relative w-full overflow-hidden pt-[clamp(3.4rem,6.8vw,6.8rem)] 2xl:pt-[clamp(4rem,8vw,8rem)] pb-[clamp(8.5rem,12.75vw,13.6rem)] 2xl:pb-[clamp(10rem,15vw,16rem)] bg-gradient-to-t from-[#EDB7A9]/10 to-transparent">
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
                Emilie, Grundlægger
              </cite>
            </div>

            {/* CTA Button */}
            <Link href="?booking=true" scroll={false} className="inline-block bg-[#EDB7A9] text-white px-[clamp(2.125rem,3.4vw,2.975rem)] 2xl:px-[clamp(2.5rem,4vw,3.5rem)] py-[clamp(0.85rem,1.275vw,1.062rem)] 2xl:py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.595rem,0.85vw,0.68rem)] 2xl:text-[clamp(0.7rem,1vw,0.8rem)] font-bold shadow-[0_15px_40px_rgba(237,183,169,0.4)] hover:shadow-[0_20px_50px_rgba(237,183,169,0.6)] hover:-translate-y-1 hover:bg-[#e6a896] transition duration-1000 ease-out relative z-20">
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
