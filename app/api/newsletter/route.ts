import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { allowRequest, readJson } from '@/lib/request-guard';
import { saveInquiry } from '@/lib/tour-store';

const schema = z.object({ email: z.string().trim().email().max(254), website: z.string().max(200).optional() }).strict();
export async function POST(request: Request) {
  if (!allowRequest(request, 'newsletter')) return NextResponse.json({ error: 'Please try again shortly.' }, { status: 429 });
  try {
    const parsed = schema.safeParse(await readJson(request));
    if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true, stored: false });
    const stored = await saveInquiry({
      id: randomUUID(), at: new Date().toISOString(), kind: 'newsletter', name: '', email: parsed.data.email, phone: '', tour: '', date: '', groupSize: null, message: '',
    }).catch(() => false);
    return NextResponse.json({ ok: true, stored });
  } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
}
