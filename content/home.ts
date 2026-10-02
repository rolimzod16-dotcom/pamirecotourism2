import { heroSlides, homeGlimpse, tourPhotos } from '@/data/photos';

export const home = {
  hero: {
    eyebrow: 'PAMIR ECOTOURISM · TAJIKISTAN',
    title: 'Where the Roof of the World begins.',
    subtitle: 'Small-group expeditions led by Pamiri locals, from the family home base in Rushan, GBAO.',
    explore: 'Explore Tours', plan: 'Plan my trip', scroll: 'Scroll to explore',
    slides: heroSlides,
    previous: 'Previous photograph', next: 'Next photograph', slide: 'Show photograph',
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
  reviews: {
    eyebrow: 'GUEST VOICES', title: 'Travelers say', intro: 'Sample layout only. Real reviews and ratings will appear after verification and permission.',
    badges: ['TripAdvisor [add real badge]', 'Google [add real badge]', 'Licensed operator [add real badge]'],
    placeholder: 'PLACEHOLDER · NOT A REAL REVIEW', previous: 'Previous review', next: 'Next review',
  },
  team: { eyebrow: 'THE PEOPLE', title: 'Meet your hosts', intro: 'The people behind your journey, photographed for Pamir Ecotourism.', languages: 'Languages', instagram: 'Instagram profile' },
  process: {
    eyebrow: 'YOUR NEXT STEPS', title: 'How it works',
    steps: [
      { icon: 'message', title: 'Inquiry', text: 'Tell us your interests, dates and group size. Share the places you most want to see.' },
      { icon: 'route', title: 'Custom itinerary', text: 'The team will discuss a route and practical details with you. Nothing is final until you agree.' },
      { icon: 'check', title: 'Confirmation', text: 'Review the itinerary, current price and inclusions directly with the team before confirming.' },
      { icon: 'mountain', title: 'Adventure', text: 'Meet your local hosts and set out on the agreed route.' },
    ],
    infoTitle: "Permits, visas and what's included",
    bullets: ['Some Pamir routes may involve a GBAO permit; confirm the requirements for your route and nationality.', 'Check your visa requirements before travel with the relevant official authority.', 'Ask for a written list of transport, accommodation, meals and exclusions for your chosen trip.'],
    infoLink: 'Ask us a question',
  },
  gallery: { items: homeGlimpse, eyebrow: 'THE VIEW', title: 'Glimpses of the Pamirs', intro: 'Photographs from the lakes, roads and valleys on our journeys.', full: 'View full gallery', open: 'Open image', close: 'Close gallery image', previous: 'Previous image', next: 'Next image', counter: 'Image' },
  inquiry: {
    eyebrow: 'START A CONVERSATION', title: "Tell us your dream route. We'll shape the trip.", reply: '[Reply within 24 hours — to confirm with the team.]',
    steps: ['Trip', 'Details', 'Contact'], next: 'Continue', back: 'Back', submit: 'Send inquiry', sending: 'Sending…',
    activity: 'Activity or tour', activityPrompt: 'Choose a tour', destination: 'Destination (optional)', destinationPrompt: 'Choose a destination', special: 'Special request (optional)', specialPrompt: 'Tell us what matters to you',
    date: 'Preferred date or month', datePrompt: 'For example, June 2027', group: 'Group size', flexibility: 'My dates are flexible',
    name: 'Your name', email: 'Email address', phone: 'Phone / WhatsApp', method: 'Preferred contact method', methods: ['Email', 'WhatsApp'],
    honeypot: 'Leave this field empty',
    successTitle: 'Thank you for planning with us.', successBody: 'This is a prototype: the inquiry was accepted by a demo endpoint but was not emailed or saved. Please contact the team directly.',
    chat: 'Chat on WhatsApp', error: 'Something went wrong. Please try again, or contact us directly.', retry: 'Try again',
    contactTitle: 'Prefer to talk directly?', contactIntro: 'Reach the team in Rushan by WhatsApp, email or phone.',
    required: 'This field is required.', invalidEmail: 'Enter a valid email address.', invalidPhone: 'Enter a phone or WhatsApp number.', invalidGroup: 'Enter a group size of 1 or more.',
    progress: 'Form progress', stepAnnouncement: 'Step',
  }
} as const;

export const featuredTourMedia: Record<string, { image: string; hook: string }> = {
  'pamir-highway-4x4': { image: tourPhotos['pamir-highway-4x4'][0].src, hook: 'Take the high road into the heart of the Pamirs.' },
  'mountain-lakes-trekking': { image: tourPhotos['mountain-lakes-trekking'][0].src, hook: 'Walk toward the stillness of mountain lakes.' },
  'fan-mountain-lakes': { image: tourPhotos['fan-mountain-lakes'][0].src, hook: 'A journey shaped by the Fan Mountains and their lakes.' },
  'snow-leopard-tour': { image: tourPhotos['snow-leopard-tour'][0].src, hook: 'Explore high-altitude landscapes with a local team.' },
  'cross-border-trekking': { image: tourPhotos['cross-border-trekking'][0].src, hook: 'Follow mountain trails across changing terrain.' },
};
export const featuredTourSlugs = Object.keys(featuredTourMedia);
