import type { Metadata } from 'next';
import { SiteImage } from '@/components/SiteImage';
import { MotorcycleCatalog } from '@/components/MotorcycleCatalog';
import { createMetadata } from '@/lib/seo';
import { motoPrice, motoSides } from '@/lib/moto-record';
import { listPublishedMotorcycles } from '@/lib/moto-store';

export const dynamic = 'force-dynamic';
export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({ title: 'Motorcycles', description: 'Motorcycles listed by the Pamir Ecotourism team for travel in Tajikistan.', path: '/motorcycles' });
}

export default async function MotorcyclesPage() {
  const motorcycles = await listPublishedMotorcycles();
  return <main id="main-content">
    <section className="relative isolate flex min-h-[390px] items-end overflow-hidden bg-navy px-5 pb-14 pt-36 text-white sm:px-8 sm:pb-20">
      <SiteImage src="/photos/tours/high-pamirs-motorcycle/01.jpg" alt="Motorcycle travel in the Pamirs" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/30" />
      <div className="mx-auto w-full max-w-content"><p className="text-xs font-bold tracking-[.2em] text-gold">PAMIR ECOTOURISM</p><h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Motorcycles</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">Bikes the team adds in the admin appear here. The daily price stays on request until they enter one.</p></div>
    </section>
    <section className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-content">
        <MotorcycleCatalog items={motorcycles.map((motorcycle) => {
          const sides = motoSides(motorcycle);
          return { slug: motorcycle.slug, price: motoPrice(motorcycle.price), image: motorcycle.gallery[0]?.src ?? '', alt: motorcycle.gallery[0]?.alt ?? sides.en.title, en: { title: sides.en.title, blurb: sides.en.blurb }, ru: { title: sides.ru.title, blurb: sides.ru.blurb } };
        })} />
      </div>
    </section>
  </main>;
}
