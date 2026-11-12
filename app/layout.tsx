import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { chrome } from '@/content/chrome';
import { seo, createMetadata } from '@/lib/seo';
import { site } from '@/data/site';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CurrencyProvider } from '@/components/CurrencyProvider';
import { getRates } from '@/lib/rates';
import { SiteChrome } from '@/components/SiteChrome';
const display = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const organizationLd = {
  '@context': 'https://schema.org', '@type': 'TravelAgency', '@id': `${seo.url}/#organization`, name: seo.name, url: seo.url,
  logo: `${seo.url}/logo-512.png`, image: `${seo.url}/opengraph-image`, description: seo.description,
  telephone: site.phone, email: site.email,
  address: { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: 'Rushan district', addressRegion: 'Gorno-Badakhshan (GBAO)', addressCountry: 'TJ' },
  areaServed: [{ '@type': 'Place', name: 'Pamir Mountains' }, { '@type': 'Country', name: 'Tajikistan' }],
  knowsLanguage: ['en', 'ru', 'tg'],
  ...(seo.sameAs.length && { sameAs: seo.sameAs }),
};
export const metadata: Metadata = createMetadata({ title: chrome.homeTitle, description: seo.description });
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const rates = await getRates();
  return <html lang="en"><body className={`${display.variable} ${inter.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd).replace(/</g, '\\u003c') }} /><CurrencyProvider rates={rates}><SiteChrome header={<Header />} footer={<><Footer /><WhatsAppButton /></>}>{children}</SiteChrome></CurrencyProvider></body></html>;
}
