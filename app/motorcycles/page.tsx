import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteImage } from '@/components/SiteImage';
import { createMetadata } from '@/lib/seo';
import { motoPrice } from '@/lib/moto-record';
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
        {motorcycles.length === 0 ? <p className="rounded-brand bg-white p-6 text-ink/80 shadow-soft">No motorcycles are listed yet. <Link href="/contact" className="font-semibold text-pine underline underline-offset-4">Contact the team</Link> to ask what is available.</p> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{motorcycles.map((motorcycle) => <article key={motorcycle.slug} className="overflow-hidden rounded-brand bg-white shadow-soft">
          <div className="relative h-56 bg-navy">{motorcycle.gallery[0] && <SiteImage src={motorcycle.gallery[0].src} alt={motorcycle.gallery[0].alt || motorcycle.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />}</div>
          <div className="p-5"><h2 className="font-display text-2xl text-ink">{motorcycle.title}</h2><p className="mt-2 text-sm leading-6 text-ink/75">{motorcycle.blurb}</p><div className="mt-4 flex items-center justify-between gap-3"><strong className="text-sm text-pine">{motoPrice(motorcycle.price)}</strong><Link href={`/motorcycles/${motorcycle.slug}`} className="text-sm font-semibold text-pine underline underline-offset-4">View</Link></div></div>
        </article>)}</div>}
      </div>
    </section>
  </main>;
}
