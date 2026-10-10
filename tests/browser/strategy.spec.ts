import { test, expect } from '@playwright/test';
test('geliştirme stratejisi satış sırası yerine ölçüt ve ECA gerekçesi sunar', async ({
  page,
}) => {
  await page.goto('kararlar/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Önceliği hangi gerekçeyle vereceğim?',
  );
  await expect(page.locator('#olcutler > details')).toHaveCount(14);
  await expect(page.locator('#eca > details')).toHaveCount(14);
  await expect(page.locator('main')).not.toContainText(
    'Peşinatı alınmış, kapsamı belli',
  );
  await expect(page.locator('main')).not.toContainText('iki oturumluk atölye');
  await expect(
    page.locator('[data-checklist="software-v2-project-pim"]'),
  ).toBeVisible();
});
test('katalog bütün kayıtları ve yeni sahiplik sözleşmesini taşır', async ({
  page,
  request,
}) => {
  const response = await request.get('strateji.json');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.version).toBe('2.0');
  expect(data.candidates).toHaveLength(23);
  expect(
    data.candidates.every((c: { ownership: string }) => c.ownership === 'user'),
  ).toBe(true);
  await page.goto('katalog/');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await expect(page.locator('[data-project]')).toHaveCount(23);
  await page.goto('projeler/pim/#kurallar');
  await expect(page.locator('#kurallar')).toHaveAttribute('open', '');
  await expect(page.locator('#kurallar .project-entry')).toHaveCount(14);
  await expect(page.locator('#kurallar')).toContainText('Kural tetiklenmedi');
});
test('eski ticari ilerleme ve tercihler geliştirme görevine taşınmaz', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('isf-checklist-v1:project-pim', '[0,1,2,3]');
    localStorage.setItem(
      'isfikirlerim-tercihler-v1',
      JSON.stringify({
        query: 'titanlar',
        weights: { G: 100, V: 0, O: 0, U: 0 },
        selected: ['titanlar'],
      }),
    );
  });
  await page.goto('projeler/pim/');
  await expect(
    page
      .locator('[data-checklist="software-v2-project-pim"]')
      .getByRole('checkbox')
      .first(),
  ).not.toBeChecked();
  await page.goto('katalog/');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await expect(page.getByLabel('Proje veya problem ara')).toHaveValue('');
  await expect(page.getByRole('status').first()).toContainText('0/4');
});
