import type { Metadata } from 'next';
import { RouteHero } from '@/components/RouteHero';
import { InquiryForm } from '@/components/InquiryForm';
import { ContactMap } from '@/components/ContactMap';
import { Accordion } from '@/components/Accordion';
import { Reveal } from '@/components/Reveal';
import { pages } from '@/content/pages';
import { createMetadata } from '@/lib/seo';
const c = pages.contact;
export const metadata: Metadata = createMetadata({ title: c.title, description: c.intro, path: '/contact' });
export default function ContactPage() {
  return <main id="main-content"><RouteHero eyebrow={c.eyebrow} title={c.title} intro={c.intro} image="/placeholders/hero.jpg" /><InquiryForm />
    <section className="px-5 py-20 sm:px-8"><div className="mx-auto grid max-w-content gap-10 lg:grid-cols-[1.4fr_1fr]"><Reveal><h2 className="mb-6 font-display text-3xl">{c.mapTitle}</h2><ContactMap /><p className="mt-4 text-sm text-navy/70">{c.hours} · {c.reply}</p></Reveal><Reveal><h2 className="mb-6 font-display text-3xl">{c.faqTitle}</h2><Accordion items={c.faq.map((item) => ({ title: item.question, content: item.answer }))} /></Reveal></div></section>
  </main>;
}
