import type { Metadata } from 'next';
import { ExpeditionProvider } from '@/components/home/ExpeditionProvider';
import { Finder } from '@/components/home/Finder';
import { DestinationShowcase } from '@/components/home/DestinationShowcase';
import { WhyChoose } from '@/components/home/WhyChoose';
import { TeamSection } from '@/components/home/TeamSection';
import { ReviewSection } from '@/components/home/ReviewSection';
import { BookingSection } from '@/components/home/BookingSection';
import { createMetadata } from '@/lib/seo';
import { toHomeCard } from '@/lib/tour-record';
import { listPublished } from '@/lib/tour-store';

export const metadata: Metadata = createMetadata({
  title: 'Home',
  description: 'Local Pamir expeditions from Rushan, GBAO: 4x4 overland, alpine treks, lakes, and community homestays in Tajikistan.',
});

export const dynamic = 'force-dynamic';

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
      <ReviewSection />
      <BookingSection tours={choices} />
    </ExpeditionProvider>
  </main>;
}
