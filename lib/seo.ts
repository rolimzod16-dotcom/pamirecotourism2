import type { Metadata } from 'next';
import { site } from '@/data/site';
const configured = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pamirecotourism.com';
export const siteUrl = configured.replace(/\/$/, '');
export const seo = {
  name: site.name, url: siteUrl, defaultOgImage: '/opengraph-image',
  description: 'Locally rooted journeys in Tajikistan with Pamir Ecotourism.',
  // [confirm] Add verified official social profile URLs before launch.
  sameAs: [] as string[],
};
export function createMetadata({ title, description, path = '/', image = seo.defaultOgImage }: { title: string; description: string; path?: string; image?: string }): Metadata {
  const canonical = new URL(path, `${seo.url}/`).toString();
  return {
    title: `${title} | ${seo.name}`, description, metadataBase: new URL(seo.url), alternates: { canonical },
    openGraph: { type: 'website', title, description, url: canonical, siteName: seo.name, images: [{ url: image, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
