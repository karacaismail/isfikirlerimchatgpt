import { test, expect } from '@playwright/test';

test('incelenmiş kalıcı görsel referanslar', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('katalog/');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await page.locator('.filter-disclosure > summary').click();
  await page.getByRole('combobox', { name: 'Kayıt türü' }).click();
  await expect(page.getByRole('listbox')).toBeVisible();
  await expect.soft(page).toHaveScreenshot('320-dropdown.png', {
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixels: 0,
  });
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.mouse.click(1, 1);
  await page.evaluate(() => scrollTo(0, 0));
  await expect.soft(page).toHaveScreenshot('1280-catalog.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixels: 0,
  });
});
