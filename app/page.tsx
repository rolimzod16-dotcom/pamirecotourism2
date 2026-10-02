import type { Metadata } from 'next';
import { ExpeditionProvider } from '@/components/home/ExpeditionProvider';
import { Finder } from '@/components/home/Finder';
import { DestinationShowcase } from '@/components/home/DestinationShowcase';
import { WhyChoose } from '@/components/home/WhyChoose';
import { TeamSection } from '@/components/home/TeamSection';
import { ReviewSection } from '@/components/home/ReviewSection';
import { BookingSection } from '@/components/home/BookingSection';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Home',
  description: 'Local Pamir expeditions from Rushan, GBAO: 4x4 overland, alpine treks, lakes, and community homestays in Tajikistan.',
});

export default function Home() {
  return <main id="main-content" className="bg-paper pt-20">
    <ExpeditionProvider>
      <Finder />
      <DestinationShowcase />
      <WhyChoose />
      <TeamSection />
      <ReviewSection />
      <BookingSection />
    </ExpeditionProvider>
  </main>;
}
