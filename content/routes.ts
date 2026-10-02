export const routesCopy = {
  common: { home: 'Home', tours: 'Tours', destinations: 'Destinations', placeholder: '[Details to confirm]', imagePlaceholder: 'Photograph', mountainAlt: 'Landscape from a Pamir Ecotourism journey in Tajikistan', breadcrumb: 'Breadcrumb', discover: 'Explore', inquire: 'Plan a trip', whatsapp: 'Chat on WhatsApp' },
  tours: {
    eyebrow: 'PAMIR ECOTOURISM · JOURNEYS', title: 'Journeys in the Pamirs', intro: 'Browse the current journey ideas. Ask the local team to confirm the route, timing, price and availability for your dates.',
    all: 'All', trekking: 'Trekking', driving: 'Driving', filterLabel: 'Filter tours by category', sortLabel: 'Sort journeys',
    sort: { default: 'Featured order', price: 'Price low to high', duration: 'Duration', difficulty: 'Difficulty' },
    results: 'journeys found', unknownSort: 'Duration and difficulty are awaiting confirmation, so those sort options currently retain the original order.', empty: 'No journeys match this filter. Try another category.',
    ctaTitle: "Can't find your route? We build custom trips.", ctaText: 'Tell us what you want to see and we will discuss a route with you.', ctaButton: 'Plan my trip',
  },
  tour: {
    overview: 'Overview', photos: 'Photographs', itinerary: 'Day-by-day itinerary', itineraryNote: 'Sample day sequence only. Total duration and overnight stops must be confirmed.',
    map: 'Route map', mapNote: 'Illustrative route line only. It is not a navigation map or a confirmed itinerary.',
    included: 'Included', excluded: 'Not included', gear: 'What to bring', safety: 'Safety and support',
    safetyText: '[Placeholder] Ask the operator to confirm guide arrangements, route briefing, emergency contacts, vehicle condition and current travel conditions in writing.',
    faq: 'Frequently asked questions', related: 'Related journeys', ask: 'Ask a question', request: 'Request this trip',
    facts: { days: 'Days', distance: 'Distance', altitude: 'Max altitude', difficulty: 'Difficulty', season: 'Season', group: 'Group size', price: 'Price' },
    overnight: 'Overnight', day: 'Day', from: 'From', priceRequest: 'On request', bookingNote: 'Final route, inclusions and quote are confirmed by the local team.',
  },
  destinations: {
    eyebrow: 'PLACES TO EXPLORE', title: 'Destinations across Tajikistan', intro: 'From lakes and high valleys to historic cities, start with a place and shape a journey around it.',
    all: 'All places', tabsLabel: 'Filter destinations by region type', groups: { lakes: 'Lakes', mountains: 'Mountains and Valleys', cities: 'Historic Cities' },
    results: 'places found', empty: 'No destinations in this category.',
  },
  destination: {
    about: 'About this place', highlights: 'Highlights', how: 'How to get there', season: 'Best time to visit', related: 'Tours that include this place',
    relatedNote: 'Suggested links are placeholders; the operator must confirm which tours actually include this destination.',
    gallery: 'A closer look', cta: 'Make this place part of your journey', ctaText: 'Ask the team about the route and practical details.', action: 'Plan my trip', region: 'Region', coordinates: 'Approximate coordinates',
    emptyTours: 'Ask us to build a journey here.',
  },
} as const;
