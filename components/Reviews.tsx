'use client';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { reviews, type Review } from '@/data/reviews';
import { home } from '@/content/home';
import { Reveal } from './Reveal';
function ReviewCard({ review, large = false }: { review: Review; large?: boolean }) {
  return <article className={`flex h-full flex-col rounded-brand border border-navy/10 bg-white p-6 shadow-soft ${large ? 'min-h-[350px] sm:p-9' : 'min-h-[300px]'}`}>
    <span className="text-[10px] font-bold uppercase tracking-[.15em] text-navy/70">{home.reviews.placeholder}</span>
    <Quote size={large ? 38 : 28} className="mt-5 text-turquoise" aria-hidden="true" />
    <blockquote className={`mt-4 flex-1 font-display leading-snug ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{review.quote}</blockquote>
    <div className="mt-6 border-t border-navy/10 pt-4"><p className="font-semibold">{review.countryFlag} {review.author}</p><p className="mt-1 text-sm text-navy/70">{review.tripTitle} · {review.rating}</p></div>
  </article>;
}
export function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * (track.current.clientWidth * .8), behavior: 'smooth' });
  return <section aria-labelledby="reviews-title" className="overflow-hidden bg-snow px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content">
    <Reveal><div className="flex flex-wrap gap-2">{home.reviews.badges.map((badge) => <span key={badge} className="rounded-full border border-navy/20 px-3 py-2 text-xs font-semibold text-navy/75">{badge}</span>)}</div><p className="mt-12 text-xs font-bold tracking-[.2em] text-navy/70">{home.reviews.eyebrow}</p><h2 id="reviews-title" className="mt-4 font-display text-4xl sm:text-5xl">{home.reviews.title}</h2><p className="mt-4 max-w-xl leading-7 text-navy/75">{home.reviews.intro}</p></Reveal>
    <Reveal className="mt-10 grid min-w-0 gap-5 lg:grid-cols-[.9fr_1.1fr]"><div className="hidden lg:block"><ReviewCard review={reviews[0]} large /></div><div className="min-w-0"><div className="mb-3 flex justify-end gap-2"><button type="button" aria-label={home.reviews.previous} onClick={() => move(-1)} className="rounded-full border border-navy/25 p-3 hover:bg-navy hover:text-white"><ArrowLeft size={19} /></button><button type="button" aria-label={home.reviews.next} onClick={() => move(1)} className="rounded-full border border-navy/25 p-3 hover:bg-navy hover:text-white"><ArrowRight size={19} /></button></div><div ref={track} tabIndex={0} aria-label={home.reviews.title} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 focus-visible:rounded-brand"><div className="w-[min(85vw,380px)] shrink-0 snap-start lg:hidden"><ReviewCard review={reviews[0]} large /></div>{reviews.slice(1).map((review) => <div key={review.id} className="w-[min(85vw,350px)] shrink-0 snap-start"><ReviewCard review={review} /></div>)}</div></div></Reveal>
  </div></section>;
}
