import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TourEditor } from '@/components/admin/TourEditor';
import { getTour } from '@/lib/tour-store';

export const dynamic = 'force-dynamic';

export default async function EditTourPage({ params, searchParams }: { params: { slug: string }; searchParams: { saved?: string } }) {
  const tour = await getTour(params.slug);
  if (!tour) notFound();
  return <div>
    <div className="flex flex-wrap items-end justify-between gap-3"><h1 className="font-display text-3xl font-bold">{tour.title}</h1><Link href={`/tours/${tour.slug}`} className="text-sm font-semibold text-pine" target="_blank">Открыть на сайте</Link></div>
    {searchParams.saved && <p role="status" className="mt-4 rounded-xl bg-white px-4 py-3 text-sm">Сохранено. Сайт уже показывает эту версию.</p>}
    <div className="mt-6"><TourEditor initial={tour} creating={false} /></div>
  </div>;
}
