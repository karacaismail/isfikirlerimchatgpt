import { test, expect } from '@playwright/test';
test('320 genişlikte aynı ağaçta giriş, özel seçim ve pencere', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 480 });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('teknik/');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await page.getByLabel('Deneme metni').fill('İş fikri');
  await expect(page.getByLabel('Deneme metni')).toHaveValue('İş fikri');
  await page.getByRole('combobox', { name: 'Deneme seçimi' }).click();
  await page.getByRole('option', { name: 'Gelir', exact: true }).click();
  await expect(
    page.getByRole('combobox', { name: 'Deneme seçimi' }),
  ).toHaveValue('Gelir');
  await page.getByRole('button', { name: 'Deneme penceresini aç' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText('Girilen metin: İş fikri')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(
    page.getByRole('button', { name: 'Deneme penceresini aç' }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
