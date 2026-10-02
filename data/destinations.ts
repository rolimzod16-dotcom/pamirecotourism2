export type DestinationGroup = 'Lakes' | 'Mountains and Valleys' | 'Historic Cities';
export type Destination = {
  slug: string; name: string; group: DestinationGroup; lat: number; lng: number;
  description: string; image: string; region: string; coordinates: { lat: number; lng: number }; highlights: string[]; bestSeason: string; gallery: string[]; howToGetThere: string;
};
// Coordinates are approximate map points, not navigation or route data. Images are illustrative placeholders.
const base: Array<Omit<Destination, 'region' | 'coordinates' | 'highlights' | 'bestSeason' | 'gallery' | 'howToGetThere'>> = [
  { slug: 'iskandarkul', name: 'Iskandarkul', group: 'Lakes', lat: 39.08, lng: 68.37, description: 'An alpine lake in the Fan Mountains.', image: '/placeholders/destination.jpg' },
  { slug: 'sarez', name: 'Sarez', group: 'Lakes', lat: 38.20, lng: 72.75, description: 'A remote lake in the Pamir Mountains.', image: '/placeholders/destination.jpg' },
  { slug: 'seven-lakes', name: 'Seven Lakes', group: 'Lakes', lat: 39.16, lng: 67.81, description: 'A chain of lakes in the Shing Valley.', image: '/placeholders/destination.jpg' },
  { slug: 'karakul', name: 'Karakul', group: 'Lakes', lat: 39.02, lng: 73.46, description: 'A high-altitude lake in the eastern Pamirs.', image: '/placeholders/destination.jpg' },
  { slug: 'fan-mountains', name: 'Fan Mountains', group: 'Mountains and Valleys', lat: 39.20, lng: 68.25, description: 'Mountain trails and lakes in northwestern Tajikistan.', image: '/placeholders/destination.jpg' },
  { slug: 'bartang', name: 'Bartang', group: 'Mountains and Valleys', lat: 38.10, lng: 72.10, description: 'A valley winding through the western Pamirs.', image: '/placeholders/destination.jpg' },
  { slug: 'wakhan-ishkashim', name: 'Wakhan/Ishkashim', group: 'Mountains and Valleys', lat: 36.73, lng: 71.61, description: 'A valley and border town in the southern Pamirs.', image: '/placeholders/destination.jpg' },
  { slug: 'murgab', name: 'Murgab', group: 'Mountains and Valleys', lat: 38.17, lng: 73.97, description: 'A high-altitude town in the eastern Pamirs.', image: '/placeholders/destination.jpg' },
  { slug: 'khorog', name: 'Khorog', group: 'Historic Cities', lat: 37.49, lng: 71.55, description: 'The regional capital of GBAO.', image: '/placeholders/destination.jpg' },
  { slug: 'panjakent', name: 'Panjakent', group: 'Historic Cities', lat: 39.50, lng: 67.61, description: 'A city near ancient Sogdian heritage sites.', image: '/placeholders/destination.jpg' },
  { slug: 'hissor', name: 'Hissor', group: 'Historic Cities', lat: 38.53, lng: 68.55, description: 'A historic town west of Dushanbe.', image: '/placeholders/destination.jpg' },
  { slug: 'khujand', name: 'Khujand', group: 'Historic Cities', lat: 40.28, lng: 69.62, description: 'A city on the Syr Darya in northern Tajikistan.', image: '/placeholders/destination.jpg' },
];
// Editorial detail fields remain explicit placeholders until the operator verifies each place.
export const destinations: Destination[] = base.map((place) => ({
  ...place, region: '[Region to confirm]', coordinates: { lat: place.lat, lng: place.lng },
  highlights: ['[Local highlights to confirm]', '[Activities and access to confirm]', '[Cultural context to confirm]'],
  bestSeason: '[Best season to confirm]', howToGetThere: '[Route and transport to confirm with the local team]',
  gallery: [place.image, '/placeholders/hero.jpg', '/placeholders/lakes.jpg'],
}));
