const encoder = new TextEncoder();

async function hmac(secret: string, value: string) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return [...new Uint8Array(mac)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function signAdminToken(secret: string, maxAgeSeconds = 60 * 60 * 24 * 14) {
  const payload = String(Date.now() + maxAgeSeconds * 1000);
  return `${payload}.${await hmac(secret, payload)}`;
}

export async function verifyAdminToken(token: string, secret: string) {
  const [payload, signature] = token.split('.');
  if (!payload || !signature || payload.includes('.')) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = await hmac(secret, payload);
  if (expected.length !== signature.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  return difference === 0;
}
