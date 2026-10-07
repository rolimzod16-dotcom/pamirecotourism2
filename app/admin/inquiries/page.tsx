import { listInquiries, storageMode } from '@/lib/tour-store';

export const dynamic = 'force-dynamic';

export default async function InquiriesPage() {
  const inquiries = await listInquiries();
  const mode = storageMode();
  return <div>
    <h1 className="font-display text-3xl font-bold">Заявки</h1>
    <p className="mt-2 text-sm text-slate">Сюда попадают формы с главной, со страницы контакта и подписка.</p>
    {mode === 'off' && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">Хранилище не подключено, поэтому новые заявки сюда не записываются.</p>}
    {inquiries.length === 0 ? <p className="mt-6 rounded-2xl bg-white p-8 text-sm text-slate">Заявок пока нет.</p> : <div className="mt-6 grid gap-3">{inquiries.map((item) => <article key={item.id} className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="font-display text-xl font-bold">{item.name || item.email}</h2><time className="text-xs text-slate">{new Date(item.at).toLocaleString('ru-RU')}</time></div>
      <p className="mt-2 text-sm">{item.kind === 'newsletter' ? 'Подписка' : item.tour || 'Тур не выбран'}{item.date ? ` · ${item.date}` : ''}{item.groupSize ? ` · ${item.groupSize} чел.` : ''}</p>
      <p className="mt-2 text-sm"><a className="text-pine underline" href={`mailto:${item.email}`}>{item.email}</a>{item.phone ? ` · ${item.phone}` : ''}</p>
      {item.message && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink/80">{item.message}</p>}
    </article>)}</div>}
  </div>;
}
