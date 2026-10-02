export const pages = {
  gallery: {
    eyebrow: 'THE PAMIRS IN FRAMES', title: 'The landscapes behind the journey',
    intro: 'Photographs from Pamir Ecotourism journeys: lakes, mountain roads, treks and the people who host them.',
    categories: ['All', 'Lakes', 'Mountains', 'Treks', '4x4 and Roads', 'People and Culture'] as const,
    filterLabel: 'Filter gallery images', open: 'Open image', close: 'Close image', previous: 'Previous image', next: 'Next image', image: 'Image',
    ctaTitle: 'Want to see it in person? Plan your trip.', ctaButton: 'Plan your trip',
  },
  about: {
    eyebrow: 'OUR STORY', title: 'Born in the Pamirs. Hosting travelers since [year placeholder].',
    intro: 'Meet the people behind Pamir Ecotourism and the region they call home.',
    storyTitle: 'Our story', story: [
      '[Placeholder — owners to replace] Tell the story of how the company began in Rushan and who started it.',
      '[Placeholder — owners to replace] Explain how the team plans journeys and works with local guides and hosts.',
      '[Placeholder — owners to replace] Share what visitors can expect from the people they will meet along the way.',
    ],
    valuesTitle: 'What guides us', values: [
      { icon: 'map', title: 'Local first', text: '[Confirm with owners] Explain how local knowledge shapes route planning and hosting.' },
      { icon: 'shield', title: 'Safety', text: '[Confirm with owners] Describe actual briefings, support and emergency procedures.' },
      { icon: 'users', title: 'Small groups', text: '[Confirm with owners] State the real group-size approach for each type of trip.' },
      { icon: 'leaf', title: 'Respect for nature and culture', text: '[Confirm with owners] Describe specific visitor guidance and community practices.' },
    ],
    responsibleTitle: 'Travel with care', responsible: [
      '[Confirm with owners] How the company works with local families and businesses.',
      '[Confirm with owners] How waste, water and sensitive landscapes are handled on trips.',
      '[Confirm with owners] How guests are guided to respect local customs and communities.',
    ],
    teamEyebrow: 'THE PEOPLE', teamTitle: 'Meet your hosts', teamIntro: 'Biographies and language details will be confirmed with each team member.',
    languages: 'Languages',
    credentialsTitle: 'Credentials and partners', credentials: ['Tourism license [add real]', 'Memberships [add real]', 'Partners [add real]'],
    ctaTitle: 'Let’s plan your route together.', ctaButton: 'Contact the team',
  },
  contact: {
    eyebrow: 'GET IN TOUCH', title: 'Start planning with the local team', intro: 'Share your trip idea or reach us directly. The form is a prototype until the inquiry service is connected.',
    mapTitle: 'Find us in Rushan', mapNote: '[Placeholder pin] Approximate Rushan area only; confirm the precise office location with the team.',
    openMaps: 'Open approximate location in Maps', mapLoading: 'Loading map…', pin: 'Approximate Rushan area',
    hours: 'Working hours: [confirm with owners]', reply: 'Response time: [confirm with owners]',
    faqTitle: 'Before you travel', faq: [
      { question: 'Do I need a permit or visa?', answer: '[Confirm] Requirements depend on nationality and route. Check current official guidance and ask the team about the GBAO permit.' },
      { question: 'When is the best season?', answer: '[Confirm] The suitable months vary by route and conditions; ask the team about your dates.' },
      { question: 'What should I pack?', answer: '[Confirm] Your packing list depends on activities, altitude and season. Request a trip-specific list.' },
      { question: 'How is safety handled?', answer: '[Confirm] Ask for the actual guide, briefing, vehicle and emergency arrangements for your journey.' },
      { question: 'How do payments work?', answer: '[Confirm] Ask the team for accepted payment methods, timing and cancellation terms in writing.' },
    ],
  },
  newsletter: {
    title: 'Stay in touch', intro: 'Occasional journey updates. Demo sign-up only until mailing is connected.', label: 'Email address for newsletter', placeholder: 'Your email address', submit: 'Join the list', sending: 'Checking…',
    success: 'Email validated. This prototype has not subscribed you yet.', error: 'We could not check that address. Please try again.', invalid: 'Enter a valid email address.',
  },
  system: {
    notFoundTitle: 'This path is off the map.', notFoundText: 'The page you requested could not be found.', home: 'Back to home', tours: 'Explore tours',
    errorTitle: 'The page could not load.', errorText: 'Please try again. If the problem continues, return home.', retry: 'Try again',
  },
} as const;
