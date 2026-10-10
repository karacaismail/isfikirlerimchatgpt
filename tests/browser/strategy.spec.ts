import { test, expect } from '@playwright/test';
test('reklamsız satış potansiyeli proje ve karşılaştırmada ödeme koşulundan ayrı görünür', async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('projeler/pim/#reklamsiz');
  await expect(
    page.getByRole('heading', {
      name: 'Reklamsız satış yolu ve ekonomisi',
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator('#reklamsiz')).toContainText(
    'Gerçek erişim bilinmiyor',
  );
  await expect(page.locator('#reklamsiz')).toContainText(
    'talep veya satış kanıtı üretmez',
  );
  const response = await request.get('strateji.json');
  const data = await response.json();
  expect(response.status()).toBe(200);
  expect(data.version).toBe('2.2');
  expect(
    data.candidates.every((c: { assessments: { criterion: string }[] }) =>
      c.assessments.some((a) => a.criterion === 'organicSales'),
    ),
  ).toBe(true);
  await page.goto('karsilastir/?view=all');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  for (const id of ['pim', 'atonota'])
    await page.locator(`[data-project="${id}"]`).getByRole('button').click();
  const row = page.locator('.comparison-criterion').filter({
    has: page.getByRole('heading', {
      name: 'Reklamsız satış potansiyeli',
      exact: true,
    }),
  });
  await expect(row.locator('.comparison-cell')).toHaveCount(2);
  for (const id of ['pim', 'atonota']) {
    const candidate = data.candidates.find((c: { id: string }) => c.id === id);
    const assessment = candidate.assessments.find(
      (a: { criterion: string }) => a.criterion === 'organicSales',
    );
    await expect(row).toContainText(assessment.finding);
    await expect(row).toContainText(assessment.decisionImpact);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
test('geliştirme stratejisi satış sırası yerine ölçüt ve ECA gerekçesi sunar', async ({
  page,
}) => {
  await page.goto('kararlar/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Önceliği hangi gerekçeyle vereceğim?',
  );
  await expect(page.locator('#olcutler > details')).toHaveCount(15);
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
  expect(data.version).toBe('2.2');
  expect(data.candidates).toHaveLength(23);
  expect(
    data.candidates.every((c: { ownership: string }) => c.ownership === 'user'),
  ).toBe(true);
  await page.goto('katalog/?view=all');
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
  await page.goto('katalog/?view=all');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await expect(page.getByLabel('Proje veya problem ara')).toHaveValue('');
  await expect(page.getByRole('status').first()).toContainText('0/4');
});
