'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';
import { gallery, type GalleryCategory } from '@/data/gallery';
import { pages } from '@/content/pages';
const PhotoLightbox = dynamic(() => import('./PhotoLightbox').then((module) => module.PhotoLightbox), { ssr: false });
import { Reveal } from './Reveal';
const c = pages.gallery;
const blur = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22%3E%3Crect width=%2210%22 height=%2210%22 fill=%22%233d6870%22/%3E%3C/svg%3E';
export function GalleryBrowser() {
  const [filter, setFilter] = useState<'All' | GalleryCategory>('All');
  const [active, setActive] = useState<number | null>(null);
  const shown = gallery.filter((photo) => filter === 'All' || photo.category === filter);
  const move = (direction: number) => setActive((current) => current === null ? null : (current + direction + shown.length) % shown.length);
  const close = () => setActive(null);
  return <><section className="px-5 py-16 sm:px-8 lg:py-24"><div className="mx-auto max-w-content"><div role="group" aria-label={c.filterLabel} className="flex gap-2 overflow-x-auto pb-4">{c.categories.map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => { setFilter(category); setActive(null); }} className={`shrink-0 min-h-11 rounded-full border px-5 py-2.5 text-sm font-semibold ${filter === category ? 'border-navy bg-navy text-white' : 'border-navy/20 hover:border-navy'}`}>{category}</button>)}</div><Reveal className="mt-7 columns-2 gap-3 md:columns-3 lg:columns-4 lg:gap-4">{shown.map((photo, index) => <button key={photo.id} type="button" onClick={() => setActive(index)} aria-label={`${c.open} ${index + 1}: ${photo.alt}`} className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-brand bg-navy text-left lg:mb-4 motion-safe:hover:scale-[1.01]"><div className={`relative ${index % 4 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" placeholder="blur" blurDataURL={blur} className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><span className="absolute bottom-2 left-2 right-2 rounded bg-navy/80 px-2 py-1 text-xs text-white">{photo.category} · {photo.id}</span></button>)}</Reveal></div></section><aside className="bg-navy px-5 py-14 text-white sm:px-8"><div className="mx-auto flex max-w-content flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"><h2 className="font-display text-3xl">{c.ctaTitle}</h2><Link href="/#inquiry" className="inline-flex shrink-0 items-center gap-2 rounded-brand bg-gold px-5 py-3 font-bold text-navy">{c.ctaButton}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></aside>{active !== null && <PhotoLightbox items={shown} active={active} onChange={move} onClose={close} labels={c} />}</>;
}
