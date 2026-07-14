'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { hardwareAccelerated } from '@/lib/utils';

export const PrivacyPolicyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
 style={hardwareAccelerated}            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#4C433C]/30 z-[100]"
            onClick={onClose}
          />
          <motion.div
 style={hardwareAccelerated}            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100svh] w-full max-w-2xl bg-[#FDFBF7] shadow-2xl z-[101] overflow-y-auto overscroll-contain"
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
                  Hos Salon Deleuran tager vi beskyttelsen af dine personoplysninger alvorligt. For os er det vigtigt, at du føler dig tryg, når du besøger vores hjemmeside og kontakter os. Herunder kan du læse præcis, hvilke oplysninger vi indsamler, og hvordan vi behandler dem.
                </p>
                
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  1. Dataansvarlig
                </h3>
                <div className="bg-[#4C433C]/5 p-6 rounded-2xl text-[#4C433C]">
                  <p className="font-bold mb-1">Salon Deleuran</p>
                  <p>H. C. Ørsteds Vej 8</p>
                  <p>1879 Frederiksberg</p>
                  <p className="mt-2 text-sm uppercase tracking-wider text-[#6A5D55]">CVR-nr.: 44907917</p>
                  <div className="mt-4 space-y-1">
                    <p>Telefon: <a href="tel:+4522991918" className="hover:text-[#D3B39E] transition-colors">22 99 19 18</a></p>
                    <p>E-mail: <a href="mailto:kontakt@salondeleuran.dk" className="hover:text-[#D3B39E] transition-colors">kontakt@salondeleuran.dk</a></p>
                  </div>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  2. Hvilke oplysninger indsamler vi og hvorfor?
                </h3>
                <p>
                  Vi indsamler kun de oplysninger, der er strengt nødvendige for at kunne hjælpe dig.
                </p>

                <div className="border-l-4 border-[#D3B39E] pl-6 my-6">
                  <h4 className="font-bold text-[#4C433C] mb-2">Når du booker tid:</h4>
                  <p>
                    Vi benytter bookingplatformen <a href="https://planway.com" target="_blank" rel="noopener noreferrer" className="text-[#D3B39E] hover:underline">Planway</a> til tidsbestilling. Når du klikker på &quot;Book tid&quot;, videredirigeres du til deres platform. Planway fungerer som databehandler, og de oplysninger du indtaster dér, behandles sikkert i overensstemmelse med deres privatlivspolitik for at kunne levere ydelsen til dig.
                  </p>
                  <p className="mt-2 text-sm text-[#92857C]">Behandlingsgrundlag: GDPR art. 6, stk. 1, litra b.</p>
                </div>

                <div className="border-l-4 border-[#D3B39E] pl-6 my-6">
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
                  Du bestemmer selv, om vi må bruge cookies til statistik og markedsføring. Første gang du besøger siden, spørger vi dig — og du kan altid ændre eller trække dit samtykke tilbage via »Cookieindstillinger« nederst på siden.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong className="text-[#4C433C]">Nødvendige:</strong> Vi gemmer udelukkende dit cookie-valg, så vi kan huske det. Det kræver ikke samtykke.</li>
                  <li><strong className="text-[#4C433C]">Statistik:</strong> Vi bruger Vercel Analytics og Google Search Console til basale, anonymiserede trafikmålinger og fejlfinding. Vores fonte og scripts er hostet lokalt, så din IP-adresse ikke deles med disse tredjeparter.</li>
                  <li>Links til sociale medier (f.eks. Instagram) sporer dig ikke på vores side — men når du aktivt klikker dig videre, gælder den pågældende platforms privatlivsvilkår.</li>
                </ul>

                <div className="border-l-4 border-[#D3B39E] pl-6 my-6">
                  <h4 className="font-bold text-[#4C433C] mb-2">Markedsføring (Meta-pixel):</h4>
                  <p>
                    Hvis du giver samtykke, bruger vi Meta-pixlen (Facebook/Instagram). Den sætter cookies (bl.a. »_fbp«) og deler oplysninger med Meta Platforms Ireland Ltd. om din adfærd på siden — f.eks. hvilke sider du ser, og når du klikker videre til booking. Det bruger vi til at måle effekten af vores annoncer og vise dig mere relevante annoncer. Pixlen indlæses først, når du har accepteret, og fyrer slet ikke, hvis du siger nej.
                  </p>
                  <p className="mt-2 text-sm text-[#92857C]">Behandlingsgrundlag: dit samtykke (GDPR art. 6, stk. 1, litra a) samt cookiereglerne. Data kan overføres til Meta i USA på grundlag af EU-Kommissionens overførselsmekanismer (bl.a. EU-U.S. Data Privacy Framework og standardkontraktbestemmelser).</p>
                </div>

                <h3 className="text-xl font-bold uppercase tracking-wider text-[#4C433C] mt-12 mb-4 font-label">
                  4. Hvem deler vi dine oplysninger med?
                </h3>
                <p>
                  Vi sælger aldrig dine personoplysninger. Vi deler dem kun med de databehandlere, der er nødvendige for at levere vores ydelser — og, hvis du har givet samtykke til markedsføring, med Meta som beskrevet i afsnit 3.
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
                  Ønsker du at gøre brug af disse rettigheder, bedes du kontakte os på vores e-mailadresse ovenfor. Du har desuden altid den grundlæggende ret til at klage over vores behandling til <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-[#D3B39E] hover:underline">Datatilsynet</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
