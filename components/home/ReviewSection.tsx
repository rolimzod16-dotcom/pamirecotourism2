import { Star } from 'lucide-react';
import { stories } from '@/content/expedition-home';

export function ReviewSection() {
  return <section className="bg-paper px-6 py-20 lg:px-12">
    <div className="mx-auto flex max-w-7xl flex-col gap-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-[13px] font-bold uppercase tracking-widest text-leaf">Stories From The Road</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">What Fellow Trekkers Say</h2>
        <p className="mt-3 text-base leading-7 text-slate">Notes from travelers who crossed the Pamirs with the local team.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {stories.map((story) => <article key={story.name} className="flex flex-col justify-between gap-6 rounded-2xl bg-mist p-8 shadow-sm">
          <div><div className="flex gap-1 text-saffron" aria-label="5 star rating">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} className="fill-saffron" aria-hidden="true" />)}</div><p className="mt-4 text-sm italic leading-6 text-ink/75">“{story.quote}”</p></div>
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-pine font-display text-sm font-bold text-white">{story.initials}</div><div><p className="font-display text-[15px] font-bold text-ink">{story.name}</p><p className="text-[11px] text-slate">{story.meta}</p></div></div>
        </article>)}
      </div>
    </div>
  </section>;
}
