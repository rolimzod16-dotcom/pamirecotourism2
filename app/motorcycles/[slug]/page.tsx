import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteImage } from '@/components/SiteImage';
import { createMetadata } from '@/lib/seo';
import { motoPrice } from '@/lib/moto-record';
import { listPublishedMotorcycles } from '@/lib/moto-store';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const motorcycle = (await listPublishedMotorcycles()).find((item) => item.slug === params.slug);
  if (!motorcycle) return {};
  return createMetadata({ title: motorcycle.title, description: motorcycle.blurb || motorcycle.title, path: `/motorcycles/${motorcycle.slug}`, image: motorcycle.gallery[0]?.src });
}

export default async function MotorcyclePage({ params }: { params: { slug: string } }) {
  const motorcycle = (await listPublishedMotorcycles()).find((item) => item.slug === params.slug);
  if (!motorcycle) notFound();
  const cover = motorcycle.gallery[0];
  return <main id="main-content" className="pb-16">
    <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-navy px-5 pb-14 pt-36 text-white sm:px-8">
      {cover && <SiteImage src={cover.src} alt={cover.alt || motorcycle.title} fill sizes="100vw" className="-z-20 object-cover" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/70 to-navy/25" />
      <div className="mx-auto w-full max-w-content"><Link href="/motorcycles" className="text-sm font-semibold text-gold">All motorcycles</Link><h1 className="mt-3 font-display text-4xl sm:text-6xl">{motorcycle.title}</h1><p className="mt-4 text-lg text-gold">{motoPrice(motorcycle.price)}</p></div>
    </section>
    <section className="mx-auto grid max-w-content gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div>
        {motorcycle.blurb && <p className="text-lg leading-8 text-ink/80">{motorcycle.blurb}</p>}
        {motorcycle.details && <p className="mt-6 whitespace-pre-wrap leading-7 text-ink/80">{motorcycle.details}</p>}
        {motorcycle.gallery.length > 1 && <div className="mt-8 grid gap-3 sm:grid-cols-2">{motorcycle.gallery.slice(1).map((photo) => <div key={photo.src} className="relative h-56 overflow-hidden rounded-brand bg-navy"><SiteImage src={photo.src} alt={photo.alt || motorcycle.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div>)}</div>}
      </div>
      <aside className="h-fit rounded-brand bg-white p-5 shadow-soft">
        <h2 className="font-display text-2xl">Ask the team</h2>
        <p className="mt-2 text-sm leading-6 text-ink/70">Tell them the dates and this motorcycle. They confirm availability and the price.</p>
        <Link href="/contact" className="mt-5 block rounded-xl bg-forest px-4 py-3 text-center font-semibold text-white">Contact</Link>
        <a href={`https://wa.me/992936001936?text=${encodeURIComponent(`Hello, I am asking about the ${motorcycle.title}.`)}`} className="mt-3 block rounded-xl border border-pine/20 px-4 py-3 text-center font-semibold text-pine">WhatsApp</a>
      </aside>
    </section>
  </main>;
}
