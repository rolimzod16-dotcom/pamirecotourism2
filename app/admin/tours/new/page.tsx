import { TourEditor } from '@/components/admin/TourEditor';
import { blankTour } from '@/lib/tour-record';
import { listTours } from '@/lib/tour-store';

export const dynamic = 'force-dynamic';

export default async function NewTourPage() {
  const tours = await listTours();
  return <div><h1 className="font-display text-3xl font-bold">Новый тур</h1><div className="mt-6"><TourEditor initial={blankTour(tours.length)} creating /></div></div>;
}
