'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

const menus = [
  { label: 'Tours', href: '/tours', links: [{ label: 'All tours', href: '/tours' }, { label: 'Trekking', href: '/tours?category=trekking' }, { label: '4x4 & road trips', href: '/tours?category=driving' }] },
  { label: 'Destinations', href: '/destinations', links: [{ label: 'All destinations', href: '/destinations' }, { label: 'Lakes', href: '/destinations?group=lakes' }, { label: 'Mountains & valleys', href: '/destinations?group=mountains' }, { label: 'Historic cities', href: '/destinations?group=cities' }] },
];
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-brand focus:bg-white focus:p-3">Skip to content</a>
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || mobileOpen ? 'bg-navy text-white shadow-soft' : 'bg-transparent text-navy'}`}>
      <div className="mx-auto flex h-20 max-w-content items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="Pamir Ecotourism home" className="relative z-10 flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-current/40 font-display text-xl">P</span>
          <span className="font-display text-lg font-semibold leading-none sm:text-xl">Pamir<br /><span className="text-sm font-normal tracking-[.16em]">ECOTOURISM</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {menus.map((menu) => <div key={menu.label} className="group relative">
            <Link href={menu.href} className="flex items-center gap-1 py-7 text-sm font-medium hover:text-gold focus-visible:text-gold">{menu.label}<ChevronDown size={15} aria-hidden="true" /></Link>
            <div className="invisible absolute left-0 top-full min-w-56 translate-y-2 rounded-brand border border-navy/10 bg-white p-2 text-navy opacity-0 shadow-soft transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {menu.links.map((item) => <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-sm hover:bg-snow focus:bg-snow">{item.label}</Link>)}
            </div>
          </div>)}
          <Link href="/gallery" className="text-sm font-medium hover:text-gold">Gallery</Link><Link href="/about" className="text-sm font-medium hover:text-gold">About</Link><Link href="/contact" className="text-sm font-medium hover:text-gold">Contact</Link>
        </nav>
        <Link href="/contact" className="hidden items-center gap-2 rounded-brand bg-gold px-5 py-3 text-sm font-semibold text-navy transition hover:bg-white lg:flex">Plan your trip <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 lg:hidden">{mobileOpen ? <X /> : <Menu />}</button>
      </div>
      {mobileOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/15 bg-navy px-5 pb-8 pt-3 text-white lg:hidden">
        {menus.map((menu) => <details key={menu.label} className="border-b border-white/15 py-3"><summary className="cursor-pointer py-2 font-display text-xl">{menu.label}</summary><div className="flex flex-col gap-1 pl-4">{menu.links.map((item) => <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href} className="py-2 text-sm text-white/80">{item.label}</Link>)}</div></details>)}
        {[['Gallery','/gallery'],['About','/about'],['Contact','/contact']].map(([label, href]) => <Link key={href} onClick={() => setMobileOpen(false)} href={href} className="block border-b border-white/15 py-5 font-display text-xl">{label}</Link>)}
        <Link onClick={() => setMobileOpen(false)} href="/contact" className="mt-6 block rounded-brand bg-gold px-5 py-4 text-center font-semibold text-navy">Plan your trip</Link>
      </nav>}
    </header>
  </>;
}
