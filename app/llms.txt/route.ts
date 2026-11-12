import { destinations } from '@/data/destinations';
import { site } from '@/data/site';
import { siteUrl } from '@/lib/seo';
import { toPublicTour } from '@/lib/tour-record';
import { listPublished } from '@/lib/tour-store';

// A plain-text map of the site for AI search tools (llmstxt.org format), built from the live tour catalog.
export const revalidate = 3600;

export async function GET() {
  const tours = (await listPublished()).map(toPublicTour);
  const tourLines = tours.map((tour) => {
    const facts = [tour.days ? `${tour.days} days` : '', typeof tour.price === 'number' ? `from USD ${tour.price}` : 'price on request', tour.season ?? ''].filter(Boolean).join(', ');
    return `- [${tour.title}](${siteUrl}/tours/${tour.slug}): ${tour.hook} (${facts})`;
  });
  const placeLines = destinations.map((place) => `- [${place.name}](${siteUrl}/destinations/${place.slug}): ${place.description}`);
  const body = [
    `# ${site.name}`,
    '',
    '> Local tour operator based in the Bartang Valley (Rushan district, GBAO), Tajikistan. Pamir Highway 4x4 tours, Lake Sarez and Bartang treks, Pamir lakes traverses, a winter snow leopard expedition and a Pamir & Bartang motorcycle expedition run with partner Pamir Moto Adventure.',
    '',
    `Contact: ${site.email}, WhatsApp ${site.phone}. Trips are quoted in writing for your dates and group size; GBAO permits are arranged with the booking.`,
    '',
    '## Tours',
    ...tourLines,
    '',
    '## Destinations',
    ...placeLines,
    '',
    '## Company',
    `- [About](${siteUrl}/about): the local team and how trips are run`,
    `- [Contact](${siteUrl}/contact): plan a trip on WhatsApp or by email`,
    '',
    '## Partners',
    '- [Pamir Moto Adventure](https://pamirmoto.com/en): motorcycle and 4x4 rental in Dushanbe, guided rides on the Pamir Highway',
    '- [Great Silk Trails](https://www.greatsilktrails.com/): multi-country Silk Road journeys in Central Asia',
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
