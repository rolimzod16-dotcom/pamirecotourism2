import { Compass, House, ShieldCheck, Users } from 'lucide-react';
import { home } from '@/content/home';
import { Reveal } from './Reveal';
const icons = { home: House, compass: Compass, shield: ShieldCheck, users: Users };
export function WhyUs() {
  return <section id="why-us" aria-labelledby="why-title" className="bg-navy px-5 py-20 text-snow sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><p className="text-xs font-bold tracking-[.2em] text-gold">{home.why.eyebrow}</p><h2 id="why-title" className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">{home.why.title}</h2></Reveal><div className="mt-12 grid gap-4 md:grid-cols-2">{home.why.points.map((point) => { const Icon = icons[point.icon]; return <Reveal key={point.title}><article className="h-full rounded-brand border border-white/15 bg-white/5 p-6 sm:p-8"><Icon size={30} strokeWidth={1.5} className="text-gold" aria-hidden="true" /><h3 className="mt-6 font-display text-2xl">{point.title}</h3><p className="mt-3 max-w-md leading-7 text-snow/80">{point.text}</p></article></Reveal>; })}</div></div></section>;
}
