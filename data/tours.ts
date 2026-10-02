export type TourCategory = 'trekking' | 'driving';
export type Tour = {
  slug: string; title: string; category: TourCategory; price: number | 'On request';
  days: number | null; difficulty: string | null; season: string | null;
  groupSize: string | null; hook: string | null;
  itinerary: string[]; included: string[]; excluded: string[];
};
// Null and empty arrays mark operator details still awaiting confirmation.
export const tours: Tour[] = [
  { slug: 'pamir-highway-4x4', title: '4x4 Tour', category: 'driving', price: 1510 },
  { slug: 'pamir-classical-4x4', title: 'Pamir Classical 4x4', category: 'driving', price: 1432 },
  { slug: 'cross-border-trekking', title: 'Trekking Cross Border', category: 'trekking', price: 1600 },
  { slug: 'mountain-lakes-trekking', title: 'Trekking Mt. Lakes', category: 'trekking', price: 1802 },
  { slug: 'fan-mountain-lakes', title: 'Fan Mountain Lakes', category: 'trekking', price: 1200 },
  { slug: 'snow-leopard-tour', title: 'Snow Leopard Tour', category: 'trekking', price: 'On request' },
  { slug: 'freezing-wall-trekking', title: 'Trekking to the Freezing Wall', category: 'trekking', price: 'On request' },
  { slug: 'pamir-trail-section-8-9', title: 'Pamir Trail Section 8-9', category: 'trekking', price: 'On request' },
  { slug: 'ancient-traditions-cities', title: 'Tour to the Cities of Ancient Traditions', category: 'driving', price: 'On request' },
  { slug: 'high-pamirs-motorcycle', title: 'Motorcycle Tour in High Pamirs', category: 'driving', price: 'On request' },
].map((tour) => ({ days: null, difficulty: null, season: null, groupSize: null, hook: null, itinerary: [], included: [], excluded: [], ...tour, category: tour.category as TourCategory, price: tour.price as Tour['price'] }));
