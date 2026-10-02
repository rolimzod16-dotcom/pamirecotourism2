import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { destinationCards } from '@/content/expedition-home';

export function DestinationShowcase() {
  return <section className="bg-sand px-6 py-20 lg:px-12">
    <div className="mx-auto flex max-w-7xl flex-col gap-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-display text-[13px] font-bold uppercase tracking-widest text-leaf">Unrivaled Central Asian Geography</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Tajikistan&apos;s Crown Jewels</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate">From the glacial water of Iskandarkul to the high Pamir plateau, these are the places our journeys are built around.</p>
        </div>
        <Link href="/#booking-form" className="inline-flex items-center gap-2 self-start font-display text-[15px] font-semibold text-pine hover:text-leaf">Request Custom Route Map<ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
        {destinationCards.map((place) => <Link key={place.slug} href={`/destinations/${place.slug}`} className={`group relative overflow-hidden rounded-2xl shadow-md ${place.className}`}>
          <Image src={place.image} alt={place.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-6 bottom-6 text-white"><p className="font-display text-[11px] font-bold uppercase tracking-widest text-[#95f8a7]">{place.kicker}</p><h3 className={`mt-1 font-display font-bold ${place.titleClass}`}>{place.title}</h3><p className="mt-1 line-clamp-2 text-sm leading-6 text-white/90">{place.text}</p></div>
        </Link>)}
      </div>
    </div>
  </section>;
}
