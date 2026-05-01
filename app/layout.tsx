import type {Metadata} from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css'; // Global styles
import { LenisProvider } from '@/components/lenis-provider';
import { BookingModal } from '@/components/ui/booking-modal';
import { Navigation } from '@/components/ui/navigation';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-noto-serif', // Keep variable name so we don't have to change tailwind/css
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Studio 24 | The Art of Hair',
  description: 'The Modern Hair Boutique. Studio 24 was founded on the belief that hair is the ultimate medium for self-expression.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="da" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-on-surface font-body selection:bg-primary-fixed-dim selection:text-on-primary-fixed w-full relative antialiased">
        <LenisProvider>
          <div className="overflow-x-clip w-full flex flex-col min-h-screen relative">
            <Navigation />
            {children}
            <BookingModal />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
