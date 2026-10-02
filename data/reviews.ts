export type Review = { quote: string; author: string; source: string | null; rating: number | null };
// Add only verified testimonials and ratings after receiving permission to publish.
export const reviews: Review[] = [];
