import type { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';
import { siteUrl } from '@/lib/seo';
import { listPublishedMotorcycles } from '@/lib/moto-store';
import { listPublished } from '@/lib/tour-store';
export const dynamic = 'force-dynamic';
type Entry = MetadataRoute.Sitemap[number];
const absolute = (src: string) => (/^https?:\/\//.test(src) ? src : `${siteUrl}${src.startsWith('/') ? src : `/${src}`}`);
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await listPublished();
  const motorcycles = await listPublishedMotorcycles();
  const entry = (path: string, priority: number, changeFrequency: Entry['changeFrequency'], images: (string | undefined)[] = []): Entry => {
    const list = images.filter((src): src is string => !!src).slice(0, 10).map(absolute);
    return { url: `${siteUrl}${path}`, changeFrequency, priority, ...(list.length && { images: list }) };
  };
  return [
    entry('/', 1, 'weekly'),
    entry('/tours', 0.9, 'weekly', tours.map((tour) => tour.gallery[0]?.src)),
    ...tours.map((tour) => entry(`/tours/${tour.slug}`, 0.8, 'monthly', tour.gallery.map((photo) => photo.src))),
    entry('/destinations', 0.8, 'monthly', destinations.map((place) => place.image)),
    ...destinations.map((place) => entry(`/destinations/${place.slug}`, 0.7, 'monthly', [place.image])),
    entry('/motorcycles', 0.7, 'weekly'),
    ...motorcycles.map((item) => entry(`/motorcycles/${item.slug}`, 0.6, 'monthly', item.gallery.map((photo) => photo.src))),
    entry('/gallery', 0.5, 'monthly'),
    entry('/about', 0.6, 'monthly'),
    entry('/contact', 0.6, 'yearly'),
  ];
}
