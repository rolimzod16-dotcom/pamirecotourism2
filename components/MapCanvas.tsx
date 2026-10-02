'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, X } from 'lucide-react';
import { destinations, type DestinationGroup } from '@/data/destinations';
import { home } from '@/content/home';
// Schematic equirectangular projection; coordinates are approximate, not a navigation aid.
const point = (lng: number, lat: number) => ({ x: 70 + ((lng - 67.2) / 7.3) * 820, y: 520 - ((lat - 36.5) / 4.15) * 440 });
export default function MapCanvas() {
  const [filter, setFilter] = useState<'All' | DestinationGroup>('All');
  const [selected, setSelected] = useState<(typeof destinations)[number] | null>(null);
  const visible = destinations.filter((destination) => filter === 'All' || destination.group === filter);
  return <div><div role="group" aria-label="Filter destinations" className="mb-5 flex gap-2 overflow-x-auto pb-2">{home.map.filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => { setFilter(item); setSelected(null); }} className={`shrink-0 min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${filter === item ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white text-navy hover:border-navy'}`}>{item}</button>)}</div>
    <div className="relative min-h-[480px] overflow-hidden rounded-brand bg-[#c5d2cd] shadow-soft sm:min-h-[590px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 960 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={home.map.mapLabel}>
        <defs><linearGradient id="terrain" x2="1" y2="1"><stop stopColor="#cad9d2"/><stop offset=".5" stopColor="#8eaaa5"/><stop offset="1" stopColor="#345e69"/></linearGradient><pattern id="contours" width="100" height="90" patternUnits="userSpaceOnUse"><path d="M-15 52 Q35 5 95 51 T205 53 M-12 80 Q40 34 97 80 T205 83" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="2"/></pattern></defs>
        <rect width="960" height="600" fill="url(#terrain)" /><path d="M0 85 Q180 190 290 60 T510 130 T730 75 T1000 100 V600 H0Z" fill="#5f8a8a" opacity=".45"/><path d="M0 400 Q180 275 340 400 T650 260 T1000 350 V600 H0Z" fill="#294f60" opacity=".48"/><rect width="960" height="600" fill="url(#contours)"/>
        <path d="M63 160 L198 183 L250 94 L340 113 L390 175 L518 182 L584 129 L666 210 L819 157 L895 241 L857 382 L758 464 L690 470 L610 558 L484 504 L422 556 L338 486 L224 510 L134 433 L87 342 L18 300 Z" fill="#477778" fillOpacity=".24" stroke="#f7f9fa" strokeWidth="3" strokeDasharray="8 8"/>
        {[37,38,39,40].map((lat) => <text key={lat} x="16" y={point(67.2,lat).y} fill="#0B1F2E" opacity=".6" fontSize="13">{lat}°N</text>)}
        {visible.map((destination) => { const p = point(destination.lng, destination.lat); return <g key={destination.slug} transform={`translate(${p.x} ${p.y})`}><circle r="17" fill="#0B1F2E" opacity=".35"/><circle r="11" fill="#E8A24A" stroke="#0B1F2E" strokeWidth="2"/><circle r="3" fill="#0B1F2E"/></g>; })}
      </svg>
      <div className="absolute inset-0" aria-label={home.map.mapLabel}>{visible.map((destination) => { const p=point(destination.lng,destination.lat); return <button key={destination.slug} type="button" aria-label={`${home.map.show} ${destination.name}`} aria-pressed={selected?.slug === destination.slug} onClick={() => setSelected(destination)} style={{ left: `${p.x / 960 * 100}%`, top: `${p.y / 600 * 100}%` }} className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:z-20 focus-visible:bg-white/70"><span className="sr-only">{destination.name}</span></button>; })}</div>
      <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-navy shadow-soft sm:left-6 sm:top-6">{home.map.schematic}</div>
{selected && <article className="absolute inset-x-3 bottom-3 z-10 overflow-hidden rounded-brand bg-white text-navy shadow-soft sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-80"><div className="relative h-28"><Image src={selected.image} alt={`${selected.name}, Tajikistan`} fill sizes="320px" className="object-cover" /></div><div className="p-4"><div className="flex items-start justify-between gap-2"><div><p className="text-xs font-bold uppercase tracking-wider text-navy/65">{selected.group}</p><h3 className="mt-1 font-display text-2xl">{selected.name}</h3></div><button type="button" aria-label={home.map.close} onClick={() => setSelected(null)} className="flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 hover:bg-snow"><X size={20}/></button></div><p className="mt-2 text-sm text-navy/75">{selected.description}</p><Link href={`/destinations/${selected.slug}`} className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-bold underline underline-offset-4">{home.map.discover}<ArrowUpRight size={16} aria-hidden="true" /></Link></div></article>}
    </div><p className="mt-3 flex items-center gap-2 text-xs text-navy/65"><MapPin size={15} aria-hidden="true" />{home.map.coordinatesNote}</p>
  </div>;
}
