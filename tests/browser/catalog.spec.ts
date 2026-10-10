import { test, expect, type Page } from '@playwright/test';
import { gzipSync } from 'node:zlib';

const base =
  process.env.SITE_URL || 'http://127.0.0.1:4179/isfikirlerimchatgpt/';
const widths = [320, 360, 375, 390, 667, 767, 768, 769, 1023, 1024, 1025, 1280];
const ready = async (page: Page) =>
  expect(page.locator('[data-ready]')).toHaveAttribute('data-ready', 'true');

async function openFilters(page: Page) {
  if (
    !(await page
      .locator('.filter-disclosure')
      .evaluate((el) => (el as HTMLDetailsElement).open))
  )
    await page.locator('.filter-disclosure > summary').click();
}

function contrast(first: string, second: string) {
  const luminance = (color: string) => {
    const values = (color.match(/[\d.]+/g) || [])
      .slice(0, 3)
      .map(Number)
      .map((v) => v / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
  };
  const a = luminance(first),
    b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test('etkin yer tutucu metin ve klavye odağı kontrastı', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('katalog/');
  await ready(page);
  await openFilters(page);
  for (const label of ['Proje veya problem ara', 'Gelir türü']) {
    const colors = await page
      .locator('input')
      .and(page.getByLabel(label, { exact: true }))
      .evaluate((el) => ({
        border: getComputedStyle(el).borderTopColor,
        background: getComputedStyle(el).backgroundColor,
      }));
    expect(contrast(colors.border, colors.background)).toBeGreaterThanOrEqual(
      3,
    );
  }
  const inputs = page.locator(
    'input[placeholder]:not([placeholder=""]):visible',
  );
  for (let i = 0; i < (await inputs.count()); i++) {
    const colors = await inputs.nth(i).evaluate((el) => ({
      text: getComputedStyle(el, '::placeholder').color,
      background: getComputedStyle(el).backgroundColor,
    }));
    expect(contrast(colors.text, colors.background)).toBeGreaterThanOrEqual(
      4.5,
    );
  }
  await page.mouse.click(1, 1);
  await page.keyboard.press('Tab');
  const focus = await page.evaluate(() => ({
    ring: getComputedStyle(document.activeElement!).outlineColor,
    background: getComputedStyle(document.body).backgroundColor,
    style: getComputedStyle(document.activeElement!).outlineStyle,
  }));
  expect(focus.style).toBe('solid');
  expect(contrast(focus.ring, focus.background)).toBeGreaterThanOrEqual(3);
});
async function readable(page: Page) {
  const result = await page.evaluate(() => {
    const root = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const tiny = [...document.querySelectorAll<HTMLElement>('body *')]
      .filter(
        (el) =>
          el.getClientRects().length &&
          [...el.childNodes].some(
            (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
          ) &&
          parseFloat(getComputedStyle(el).fontSize) < root - 0.01,
      )
      .map((el) => ({
        tag: el.tagName,
        text: el.textContent?.slice(0, 50),
        size: getComputedStyle(el).fontSize,
      }));
    return {
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      tiny,
      overflowing: [...document.querySelectorAll<HTMLElement>('body *')]
        .filter(
          (el) =>
            el.getClientRects().length &&
            !el.closest('.table-scroll') &&
            el.scrollWidth > el.clientWidth + 2,
        )
        .map((el) => ({
          tag: el.tagName,
          className: el.className,
          text: el.textContent?.slice(0, 100),
          outer: el.clientWidth,
          inner: el.scrollWidth,
          font: getComputedStyle(el).fontSize,
          wrap: getComputedStyle(el).overflowWrap,
        })),
    };
  });
  expect(
    { overflow: result.overflow, tiny: result.tiny },
    JSON.stringify(result),
  ).toEqual({ overflow: false, tiny: [] });
}

test('320 öncelikli arama, boş durum, filtre, iki-dört proje ve kalıcı karşılaştırma', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('katalog/');
  await ready(page);
  const entries = page.locator('[data-project]');
  await expect(entries).toHaveCount(6);
  await page.getByLabel('Proje veya problem ara').fill('metaframework');
  await expect(entries).toHaveCount(1);
  await page
    .getByLabel('Proje veya problem ara')
    .fill('bulunamayacak-bir-fikir');
  await expect(entries).toHaveCount(0);
  await expect(
    page.getByText('Bu arama ve filtrelerle eşleşen proje bulunamadı.', {
      exact: false,
    }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Filtreleri temizle' }).click();
  await expect(entries).toHaveCount(6);
  await openFilters(page);
  await page.getByText('Diğer filtreler', { exact: false }).click();
  const stage = page.getByRole('combobox', { name: 'Ürün aşaması' });
  await stage.click();
  await page.getByRole('option').first().click();
  expect(await entries.count()).toBeLessThan(6);
  await page.getByRole('button', { name: 'Filtreleri temizle' }).click();
  for (let i = 0; i < 2; i++) await entries.nth(i).getByRole('button').click();
  await page
    .getByRole('link', { name: 'Seçilen projeleri karşılaştır' })
    .click();
  await ready(page);
  await expect(
    page.locator('.comparison-criterion').first().locator('.comparison-cell'),
  ).toHaveCount(2);
  await page.goto('katalog/');
  await ready(page);
  for (let i = 2; i < 4; i++) await entries.nth(i).getByRole('button').click();
  await expect(page.getByRole('status').first()).toContainText('4/4');
  await expect(entries.nth(4).getByRole('button')).toBeDisabled();
  await entries.nth(0).getByRole('button').click();
  await expect(entries.nth(4).getByRole('button')).toBeEnabled();
  await page
    .getByRole('link', { name: 'Seçilen projeleri karşılaştır' })
    .click();
  await ready(page);
  await expect(page.locator('.comparison-criterion')).toHaveCount(11);
  await expect(
    page.locator('.comparison-criterion').first().locator('.comparison-cell'),
  ).toHaveCount(3);
  await page.reload();
  await ready(page);
  await expect(page.getByRole('status').first()).toContainText('3/4');
  await page.setViewportSize({ width: 667, height: 320 });
  await readable(page);
  await expect(page.getByRole('status').first()).toContainText('3/4');
  await page
    .getByRole('button', { name: 'Karşılaştırma seçimini temizle' })
    .click();
  await expect(
    page.getByText('Karşılaştırmak için aşağıdan en az iki proje seçin.'),
  ).toBeVisible();
  await expect(page.getByRole('status').first()).toContainText('0/4');
  expect(errors).toEqual([]);
});

test('özel seçim klavyesi, geçersiz ağırlık ve pencereden odak dönüşü', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto('katalog/');
  await ready(page);
  await openFilters(page);
  const sort = page.getByRole('combobox', { name: 'Sıralama' });
  await sort.focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(sort).not.toHaveValue('Ada göre');
  await page.keyboard.press('Escape');
  const opener = page.getByRole('button', { name: 'Ağırlıkları düzenle' });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByLabel('Gelir potansiyeli ağırlığı').fill('99');
  await expect(dialog.getByRole('alert')).toBeVisible();
  await readable(page);
  await expect
    .poll(() =>
      dialog.evaluate((el) => {
        let opacity = 1;
        let current: Element | null = el;
        while (current) {
          opacity *= Number(getComputedStyle(current).opacity);
          current = current.parentElement;
        }
        return opacity;
      }),
    )
    .toBe(1);
  await page.screenshot({
    path: testInfo.outputPath('320-modal.png'),
    animations: 'disabled',
  });
  await page.setViewportSize({ width: 667, height: 320 });
  await expect(dialog.getByLabel('Gelir potansiyeli ağırlığı')).toHaveValue(
    '99',
  );
  await expect(dialog.getByLabel('Gelir potansiyeli ağırlığı')).toBeFocused();
  await readable(page);
  await page.setViewportSize({ width: 320, height: 480 });
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await opener.click();
  await dialog.getByRole('button', { name: 'Hızlı gelir varsayılanı' }).click();
  await expect(dialog.getByRole('alert')).toHaveCount(0);
  await dialog
    .getByRole('button', { name: 'Ağırlıkları uygula ve kapat' })
    .click();
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await expect(
    page.getByRole('heading', {
      name: 'Eksik ölçütlü projeler — kesin sıralama yok',
    }),
  ).toBeVisible();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  const focus = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const style = getComputedStyle(el);
    const ancestors = [];
    let parent = el.parentElement;
    while (parent) {
      const s = getComputedStyle(parent);
      if (s.outlineStyle !== 'none' || s.boxShadow !== 'none')
        ancestors.push(parent.tagName);
      parent = parent.parentElement;
    }
    return { outline: style.outlineStyle, shadow: style.boxShadow, ancestors };
  });
  expect(focus).toEqual({ outline: 'solid', shadow: 'none', ancestors: [] });
});

test('tüm genişliklerde metin, açılır panel, tablo ve büyütülmüş kök okunabilir', async ({
  page,
}, testInfo) => {
  await page.goto('katalog/');
  await ready(page);
  await openFilters(page);
  for (const width of widths) {
    await page.setViewportSize({
      width,
      height: width === 667 ? 320 : width === 320 ? 480 : 720,
    });
    await readable(page);
    await page.getByRole('combobox', { name: 'Gelir türü' }).click();
    await readable(page);
    await page.keyboard.press('Escape');
  }
  await page.setViewportSize({ width: 320, height: 640 });
  await page.getByRole('button', { name: 'Tablo görünümü' }).click();
  const table = page.getByRole('region', {
    name: 'Proje karşılaştırma tablosu, yatay kaydırılabilir',
  });
  await readable(page);
  const dimensions = await table.evaluate((el) => ({
    outer: el.clientWidth,
    inner: el.scrollWidth,
  }));
  expect(dimensions.inner).toBeGreaterThan(dimensions.outer);
  await page.mouse.click(1, 1);
  await table.click({ position: { x: 4, y: 4 } });
  expect(await table.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe(
    'none',
  );
  await page.mouse.click(1, 1);
  let focused = false;
  for (let i = 0; i < 45; i++) {
    await page.keyboard.press('Tab');
    if (await table.evaluate((el) => el === document.activeElement)) {
      focused = true;
      break;
    }
  }
  expect(focused).toBe(true);
  expect(await table.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe(
    'solid',
  );
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => table.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await page.screenshot({
    path: testInfo.outputPath('320-table-keyboard.png'),
  });
  await page.addStyleTag({ content: ':root { font-size:200%; }' });
  await readable(page);
});

test('JavaScript kapalıyken bütün temel sayfa ve proje bağlantıları okunur', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 640 },
  });
  const page = await context.newPage();
  for (const route of [
    '',
    'katalog/',
    'karsilastir/',
    'firsatlar/',
    'iliskiler/',
    'kararlar/',
    'yontem/',
  ]) {
    const response = await page.goto(new URL(route, base).href);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await readable(page);
  }
  await page.goto(new URL('katalog/', base).href);
  const links = await page
    .locator('[data-project] h3 a')
    .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).href));
  expect(links).toHaveLength(6);
  for (const link of links) {
    const response = await page.goto(link);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await readable(page);
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
  }
  await context.close();
});

test('karar, kapsam ve genel bakış metinleri akışkan kalır', async ({
  page,
}) => {
  for (const route of ['', 'kararlar/', 'yontem/']) {
    await page.goto(route || './');
    for (const width of widths) {
      await page.setViewportSize({
        width,
        height: width === 667 ? 320 : 640,
      });
      await readable(page);
    }
    await page.setViewportSize({ width: 320, height: 640 });
    await page.addStyleTag({ content: ':root { font-size:200%; }' });
    await readable(page);
  }
});

test('statik tablolar klavyeyle yatay kayar', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 480 });
  for (const route of ['firsatlar/', 'projeler/atonota/']) {
    await page.goto(route);
    if (route.startsWith('projeler')) {
      await page.locator('#ozellikler > summary').click();
    } else {
      await page.locator('#puanlar > summary').click();
    }
    const region = page.locator('.table-scroll').first();
    await page.mouse.click(1, 1);
    let focused = false;
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab');
      if (await region.evaluate((el) => el === document.activeElement)) {
        focused = true;
        break;
      }
    }
    expect(focused).toBe(true);
    await page.keyboard.press('ArrowRight');
    await expect
      .poll(() => region.evaluate((el) => el.scrollLeft))
      .toBeGreaterThan(0);
    await readable(page);
  }
});

test('statik rotalar yalnız ortak gezinme ve kontrol listesi kodunu indirir; katalog bütçede kalır', async ({
  browser,
}, testInfo) => {
  for (const route of ['', 'firsatlar/', 'projeler/atonota/', 'katalog/']) {
    const context = await browser.newContext({
      serviceWorkers: 'block',
      viewport: { width: 320, height: 640 },
      locale: 'tr-TR',
    });
    const page = await context.newPage();
    const requests: { url: string; type: string }[] = [];
    const failures: string[] = [];
    const responses: {
      url: string;
      status: number;
      type: string;
      encoding: string;
      bytes: number;
      normalizedGzip: number;
    }[] = [];
    const pending: Promise<void>[] = [];
    page.on('request', (request) =>
      requests.push({ url: request.url(), type: request.resourceType() }),
    );
    page.on('requestfailed', (request) => failures.push(request.url()));
    page.on('response', (response) =>
      pending.push(
        (async () => {
          const headers = await response.allHeaders();
          const body = await response.body();
          const sizes = await response.request().sizes();
          responses.push({
            url: response.url(),
            status: response.status(),
            type: headers['content-type'] || '',
            encoding: headers['content-encoding'] || 'identity',
            bytes: sizes.responseBodySize,
            normalizedGzip: gzipSync(body).byteLength,
          });
        })().catch(() => {
          failures.push(response.url());
        }),
      ),
    );
    await page.goto(new URL(route, base).href);
    if (route === 'katalog/') {
      await ready(page);
      await page.getByLabel('Proje veya problem ara').fill('pim');
    }
    await page.waitForLoadState('networkidle');
    await Promise.all(pending);
    expect(failures).toEqual([]);
    expect(responses.filter((r) => r.status >= 400)).toEqual([]);
    const size = (kind: string) =>
      responses
        .filter((r) => r.type.includes(kind))
        .reduce((sum, r) => sum + r.bytes, 0);
    const inlineScripts = await page
      .locator('script:not([src])')
      .evaluateAll((els) =>
        els
          .filter(
            (el) =>
              !['application/json', 'application/ld+json'].includes(
                el.getAttribute('type') || '',
              ),
          )
          .map((el) => el.textContent || '')
          .join('\n'),
      );
    const inlineScriptGzip = inlineScripts
      ? gzipSync(inlineScripts).byteLength
      : 0;
    const totals = {
      total: responses.reduce((sum, r) => sum + r.bytes, 0),
      js: size('javascript'),
      css: size('css'),
      html: size('html'),
    };
    await testInfo.attach(
      'network-' + (route.replaceAll('/', '-') || 'home') + '.json',
      {
        body: JSON.stringify(
          {
            condition:
              'Her rota yeni soğuk BrowserContext; SW engelli; gerçek encoded response body boyutu, protokol başlıkları hariç. Node gzip ayrıca karşılaştırma içindir.',
            totals,
            inlineScriptGzip,
            requests,
            failures,
            responses,
          },
          null,
          2,
        ),
        contentType: 'application/json',
      },
    );
    if (route !== 'katalog/') {
      expect(totals.js + inlineScriptGzip).toBeGreaterThan(0);
      expect(totals.js + inlineScriptGzip).toBeLessThan(2 * 1024);
      expect(
        requests.filter((r) => /Catalog|Proof|react-dom/.test(r.url)),
      ).toHaveLength(0);
    } else {
      expect(totals.js).toBeGreaterThan(0);
      expect(totals.total).toBeLessThanOrEqual(500 * 1024);
      expect(totals.js).toBeLessThanOrEqual(180 * 1024);
      expect(totals.css).toBeLessThanOrEqual(50 * 1024);
      expect(totals.html).toBeLessThanOrEqual(50 * 1024);
    }
    await context.close();
  }
});

test('görsel referans adayları, dokunma ve hareket tercihi', async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    viewport: { width: 320, height: 640 },
    hasTouch: true,
    reducedMotion: 'reduce',
    locale: 'tr-TR',
  });
  const page = await context.newPage();
  await page.goto(new URL('katalog/', base).href);
  await ready(page);
  await testInfo.attach('environment.json', {
    body: JSON.stringify(
      {
        engine: testInfo.project.name,
        browserVersion: browser.version(),
        hostOS: process.platform,
        hostArch: process.arch,
        emulation: true,
        ...(await page.evaluate(() => ({
          ua: navigator.userAgent,
          viewport: { width: innerWidth, height: innerHeight },
          dpr: devicePixelRatio,
          touchPoints: navigator.maxTouchPoints,
          coarse: matchMedia('(pointer:coarse)').matches,
          anyCoarse: matchMedia('(any-pointer:coarse)').matches,
          hover: matchMedia('(hover:hover)').matches,
          reducedMotion: matchMedia('(prefers-reduced-motion:reduce)').matches,
        }))),
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });
  await readable(page);
  await page.locator('.filter-disclosure > summary').tap();
  const select = page.getByRole('combobox', { name: 'Gelir türü' });
  await select.tap();
  await expect(page.getByRole('listbox')).toBeVisible();
  await readable(page);
  await page.screenshot({
    path: testInfo.outputPath('320-dropdown.png'),
    fullPage: false,
  });
  await page.keyboard.press('Escape');
  await page.getByLabel('Proje veya problem ara').fill('PIM');
  await page.setViewportSize({ width: 667, height: 320 });
  await expect(page.locator('[data-project]')).toHaveCount(1);
  await readable(page);
  await page.screenshot({
    path: testInfo.outputPath('landscape.png'),
    fullPage: true,
  });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.getByRole('button', { name: 'Filtreleri temizle' }).click();
  await page.mouse.click(1, 1);
  const first = await page.screenshot({
    path: testInfo.outputPath('desktop.png'),
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
  const repeated = await page.screenshot({
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
  });
  expect(repeated.equals(first)).toBe(true);
  await context.close();
});
