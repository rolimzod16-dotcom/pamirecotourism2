import { chrome } from '@/content/chrome';
import { site } from '@/data/site';
import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return { name: site.name, short_name: 'Pamir', description: chrome.manifestDescription, start_url: '/', display: 'standalone', background_color: '#0B1F2E', theme_color: '#0B1F2E', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }] };
}
