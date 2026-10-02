'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';
import { home } from '@/content/home';
const PhotoLightbox = dynamic(() => import('./PhotoLightbox').then((module) => module.PhotoLightbox), { ssr: false });
import { Reveal } from './Reveal';
const items = home.gallery.items;
export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const move = (direction: number) => setActive((current) => current === null ? null : (current + direction + items.length) % items.length);
return <section aria-labelledby="gallery-title" className="bg-white px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><p className="text-xs font-bold tracking-[.2em] text-navy/70">{home.gallery.eyebrow}</p><h2 id="gallery-title" className="mt-4 font-display text-4xl sm:text-5xl">{home.gallery.title}</h2><p className="mt-4 max-w-xl leading-7 text-navy/75">{home.gallery.intro}</p></Reveal><Reveal className="mt-10"><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{items.map((item, index) => <button key={`${item.src}-${index}`} type="button" onClick={() => setActive(index)} aria-label={`${home.gallery.open} ${index + 1}: ${item.alt}`} className={`group relative overflow-hidden rounded-brand bg-navy ${index === 0 || index === 5 ? 'aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto' : 'aspect-[4/3]'}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></button>)}</div></Reveal><Reveal className="mt-8 text-center"><Link href="/gallery" className="inline-flex min-h-11 items-center gap-2 rounded-brand border border-navy px-6 py-3 font-semibold hover:bg-navy hover:text-white">{home.gallery.full}<ArrowUpRight size={18} aria-hidden="true" /></Link></Reveal></div>{active !== null && <PhotoLightbox items={items} active={active} onChange={move} onClose={() => setActive(null)} labels={{ close: home.gallery.close, previous: home.gallery.previous, next: home.gallery.next, image: home.gallery.counter }} />}</section>;
}
