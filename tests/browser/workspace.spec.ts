import { test, expect } from '@playwright/test';

test('menü geniş ekrana geçerken gizlenen özet üzerinde odak bırakmaz', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1023, height: 768 });
  await page.goto('teknik/');
  await page.locator('.navigation-toggle').focus();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(
    page
      .getByRole('navigation', { name: 'Ana gezinme' })
      .getByRole('link')
      .first(),
  ).toBeFocused();
});

test('geri ve ileri gezinme URL filtrelerini geri yükler', async ({ page }) => {
  await page.goto('katalog/?cluster=domain');
  await expect(page.locator('[data-project]')).toHaveCount(2);
  await page.goto('katalog/?cluster=paid&q=pim');
  await expect(page.locator('[data-project]')).toHaveCount(1);
  await page.goBack();
  await expect(page.locator('[data-project]')).toHaveCount(2);
  await expect(page.getByLabel('Proje veya problem ara')).toHaveValue('');
  await page.goForward();
  await expect(page.locator('[data-project]')).toHaveCount(1);
  await expect(page.getByLabel('Proje veya problem ara')).toHaveValue('pim');
});

test('mobil gezinme bulunduğum sayfayı gösterir ve klavyeyle açılır', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('katalog/');
  const menu = page.locator('.navigation-toggle');
  await menu.focus();
  await page.keyboard.press('Enter');
  const nav = page.getByRole('navigation', { name: 'Ana gezinme' });
  await expect(nav).toBeVisible();
  await expect(nav.locator('[aria-current="page"]')).toHaveAccessibleName(
    'Projeler',
  );
  await nav.getByRole('link', { name: 'Yapılacaklar', exact: true }).click();
  await expect(page).toHaveURL(/kararlar\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('proje adımları plan ve ayrıntı sayfasında aynıdır; bölüm bağlantısı ayrıntıyı açar', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('kararlar/');
  await page
    .locator('[data-checklist="project-pim"]')
    .getByRole('checkbox')
    .first()
    .check();
  await page.goto('projeler/pim/');
  await expect(
    page
      .locator('[data-checklist="project-pim"]')
      .getByRole('checkbox')
      .first(),
  ).toBeChecked();
  await page
    .locator('.section-nav')
    .getByRole('link', { name: 'Gelir ve maliyet', exact: true })
    .click();
  await expect(page.locator('#finans')).toHaveAttribute('open', '');
  await page.reload();
  await expect(page.locator('#finans')).toHaveAttribute('open', '');
});

test('saklama alanı kapalıyken kontrol listesi kullanılabilir ve kayıt hatası görünür', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, 'setItem', {
      value() {
        throw new Error('Storage unavailable');
      },
    });
  });
  await page.goto('');
  const list = page.locator('[data-checklist="cluster-paid"]');
  await list.getByRole('checkbox').first().check();
  await expect(list.locator('[data-progress]')).toHaveText('1/4');
  await expect(list.locator('[data-checklist-note]')).toContainText(
    'kaydedilemedi',
  );
  await expect(list.getByRole('checkbox').first()).toBeChecked();
});

test('paylaşılabilir küme ve arama filtreleri aynı anda uygulanır', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('katalog/?cluster=domain');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await expect(page.locator('[data-project]')).toHaveCount(2);
  await page.goto('katalog/?cluster=paid&q=pim');
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await expect(page.locator('[data-project]')).toHaveCount(1);
  await expect(page.locator('[data-project="pim"]')).toBeVisible();
  await page.reload();
  await expect(page.locator('[data-ready]')).toHaveAttribute(
    'data-ready',
    'true',
  );
  await expect(page.locator('[data-project="pim"]')).toBeVisible();
  await page
    .getByRole('button', { name: 'Filtreleri temizle', exact: true })
    .click();
  await expect(page.locator('[data-project]')).toHaveCount(6);
  await expect(page).not.toHaveURL(/[?&](cluster|q)=/);
});

test('küme kontrol listesi kişisel ilerlemeyi sayfalar arasında korur', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('');
  const checklist = page.locator('[data-checklist="cluster-paid"]');
  const first = checklist.getByRole('checkbox').first();
  await expect(first).toBeEnabled();
  await first.check();
  await expect(first).toBeChecked();
  await page.reload();
  await expect(checklist.getByRole('checkbox').first()).toBeChecked();
  await page.setViewportSize({ width: 667, height: 320 });
  await expect(checklist.getByRole('checkbox').first()).toBeChecked();
  await checklist.getByRole('checkbox').first().uncheck();
  await page.reload();
  await expect(checklist.getByRole('checkbox').first()).not.toBeChecked();
});
