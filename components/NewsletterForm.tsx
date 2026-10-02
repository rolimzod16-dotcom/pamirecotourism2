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
  return <div className="pt-2"><h3 className="font-display text-[13px] font-semibold text-ink">Route Updates & Early Notes</h3><form onSubmit={submit} noValidate className="mt-2 flex gap-2"><label htmlFor="newsletter-email" className="sr-only">{c.label}</label><input id="newsletter-email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setValidation(''); }} placeholder={c.placeholder} aria-invalid={!!validation} aria-describedby="newsletter-status" className="w-full rounded-xl bg-white px-3.5 py-2 text-sm text-ink placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-pine/20" /><div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="newsletter-website">{c.label}</label><input id="newsletter-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div><button type="submit" disabled={status === 'loading'} className="shrink-0 rounded-xl bg-forest px-4 py-2 font-display text-[13px] font-semibold text-white transition-colors hover:bg-leaf disabled:opacity-60">{status === 'loading' ? c.sending : 'Join'}</button></form><p id="newsletter-status" role={validation || status === 'error' ? 'alert' : 'status'} aria-live="polite" className="mt-2 text-xs leading-5 text-slate">{validation || (status === 'success' ? c.success : status === 'error' ? c.error : '')}</p></div>;
}
