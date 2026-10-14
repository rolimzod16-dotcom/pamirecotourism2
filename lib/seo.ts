import type { Metadata } from 'next';
import { chrome } from '@/content/chrome';
import { site } from '@/data/site';
const configured = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pamirecotourism.com';
export const siteUrl = configured.replace(/\/$/, '');
export const seo = {
  name: site.name, url: siteUrl, defaultOgImage: '/opengraph-image',
  description: chrome.description,
  // [confirm] Add verified official social profile URLs before launch.
  sameAs: [] as string[],
};
const snippet = (text: string, max = 158) => { const clean = text.replace(/\s+/g, ' ').trim(); return clean.length <= max ? clean : `${clean.slice(0, clean.lastIndexOf(' ', max - 1))}…`; };
export function createMetadata({ title, description, path = '/', image = seo.defaultOgImage, absoluteTitle = false }: { title: string; description: string; path?: string; image?: string; absoluteTitle?: boolean }): Metadata {
  const canonical = new URL(path, `${seo.url}/`).toString();
  description = snippet(description);
  return {
    title: absoluteTitle ? { absolute: title } : `${title} | ${seo.name}`, description, metadataBase: new URL(seo.url), alternates: { canonical },
    openGraph: { type: 'website', locale: 'en_US', title, description, url: canonical, siteName: seo.name, images: [{ url: image, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
