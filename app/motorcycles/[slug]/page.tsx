import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MotorcycleDetail } from '@/components/MotorcycleDetail';
import { createMetadata } from '@/lib/seo';
import { motoPrice, motoSides } from '@/lib/moto-record';
import { listPublishedMotorcycles } from '@/lib/moto-store';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const motorcycle = (await listPublishedMotorcycles()).find((item) => item.slug === params.slug);
  if (!motorcycle) return {};
  const sides = motoSides(motorcycle);
  return createMetadata({ title: sides.en.title, description: sides.en.blurb || sides.en.title, path: `/motorcycles/${motorcycle.slug}`, image: motorcycle.gallery[0]?.src });
}

export default async function MotorcyclePage({ params }: { params: { slug: string } }) {
  const motorcycle = (await listPublishedMotorcycles()).find((item) => item.slug === params.slug);
  if (!motorcycle) notFound();
  const sides = motoSides(motorcycle);
  return <main id="main-content" className="pb-16">
    <MotorcycleDetail price={motoPrice(motorcycle.price)} photos={motorcycle.gallery} en={sides.en} ru={sides.ru} />
  </main>;
}
