import { test, expect } from '@playwright/test';
import { tours } from '../data/tours';
import { destinations } from '../data/destinations';
const routes = ['/', '/tours', '/destinations', '/gallery', '/about', '/contact', ...tours.map((tour) => `/tours/${tour.slug}`), ...destinations.map((place) => `/destinations/${place.slug}`)];
test.beforeEach(async ({ page }) => { await page.route(/tile\.openstreetmap\.org/, (route) => route.abort()); });
for (const route of routes) {
  test(`${route} loads with one h1 and no horizontal overflow`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    const overflow = await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const missingAlt = await page.locator('img:not([alt])').count();
    expect(missingAlt).toBe(0);
  });
}
test('inquiry form validates and accepts a demo submission', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByText('This field is required.')).toBeVisible();
  await page.getByLabel('Activity or tour').selectOption(tours[0].slug);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Preferred date or month').fill('June 2027');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Your name').fill('Example Tester');
  await page.locator('#inquiry #email').fill('tester@example.com');
  await page.getByLabel('Phone / WhatsApp').fill('+992936001936');
  await page.getByRole('button', { name: 'Send inquiry' }).click();
  await expect(page.getByText('Thank you for planning with us.')).toBeVisible();
});
test('tour filters update the URL', async ({ page }) => {
  await page.goto('/tours', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Trekking' }).click();
  await expect(page).toHaveURL(/category=trekking/);
});
test('gallery lightbox supports keyboard close', async ({ page }) => {
  await page.goto('/gallery', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /Open image 1:/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog')).toHaveAttribute('aria-label', /2 \/ 24/);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('skip link and mobile menu work from the keyboard', async ({ page, isMobile }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  if (isMobile) {
    const menu = page.getByRole('button', { name: 'Open menu' });
    await menu.click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#mobile-navigation summary').first().click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'All tours' })).toBeVisible();
  }
});
test('lightbox traps focus and restores it on close', async ({ page }) => {
  await page.goto('/gallery', { waitUntil: 'domcontentloaded' });
  const opener = page.getByRole('button', { name: /Open image 1:/ });
  await opener.click();
  const dialog = page.getByRole('dialog');
  const close = dialog.getByRole('button', { name: 'Close image' });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Next image' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});
test('reduced motion shows the hero poster without autoplay video', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#hero video')).toHaveCount(0);
  await expect(page.locator('#hero img')).toBeVisible();
});
