import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { tours } from '@/data/tours';
import { routesCopy as c } from '@/content/routes';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Accordion } from '@/components/Accordion';
import { RouteSketch } from '@/components/RouteSketch';
import { TourBooking } from '@/components/TourBooking';
import { TourCard } from '@/components/TourCard';
import { Reveal } from '@/components/Reveal';
const findTour = (slug: string) => tours.find((tour) => tour.slug === slug);
export function generateStaticParams() { return tours.map((tour) => ({ slug: tour.slug })); }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tour = findTour(params.slug); if (!tour) return {};
  return { title: `${tour.title} | Pamir Ecotourism`, description: tour.hook, openGraph: { title: tour.title, description: tour.hook, images: [tour.gallery[0]] } };
}
export default function TourDetail({ params }: { params: { slug: string } }) {
  const tour = findTour(params.slug); if (!tour) notFound();
  const facts = [
    [c.tour.facts.days, tour.days === null ? c.common.placeholder : String(tour.days)],
    [c.tour.facts.distance, tour.distance ?? c.common.placeholder], [c.tour.facts.altitude, tour.maxAltitude ?? c.common.placeholder],
    [c.tour.facts.difficulty, tour.difficulty ?? c.common.placeholder], [c.tour.facts.season, tour.season ?? c.common.placeholder],
    [c.tour.facts.group, tour.groupSize ?? c.common.placeholder], [c.tour.facts.price, typeof tour.price === 'number' ? `$${tour.price}` : c.tour.priceRequest],
  ];
  const related = tours.filter((item) => item.slug !== tour.slug && item.category === tour.category).slice(0, 3);
  const url = `https://pamirecotourism.com/tours/${tour.slug}`;
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'TouristTrip', name: tour.title, description: tour.hook, url, image: `https://pamirecotourism.com${tour.gallery[0]}`, provider: { '@type': 'TravelAgency', name: 'Pamir Ecotourism' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: c.common.home, item: 'https://pamirecotourism.com/' }, { '@type': 'ListItem', position: 2, name: c.common.tours, item: 'https://pamirecotourism.com/tours' }, { '@type': 'ListItem', position: 3, name: tour.title, item: url }] },
  ];
  return <main id="main-content" className="pb-20 lg:pb-0"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-navy px-5 pb-12 pt-32 text-white sm:px-8 sm:pb-16"><Image src={tour.gallery[0]} alt={`${c.common.imagePlaceholder}: ${tour.title}`} fill priority sizes="100vw" className="-z-20 object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/30" /><div className="mx-auto w-full max-w-content"><Breadcrumbs light items={[{ label: c.common.tours, href: '/tours' }, { label: tour.title }]} /><span className="mt-10 inline-block rounded-full border border-white/60 px-3 py-1 text-xs font-bold uppercase tracking-wider">{tour.category}</span><h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">{tour.title}</h1><p className="mt-4 max-w-xl text-lg text-white/85">{tour.hook}</p></div></section>
    <div className="bg-white lg:sticky lg:top-20 lg:z-30 lg:border-b lg:border-navy/10 lg:shadow-soft"><div className="mx-auto grid max-w-content grid-cols-2 gap-4 px-5 py-5 sm:grid-cols-4 sm:px-8 xl:grid-cols-7">{facts.map(([label, value]) => <div key={label}><span className="block text-xs text-navy/65">{label}</span><strong className="mt-1 block text-sm">{value}</strong></div>)}</div></div>
    <div className="mx-auto grid max-w-content gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14"><div className="min-w-0 space-y-16">
      <Reveal><section aria-labelledby="overview-title"><h2 id="overview-title" className="font-display text-3xl">{c.tour.overview}</h2><p className="mt-5 leading-8 text-navy/75">{tour.overview}</p></section></Reveal>
      <Reveal><section aria-labelledby="itinerary-title"><h2 id="itinerary-title" className="font-display text-3xl">{c.tour.itinerary}</h2><p className="mt-3 text-sm text-navy/65">{c.tour.itineraryNote}</p><div className="mt-5"><Accordion items={tour.itinerary.map((day) => ({ title: `${c.tour.day} ${day.day} · ${day.title}`, content: `${day.description} ${c.tour.overnight}: ${day.overnight}` }))} /></div></section></Reveal>
      <Reveal><section aria-labelledby="route-title"><h2 id="route-title" className="mb-5 font-display text-3xl">{c.tour.map}</h2><RouteSketch /></section></Reveal>
      <Reveal><section className="grid gap-8 sm:grid-cols-2"><div><h2 className="font-display text-3xl">{c.tour.included}</h2><ul className="mt-5 space-y-3">{tour.included.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><Check size={18} className="mt-1 shrink-0 text-teal-700" aria-hidden="true" />{item}</li>)}</ul></div><div><h2 className="font-display text-3xl">{c.tour.excluded}</h2><ul className="mt-5 space-y-3">{tour.excluded.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><X size={18} className="mt-1 shrink-0 text-navy/55" aria-hidden="true" />{item}</li>)}</ul></div></section></Reveal>
      <Reveal><section><h2 className="font-display text-3xl">{c.tour.gear}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{tour.gear.map((item) => <li key={item} className="flex gap-3 text-sm"><Check size={18} className="shrink-0 text-teal-700" aria-hidden="true" />{item}</li>)}</ul></section></Reveal>
      <Reveal><section><h2 className="font-display text-3xl">{c.tour.safety}</h2><p className="mt-5 leading-8 text-navy/75">{c.tour.safetyText}</p></section></Reveal>
      <Reveal><section><h2 className="font-display text-3xl">{c.tour.faq}</h2><div className="mt-5"><Accordion items={tour.faq.map((faq) => ({ title: faq.question, content: faq.answer }))} /></div></section></Reveal>
    </div><TourBooking tour={tour} /></div>
    <section className="bg-snow px-5 py-16 sm:px-8"><div className="mx-auto max-w-content"><h2 className="font-display text-3xl">{c.tour.related}</h2><div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{related.map((item) => <TourCard key={item.slug} tour={item} />)}</div><Link href="/tours" className="mt-7 inline-block font-semibold underline underline-offset-4">{c.common.tours}</Link></div></section>
  </main>;
}
