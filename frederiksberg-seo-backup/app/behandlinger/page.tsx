import { Metadata } from 'next';
import BehandlingerClient from "@/components/pages/behandlinger-page";

export const metadata: Metadata = {
  title: 'Balayage, Extensions & Klipning',
  description: 'Vi tilbyder skræddersyet farvedesign, eksklusive extensions og præcisionsklipning. Altid med fokus på skånsomme behandlinger og ærlig rådgivning.',
};

export default function Page() {
  return <BehandlingerClient />;
}
