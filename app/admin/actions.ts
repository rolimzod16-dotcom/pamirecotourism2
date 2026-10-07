'use server';

import { timingSafeEqual } from 'crypto';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { allowRequest } from '@/lib/request-guard';
import { signAdminToken, verifyAdminToken } from '@/lib/admin-token';
import { slugify, tourSchema, uniqueSlug, type StoredTour } from '@/lib/tour-record';
import { getTour, listTours, saveTours } from '@/lib/tour-store';

const cookieName = 'eco_admin';

function sameText(leftValue: string, rightValue: string) {
  const left = Buffer.from(leftValue);
  const right = Buffer.from(rightValue);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

async function signedIn() {
  const secret = process.env.AUTH_SECRET;
  const token = cookies().get(cookieName)?.value;
  return Boolean(secret && token && await verifyAdminToken(token, secret));
}

async function requireAdmin() {
  if (!(await signedIn())) redirect('/admin/login');
}

function refresh(slug?: string) {
  revalidatePath('/');
  revalidatePath('/tours');
  revalidatePath('/contact');
  revalidatePath('/destinations');
  if (slug) revalidatePath(`/tours/${slug}`);
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const request = new Request('http://localhost', { headers: headers() });
  if (!allowRequest(request, 'admin-login', 8)) redirect('/admin/login?error=rate');
  const expectedEmail = (process.env.ADMIN_EMAIL || 'admin@pamirecotourism.com').trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || '';
  const secret = process.env.AUTH_SECRET || '';
  if (!expectedPassword || !secret) redirect('/admin/login?error=config');
  if (!sameText(email, expectedEmail) || !sameText(password, expectedPassword)) redirect('/admin/login?error=credentials');
  cookies().set(cookieName, await signAdminToken(secret), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 14,
  });
  redirect('/admin');
}

export async function logoutAction() {
  cookies().delete(cookieName);
  redirect('/admin/login');
}

export async function saveTourAction(input: unknown, creating: boolean): Promise<{ error: string }> {
  await requireAdmin();
  const draft = input && typeof input === 'object' ? { ...(input as Record<string, unknown>) } : {};
  const title = typeof draft.title === 'string' ? draft.title.trim() : '';
  if (!title) return { error: 'Напишите название. Можно любой текст: русский, английский, цифры и знаки.' };
  if (Array.isArray(draft.destinations)) draft.destinations = draft.destinations.filter((item) => typeof item === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item));
  if (creating || typeof draft.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) draft.slug = slugify(title);
  const parsed = tourSchema.safeParse(draft);
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? '');
    if (field === 'gallery') return { error: 'Фото не подошло. Загрузите JPG, PNG или WebP, либо вставьте путь с /photos/.' };
    if (field === 'price') return { error: 'Цена должна быть числом. Пустое поле значит «по запросу».' };
    if (field === 'days') return { error: 'Количество дней должно быть числом или остаться пустым.' };
    return { error: 'Не сохранилось. Проверьте фото и числа. Название может быть любым.' };
  }
  let tour = parsed.data;
  if (!tour.gallery.length) return { error: 'Добавьте хотя бы одно фото.' };
  if (!tour.hook) tour = { ...tour, hook: tour.blurb || tour.title };
  if (!tour.blurb) tour = { ...tour, blurb: tour.hook };
  if (!tour.overview) tour = { ...tour, overview: tour.blurb };
  if (!tour.badge) tour = { ...tour, badge: tour.days ? `${tour.days} days` : 'Dates on request' };
  const all = await listTours();
  if (creating) {
    tour = { ...tour, slug: uniqueSlug(tour.slug, all.map((item) => item.slug)), sort: all.reduce((max, item) => Math.max(max, item.sort), -1) + 1 };
  } else if (!all.some((item) => item.slug === tour.slug)) {
    return { error: 'Тур не найден.' };
  }
  const next = creating ? [...all, tour] : all.map((item) => item.slug === tour.slug ? tour : item);
  try { await saveTours(next); }
  catch (error) { return { error: error instanceof Error ? error.message : 'Не удалось сохранить.' }; }
  refresh(tour.slug);
  redirect(creating ? '/admin?saved=1' : `/admin/tours/${tour.slug}?saved=1`);
}

export async function deleteTourAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get('slug') || '');
  const all = await listTours();
  if (!all.some((tour) => tour.slug === slug)) redirect('/admin');
  try { await saveTours(all.filter((tour) => tour.slug !== slug)); }
  catch { redirect('/admin?error=save'); }
  refresh(slug);
  redirect('/admin?deleted=1');
}

export async function moveTourAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get('slug') || '');
  const direction = Number(formData.get('direction')) === -1 ? -1 : 1;
  const all = [...await listTours()].sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));
  const index = all.findIndex((tour) => tour.slug === slug);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= all.length) redirect('/admin');
  const [item] = all.splice(index, 1);
  all.splice(target, 0, item);
  const next: StoredTour[] = all.map((tour, sort) => ({ ...tour, sort }));
  try { await saveTours(next); }
  catch { redirect('/admin?error=save'); }
  refresh(slug);
  redirect('/admin');
}

export async function tourForEdit(slug: string) {
  await requireAdmin();
  return getTour(slug);
}
