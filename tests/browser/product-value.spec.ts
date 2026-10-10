import { test, expect } from '@playwright/test';
test('varsayılan öneriler GenUI altyapısını satış adayı yapmaz; tüm kayıtlar erişilir', async ({
  page,
  request,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 640 });
  const response = await request.get('deger.json');
  const values = await response.json();
  expect(values.cases).toHaveLength(23);
  await page.goto('katalog/');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await expect(page.locator('[data-project="genui"]')).toHaveCount(0);
  const strategy = await (await request.get('strateji.json')).json();
  await expect(page.locator('[data-project]')).toHaveCount(
    strategy.candidates.filter(
      (c: { commercial: { recommended: boolean } }) => c.commercial.recommended,
    ).length,
  );
  await page.getByRole('button', { name: /^Tüm çalışmalar/ }).click();
  await expect(page.locator('[data-project]')).toHaveCount(23);
  await expect(page.locator('[data-project="genui"]')).toContainText(
    'Ayrı ödeme gerekçesi gösterilemedi.',
  );
  await page.locator('[data-project="genui"] h3 a').click();
  await expect(page.locator('#deger')).toContainText('bağımsız');
  await expect(page.locator('#alternatifler')).toContainText('Odoo');
  await page
    .locator('#deger')
    .evaluate((el) => el.scrollIntoView({ block: 'start' }));
  await page.screenshot({ path: testInfo.outputPath('genui-value-320.png') });
  await page
    .locator('#alternatifler')
    .evaluate((el) => el.scrollIntoView({ block: 'start' }));
  await page.screenshot({
    path: testInfo.outputPath('genui-alternatives-320.png'),
  });
  await expect(page.locator('#ticari-kurallar .project-entry')).toHaveCount(8);
  await expect(page.locator('#ticari-olcutler .project-entry')).toHaveCount(10);
  await page.locator('#ticari-kurallar summary').click();
  await expect(page.locator('#ticari-kurallar')).toContainText('T-ECA-03');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await page.goto('projeler/titanlar/');
  await expect(page.locator('main > .eyebrow')).toContainText(
    'Ürün içi özellik',
  );
});
test('ticari checklist işaretlenmesi vaka kararını ve kaynakları değiştirmez', async ({
  page,
  request,
}) => {
  const before = await (await request.get('deger.json')).json();
  await page.goto('projeler/pim/#yatirim');
  const first = page
    .locator('[data-checklist="value-v1-experiments-pim"]')
    .getByRole('checkbox')
    .first();
  await first.check();
  await page.reload();
  await expect(first).toBeChecked();
  expect(await (await request.get('deger.json')).json()).toEqual(before);
  await expect(page.locator('#yatirim')).toContainText(
    'uygulanmış sonuçlar değil',
  );
});

test('sınanan değer görünümünde gizlenen kayıt araması tüm çalışmalara geçebilir', async ({
  page,
}) => {
  await page.goto('katalog/');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await page.getByLabel('Proje veya problem ara').fill('GenUI');
  await expect(page.locator('[data-project]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Tüm çalışmalarda ara' }).click();
  await expect(page.locator('[data-project="genui"]')).toBeVisible();
  await expect(page.getByLabel('Proje veya problem ara')).toHaveValue('GenUI');
});
