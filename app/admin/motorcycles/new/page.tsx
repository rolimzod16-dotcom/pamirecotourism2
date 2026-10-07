import { MotoEditor } from '@/components/admin/MotoEditor';
import { blankMoto } from '@/lib/moto-record';
import { listMotorcycles } from '@/lib/moto-store';

export const dynamic = 'force-dynamic';

export default async function NewMotorcyclePage() {
  const motorcycles = await listMotorcycles();
  return <div><h1 className="font-display text-3xl font-bold">Новый мотоцикл</h1><div className="mt-6"><MotoEditor initial={blankMoto(motorcycles.length)} creating /></div></div>;
}
