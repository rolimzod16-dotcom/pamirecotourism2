import { tourPhotos } from './photos';
export type TourCategory = 'trekking' | 'driving';
export type TourDay = { day: number; title: string; description: string; overnight: string };
export type TourFAQ = { question: string; answer: string };
export type Tour = {
  slug: string; title: string; category: TourCategory; price: number | 'On request';
  days: number | null; distance: string | null; maxAltitude: string | null;
  difficulty: string | null; season: string | null; groupSize: string | null;
  hook: string; overview: string; gallery: string[];
  itinerary: TourDay[]; included: string[]; excluded: string[]; gear: string[];
  faq: TourFAQ[]; destinations: string[]; destinationsConfirmed: false;
};
const placeholderDay = (day: number): TourDay => ({
  day, title: `[Placeholder] Day ${day} plan to confirm`,
  description: 'The operator will confirm the exact route, activities and timing in a written itinerary.',
  overnight: '[Overnight location to confirm]',
});
const placeholderFAQ: TourFAQ[] = [
  { question: 'What is included?', answer: '[Placeholder] The team will confirm transport, accommodation, meals, permits and exclusions in a written quote.' },
  { question: 'How difficult is this trip?', answer: '[Placeholder] Ask the team for the route, conditions and fitness guidance for your dates.' },
  { question: 'Can the itinerary change?', answer: '[Placeholder] Discuss your dates and interests directly with the team before confirming.' },
];
const base = [
  { slug: 'pamir-highway-4x4', title: '4x4 Tour', category: 'driving', price: 1510, destinations: ['khorog', 'murgab', 'karakul'] },
  { slug: 'pamir-classical-4x4', title: 'Pamir Classical 4x4', category: 'driving', price: 1432, destinations: ['khorog', 'wakhan-ishkashim', 'murgab'] },
  { slug: 'cross-border-trekking', title: 'Trekking Cross Border', category: 'trekking', price: 1600, destinations: ['wakhan-ishkashim'] },
  { slug: 'mountain-lakes-trekking', title: 'Trekking Mt. Lakes', category: 'trekking', price: 1802, destinations: ['seven-lakes', 'fan-mountains'] },
  { slug: 'fan-mountain-lakes', title: 'Fan Mountain Lakes', category: 'trekking', price: 1200, destinations: ['fan-mountains', 'iskandarkul'] },
  { slug: 'snow-leopard-tour', title: 'Snow Leopard Tour', category: 'trekking', price: 'On request', destinations: ['bartang'] },
  { slug: 'freezing-wall-trekking', title: 'Trekking to the Freezing Wall', category: 'trekking', price: 'On request', destinations: ['fan-mountains'] },
  { slug: 'pamir-trail-section-8-9', title: 'Pamir Trail Section 8-9', category: 'trekking', price: 'On request', destinations: ['bartang', 'sarez'] },
  { slug: 'ancient-traditions-cities', title: 'Tour to the Cities of Ancient Traditions', category: 'driving', price: 'On request', destinations: ['panjakent', 'hissor', 'khujand'] },
  { slug: 'high-pamirs-motorcycle', title: 'Motorcycle Tour in High Pamirs', category: 'driving', price: 'On request', destinations: ['murgab', 'karakul'] },
] satisfies Array<{ slug: string; title: string; category: TourCategory; price: number | 'On request'; destinations: string[] }>;
// Associations, imagery and itinerary structure are illustrative. Confirm every route with the operator.
export const tours: Tour[] = base.map((tour) => ({
  ...tour, days: null, distance: null, maxAltitude: null, difficulty: null, season: null, groupSize: null,
  hook: `[Placeholder] Explore the ${tour.title} route with a local team.`,
  overview: `[Placeholder] The exact route, pace and travel arrangements for ${tour.title} will be confirmed with the operator before booking.`,
  gallery: (tourPhotos[tour.slug] ?? []).map((photo) => photo.src), itinerary: [1, 2, 3].map(placeholderDay),
  included: ['[Transport arrangements to confirm]', '[Accommodation and meals to confirm]', '[Guide and permit arrangements to confirm]'],
  excluded: ['[Personal expenses to confirm]', '[Flights and insurance to confirm]'],
  gear: ['[Clothing suited to confirmed season]', '[Footwear suited to confirmed activities]', '[Personal medication and essentials]'],
  faq: placeholderFAQ, destinationsConfirmed: false,
}));
