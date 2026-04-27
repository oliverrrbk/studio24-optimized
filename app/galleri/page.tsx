'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Leaf, Ruler, Droplet, Quote } from 'lucide-react';
import StickyScrollGallery from '@/components/ui/sticky-scroll';

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


export default function GalleriPage() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="bg-[#FDFBF7] text-[#4C433C] font-sans antialiased min-h-screen flex flex-col selection:bg-[#EDB7A9] selection:text-white">


      <main className="flex-1 pt-[clamp(6.8rem,10.2vw,10.2rem)] 2xl:pt-[clamp(8rem,12vw,12rem)] pb-0">
        
        {/* Intro Section */}
        <section className="mb-[clamp(5.1rem,8.5vw,6.8rem)] 2xl:mb-[clamp(6rem,10vw,8rem)] px-[clamp(1.275rem,4.25vw,3.4rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] max-w-3xl 2xl:max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline text-[clamp(2.975rem,5.1vw,4.675rem)] 2xl:text-[clamp(3.5rem,6vw,5.5rem)] text-[#4C433C] mb-[clamp(1.275rem,2.55vw,1.7rem)] 2xl:mb-[clamp(1.5rem,3vw,2rem)] tracking-tight font-light"
          >
            Mit Håndværk
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[clamp(0.935rem,1.19vw,1.147rem)] 2xl:text-[clamp(1.1rem,1.4vw,1.35rem)] text-[#6A5D55] leading-relaxed mb-[clamp(2.55rem,4.25vw,3.4rem)] 2xl:mb-[clamp(3rem,5vw,4rem)] font-light drop-shadow-sm"
          >
            Gå på opdagelse i nogle af de forvandlinger, jeg har skabt i salonen. Billederne her er din inspiration og et ærligt indblik i de færdige resultater – smukt, sundt og levende hår, der føles præcis lige så godt, som det ser ud.
          </motion.p>
          
          <motion.div 
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
             <div className="absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[#EAD5C5]/40 blur-[68px] 2xl:blur-[80px] animate-[spin_20s_linear_infinite]"></div>
          </div>
          <div className="absolute bottom-[10%] right-[-5%] w-[clamp(255px,34vw,425px)] 2xl:w-[clamp(300px,40vw,500px)] aspect-square z-[-1] pointer-events-none opacity-30">
             <div className="absolute inset-0 rounded-[60%_40%_30%_70%/50%_40%_50%_60%] bg-[#EDB7A9]/30 blur-[85px] 2xl:blur-[100px] animate-[spin_25s_linear_infinite_reverse]"></div>
          </div>

          <StickyScrollGallery />
        </section>

        {/* Quote / CTA Section Merged */}
        <section className="relative w-full overflow-hidden pt-[clamp(3.4rem,6.8vw,6.8rem)] 2xl:pt-[clamp(4rem,8vw,8rem)] pb-[clamp(8.5rem,12.75vw,13.6rem)] 2xl:pb-[clamp(10rem,15vw,16rem)] bg-gradient-to-t from-[#EDB7A9]/10 to-transparent">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl 2xl:max-w-5xl mx-auto text-center px-[clamp(1.275rem,4.25vw,3.4rem)] 2xl:px-[clamp(1.5rem,5vw,4rem)] relative z-10 flex flex-col items-center"
          >
            <div className="relative mb-[clamp(0.85rem,1.7vw,1.275rem)] 2xl:mb-[clamp(1rem,2vw,1.5rem)] w-full max-w-3xl 2xl:max-w-4xl flex flex-col items-center">
              {/* Massive background quote icon, slightly left-aligned */}
              <Quote className="text-[#4C433C]/[0.03] w-[clamp(4.25rem,7.65vw,6.8rem)] 2xl:w-[clamp(5rem,9vw,8rem)] h-[clamp(4.25rem,7.65vw,6.8rem)] 2xl:h-[clamp(5rem,9vw,8rem)] absolute top-1/2 left-[12%] md:left-[15%] -translate-y-[60%] -z-10 -rotate-3" />
              
              <blockquote className="font-headline text-[clamp(1.53rem,2.55vw,2.72rem)] 2xl:text-[clamp(1.8rem,3vw,3.2rem)] text-[#4C433C] leading-[1.15] relative z-10 italic font-light w-full">
                &quot;Jeg går aldrig på kompromis. Hverken med kvaliteten, produkterne eller den tid, dit hår kræver.&quot;
              </blockquote>
            </div>

            {/* Author aligned right under quote */}
            <div className="w-full max-w-3xl 2xl:max-w-4xl flex justify-end pr-[0%] md:pr-[5%] mb-[clamp(2.125rem,3.4vw,2.975rem)] 2xl:mb-[clamp(2.5rem,4vw,3.5rem)]">
              <cite className="font-label text-[#92857C] tracking-[0.4em] uppercase text-[clamp(0.595rem,0.85vw,0.637rem)] 2xl:text-[clamp(0.7rem,1vw,0.75rem)] not-italic border-t border-[#4C433C]/10 pt-[clamp(0.85rem,1.7vw,1.275rem)] 2xl:pt-[clamp(1rem,2vw,1.5rem)] inline-block font-bold">
                Emilie, Grundlægger
              </cite>
            </div>

            {/* CTA Button */}
            <Link href="?booking=true" scroll={false} className="inline-block bg-[#EDB7A9] text-white px-[clamp(2.125rem,3.4vw,2.975rem)] 2xl:px-[clamp(2.5rem,4vw,3.5rem)] py-[clamp(0.85rem,1.275vw,1.062rem)] 2xl:py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.595rem,0.85vw,0.68rem)] 2xl:text-[clamp(0.7rem,1vw,0.8rem)] font-bold shadow-[0_15px_40px_rgba(237,183,169,0.4)] hover:shadow-[0_20px_50px_rgba(237,183,169,0.6)] hover:-translate-y-1 hover:bg-[#e6a896] transition-all duration-400 relative z-20">
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
