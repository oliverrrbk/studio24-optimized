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
