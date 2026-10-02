import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Compass, Mountain, MapPin } from 'lucide-react';
import { createMetadata, siteUrl } from '@/lib/seo';
import { destinations } from '@/data/destinations';
import { placePhotos } from '@/data/photos';
import { tours } from '@/data/tours';
import { routesCopy as c } from '@/content/routes';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Reveal } from '@/components/Reveal';
import { TourCard } from '@/components/TourCard';
const findDestination = (slug: string) => destinations.find((place) => place.slug === slug);
const icons = [Mountain, Compass, MapPin];
export function generateStaticParams() { return destinations.map((place) => ({ slug: place.slug })); }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const place = findDestination(params.slug); if (!place) return {};
  return createMetadata({ title: place.name, description: place.description, path: `/destinations/${place.slug}`, image: place.image });
}
export default function DestinationDetail({ params }: { params: { slug: string } }) {
  const place = findDestination(params.slug); if (!place) notFound();
  const photos = placePhotos[place.slug] ?? [];
  const related = tours.filter((tour) => tour.destinations.includes(place.slug)).slice(0, 3);
  const url = `${siteUrl}/destinations/${place.slug}`;
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'TouristDestination', name: place.name, description: place.description, url, image: `${siteUrl}${place.image}`, geo: { '@type': 'GeoCoordinates', latitude: place.coordinates.lat, longitude: place.coordinates.lng } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: c.common.home, item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: c.common.destinations, item: `${siteUrl}/destinations` }, { '@type': 'ListItem', position: 3, name: place.name, item: url }] },
  ];
  return <main id="main-content"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
<section className="relative isolate flex min-h-[510px] items-end overflow-hidden bg-navy px-5 pb-14 pt-32 text-white sm:px-8"><Image src={photos[0]?.src ?? place.image} alt={photos[0]?.alt ?? place.name} fill priority sizes="100vw" className="-z-20 object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/65 to-navy/25" /><div className="mx-auto w-full max-w-content"><Breadcrumbs light items={[{ label: c.common.destinations, href: '/destinations' }, { label: place.name }]} /><p className="mt-10 text-xs font-bold uppercase tracking-[.2em] text-gold">{place.group}</p><h1 className="mt-4 font-display text-5xl sm:text-7xl">{place.name}</h1><p className="mt-4 max-w-xl text-lg text-white/85">{place.description}</p></div></section>
    <div className="mx-auto grid max-w-content gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16"><div className="min-w-0 space-y-16"><Reveal><section><h2 className="font-display text-3xl">{c.destination.about}</h2><p className="mt-5 leading-8 text-navy/75">{place.description}</p><div className="mt-6 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-snow px-4 py-2">{c.destination.region}: {place.region}</span><span className="rounded-full bg-snow px-4 py-2">{c.destination.coordinates}: {place.coordinates.lat.toFixed(2)}°N, {place.coordinates.lng.toFixed(2)}°E</span></div></section></Reveal>
      <Reveal><section><h2 className="font-display text-3xl">{c.destination.highlights}</h2><div className="mt-6 grid gap-4 sm:grid-cols-3">{place.highlights.map((item, index) => { const Icon = icons[index % icons.length]; return <div key={item} className="rounded-brand bg-snow p-5"><Icon size={25} className="text-turquoise" aria-hidden="true" /><p className="mt-4 text-sm leading-6">{item}</p></div>; })}</div></section></Reveal>
      <Reveal><section><h2 className="font-display text-3xl">{c.destination.how}</h2><p className="mt-5 leading-8 text-navy/75">{place.howToGetThere}</p></section></Reveal>
      <Reveal><section><h2 className="font-display text-3xl">{c.destination.season}</h2><p className="mt-5 leading-8 text-navy/75">{place.bestSeason}</p></section></Reveal>
    </div><aside className="h-fit rounded-brand bg-navy p-6 text-white lg:sticky lg:top-28"><p className="font-display text-2xl">{c.destination.cta}</p><p className="mt-3 text-sm leading-6 text-white/75">{c.destination.ctaText}</p><Link href={`/?destination=${encodeURIComponent(place.slug)}#inquiry`} className="mt-6 inline-flex items-center gap-2 rounded-brand bg-gold px-5 py-3 font-bold text-navy">{c.destination.action}<ArrowUpRight size={17} aria-hidden="true" /></Link></aside></div>
    <section className="bg-snow px-5 py-16 sm:px-8"><div className="mx-auto max-w-content"><h2 className="font-display text-3xl">{c.destination.related}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-navy/70">{c.destination.relatedNote}</p>{related.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{related.map((tour) => <TourCard key={tour.slug} tour={tour} />)}</div> : <p className="mt-6">{c.destination.emptyTours}</p>}</div></section>
    <section className="px-5 py-16 sm:px-8"><div className="mx-auto max-w-content"><h2 className="font-display text-3xl">{c.destination.gallery}</h2><div className="mt-7 grid grid-cols-3 gap-3">{photos.map((photo) => <div key={photo.src} className="relative aspect-[3/4] overflow-hidden rounded-brand bg-navy sm:aspect-[4/3]"><Image src={photo.src} alt={photo.alt} fill sizes="33vw" className="object-cover" /></div>)}</div></div></section>
  </main>;
}
