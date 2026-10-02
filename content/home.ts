export const home = {
  hero: {
    eyebrow: 'PAMIR ECOTOURISM · TAJIKISTAN',
    title: 'Where the Roof of the World begins.',
    subtitle: 'Small-group expeditions led by Pamiri locals, from the family home base in Rushan, GBAO.',
    explore: 'Explore Tours', plan: 'Plan my trip', scroll: 'Scroll to explore',
  },
  trust: [
    { value: '[X] years', label: 'Experience · to confirm' },
    { value: '[X] travelers', label: 'Guest count · to confirm' },
    { value: '[X] rating', label: 'Review score · to confirm' },
    { value: 'Local team', label: 'Based in GBAO' },
  ],
  journeys: {
    eyebrow: 'THE JOURNEYS', title: 'Signature journeys',
    intro: 'Find your way through mountain passes, remote valleys and the places in between. Ask our team for current routes and availability.',
    all: 'See all tours', view: 'View journey', from: 'From', request: 'On request',
    daysUnknown: 'Days: to confirm', difficultyUnknown: 'Difficulty: to confirm', groupUnknown: 'Group: to confirm',
  },
  map: {
    eyebrow: 'EXPLORE THE REGION', title: 'A landscape worth getting to know.',
    intro: 'Choose a place on the map. Our team can help connect it to a journey that fits your plans.',
    filters: ['All', 'Lakes', 'Mountains and Valleys', 'Historic Cities'] as const,
    discover: 'Discover', mapLabel: 'Approximate destination locations in Tajikistan',
    coordinatesNote: 'Pin locations are approximate. Routes and access are confirmed with the local team.',
    loading: 'Loading destination map…', schematic: 'TAJIKISTAN · SCHEMATIC MAP', show: 'Show', close: 'Close destination card',
  },
  why: {
    eyebrow: 'WHY TRAVEL WITH US', title: 'Closer to the place. Closer to the people.',
    points: [
      { icon: 'home', title: 'Local and family-owned', text: 'Our home base is in Rushan, GBAO. Your plans start with a team rooted in the region.' },
      { icon: 'compass', title: 'Local guides', text: 'Explore with guides who know the mountain roads, valleys and communities along the route. Guide credentials and experience will be confirmed before publication.' },
      { icon: 'shield', title: 'Safety first', text: 'Ask us about route briefings, emergency contacts and vehicle arrangements before booking. Specific procedures are pending operator confirmation.' },
      { icon: 'users', title: 'Small groups', text: 'Trips are planned around a smaller group experience. Exact group size varies by journey and will be confirmed in your quote.' },
    ],
  },
} as const;

export const featuredTourMedia: Record<string, { image: string; hook: string }> = {
  'pamir-highway-4x4': { image: '/placeholders/4x4.jpg', hook: 'Take the high road into the heart of the Pamirs.' },
  'mountain-lakes-trekking': { image: '/placeholders/lakes.jpg', hook: 'Walk toward the stillness of mountain lakes.' },
  'fan-mountain-lakes': { image: '/placeholders/fan.jpg', hook: 'A journey shaped by the Fan Mountains and their lakes.' },
  'snow-leopard-tour': { image: '/placeholders/snow.jpg', hook: 'Explore high-altitude landscapes with a local team.' },
  'cross-border-trekking': { image: '/placeholders/cross.jpg', hook: 'Follow mountain trails across changing terrain.' },
};
export const featuredTourSlugs = Object.keys(featuredTourMedia);
