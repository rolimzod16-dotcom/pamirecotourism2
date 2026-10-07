'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteImage } from '@/components/SiteImage';

export type MotoCard = {
  slug: string;
  price: string;
  image: string;
  alt: string;
  en: { title: string; blurb: string };
  ru: { title: string; blurb: string };
};

export function MotorcycleCatalog({ items }: { items: MotoCard[] }) {
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const copy = lang === 'ru'
    ? { empty: 'Мотоциклов пока нет.', contact: 'Написать команде', view: 'Открыть' }
    : { empty: 'No motorcycles are listed yet.', contact: 'Contact the team', view: 'View' };
  return <div>
    <div className="mb-6 flex gap-2" role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} className={`rounded-full px-4 py-2 text-sm font-semibold ${lang === 'en' ? 'bg-pine text-white' : 'bg-white text-pine'}`}>English</button>
      <button type="button" aria-pressed={lang === 'ru'} onClick={() => setLang('ru')} className={`rounded-full px-4 py-2 text-sm font-semibold ${lang === 'ru' ? 'bg-pine text-white' : 'bg-white text-pine'}`}>Русский</button>
    </div>
    {items.length === 0 ? <p className="rounded-brand bg-white p-6 text-ink/80 shadow-soft">{copy.empty} <Link href="/contact" className="font-semibold text-pine underline underline-offset-4">{copy.contact}</Link></p> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => {
      const text = item[lang];
      const title = text.title || item.en.title || item.ru.title;
      const blurb = text.blurb || item.en.blurb || item.ru.blurb;
      return <article key={item.slug} className="overflow-hidden rounded-brand bg-white shadow-soft">
        <div className="relative h-56 bg-navy">{item.image && <SiteImage src={item.image} alt={item.alt || title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />}</div>
        <div className="p-5"><h2 className="font-display text-2xl text-ink">{title}</h2>{blurb && <p className="mt-2 text-sm leading-6 text-ink/75">{blurb}</p>}<div className="mt-4 flex items-center justify-between gap-3"><strong className="text-sm text-pine">{item.price}</strong><Link href={`/motorcycles/${item.slug}`} className="text-sm font-semibold text-pine underline underline-offset-4">{copy.view}</Link></div></div>
      </article>;
    })}</div>}
  </div>;
}
