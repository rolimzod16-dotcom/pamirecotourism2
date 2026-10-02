import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 30000, expect: { timeout: 8000 }, workers: 2, retries: 0,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:3210', browserName: 'chromium', launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ['--no-sandbox', '--disable-dev-shm-usage'] }, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    { name: '360', use: { viewport: { width: 360, height: 800 }, isMobile: true, deviceScaleFactor: 1 } },
    { name: '768', use: { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 } },
    { name: '1440', use: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  ],
  webServer: { command: 'npm run start -- -p 3210', url: 'http://127.0.0.1:3210', reuseExistingServer: false, timeout: 120000 },
});
