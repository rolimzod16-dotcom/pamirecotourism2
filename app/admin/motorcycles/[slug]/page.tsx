import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MotoEditor } from '@/components/admin/MotoEditor';
import { getMotorcycle } from '@/lib/moto-store';

export const dynamic = 'force-dynamic';

export default async function EditMotorcyclePage({ params, searchParams }: { params: { slug: string }; searchParams: { saved?: string } }) {
  const motorcycle = await getMotorcycle(params.slug);
  if (!motorcycle) notFound();
  return <div>
    <div className="flex flex-wrap items-end justify-between gap-3"><h1 className="font-display text-3xl font-bold">{motorcycle.title}</h1><Link href={`/motorcycles/${motorcycle.slug}`} className="text-sm font-semibold text-pine" target="_blank">Открыть на сайте</Link></div>
    {searchParams.saved && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm">Сохранено. Сайт уже показывает эту версию.</p>}
    <div className="mt-6"><MotoEditor initial={motorcycle} creating={false} /></div>
  </div>;
}
