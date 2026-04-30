'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden transition-shadow duration-400 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#4C433C]/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 lg:px-7 lg:py-7 2xl:px-[clamp(1.5rem,3vw,2rem)] 2xl:py-[clamp(1.5rem,3vw,2rem)] flex items-center justify-between text-left focus:outline-none"
      >
        <h4 className="font-headline font-medium text-[clamp(1.05rem,1.35vw,1.15rem)] 2xl:text-[clamp(1.1rem,1.5vw,1.25rem)] text-[#4C433C] pr-8 lg:pr-10 leading-tight">{question}</h4>
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.2, 1] }}
          className="min-w-[22px] 2xl:min-w-[24px] text-[#8a6a57] flex justify-center items-center"
        >
          <Plus className="w-[18px] h-[18px] 2xl:w-5 2xl:h-5 stroke-[2.5]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.2, 1] }}
          >
            <div className="px-6 pb-6 lg:px-7 lg:pb-7 2xl:px-[clamp(1.5rem,3vw,2rem)] 2xl:pb-[clamp(1.5rem,3vw,2rem)] pt-0 font-body text-[#92857C] text-[clamp(0.88rem,1.1vw,0.98rem)] 2xl:text-[clamp(0.9rem,1.2vw,1rem)] leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQAccordion = () => {
  const faqs = [
    {
      question: "Skal jeg vide præcis hvad jeg vil have, inden jeg sætter mig i stolen?",
      answer: "Overhovedet ikke. Rigtig mange er i tvivl, og det er præcis derfor, jeg altid afsætter tid til en grundig snak først. Vi kigger på billeder og finder sammen frem til den løsning, der passer til dig og dit hår."
    },
    {
      question: "Jeg har hørt at extensions ødelægger ens eget hår – passer det?",
      answer: "Nej, det er en myte. Det er ikke skadeligt, så længe de sættes korrekt i, og du overholder din oprykning. Jeg har selv haft extensions i over 10 år, så jeg ved præcis, hvordan det føles, og hvordan det skal plejes."
    },
    {
      question: "Jeg har tidligere fået ødelagt mit hår. Hvad gør vi?",
      answer: "Det ser jeg desværre ret ofte. Inden vi gør noget som helst, kigger jeg grundigt på dit hårs tilstand. Hvis en behandling er en dårlig idé eller vil skade dit hår yderligere, pakker jeg det ikke ind – så siger jeg ærligt fra. Dit hårs sundhed kommer altid først."
    }
  ];

  return (
    <section id="faq" className="w-full bg-[#FDFBF7] pt-[clamp(2rem,6vw,5rem)] pb-[clamp(3rem,6vw,5rem)] 2xl:pb-[clamp(5rem,10vw,8rem)] px-[clamp(1.5rem,5vw,4rem)]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[730px] 2xl:max-w-[850px] mx-auto"
      >
        <div className="text-center mb-10 lg:mb-12 2xl:mb-[clamp(3rem,6vw,5rem)]">
          <h2 className="font-headline text-[clamp(1.9rem,2.7vw,2.3rem)] 2xl:text-[clamp(2rem,3.5vw,2.5rem)] text-[#4C433C] leading-[1.1] mb-5 2xl:mb-6">Ofte Stillede Spørgsmål</h2>
          <div className="w-[55px] 2xl:w-[60px] h-[3px] bg-[#a8826c] mx-auto"></div>
        </div>
        
        <div className="flex flex-col gap-4 2xl:gap-[clamp(1rem,2vw,1.5rem)]">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
