import { tours } from '@/data/tours';
import { tourPhotos, placePhotos, teamPortraits, heroSlides } from '@/data/photos';

export type CatalogTour = {
  slug: string;
  title: string;
  blurb: string;
  route: string;
  badge: string;
  level: string;
  levelTone: 'forest' | 'leaf' | 'alert' | 'earth';
  rating: string;
  image: string;
  imageAlt: string;
  regions: string[];
  activities: string[];
  winter: boolean;
};

const photo = (slug: string, fallbackAlt: string) => {
  const shot = tourPhotos[slug]?.[0];
  return { image: shot?.src ?? heroSlides[0].src, imageAlt: shot?.alt ?? fallbackAlt };
};

export const catalogTours: CatalogTour[] = [
  {
    slug: 'pamir-classical-4x4',
    title: 'Pamir Classical 4x4 Overland',
    blurb: 'Traverse the high-altitude Silk Road artery. Experience the dramatic Wakhan corridor, hot springs, petroglyphs, and lunar plateaus.',
    route: 'Dushanbe → Khorog → Murghab → Osh',
    badge: '8 Days • 4x4 Safari',
    level: 'Moderate',
    levelTone: 'forest',
    rating: '4.9 (124)',
    ...photo('pamir-classical-4x4', 'Pamir Classical 4x4 expedition'),
    regions: ['pamir-highway', 'wakhan'],
    activities: ['4x4'],
    winter: false,
  },
  {
    slug: 'pamir-highway-4x4',
    title: 'Complete Pamir 4x4 Tour',
    blurb: 'The ultimate exploration including isolated Bartang valley villages, Yashilkul lake, and the breathtaking Wakhan fortress network.',
    route: 'Dushanbe → Bartang → Wakhan → Karakul',
    badge: '10 Days • Overland Deep Dive',
    level: 'Iconic',
    levelTone: 'forest',
    rating: '5.0 (98)',
    ...photo('pamir-highway-4x4', '4x4 journey on the Pamir Highway'),
    regions: ['pamir-highway', 'wakhan', 'sarez'],
    activities: ['4x4'],
    winter: false,
  },
  {
    slug: 'cross-border-trekking',
    title: 'Cross Border Mountain Trekking',
    blurb: 'Hike high alpine passes connecting Tajikistan’s Karakul plateau with the Alay Valley of Kyrgyzstan, camping beside glacial moraines.',
    route: 'Tajikistan → Kyrgyzstan Frontier',
    badge: '12 Days • Alpine Trek',
    level: 'Challenging',
    levelTone: 'alert',
    rating: '4.9 (76)',
    ...photo('cross-border-trekking', 'Cross-border mountain trekking'),
    regions: ['wakhan', 'pamir-highway'],
    activities: ['trekking'],
    winter: false,
  },
  {
    slug: 'mountain-lakes-trekking',
    title: 'Glacial & Alpine Mountain Lakes Trek',
    blurb: 'Restricted permit access to the remote Lake Sarez formed by the 1911 Usoi Dam landslide, paired with high-altitude pass crossings.',
    route: 'Lake Sarez & Yashilkul Circuit',
    badge: '14 Days • High Wilderness',
    level: 'Advanced',
    levelTone: 'alert',
    rating: '4.9 (42)',
    ...photo('mountain-lakes-trekking', 'Alpine mountain lakes trek'),
    regions: ['sarez'],
    activities: ['trekking', 'lakes'],
    winter: false,
  },
  {
    slug: 'fan-mountain-lakes',
    title: 'Fan Mountains & Seven Lakes Tour',
    blurb: 'Hike through the cascading hues of the Seven Lakes (Haft Kul) and historic Iskandarkul, staying with hospitable Tajik farming families.',
    route: 'Samarkand/Penjikent → Haft Kul → Iskandarkul',
    badge: '7 Days • Lakes & Culture',
    level: 'Easy-Moderate',
    levelTone: 'leaf',
    rating: '5.0 (155)',
    ...photo('fan-mountain-lakes', 'Fan Mountains and Seven Lakes'),
    regions: ['fan-mountains'],
    activities: ['trekking', 'lakes'],
    winter: false,
  },
  {
    slug: 'snow-leopard-tour',
    title: 'Snow Leopard & Wildlife Winter Expedition',
    blurb: 'Conducted with local Pamiri conservation rangers and spotters to track Marco Polo sheep, ibex, and the elusive ghost of the mountains.',
    route: 'Murghab & Alichur High Plateau',
    badge: '10–14 Days • Wildlife Conservation',
    level: 'Specialist',
    levelTone: 'earth',
    rating: '5.0 (29)',
    ...photo('snow-leopard-tour', 'Snow leopard winter expedition'),
    regions: ['pamir-highway'],
    activities: ['wildlife'],
    winter: true,
  },
];

export function tourPrice(slug: string) {
  const tour = tours.find((item) => item.slug === slug);
  if (!tour || tour.price === 'On request') return { amount: 'Custom Quote', caption: 'Permit Dependent' };
  return { amount: `$${tour.price.toLocaleString('en-US')}`, caption: 'Per Person' };
}

export const destinationCards = [
  {
    slug: 'iskandarkul',
    kicker: 'Fan Mountains Landmark',
    title: 'Iskandarkul Lake',
    text: 'Named after Alexander the Great, this legendary turquoise lake sits at 2,195m, encircled by the jagged Fann Mountain needles and a waterfall.',
    image: placePhotos['iskandarkul'][0].src,
    alt: placePhotos['iskandarkul'][0].alt,
    className: 'lg:col-span-7 h-96',
    titleClass: 'text-3xl',
  },
  {
    slug: 'seven-lakes',
    kicker: 'Haft Kul Cascade',
    title: 'Seven Lakes (Haft Kul)',
    text: 'A staircase of seven jewel-toned lakes ranging from neon turquoise to indigo, linked by gentle mountain walking trails and welcoming village homestays.',
    image: placePhotos['seven-lakes'][0].src,
    alt: placePhotos['seven-lakes'][0].alt,
    className: 'lg:col-span-5 h-96',
    titleClass: 'text-2xl',
  },
  {
    slug: 'sarez',
    kicker: 'Bartang Deep Wilderness',
    title: 'Lake Sarez & Bartang',
    text: 'Earthquake-born pristine water hidden deep within one of the most rugged valleys of Central Asia. Permit required.',
    image: placePhotos['sarez'][0].src,
    alt: placePhotos['sarez'][0].alt,
    className: 'lg:col-span-4 h-80',
    titleClass: 'text-xl',
  },
  {
    slug: 'wakhan-ishkashim',
    kicker: 'Silk Road Stronghold',
    title: 'Wakhan Corridor',
    text: 'Ancient stone fortresses, natural thermal springs, and panoramic vistas looking across to the Hindu Kush.',
    image: placePhotos['wakhan-ishkashim'][0].src,
    alt: placePhotos['wakhan-ishkashim'][0].alt,
    className: 'lg:col-span-4 h-80',
    titleClass: 'text-xl',
  },
  {
    slug: 'karakul',
    kicker: '3,900m Meteorite Basin',
    title: 'Karakul High Lake',
    text: 'A crystalline endorheic lake formed by ancient meteorite impact, resting on an otherworldly high-altitude plateau.',
    image: placePhotos['karakul'][0].src,
    alt: placePhotos['karakul'][0].alt,
    className: 'lg:col-span-4 h-80',
    titleClass: 'text-xl',
  },
];

export const leaders = [
  {
    name: 'Sultonsho Guliev',
    role: 'Executive Director',
    badge: 'Founder & Director',
    bio: 'Over 20 years guiding across the Pamirs. Pioneer of community-based homestays in Rushan and Bartang valleys.',
    portrait: teamPortraits['Sultonsho Guliev'],
  },
  {
    name: 'Nasrullo Alinazarov',
    role: 'Co-founder & Senior Guide',
    badge: 'Lead Trek Leader',
    bio: 'Expert 4x4 navigator and high-altitude trek coordinator with over 150 successful Pamir Highway traverses.',
    portrait: teamPortraits['Nasrullo Alinazarov'],
  },
  {
    name: 'Gulomsho Alinazarov',
    role: 'Tour & Logistics Manager',
    badge: 'Field Operations',
    bio: 'Handles vehicle maintenance, Lake Sarez military permits, and regional GBAO administration permits.',
    portrait: teamPortraits['Gulomsho Alinazarov'],
  },
  {
    name: 'Cinzia Sippelli',
    role: 'European Travel Consultant',
    badge: 'International Relations',
    bio: 'Bridges international travelers with local operators, advising on flights, insurance, gear lists, and customized itineraries.',
    portrait: teamPortraits['Cinzia Sippelli'],
  },
];

export const stories = [
  {
    quote: 'The 10-day Pamir Highway tour with Nasrullo was hands down the trip of a lifetime. The Land Cruiser was immaculate, the homestays were warmly welcoming, and we felt 100% safe crossing the Ak-Baital Pass at 4,655m.',
    name: 'Markus & Clara Keller',
    meta: 'Zurich, Switzerland • Complete Pamir Tour',
    initials: 'MK',
  },
  {
    quote: 'Sultonsho organized our Lake Sarez wilderness trek with flawless precision. Getting the permits is notoriously difficult, but they handled everything smoothly. Seeing Sarez in complete quiet was humbling.',
    name: 'Elena Harrison',
    meta: 'Bristol, UK • Lake Sarez Expedition',
    initials: 'EH',
  },
  {
    quote: 'We booked the Fan Mountains & Haft Kul tour. The lakes change colors right before your eyes from turquoise to sapphire! Incredible food made by local families and our guide was an absolute fountain of knowledge.',
    name: 'David & Taisuke',
    meta: 'Tokyo, Japan • Fan Mountains Tour',
    initials: 'DT',
  },
];
