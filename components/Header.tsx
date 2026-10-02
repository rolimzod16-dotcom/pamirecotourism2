'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { chrome } from '@/content/chrome';
import { tours } from '@/data/tours';
import { destinations } from '@/data/destinations';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

const c = chrome.header;
const menus = [
  { label: c.tours, href: '/tours', links: [{ label: c.allTours, href: '/tours' }, { label: c.trekking, href: '/tours?category=trekking' }, { label: c.driving, href: '/tours?category=driving' }, { label: tours[0].title, href: `/tours/${tours[0].slug}` }, { label: tours[3].title, href: `/tours/${tours[3].slug}` }] },
  { label: c.destinations, href: '/destinations', links: [{ label: c.allDestinations, href: '/destinations' }, { label: c.lakes, href: '/destinations?group=lakes' }, { label: c.mountains, href: '/destinations?group=mountains' }, { label: c.cities, href: '/destinations?group=cities' }, { label: destinations[0].name, href: `/destinations/${destinations[0].slug}` }, { label: destinations[3].name, href: `/destinations/${destinations[3].slug}` }] },
];
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-brand focus:bg-white focus:p-3">{c.skip}</a>
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${pathname !== '/' || scrolled || mobileOpen ? 'bg-navy text-white shadow-soft' : 'bg-transparent text-white'}`}>
      <div className="mx-auto flex h-20 max-w-content items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label={c.home} className="relative z-10 flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-current/40 font-display text-xl">P</span>
          <span className="font-display text-lg font-semibold leading-none sm:text-xl">Pamir<br /><span className="text-sm font-normal tracking-[.16em]">ECOTOURISM</span></span>
        </Link>
        <nav aria-label={c.mainNav} className="hidden items-center gap-7 lg:flex">
          {menus.map((menu) => <div key={menu.label} className="group relative">
            <Link href={menu.href} className="flex items-center gap-1 py-7 text-sm font-medium hover:text-gold focus-visible:text-gold">{menu.label}<ChevronDown size={15} aria-hidden="true" /></Link>
            <div className="invisible absolute left-0 top-full min-w-56 translate-y-2 rounded-brand border border-navy/10 bg-white p-2 text-navy opacity-0 shadow-soft transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {menu.links.map((item) => <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-3 text-sm hover:bg-snow focus:bg-snow">{item.label}</Link>)}
            </div>
          </div>)}
          <Link href="/gallery" className="inline-flex min-h-11 items-center text-sm font-medium hover:text-gold">{c.gallery}</Link><Link href="/about" className="inline-flex min-h-11 items-center text-sm font-medium hover:text-gold">{c.about}</Link><Link href="/contact" className="inline-flex min-h-11 items-center text-sm font-medium hover:text-gold">{c.contact}</Link>
        </nav>
        <Link href="/#inquiry" className="hidden items-center gap-2 rounded-brand bg-gold px-5 py-3 text-sm font-semibold text-navy transition hover:bg-white lg:flex">{c.plan} <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button type="button" aria-label={mobileOpen ? c.closeMenu : c.openMenu} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 lg:hidden">{mobileOpen ? <X /> : <Menu />}</button>
      </div>
      {mobileOpen && <nav id="mobile-navigation" aria-label={c.mobileNav} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/15 bg-navy px-5 pb-8 pt-3 text-white lg:hidden">
        {menus.map((menu) => <details key={menu.label} className="border-b border-white/15 py-3"><summary className="flex min-h-11 cursor-pointer items-center py-2 font-display text-xl">{menu.label}</summary><div className="flex flex-col gap-1 pl-4">{menu.links.map((item) => <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href} className="flex min-h-11 items-center py-2 text-sm text-white/85">{item.label}</Link>)}</div></details>)}
        {[[c.gallery,'/gallery'],[c.about,'/about'],[c.contact,'/contact']].map(([label, href]) => <Link key={href} onClick={() => setMobileOpen(false)} href={href} className="block border-b border-white/15 py-5 font-display text-xl">{label}</Link>)}
        <Link onClick={() => setMobileOpen(false)} href="/#inquiry" className="mt-6 block rounded-brand bg-gold px-5 py-4 text-center font-semibold text-navy">{c.plan}</Link>
      </nav>}
    </header>
  </>;
}
