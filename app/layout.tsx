import type {Metadata} from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css'; // Global styles
import { LenisProvider } from '@/components/lenis-provider';
import { BookingModal } from '@/components/ui/booking-modal';
import { Navigation } from '@/components/ui/navigation';
import { CookieConsent } from '@/components/ui/cookie-consent';
import { MetaPixel } from '@/components/analytics/meta-pixel';

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
    template: '%s | Salon Deleuran Valby',
    default: 'Salon Deleuran | Eksklusiv Frisør i Valby',
  },
  description: 'Få ro, velvære og en skræddersyet behandling hos Salon Deleuran. Vi skaber smukke, holdbare resultater baseret på tillid og altid god tid til dit hår.',
  metadataBase: new URL('https://www.salondeleuran.dk'), // Replace with actual domain
  verification: {
    other: {
      'facebook-domain-verification': 'hqtgs6ptd2u00vfc4yk28qd6k4ah9d',
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="da" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NZKL938S');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body suppressHydrationWarning className="bg-background text-on-surface font-body selection:bg-primary-fixed-dim selection:text-on-primary-fixed w-full relative antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NZKL938S"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": "Salon Deleuran",
              "image": "https://www.salondeleuran.dk/logo.png",
              "description": "Eksklusiv og imødekommende frisørsalon i Valby, der tilbyder balayage, extensions og præcisionsklipning baseret på ærlig rådgivning.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Trekronergade 124A",
                "addressLocality": "Valby",
                "postalCode": "2500",
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
        <CookieConsent />
        <MetaPixel />
      </body>
    </html>
  );
}
