'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminToken } from '@/lib/admin-token';
import { telegramApi, telegramConfig, webhookSecret, writeChatIds } from '@/lib/telegram';

async function requireAdmin() {
  const secret = process.env.AUTH_SECRET;
  const token = cookies().get('eco_admin')?.value;
  if (!secret || !token || !(await verifyAdminToken(token, secret))) redirect('/admin/login');
}

export async function connectWebhookAction() {
  await requireAdmin();
  const { token, password, webhookUrl } = telegramConfig();
  if (!token || !password || !webhookSecret()) redirect('/admin/telegram?error=config');
  try {
    await telegramApi('setWebhook', { url: webhookUrl, secret_token: webhookSecret(), allowed_updates: ['message'], drop_pending_updates: true });
  } catch { redirect('/admin/telegram?error=webhook'); }
  redirect('/admin/telegram?connected=1');
}

export async function forgetChatsAction() {
  await requireAdmin();
  try { await writeChatIds([]); } catch { redirect('/admin/telegram?error=save'); }
  redirect('/admin/telegram?cleared=1');
}
