import Image from 'next/image';
import { routesCopy } from '@/content/routes';
import { Reveal } from './Reveal';
export function RouteHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image: string }) {
  return <section className="relative isolate flex min-h-[390px] items-end overflow-hidden bg-navy px-5 pb-14 pt-36 text-white sm:px-8 sm:pb-20"><Image src={image} alt={routesCopy.common.mountainAlt} fill priority sizes="100vw" className="-z-20 object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/30" /><Reveal className="mx-auto w-full max-w-content"><p className="text-xs font-bold tracking-[.2em] text-gold">{eyebrow}</p><h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">{intro}</p></Reveal></section>;
}
