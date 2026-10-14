import { chrome } from '@/content/chrome';
import { site } from '@/data/site';
import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return { name: site.name, short_name: 'Pamir', description: chrome.manifestDescription, start_url: '/', display: 'standalone', background_color: '#2A1712', theme_color: '#2A1712', icons: [{ src: '/icon.png', sizes: '192x192', type: 'image/png' }, { src: '/logo-512.png', sizes: '512x512', type: 'image/png' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }] };
}
