import { z } from 'zod';
import { catalogTours, type CatalogTour } from '@/content/expedition-home';
import { tours, type Tour } from '@/data/tours';
import { heroSlides, tourPhotos } from '@/data/photos';

const tones = ['forest', 'leaf', 'alert', 'earth'] as const;
const plain = (max: number) => z.string().max(max).transform((value) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/<[^>]*>/g, '').trim());
const imageSrc = z.string().trim().max(500).refine((value) => {
  if (value.startsWith('/photos/') && !value.includes('..') && !value.includes('\\')) return true;
  if (value.startsWith('/api/media?src=')) {
    const source = new URL(value, 'https://pamirecotourism.com').searchParams.get('src') || '';
    return (source.startsWith('tours/') || source.startsWith('motorcycles/')) && !source.includes('..') && !source.includes('\\');
  }
  return value.startsWith('https://') && !value.includes(' ');
}, 'Недопустимый адрес фото');

export const tourSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80),
  title: plain(160).pipe(z.string().min(2).max(160)),
  category: z.enum(['trekking', 'driving']),
  price: z.number().int().min(0).max(100000).nullable(),
  days: z.number().int().min(1).max(90).nullable(),
  distance: plain(80),
  maxAltitude: plain(80),
  difficulty: plain(80),
  season: plain(80),
  groupSize: plain(80),
  hook: plain(400),
  overview: plain(6000),
  blurb: plain(500),
  route: plain(180),
  badge: plain(80),
  level: plain(40),
  levelTone: z.enum(tones),
  rating: plain(40),
  image: z.string().max(500),
  imageAlt: plain(180),
  gallery: z.array(z.object({ src: imageSrc, alt: plain(180) })).max(16),
  regions: z.array(z.enum(['pamir-highway', 'fan-mountains', 'wakhan', 'sarez'])).max(4),
  activities: z.array(z.enum(['4x4', 'trekking', 'lakes', 'wildlife'])).max(4),
  winter: z.boolean(),
  showOnHome: z.boolean(),
  published: z.boolean(),
  sort: z.number().int().min(0).max(9999),
  itinerary: z.array(z.object({
    day: z.number().int().min(1).max(90),
    title: plain(160),
    description: plain(2000),
    overnight: plain(160),
  })).max(40),
  included: z.array(plain(240)).max(40),
  excluded: z.array(plain(240)).max(40),
  gear: z.array(plain(240)).max(40),
  faq: z.array(z.object({ question: plain(240), answer: plain(2000) })).max(20),
  destinations: z.array(z.string().regex(/^[a-z0-9-]+$/).max(80)).max(20),
}).strict();

export type StoredTour = z.infer<typeof tourSchema>;
export type HomeCard = CatalogTour & { priceAmount: string; priceCaption: string };

export function slugify(value: string) {
  const slug = value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  return slug || 'tour';
}

export function priceLabel(price: number | null) {
  if (price === null) return { priceAmount: 'Custom Quote', priceCaption: 'Permit Dependent' };
  return { priceAmount: `$${price.toLocaleString('en-US')}`, priceCaption: 'Per Person' };
}

export function toPublicTour(tour: StoredTour): Tour {
  return {
    slug: tour.slug,
    title: tour.title,
    category: tour.category,
    price: tour.price === null ? 'On request' : tour.price,
    days: tour.days,
    distance: tour.distance || null,
    maxAltitude: tour.maxAltitude || null,
    difficulty: tour.difficulty || null,
    season: tour.season || null,
    groupSize: tour.groupSize || null,
    hook: tour.hook || tour.blurb,
    overview: tour.overview || tour.blurb,
    gallery: tour.gallery.map((photo) => photo.src),
    itinerary: tour.itinerary,
    included: tour.included,
    excluded: tour.excluded,
    gear: tour.gear,
    faq: tour.faq,
    destinations: tour.destinations,
    destinationsConfirmed: false,
  };
}

export function toHomeCard(tour: StoredTour): HomeCard {
  const cover = tour.gallery[0];
  return {
    slug: tour.slug,
    title: tour.title,
    blurb: tour.blurb || tour.hook,
    route: tour.route || 'Pamir, Tajikistan',
    badge: tour.badge || (tour.days ? `${tour.days} days` : 'Dates on request'),
    level: tour.level || 'Moderate',
    levelTone: tour.levelTone,
    rating: tour.rating,
    image: cover?.src || tour.image || heroSlides[0].src,
    imageAlt: cover?.alt || tour.imageAlt || tour.title,
    regions: tour.regions,
    activities: tour.activities,
    winter: tour.winter,
    ...priceLabel(tour.price),
  };
}

const regionFor = (destinations: string[]) => {
  const regions = new Set<StoredTour['regions'][number]>();
  for (const slug of destinations) {
    if (['khorog', 'murgab', 'karakul'].includes(slug)) regions.add('pamir-highway');
    if (slug === 'wakhan-ishkashim') regions.add('wakhan');
    if (['bartang', 'sarez'].includes(slug)) regions.add('sarez');
    if (['fan-mountains', 'iskandarkul', 'seven-lakes', 'panjakent'].includes(slug)) regions.add('fan-mountains');
  }
  return [...regions];
};

export function seedTours(): StoredTour[] {
  const cards = new Map(catalogTours.map((card, index) => [card.slug, { card, index }]));
  return [...tours].sort((a, b) => (cards.get(a.slug)?.index ?? 100) - (cards.get(b.slug)?.index ?? 100)).map((tour, sort) => {
    const card = cards.get(tour.slug)?.card;
    const photos = (tourPhotos[tour.slug] ?? []).map((photo) => ({ src: photo.src, alt: photo.alt }));
    const image = card?.image ?? photos[0]?.src ?? heroSlides[0].src;
    const imageAlt = card?.imageAlt ?? photos[0]?.alt ?? tour.title;
    const placeholder = tour.overview.startsWith('[Placeholder]');
    return tourSchema.parse({
      slug: tour.slug,
      title: card?.title ?? tour.title,
      category: tour.category,
      price: tour.price === 'On request' ? null : tour.price,
      days: tour.days,
      distance: tour.distance ?? '',
      maxAltitude: tour.maxAltitude ?? '',
      difficulty: tour.difficulty ?? '',
      season: tour.season ?? '',
      groupSize: tour.groupSize ?? '',
      hook: card?.blurb ?? tour.hook,
      overview: placeholder && card ? card.blurb : tour.overview,
      blurb: card?.blurb ?? tour.hook,
      route: card?.route ?? 'Pamir, Tajikistan',
      badge: card?.badge ?? (tour.days ? `${tour.days} days` : 'Dates on request'),
      level: card?.level ?? (tour.category === 'driving' ? 'Moderate' : 'Challenging'),
      levelTone: card?.levelTone ?? (tour.category === 'driving' ? 'forest' : 'alert'),
      rating: card?.rating ?? '',
      image,
      imageAlt,
      gallery: photos.length ? photos : [{ src: image, alt: imageAlt }],
      regions: card?.regions.filter((region): region is StoredTour['regions'][number] => ['pamir-highway', 'fan-mountains', 'wakhan', 'sarez'].includes(region)) ?? regionFor(tour.destinations),
      activities: card?.activities.filter((activity): activity is StoredTour['activities'][number] => ['4x4', 'trekking', 'lakes', 'wildlife'].includes(activity)) ?? (tour.category === 'driving' ? ['4x4'] : ['trekking']),
      winter: card?.winter ?? false,
      showOnHome: Boolean(card),
      published: true,
      sort,
      itinerary: tour.itinerary,
      included: tour.included,
      excluded: tour.excluded,
      gear: tour.gear,
      faq: tour.faq,
      destinations: tour.destinations,
    });
  });
}

export function blankTour(sort: number): StoredTour {
  return {
    slug: '',
    title: '',
    category: 'driving',
    price: null,
    days: null,
    distance: '',
    maxAltitude: '',
    difficulty: '',
    season: '',
    groupSize: '',
    hook: '',
    overview: '',
    blurb: '',
    route: '',
    badge: '',
    level: 'Moderate',
    levelTone: 'forest',
    rating: '',
    image: '',
    imageAlt: '',
    gallery: [],
    regions: [],
    activities: ['4x4'],
    winter: false,
    showOnHome: true,
    published: true,
    sort,
    itinerary: [{ day: 1, title: '', description: '', overnight: '' }],
    included: [],
    excluded: [],
    gear: [],
    faq: [],
    destinations: [],
  };
}

export function parseTourList(value: unknown) {
  const parsed = z.array(tourSchema).safeParse(value);
  return parsed.success ? parsed.data : null;
}
