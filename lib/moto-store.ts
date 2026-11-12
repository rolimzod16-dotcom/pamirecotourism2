import { promises as fs } from 'fs';
import path from 'path';
import { get, put } from '@vercel/blob';
import { parseMotoList, type StoredMoto } from '@/lib/moto-record';
import { markMigrations, pendingMigration, storageMode } from '@/lib/tour-store';

const catalogPath = 'catalog/motorcycles.json';
const localCatalog = path.join(process.cwd(), '.data', 'motorcycles.json');

let writeQueue: Promise<unknown> = Promise.resolve();
function enqueue<T>(job: () => Promise<T>) {
  const run = writeQueue.then(job, job);
  writeQueue = run.then(() => undefined, () => undefined);
  return run;
}

async function readCatalog(): Promise<'missing' | 'bad' | StoredMoto[]> {
  const mode = storageMode();
  if (mode === 'off') return [];
  try {
    if (mode === 'local') {
      const text = await fs.readFile(localCatalog, 'utf8');
      return parseMotoList(JSON.parse(text)) ?? 'bad';
    }
    const result = await get(catalogPath, { access: 'private', useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return 'missing';
    return parseMotoList(JSON.parse(await new Response(result.stream).text())) ?? 'bad';
  } catch (error) {
    const missing = error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT';
    if (missing) return 'missing';
    console.error('Motorcycle catalog read failed');
    return 'bad';
  }
}

async function writeCatalog(motorcycles: StoredMoto[]) {
  const mode = storageMode();
  if (mode === 'off') throw new Error('Хранилище на сервере не подключено.');
  const clean = parseMotoList(motorcycles);
  if (!clean) throw new Error('Мотоцикл не прошёл проверку.');
  if (mode === 'local') {
    await fs.mkdir(path.dirname(localCatalog), { recursive: true });
    await fs.writeFile(localCatalog, JSON.stringify(clean), 'utf8');
    return;
  }
  await put(catalogPath, JSON.stringify(clean), {
    access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60,
  });
}

// A test entry ("qwertyu") was published from the admin; hide it once, without deleting anything.
const HIDE_TEST_ENTRIES = { version: 'hide-test-motorcycles-2026-11', slugs: ['qwertyu'] };

async function hideTestEntries(stored: StoredMoto[]) {
  if (!stored.some((item) => HIDE_TEST_ENTRIES.slugs.includes(item.slug) && item.published)) return stored;
  if (!(await pendingMigration(HIDE_TEST_ENTRIES.version))) return stored;
  const next = stored.map((item) => (HIDE_TEST_ENTRIES.slugs.includes(item.slug) ? { ...item, published: false } : item));
  try {
    await enqueue(async () => {
      await writeCatalog(next);
      await markMigrations([HIDE_TEST_ENTRIES.version]);
    });
  } catch (error) {
    console.error('Motorcycle cleanup failed', error instanceof Error ? error.message : 'error');
  }
  return next;
}

export async function listMotorcycles() {
  const stored = await readCatalog();
  if (!Array.isArray(stored)) return [];
  const clean = await hideTestEntries(stored);
  return [...clean].sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));
}

export async function listPublishedMotorcycles() {
  return (await listMotorcycles()).filter((item) => item.published);
}

export async function getMotorcycle(slug: string) {
  return (await listMotorcycles()).find((item) => item.slug === slug) ?? null;
}

export async function saveMotorcycles(motorcycles: StoredMoto[]) {
  await enqueue(() => writeCatalog(motorcycles));
}
