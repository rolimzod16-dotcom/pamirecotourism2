import { promises as fs } from 'fs';
import path from 'path';
import { get, list, put } from '@vercel/blob';
import { parseTourList, seedTours, type StoredTour } from '@/lib/tour-record';

const catalogPath = 'catalog/tours.json';
const localDir = path.join(process.cwd(), '.data');
const localCatalog = path.join(localDir, 'tours.json');
const localInquiries = path.join(localDir, 'inquiries.json');

export type InquiryRecord = {
  id: string;
  at: string;
  kind: 'trip' | 'newsletter';
  name: string;
  email: string;
  phone: string;
  tour: string;
  date: string;
  groupSize: number | null;
  message: string;
};

export function storageMode(): 'blob' | 'local' | 'off' {
  if (process.env.BLOB_READ_WRITE_TOKEN) return 'blob';
  if (process.env.NODE_ENV !== 'production') return 'local';
  return 'off';
}

let writeQueue: Promise<unknown> = Promise.resolve();
function enqueue<T>(job: () => Promise<T>) {
  const run = writeQueue.then(job, job);
  writeQueue = run.then(() => undefined, () => undefined);
  return run;
}

async function readBlobJson(pathname: string) {
  const result = await get(pathname, { access: 'private', useCache: false });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  return JSON.parse(await new Response(result.stream).text()) as unknown;
}

async function writeBlobJson(pathname: string, value: unknown) {
  await put(pathname, JSON.stringify(value), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
}

async function readCatalog(): Promise<'missing' | 'bad' | StoredTour[]> {
  const mode = storageMode();
  if (mode === 'off') return 'missing';
  try {
    if (mode === 'local') {
      const text = await fs.readFile(localCatalog, 'utf8');
      const parsed = parseTourList(JSON.parse(text));
      return parsed ?? 'bad';
    }
    const value = await readBlobJson(catalogPath);
    if (value === null) return 'missing';
    const parsed = parseTourList(value);
    return parsed ?? 'bad';
  } catch (error) {
    const missing = error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT';
    if (missing) return 'missing';
    console.error('Tour catalog read failed');
    return 'bad';
  }
}

async function writeCatalog(tours: StoredTour[]) {
  const mode = storageMode();
  if (mode === 'off') throw new Error('Хранилище на сервере не подключено.');
  const clean = parseTourList(tours);
  if (!clean) throw new Error('Тур не прошёл проверку.');
  if (mode === 'local') {
    await fs.mkdir(localDir, { recursive: true });
    await fs.writeFile(localCatalog, JSON.stringify(clean), 'utf8');
    return;
  }
  await writeBlobJson(catalogPath, clean);
}

export async function listTours() {
  const stored = await readCatalog();
  if (Array.isArray(stored)) return [...stored].sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));
  const seed = seedTours();
  if (stored === 'missing' && storageMode() !== 'off') {
    try { await enqueue(() => writeCatalog(seed)); } catch (error) { console.error('Tour catalog seed failed', error instanceof Error ? error.message : 'error'); }
  }
  return seed;
}

export async function listPublished() {
  return (await listTours()).filter((tour) => tour.published);
}

export async function getTour(slug: string) {
  return (await listTours()).find((tour) => tour.slug === slug) ?? null;
}

export async function saveTours(tours: StoredTour[]) {
  await enqueue(() => writeCatalog(tours));
}

async function readInquiries(): Promise<InquiryRecord[]> {
  const mode = storageMode();
  if (mode === 'off') return [];
  try {
    if (mode === 'local') {
      const text = await fs.readFile(localInquiries, 'utf8');
      const value = JSON.parse(text) as unknown;
      return Array.isArray(value) ? value as InquiryRecord[] : [];
    }
    const found = await list({ prefix: 'inquiries/', limit: 100 });
    const rows = await Promise.all(found.blobs.map(async (blob) => {
      const value = await readBlobJson(blob.pathname);
      return value && typeof value === 'object' ? value as InquiryRecord : null;
    }));
    return rows.filter((row): row is InquiryRecord => Boolean(row)).sort((a, b) => b.at.localeCompare(a.at));
  } catch (error) {
    const missing = error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT';
    if (!missing) console.error('Inquiry read failed');
    return [];
  }
}

export async function listInquiries() {
  return readInquiries();
}

export async function saveInquiry(record: InquiryRecord) {
  const mode = storageMode();
  if (mode === 'off') return false;
  await enqueue(async () => {
    if (mode === 'local') {
      const current = await readInquiries();
      await fs.mkdir(localDir, { recursive: true });
      await fs.writeFile(localInquiries, JSON.stringify([record, ...current].slice(0, 200)), 'utf8');
      return;
    }
    await writeBlobJson(`inquiries/${record.id}.json`, record);
  });
  return true;
}
