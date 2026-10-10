import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  criteria,
  groupIds,
  scoreGroup,
  profileScore,
  searchText,
  financeScenario,
  projectSchema,
  datasetSchema,
} from '../src/lib/model.ts';

test('ağırlıklar 100 ve somut ölçeklerin altı basamağı var', () => {
  for (const id of groupIds) {
    assert.equal(
      criteria[id].reduce((s, c) => s + c.weight, 0),
      100,
    );
    for (const c of criteria[id]) assert.equal(c.anchors.length, 6);
  }
});
test('eksik veri sıfır puan veya kesin sıralama olmaz', () => {
  assert.deepEqual(scoreGroup('G', []), {
    lower: 0,
    upper: 100,
    unknown: 100,
    complete: false,
  });
  const values = criteria.G.map((c) => ({
    id: c.id,
    score: c.id === 'problem' ? 5 : null,
    rationale: 'test',
    evidence: [],
    basis: 'belirsiz' as const,
    change: 'test',
  }));
  assert.deepEqual(scoreGroup('G', values), {
    lower: 20,
    upper: 100,
    unknown: 80,
    complete: false,
  });
  assert.equal(
    profileScore(
      { scores: { G: values, V: [], O: [], U: [] } },
      { G: 100, V: 0, O: 0, U: 0 },
    ),
    null,
  );
});
test('tam puan ve geçersiz ağırlık', () => {
  const scores = Object.fromEntries(
    groupIds.map((g) => [
      g,
      criteria[g].map((c) => ({
        id: c.id,
        score: 3,
        rationale: 'test',
        evidence: [],
        basis: 'çıkarım' as const,
        change: 'test',
      })),
    ]),
  );
  assert.equal(scoreGroup('G', scores.G).lower, 60);
  assert.equal(
    profileScore({ scores } as never, { G: 45, V: 0, O: 30, U: 25 }),
    60,
  );
  assert.equal(
    profileScore({ scores } as never, { G: 50, V: 0, O: 30, U: 25 }),
    null,
  );
});
test('Türkçe varyantlar ve diğer adlar için aynı arama normu', () => {
  assert.equal(
    searchText('İBYS Iş ıslak ÇÖĞÜŞ'),
    searchText('ibys is islak cogus'),
  );
});
test('kurulum geliri tekrar gelire eklenmez; faaliyet sonucu net kâr değildir', () => {
  const x = financeScenario({
    leads: 10,
    meetingRate: 1,
    paidRate: 0.2,
    price: 100,
    churn: 0.1,
    variableCost: 10,
    feeRate: 0.05,
    fixedCost: 50,
    previousCustomers: 10,
    setupPrice: 500,
  });
  assert.equal(x?.activeCustomers, 11);
  assert.equal(x?.subscription, 1100);
  assert.equal(x?.setup, 1000);
  assert.equal(x?.operatingResult, 1835);
  assert.equal(financeScenario({ leads: -1 } as never), null);
  assert.equal(financeScenario({ leads: 0 } as never), null);
});
test('sahiplik ve gizlilik kapısı şemada zorunlu', () => {
  assert.equal(
    projectSchema.shape.ownership.safeParse('işverene ait').success,
    false,
  );
  assert.equal(
    projectSchema.shape.publishability.safeParse('ham kaynak').success,
    false,
  );
});

test('gerçek yayın verisi izinli kaynak ve ölçüt bağlarını korur', () => {
  const raw = JSON.parse(
    readFileSync(
      new URL('../src/data/portfolio.json', import.meta.url),
      'utf8',
    ),
  );
  const data = datasetSchema.parse(raw);
  assert.ok(data.projects.length > 0, 'Boş teknik fixture yayımlanamaz');
  const extra = structuredClone(raw);
  extra.projects[0].private_notes = 'Yayımlanamaz alan';
  assert.equal(datasetSchema.safeParse(extra).success, false);
  const missing = structuredClone(raw);
  missing.projects[0].scores.G[0].score = 3;
  missing.projects[0].scores.G[0].evidence = ['olmayan-kanit'];
  assert.equal(datasetSchema.safeParse(missing).success, false);
  const duplicate = structuredClone(raw);
  duplicate.projects.push(duplicate.projects[0]);
  assert.equal(datasetSchema.safeParse(duplicate).success, false);
  const unsafeURL = structuredClone(raw);
  unsafeURL.projects[0].sources[0].url = 'javascript:alert(1)';
  assert.equal(datasetSchema.safeParse(unsafeURL).success, false);
});
