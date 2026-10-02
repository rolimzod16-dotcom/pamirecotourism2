'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
export type LightboxPhoto = { src: string; alt: string; caption?: string };
export type LightboxLabels = { close: string; previous: string; next: string; image: string };
export function PhotoLightbox({ items, active, onChange, onClose, labels }: { items: readonly LightboxPhoto[]; active: number; onChange: (direction: number) => void; onClose: () => void; labels: LightboxLabels }) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  useEffect(() => {
    opener.current = document.activeElement as HTMLElement;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; closeButton.current?.focus();
    return () => { document.body.style.overflow = original; requestAnimationFrame(() => opener.current?.focus()); };
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange(1);
      if (event.key === 'ArrowLeft') onChange(-1);
      if (event.key === 'Tab') {
        const buttons = Array.from(dialog.current?.querySelectorAll<HTMLButtonElement>('button') ?? []);
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey);
  }, [onChange, onClose]);
  if (!items.length) return null;
  const photo = items[active];
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} onTouchStart={(event) => { touchX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchX.current === null) return; const delta = event.changedTouches[0].clientX - touchX.current; if (Math.abs(delta) > 60) onChange(delta < 0 ? 1 : -1); touchX.current = null; }}><div ref={dialog} role="dialog" aria-modal="true" aria-label={`${labels.image} ${active + 1} / ${items.length}`} className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center"><button ref={closeButton} type="button" onClick={onClose} aria-label={labels.close} className="absolute right-0 top-0 z-10 rounded-full bg-white p-3 text-navy"><X size={22} /></button><div className="relative h-[min(72vh,680px)] w-full"><Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" /></div><div className="mt-4 flex items-center gap-7 text-white"><button type="button" onClick={() => onChange(-1)} aria-label={labels.previous} className="rounded-full border border-white/50 p-3 hover:bg-white hover:text-navy"><ArrowLeft size={20} /></button><span aria-live="polite" className="text-sm">{labels.image} {active + 1} / {items.length}</span><button type="button" onClick={() => onChange(1)} aria-label={labels.next} className="rounded-full border border-white/50 p-3 hover:bg-white hover:text-navy"><ArrowRight size={20} /></button></div>{photo.caption && <p className="mt-3 max-w-2xl text-center text-sm text-white/80">{photo.caption}</p>}</div></div>;
}
