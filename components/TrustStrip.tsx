import { home } from '@/content/home';
export function TrustStrip() {
  return <div className="w-full border-t border-white/25 bg-navy/75 text-white backdrop-blur-md"><div className="mx-auto grid max-w-content grid-cols-2 gap-x-5 gap-y-5 px-5 py-5 sm:px-8 md:grid-cols-4 md:gap-8 md:py-6">
    {home.trust.map((item) => <div key={item.label} className="border-l border-gold/70 pl-3 sm:pl-5"><strong className="block font-display text-lg leading-tight sm:text-2xl">{item.value}</strong><span className="mt-1 block text-xs text-white/80 sm:text-sm">{item.label}</span></div>)}
  </div></div>;
}
