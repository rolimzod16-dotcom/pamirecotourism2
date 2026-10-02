'use client';
import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, Mountain, Send } from 'lucide-react';
import { catalogTours } from '@/content/expedition-home';
import { destinations } from '@/data/destinations';
import { site } from '@/data/site';
import { tours } from '@/data/tours';
import { useExpedition } from './ExpeditionProvider';

const groups = [
  { value: '1', label: 'Solo Traveler (Open to car-sharing)', size: 1 },
  { value: '2', label: '2 Travelers (Private or Shared)', size: 2 },
  { value: '4', label: '3 - 4 Travelers (Private 4x4)', size: 4 },
  { value: '5', label: '5+ Group (Multiple Vehicles)', size: 5 },
];

export function BookingSection() {
  const { tour, setTour } = useExpedition();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trip = params.get('trip');
    if (trip && (trip === 'custom' || tours.some((item) => item.slug === trip))) setTour(trip);
  }, [setTour]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const notes = String(data.get('notes') ?? '').trim();
    const dates = String(data.get('dates') ?? '').trim();
    const group = groups.find((item) => item.value === String(data.get('group'))) ?? groups[1];
    const website = String(data.get('website') ?? '');
    if (!name) { setError('Enter your full name.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email address.'); return; }
    if (phone.length < 5) { setError('Enter a WhatsApp number with country code.'); return; }
    const destination = new URLSearchParams(window.location.search).get('destination') ?? '';
    const place = destinations.find((item) => item.slug === destination);
    const specialRequest = [place ? `Interested in ${place.name}.` : '', notes].filter(Boolean).join(' ');
    setStatus('sending'); setError('');
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        name, email, website,
        message: JSON.stringify({ activity: tour, destination: place ? place.slug : '', specialRequest, preferredDate: dates || 'Dates to confirm', groupSize: group.size, flexible: true, phone, contactMethod: 'WhatsApp' }),
      }) });
      if (!response.ok) throw new Error('Inquiry failed');
      setStatus('success');
    } catch { setStatus('error'); setError('We could not send that inquiry. Please try again or message us on WhatsApp.'); }
  };

  return <section id="booking-form" className="scroll-mt-24 bg-sand px-6 py-20 lg:px-12">
    <div id="inquiry" className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-12">
      <div className="flex flex-col gap-8 lg:col-span-5">
        <div>
          <p className="font-display text-[13px] font-bold uppercase tracking-widest text-leaf">Direct Local Communication</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Let&apos;s Plan Your Tajik Expedition</h2>
          <p className="mt-3 text-base leading-7 text-slate">Questions about altitude, GBAO permits, vehicle sharing, or weather windows? Message the team in Rushan directly.</p>
        </div>
        <a href="https://wa.me/992936001936" className="flex items-center gap-4 rounded-2xl bg-paper p-6 shadow-md">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#92f5a4] text-leaf"><MessageCircle size={28} aria-hidden="true" /></span>
          <span><span className="block font-display text-[11px] font-bold uppercase text-slate">Instant Field Desk</span><span className="block font-display text-xl font-bold text-pine">+992 93 600 1936</span><span className="block text-xs text-ink/70">Active 7 days a week via WhatsApp</span></span>
        </a>
        <ul className="flex flex-col gap-4 text-sm leading-6 text-ink">
          {['Free itinerary adjustments and pacing conversations.', 'Help with GBAO permit questions and Lake Sarez access.', 'Village homestays that pay mountain families directly.'].map((item) => <li key={item} className="flex items-start gap-3"><CheckCircle2 size={20} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />{item}</li>)}
        </ul>
        <div className="rounded-2xl bg-mist p-6"><p className="inline-flex items-center gap-2 font-display text-base font-bold text-pine"><Mountain size={18} aria-hidden="true" />Mountain Field Headquarters</p><p className="mt-2 text-sm leading-6 text-ink/70">{site.address}</p></div>
      </div>
      <div className="rounded-2xl bg-paper p-8 shadow-xl sm:p-10 lg:col-span-7">
        {status === 'success' ? <div role="status"><h3 className="font-display text-2xl font-bold text-ink">Tashakkur. Your inquiry is in.</h3><p className="mt-3 text-sm leading-6 text-slate">The Rushan team will review the route. This form is received by the site, so please also message WhatsApp if your dates are soon.</p><a href="https://wa.me/992936001936" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-3 font-display font-semibold text-white">Message WhatsApp</a></div> : <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
          <div><h3 className="font-display text-2xl font-bold text-ink">Expedition Inquiry Form</h3><p className="mt-1 text-xs text-slate">Tell us the dates you have in mind. The team will reply with a route and a written price.</p></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 font-display text-[13px] font-semibold" htmlFor="lead_name">Your Full Name *<input id="lead_name" name="name" required autoComplete="name" placeholder="e.g. Sarah Jenkins" className="rounded-xl bg-mist px-4 py-3 text-sm font-normal text-ink placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-pine/20" /></label>
            <label className="flex flex-col gap-1.5 font-display text-[13px] font-semibold" htmlFor="lead_email">Email Address *<input id="lead_email" name="email" type="email" required autoComplete="email" placeholder="sarah@example.com" className="rounded-xl bg-mist px-4 py-3 text-sm font-normal text-ink placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-pine/20" /></label>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 font-display text-[13px] font-semibold" htmlFor="lead_whatsapp">WhatsApp Number *<input id="lead_whatsapp" name="phone" type="tel" required autoComplete="tel" placeholder="+44 7911 123456" className="rounded-xl bg-mist px-4 py-3 text-sm font-normal text-ink placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-pine/20" /></label>
            <label className="flex flex-col gap-1.5 font-display text-[13px] font-semibold" htmlFor="lead_tour">Desired Expedition *<select id="lead_tour" value={tour} onChange={(event) => setTour(event.target.value)} className="cursor-pointer rounded-xl bg-mist px-4 py-3 text-sm font-normal text-ink focus:outline-none focus:ring-2 focus:ring-pine/20">{catalogTours.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}<option value="custom">Custom Private Route</option></select></label>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 font-display text-[13px] font-semibold" htmlFor="group_size">Estimated Travelers *<select id="group_size" name="group" defaultValue="2" className="cursor-pointer rounded-xl bg-mist px-4 py-3 text-sm font-normal text-ink focus:outline-none focus:ring-2 focus:ring-pine/20">{groups.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label className="flex flex-col gap-1.5 font-display text-[13px] font-semibold" htmlFor="target_dates">Approximate Travel Month / Year<input id="target_dates" name="dates" placeholder="e.g. July - August 2026" className="rounded-xl bg-mist px-4 py-3 text-sm font-normal text-ink placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-pine/20" /></label>
          </div>
          <label className="flex flex-col gap-1.5 font-display text-[13px] font-semibold" htmlFor="lead_notes">Special Requests, Dietary & High Altitude Experience<textarea id="lead_notes" name="notes" rows={3} placeholder="Fitness, passes you want to see, or the language you prefer for your guide." className="rounded-xl bg-mist px-4 py-3 text-sm font-normal text-ink placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-pine/20" /></label>
          <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="lead_website">Leave empty</label><input id="lead_website" name="website" tabIndex={-1} autoComplete="off" /></div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-6 py-4 font-display text-base font-bold text-white shadow-md transition-colors hover:bg-leaf disabled:opacity-60"><Send size={18} aria-hidden="true" />{status === 'sending' ? 'Sending…' : 'Send Expedition Inquiry'}</button>
          <p className="text-center text-[11px] text-slate">We aim to reply within 24 hours. Your details are used only to plan this expedition.</p>
        </form>}
      </div>
    </div>
  </section>;
}
