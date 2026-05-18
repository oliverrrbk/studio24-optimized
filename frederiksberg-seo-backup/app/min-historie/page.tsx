import { Metadata } from 'next';
import MinHistorieClient from "@/components/pages/min-historie-page";

export const metadata: Metadata = {
  title: 'Min Historie & Filosofi',
  description: 'Mød Emilie fra Studio 24. Med en 4,5-årig frisøruddannelse og 10 års erfaring er passionen at skabe stolt håndværk uden samlebåndsmentalitet.',
};

export default function Page() {
  return <MinHistorieClient />;
}
