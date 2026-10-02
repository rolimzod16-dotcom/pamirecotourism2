import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Tour } from '@/data/tours';
import { site } from '@/data/site';
import { routesCopy as c } from '@/content/routes';
const requestHref = (slug: string) => `/?trip=${encodeURIComponent(slug)}#inquiry`;
export function TourBooking({ tour }: { tour: Tour }) {
  const price = typeof tour.price === 'number' ? `${c.tour.from} $${tour.price}` : c.tour.priceRequest;
  return <><aside className="hidden rounded-brand border border-navy/10 bg-white p-6 shadow-soft lg:sticky lg:top-44 lg:block"><p className="text-sm text-navy/70">{c.tour.facts.price}</p><strong className="mt-1 block font-display text-3xl">{price}</strong><p className="mt-3 text-sm leading-6 text-navy/65">{c.tour.bookingNote}</p><Link href={requestHref(tour.slug)} className="mt-6 block rounded-brand bg-gold px-5 py-4 text-center font-bold text-navy hover:bg-navy hover:text-white">{c.tour.request}</Link><a href={`https://wa.me/${site.phoneHref.slice(1)}`} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-brand border border-navy/25 px-5 py-3 font-semibold hover:bg-snow"><MessageCircle size={18} aria-hidden="true" />{c.common.whatsapp}</a><Link href={`/?trip=${encodeURIComponent(tour.slug)}#inquiry`} className="mt-4 block text-center text-sm underline underline-offset-4">{c.tour.ask}</Link></aside>
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-navy/10 bg-white px-4 py-3 shadow-soft lg:hidden"><span className="min-w-0 font-display text-base font-semibold sm:text-xl">{price}</span><a href={`https://wa.me/${site.phoneHref.slice(1)}`} target="_blank" rel="noopener noreferrer" aria-label={c.common.whatsapp} className="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-brand border border-navy/30 text-navy"><MessageCircle size={20} aria-hidden="true" /></a><Link href={requestHref(tour.slug)} className="shrink-0 rounded-brand bg-gold px-4 py-3 text-sm font-bold text-navy">{c.tour.request}</Link></div></>;
}
