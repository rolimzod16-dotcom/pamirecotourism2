'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, User, X, Compass } from 'lucide-react';
import { chrome } from '@/content/chrome';

const c = chrome.header;
const links = [
  { label: 'Home', href: '/' },
  { label: 'Tours & Activities', href: '/tours' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function Mark() {
  return <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden="true"><rect width="48" height="48" rx="12" fill="#0f5132" /><path d="M7 35 L17 16 L24 27 L31 12 L41 35 Z" fill="#F8F6F0" /><circle cx="35" cy="13" r="2.6" fill="#CA8A04" /></svg>;
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  const active = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-3 focus:py-2 focus:text-pine">{c.skip}</a>
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-12">
        <Link href="/" aria-label={c.home} className="flex shrink-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
          <Mark />
          <span className="flex flex-col"><span className="font-display text-base font-semibold leading-none tracking-tight text-pine sm:text-lg xl:text-xl">Pamir Ecotourism</span><span className="mt-0.5 hidden font-display text-[11px] font-bold uppercase tracking-wider text-slate 2xl:block">Tajikistan Expeditions</span></span>
        </Link>
        <nav aria-label={c.mainNav} className="hidden items-center gap-5 xl:flex">
          {links.map((item) => <Link key={item.href} href={item.href} aria-current={active(item.href) ? 'page' : undefined} className={`whitespace-nowrap py-1 font-display text-sm font-semibold transition-colors ${active(item.href) ? 'relative text-pine after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-pine' : 'text-ink/70 hover:text-ink'}`}>{item.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <a className="hidden items-center gap-1.5 whitespace-nowrap font-display text-[13px] font-semibold text-ink/70 transition-colors hover:text-pine 2xl:flex" href="tel:+992936001936"><Phone size={16} className="text-pine" aria-hidden="true" />+992 93 600 1936</a>
          <span className="hidden items-center rounded-lg bg-mist px-2 py-1 font-display text-[11px] font-bold text-ink sm:flex"><span className="mr-1 text-slate">USD</span><ChevronDown size={14} aria-hidden="true" /></span>
          <Link href="/#booking-form" className="inline-flex items-center gap-2 rounded-xl bg-forest px-2.5 py-2.5 font-display text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-leaf sm:px-5"><Compass size={18} aria-hidden="true" /><span className="hidden sm:inline">Book Expedition</span></Link>
          <Link href="/contact" aria-label="Contact the team" className="hidden h-8 w-8 items-center justify-center rounded-full bg-pine text-white sm:flex"><User size={16} aria-hidden="true" /></Link>
          <button type="button" aria-label={mobileOpen ? c.closeMenu : c.openMenu} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-pine xl:hidden">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {mobileOpen && <nav id="mobile-navigation" aria-label={c.mobileNav} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-pine/10 bg-paper px-6 pb-8 pt-3 xl:hidden">
        <details className="border-b border-pine/10 py-3"><summary className="flex min-h-11 cursor-pointer items-center font-display text-xl text-ink">Tours & Activities</summary><div className="flex flex-col gap-1 pb-2 pl-4"><Link onClick={() => setMobileOpen(false)} href="/tours" className="flex min-h-11 items-center text-sm text-ink/80">{c.allTours}</Link><Link onClick={() => setMobileOpen(false)} href="/tours?category=trekking" className="flex min-h-11 items-center text-sm text-ink/80">{c.trekking}</Link><Link onClick={() => setMobileOpen(false)} href="/tours?category=driving" className="flex min-h-11 items-center text-sm text-ink/80">{c.driving}</Link></div></details>
        {links.filter((item) => item.href !== '/tours' && item.href !== '/').map((item) => <Link key={item.href} onClick={() => setMobileOpen(false)} href={item.href} className="block border-b border-pine/10 py-4 font-display text-xl text-ink">{item.label}</Link>)}
        <Link onClick={() => setMobileOpen(false)} href="/" className="block border-b border-pine/10 py-4 font-display text-xl text-ink">Home</Link>
        <Link onClick={() => setMobileOpen(false)} href="/#booking-form" className="mt-6 block rounded-xl bg-forest px-5 py-4 text-center font-display font-semibold text-white">Book Expedition</Link>
      </nav>}
    </header>
  </>;
}
