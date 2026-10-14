export const pages = {
  gallery: {
    eyebrow: 'THE PAMIRS IN FRAMES', title: 'The landscapes behind the journey',
    intro: 'Photographs from Pamir Ecotourism journeys: lakes, mountain roads, treks and the people who host them.',
    categories: ['All', 'Lakes', 'Mountains', 'Treks', '4x4 and Roads', 'People and Culture'] as const,
    filterLabel: 'Filter gallery images', open: 'Open image', close: 'Close image', previous: 'Previous image', next: 'Next image', image: 'Image',
    ctaTitle: 'Want to see it in person? Plan your trip.', ctaButton: 'Plan your trip',
  },
  about: {
    eyebrow: 'OUR STORY', title: 'Born in the Pamirs. Hosting travelers in Tajikistan.',
    intro: 'Meet the local team behind Pamir Ecotourism and the mountain region they call home.',
    storyTitle: 'Our story', story: [
      'Pamir Ecotourism is a local operator from Rushan in GBAO, the mountain heart of Tajikistan. The Pamir Highway, the Wakhan valley and the Bartang are our home roads, not a brochure.',
      'We plan each journey ourselves: 4x4 overland routes, treks to alpine lakes and motorcycle trips, with local drivers, guides and family homestays along the way.',
      'Travelers meet the people of the Pamirs as hosts, not as a show. You stay in their homes, eat at their tables and see the valleys through their eyes.',
    ],
    valuesTitle: 'What guides us', values: [
      { icon: 'map', title: 'Local first', text: 'Routes are planned by people who live in the Pamirs and know the roads, passes and seasons.' },
      { icon: 'shield', title: 'Safety', text: 'Each trip starts with a route briefing on altitude, roads, weather and emergency contacts.' },
      { icon: 'users', title: 'Small groups', text: 'We keep groups small so every journey stays personal and light on the villages we visit.' },
      { icon: 'leaf', title: 'Respect for nature and culture', text: 'We ask guests to follow local customs and leave the lakes and valleys as they found them.' },
    ],
    responsibleTitle: 'Travel with care', responsible: [
      'We work with local drivers, guides and family homestays, so your money stays in the Pamirs.',
      'We ask travelers to carry out their waste and protect water sources and fragile high-altitude landscapes.',
      'We brief guests on local customs, dress and photography etiquette before they meet their hosts.',
    ],
    teamEyebrow: 'THE PEOPLE', teamTitle: 'Meet your hosts', teamIntro: 'The people who plan your route and meet you on the road.',
    languages: 'Languages',
    credentialsTitle: 'Credentials and partners', credentials: [] as string[],
    ctaTitle: 'Let’s plan your route together.', ctaButton: 'Contact the team',
  },
  contact: {
    eyebrow: 'GET IN TOUCH', title: 'Start planning with the local team', intro: 'Share your trip idea or reach us directly on WhatsApp or email. The local team replies to every inquiry personally.',
    mapTitle: 'Find us in Rushan', mapNote: 'Our base is in Rushan, on the Pamir Highway in GBAO, Tajikistan.',
    openMaps: 'Open in Maps', mapLoading: 'Loading map…', pin: 'Rushan, GBAO',
    hours: 'Questions in English or Russian', reply: 'WhatsApp is the fastest way to reach us',
    faqTitle: 'Before you travel', faq: [
      { question: 'Do I need a permit or visa?', answer: 'Most visitors can apply for a Tajik e-visa online. Travel in the Pamirs (GBAO) also needs a GBAO permit, which the team can arrange with your booking. Requirements depend on nationality, so check current official guidance.' },
      { question: 'When is the best season?', answer: 'June to September is the main season for the high Pamirs, the Pamir Highway and mountain treks. The Fann Mountains and lower valleys open earlier in spring and stay good into October.' },
      { question: 'What should I pack?', answer: 'Layers for big temperature swings, a warm jacket for nights above 3,000 m, sun protection and broken-in boots. The team sends a trip-specific list with your quote.' },
      { question: 'How is safety handled?', answer: 'Each trip starts with a route briefing on altitude, road and weather conditions and emergency contacts. Ask the team for the guide, vehicle and support arrangements for your journey in writing.' },
      { question: 'How do payments work?', answer: 'Payment methods, timing and cancellation terms are agreed in writing with your quote before you confirm the trip.' },
    ],
  },
  newsletter: {
    title: 'Stay in touch', intro: 'Occasional journey updates. Demo sign-up only until mailing is connected.', label: 'Email address for newsletter', placeholder: 'Your email address', submit: 'Join the list', sending: 'Checking…',
    success: 'Saved for the team. This does not send emails yet.', error: 'We could not check that address. Please try again.', invalid: 'Enter a valid email address.',
  },
  system: {
    notFoundTitle: 'This path is off the map.', notFoundText: 'The page you requested could not be found.', home: 'Back to home', tours: 'Explore tours',
    errorTitle: 'The page could not load.', errorText: 'Please try again. If the problem continues, return home.', retry: 'Try again',
  },
} as const;
