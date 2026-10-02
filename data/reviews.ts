export type Review = { id: string; quote: string; author: string; countryFlag: string; tripTitle: string; rating: string; avatar: string | null; placeholder: true };
// Illustrative layout content only. Replace with verified, approved testimonials before launch.
export const reviews: Review[] = [
  { id: 'sample-1', quote: '[Placeholder review] A traveler story about a mountain journey will appear here after approval.', author: 'Sample traveler 01', countryFlag: '🇩🇪', tripTitle: '4x4 Tour', rating: '[X]/5', avatar: null, placeholder: true },
  { id: 'sample-2', quote: '[Placeholder review] This space is reserved for a real guest’s account of the lakes and trails.', author: 'Sample traveler 02', countryFlag: '🇫🇷', tripTitle: 'Trekking Mt. Lakes', rating: '[X]/5', avatar: null, placeholder: true },
  { id: 'sample-3', quote: '[Placeholder review] Add a verified guest quote, with their permission, before publishing.', author: 'Sample traveler 03', countryFlag: '🇬🇧', tripTitle: 'Fan Mountain Lakes', rating: '[X]/5', avatar: null, placeholder: true },
  { id: 'sample-4', quote: '[Placeholder review] A specific memory from a real expedition belongs here.', author: 'Sample traveler 04', countryFlag: '🇮🇹', tripTitle: 'Pamir Classical 4x4', rating: '[X]/5', avatar: null, placeholder: true },
  { id: 'sample-5', quote: '[Placeholder review] Replace this sample with an approved testimonial and source.', author: 'Sample traveler 05', countryFlag: '🇳🇱', tripTitle: 'Trekking Cross Border', rating: '[X]/5', avatar: null, placeholder: true },
  { id: 'sample-6', quote: '[Placeholder review] Add a real traveler’s own words after verification.', author: 'Sample traveler 06', countryFlag: '🇺🇸', tripTitle: 'Motorcycle Tour in High Pamirs', rating: '[X]/5', avatar: null, placeholder: true },
];
