import { NextResponse } from 'next/server';
import { z } from 'zod';
const inquirySchema = z.object({ name: z.string().min(1), email: z.string().email(), message: z.string().min(1) });
export async function POST(request: Request) {
  try {
    const payload = inquirySchema.safeParse(await request.json());
    if (!payload.success) return NextResponse.json({ error: 'Invalid inquiry' }, { status: 400 });
    // Development stub: no persistence or email delivery. Avoid logging private inquiry details.
    console.info('Inquiry stub received', { at: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
}
