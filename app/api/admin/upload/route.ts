import { put } from '@vercel/blob';
import { verifyAdminToken } from '@/lib/admin-token';

export async function POST(request: Request) {
  const token = request.headers.get('cookie')?.split(';').map((part) => part.trim()).find((part) => part.startsWith('eco_admin='))?.slice('eco_admin='.length);
  const secret = process.env.AUTH_SECRET;
  if (!secret || !token || !(await verifyAdminToken(decodeURIComponent(token), secret))) {
    return Response.json({ error: 'Нужно войти в админку.' }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return Response.json({ error: 'Загрузка фото на сервере ещё не подключена.' }, { status: 500 });
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return Response.json({ error: 'Файл не выбран.' }, { status: 400 });
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return Response.json({ error: 'Нужна картинка JPG, PNG или WebP.' }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return Response.json({ error: 'Файл больше 8 МБ.' }, { status: 400 });
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 60) || 'photo.jpg';
  try {
    const blob = await put(`tours/${Date.now()}-${safeName}`, file, { access: 'private', addRandomSuffix: true });
    return Response.json({ url: `/api/media?src=${encodeURIComponent(blob.pathname)}` });
  } catch (error) {
    console.error('Tour photo upload failed', error instanceof Error ? error.message : 'error');
    return Response.json({ error: 'Загрузка не прошла. Попробуйте другое фото.' }, { status: 500 });
  }
}
