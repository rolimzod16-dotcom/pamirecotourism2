import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { seo, createMetadata } from '@/lib/seo';
import { site } from '@/data/site';
import { WhatsAppButton } from '@/components/WhatsAppButton';
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
export const metadata: Metadata = createMetadata({ title: 'Home', description: seo.description });
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${fraunces.variable} ${inter.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'TravelAgency', name: seo.name, url: seo.url, telephone: site.phone, email: site.email, address: { '@type': 'PostalAddress', streetAddress: site.address, addressCountry: 'TJ' }, sameAs: seo.sameAs }).replace(/</g, '\\u003c') }} /><Header />{children}<Footer /><WhatsAppButton /></body></html>;
}
