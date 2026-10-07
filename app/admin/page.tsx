import Link from 'next/link';
import { ConfirmSubmit } from '@/components/admin/ConfirmSubmit';
import { deleteTourAction, moveTourAction } from './actions';
import { priceLabel } from '@/lib/tour-record';
import { listTours, storageMode } from '@/lib/tour-store';

export const dynamic = 'force-dynamic';

export default async function AdminHome({ searchParams }: { searchParams: { saved?: string; deleted?: string; error?: string } }) {
  const tours = await listTours();
  const mode = storageMode();
  return <div>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="font-display text-3xl font-bold">Туры</h1><p className="mt-2 text-sm text-slate">Изменения сразу появляются на сайте.</p></div>
      <Link href="/admin/tours/new" className="rounded-xl bg-forest px-5 py-3 font-semibold text-white">Новый тур</Link>
    </div>
    {mode === 'off' && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">Хранилище на сервере не подключено. Сохранить туры пока нельзя.</p>}
    {searchParams.saved && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm">Тур сохранён.</p>}
    {searchParams.deleted && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm">Тур удалён.</p>}
    {searchParams.error === 'save' && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">Не удалось сохранить изменение.</p>}
    <div className="mt-6 grid gap-3">{tours.map((tour, index) => <article key={tour.slug} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="min-w-0"><p className="font-display text-lg font-bold">{tour.title}</p><p className="text-sm text-slate">{priceLabel(tour.price).priceAmount} · {tour.published ? 'на сайте' : 'скрыт'}{tour.showOnHome ? ' · на главной' : ''}</p></div>
      <div className="flex flex-wrap items-center gap-2">
        <form action={moveTourAction}><input type="hidden" name="slug" value={tour.slug} /><input type="hidden" name="direction" value="-1" /><button type="submit" disabled={index === 0} className="rounded-lg border border-pine/20 px-3 py-2 text-sm disabled:opacity-40">Выше</button></form>
        <form action={moveTourAction}><input type="hidden" name="slug" value={tour.slug} /><input type="hidden" name="direction" value="1" /><button type="submit" disabled={index === tours.length - 1} className="rounded-lg border border-pine/20 px-3 py-2 text-sm disabled:opacity-40">Ниже</button></form>
        <Link href={`/admin/tours/${tour.slug}`} className="rounded-lg bg-pine px-3 py-2 text-sm font-semibold text-white">Изменить</Link>
        <ConfirmSubmit action={deleteTourAction} fields={{ slug: tour.slug }} label="Удалить" className="rounded-lg px-3 py-2 text-sm font-semibold text-red-800" confirm="Удалить этот тур с сайта?" />
      </div>
    </article>)}</div>
  </div>;
}
