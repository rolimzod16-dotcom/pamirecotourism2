import { BadgeCheck, BadgeDollarSign, House, LifeBuoy, Route, SlidersHorizontal, type LucideIcon } from 'lucide-react';

const points: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Route, title: 'Wide Variety of Custom Routes', text: 'From relaxed photography overland trips to challenging high-pass treks, itineraries are shaped around your endurance and timeline.' },
  { icon: SlidersHorizontal, title: 'Personalized Matching', text: 'Solo travelers sharing a vehicle, couples, and photography groups each get a plan built around how they want to travel.' },
  { icon: LifeBuoy, title: '24/7 Mountain Field Support', text: 'Ask us about communication on the road, high-pass vehicle support, and WhatsApp contact with the Rushan team.' },
  { icon: House, title: 'Handpicked Family Homestays', text: 'Stay in traditional Pamiri houses, share the family table, and put the night’s payment directly into the village.' },
  { icon: BadgeDollarSign, title: 'Transparent Direct Pricing', text: 'Published prices are the operator’s own tariffs. Permits, fuel, lodging, and guiding are confirmed in a written quote.' },
  { icon: BadgeCheck, title: 'Multilingual Native Team', text: 'Guides who work in English, French, Russian, Tajik, and Pamiri dialects, and who can explain the places you pass through.' },
];

export function WhyChoose() {
  return <section className="bg-paper px-6 py-20 lg:px-12">
    <div className="mx-auto flex max-w-7xl flex-col gap-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-[13px] font-bold uppercase tracking-widest text-leaf">Community-Rooted Sustainable Tourism</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Why Discerning Adventurers Choose Us</h2>
        <p className="mt-4 text-base leading-7 text-slate">We operate directly from Rushan, GBAO. Your plan starts with the local team, and the details are confirmed before you travel.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {points.map(({ icon: Icon, title, text }) => <article key={title} className="flex flex-col gap-4 rounded-2xl bg-mist p-8 transition-colors hover:bg-[#eaedff]"><div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forest text-white shadow-sm"><Icon size={26} aria-hidden="true" /></div><h3 className="font-display text-xl font-bold text-ink">{title}</h3><p className="text-sm leading-6 text-ink/70">{text}</p></article>)}
      </div>
    </div>
  </section>;
}
