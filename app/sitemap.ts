import type { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';
import { siteUrl } from '@/lib/seo';
import { listPublished } from '@/lib/tour-store';
export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await listPublished();
  const staticPaths = ['/', '/tours', '/destinations', '/gallery', '/about', '/contact'];
  const paths = [...staticPaths, ...tours.map((tour) => `/tours/${tour.slug}`), ...destinations.map((place) => `/destinations/${place.slug}`)];
  return paths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: path === '/' ? 'weekly' : 'monthly', priority: path === '/' ? 1 : path.split('/').length < 3 ? .8 : .6 }));
}
