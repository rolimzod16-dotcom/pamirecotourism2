import { createReadStream, createWriteStream, existsSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { spawn } from 'node:child_process';
const browserPath = join(tmpdir(), 'pamir-playwright-chromium');
if (!existsSync(browserPath)) {
  await pipeline(createReadStream('node_modules/@sparticuz/chromium/bin/chromium.br'), createBrotliDecompress(), createWriteStream(browserPath, { mode: 0o700 }));
  chmodSync(browserPath, 0o700);
}
const child = spawn('node_modules/.bin/playwright', ['test', ...process.argv.slice(2)], { stdio: 'inherit', env: { ...process.env, PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH: browserPath } });
child.on('exit', (code) => { process.exitCode = code ?? 1; });
