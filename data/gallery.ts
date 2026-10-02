export type GalleryCategory = 'Lakes' | 'Mountains' | 'Treks' | '4x4 and Roads' | 'People and Culture';
export type GalleryItem = { id: string; category: GalleryCategory; src: string; alt: string; caption: string };
const seeds: { category: GalleryCategory; src: string; label: string }[] = [
  { category: 'Lakes', src: '/placeholders/lakes.jpg', label: 'lake landscape' },
  { category: 'Mountains', src: '/placeholders/hero.jpg', label: 'mountain horizon' },
  { category: 'Treks', src: '/placeholders/cross.jpg', label: 'mountain trail' },
  { category: '4x4 and Roads', src: '/placeholders/4x4.jpg', label: 'highland road' },
  { category: 'People and Culture', src: '/placeholders/portrait.svg', label: 'portrait silhouette' },
  { category: 'Lakes', src: '/placeholders/destination.jpg', label: 'alpine scenery' },
  { category: 'Mountains', src: '/placeholders/snow.jpg', label: 'snowy peaks' },
  { category: 'Treks', src: '/placeholders/fan.jpg', label: 'mountain slope' },
  { category: '4x4 and Roads', src: '/placeholders/hero.jpg', label: 'mountain road setting' },
  { category: 'People and Culture', src: '/placeholders/portrait.svg', label: 'person silhouette' },
  { category: 'Lakes', src: '/placeholders/fan.jpg', label: 'mountain lake setting' },
  { category: 'Mountains', src: '/placeholders/cross.jpg', label: 'ridge landscape' },
  { category: 'Treks', src: '/placeholders/lakes.jpg', label: 'trekking landscape' },
  { category: '4x4 and Roads', src: '/placeholders/4x4.jpg', label: 'road landscape' },
  { category: 'People and Culture', src: '/placeholders/portrait.svg', label: 'team portrait silhouette' },
  { category: 'Lakes', src: '/placeholders/destination.jpg', label: 'lake and valley setting' },
  { category: 'Mountains', src: '/placeholders/hero.jpg', label: 'wide mountain panorama' },
  { category: 'Treks', src: '/placeholders/snow.jpg', label: 'high-altitude trail setting' },
  { category: '4x4 and Roads', src: '/placeholders/cross.jpg', label: 'remote road setting' },
  { category: 'People and Culture', src: '/placeholders/portrait.svg', label: 'portrait graphic' },
  { category: 'Lakes', src: '/placeholders/lakes.jpg', label: 'still water setting' },
  { category: 'Mountains', src: '/placeholders/fan.jpg', label: 'rocky landscape' },
  { category: 'Treks', src: '/placeholders/destination.jpg', label: 'valley walking setting' },
  { category: '4x4 and Roads', src: '/placeholders/4x4.jpg', label: 'expedition road setting' },
];
// All 24 entries are illustrative assets, repeated intentionally until approved photography is supplied.
export const gallery: GalleryItem[] = seeds.map((seed, index) => ({
  id: `sample-${index + 1}`, category: seed.category, src: seed.src,
  alt: `[Placeholder image ${index + 1}] Illustrative ${seed.label}.`,
  caption: `[Placeholder caption] ${seed.category} · image ${index + 1}. Replace with verified location and photographer credit.`,
}));
