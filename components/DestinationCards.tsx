'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { destinations, type DestinationGroup } from '@/data/destinations';
import { routesCopy as c } from '@/content/routes';
import { Reveal } from './Reveal';
const groups: { value: string; label: string; group?: DestinationGroup }[] = [
  { value: 'all', label: c.destinations.all }, { value: 'lakes', label: c.destinations.groups.lakes, group: 'Lakes' },
  { value: 'mountains', label: c.destinations.groups.mountains, group: 'Mountains and Valleys' },
  { value: 'cities', label: c.destinations.groups.cities, group: 'Historic Cities' },
];
export function DestinationCards() {
  const router = useRouter(), pathname = usePathname(), params = useSearchParams();
  const selected = params.get('group') ?? 'all';
  const group = groups.find((item) => item.value === selected);
  const shown = destinations.filter((place) => selected === 'all' || place.group === group?.group);
  const choose = (value: string) => router.replace(value === 'all' ? pathname : `${pathname}?group=${value}`, { scroll: false });
  return <div><div role="group" aria-label={c.destinations.tabsLabel} className="flex gap-2 overflow-x-auto pb-3">{groups.map((item) => <button key={item.value} type="button" onClick={() => choose(item.value)} aria-pressed={selected === item.value} className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold ${selected === item.value ? 'border-navy bg-navy text-white' : 'border-navy/20 hover:border-navy'}`}>{item.label}</button>)}</div><p className="mt-4 text-sm text-navy/70" aria-live="polite">{shown.length} {c.destinations.results}</p>{shown.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{shown.map((place) => <Reveal key={place.slug}><article className="group h-full overflow-hidden rounded-brand bg-white shadow-soft"><div className="relative aspect-[4/3] overflow-hidden"><Image src={place.image} alt={`${place.name}, Tajikistan`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-navy/65">{place.group}</p><h2 className="mt-2 font-display text-2xl">{place.name}</h2><p className="mt-3 text-sm leading-6 text-navy/75">{place.description}</p><Link href={`/destinations/${place.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4">{c.common.discover}<ArrowUpRight size={17} aria-hidden="true" /></Link></div></article></Reveal>)}</div> : <p className="mt-8 rounded-brand bg-snow p-10 text-center">{c.destinations.empty}</p>}</div>;
}
