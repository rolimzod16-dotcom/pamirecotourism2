import { NextResponse } from 'next/server';
import { z } from 'zod';
import { allowRequest, readJson } from '@/lib/request-guard';

const schema = z.object({ email: z.string().trim().email().max(254), website: z.string().max(200).optional() }).strict();
export async function POST(request: Request) {
  if (!allowRequest(request, 'newsletter')) return NextResponse.json({ error: 'Please try again shortly.' }, { status: 429 });
  try {
    const parsed = schema.safeParse(await readJson(request));
    if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true, demo: true });
    // Demo endpoint only: do not log or persist personal email addresses.
    console.info('Newsletter stub received', { at: new Date().toISOString() });
    return NextResponse.json({ ok: true, demo: true });
  } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
}
