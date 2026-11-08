export const routesCopy = {
  common: { home: 'Home', tours: 'Tours', destinations: 'Destinations', placeholder: 'On request', imagePlaceholder: 'Photograph', mountainAlt: 'Landscape from a Pamir Ecotourism journey in Tajikistan', breadcrumb: 'Breadcrumb', discover: 'Explore', inquire: 'Plan a trip', whatsapp: 'Chat on WhatsApp' },
  tours: {
    eyebrow: 'PAMIR ECOTOURISM · JOURNEYS', title: 'Journeys in the Pamirs', intro: '4x4 journeys, treks and wildlife expeditions across the Pamirs and Tajikistan. Every trip can be adjusted to your dates, pace and group.',
    all: 'All', trekking: 'Trekking', driving: 'Driving', filterLabel: 'Filter tours by category', sortLabel: 'Sort journeys',
    sort: { default: 'Featured order', price: 'Price low to high', duration: 'Duration', difficulty: 'Difficulty' },
    results: 'journeys found', unknownSort: 'Journeys without a set duration or difficulty keep their featured order.', empty: 'No journeys match this filter. Try another category.',
    ctaTitle: "Can't find your route? We build custom trips.", ctaText: 'Tell us what you want to see and we will discuss a route with you.', ctaButton: 'Plan my trip',
  },
  tour: {
    overview: 'Overview', photos: 'Photographs', itinerary: 'Day-by-day itinerary', itineraryNote: 'Timings can shift with road, weather and border conditions; your guide adjusts the plan on the way.',
    map: 'Route map', mapNote: 'Approximate route line for orientation, not a navigation map.',
    included: 'Included', excluded: 'Not included', gear: 'What to bring', safety: 'Safety and support',
    safetyText: 'Before departure the team goes through the route, altitude, road and weather conditions and emergency contacts with you. Ask for these details in writing with your quote.',
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
    relatedNote: 'Journeys from our catalogue that visit this place.',
    gallery: 'A closer look', cta: 'Make this place part of your journey', ctaText: 'Ask the team about the route and practical details.', action: 'Plan my trip', region: 'Region', coordinates: 'Approximate coordinates',
    emptyTours: 'Ask us to build a journey here.',
  },
} as const;
