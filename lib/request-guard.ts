import { z } from 'zod';

const attempts = new Map<string, { count: number; until: number }>();
const windowMs = 60_000;

export function allowRequest(request: Request, scope: string, limit = 5) {
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const key = `${scope}:${ip}`;
  const now = Date.now();
  if (attempts.size > 1000) for (const [entry, value] of attempts) if (value.until < now) attempts.delete(entry);
  const state = attempts.get(key);
  if (!state || state.until < now) { attempts.set(key, { count: 1, until: now + windowMs }); return true; }
  if (state.count >= limit) return false;
  state.count += 1;
  return true;
}

export async function readJson(request: Request) {
  const body = await request.text();
  if (body.length > 8192) throw new Error('Request too large');
  return JSON.parse(body) as unknown;
}

export const safeText = (length: number, minimum = 0) => z.string().trim().max(length)
  .transform((value) => value.replace(/[\u0000-\u001F\u007F]/g, '').replace(/<[^>]*>/g, '').trim())
  .pipe(z.string().min(minimum).max(length));
