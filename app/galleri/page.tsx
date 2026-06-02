import { Metadata } from 'next';
import GalleriClient from "@/components/pages/galleri-page";

export const metadata: Metadata = {
  title: 'Galleri & Inspiration',
  description: 'Gå på opdagelse i vores galleri og se tidligere resultater af balayage, farvedesign og extensions udført hos Salon Deleuran i Randers.',
};

export default function Page() {
  return <GalleriClient />;
}
