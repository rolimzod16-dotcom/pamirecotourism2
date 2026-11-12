import { placePhotos } from './photos';
export type DestinationGroup = 'Lakes' | 'Mountains and Valleys' | 'Historic Cities';
export type Destination = {
  slug: string; name: string; group: DestinationGroup; lat: number; lng: number;
  description: string; image: string; region: string; coordinates: { lat: number; lng: number }; highlights: string[]; bestSeason: string; gallery: string[]; howToGetThere: string;
};
// Coordinates are approximate map points, not navigation or route data.
const base: Array<Omit<Destination, 'region' | 'coordinates' | 'highlights' | 'bestSeason' | 'gallery' | 'howToGetThere'>> = [
  { slug: 'iskandarkul', name: 'Iskandarkul', group: 'Lakes', lat: 39.08, lng: 68.37, description: 'An alpine lake in the Fan Mountains.', image: '/placeholders/destination.jpg' },
  { slug: 'sarez', name: 'Lake Sarez', group: 'Lakes', lat: 38.20, lng: 72.75, description: 'A remote lake in the Pamir Mountains.', image: '/placeholders/destination.jpg' },
  { slug: 'seven-lakes', name: 'Seven Lakes', group: 'Lakes', lat: 39.16, lng: 67.81, description: 'A chain of lakes in the Shing Valley.', image: '/placeholders/destination.jpg' },
  { slug: 'karakul', name: 'Karakul', group: 'Lakes', lat: 39.02, lng: 73.46, description: 'A high-altitude lake in the eastern Pamirs.', image: '/placeholders/destination.jpg' },
  { slug: 'fan-mountains', name: 'Fan Mountains', group: 'Mountains and Valleys', lat: 39.20, lng: 68.25, description: 'Mountain trails and lakes in northwestern Tajikistan.', image: '/placeholders/destination.jpg' },
  { slug: 'bartang', name: 'Bartang Valley', group: 'Mountains and Valleys', lat: 38.10, lng: 72.10, description: 'A valley winding through the western Pamirs.', image: '/placeholders/destination.jpg' },
  { slug: 'wakhan-ishkashim', name: 'Wakhan Valley', group: 'Mountains and Valleys', lat: 36.73, lng: 71.61, description: 'A valley and border town in the southern Pamirs.', image: '/placeholders/destination.jpg' },
  { slug: 'murgab', name: 'Murgab', group: 'Mountains and Valleys', lat: 38.17, lng: 73.97, description: 'A high-altitude town in the eastern Pamirs.', image: '/placeholders/destination.jpg' },
  { slug: 'khorog', name: 'Khorog', group: 'Historic Cities', lat: 37.49, lng: 71.55, description: 'The regional capital of GBAO.', image: '/placeholders/destination.jpg' },
  { slug: 'panjakent', name: 'Panjakent', group: 'Historic Cities', lat: 39.50, lng: 67.61, description: 'A city near ancient Sogdian heritage sites.', image: '/placeholders/destination.jpg' },
  { slug: 'hissor', name: 'Hissor', group: 'Historic Cities', lat: 38.53, lng: 68.55, description: 'A historic town west of Dushanbe.', image: '/placeholders/destination.jpg' },
  { slug: 'khujand', name: 'Khujand', group: 'Historic Cities', lat: 40.28, lng: 69.62, description: 'A city on the Syr Darya in northern Tajikistan.', image: '/placeholders/destination.jpg' },
];
// Travel notes for each place (region, highlights, access, season).
const details: Record<string, Pick<Destination, 'description' | 'region' | 'highlights' | 'bestSeason' | 'howToGetThere'>> = {
  iskandarkul: {
    description: 'A turquoise mountain lake at about 2,200 m in the Fan Mountains, named after Alexander the Great, with a waterfall and walking trails nearby.',
    region: 'Sughd, Fan Mountains',
    highlights: ['The turquoise lake framed by the Fan Mountains', 'The Fan Niagara waterfall and the small Snake Lake', 'Easy day walks and a base for Fan Mountain treks'],
    bestSeason: 'May to October. Summer days are warm and nights cool; snow can close the access road in winter.',
    howToGetThere: 'About 3–4 hours by car from Dushanbe through the Anzob tunnel, then a side road up the Iskandardarya valley.',
  },
  sarez: {
    description: 'A 60 km long sapphire lake at about 3,200 m in the heart of the Pamirs, created in 1911 when an earthquake triggered the giant landslide that formed the Usoy Dam.',
    region: 'GBAO, Rushan district (Bartang Valley)',
    highlights: ['The Usoy Dam, the tallest natural dam in the world', 'A boat crossing to the Irkht meteorological station', 'Trekking routes to the Langar Valley and the Uchkul lakes'],
    bestSeason: 'June to September. A special Sarez permit is required in addition to the GBAO permit.',
    howToGetThere: 'Drive up the Bartang Valley to Barchidiv, then two days on foot with donkeys via Khurmochaz to the dam. The team arranges the permit.',
  },
  'seven-lakes': {
    description: 'Seven glacier-fed lakes, from emerald to deep blue, strung along the Shing Valley in the western Fan Mountains, with mountain villages between them.',
    region: 'Sughd, Panjakent district (Shing Valley)',
    highlights: ['Seven lakes from Mijgon to Hazorchashma', 'Tajik mountain villages and homestays', 'Short hikes between the upper lakes'],
    bestSeason: 'May to October, with the brightest colours in early summer and autumn.',
    howToGetThere: 'About 5–6 hours from Dushanbe via Ayni and Panjakent, then a rough road up the Shing Valley. A 4x4 is recommended for the upper lakes.',
  },
  karakul: {
    description: 'The largest lake in Tajikistan, at about 3,900 m on the high plateau of the eastern Pamirs, a salt lake inside an ancient meteorite crater with a Kyrgyz village on its shore.',
    region: 'GBAO, Murghab district (eastern Pamir)',
    highlights: ['The road over the Ak-Baital Pass (4,656 m)', 'The Karaart geoglyphs and a lakeshore walk', 'Yurt and homestay nights in Karakul village'],
    bestSeason: 'June to September. Nights are cold all year, so bring warm layers.',
    howToGetThere: 'On the Pamir Highway (M41), about 4 hours north of Murghab via Ak-Baital, or from Osh in Kyrgyzstan via the Kyzyl-Art border.',
  },
  'fan-mountains': {
    description: 'A compact range of rocky peaks over 5,000 m and more than thirty alpine lakes in northwestern Tajikistan, the most popular trekking area in the country.',
    region: 'Sughd, between the Zeravshan and Hissar ranges',
    highlights: ['Alauddin, Kulikalon and Bolshoye Allo lakes', 'Multi-day treks over the Chimtarga and Alauddin passes', 'Iskandarkul and the Seven Lakes nearby'],
    bestSeason: 'June to September for trekking; high passes can hold snow until July.',
    howToGetThere: 'About 3–5 hours by car from Dushanbe through the Anzob tunnel to the Artuch, Iskandarkul or Shing trailheads.',
  },
  bartang: {
    description: 'A deep, remote valley in the western Pamirs where small villages cling to the Bartang River, known for its hospitality, traditional Pamiri houses and some of the best hiking in Tajikistan.',
    region: 'GBAO, Rushan district',
    highlights: ['Jizew, a car-free village among lakes', 'Bardara, Roshorv and Savnob with their shrines, castle and petroglyphs', 'The Ravmed community conservancy for ibex and snow leopard'],
    bestSeason: 'May to October for walking; January to March for winter wildlife trips.',
    howToGetThere: 'Turn off the Pamir Highway near Rushan, about two days by car from Dushanbe. The valley road is rough and can be cut by mudflows, so local drivers are essential.',
  },
  'wakhan-ishkashim': {
    description: 'The Tajik side of the Wakhan Valley along the Panj River, facing the Hindu Kush across the Afghan border, with ancient forts, hot springs and Wakhi villages.',
    region: 'GBAO, Ishkashim district',
    highlights: ['The Kah-Kaha and Yamchun fortresses', 'Bibi Fotima and Garm-Chashma hot springs', 'Langar petroglyphs and the museum of Muboraki Wakhoni'],
    bestSeason: 'May to October.',
    howToGetThere: 'About 2–3 hours south of Khorog to Ishkashim, then along the valley road to Langar. The road continues east over the Khargush Pass to the Pamir Highway.',
  },
  murgab: {
    description: 'The highest town in Tajikistan at about 3,650 m, a Kyrgyz settlement on the eastern Pamir plateau and the main stop on the Pamir Highway between Khorog and Karakul.',
    region: 'GBAO, Murghab district (eastern Pamir)',
    highlights: ['The container bazaar', 'Rangkul and Shorkul lakes nearby', 'Yaks, yurts and the open Pamir plateau'],
    bestSeason: 'June to September. Winters are long and very cold.',
    howToGetThere: 'On the Pamir Highway, a full day from Khorog via Alichur, or from Langar over the Khargush Pass via Bulunkul and Yashilkul lakes.',
  },
  khorog: {
    description: 'The capital of the Gorno-Badakhshan (Pamir) region at about 2,100 m, set where the Ghund meets the Panj, with the Pamir Botanical Garden and a lively bazaar.',
    region: 'GBAO, regional centre',
    highlights: ['The Pamir Botanical Garden, one of the highest in the world', 'The State Historical Museum and the Ismaili Centre', 'Gateway to the Wakhan, Ghund and Bartang valleys'],
    bestSeason: 'April to October.',
    howToGetThere: 'Two days by car from Dushanbe along the Panj via Kalai Khumb.',
  },
  panjakent: {
    description: 'A town in the Zeravshan valley next to the ruins of ancient Panjakent, one of the great cities of Sogdiana, famous for its wall paintings.',
    region: 'Sughd, Zeravshan valley',
    highlights: ['The ruins of the ancient Sogdian city', 'The Rudaki Museum of history and local lore', 'A base for the Seven Lakes and the Fan Mountains'],
    bestSeason: 'April to October.',
    howToGetThere: 'About 4–5 hours by car from Dushanbe via the Anzob tunnel and Ayni.',
  },
  hissor: {
    description: 'A historic town 30 km west of Dushanbe with the restored gate of the Hissar Fortress, two madrasahs of the 18th and 19th centuries and a 16th-century mausoleum.',
    region: 'Hissar district, near Dushanbe',
    highlights: ['The Hissar Fortress gate', 'The Kohna Madrasah museum and the new madrasah', 'The Makhdumi Azam mausoleum (16th century)'],
    bestSeason: 'All year; spring and autumn are the most comfortable.',
    howToGetThere: 'About 40 minutes by car from Dushanbe, often visited on the arrival or departure day of a tour.',
  },
  khujand: {
    description: 'The second city of Tajikistan on the Syr Darya, founded by Alexander the Great as Alexandria Eschate, with a fortress, a large covered bazaar and the Sheikh Muslihiddin complex.',
    region: 'Sughd, Fergana Valley',
    highlights: ['Khujand Fortress and the Museum of Sughd', 'The Panjshanbe bazaar', 'The Sheikh Muslihiddin mosque and mausoleum'],
    bestSeason: 'April to June and September to October; summers are very hot.',
    howToGetThere: 'About 5 hours by car from Dushanbe over the Shahristan Pass, or a short domestic flight.',
  },
};

export const destinations: Destination[] = base.map((place) => {
  const photos = placePhotos[place.slug] ?? [];
  const image = photos[0]?.src ?? place.image;
  return {
    ...place, ...details[place.slug], image, coordinates: { lat: place.lat, lng: place.lng },
    gallery: photos.map((photo) => photo.src),
  };
});
