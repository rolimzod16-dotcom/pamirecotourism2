'use client';
import Link from 'next/link';
import { pages } from '@/content/pages';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { const c = pages.system; return <main id="main-content" className="flex min-h-[70vh] flex-col items-center justify-center bg-snow px-5 pt-20 text-center"><h1 className="font-display text-4xl sm:text-6xl">{c.errorTitle}</h1><p className="mt-5 text-navy/75">{c.errorText}</p><div className="mt-8 flex gap-3"><button type="button" onClick={reset} className="rounded-brand bg-gold px-5 py-3 font-bold text-navy">{c.retry}</button><Link href="/" className="rounded-brand border border-navy px-5 py-3 font-bold">{c.home}</Link></div></main>; }
