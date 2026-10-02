import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Pamir Ecotourism', short_name: 'Pamir', description: 'Locally rooted journeys in Tajikistan.', start_url: '/', display: 'standalone', background_color: '#0B1F2E', theme_color: '#0B1F2E', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }] };
}
