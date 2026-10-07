'use client';

import { useState } from 'react';
import { saveTourAction } from '@/app/admin/actions';
import type { StoredTour } from '@/lib/tour-record';

const field = 'mt-1 w-full rounded-xl border border-pine/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-pine';
const label = 'block text-sm font-semibold';
const regions = [
  ['pamir-highway', 'Pamir Highway'],
  ['fan-mountains', 'Fan Mountains'],
  ['wakhan', 'Wakhan'],
  ['sarez', 'Sarez / Bartang'],
] as const;
const activities = [
  ['4x4', '4x4'],
  ['trekking', 'Треккинг'],
  ['lakes', 'Озёра'],
  ['wildlife', 'Зимняя природа'],
] as const;

function lines(value: string) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

export function TourEditor({ initial, creating }: { initial: StoredTour; creating: boolean }) {
  const [tour, setTour] = useState(initial);
  const [price, setPrice] = useState(initial.price === null ? '' : String(initial.price));
  const [days, setDays] = useState(initial.days === null ? '' : String(initial.days));
  const [included, setIncluded] = useState(initial.included.join('\n'));
  const [excluded, setExcluded] = useState(initial.excluded.join('\n'));
  const [gear, setGear] = useState(initial.gear.join('\n'));
  const [photoPath, setPhotoPath] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof StoredTour>(key: K, value: StoredTour[K]) => setTour((current) => ({ ...current, [key]: value }));
  const toggle = <K extends 'regions' | 'activities'>(key: K, value: StoredTour[K][number]) => {
    const current = tour[key] as string[];
    set(key, (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]) as StoredTour[K]);
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true); setError('');
    try {
      const body = new FormData();
      body.set('file', file);
      const response = await fetch('/api/admin/upload', { method: 'POST', body });
      const payload = await response.json() as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error || 'Фото не загрузилось.');
      set('gallery', [...tour.gallery, { src: payload.url, alt: tour.title || 'Pamir tour photo' }].slice(0, 16));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Фото не загрузилось.');
    } finally { setUploading(false); }
  };

  const save = async () => {
    setSaving(true); setError('');
    const numericPrice = price.trim() === '' ? null : Number(price);
    const numericDays = days.trim() === '' ? null : Number(days);
    const result = await saveTourAction({
      ...tour,
      price: numericPrice !== null && Number.isFinite(numericPrice) ? Math.round(numericPrice) : null,
      days: numericDays !== null && Number.isFinite(numericDays) ? Math.round(numericDays) : null,
      included: lines(included),
      excluded: lines(excluded),
      gear: lines(gear),
      itinerary: tour.itinerary.filter((day) => day.title || day.description),
      faq: tour.faq.filter((item) => item.question || item.answer),
    }, creating);
    if (result?.error) { setError(result.error); setSaving(false); }
  };

  return <form className="grid gap-6" onSubmit={(event) => { event.preventDefault(); void save(); }}>
    {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
    <section className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2">
      <label className={label}>Название<input className={field} value={tour.title} onChange={(event) => set('title', event.target.value)} required /></label>
      <label className={label}>Ссылка{creating ? <input className={field} value={tour.slug} placeholder="pamir-highway" onChange={(event) => set('slug', event.target.value)} /> : <input className={`${field} bg-mist`} value={tour.slug} readOnly />}</label>
      <label className={label}>Категория<select className={field} value={tour.category} onChange={(event) => set('category', event.target.value as StoredTour['category'])}><option value="driving">4x4 / дорога</option><option value="trekking">Треккинг</option></select></label>
      <label className={label}>Цена, USD<input className={field} inputMode="numeric" value={price} placeholder="Пусто = по запросу" onChange={(event) => setPrice(event.target.value)} /></label>
      <label className={label}>Дней<input className={field} inputMode="numeric" value={days} onChange={(event) => setDays(event.target.value)} /></label>
      <label className={label}>Короткий бейдж<input className={field} value={tour.badge} placeholder="8 Days • 4x4 Safari" onChange={(event) => set('badge', event.target.value)} /></label>
      <label className={`${label} sm:col-span-2`}>Короткое описание на карточке<textarea className={field} rows={3} value={tour.blurb} onChange={(event) => set('blurb', event.target.value)} /></label>
      <label className={`${label} sm:col-span-2`}>Полное описание<textarea className={field} rows={5} value={tour.overview} onChange={(event) => set('overview', event.target.value)} /></label>
      <label className={label}>Маршрут<input className={field} value={tour.route} onChange={(event) => set('route', event.target.value)} /></label>
      <label className={label}>Сложность<input className={field} value={tour.level} onChange={(event) => set('level', event.target.value)} /></label>
      <label className={label}>Сезон<input className={field} value={tour.season} onChange={(event) => set('season', event.target.value)} /></label>
      <label className={label}>Группа<input className={field} value={tour.groupSize} onChange={(event) => set('groupSize', event.target.value)} /></label>
      <label className={label}>Дистанция<input className={field} value={tour.distance} onChange={(event) => set('distance', event.target.value)} /></label>
      <label className={label}>Высота<input className={field} value={tour.maxAltitude} onChange={(event) => set('maxAltitude', event.target.value)} /></label>
    </section>
    <section className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2">
      <fieldset><legend className={label}>Где показывать в фильтре</legend><div className="mt-2 flex flex-wrap gap-3">{regions.map(([value, name]) => <label key={value} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={tour.regions.includes(value)} onChange={() => toggle('regions', value)} />{name}</label>)}</div></fieldset>
      <fieldset><legend className={label}>Тип</legend><div className="mt-2 flex flex-wrap gap-3">{activities.map(([value, name]) => <label key={value} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={tour.activities.includes(value)} onChange={() => toggle('activities', value)} />{name}</label>)}</div></fieldset>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={tour.showOnHome} onChange={(event) => set('showOnHome', event.target.checked)} />Показывать на главной</label>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={tour.published} onChange={(event) => set('published', event.target.checked)} />Опубликован на сайте</label>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={tour.winter} onChange={(event) => set('winter', event.target.checked)} />Зимний тур</label>
      <label className={label}>Цвет метки<select className={field} value={tour.levelTone} onChange={(event) => set('levelTone', event.target.value as StoredTour['levelTone'])}><option value="forest">Зелёный</option><option value="leaf">Светло-зелёный</option><option value="alert">Красный</option><option value="earth">Коричневый</option></select></label>
    </section>
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-xl">Фото</h2><label className="cursor-pointer rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-white">{uploading ? 'Загрузка…' : 'Загрузить фото'}<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { void upload(event.target.files?.[0]); event.target.value = ''; }} /></label></div>
      <p className="mt-2 text-sm text-slate">Первое фото стоит на карточке и в шапке тура. Можно загрузить новое или вставить путь уже лежащего на сайте фото.</p>
      <div className="mt-3 flex flex-wrap gap-2"><input className="min-w-0 flex-1 rounded-xl border border-pine/15 px-3 py-2 text-sm" value={photoPath} placeholder="/photos/tours/pamir-highway-4x4/01.jpg" onChange={(event) => setPhotoPath(event.target.value)} /><button type="button" className="rounded-xl border border-pine/20 px-4 py-2 text-sm font-semibold" onClick={() => { const src = photoPath.trim(); if (!src.startsWith('/photos/') || src.includes('..')) { setError('Путь должен начинаться с /photos/'); return; } set('gallery', [...tour.gallery, { src, alt: tour.title || 'Pamir tour photo' }].slice(0, 16)); setPhotoPath(''); setError(''); }}>Добавить это фото</button></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">{tour.gallery.map((photo, index) => <div key={`${photo.src}-${index}`} className="flex gap-3 rounded-xl bg-sand p-3"><img src={photo.src} alt="" className="h-20 w-24 rounded-lg object-cover" /><div className="min-w-0 flex-1"><input className={field} value={photo.alt} aria-label="Подпись фото" onChange={(event) => set('gallery', tour.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item))} /><div className="mt-2 flex gap-2">{index > 0 && <button type="button" className="text-sm font-semibold text-pine" onClick={() => { const next = [...tour.gallery]; const [item] = next.splice(index, 1); next.unshift(item); set('gallery', next); }}>Сделать обложкой</button>}<button type="button" className="text-sm font-semibold text-red-800" onClick={() => set('gallery', tour.gallery.filter((_, itemIndex) => itemIndex !== index))}>Убрать</button></div></div></div>)}</div>
    </section>
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between"><h2 className="font-display text-xl">Программа по дням</h2><button type="button" className="text-sm font-semibold text-pine" onClick={() => set('itinerary', [...tour.itinerary, { day: tour.itinerary.length + 1, title: '', description: '', overnight: '' }])}>Добавить день</button></div>
      <div className="mt-4 grid gap-4">{tour.itinerary.map((day, index) => <div key={index} className="grid gap-2 rounded-xl bg-sand p-3"><div className="flex gap-2"><input className="w-20 rounded-xl border border-pine/15 px-3 py-2 text-sm" inputMode="numeric" value={day.day} aria-label="Номер дня" onChange={(event) => set('itinerary', tour.itinerary.map((item, itemIndex) => itemIndex === index ? { ...item, day: Number(event.target.value) || item.day } : item))} /><input className="min-w-0 flex-1 rounded-xl border border-pine/15 px-3 py-2 text-sm" placeholder="Заголовок дня" value={day.title} onChange={(event) => set('itinerary', tour.itinerary.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} /><button type="button" className="text-sm font-semibold text-red-800" onClick={() => set('itinerary', tour.itinerary.filter((_, itemIndex) => itemIndex !== index))}>Убрать</button></div><textarea className={field} rows={3} placeholder="Что происходит в этот день" value={day.description} onChange={(event) => set('itinerary', tour.itinerary.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item))} /><input className={field} placeholder="Ночёвка" value={day.overnight} onChange={(event) => set('itinerary', tour.itinerary.map((item, itemIndex) => itemIndex === index ? { ...item, overnight: event.target.value } : item))} /></div>)}</div>
    </section>
    <section className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm lg:grid-cols-3">
      <label className={label}>Включено, каждая строка отдельно<textarea className={field} rows={6} value={included} onChange={(event) => setIncluded(event.target.value)} /></label>
      <label className={label}>Не включено<textarea className={field} rows={6} value={excluded} onChange={(event) => setExcluded(event.target.value)} /></label>
      <label className={label}>Снаряжение<textarea className={field} rows={6} value={gear} onChange={(event) => setGear(event.target.value)} /></label>
    </section>
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between"><h2 className="font-display text-xl">Вопросы и ответы</h2><button type="button" className="text-sm font-semibold text-pine" onClick={() => set('faq', [...tour.faq, { question: '', answer: '' }])}>Добавить вопрос</button></div>
      <div className="mt-4 grid gap-3">{tour.faq.map((item, index) => <div key={index} className="grid gap-2"><input className={field} placeholder="Вопрос" value={item.question} onChange={(event) => set('faq', tour.faq.map((faq, faqIndex) => faqIndex === index ? { ...faq, question: event.target.value } : faq))} /><textarea className={field} rows={2} placeholder="Ответ" value={item.answer} onChange={(event) => set('faq', tour.faq.map((faq, faqIndex) => faqIndex === index ? { ...faq, answer: event.target.value } : faq))} /></div>)}</div>
    </section>
    <button type="submit" disabled={saving || uploading} className="rounded-xl bg-forest px-6 py-3 font-display text-base font-bold text-white disabled:opacity-60">{saving ? 'Сохраняю…' : 'Сохранить тур'}</button>
  </form>;
}
