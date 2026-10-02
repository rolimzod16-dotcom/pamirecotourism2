'use client';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Compass, MessageCircle, Mountain } from 'lucide-react';
import { home } from '@/content/home';
import { Reveal } from './Reveal';
const icons = { message: MessageCircle, route: Compass, check: Check, mountain: Mountain };
export function ProcessSteps() {
  const reduced = useReducedMotion();
  return <section aria-labelledby="process-title" className="bg-snow px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><p className="text-xs font-bold tracking-[.2em] text-navy/70">{home.process.eyebrow}</p><h2 id="process-title" className="mt-4 font-display text-4xl sm:text-5xl">{home.process.title}</h2></Reveal>
    <div className="relative mt-12"><motion.div aria-hidden="true" className="absolute bottom-12 left-6 top-4 w-px origin-top bg-turquoise md:bottom-auto md:left-8 md:right-8 md:top-8 md:h-px md:w-auto md:origin-left" initial={reduced ? false : { scaleY: 0, scaleX: 0 }} whileInView={{ scaleY: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} /><div className="relative grid gap-8 md:grid-cols-4 md:gap-6">{home.process.steps.map((step, index) => { const Icon = icons[step.icon]; return <Reveal key={step.title}><article className="grid grid-cols-[3rem_1fr] gap-4 md:block"><span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-turquoise bg-snow text-navy"><Icon size={22} aria-hidden="true" /></span><div><span className="mt-5 block text-xs font-bold tracking-wider text-navy/65">0{index + 1}</span><h3 className="mt-2 font-display text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-6 text-navy/75">{step.text}</p></div></article></Reveal>; })}</div></div>
    <Reveal className="mt-16 rounded-brand border border-navy/10 bg-white p-6 shadow-soft sm:p-8"><h3 className="font-display text-2xl">{home.process.infoTitle}</h3><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-navy/75">{home.process.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-semibold underline underline-offset-4">{home.process.infoLink}<ArrowUpRight size={17} aria-hidden="true" /></Link></Reveal>
  </div></section>;
}
