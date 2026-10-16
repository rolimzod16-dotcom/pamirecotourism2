import { createHmac, timingSafeEqual } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { readBlobJson, storageMode, writeBlobJson } from '@/lib/tour-store';

// Only private chats that sent TELEGRAM_BOT_PASSWORD get inquiries. Their ids live in Blob (or .data locally).
const chatsPath = 'telegram/chats.json';
const localChats = path.join(process.cwd(), '.data', 'telegram.json');
const failedLogins = new Map<string, { count: number; until: number }>();
const maxFailures = 5;
const lockMs = 15 * 60_000;

type Incoming = { chatId: string; chatType: string; messageId: number | null; text: string };

export function telegramConfig() {
  return {
    token: process.env.TELEGRAM_BOT_TOKEN?.trim() || '',
    password: process.env.TELEGRAM_BOT_PASSWORD || '',
    siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://pamirecotourism.com').replace(/\/$/, ''),
  };
}

// Telegram sends this back in a header on every webhook call, so outsiders cannot post fake updates.
export function webhookSecret() {
  const secret = process.env.AUTH_SECRET;
  return secret ? createHmac('sha256', secret).update('telegram-webhook').digest('hex') : '';
}

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function passwordMatches(text: string) {
  const expected = telegramConfig().password;
  const given = text.trim();
  if (!expected || !given) return false;
  const left = Buffer.from(given);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

function lockedOut(chatId: string) {
  const state = failedLogins.get(chatId);
  return Boolean(state && state.until > Date.now() && state.count >= maxFailures);
}

function recordFailure(chatId: string) {
  const now = Date.now();
  const state = failedLogins.get(chatId);
  if (!state || state.until < now) failedLogins.set(chatId, { count: 1, until: now + lockMs });
  else state.count += 1;
}

export async function readChatIds(): Promise<string[]> {
  const mode = storageMode();
  if (mode === 'off') return [];
  try {
    const value = mode === 'local' ? JSON.parse(await fs.readFile(localChats, 'utf8')) as unknown : await readBlobJson(chatsPath);
    return Array.isArray(value) ? value.map(String) : [];
  } catch (error) {
    const missing = error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT';
    if (!missing) console.error('Telegram chat list read failed');
    return [];
  }
}

export async function writeChatIds(chatIds: string[]) {
  const mode = storageMode();
  if (mode === 'off') throw new Error('Хранилище на сервере не подключено.');
  const unique = [...new Set(chatIds)];
  if (mode === 'local') {
    await fs.mkdir(path.dirname(localChats), { recursive: true });
    await fs.writeFile(localChats, JSON.stringify(unique), 'utf8');
    return;
  }
  await writeBlobJson(chatsPath, unique);
}

export async function telegramApi<T = unknown>(method: string, body: Record<string, unknown> = {}) {
  const { token } = telegramConfig();
  if (!token) throw new Error('TELEGRAM_BOT_TOKEN не задан.');
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const data = await response.json() as { ok?: boolean; description?: string; result?: T };
  if (!response.ok || !data.ok) throw new Error(data.description || `Telegram ${method} failed`);
  return data.result as T;
}

function send(chatId: string, text: string) {
  return telegramApi('sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true });
}

export function parseUpdate(update: unknown): Incoming | null {
  if (!update || typeof update !== 'object') return null;
  const message = (update as { message?: { chat?: { id?: number; type?: string }; message_id?: number; text?: string } }).message;
  if (!message?.chat?.id) return null;
  return { chatId: String(message.chat.id), chatType: message.chat.type || '', messageId: message.message_id ?? null, text: message.text || '' };
}

export async function handleMessage(input: Incoming) {
  if (input.chatType !== 'private') {
    await send(input.chatId, 'Заявки приходят только в личный чат. Откройте бота и отправьте пароль там.');
    return;
  }
  const text = input.text.trim();
  const chats = await readChatIds();
  const connected = chats.includes(input.chatId);

  if (/^\/stop(?:@\w+)?$/i.test(text)) {
    if (connected) await writeChatIds(chats.filter((id) => id !== input.chatId));
    await send(input.chatId, 'Уведомления выключены. Чтобы снова получать заявки, отправьте пароль.');
    return;
  }
  if (connected) {
    if (text.startsWith('/')) await send(input.chatId, 'Вы подключены, новые заявки с pamirecotourism.com приходят сюда. Отключиться: /stop');
    return;
  }
  if (lockedOut(input.chatId)) {
    await send(input.chatId, 'Слишком много неверных попыток. Попробуйте через 15 минут.');
    return;
  }
  if (!text || text.startsWith('/')) {
    await send(input.chatId, 'Доступ закрыт. Отправьте пароль одним сообщением.');
    return;
  }
  if (!passwordMatches(text)) {
    recordFailure(input.chatId);
    await send(input.chatId, 'Неверный пароль.');
    return;
  }
  failedLogins.delete(input.chatId);
  await writeChatIds([...chats, input.chatId]);
  if (input.messageId) await telegramApi('deleteMessage', { chat_id: input.chatId, message_id: input.messageId }).catch(() => undefined);
  await send(input.chatId, 'Пароль принят. Сюда будут приходить заявки и подписки с pamirecotourism.com. Отключиться: /stop');
}

export async function notifyTelegram(lines: string[]) {
  if (!telegramConfig().token) return;
  try {
    const chats = await readChatIds();
    if (!chats.length) { console.error('Telegram: no password-authorized chat yet.'); return; }
    const text = lines.join('\n');
    await Promise.all(chats.map((chatId) => send(chatId, text.length > 4000 ? `${text.slice(0, 3990)}…` : text)
      .catch((error) => console.error('Telegram send failed', error instanceof Error ? error.message : 'error'))));
  } catch (error) {
    console.error('Telegram notify failed', error instanceof Error ? error.message : 'error');
  }
}

export function line(label: string, value: string | number | null | undefined) {
  const text = value == null ? '' : String(value).trim();
  return text ? `<b>${escapeHtml(label)}:</b> ${escapeHtml(text)}` : '';
}
