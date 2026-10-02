'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { home } from '@/content/home';
import { TrustStrip } from './TrustStrip';
export function Hero() {
  const reduced = useReducedMotion();
  const [allowVideo, setAllowVideo] = useState(false);
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setAllowVideo(!connection?.saveData && connection?.effectiveType !== 'slow-2g' && connection?.effectiveType !== '2g');
  }, []);
  const reveal = (delay: number) => ({ initial: reduced ? false : { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay } });
  return <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy text-white">
    <Image src="/placeholders/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
    {!reduced && allowVideo && <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/placeholders/hero.jpg" aria-hidden="true"><source src="/placeholders/hero.mp4" type="video/mp4" /></video>}
    <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/45" aria-hidden="true" /><div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/25" aria-hidden="true" />
    <div className="relative mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-5 pb-10 pt-28 sm:px-8 md:pb-14">
      <motion.p {...reveal(.1)} className="mb-5 text-xs font-semibold tracking-[.25em] text-gold sm:text-sm">{home.hero.eyebrow}</motion.p>
      <motion.h1 {...reveal(.22)} id="hero-title" className="max-w-4xl font-display text-[clamp(3.25rem,8.4vw,7.6rem)] font-medium leading-[.98] tracking-[-.045em]">{home.hero.title}</motion.h1>
      <motion.p {...reveal(.38)} className="mt-7 max-w-xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">{home.hero.subtitle}</motion.p>
      <motion.div {...reveal(.5)} className="mt-9 flex flex-wrap gap-3"><Link href="/tours" className="inline-flex min-h-12 items-center gap-2 rounded-brand bg-gold px-6 py-3 font-semibold text-navy transition hover:bg-white">{home.hero.explore}<ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#inquiry" className="inline-flex min-h-12 items-center rounded-brand border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-navy">{home.hero.plan}</a></motion.div>
      <motion.a {...reveal(.7)} href="#journeys" className="mt-10 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[.15em] text-white/85 hover:text-white"><ArrowDown size={18} aria-hidden="true" />{home.hero.scroll}</motion.a>
    </div><div className="relative"><TrustStrip /></div>
  </section>;
}
