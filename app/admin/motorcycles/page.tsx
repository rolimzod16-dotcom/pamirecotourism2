import Link from 'next/link';
import { ConfirmSubmit } from '@/components/admin/ConfirmSubmit';
import { deleteMotoAction, moveMotoAction } from '../moto-actions';
import { motoPrice } from '@/lib/moto-record';
import { listMotorcycles } from '@/lib/moto-store';
import { storageMode } from '@/lib/tour-store';

export const dynamic = 'force-dynamic';

export default async function MotorcyclesAdmin({ searchParams }: { searchParams: { saved?: string; deleted?: string; error?: string } }) {
  const motorcycles = await listMotorcycles();
  const mode = storageMode();
  return <div>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="font-display text-3xl font-bold">Мотоциклы</h1><p className="mt-2 text-sm text-slate">Новый мотоцикл сразу появляется на странице Motorcycles.</p></div>
      <Link href="/admin/motorcycles/new" className="rounded-xl bg-forest px-5 py-3 font-semibold text-white">Добавить мотоцикл</Link>
    </div>
    {mode === 'off' && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">Хранилище на сервере не подключено. Сохранить мотоциклы пока нельзя.</p>}
    {searchParams.saved && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm">Мотоцикл сохранён.</p>}
    {searchParams.deleted && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm">Мотоцикл удалён.</p>}
    {searchParams.error === 'save' && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">Не удалось сохранить изменение.</p>}
    {motorcycles.length === 0 && <p className="mt-6 rounded-2xl bg-white p-5 text-sm text-slate">Пока пусто. Нажмите «Добавить мотоцикл», укажите название, цену за день и фото.</p>}
    <div className="mt-6 grid gap-3">{motorcycles.map((motorcycle, index) => <article key={motorcycle.slug} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="min-w-0"><p className="font-display text-lg font-bold">{motorcycle.titleRu || motorcycle.titleEn || motorcycle.title}</p>{motorcycle.titleRu && motorcycle.titleEn && <p className="text-sm text-slate">{motorcycle.titleEn}</p>}<p className="text-sm text-slate">{motoPrice(motorcycle.price)} · {motorcycle.published ? 'на сайте' : 'скрыт'}</p></div>
      <div className="flex flex-wrap items-center gap-2">
        <form action={moveMotoAction}><input type="hidden" name="slug" value={motorcycle.slug} /><input type="hidden" name="direction" value="-1" /><button type="submit" disabled={index === 0} className="rounded-lg border border-pine/20 px-3 py-2 text-sm disabled:opacity-40">Выше</button></form>
        <form action={moveMotoAction}><input type="hidden" name="slug" value={motorcycle.slug} /><input type="hidden" name="direction" value="1" /><button type="submit" disabled={index === motorcycles.length - 1} className="rounded-lg border border-pine/20 px-3 py-2 text-sm disabled:opacity-40">Ниже</button></form>
        <Link href={`/admin/motorcycles/${motorcycle.slug}`} className="rounded-lg bg-pine px-3 py-2 text-sm font-semibold text-white">Изменить</Link>
        <ConfirmSubmit action={deleteMotoAction} fields={{ slug: motorcycle.slug }} label="Удалить" className="rounded-lg px-3 py-2 text-sm font-semibold text-red-800" confirm="Удалить этот мотоцикл с сайта?" />
      </div>
    </article>)}</div>
  </div>;
}
