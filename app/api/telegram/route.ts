import { timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { handleMessage, parseUpdate, webhookSecret } from '@/lib/telegram';

export async function POST(request: Request) {
  const expected = Buffer.from(webhookSecret());
  const given = Buffer.from(request.headers.get('x-telegram-bot-api-secret-token') ?? '');
  if (!expected.length || expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const update = parseUpdate(await request.json());
    if (update) await handleMessage(update);
  } catch (error) {
    console.error('Telegram webhook failed', error instanceof Error ? error.message : 'error');
  }
  // Always 200 so Telegram does not retry the same update in a loop.
  return NextResponse.json({ ok: true });
}
