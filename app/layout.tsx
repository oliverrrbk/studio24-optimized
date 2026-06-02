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
  title: {
    template: '%s | Salon Deleuran Randers',
    default: 'Salon Deleuran | Eksklusiv Frisør i Randers',
  },
  description: 'Få ro, velvære og en skræddersyet behandling hos Salon Deleuran. Vi skaber smukke, holdbare resultater baseret på tillid og altid god tid til dit hår.',
  metadataBase: new URL('https://studio24randers.dk'), // Replace with actual domain
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="da" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-background text-on-surface font-body selection:bg-primary-fixed-dim selection:text-on-primary-fixed w-full relative antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": "Salon Deleuran",
              "image": "https://studio24randers.dk/logo.png",
              "description": "Eksklusiv og imødekommende frisørsalon i Randers, der tilbyder balayage, extensions og præcisionsklipning baseret på ærlig rådgivning.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Randers",
                "addressLocality": "Randers",
                "postalCode": "8900",
                "addressCountry": "DK"
              },
              "priceRange": "$$$"
            })
          }}
        />
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
