import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { datasetSchema } from '../src/lib/model.ts';
import { guideClusters, projectGuides } from '../src/data/guides.ts';
import {
  createDefaultPreferences,
  filterProjects,
  preferencesFromUrl,
  queryStringForPreferences,
  resetFilters,
  sanitizePreferences,
  sortProjects,
  type GuideIndex,
} from '../src/lib/catalog.ts';

const projects = datasetSchema.parse(
  JSON.parse(
    readFileSync(
      new URL('../src/data/portfolio.json', import.meta.url),
      'utf8',
    ),
  ),
).projects;
const guides: GuideIndex = {
  titanlar: {
    cluster: 'paid',
    customerType: 'individual',
    revenueType: 'service',
    summary: 'Küçük gruba iki oturumluk eğitim.',
    buyer: 'Katılımcı',
    firstOffer: 'Ücretli atölye',
    nextStep: 'Beş kişiden ödeme iste.',
  },
  pim: {
    cluster: 'paid',
    customerType: 'business',
    revenueType: 'subscription',
    summary: 'Ürün kataloğunu tek satış kanalına hazırla.',
    buyer: 'E-ticaret ekibi',
    firstOffer: '100 ürün için katalog düzenleme',
    nextStep: 'Örnek ürün dosyası iste.',
  },
  hrms: {
    cluster: 'domain',
    customerType: 'business',
    revenueType: 'subscription',
    summary: 'Bir insan kaynakları sürecini düzenle.',
    buyer: 'İK yöneticisi',
    firstOffer: 'Tek süreç denemesi',
    nextStep: 'Alan ortağı bul.',
  },
  metaframer: {
    cluster: 'internal',
    customerType: 'internal',
    revenueType: 'internal',
    summary: 'Seçilen projenin geliştirmesini hızlandır.',
    buyer: 'Kendi ekibin',
    firstOffer: 'İç kullanım',
    nextStep: 'Haftalık süre sınırı koy.',
  },
};

test('yayımlanan her proje tam bir rehbere ve tek başlangıç kümesine bağlıdır', () => {
  assert.deepEqual(
    Object.keys(projectGuides).sort(),
    projects.map((p) => p.id).sort(),
  );
  const clustered = guideClusters.flatMap((cluster) => cluster.projectIds);
  assert.equal(new Set(clustered).size, clustered.length);
  assert.deepEqual([...clustered].sort(), projects.map((p) => p.id).sort());
  for (const project of projects) {
    const guide = projectGuides[project.id as keyof typeof projectGuides];
    assert.ok(
      guide.summary && guide.buyer && guide.firstOffer && guide.nextStep,
    );
    assert.ok(guide.steps.length > 0);
    assert.ok(
      guideClusters.some(
        (cluster) =>
          cluster.value === guide.cluster &&
          cluster.projectIds.some((id) => id === project.id),
      ),
    );
  }
});

test('arama ve müşteri, küme, gelir, platform filtreleri birlikte daraltır', () => {
  const prefs = {
    ...createDefaultPreferences(),
    query: 'ÜRÜN kanal',
    cluster: 'paid',
    customer: 'business',
    revenue: 'subscription',
    platform: 'Web',
  };
  assert.deepEqual(
    filterProjects(projects, prefs, guides).map((p) => p.id),
    ['pim'],
  );
  assert.deepEqual(
    filterProjects(projects, { ...prefs, customer: 'individual' }, guides),
    [],
  );
  assert.deepEqual(
    filterProjects(
      projects,
      { ...prefs, query: 'İK ortağı', cluster: 'domain', platform: null },
      guides,
    ).map((p) => p.id),
    ['hrms'],
  );
});

test('bozuk veya eski saklama değerleri geçersiz filtre ve seçim üretmez', () => {
  const prefs = sanitizePreferences(
    {
      query: 'a'.repeat(250),
      cluster: 'olmayan',
      customer: 'olmayan',
      revenue: 'olmayan',
      stage: 'olmayan',
      platform: 'olmayan',
      income: 'olmayan',
      decision: 'olmayan',
      ownership: 'bana ait',
      sort: 'olmayan',
      selected: ['pim', 'pim', 'yok', 'hrms', 'titanlar', 'metaframer', 'ibys'],
      weights: { G: 100, V: 100, O: 100, U: 100 },
    },
    projects,
    guides,
  );
  assert.equal(prefs.query.length, 200);
  for (const key of [
    'cluster',
    'customer',
    'revenue',
    'stage',
    'platform',
    'income',
    'decision',
  ] as const)
    assert.equal(prefs[key], null);
  assert.equal(prefs.sort, 'name');
  assert.deepEqual(prefs.selected, ['pim', 'hrms', 'titanlar', 'metaframer']);
  assert.deepEqual(prefs.weights, createDefaultPreferences().weights);
  assert.equal('ownership' in prefs, false);
  assert.deepEqual(
    sanitizePreferences(null, projects, guides),
    createDefaultPreferences(),
  );
});

test('paylaşılan URL filtreleri saklama filtrelerini değiştirir; seçim ve ağırlıklar korunur', () => {
  const saved = {
    ...createDefaultPreferences(),
    query: 'eski',
    stage: projects[0].maturity.product,
    selected: ['hrms', 'pim'],
    weights: { G: 30, V: 35, O: 20, U: 15 },
  };
  const result = preferencesFromUrl(
    '?cluster=paid&customer=business&q=ürün&sort=profile',
    saved,
    projects,
    guides,
  );
  assert.equal(result.query, 'ürün');
  assert.equal(result.stage, null);
  assert.equal(result.cluster, 'paid');
  assert.equal(result.customer, 'business');
  assert.equal(result.sort, 'profile');
  assert.deepEqual(result.selected, saved.selected);
  assert.deepEqual(result.weights, saved.weights);
  assert.deepEqual(
    preferencesFromUrl('?campaign=foo', saved, projects, guides),
    saved,
  );
  assert.equal(
    preferencesFromUrl('?q=&cluster=unknown', saved, projects, guides).query,
    '',
  );
  assert.equal(
    preferencesFromUrl('?q=&cluster=unknown', saved, projects, guides).cluster,
    null,
  );
});

test('URL gidiş dönüşü ve filtre temizliği karşılaştırma seçimlerini kaybetmez', () => {
  const prefs = {
    ...createDefaultPreferences(),
    query: 'İBYS ziyaret',
    cluster: 'domain',
    selected: ['ibys', 'pim'],
    sort: 'U',
  };
  const search = queryStringForPreferences(
    '?campaign=source&q=old&unknown=keep',
    prefs,
  );
  assert.equal(new URLSearchParams(search).get('campaign'), 'source');
  assert.equal(new URLSearchParams(search).get('unknown'), 'keep');
  assert.equal(new URLSearchParams(search).get('q'), 'İBYS ziyaret');
  assert.equal(new URLSearchParams(search).has('selected'), false);
  assert.deepEqual(preferencesFromUrl(search, prefs, projects, guides), prefs);
  const cleared = resetFilters(prefs);
  assert.deepEqual(cleared.selected, prefs.selected);
  assert.deepEqual(cleared.weights, prefs.weights);
  assert.equal(cleared.query, '');
  assert.equal(cleared.cluster, null);
  assert.equal(cleared.sort, 'name');
  assert.equal(
    new URLSearchParams(queryStringForPreferences(search, cleared)).has('q'),
    false,
  );
});

test('puan sıralamasında bilinmeyen ölçütler sıfır veya kesin üstünlük sayılmaz', () => {
  const list = sortProjects(projects, {
    ...createDefaultPreferences(),
    sort: 'profile',
  });
  assert.equal(list.complete.length, 0);
  assert.equal(list.incomplete.length, projects.length);
  assert.deepEqual(
    list.sorted.map((p) => p.name),
    [...projects]
      .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
      .map((p) => p.name),
  );
  assert.equal(
    sortProjects(projects, createDefaultPreferences()).complete.length,
    projects.length,
  );
});
