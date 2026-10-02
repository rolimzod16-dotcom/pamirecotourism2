import Link from 'next/link';
import { Camera, Leaf, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';
import { site } from '@/data/site';

const expeditions = [
  ['4x4 Pamir Highway Odyssey', '/tours/pamir-highway-4x4'],
  ['Iskandarkul Lake Trek', '/tours/fan-mountain-lakes'],
  ['Snow Leopard Expedition', '/tours/snow-leopard-tour'],
  ['Fan Mountain Lakes Traverse', '/tours/fan-mountain-lakes'],
  ['Bartang Valley Wilderness', '/destinations/bartang'],
] as const;
const places = [
  ['Iskandarkul Lake', '/destinations/iskandarkul'],
  ['Lake Sarez', '/destinations/sarez'],
  ['Seven Lakes (Haft Kul)', '/destinations/seven-lakes'],
  ['Karakul High Plateau', '/destinations/karakul'],
  ['Wakhan Valley Corridor', '/destinations/wakhan-ishkashim'],
  ['Khorog & Murghab', '/destinations/khorog'],
] as const;

function Mark() {
  return <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-hidden="true"><rect width="48" height="48" rx="12" fill="#0f5132" /><path d="M7 35 L17 16 L24 27 L31 12 L41 35 Z" fill="#F8F6F0" /><circle cx="35" cy="13" r="2.6" fill="#CA8A04" /></svg>;
}

export function Footer() {
  return <footer className="bg-mist text-ink"><div className="mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-12">
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 border-b border-pine/10 pb-14 md:grid-cols-2 lg:grid-cols-12">
      <div className="flex flex-col gap-4 lg:col-span-4">
        <Link href="/" className="flex items-center gap-3"><Mark /><span className="font-display text-xl font-semibold text-pine">Pamir Ecotourism</span></Link>
        <p className="max-w-sm text-sm leading-6 text-ink/70">Authentic, sustainable eco-expeditions across the Roof of the World, the Pamir Mountains, and Tajikistan. Dedicated to conservation and community-based travel.</p>
        <p className="flex items-center gap-2 text-xs text-slate"><Leaf size={16} className="text-leaf" aria-hidden="true" />Community-based operator · Est. 2015</p>
        <div className="flex items-center gap-3 pt-2">
          <Link aria-label="Photo gallery" href="/gallery" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate transition-colors hover:bg-forest hover:text-white"><Camera size={16} aria-hidden="true" /></Link>
          <a aria-label="WhatsApp support" href="https://wa.me/992936001936" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate transition-colors hover:bg-forest hover:text-white"><MessageCircle size={16} aria-hidden="true" /></a>
          <Link aria-label="Contact the team" href="/contact" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate transition-colors hover:bg-forest hover:text-white"><Mail size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="lg:col-span-3"><h2 className="font-display text-lg font-semibold">Popular Expeditions</h2><ul className="flex flex-col gap-2.5 pt-3">{expeditions.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-ink/70 transition-colors hover:text-pine">{label}</Link></li>)}</ul></div>
      <div className="lg:col-span-2"><h2 className="font-display text-lg font-semibold">Destinations</h2><ul className="flex flex-col gap-2.5 pt-3">{places.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-ink/70 transition-colors hover:text-pine">{label}</Link></li>)}</ul></div>
      <div className="flex flex-col gap-4 lg:col-span-3">
        <h2 className="font-display text-lg font-semibold">Contact & Office</h2>
        <address className="flex flex-col gap-2.5 text-sm not-italic text-ink/70">
          <span className="flex items-start gap-2.5"><MapPin size={18} className="mt-0.5 shrink-0 text-pine" aria-hidden="true" />{site.address}</span>
          <a className="flex items-center gap-2.5 hover:text-pine" href={`mailto:${site.email}`}><Mail size={18} className="shrink-0 text-pine" aria-hidden="true" />{site.email}</a>
          <a className="flex items-center gap-2.5 hover:text-pine" href={`tel:${site.phoneHref}`}><Phone size={18} className="shrink-0 text-pine" aria-hidden="true" />{site.phone}</a>
        </address>
        <NewsletterForm />
      </div>
    </div>
    <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate sm:flex-row">
      <span>© {new Date().getFullYear()} Pamir Ecotourism. All rights reserved.</span>
      <span className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold text-leaf"><Leaf size={14} aria-hidden="true" />Community-based expeditions</span>
    </div>
  </div></footer>;
}
