'use client';
import dynamic from 'next/dynamic';
import { home } from '@/content/home';
import { Reveal } from './Reveal';
const MapCanvas = dynamic(() => import('./MapCanvas'), { ssr: false, loading: () => <div className="flex min-h-[540px] animate-pulse items-center justify-center rounded-brand bg-navy/10 text-navy/70" role="status">{home.map.loading}</div> });
export function DestinationMap() {
  return <section id="destinations" aria-labelledby="destinations-title" className="bg-white px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><p className="text-xs font-bold tracking-[.2em] text-navy/70">{home.map.eyebrow}</p><h2 id="destinations-title" className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">{home.map.title}</h2><p className="mt-4 max-w-2xl leading-7 text-navy/75">{home.map.intro}</p></Reveal><Reveal className="mt-9"><MapCanvas /></Reveal></div></section>;
}
