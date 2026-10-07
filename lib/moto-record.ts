import { z } from 'zod';
import { slugify } from '@/lib/tour-record';

const plain = (max: number) => z.string().transform((value) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max));
const optionalText = (max: number) => plain(max).optional().default('');
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
  title: plain(500),
  titleRu: optionalText(500),
  titleEn: optionalText(500),
  price: z.number().int().min(0).max(100000).nullable(),
  blurb: plain(4000),
  blurbRu: optionalText(4000),
  blurbEn: optionalText(4000),
  details: plain(12000),
  detailsRu: optionalText(12000),
  detailsEn: optionalText(12000),
  gallery: z.array(z.object({ src: imageSrc, alt: plain(300) })).max(16),
  published: z.boolean(),
  sort: z.number().int().min(0).max(9999),
}).strict();

export type StoredMoto = z.infer<typeof motoSchema>;

export function slugifyMoto(value: string) {
  return slugify(value, 'motorcycle');
}

export function parseMotoList(value: unknown): StoredMoto[] | null {
  const parsed = z.array(motoSchema).safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function blankMoto(sort: number): StoredMoto {
  return {
    slug: '', title: '', titleRu: '', titleEn: '', price: null,
    blurb: '', blurbRu: '', blurbEn: '', details: '', detailsRu: '', detailsEn: '',
    gallery: [], published: true, sort,
  };
}

export function motoSides(item: StoredMoto) {
  const legacy = !item.titleEn && !item.titleRu;
  return {
    en: {
      title: item.titleEn || (legacy ? item.title : '') || item.titleRu || item.title,
      blurb: item.blurbEn || (legacy ? item.blurb : '') || item.blurbRu || item.blurb,
      details: item.detailsEn || (legacy ? item.details : '') || item.detailsRu || item.details,
    },
    ru: {
      title: item.titleRu || (legacy ? item.title : '') || item.titleEn || item.title,
      blurb: item.blurbRu || (legacy ? item.blurb : '') || item.blurbEn || item.blurb,
      details: item.detailsRu || (legacy ? item.details : '') || item.detailsEn || item.details,
    },
  };
}

export function motoPrice(price: number | null) {
  return price === null ? 'On request' : `$${price.toLocaleString('en-US')} / day`;
}
