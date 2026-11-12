// Search titles for the main pages, written for what travellers actually type into Google.
// Kept under ~45 characters so " | Pamir Ecotourism" still fits in the search result.
// The tour name shown on the page and in the admin is not affected.
export const tourSearchTitles: Record<string, string> = {
  'pamir-classical-4x4': 'Pamir Highway 4x4 Tour: 10 Days from Dushanbe',
  'mountain-lakes-trekking': 'Lake Sarez Trek: 15-Day Pamir Lakes Tour',
  'pamir-lakes-traverse': 'Pamir Lakes Traverse: Sarez to Zaroshkul',
  'pamir-walks-cultural': 'Bartang Valley Walks & Culture: 14 Days',
  'snow-leopard-tour': 'Snow Leopard Tour in Tajikistan: 11 Days',
  'high-pamirs-motorcycle': 'Pamir Highway Motorcycle Tour: 14 Days',
  'fan-mountain-lakes': 'Fann Mountains & Seven Lakes Tour',
  'cross-border-trekking': 'Cross-Border Pamir Trek',
  'pamir-highway-4x4': 'Complete Pamir 4x4 Tour',
};

export function tourSearchTitle(slug: string, title: string, days: number | null) {
  const set = tourSearchTitles[slug];
  if (set) return set;
  const base = title.length > 44 ? title.slice(0, title.lastIndexOf(' ', 44)) : title;
  return days && base.length <= 32 ? `${base}: ${days}-Day Tour` : base;
}

export const destinationSearchTitles: Record<string, string> = {
  sarez: 'Lake Sarez Trek & Permits: Local Guide',
  bartang: 'Bartang Valley Travel Guide & Treks',
  'wakhan-ishkashim': 'Wakhan Valley Travel Guide & Tours',
  karakul: 'Karakul Lake, Pamir Highway: Travel Guide',
  murgab: 'Murghab, Pamir Highway: Travel Guide',
  khorog: 'Khorog, Capital of the Pamirs: Travel Guide',
  'fan-mountains': 'Fann Mountains Trekking Guide',
  iskandarkul: 'Iskanderkul Lake Travel Guide',
  'seven-lakes': 'Seven Lakes (Haft Kul) Travel Guide',
};
