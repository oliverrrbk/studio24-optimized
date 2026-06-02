import { Metadata } from 'next';
import BehandlingerClient from "@/components/pages/behandlinger-page";

export const metadata: Metadata = {
  title: 'Balayage, Extensions & Frisør',
  description: 'Vi tilbyder skræddersyet balayage, eksklusive extensions og præcisionsklipning i vores frisørsalon på Frederiksberg. Altid med fokus på sundt hår og ærlig rådgivning.',
};

export default function Page() {
  return <BehandlingerClient />;
}
