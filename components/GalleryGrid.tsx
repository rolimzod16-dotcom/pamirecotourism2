'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { home } from '@/content/home';
import { Reveal } from './Reveal';
const items = home.gallery.items;
export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const touchStart = useRef<number | null>(null);
  const open = (index: number) => { trigger.current = document.activeElement as HTMLElement; setActive(index); };
  const close = () => { setActive(null); requestAnimationFrame(() => trigger.current?.focus()); };
  const move = (direction: number) => setActive((current) => current === null ? null : (current + direction + items.length) % items.length);
  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'Tab') {
        const controls = Array.from(dialog.current?.querySelectorAll<HTMLButtonElement>('button') ?? []);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey); };
  }, [active]); // Active index keeps the displayed image and keyboard controls in sync.
  return <section aria-labelledby="gallery-title" className="bg-white px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><p className="text-xs font-bold tracking-[.2em] text-navy/70">{home.gallery.eyebrow}</p><h2 id="gallery-title" className="mt-4 font-display text-4xl sm:text-5xl">{home.gallery.title}</h2><p className="mt-4 max-w-xl leading-7 text-navy/75">{home.gallery.intro}</p></Reveal>
    <Reveal className="mt-10"><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{items.map((item, index) => <button key={`${item.src}-${index}`} type="button" onClick={() => open(index)} aria-label={`${home.gallery.open} ${index + 1}: ${item.alt}`} className={`group relative overflow-hidden rounded-brand bg-navy ${index === 0 || index === 5 ? 'aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto' : 'aspect-[4/3]'}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-2 left-2 rounded bg-navy/75 px-2 py-1 text-[10px] text-white sm:text-xs">{home.gallery.placeholder}</span></button>)}</div></Reveal>
    <Reveal className="mt-8 text-center"><Link href="/gallery" className="inline-flex items-center gap-2 rounded-brand border border-navy px-6 py-3 font-semibold hover:bg-navy hover:text-white">{home.gallery.full}<ArrowUpRight size={18} aria-hidden="true" /></Link></Reveal>
  </div>{active !== null && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 60) move(delta < 0 ? 1 : -1); touchStart.current = null; }}><div ref={dialog} role="dialog" aria-modal="true" aria-label={`${home.gallery.counter} ${active + 1} / ${items.length}`} tabIndex={-1} className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center outline-none"><button ref={closeButton} type="button" onClick={close} aria-label={home.gallery.close} className="absolute right-0 top-0 z-10 rounded-full bg-white p-3 text-navy"><X size={22}/></button><div className="relative h-[min(75vh,700px)] w-full"><Image src={items[active].src} alt={items[active].alt} fill sizes="100vw" className="object-contain" /></div><div className="mt-4 flex items-center gap-8 text-white"><button type="button" onClick={() => move(-1)} aria-label={home.gallery.previous} className="rounded-full border border-white/50 p-3 hover:bg-white hover:text-navy"><ArrowLeft size={20}/></button><span aria-live="polite" className="text-sm">{home.gallery.counter} {active + 1} / {items.length}</span><button type="button" onClick={() => move(1)} aria-label={home.gallery.next} className="rounded-full border border-white/50 p-3 hover:bg-white hover:text-navy"><ArrowRight size={20}/></button></div></div></div>}</section>;
}
