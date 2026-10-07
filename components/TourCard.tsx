import { SiteImage as Image } from '@/components/SiteImage';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Mountain, Users } from 'lucide-react';
import type { Tour } from '@/data/tours';
import { featuredTourMedia, home } from '@/content/home';
export function TourCard({ tour, featured = false }: { tour: Tour; featured?: boolean }) {
  const media = featuredTourMedia[tour.slug] ?? { image: tour.gallery[0], hook: tour.hook };
  return <article className={`group relative isolate flex min-h-[430px] snap-start flex-col justify-end overflow-hidden rounded-brand bg-navy text-white shadow-soft transition-transform duration-300 hover:-translate-y-1 ${featured ? 'lg:row-span-2 lg:min-h-[720px]' : 'lg:min-h-[345px]'}`}>
<Image src={media.image} alt={`${tour.title}, Tajikistan`} fill sizes={featured ? '(max-width: 1024px) 85vw, 50vw' : '(max-width: 1024px) 85vw, 25vw'} className="object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/35" aria-hidden="true" />
    <div className="relative p-6 sm:p-7"><span className="mb-4 inline-block rounded-full border border-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider">{tour.category}</span><h3 className={`font-display leading-tight ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{tour.title}</h3><p className="mt-2 text-sm leading-6 text-white/85">{media.hook}</p>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/25 pt-4 text-xs text-white/85"><span className="inline-flex items-center gap-1"><CalendarDays size={15} aria-hidden="true" />{tour.days === null ? home.journeys.daysUnknown : `${tour.days} days`}</span><span className="inline-flex items-center gap-1"><Mountain size={15} aria-hidden="true" />{tour.difficulty ?? home.journeys.difficultyUnknown}</span><span className="inline-flex items-center gap-1"><Users size={15} aria-hidden="true" />{tour.groupSize ?? home.journeys.groupUnknown}</span></div>
      <div className="mt-5 flex items-center justify-between gap-3"><strong className="text-sm text-gold">{typeof tour.price === 'number' ? `${home.journeys.from} $${tour.price}` : home.journeys.request}</strong><Link href={`/tours/${tour.slug}`} className="relative z-10 inline-flex min-h-11 items-center gap-1 text-sm font-semibold underline underline-offset-4 hover:text-gold" aria-label={`${home.journeys.view}: ${tour.title}`}>{home.journeys.view}<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
    </div>
  </article>;
}
