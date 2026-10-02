import type { Metadata } from 'next';
import { RouteHero } from '@/components/RouteHero';
import { GalleryBrowser } from '@/components/GalleryBrowser';
import { pages } from '@/content/pages';
import { placePhotos } from '@/data/photos';
import { createMetadata } from '@/lib/seo';
export const metadata: Metadata = createMetadata({ title: pages.gallery.title, description: pages.gallery.intro, path: '/gallery' });
export default function GalleryPage() { return <main id="main-content"><RouteHero eyebrow={pages.gallery.eyebrow} title={pages.gallery.title} intro={pages.gallery.intro} image={placePhotos.sarez[0].src} /><GalleryBrowser /></main>; }
