import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { team } from '@/data/team';
import { home } from '@/content/home';
import { Reveal } from './Reveal';
export function TeamGrid() {
  return <section aria-labelledby="team-title" className="bg-white px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><p className="text-xs font-bold tracking-[.2em] text-navy/70">{home.team.eyebrow}</p><h2 id="team-title" className="mt-4 font-display text-4xl sm:text-5xl">{home.team.title}</h2><p className="mt-4 max-w-xl leading-7 text-navy/75">{home.team.intro}</p></Reveal>
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{team.map((member, index) => <Reveal key={member.name} className={index < 2 ? 'lg:col-span-2' : ''}><article className="group h-full overflow-hidden rounded-brand bg-snow shadow-soft"><div className={`relative overflow-hidden bg-navy ${index < 2 ? 'aspect-[4/3]' : 'aspect-[4/3] lg:aspect-[4/3]'}`}><Image src={member.portrait} alt={`Placeholder portrait for ${member.name}`} fill sizes={index < 2 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'} className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0" /></div><div className="p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-wider text-navy/65">{member.role}</p><h3 className="mt-2 font-display text-2xl">{member.name}</h3><p className="mt-2 text-sm leading-6 text-navy/75">{member.bio}</p><p className="mt-3 text-xs text-navy/70">{home.team.languages}: {member.languages}</p>{member.instagram && /^https:\/\//.test(member.instagram) && <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} — ${home.team.instagram}`} className="mt-3 inline-flex rounded-lg p-2 hover:bg-navy/10"><Instagram size={20} /></a>}</div></article></Reveal>)}</div>
  </div></section>;
}
