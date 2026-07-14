'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';


export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Hjem', href: '/' },
    { name: 'Min Historie', href: '/min-historie' },
    { name: 'Behandlinger', href: '/behandlinger' },
    { name: 'Galleri', href: '/galleri' },
  ];

  return (
    <>
      <nav
        id="main-nav"
        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        className={`fixed top-0 w-full z-50 transition-colors duration-700 ease-out ${
          isScrolled || isMobileMenuOpen
            ? 'bg-[#FDFBF7] border-b border-[#4C433C]/10 shadow-[0_4px_20px_rgba(28,26,24,0.03)]' 
            : 'bg-transparent border-b border-[#4C433C]/10 shadow-none'
        }`}
      >
        {/* Desktop Navigation */}
        <div className={`hidden md:flex justify-between items-center max-w-[1920px] mx-auto px-[clamp(1.5rem,4vw,3rem)] text-[#4C433C] transition-[padding] duration-700 ${
          isScrolled ? 'py-[clamp(0.8rem,1.2vw,1rem)]' : 'py-[clamp(1.2rem,2vw,1.5rem)]'
        }`}>
          <div className="flex-1 flex items-center justify-start gap-8 font-sans font-light text-[clamp(0.875rem,1vw,1rem)] tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.name} className="hover:opacity-70 transition-opacity pb-[2px]" href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
          <Link className="flex-shrink-0 hover:opacity-80 transition-opacity flex items-center justify-center" href="/">
            <Image src="/images/logo_deleuran_transparent.png" alt="Salon Deleuran Logo" width={424} height={62} className="w-[clamp(150px,16vw,200px)] h-auto" priority />
          </Link>
          <div className="flex-1 flex items-center justify-end gap-8 font-sans font-light text-[clamp(0.875rem,1vw,1rem)] tracking-wide">
            <Link href="?booking=true" scroll={false}>
              <button className="cursor-pointer bg-[#D3B39E] text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-full font-label text-xs md:text-sm uppercase tracking-[0.1em] font-bold hover:scale-105 active:scale-95 hover:bg-[#C9A189] border-[#4C433C]/20 transition duration-1000 ease-out shadow-[0_8px_30px_rgba(211,179,158,0.4)]">
                Book tid
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`flex md:hidden justify-between items-center w-full px-4 transition-[padding] duration-700 ${
          isScrolled || isMobileMenuOpen ? 'py-3' : 'py-4'
        }`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-[#4C433C] hover:opacity-70 transition-opacity z-50 relative"
              aria-label="Toggle menu"
            >
              <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
                {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
              </motion.div>
            </button>
            <Link className="hover:opacity-80 transition-opacity relative flex items-center justify-center" href="/">
              <Image src="/images/logo_deleuran_transparent.png" alt="Salon Deleuran Logo" width={424} height={62} className="w-[130px] h-auto" priority />
            </Link>
          </div>
          <Link href="?booking=true" scroll={false}>
            <button className="cursor-pointer bg-[#D3B39E] text-white px-4 py-2.5 rounded-full font-label text-[10px] uppercase tracking-[0.1em] font-bold active:scale-95 transition-transform shadow-md">
              Book tid
            </button>
          </Link>
        </div>
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-[100%] left-0 w-full bg-[#FDFBF7] border-b border-[#4C433C]/10 shadow-2xl z-40 md:hidden flex flex-col overflow-hidden"
            >
              <div className="flex flex-col pt-4 pb-8 px-6 gap-2 font-sans text-lg text-[#4C433C]">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 font-light tracking-wide border-b border-[#4C433C]/5 hover:text-[#D3B39E] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
