'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { home } from '@/content/home';
import { destinations } from '@/data/destinations';
import { tours } from '@/data/tours';
import { site } from '@/data/site';
import { Reveal } from './Reveal';
const c = home.inquiry;
const tripSchema = z.object({ activity: z.string().min(1, c.required), destination: z.string(), specialRequest: z.string() });
const detailsSchema = z.object({ preferredDate: z.string().min(1, c.required), groupSize: z.number().int().min(1, c.invalidGroup), flexible: z.boolean() });
const contactSchema = z.object({ name: z.string().trim().min(1, c.required), email: z.string().email(c.invalidEmail), phone: z.string().trim().min(5, c.invalidPhone), contactMethod: z.enum(['Email', 'WhatsApp']), website: z.string() });
const schema = tripSchema.merge(detailsSchema).merge(contactSchema);
type Values = z.infer<typeof schema>;
const fields: FieldPath<Values>[][] = [['activity', 'destination', 'specialRequest'], ['preferredDate', 'groupSize', 'flexible'], ['name', 'email', 'phone', 'contactMethod']];
const input = 'w-full min-h-12 rounded-brand border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/55 focus:border-gold';
const label = 'mb-2 block text-sm font-semibold';
function FieldError({ message }: { message?: string }) { return message ? <p role="alert" className="mt-1 text-sm text-[#FFD6A0]">{message}</p> : null; }
export function InquiryForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const stepRegion = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);
  const { register, getValues, setValue, setError, clearErrors, handleSubmit, formState: { errors } } = useForm<Values>({ defaultValues: { activity: '', destination: '', specialRequest: '', preferredDate: '', groupSize: 2, flexible: false, name: '', email: '', phone: '', contactMethod: 'Email', website: '' }, shouldUnregister: false });
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trip = params.get('trip'); const destination = params.get('destination');
    if (trip && tours.some((tour) => tour.slug === trip)) setValue('activity', trip);
    if (destination && destinations.some((place) => place.slug === destination)) setValue('destination', destination);
  }, [setValue]);
  useEffect(() => { if (hasMounted.current) stepRegion.current?.querySelector<HTMLElement>('input:not([type="hidden"]), select, textarea')?.focus(); else hasMounted.current = true; }, [step]);
  const validateStep = (index: number) => {
    const section = index === 0 ? tripSchema : index === 1 ? detailsSchema : contactSchema;
    const result = section.safeParse(getValues());
    clearErrors(fields[index]);
    if (result.success) return true;
    for (const issue of result.error.issues) setError(issue.path[0] as FieldPath<Values>, { type: 'manual', message: issue.message });
    return false;
  };
  const next = () => { if (validateStep(step)) setStep(step + 1); };
  const submit = async (values: Values) => {
    if (!validateStep(2)) return;
    const parsed = schema.safeParse(values);
    if (!parsed.success) return;
    if (values.website) { setStatus('success'); return; } // Honeypot: accept visually, do not send.
    setStatus('sending');
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        name: values.name, email: values.email, website: values.website,
        message: JSON.stringify({ activity: values.activity, destination: values.destination, specialRequest: values.specialRequest, preferredDate: values.preferredDate, groupSize: values.groupSize, flexible: values.flexible, phone: values.phone, contactMethod: values.contactMethod }),
      }) });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch { setStatus('error'); }
  };
  return <section id="inquiry" aria-labelledby="inquiry-title" className="scroll-mt-20 bg-navy px-5 py-20 text-white sm:px-8 lg:py-28"><div className="mx-auto max-w-content"><Reveal><p className="text-xs font-bold tracking-[.2em] text-gold">{c.eyebrow}</p><h2 id="inquiry-title" className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">{c.title}</h2><p className="mt-5 text-white/75">{c.reply}</p></Reveal>
    <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]"><Reveal className="min-w-0 rounded-brand border border-white/15 bg-white/5 p-5 shadow-soft sm:p-8">
      {status === 'success' ? <div role="status" className="py-8"><h3 className="font-display text-3xl">{c.successTitle}</h3><p className="mt-4 max-w-xl leading-7 text-white/80">{c.successBody}</p><a href={`https://wa.me/${site.phoneHref.slice(1)}`} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-brand bg-gold px-5 py-3 font-bold text-navy"><MessageCircle size={18} aria-hidden="true" />{c.chat}</a></div> : <form noValidate onSubmit={handleSubmit(submit)}>
        <div className="flex items-center justify-between gap-3 text-sm"><span aria-live="polite">{c.stepAnnouncement} {step + 1} / 3 — {c.steps[step]}</span><span>{Math.round((step + 1) / 3 * 100)}%</span></div><div role="progressbar" aria-label={c.progress} aria-valuemin={0} aria-valuemax={3} aria-valuenow={step + 1} className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full bg-gold transition-all" style={{ width: `${(step + 1) / 3 * 100}%` }} /></div>
        <div ref={stepRegion} className="mt-8 min-h-[265px] space-y-5">
          {step === 0 && <><div><label htmlFor="activity" className={label}>{c.activity}</label><select id="activity" {...register('activity')} aria-invalid={!!errors.activity} aria-describedby={errors.activity ? 'activity-error' : undefined} className={input}><option value="" className="text-navy">{c.activityPrompt}</option>{tours.map((tour) => <option key={tour.slug} value={tour.slug} className="text-navy">{tour.title}</option>)}</select><div id="activity-error"><FieldError message={errors.activity?.message}/></div></div><div><label htmlFor="destination" className={label}>{c.destination}</label><select id="destination" {...register('destination')} className={input}><option value="" className="text-navy">{c.destinationPrompt}</option>{destinations.map((destination) => <option key={destination.slug} value={destination.slug} className="text-navy">{destination.name}</option>)}</select></div><div><label htmlFor="specialRequest" className={label}>{c.special}</label><textarea id="specialRequest" {...register('specialRequest')} rows={3} placeholder={c.specialPrompt} className={input} /></div></>}
          {step === 1 && <><div><label htmlFor="preferredDate" className={label}>{c.date}</label><input id="preferredDate" {...register('preferredDate')} aria-invalid={!!errors.preferredDate} placeholder={c.datePrompt} className={input} /><FieldError message={errors.preferredDate?.message}/></div><div><label htmlFor="groupSize" className={label}>{c.group}</label><div className="flex w-fit items-center overflow-hidden rounded-brand border border-white/30"><button type="button" aria-label={`${c.group} − 1`} onClick={() => setValue('groupSize', Math.max(1, (getValues('groupSize') || 1) - 1))} className="min-h-12 min-w-12 text-xl hover:bg-white/15">−</button><input id="groupSize" type="number" min="1" {...register('groupSize', { valueAsNumber: true })} aria-invalid={!!errors.groupSize} className="w-16 bg-transparent text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" /><button type="button" aria-label={`${c.group} + 1`} onClick={() => setValue('groupSize', (getValues('groupSize') || 0) + 1)} className="min-h-12 min-w-12 text-xl hover:bg-white/15">+</button></div><FieldError message={errors.groupSize?.message}/></div><label className="flex items-center gap-3 text-sm"><input type="checkbox" {...register('flexible')} className="h-5 w-5 accent-gold" />{c.flexibility}</label></>}
          {step === 2 && <><div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="name" className={label}>{c.name}</label><input id="name" autoComplete="name" {...register('name')} aria-invalid={!!errors.name} className={input} /><FieldError message={errors.name?.message}/></div><div><label htmlFor="email" className={label}>{c.email}</label><input id="email" type="email" autoComplete="email" {...register('email')} aria-invalid={!!errors.email} className={input} /><FieldError message={errors.email?.message}/></div></div><div><label htmlFor="phone" className={label}>{c.phone}</label><input id="phone" type="tel" autoComplete="tel" {...register('phone')} aria-invalid={!!errors.phone} className={input} /><FieldError message={errors.phone?.message}/></div><fieldset><legend className={label}>{c.method}</legend><div className="flex flex-wrap gap-5">{c.methods.map((method) => <label key={method} className="flex items-center gap-2 text-sm"><input type="radio" value={method} {...register('contactMethod')} className="h-4 w-4 accent-gold" />{method}</label>)}</div></fieldset><div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="website">{c.honeypot}</label><input id="website" tabIndex={-1} autoComplete="off" {...register('website')} /></div></>}
        </div>
        {status === 'error' && <p role="alert" className="mb-5 rounded-brand border border-gold/50 p-4 text-[#FFD6A0]">{c.error}</p>}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/15 pt-6">{step > 0 ? <button type="button" onClick={() => { setStep(step - 1); setStatus('idle'); }} className="inline-flex items-center gap-2 rounded-brand border border-white/40 px-5 py-3 font-semibold hover:bg-white/10"><ArrowLeft size={17} aria-hidden="true" />{c.back}</button> : <span />}{step < 2 ? <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-brand bg-gold px-5 py-3 font-bold text-navy hover:bg-white">{c.next}<ArrowRight size={17} aria-hidden="true" /></button> : <button type="submit" disabled={status === 'sending'} className="rounded-brand bg-gold px-5 py-3 font-bold text-navy hover:bg-white disabled:opacity-60">{status === 'sending' ? c.sending : status === 'error' ? c.retry : c.submit}</button>}</div>
      </form>}
    </Reveal><Reveal className="rounded-brand border border-white/15 bg-white/5 p-6 sm:p-8"><h3 className="font-display text-2xl">{c.contactTitle}</h3><p className="mt-3 text-sm leading-6 text-white/75">{c.contactIntro}</p><address className="mt-7 space-y-5 text-sm not-italic"><a href={`https://wa.me/${site.phoneHref.slice(1)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 break-all hover:text-gold"><MessageCircle className="shrink-0 text-gold" size={20} aria-hidden="true" />{c.methods[1]}</a><a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-gold"><Mail className="shrink-0 text-gold" size={20} aria-hidden="true" />{site.email}</a><a href={`tel:${site.phoneHref}`} className="flex items-center gap-3 hover:text-gold"><Phone className="shrink-0 text-gold" size={20} aria-hidden="true" />{site.phone}</a><p className="flex items-start gap-3 leading-6"><MapPin className="mt-0.5 shrink-0 text-gold" size={20} aria-hidden="true" />{site.address}</p></address></Reveal></div>
  </div></section>;
}
