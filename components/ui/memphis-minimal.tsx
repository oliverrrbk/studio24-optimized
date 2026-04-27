import React from 'react';

interface MinimalistElementProps {
  className?: string;
}

export const MinimalArch = ({ className }: MinimalistElementProps) => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M20 120 V 50 A 30 30 0 0 1 80 50 V 120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 120 H 85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M45 85 H 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const FineStars = ({ className }: MinimalistElementProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Large Star */}
    <path d="M50 10 C 50 45, 55 50, 90 50 C 55 50, 50 55, 50 90 C 50 55, 45 50, 10 50 C 45 50, 50 45, 50 10 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Medium Star */}
    <path d="M80 15 C 80 25, 82 28, 95 28 C 82 28, 80 31, 80 40 C 80 31, 78 28, 65 28 C 78 28, 80 25, 80 15 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    {/* Small Star */}
    <path d="M25 70 C 25 78, 27 80, 35 80 C 27 80, 25 82, 25 90 C 25 82, 23 80, 15 80 C 23 80, 25 78, 25 70 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    {/* Cross star */}
    <path d="M85 75 L85 85 M80 80 L90 80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const DashedWave = ({ className }: MinimalistElementProps) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M10 30 C 50 -10, 80 70, 130 30 C 160 10, 180 40, 190 30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" strokeLinecap="round" />
    <path d="M15 45 C 55 5, 85 85, 135 45 C 165 25, 185 55, 195 45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" strokeLinecap="round" />
  </svg>
);

export const IntersectingCurves = ({ className }: MinimalistElementProps) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <ellipse cx="45" cy="50" rx="40" ry="20" transform="rotate(-30 45 50)" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="55" cy="50" rx="40" ry="20" transform="rotate(40 55 50)" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
