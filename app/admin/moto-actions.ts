'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { motoSchema, slugifyMoto, type StoredMoto } from '@/lib/moto-record';
import { uniqueSlug } from '@/lib/tour-record';
import { listMotorcycles, saveMotorcycles } from '@/lib/moto-store';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/admin-token';

async function requireAdmin() {
  const secret = process.env.AUTH_SECRET;
  const token = cookies().get('eco_admin')?.value;
  if (!secret || !token || !(await verifyAdminToken(token, secret))) redirect('/admin/login');
}

function refresh(slug?: string) {
  revalidatePath('/motorcycles');
  if (slug) revalidatePath(`/motorcycles/${slug}`);
}

export async function saveMotoAction(input: unknown, creating: boolean): Promise<{ error: string }> {
  await requireAdmin();
  const draft = input && typeof input === 'object' ? { ...(input as Record<string, unknown>) } : {};
  const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
  const titleRu = text(draft.titleRu);
  const titleEn = text(draft.titleEn);
  const title = titleEn || titleRu || text(draft.title);
  if (!title) return { error: 'Напишите название на русском или английском. Можно любой текст, цифры и знаки.' };
  draft.titleRu = titleRu;
  draft.titleEn = titleEn;
  draft.title = title;
  draft.blurbRu = text(draft.blurbRu);
  draft.blurbEn = text(draft.blurbEn);
  draft.blurb = text(draft.blurbEn) || text(draft.blurbRu) || text(draft.blurb) || title;
  draft.detailsRu = text(draft.detailsRu);
  draft.detailsEn = text(draft.detailsEn);
  draft.details = text(draft.detailsEn) || text(draft.detailsRu) || text(draft.details);
  if (creating || typeof draft.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) draft.slug = slugifyMoto(titleEn || titleRu || title);
  const parsed = motoSchema.safeParse(draft);
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? '');
    if (field === 'gallery') return { error: 'Фото не подошло. Загрузите JPG, PNG или WebP, либо вставьте путь с /photos/.' };
    if (field === 'price') return { error: 'Цена должна быть числом. Пустое поле значит «по запросу».' };
    return { error: 'Не сохранилось. Проверьте фото и цену. Название может быть любым.' };
  }
  let motorcycle = parsed.data;
  if (!motorcycle.blurb) motorcycle = { ...motorcycle, blurb: motorcycle.title };
  const all = await listMotorcycles();
  if (creating) {
    motorcycle = { ...motorcycle, slug: uniqueSlug(motorcycle.slug, all.map((item) => item.slug)), sort: all.reduce((max, item) => Math.max(max, item.sort), -1) + 1 };
  } else if (!all.some((item) => item.slug === motorcycle.slug)) {
    return { error: 'Мотоцикл не найден.' };
  }
  const next = creating ? [...all, motorcycle] : all.map((item) => item.slug === motorcycle.slug ? motorcycle : item);
  try { await saveMotorcycles(next); }
  catch (error) { return { error: error instanceof Error ? error.message : 'Не удалось сохранить.' }; }
  refresh(motorcycle.slug);
  redirect(creating ? '/admin/motorcycles?saved=1' : `/admin/motorcycles/${motorcycle.slug}?saved=1`);
}

export async function deleteMotoAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get('slug') || '');
  const all = await listMotorcycles();
  if (!all.some((item) => item.slug === slug)) redirect('/admin/motorcycles');
  try { await saveMotorcycles(all.filter((item) => item.slug !== slug)); }
  catch { redirect('/admin/motorcycles?error=save'); }
  refresh(slug);
  redirect('/admin/motorcycles?deleted=1');
}

export async function moveMotoAction(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get('slug') || '');
  const direction = Number(formData.get('direction')) === -1 ? -1 : 1;
  const all = [...await listMotorcycles()].sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));
  const index = all.findIndex((item) => item.slug === slug);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= all.length) redirect('/admin/motorcycles');
  const [item] = all.splice(index, 1);
  all.splice(target, 0, item);
  const next: StoredMoto[] = all.map((motorcycle, sort) => ({ ...motorcycle, sort }));
  try { await saveMotorcycles(next); }
  catch { redirect('/admin/motorcycles?error=save'); }
  refresh(slug);
  redirect('/admin/motorcycles');
}
