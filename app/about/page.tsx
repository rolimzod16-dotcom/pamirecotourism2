import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Leaf, MapPin, ShieldCheck, Users } from 'lucide-react';
import { RouteHero } from '@/components/RouteHero';
import { TeamGrid } from '@/components/TeamGrid';
import { Reveal } from '@/components/Reveal';
import { pages } from '@/content/pages';
import { createMetadata } from '@/lib/seo';
const c = pages.about;
const icons = { map: MapPin, shield: ShieldCheck, users: Users, leaf: Leaf };
export const metadata: Metadata = createMetadata({ title: c.title, description: c.intro, path: '/about' });
export default function AboutPage() {
  return <main id="main-content"><RouteHero eyebrow={c.eyebrow} title={c.title} intro={c.intro} image="/placeholders/hero.jpg" />
    <section className="px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><h2 className="font-display text-4xl">{c.storyTitle}</h2><div className="mt-6 grid gap-6 text-base leading-8 text-navy/75 md:grid-cols-3">{c.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Reveal></div></section>
    <section className="bg-snow px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><h2 className="font-display text-4xl">{c.valuesTitle}</h2></Reveal><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{c.values.map((value) => { const Icon = icons[value.icon]; return <Reveal key={value.title}><article className="h-full rounded-brand bg-white p-6 shadow-soft"><Icon size={28} className="text-navy" aria-hidden="true" /><h3 className="mt-5 font-display text-2xl">{value.title}</h3><p className="mt-3 text-sm leading-7 text-navy/75">{value.text}</p></article></Reveal>; })}</div></div></section>
    <section className="bg-navy px-5 py-20 text-white sm:px-8"><Reveal className="mx-auto max-w-content"><h2 className="font-display text-4xl">{c.responsibleTitle}</h2><ul className="mt-7 grid list-disc gap-5 pl-5 leading-7 text-white/80 md:grid-cols-3">{c.responsible.map((item) => <li key={item}>{item}</li>)}</ul></Reveal></section>
    <TeamGrid expanded />
    <section className="bg-snow px-5 py-16 sm:px-8"><Reveal className="mx-auto max-w-content"><h2 className="font-display text-3xl">{c.credentialsTitle}</h2><div className="mt-6 flex flex-wrap gap-3">{c.credentials.map((item) => <span key={item} className="rounded-brand border border-navy/20 bg-white px-5 py-4 text-sm font-semibold">{item}</span>)}</div></Reveal></section>
    <aside className="px-5 py-16 sm:px-8"><div className="mx-auto flex max-w-content flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><h2 className="font-display text-3xl">{c.ctaTitle}</h2><Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-brand bg-gold px-5 py-3 font-bold text-navy">{c.ctaButton}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></aside>
  </main>;
}
