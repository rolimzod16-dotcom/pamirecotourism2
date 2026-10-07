import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RouteHero } from '@/components/RouteHero';
import { TourFilters } from '@/components/TourFilters';
import { createMetadata } from '@/lib/seo';
import { routesCopy as c } from '@/content/routes';
import { tourPhotos } from '@/data/photos';
import { toPublicTour } from '@/lib/tour-record';
import { listPublished } from '@/lib/tour-store';
export async function generateMetadata(): Promise<Metadata> { return createMetadata({ title: c.tours.title, description: c.tours.intro, path: '/tours' }); }
export const dynamic = 'force-dynamic';
export default async function ToursPage() {
  const tours = (await listPublished()).map(toPublicTour);
  return <main id="main-content"><RouteHero eyebrow={c.tours.eyebrow} title={c.tours.title} intro={c.tours.intro} image={tours[0]?.gallery[0] ?? tourPhotos['pamir-highway-4x4'][0].src} /><section className="px-5 py-16 sm:px-8 lg:py-24"><div className="mx-auto max-w-content"><Suspense fallback={<p>{c.tours.results}</p>}><TourFilters tours={tours} /></Suspense></div></section><aside className="bg-navy px-5 py-14 text-white sm:px-8"><div className="mx-auto flex max-w-content flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><h2 className="font-display text-3xl">{c.tours.ctaTitle}</h2><p className="mt-2 text-white/75">{c.tours.ctaText}</p></div><Link href="/#inquiry" className="inline-flex w-fit shrink-0 items-center gap-2 rounded-brand bg-gold px-6 py-3 font-semibold text-navy">{c.tours.ctaButton}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></aside></main>;
}
