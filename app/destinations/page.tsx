import type { Metadata } from 'next';
import { Suspense } from 'react';
import { RouteHero } from '@/components/RouteHero';
import { DestinationMap } from '@/components/DestinationMap';
import { DestinationCards } from '@/components/DestinationCards';
import { createMetadata } from '@/lib/seo';
import { routesCopy as c } from '@/content/routes';
import { placePhotos } from '@/data/photos';
export async function generateMetadata(): Promise<Metadata> { return createMetadata({ title: c.destinations.title, description: c.destinations.intro, path: '/destinations' }); }
export default function DestinationsPage() {
  return <main id="main-content"><RouteHero eyebrow={c.destinations.eyebrow} title={c.destinations.title} intro={c.destinations.intro} image={placePhotos.iskandarkul[0].src} /><DestinationMap /><section className="bg-snow px-5 py-16 sm:px-8 lg:py-24"><div className="mx-auto max-w-content"><Suspense fallback={<p>{c.destinations.results}</p>}><DestinationCards /></Suspense></div></section></main>;
}
