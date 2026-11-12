import type { Metadata } from 'next';
import { SiteImage } from '@/components/SiteImage';
import { MotorcycleCatalog } from '@/components/MotorcycleCatalog';
import { createMetadata } from '@/lib/seo';
import { motoSides } from '@/lib/moto-record';
import { listPublishedMotorcycles } from '@/lib/moto-store';

// Cached and refreshed every 5 minutes; admin saves refresh the affected pages at once.
export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  // Rental itself is the job of the partner site pamirmoto.com; this page should not compete with it in search.
  return createMetadata({ title: 'Motorcycles for Pamir Highway Trips', description: 'Motorcycles for Pamir Highway and Wakhan trips with the local Pamir Ecotourism team. For rental in Dushanbe with a mechanic and support 4x4, see our partner Pamir Moto Adventure.', path: '/motorcycles' });
}

export default async function MotorcyclesPage() {
  const motorcycles = await listPublishedMotorcycles();
  return <main id="main-content">
    <section className="relative isolate flex min-h-[390px] items-end overflow-hidden bg-navy px-5 pb-14 pt-36 text-white sm:px-8 sm:pb-20">
      <SiteImage src="/photos/tours/high-pamirs-motorcycle/01.jpg" alt="Motorcycle travel in the Pamirs" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/30" />
      <div className="mx-auto w-full max-w-content"><p className="text-xs font-bold tracking-[.2em] text-gold">PAMIR ECOTOURISM</p><h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Motorcycles</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">Motorcycles for Pamir Highway and Wakhan trips with our team. Daily prices are quoted for your dates.</p></div>
    </section>
    <section className="px-5 pt-12 sm:px-8">
      <div className="mx-auto max-w-content rounded-brand bg-snow p-6 text-sm leading-6 text-navy/80">
        Looking to rent a motorcycle in Dushanbe? Our partner <a href="https://pamirmoto.com/en/motorcycles" className="font-semibold text-pine underline">Pamir Moto Adventure</a> rents Honda CRF300L bikes for the Pamir Highway, with a mechanic and support 4x4 on request.
      </div>
    </section>
    <section className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-content">
        <MotorcycleCatalog items={motorcycles.map((motorcycle) => {
          const sides = motoSides(motorcycle);
          return { slug: motorcycle.slug, price: motorcycle.price, image: motorcycle.gallery[0]?.src ?? '', alt: motorcycle.gallery[0]?.alt ?? sides.en.title, en: { title: sides.en.title, blurb: sides.en.blurb }, ru: { title: sides.ru.title, blurb: sides.ru.blurb } };
        })} />
      </div>
    </section>
  </main>;
}
