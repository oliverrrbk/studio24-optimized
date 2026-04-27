'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
          isScrolled || isMobileMenuOpen
            ? 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#4C433C]/10 shadow-[0_4px_20px_rgba(28,26,24,0.03)]' 
            : 'bg-transparent border-b border-[#4C433C]/10 shadow-none'
        }`}
      >
        {/* Desktop Navigation */}
        <div className={`hidden md:flex justify-between items-center max-w-[1920px] mx-auto px-[clamp(1.5rem,4vw,3rem)] text-[#4C433C] transition-all duration-700 ${
          isScrolled ? 'py-[clamp(0.8rem,1.2vw,1rem)]' : 'py-[clamp(1.2rem,2vw,1.5rem)]'
        }`}>
          <div className="flex items-center gap-8 font-sans font-light text-[clamp(0.875rem,1vw,1rem)] tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.name} className="hover:opacity-70 transition-opacity pb-[2px]" href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
          <Link className="absolute left-1/2 -translate-x-1/2 text-[clamp(2.5rem,4vw,3rem)] font-serif text-[#1c1a18] tracking-wide hover:opacity-80 transition-opacity" href="/">
            Studio 24
          </Link>
          <div className="flex items-center gap-8 font-sans font-light text-[clamp(0.875rem,1vw,1rem)] tracking-wide">
            <Link href="?booking=true" scroll={false}>
              <button className="bg-[#EDB7A9] text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-lg font-label text-xs md:text-sm uppercase tracking-[0.1em] font-bold hover:scale-105 active:scale-95 hover:bg-[#e6a896] border-[#4C433C]/20 transition-all duration-300 shadow-[0_8px_30px_rgba(237,183,169,0.4)]">
                Book tid
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`flex md:hidden justify-between items-center w-full px-4 transition-all duration-700 ${
          isScrolled || isMobileMenuOpen ? 'py-3' : 'py-4'
        }`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-[#4C433C] hover:opacity-70 transition-opacity z-50 relative"
              aria-label="Toggle menu"
            >
              <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
                {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
              </motion.div>
            </button>
            <Link className="text-[1.75rem] font-serif text-[#1c1a18] tracking-wide hover:opacity-80 transition-opacity leading-none relative top-[1px]" href="/">
              Studio 24
            </Link>
          </div>
          <Link href="?booking=true" scroll={false}>
            <button className="bg-[#EDB7A9] text-white px-4 py-2.5 rounded-lg font-label text-[10px] uppercase tracking-[0.1em] font-bold active:scale-95 transition-transform shadow-md">
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
              className="absolute top-[100%] left-0 w-full bg-[#FDFBF7]/95 backdrop-blur-xl border-b border-[#4C433C]/10 shadow-2xl z-40 md:hidden flex flex-col overflow-hidden"
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
                      className="block py-4 font-light tracking-wide border-b border-[#4C433C]/5 hover:text-[#EDB7A9] hover:tracking-[0.05em] transition-all"
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
