'use client';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

// Safari Optimization Config



function useBidirectionalSticky(offsetTop = 80, offsetBottom = 32) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef<'top' | 'bottom'>('top');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.position = 'sticky';
    el.style.top = `${offsetTop}px`;
    // GPU layer promotion for Safari — avoids layout thrashing
    el.style.willChange = 'transform';
    el.style.backfaceVisibility = 'hidden';
    (el.style as any).WebkitBackfaceVisibility = 'hidden';

    lastScrollY.current = window.scrollY;
    let rafId: number | null = null;

    const handleScroll = () => {
      // Batch layout reads/writes into a single animation frame
      // to prevent forced synchronous reflow in Safari
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        const scrollDiff = scrollY - lastScrollY.current;
        lastScrollY.current = scrollY;

        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isMobile = window.innerWidth < 768;
        const dynamicOffsetTop = isMobile ? 55 : offsetTop;
        const dynamicOffsetBottom = isMobile ? 0 : offsetBottom;

        const targetTop = viewportHeight - rect.height - dynamicOffsetBottom;

        // If the column is shorter than the viewport, act like a smooth bidirectional sticky
        if (rect.height <= viewportHeight - dynamicOffsetTop - dynamicOffsetBottom) {
          let currentTop = parseFloat(el.dataset.currentTop || String(dynamicOffsetTop));
          currentTop -= scrollDiff;
          // Clamp between top boundary and bottom boundary
          currentTop = Math.max(dynamicOffsetTop, Math.min(currentTop, targetTop));
          el.dataset.currentTop = String(currentTop);
          el.style.top = `${currentTop}px`;
          return;
        }

        if (state.current === 'top') {
          el.style.top = `${dynamicOffsetTop}px`;
          
          // Only switch anchor when the row has been completely "delivered" to the bottom
          if (rect.bottom <= viewportHeight - dynamicOffsetBottom) {
            state.current = 'bottom';
            el.style.top = `${targetTop}px`;
          }
        } else {
          el.style.top = `${targetTop}px`;
          
          // Only switch anchor when the row has been completely "delivered" to the top
          if (rect.top >= dynamicOffsetTop) {
            state.current = 'top';
            el.style.top = `${dynamicOffsetTop}px`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [offsetTop, offsetBottom]);

  return { ref };
}

const images = {
  img1: { src: '/gallerypics/3.png', pos: '50% 50%', scale: 1 },
  img2: { src: '/gallerypics/15.png', pos: '50% 50%', scale: 1 },
  img3: { src: '/gallerypics/6.png', pos: '50% 50%', scale: 1 },
  img4: { src: '/gallerypics/9.png', pos: '50% 50%', scale: 1 },
  img5: { src: '/gallerypics/1.png', pos: '50% 50%', scale: 1 },
  img6: { src: '/gallerypics/12.png', pos: '50% 50%', scale: 1 },
  img7: { src: '/gallerypics/17.png', pos: '50% 50%', scale: 1 },
  img8: { src: '/gallerypics/10.png', pos: '50% 50%', scale: 1 },
  img9: { src: '/gallerypics/4.png', pos: '50% 50%', scale: 1 },
  img10: { src: '/gallerypics/14.png', pos: '50% 50%', scale: 1 },
  img11: { src: '/gallerypics/8.png', pos: '50% 50%', scale: 1 },
  img12: { src: '/gallerypics/2.png', pos: '50% 50%', scale: 1 },
  img13: { src: '/gallerypics/13.png', pos: '50% 50%', scale: 1 },
  img14: { src: '/gallerypics/5.png', pos: '50% 50%', scale: 1 },
  img15: { src: '/gallerypics/7.png', pos: '50% 50%', scale: 1 },
  img16: { src: '/gallerypics/11.png', pos: '50% 50%', scale: 1 },
  img17: { src: '/gallerypics/16.png', pos: '50% 50%', scale: 1 },
};

const StickyScrollGallery = forwardRef<HTMLElement>((props, ref) => {
  const { ref: stickyRef } = useBidirectionalSticky(80, 4);

  return (
    <section className='w-full max-w-3xl md:max-w-[460px] lg:max-w-[550px] xl:max-w-[600px] 2xl:max-w-4xl mx-auto' ref={ref}>
      <div className='grid grid-cols-3 gap-2 md:gap-4 items-start relative'>
        {/* Left Column */}
        <div className='grid gap-2 md:gap-4 col-span-1'>
          {[images.img4, images.img5, images.img6, images.img7, images.img8, images.img9, images.img10].map((img, idx) => (
            <motion.figure 
              key={`left-${idx}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: idx * 0.15, ease: 'easeOut' }}
              className={`w-full rounded-[20px] shadow-[0_20px_50px_rgba(28,26,24,0.06)] overflow-hidden group ${idx === 6 ? 'hidden md:block' : ''}`}
            >
              <div className='relative w-full aspect-[4/5] h-full transition-transform duration-300 group-hover:scale-[1.02]'>
                <Image
                  src={img.src}
                  alt='Salon Gallery Image'
                  fill
                  sizes="(max-width: 768px) 33vw, 25vw"
                  style={{ objectPosition: img.pos, transformOrigin: img.pos, transform: `scale(${img.scale})` }}
                  className='align-bottom object-cover'
                />
              </div>
            </motion.figure>
          ))}
        </div>
        
        {/* Middle Column */}
        <div 
          ref={stickyRef}
          className='flex flex-col w-full col-span-1 gap-2 md:gap-4 sticky z-10'
        >
          {[images.img1, images.img2, images.img3, images.img10].map((img, idx) => (
            <motion.figure 
              key={`mid-${idx}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: idx * 0.15, ease: 'easeOut' }}
              className={`w-full rounded-[20px] shadow-[0_20px_50px_rgba(28,26,24,0.06)] overflow-hidden group ${idx === 3 ? 'hidden max-md:block' : ''}`}
            >
              <div className='relative w-full aspect-[2/3] h-full transition-transform duration-300 group-hover:scale-[1.02]'>
                <Image
                  src={img.src}
                  alt='Salon Gallery Focus Image'
                  fill
                  sizes="(max-width: 768px) 33vw, 25vw"
                  style={{ objectPosition: img.pos, transformOrigin: img.pos, transform: `scale(${img.scale})` }}
                  className='align-bottom object-cover'
                />
              </div>
            </motion.figure>
          ))}
        </div>

        {/* Right Column */}
        <div className='grid gap-2 md:gap-4 col-span-1'>
          {[images.img11, images.img12, images.img13, images.img14, images.img15, images.img16, images.img17].map((img, idx) => (
            <motion.figure 
              key={`right-${idx}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: idx * 0.15, ease: 'easeOut' }}
              className={`w-full rounded-[20px] shadow-[0_20px_50px_rgba(28,26,24,0.06)] overflow-hidden group ${idx === 3 ? 'hidden md:block' : ''}`}
            >
              <div className='relative w-full aspect-[4/5] h-full transition-transform duration-300 group-hover:scale-[1.02]'>
                <Image
                  src={img.src}
                  alt='Salon Gallery Image'
                  fill
                  sizes="(max-width: 768px) 33vw, 25vw"
                  style={{ objectPosition: img.pos, transformOrigin: img.pos, transform: `scale(${img.scale})` }}
                  className='align-bottom object-cover'
                />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
});

StickyScrollGallery.displayName = 'StickyScrollGallery';

export default StickyScrollGallery;
