'use client';
import { FormEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, CalendarDays, Car, Compass, Footprints, House, MapPin, Mountain, Search, ShieldCheck, Star, Users, type LucideIcon } from 'lucide-react';
import { catalogTours, tourPrice, type CatalogTour } from '@/content/expedition-home';
import { heroSlides } from '@/data/photos';
import { useExpedition, type ExpeditionFilters } from './ExpeditionProvider';

const levelClass: Record<CatalogTour['levelTone'], string> = {
  forest: 'bg-forest text-white',
  leaf: 'bg-leaf text-white',
  alert: 'bg-red-700 text-white',
  earth: 'bg-[#6e3900] text-white',
};
const tabs = [
  { id: 'all', label: 'All Tours' },
  { id: '4x4', label: '4x4 Overland' },
  { id: 'trekking', label: 'Trekking' },
  { id: 'winter', label: 'Winter Expeditions' },
] as const;

function visible(tour: CatalogTour, filters: ExpeditionFilters) {
  if (filters.tab === '4x4' && !tour.activities.includes('4x4')) return false;
  if (filters.tab === 'trekking' && !tour.activities.includes('trekking')) return false;
  if (filters.tab === 'winter' && !tour.winter) return false;
  if (filters.region !== 'all' && !tour.regions.includes(filters.region)) return false;
  if (filters.activity !== 'all' && !tour.activities.includes(filters.activity)) return false;
  if (filters.season === 'winter' && !tour.winter) return false;
  return true;
}

export function Finder() {
  const { filters, setFilters, chooseTour } = useExpedition();
  const [region, setRegion] = useState(filters.region);
  const [activity, setActivity] = useState(filters.activity);
  const [season, setSeason] = useState(filters.season);
  const hero = heroSlides[0];
  const shown = useMemo(() => catalogTours.filter((tour) => visible(tour, filters)), [filters]);

  const search = (event: FormEvent) => {
    event.preventDefault();
    const tab: ExpeditionFilters['tab'] = season === 'winter' || activity === 'wildlife' ? 'winter' : activity === '4x4' ? '4x4' : activity === 'trekking' || activity === 'lakes' ? 'trekking' : 'all';
    setFilters({ region, activity, season, tab });
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <>
    <section id="hero" aria-labelledby="hero-title" className="relative -mt-20 overflow-hidden bg-ink text-white">
      <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-pine/40 via-transparent to-black/30" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-col items-center px-4 pb-28 pt-36 text-center sm:px-6 lg:px-12 md:pb-36 md:pt-44">
        <div className="mb-6 flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-white/85 px-4 py-1.5 text-center shadow-md backdrop-blur-md">
          <ShieldCheck size={18} className="shrink-0 text-leaf" aria-hidden="true" />
          <span className="font-display text-[11px] font-bold uppercase tracking-widest text-pine">Roof of the World • Direct Local Outfitter</span>
        </div>
        <h1 id="hero-title" className="w-full max-w-4xl text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[64px]">Unforgettable Expeditions Across the Roof of the World</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand">Discover pristine alpine lakes, jagged peaks, and authentic Silk Road mountain hospitality in Tajikistan with local guides.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/90 sm:gap-10">
          <span className="inline-flex items-center gap-2 font-display text-[13px] font-semibold text-sand"><Award size={20} className="text-[#95f8a7]" aria-hidden="true" />11+ Years Expeditions</span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-white/30 sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-2 font-display text-[13px] font-semibold text-sand"><Star size={20} className="fill-saffron text-saffron" aria-hidden="true" />4.9/5 Explorer Rating</span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-white/30 sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-2 font-display text-[13px] font-semibold text-sand"><Users size={20} className="text-[#95f8a7]" aria-hidden="true" />100% Community-Based</span>
        </div>
        <form onSubmit={search} className="mt-12 grid w-full max-w-5xl grid-cols-1 items-stretch gap-4 rounded-2xl bg-white/95 p-4 text-left shadow-2xl backdrop-blur-xl sm:p-6 md:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col rounded-xl bg-mist p-3"><span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-wide text-pine"><Compass size={16} aria-hidden="true" />Region</span>
            <select aria-label="Destination Region" value={region} onChange={(event) => setRegion(event.target.value)} className="mt-1 cursor-pointer bg-transparent font-display text-[15px] font-semibold text-ink focus:outline-none"><option value="all">All Tajikistan</option><option value="pamir-highway">Pamir Highway (M41)</option><option value="fan-mountains">Fan Mountains & Haft Kul</option><option value="wakhan">Wakhan Corridor</option><option value="sarez">Lake Sarez & Bartang</option></select>
          </label>
          <label className="flex flex-col rounded-xl bg-mist p-3"><span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-wide text-pine"><Footprints size={16} aria-hidden="true" />Activity Type</span>
            <select aria-label="Activity Type" value={activity} onChange={(event) => setActivity(event.target.value)} className="mt-1 cursor-pointer bg-transparent font-display text-[15px] font-semibold text-ink focus:outline-none"><option value="all">All Experiences</option><option value="4x4">4x4 Overland Roadtrip</option><option value="trekking">Alpine High Trekking</option><option value="lakes">Turquoise Lakes Traverse</option><option value="wildlife">Snow Leopard & Wildlife</option></select>
          </label>
          <label className="flex flex-col rounded-xl bg-mist p-3"><span className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-wide text-pine"><CalendarDays size={16} aria-hidden="true" />Travel Season</span>
            <select aria-label="Travel Season" value={season} onChange={(event) => setSeason(event.target.value)} className="mt-1 cursor-pointer bg-transparent font-display text-[15px] font-semibold text-ink focus:outline-none"><option value="may-oct">Prime Season (May - Oct)</option><option value="spring">Wildflower Spring (Apr - May)</option><option value="autumn">Golden Autumn (Sep - Nov)</option><option value="winter">Winter Wildlife (Dec - Mar)</option></select>
          </label>
          <button type="submit" className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-xl bg-forest px-6 py-4 font-display text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-leaf"><Search size={20} aria-hidden="true" />Search Trips</button>
        </form>
      </div>
    </section>
    <section className="bg-sand px-6 py-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {([{ icon: Mountain, title: '100% Native Guides', text: 'GBAO born and local' }, { icon: Car, title: 'Field-Proven 4x4 Fleet', text: 'Toyota Land Cruisers' }, { icon: House, title: 'Authentic Homestays', text: 'Direct village support' }, { icon: ShieldCheck, title: 'Direct Operator Tariffs', text: 'Clear written quotes' }] satisfies Array<{ icon: LucideIcon; title: string; text: string }>).map(({ icon: Icon, title, text }) => <div key={title} className="flex items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pine/10 text-pine"><Icon size={24} aria-hidden="true" /></div><div><p className="font-display text-[15px] font-bold text-ink">{title}</p><p className="text-xs text-slate">{text}</p></div></div>)}
      </div>
    </section>
    <section id="catalog" className="scroll-mt-24 bg-paper px-6 py-20 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-display text-[13px] font-bold uppercase tracking-widest text-leaf">Curated Small Group & Private Treks</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Handcrafted Expeditions Across Tajikistan</h2>
            <p className="mt-3 text-base leading-7 text-slate">Departures are led by Pamiri mountain specialists and tuned to your pace, season, and group.</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto rounded-xl bg-mist p-1.5" role="group" aria-label="Filter expeditions">
            {tabs.map((tab) => <button key={tab.id} type="button" aria-pressed={filters.tab === tab.id} onClick={() => setFilters({ ...filters, tab: tab.id })} className={`shrink-0 rounded-lg px-4 py-2 font-display text-[13px] font-semibold ${filters.tab === tab.id ? 'bg-white text-pine shadow-sm' : 'text-ink/60 hover:text-ink'}`}>{tab.label}</button>)}
          </div>
        </div>
        {shown.length === 0 ? <p className="rounded-2xl bg-white p-8 text-ink/70">No featured expedition matches that combination. <button type="button" className="font-semibold text-pine underline" onClick={() => { setRegion('all'); setActivity('all'); setSeason('may-oct'); setFilters({ region: 'all', activity: 'all', season: 'may-oct', tab: 'all' }); }}>Show all tours</button> or <Link href="/tours" className="font-semibold text-pine underline">browse the full list</Link>.</p> : <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((tour) => {
            const price = tourPrice(tour.slug);
            return <article key={tour.slug} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <Image src={tour.image} alt={tour.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute left-4 top-4 flex gap-2"><span className="rounded-full bg-white/85 px-3 py-1 font-display text-[11px] font-bold text-pine shadow-sm backdrop-blur-md">{tour.badge}</span><span className={`rounded-full px-2.5 py-1 font-display text-[11px] font-bold ${levelClass[tour.levelTone]}`}>{tour.level}</span></div>
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-lg bg-ink/75 px-3 py-1 font-display text-[11px] font-semibold text-white backdrop-blur-md"><Star size={14} className="fill-saffron text-saffron" aria-hidden="true" />{tour.rating}</div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                <div>
                  <p className="inline-flex items-center gap-1.5 font-display text-[11px] font-semibold text-leaf"><MapPin size={14} aria-hidden="true" />{tour.route}</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-ink transition-colors group-hover:text-pine"><Link href={`/tours/${tour.slug}`}>{tour.title}</Link></h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/70">{tour.blurb}</p>
                </div>
                <div className="-mx-6 -mb-6 flex items-center justify-between bg-sand px-6 py-4">
                  <div><p className="font-display text-[11px] font-medium uppercase tracking-wider text-slate">{price.caption}</p><p className="font-display text-2xl font-extrabold text-pine">{price.amount}</p></div>
                  <button type="button" onClick={() => chooseTour(tour.slug)} className="rounded-xl bg-forest px-5 py-2.5 font-display text-[13px] font-semibold text-white transition-colors hover:bg-leaf">{price.amount === 'Custom Quote' ? 'Inquire Dates' : 'Book Expedition'}</button>
                </div>
              </div>
            </article>;
          })}
        </div>}
        <p className="text-center text-sm text-slate">Looking for the Freezing Wall, Pamir Trail, city route, or motorcycle journey? <Link href="/tours" className="font-semibold text-pine underline underline-offset-4">See every expedition</Link>.</p>
      </div>
    </section>
  </>;
}
