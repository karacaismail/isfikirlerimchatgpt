import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateCandidate,
  resolveTraces,
  strategySchema,
  factIds,
  assessmentFor,
  strategicCriteria,
  type Candidate,
} from '../src/lib/strategy.ts';
const sample = (): Candidate => ({
  id: 'example',
  name: 'Örnek',
  aliases: [],
  kind: 'product',
  ownership: 'user',
  coverage: 'initial',
  definition: 'Yazılım',
  observed: 'Kaynak',
  goals: ['flow'],
  capabilities: ['Doğrulama'],
  slice: {
    title: 'Dilim',
    outcome: 'Sonuç',
    acceptance: ['Hatalı girdi reddedilir'],
    steps: ['Kur'],
  },
  rationale: 'Öneri',
  counterargument: 'Belirsiz',
  reconsiderWhen: 'Yeni kanıt',
  effort: { status: 'not_estimated', reason: 'Ölçülmedi' },
  assessments: [],
  dependencies: [],
  facts: Object.fromEntries(
    factIds.map((id) => [
      id,
      { state: 'unknown', reason: 'Çalıştırılmadı', evidenceIds: [] },
    ]),
  ) as unknown as Candidate['facts'],
  evidence: [
    {
      id: 'source',
      label: 'Kaynak',
      kind: 'source',
      claim: 'Kaynak görüldü',
      limitation: 'Runtime değil',
    },
  ],
});
test('reklamsız satış potansiyeli bağımsız bir değerlendirme ölçütüdür', () => {
  assert.ok(strategicCriteria.some((c) => c.id === 'organicSales'));
  assert.equal(assessmentFor(sample(), 'organicSales').state, 'unknown');
});
test('reklamsız satış hipotezi teknik geliştirmeyi ödeme koşuluna bağlamaz veya kritik hatayı telafi etmez', () => {
  const c = sample();
  c.facts.runtime = {
    state: 'yes',
    reason: 'Başlangıç çalıştı',
    evidenceIds: ['source'],
  };
  c.facts.bounded = {
    state: 'yes',
    reason: 'Dar akış tanımlı',
    evidenceIds: ['source'],
  };
  assert.equal(evaluateCandidate(c, 'flow').action, 'build');
  c.assessments.push({
    criterion: 'organicSales',
    state: 'inferred',
    finding:
      'Arama ve ürün demosuyla erişim sınanabilir; satış gerçekleşmiş değil.',
    evidenceIds: ['source'],
    verification: 'Nitelikli erişim ve deneme sonucunu ölç.',
    decisionImpact: 'Teknik katkıyla birlikte tercih nedeni olabilir.',
  });
  assert.equal(evaluateCandidate(c, 'flow').action, 'build');
  c.facts.blockingFailure = {
    state: 'yes',
    reason: 'Kritik akış başarısız',
    evidenceIds: ['source'],
  };
  assert.equal(evaluateCandidate(c, 'flow').action, 'repair');
});
test('unknown çalışma kanıtı sıfır puana veya kesin geliştirme kabulüne dönüşmez', () => {
  const r = evaluateCandidate(sample(), 'flow');
  assert.equal(r.action, 'verify');
  assert.ok(r.ruleIds.includes('ECA-02'));
  assert.ok(!r.traces.find((t) => t.id === 'ECA-06')?.triggered);
});
test('gözlenen kritik hata geliştirme ve büyütmeden önce gelir', () => {
  const c = sample();
  c.evidence[0].kind = 'runtime';
  c.facts.blockingFailure = {
    state: 'yes',
    reason: 'Kritik akış başarısız',
    evidenceIds: ['source'],
  };
  assert.equal(evaluateCandidate(c, 'flow').action, 'repair');
});
test('çelişki sessiz başarıya dönüşmez', () => {
  const c = sample();
  c.facts.runtime = {
    state: 'conflict',
    reason: 'Sonuçlar çelişiyor',
    evidenceIds: ['source'],
  };
  assert.equal(evaluateCandidate(c, 'flow').action, 'verify');
});
test('aynı öncelikte farklı eylemler açık çatışma üretir', () => {
  const trace = {
    id: 'r1',
    title: 'Örnek',
    state: 'met' as const,
    triggered: true,
    priority: 10,
    action: 'build' as const,
    reason: 'Kaynak',
    evidenceIds: ['source'],
  };
  const r = resolveTraces([trace, { ...trace, id: 'r2', action: 'defer' }]);
  assert.equal(r.action, 'conflict');
  assert.equal(r.conflicts.length, 2);
});
test('kaynak bağı olmayan kesin koşul ve bağımlılık döngüsü reddedilir', () => {
  const a = sample();
  a.facts.runtime.state = 'yes';
  assert.equal(
    strategySchema.safeParse({
      version: '2.1',
      date: '2026-10-10',
      objective: 'Altyapı',
      ownershipBasis: 'Kullanıcı',
      exclusions: ['TÜRSAB'],
      candidates: [a],
    }).success,
    false,
  );
  const b = sample();
  b.id = 'other';
  a.facts.runtime.state = 'unknown';
  a.dependencies = [
    {
      candidateId: 'other',
      title: 'B',
      state: 'observed',
      reason: 'Bağımlı',
      evidenceIds: ['source'],
    },
  ];
  b.dependencies = [
    {
      candidateId: 'example',
      title: 'A',
      state: 'observed',
      reason: 'Bağımlı',
      evidenceIds: ['source'],
    },
  ];
  assert.equal(
    strategySchema.safeParse({
      version: '2.1',
      date: '2026-10-10',
      objective: 'Altyapı',
      ownershipBasis: 'Kullanıcı',
      exclusions: ['TÜRSAB'],
      candidates: [a, b],
    }).success,
    false,
  );
});

test('kanıtlı kabul yeni dilime genişlemeyi önerir; dar dilim geniş vizyona göre bekletilmez', () => {
  const c = sample();
  c.facts.runtime = {
    state: 'yes',
    reason: 'Çalıştırıldı',
    evidenceIds: ['source'],
  };
  c.facts.bounded = {
    state: 'yes',
    reason: 'Dar akış',
    evidenceIds: ['source'],
  };
  c.facts.scopeLarge = {
    state: 'yes',
    reason: 'Geniş vizyon',
    evidenceIds: ['source'],
  };
  assert.equal(
    evaluateCandidate(c, 'flow').traces.find((t) => t.id === 'ECA-05')
      ?.triggered,
    false,
  );
  c.facts.accepted = {
    state: 'yes',
    reason: 'İşlev ve hata kabulü',
    evidenceIds: ['source'],
  };
  assert.equal(evaluateCandidate(c, 'flow').action, 'expand');
});
test('kaynak veya analist çıkarımı çalıştırma kabulünün yerine geçmez', () => {
  const c = sample();
  c.facts.runtime = {
    state: 'yes',
    reason: 'Doküman ready diyor',
    evidenceIds: ['source'],
  };
  const data = {
    version: '2.1',
    date: '2026-10-10',
    objective: 'Altyapı',
    ownershipBasis: 'Kullanıcı',
    exclusions: ['TÜRSAB'],
    candidates: [c],
  };
  assert.equal(strategySchema.safeParse(data).success, false);
  c.evidence[0].kind = 'runtime';
  assert.equal(strategySchema.safeParse(data).success, true);
});
