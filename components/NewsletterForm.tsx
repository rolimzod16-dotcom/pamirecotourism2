'use client';
import { useState } from 'react';
import { z } from 'zod';
import { pages } from '@/content/pages';
const c = pages.newsletter;
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [validation, setValidation] = useState('');
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!z.string().email().safeParse(email).success) { setValidation(c.invalid); return; }
    setValidation(''); setStatus('loading');
    try { const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, website }) }); if (!response.ok) throw new Error('Newsletter request failed'); setStatus('success'); }
    catch { setStatus('error'); }
  };
  return <div><h2 className="mb-5 text-xs font-semibold uppercase tracking-[.2em] text-turquoise">{c.title}</h2><p className="mb-4 text-sm leading-6 text-white/70">{c.intro}</p><form onSubmit={submit} noValidate><label htmlFor="newsletter-email" className="sr-only">{c.label}</label><input id="newsletter-email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setValidation(''); }} placeholder={c.placeholder} aria-invalid={!!validation} aria-describedby="newsletter-status" className="w-full rounded-brand border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60" /><div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="newsletter-website">{c.label}</label><input id="newsletter-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div><button type="submit" disabled={status === 'loading'} className="mt-3 rounded-brand bg-gold px-5 py-3 text-sm font-bold text-navy disabled:opacity-60">{status === 'loading' ? c.sending : c.submit}</button></form><p id="newsletter-status" role={validation || status === 'error' ? 'alert' : 'status'} aria-live="polite" className="mt-3 text-xs leading-5 text-white/80">{validation || (status === 'success' ? c.success : status === 'error' ? c.error : '')}</p></div>;
}
