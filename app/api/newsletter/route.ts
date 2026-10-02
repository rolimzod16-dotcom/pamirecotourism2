import { NextResponse } from 'next/server';
import { z } from 'zod';
const schema = z.object({ email: z.string().email(), website: z.string().optional() });
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true, demo: true });
    // Demo endpoint only: do not log or persist personal email addresses.
    console.info('Newsletter stub received', { at: new Date().toISOString() });
    return NextResponse.json({ ok: true, demo: true });
  } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
}
