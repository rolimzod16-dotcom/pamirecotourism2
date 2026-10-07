'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteImage } from '@/components/SiteImage';

type Side = { title: string; blurb: string; details: string };
type Photo = { src: string; alt: string };

export function MotorcycleDetail({ price, photos, en, ru }: { price: string; photos: Photo[]; en: Side; ru: Side }) {
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const text = lang === 'ru' ? ru : en;
  const title = text.title || en.title || ru.title;
  const blurb = text.blurb || en.blurb || ru.blurb;
  const details = text.details || en.details || ru.details;
  const cover = photos[0];
  const ask = lang === 'ru'
    ? { back: 'Все мотоциклы', heading: 'Спросить команду', body: 'Напишите даты и этот мотоцикл. Команда подтвердит наличие и цену.', contact: 'Написать', whatsapp: 'WhatsApp' }
    : { back: 'All motorcycles', heading: 'Ask the team', body: 'Tell them the dates and this motorcycle. They confirm availability and the price.', contact: 'Contact', whatsapp: 'WhatsApp' };
  return <>
    <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-navy px-5 pb-14 pt-36 text-white sm:px-8">
      {cover && <SiteImage src={cover.src} alt={cover.alt || title} fill sizes="100vw" className="-z-20 object-cover" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/70 to-navy/25" />
      <div className="mx-auto w-full max-w-content">
        <div className="mb-4 flex gap-2">
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} className={`rounded-full px-4 py-2 text-sm font-semibold ${lang === 'en' ? 'bg-white text-pine' : 'bg-white/15 text-white'}`}>English</button>
          <button type="button" aria-pressed={lang === 'ru'} onClick={() => setLang('ru')} className={`rounded-full px-4 py-2 text-sm font-semibold ${lang === 'ru' ? 'bg-white text-pine' : 'bg-white/15 text-white'}`}>Русский</button>
        </div>
        <Link href="/motorcycles" className="text-sm font-semibold text-gold">{ask.back}</Link>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">{title}</h1>
        <p className="mt-4 text-lg text-gold">{price}</p>
      </div>
    </section>
    <section className="mx-auto grid max-w-content gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        {blurb && <p className="text-lg leading-8 text-ink/80">{blurb}</p>}
        {details && <p className="mt-6 whitespace-pre-wrap leading-7 text-ink/80">{details}</p>}
        {photos.length > 1 && <div className="mt-8 grid gap-3 sm:grid-cols-2">{photos.slice(1).map((photo) => <div key={photo.src} className="relative h-56 overflow-hidden rounded-brand bg-navy"><SiteImage src={photo.src} alt={photo.alt || title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div>)}</div>}
      </div>
      <aside className="h-fit rounded-brand bg-white p-5 shadow-soft">
        <h2 className="font-display text-2xl">{ask.heading}</h2>
        <p className="mt-2 text-sm leading-6 text-ink/70">{ask.body}</p>
        <Link href="/contact" className="mt-5 block rounded-xl bg-forest px-4 py-3 text-center font-semibold text-white">{ask.contact}</Link>
        <a href={`https://wa.me/992936001936?text=${encodeURIComponent(lang === 'ru' ? `Здравствуйте, хочу узнать про ${title}.` : `Hello, I am asking about the ${title}.`)}`} className="mt-3 block rounded-xl border border-pine/20 px-4 py-3 text-center font-semibold text-pine">{ask.whatsapp}</a>
      </aside>
    </section>
  </>;
}
