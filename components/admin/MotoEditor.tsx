'use client';

import { useRef, useState } from 'react';
import { saveMotoAction } from '@/app/admin/moto-actions';
import type { StoredMoto } from '@/lib/moto-record';

const field = 'mt-1 w-full min-w-0 rounded-xl border border-pine/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-pine';
const label = 'block text-sm font-semibold';

export function MotoEditor({ initial, creating }: { initial: StoredMoto; creating: boolean }) {
  const [motorcycle, setMotorcycle] = useState(() => initial.titleRu || initial.titleEn ? initial : { ...initial, titleEn: initial.title, blurbEn: initial.blurb, detailsEn: initial.details });
  const [price, setPrice] = useState(initial.price === null ? '' : String(initial.price));
  const [photoPath, setPhotoPath] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const textNames = ['titleRu', 'titleEn', 'blurbRu', 'blurbEn', 'detailsRu', 'detailsEn'] as const;
  const withTypedText = (current: StoredMoto) => {
    const form = formRef.current;
    if (!form) return current;
    const data = new FormData(form);
    const next = { ...current };
    for (const name of textNames) {
      const value = data.get(name);
      if (typeof value === 'string') next[name] = value;
    }
    return next;
  };
  const set = <K extends keyof StoredMoto>(key: K, value: StoredMoto[K]) => setMotorcycle((current) => ({ ...withTypedText(current), [key]: value }));

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true); setError('');
    try {
      const body = new FormData();
      body.set('file', file);
      body.set('folder', 'motorcycles');
      const response = await fetch('/api/admin/upload', { method: 'POST', body });
      const payload = await response.json() as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error || 'Фото не загрузилось.');
      const src = payload.url;
      setMotorcycle((current) => {
        const next = withTypedText(current);
        const alt = next.titleEn || next.titleRu || next.title || 'Pamir motorcycle';
        return { ...next, gallery: [...next.gallery, { src, alt }].slice(0, 16) };
      });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Фото не загрузилось.');
    } finally { setUploading(false); }
  };

  const addPath = () => {
    const src = photoPath.trim();
    const sitePhoto = src.startsWith('/photos/') && !src.includes('..');
    const uploaded = src.startsWith('/api/media?src=') && !src.includes('..');
    if (!sitePhoto && !uploaded) { setError('Путь должен начинаться с /photos/'); return; }
    setMotorcycle((current) => {
      const next = withTypedText(current);
      const alt = next.titleEn || next.titleRu || next.title || 'Pamir motorcycle';
      return { ...next, gallery: [...next.gallery, { src, alt }].slice(0, 16) };
    });
    setPhotoPath(''); setError('');
  };

  const save = async () => {
    setSaving(true); setError('');
    const numericPrice = price.trim() === '' ? null : Number(price);
    const result = await saveMotoAction({
      ...withTypedText(motorcycle),
      price: numericPrice !== null && Number.isFinite(numericPrice) ? Math.round(numericPrice) : null,
    }, creating);
    if (result?.error) { setError(result.error); setSaving(false); }
  };

  return <form ref={formRef} className="grid gap-6" onSubmit={(event) => { event.preventDefault(); void save(); }}>
    {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
    <section className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2">
      <div className="grid gap-4 rounded-xl bg-sand p-4">
        <p className="font-display text-lg font-bold">Русский</p>
        <label className={label}>Название<input name="titleRu" className={field} value={motorcycle.titleRu} onChange={(event) => set('titleRu', event.target.value)} /></label>
        <label className={label}>Короткое описание<textarea name="blurbRu" className={field} rows={3} value={motorcycle.blurbRu} onChange={(event) => set('blurbRu', event.target.value)} /></label>
        <label className={label}>Подробности<textarea name="detailsRu" className={field} rows={5} value={motorcycle.detailsRu} onChange={(event) => set('detailsRu', event.target.value)} /></label>
      </div>
      <div className="grid gap-4 rounded-xl bg-sand p-4">
        <p className="font-display text-lg font-bold">English</p>
        <label className={label}>Name<input name="titleEn" className={field} value={motorcycle.titleEn} onChange={(event) => set('titleEn', event.target.value)} /></label>
        <label className={label}>Short description<textarea name="blurbEn" className={field} rows={3} value={motorcycle.blurbEn} onChange={(event) => set('blurbEn', event.target.value)} /></label>
        <label className={label}>Details<textarea name="detailsEn" className={field} rows={5} value={motorcycle.detailsEn} onChange={(event) => set('detailsEn', event.target.value)} /></label>
      </div>
      <p className="text-xs text-slate sm:col-span-2">Достаточно одного названия, на любом языке. Цифры и знаки тоже можно. Адрес страницы сделается сам.</p>
      <label className={label}>Цена за день, USD<input className={field} inputMode="numeric" value={price} placeholder="Пусто = по запросу" onChange={(event) => setPrice(event.target.value)} /></label>
      <label className="flex items-center gap-2 text-sm font-semibold sm:mt-7"><input type="checkbox" checked={motorcycle.published} onChange={(event) => set('published', event.target.checked)} />Показывать на сайте</label>
    </section>
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-xl">Фото</h2><label className="cursor-pointer rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-white">{uploading ? 'Загрузка…' : 'Загрузить фото'}<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { void upload(event.target.files?.[0]); event.target.value = ''; }} /></label></div>
      <p className="mt-2 text-sm text-slate">Первое фото стоит на карточке. Можно загрузить новое или вставить путь уже лежащего на сайте фото.</p>
      <div className="mt-3 flex flex-wrap gap-2"><input className="min-w-0 flex-1 rounded-xl border border-pine/15 px-3 py-2 text-sm" value={photoPath} placeholder="/photos/tours/high-pamirs-motorcycle/01.jpg" onChange={(event) => setPhotoPath(event.target.value)} /><button type="button" className="rounded-xl border border-pine/20 px-4 py-2 text-sm font-semibold" onClick={addPath}>Добавить это фото</button></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">{motorcycle.gallery.map((photo, index) => <div key={`${photo.src}-${index}`} className="flex gap-3 rounded-xl bg-sand p-3"><img src={photo.src} alt="" className="h-20 w-24 rounded-lg object-cover" /><div className="min-w-0 flex-1"><input className={field} value={photo.alt} aria-label="Подпись фото" onChange={(event) => set('gallery', motorcycle.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item))} /><div className="mt-2 flex gap-2">{index > 0 && <button type="button" className="text-sm font-semibold text-pine" onClick={() => { const next = [...motorcycle.gallery]; const [item] = next.splice(index, 1); next.unshift(item); set('gallery', next); }}>Сделать обложкой</button>}<button type="button" className="text-sm font-semibold text-red-800" onClick={() => set('gallery', motorcycle.gallery.filter((_, itemIndex) => itemIndex !== index))}>Убрать</button></div></div></div>)}</div>
    </section>
    <button type="submit" disabled={saving || uploading} className="rounded-xl bg-forest px-6 py-3 font-display text-base font-bold text-white disabled:opacity-60">{saving ? 'Сохраняю…' : 'Сохранить мотоцикл'}</button>
  </form>;
}
