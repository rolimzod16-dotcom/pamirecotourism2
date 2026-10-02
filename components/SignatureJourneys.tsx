import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { home, featuredTourSlugs } from '@/content/home';
import { tours } from '@/data/tours';
import { Reveal } from './Reveal';
import { TourCard } from './TourCard';
const featured = featuredTourSlugs.map((slug) => tours.find((tour) => tour.slug === slug)).filter((tour): tour is (typeof tours)[number] => Boolean(tour));
export function SignatureJourneys() {
  return <section id="journeys" aria-labelledby="journeys-title" className="overflow-hidden px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><p className="text-xs font-bold tracking-[.2em] text-navy/70">{home.journeys.eyebrow}</p><div className="mt-4 flex flex-wrap items-end justify-between gap-5"><div><h2 id="journeys-title" className="font-display text-4xl leading-tight sm:text-5xl">{home.journeys.title}</h2><p className="mt-4 max-w-2xl leading-7 text-navy/75">{home.journeys.intro}</p></div></div></Reveal>
    <Reveal className="mt-10"><div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:px-0 xl:grid-cols-3">{featured.map((tour, index) => <div key={tour.slug} className={`w-[min(84vw,370px)] shrink-0 snap-start lg:w-auto ${index === 0 ? 'lg:row-span-2' : ''}`}><TourCard tour={tour} featured={index === 0} /></div>)}</div></Reveal>
    <Reveal className="mt-8 text-center"><Link href="/tours" className="inline-flex items-center gap-2 rounded-brand border border-navy px-6 py-3 font-semibold transition hover:bg-navy hover:text-white">{home.journeys.all}<ArrowUpRight size={18} aria-hidden="true" /></Link></Reveal>
  </div></section>;
}
