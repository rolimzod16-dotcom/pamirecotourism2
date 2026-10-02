import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { tours } from '@/data/tours';
import { destinations } from '@/data/destinations';
import { chrome } from '@/content/chrome';
import { NewsletterForm } from './NewsletterForm';
import { site } from '@/data/site';
export function Footer() {
  const c = chrome.footer;
  return <footer className="bg-navy text-white"><div className="mx-auto max-w-content px-5 pb-8 pt-16 sm:px-8 lg:pt-20">
    <div className="grid gap-12 border-b border-white/15 pb-16 md:grid-cols-2 lg:grid-cols-4">
      <div><Link href="/" className="font-display text-3xl">Pamir Ecotourism</Link><p className="mt-5 max-w-xs text-sm leading-7 text-white/85">{c.tagline}</p></div>
      <div><h2 className="mb-5 text-xs font-semibold uppercase tracking-[.2em] text-turquoise">{c.explore}</h2><div className="flex flex-col gap-1 text-sm text-white/85"><Link href="/tours" className="flex min-h-11 items-center hover:text-white">{c.tours}</Link><Link href="/destinations" className="flex min-h-11 items-center hover:text-white">{c.destinations}</Link><Link href={`/tours/${tours[0].slug}`} className="flex min-h-11 items-center hover:text-white">{tours[0].title}</Link><Link href={`/destinations/${destinations[0].slug}`} className="flex min-h-11 items-center hover:text-white">{destinations[0].name}</Link><Link href="/gallery" className="flex min-h-11 items-center hover:text-white">{c.gallery}</Link><Link href="/about" className="flex min-h-11 items-center hover:text-white">{c.about}</Link></div></div>
      <div><h2 className="mb-5 text-xs font-semibold uppercase tracking-[.2em] text-turquoise">{c.contact}</h2><address className="flex flex-col gap-4 text-sm not-italic leading-6 text-white/85"><span className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />{site.address}</span><a className="flex min-h-11 items-center gap-3 hover:text-white" href={`tel:${site.phoneHref}`}><Phone size={18} className="shrink-0 text-gold" aria-hidden="true" />{site.phone}</a><a className="flex min-h-11 items-center gap-3 break-all hover:text-white" href={`mailto:${site.email}`}><Mail size={18} className="shrink-0 text-gold" aria-hidden="true" />{site.email}</a></address></div>
      <div><NewsletterForm /><p className="mt-2 text-xs text-white/75">{c.socialPending}</p></div>
    </div><div className="flex flex-col gap-3 pt-7 text-xs text-white/75 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Pamir Ecotourism</span><span>{c.based}</span></div>
  </div></footer>;
}
