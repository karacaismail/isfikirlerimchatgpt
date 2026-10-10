import { test } from 'node:test';
import assert from 'node:assert/strict';
import { development } from '../src/data/development.ts';
import { strategySchema } from '../src/lib/strategy.ts';
import {
  createDefaultPreferences,
  filterProjects,
  preferencesFromUrl,
  queryStringForPreferences,
  resetFilters,
  sanitizePreferences,
  sortProjects,
  filterKeys,
  toCatalogCandidates,
} from '../src/lib/catalog.ts';
const candidates = strategySchema.parse(development).candidates;
test('katalog ayrıntılı ve ilk değerlendirme kayıtlarını sahiplik düzeltmesiyle kapsar', () => {
  assert.equal(candidates.length, 23);
  assert.equal(candidates.filter((c) => c.coverage === 'detailed').length, 6);
  assert.ok(candidates.every((c) => c.ownership === 'user'));
  assert.ok(candidates.some((c) => c.id === 'genui'));
  assert.ok(candidates.every((c) => c.facts.runtime.state === 'unknown'));
});
test('Türkçe arama ve teknik filtreler AND ile daraltır', () => {
  const p = {
    ...createDefaultPreferences(),
    query: 'PİM',
    kind: 'product',
    coverage: 'detailed',
  };
  assert.deepEqual(
    filterProjects(candidates, p).map((c) => c.id),
    ['pim'],
  );
  assert.deepEqual(filterProjects(candidates, { ...p, kind: 'platform' }), []);
});
test('bozuk, eski veya bilinmeyen tercihler geçersiz filtre ve seçim üretmez', () => {
  const p = sanitizePreferences(
    {
      query: 'a'.repeat(250),
      focus: 'yok',
      kind: 'yok',
      coverage: 'yok',
      capability: 'yok',
      rule: 'yok',
      goal: 'yok',
      sort: 'profile',
      selected: ['pim', 'pim', 'yok', 'hrms', 'titanlar', 'metaframer', 'ibys'],
      weights: { G: 100, V: 0, O: 0, U: 0 },
    },
    candidates,
  );
  assert.equal(p.query.length, 200);
  filterKeys.forEach((k) => assert.equal(p[k], null));
  assert.equal(p.sort, 'name');
  assert.equal(p.goal, 'flow');
  assert.deepEqual(p.selected, ['pim', 'hrms', 'titanlar', 'metaframer']);
  assert.equal('weights' in p, false);
  assert.deepEqual(
    sanitizePreferences(null, candidates),
    createDefaultPreferences(),
  );
});
test('paylaşılan URL filtreyi değiştirir ve yerel seçimi korur', () => {
  const saved = {
    ...createDefaultPreferences(),
    query: 'eski',
    kind: 'product',
    selected: ['hrms', 'pim'],
  };
  const p = preferencesFromUrl(
    '?coverage=detailed&q=ürün&goal=core',
    saved,
    candidates,
  );
  assert.equal(p.query, 'ürün');
  assert.equal(p.kind, null);
  assert.equal(p.coverage, 'detailed');
  assert.equal(p.goal, 'core');
  assert.deepEqual(p.selected, saved.selected);
  assert.deepEqual(
    preferencesFromUrl('?campaign=foo', saved, candidates),
    saved,
  );
  assert.equal(
    preferencesFromUrl('?q=&focus=unknown', saved, candidates).focus,
    null,
  );
});
test('URL gidiş dönüşü ve temizleme hedefi/seçimi korur, eski ticari URL alanlarını kaldırır', () => {
  const p = {
    ...createDefaultPreferences(),
    query: 'İBYS ziyaret',
    goal: 'reliability' as const,
    coverage: 'detailed',
    selected: ['ibys', 'pim'],
    sort: 'fit',
  };
  const search = queryStringForPreferences(
    '?campaign=source&cluster=paid&income=service',
    p,
  );
  assert.equal(new URLSearchParams(search).get('campaign'), 'source');
  assert.equal(new URLSearchParams(search).has('cluster'), false);
  assert.deepEqual(preferencesFromUrl(search, p, candidates), p);
  const clear = resetFilters(p);
  assert.equal(clear.goal, 'reliability');
  assert.deepEqual(clear.selected, p.selected);
  assert.equal(clear.query, '');
  assert.equal(clear.coverage, null);
});
test('liste sırası kalite puanı değildir; hedef ilişkisi ve kaynak derinliği ayrı tercihlerdir', () => {
  const alphabetic = sortProjects(candidates, createDefaultPreferences());
  assert.deepEqual(
    alphabetic.map((c) => c.name),
    [...candidates]
      .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
      .map((c) => c.name),
  );
  const covered = sortProjects(candidates, {
    ...createDefaultPreferences(),
    sort: 'coverage',
  });
  assert.ok(covered.slice(0, 6).every((c) => c.coverage === 'detailed'));
  const related = sortProjects(candidates, {
    ...createDefaultPreferences(),
    goal: 'core',
    sort: 'fit',
  });
  const firstUnrelated = related.findIndex((c) => !c.goals.includes('core'));
  assert.ok(
    related.slice(firstUnrelated).every((c) => !c.goals.includes('core')),
  );
});

test('paylaşılan filtre URLsi yerel hedefi sessizce devralmaz', () => {
  const saved = {
    ...createDefaultPreferences(),
    goal: 'core' as const,
    selected: ['pim'],
  };
  assert.equal(
    preferencesFromUrl('?coverage=detailed', saved, candidates).goal,
    'flow',
  );
  assert.equal(
    preferencesFromUrl('?goal=core&coverage=detailed', saved, candidates).goal,
    'core',
  );
  assert.equal(
    new URLSearchParams(
      queryStringForPreferences('', createDefaultPreferences()),
    ).get('goal'),
    'flow',
  );
});

test('ilk görünüm teknik altyapıyı ticari öneri yapmaz; tüm çalışmalar ayrıca erişilir', () => {
  const p = createDefaultPreferences();
  assert.ok(
    filterProjects(candidates, p).every((c) => c.commercial?.recommended),
  );
  assert.ok(!filterProjects(candidates, p).some((c) => c.id === 'genui'));
  assert.equal(filterProjects(candidates, { ...p, view: 'all' }).length, 23);
  const shared = preferencesFromUrl(
    '?view=all&commercial=internal',
    p,
    candidates,
  );
  assert.equal(shared.view, 'all');
  assert.ok(
    filterProjects(candidates, shared).every(
      (c) => c.commercial?.action === 'internal',
    ),
  );
});

test('katalog yalnız gereken veriyi taşır; kaynak metinleri ayrı sayfada kalır', () => {
  const compact = toCatalogCandidates(candidates);
  assert.ok(compact.every((c) => !('evidence' in c)));
  const prefs = { ...createDefaultPreferences(), view: 'all' as const };
  assert.deepEqual(
    filterProjects(compact, prefs).map((c) => c.id),
    filterProjects(candidates, prefs).map((c) => c.id),
  );
});

test('kayıt türü filtresi ticari konumla eşleşir; özellik bağımsız ürün sayılmaz', () => {
  const p = {
    ...createDefaultPreferences(),
    view: 'all' as const,
    kind: 'feature',
  };
  const ids = filterProjects(candidates, p).map((c) => c.id);
  assert.ok(ids.includes('genui'));
  assert.ok(ids.includes('titanlar'));
  assert.ok(!ids.includes('pim'));
});
