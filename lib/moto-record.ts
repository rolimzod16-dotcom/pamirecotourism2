import { z } from 'zod';

const plain = (max: number) => z.string().max(max).transform((value) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/<[^>]*>/g, '').trim());
const imageSrc = z.string().trim().max(500).refine((value) => {
  if (value.startsWith('/photos/') && !value.includes('..') && !value.includes('\\')) return true;
  if (value.startsWith('/api/media?src=')) {
    const source = new URL(value, 'https://pamirecotourism.com').searchParams.get('src') || '';
    return (source.startsWith('motorcycles/') || source.startsWith('tours/')) && !source.includes('..') && !source.includes('\\');
  }
  return value.startsWith('https://') && !value.includes(' ');
}, 'Недопустимый адрес фото');

export const motoSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80),
  title: plain(160).pipe(z.string().min(2).max(160)),
  price: z.number().int().min(0).max(100000).nullable(),
  blurb: plain(500),
  details: plain(4000),
  gallery: z.array(z.object({ src: imageSrc, alt: plain(180) })).max(16),
  published: z.boolean(),
  sort: z.number().int().min(0).max(9999),
}).strict();

export type StoredMoto = z.infer<typeof motoSchema>;

export function slugifyMoto(value: string) {
  const slug = value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  return slug || 'motorcycle';
}

export function parseMotoList(value: unknown): StoredMoto[] | null {
  const parsed = z.array(motoSchema).safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function blankMoto(sort: number): StoredMoto {
  return { slug: '', title: '', price: null, blurb: '', details: '', gallery: [], published: true, sort };
}

export function motoPrice(price: number | null) {
  return price === null ? 'On request' : `$${price.toLocaleString('en-US')} / day`;
}
