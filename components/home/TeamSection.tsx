import Image from 'next/image';
import { leaders } from '@/content/expedition-home';

export function TeamSection() {
  return <section className="bg-sand px-6 py-20 lg:px-12">
    <div className="mx-auto flex max-w-7xl flex-col gap-12">
      <div className="max-w-2xl">
        <p className="font-display text-[13px] font-bold uppercase tracking-widest text-leaf">Experienced High-Altitude Professionals</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Meet Your Pamir Expedition Leaders</h2>
        <p className="mt-3 text-base leading-7 text-slate">Born and raised in the mountain villages of Gorno-Badakhshan, the leadership team combines guiding experience with community-based hospitality.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {leaders.map((member) => <article key={member.name} className="group flex flex-col overflow-hidden rounded-2xl bg-paper shadow-md">
          <div className="relative h-64 overflow-hidden"><Image src={member.portrait} alt={`Portrait of ${member.name}, ${member.role}`} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" /><span className="absolute bottom-3 left-3 rounded bg-ink/75 px-2.5 py-1 font-display text-[11px] font-semibold text-white">{member.badge}</span></div>
          <div className="flex flex-col gap-1 p-5"><h3 className="font-display text-lg font-bold text-ink">{member.name}</h3><p className="font-display text-[11px] font-semibold text-leaf">{member.role}</p><p className="mt-2 text-xs leading-5 text-slate">{member.bio}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}
