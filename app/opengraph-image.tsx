import { ImageResponse } from 'next/og';
import { home } from '@/content/home';
import { seo } from '@/lib/seo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: 'linear-gradient(135deg, #0B1F2E 0%, #174456 65%, #2BB3B1 100%)', color: '#F7F9FA', fontFamily: 'serif' }}><div style={{ fontSize: 36, color: '#E8A24A', letterSpacing: 5 }}>PAMIR ECOTOURISM</div><div style={{ fontSize: 82, lineHeight: 1.05 }}>{home.hero.title}</div><div style={{ fontFamily: 'sans-serif', fontSize: 27 }}>{seo.url.replace(/^https?:\/\//, '')}</div></div>, size);
}
