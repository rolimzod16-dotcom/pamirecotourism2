import { NextResponse } from 'next/server';
import { z } from 'zod';
import { tours } from '@/data/tours';
import { destinations } from '@/data/destinations';
import { allowRequest, readJson, safeText } from '@/lib/request-guard';

const detailsSchema = z.object({
  activity: z.string().refine((slug) => slug === 'custom' || tours.some((tour) => tour.slug === slug)),
  destination: z.string().refine((slug) => !slug || destinations.some((place) => place.slug === slug)),
  specialRequest: safeText(3000),
  preferredDate: safeText(120, 1),
  groupSize: z.number().int().min(1).max(100),
  flexible: z.boolean(),
  phone: safeText(50, 5),
  contactMethod: z.enum(['Email', 'WhatsApp']),
}).strict();
const inquirySchema = z.object({
  name: safeText(120, 1),
  email: z.string().trim().email().max(254),
  message: z.string().max(6000),
  website: z.string().max(200).optional(),
}).strict();

export async function POST(request: Request) {
  if (!allowRequest(request, 'inquiry')) return NextResponse.json({ error: 'Please try again shortly.' }, { status: 429 });
  try {
    const payload = inquirySchema.safeParse(await readJson(request));
    if (!payload.success) return NextResponse.json({ error: 'Invalid inquiry' }, { status: 400 });
    if (payload.data.website) return NextResponse.json({ ok: true, demo: true });
    const details = detailsSchema.safeParse(JSON.parse(payload.data.message));
    if (!details.success) return NextResponse.json({ error: 'Invalid trip details' }, { status: 400 });
    // Development stub: no persistence or email delivery. Avoid logging private inquiry details.
    console.info('Inquiry stub received', { at: new Date().toISOString() });
    return NextResponse.json({ ok: true, demo: true });
  } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
}
