import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { destinations } from '@/data/destinations';
import { allowRequest, readJson, safeText } from '@/lib/request-guard';
import { listPublished, saveInquiry } from '@/lib/tour-store';

const detailsSchema = (slugs: string[]) => z.object({
  activity: z.string().refine((slug) => slug === 'custom' || slugs.includes(slug)),
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
    if (payload.data.website) return NextResponse.json({ ok: true, stored: false });
    const slugs = (await listPublished()).map((tour) => tour.slug);
    const details = detailsSchema(slugs).safeParse(JSON.parse(payload.data.message));
    if (!details.success) return NextResponse.json({ error: 'Invalid trip details' }, { status: 400 });
    const stored = await saveInquiry({
      id: randomUUID(),
      at: new Date().toISOString(),
      kind: 'trip',
      name: payload.data.name,
      email: payload.data.email,
      phone: details.data.phone,
      tour: details.data.activity,
      date: details.data.preferredDate,
      groupSize: details.data.groupSize,
      message: details.data.specialRequest,
    }).catch(() => false);
    return NextResponse.json({ ok: true, stored });
  } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
}
