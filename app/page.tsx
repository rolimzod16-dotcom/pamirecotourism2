import type { Metadata } from 'next';
import { ExpeditionProvider } from '@/components/home/ExpeditionProvider';
import { Finder } from '@/components/home/Finder';
import { DestinationShowcase } from '@/components/home/DestinationShowcase';
import { WhyChoose } from '@/components/home/WhyChoose';
import { TeamSection } from '@/components/home/TeamSection';
import { BookingSection } from '@/components/home/BookingSection';
import { createMetadata } from '@/lib/seo';
import { toHomeCard } from '@/lib/tour-record';
import { listPublished } from '@/lib/tour-store';

export const metadata: Metadata = createMetadata({
  title: 'Pamir Tours & Expeditions in Tajikistan | Pamir Ecotourism',
  absoluteTitle: true,
  description: 'Local Pamir tour operator from Rushan, GBAO: Pamir Highway 4x4 tours, the Wakhan valley, Fann Mountains treks, alpine lakes and family homestays in Tajikistan.',
  path: '/',
});

// Cached and refreshed every 5 minutes; admin saves refresh the affected pages at once.
export const revalidate = 300;

export default async function Home() {
  const tours = await listPublished();
  const homeTours = tours.filter((tour) => tour.showOnHome).map(toHomeCard);
  const choices = tours.map((tour) => ({ slug: tour.slug, title: tour.title }));
  return <main id="main-content" className="bg-paper pt-20">
    <ExpeditionProvider>
      <Finder tours={homeTours} />
      <DestinationShowcase />
      <WhyChoose />
      <TeamSection />
      <BookingSection tours={choices} />
    </ExpeditionProvider>
  </main>;
}
