'use client';
import { useState } from 'react';
import Image from 'next/image';
import { PhotoLightbox } from './PhotoLightbox';
import { home } from '@/content/home';

export function PhotoGrid({ title, photos }: { title: string; photos: readonly { src: string; alt: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const move = (direction: number) => setActive((current) => current === null ? null : (current + direction + photos.length) % photos.length);
  if (!photos.length) return null;
  return <section aria-labelledby="photo-grid-title">
    <h2 id="photo-grid-title" className="font-display text-3xl">{title}</h2>
    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">{photos.map((photo, index) => <button key={photo.src} type="button" onClick={() => setActive(index)} aria-label={`${home.gallery.open} ${index + 1}: ${photo.alt}`} className="group relative aspect-[4/3] overflow-hidden rounded-brand bg-navy"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></button>)}</div>
    {active !== null && <PhotoLightbox items={photos} active={active} onChange={move} onClose={() => setActive(null)} labels={{ close: home.gallery.close, previous: home.gallery.previous, next: home.gallery.next, image: home.gallery.counter }} />}
  </section>;
}
