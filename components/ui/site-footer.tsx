'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AwardBadge } from '@/components/ui/award-badge';
import { PrivacyPolicyModal } from '@/components/ui/privacy-policy-modal';

export function SiteFooter() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#FDFBF7] text-[#4C433C]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(5rem,10vw,8rem)] max-w-[1400px] mx-auto w-full">
          <div className="max-w-[320px]">
            <div className="text-[clamp(1.75rem,3vw,2.5rem)] font-serif mb-[clamp(1rem,2vw,1.5rem)] italic tracking-tight leading-none text-[#1c1a18]">Studio 24</div>
            <p className="text-[#6A5D55] font-sans text-[clamp(1rem,1.2vw,1.125rem)] tracking-wide leading-relaxed font-light">
              Bygget på håndværk, ærlighed og en tro på at du fortjener en frisør, der forstår dig.
            </p>
            <div className="relative z-10 mt-6">
              <AwardBadge type="industry-favorites" place={2026} link="https://www.industryfavorites.eu/" />
            </div>
          </div>
          <div className="flex flex-col z-10">
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#4C433C] mb-[clamp(1.5rem,3vw,2rem)] font-label">Udforsk</h5>
            <ul className="space-y-[clamp(0.75rem,1.5vw,1rem)]">
              {[
                { name: 'Hjem', href: '/' },
                { name: 'Min Historie', href: '/min-historie' },
                { name: 'Behandlinger', href: '/behandlinger' },
                { name: 'Galleri', href: '/galleri' }
              ].map(item => (
                <li key={item.name}><Link className="text-[#6A5D55] font-sans text-[clamp(1rem,1.2vw,1.125rem)] tracking-wide hover:text-[#EAD5C5] transition-colors duration-300 inline-block font-light" href={item.href}>{item.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#4C433C] mb-[clamp(1.5rem,3vw,2rem)] font-label">Kontakt</h5>
            <ul className="space-y-[clamp(0.75rem,1.5vw,1rem)] text-[#6A5D55] font-sans text-[clamp(1rem,1.2vw,1.125rem)] font-light tracking-wide">
              <li>Tirsdag - Fredag: 09:00 - 17:30<br/>Lørdag: 09:00 - 13:00<br/>Søn, Man &amp; Helligdage efter aftale</li>
              <li><a href="tel:+4529896069" className="hover:text-[#EAD5C5] transition-colors">+45 29 89 60 69</a></li>
              <li><a href="mailto:enistudio.24@gmail.com" className="hover:text-[#EAD5C5] transition-colors">enistudio.24@gmail.com</a></li>
              <li>Mariagervej 91<br/>8920 Randers NV</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#4C433C] mb-[clamp(1.5rem,3vw,2rem)] font-label">Følg med</h5>
            <div className="flex gap-[clamp(0.5rem,1.5vw,1rem)] items-center">
                <a className="flex items-center justify-center hover:scale-[1.12] active:scale-95 transition-transform duration-700 ease-in-out group" href="https://www.facebook.com/p/Studio24-61564054917618/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg className="w-[clamp(2.5rem,4vw,3rem)] h-[clamp(2.5rem,4vw,3rem)] text-[#EDB7A9] opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm relative top-[-3px]" viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </a>
                <a className="flex items-center justify-center hover:scale-[1.12] active:scale-95 transition-transform duration-700 ease-in-out group" href="https://www.instagram.com/__studio.24__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
