import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
const roots = ['app', 'components', 'content', 'data', 'lib', 'public'];
const extensions = /\.(?:ts|tsx|js|jsx|mjs|md|svg)$/i;
const pattern = /\[(?:placeholder|confirm)/i;
let count = 0;
async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { await scan(path); continue; }
    if (!entry.isFile() || !extensions.test(path)) continue;
    const lines = (await readFile(path, 'utf8')).split(/\r?\n/);
    lines.forEach((line, index) => { if (pattern.test(line)) { console.log(`${path}:${index + 1}: ${line.trim().slice(0, 220)}`); count++; } });
  }
}
for (const root of roots) await scan(root);
console.log(`Found ${count} lines with [placeholder or [confirm markers.`);
