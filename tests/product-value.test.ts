import test from 'node:test';
import assert from 'node:assert/strict';
import { productCases } from '../src/data/product-cases.ts';
import {
  commercialDecision,
  productCaseSchema,
  businessSentence,
} from '../src/lib/product-value.ts';
import { development } from '../src/data/development.ts';

test('teknik GenUI dilimi ayrı ödeme gerekçesi olmadan satış önerisi olmaz', () => {
  const c = productCases.find((c) => c.id === 'genui')!;
  assert.equal(c.offer.buyReason, null);
  assert.notEqual(commercialDecision(c).action, 'test');
  assert.equal(commercialDecision(c).recommended, false);
});
test('bilinmeyen alıcı ve AI ile yapılabilirlik olumlu ticari kanıta dönüşmez', () => {
  const c = structuredClone(productCases.find((c) => c.id === 'pim')!);
  c.position = 'product';
  c.facts.buyer = null;
  c.buyer.payer = null;
  assert.equal(commercialDecision(c).recommended, false);
  assert.equal(businessSentence(c), null);
  c.facts.buyer = true;
  c.buyer.payer = 'İşletme';
  c.facts.switching = false;
  assert.equal(commercialDecision(c).action, 'narrow');
});
test('kurulamayan iş cümlesi eksiksiz alanlardan satış önerisi üretmez', () => {
  const c = structuredClone(productCases.find((c) => c.id === 'pim')!);
  c.businessThesis = null;
  const result = commercialDecision(c);
  assert.equal(businessSentence(c), null);
  assert.equal(result.action, 'clarify');
  assert.equal(result.determiningRule, 'T-ECA-01');
  assert.equal(result.recommended, false);
  assert.equal(
    result.traces.find((t) => t.id === 'T-ECA-08')?.state,
    'not_met',
  );
});
test('erişim, tekrar ve ekonomi belirsizliği saklanmaz; ödeme şartı üretilmez', () => {
  const c = structuredClone(productCases.find((c) => c.id === 'pim')!);
  c.facts.buyer = true;
  c.facts.problem = true;
  c.facts.switching = true;
  c.facts.channel = null;
  c.facts.economics = null;
  c.buyer.user = 'Katalog sorumlusu';
  c.buyer.payer = 'Mağaza';
  c.problem.workflow = 'Katalog güncelleme';
  c.offer.outcome = 'Hatalı güncellemeyi azaltma';
  c.offer.buyReason = 'Tekrarlanan düzeltmeyi azaltma hipotezi';
  const result = commercialDecision(c);
  assert.equal(result.action, 'test');
  assert.equal(result.recommended, true);
  assert.ok(
    result.traces.some((t) => t.id === 'T-ECA-05' && t.state === 'met'),
  );
  c.facts.economics = false;
  assert.equal(commercialDecision(c).action, 'defer');
});
test('bütün kayıtların ayrı ticari değerlendirmesi, geçerli kaynak bağı ve aynı özeti vardır', () => {
  assert.equal(productCases.length, 23);
  assert.equal(new Set(productCases.map((c) => c.id)).size, 23);
  for (const c of productCases) {
    productCaseSchema.parse(c);
    const candidate = development.candidates.find((d) => d.id === c.id)!;
    assert.ok(candidate);
    c.evidenceIds.forEach((id) =>
      assert.ok(
        candidate.evidence.some((e) => e.id === id),
        `${c.id}: ${id}`,
      ),
    );
    assert.deepEqual(candidate.commercial, commercialDecision(c).summary);
    const organic = candidate.assessments.find(
      (a) => a.criterion === 'organicSales',
    )!;
    assert.notEqual(organic.verification, c.experiments[2].action, c.id);
    assert.ok(organic.verification.includes(c.distribution.steps[0]), c.id);
    assert.equal(c.experiments.length, 3);
    assert.ok(c.growth?.reason);
    if (commercialDecision(c).recommended) assert.ok(businessSentence(c));
    assert.ok(c.experiments.every((e) => e.effort?.status === 'not_estimated'));
    if (c.distribution.access !== 'observed')
      assert.notEqual(c.facts.channel, true, c.id);
    assert.ok(c.alternatives.length > 0);
  }
});
test('kamuya açık vaka sözleşmesi bilinmeyeni null tutar, fazladan alanı reddeder', () => {
  const c = productCases.find((c) => c.id === 'genui')!;
  assert.equal(productCaseSchema.parse(c).offer.buyReason, null);
  assert.equal(
    productCaseSchema.safeParse({ ...c, customer_email: 'private' }).success,
    false,
  );
});

test('ticari ECA izleri bilinen eksiklik ve olumsuzluğu ayrı tutar', () => {
  const c = structuredClone(productCases.find((c) => c.id === 'genui')!);
  c.facts.economics = false;
  c.facts.problem = false;
  let result = commercialDecision(c);
  assert.equal(result.action, 'merge');
  assert.equal(result.determiningRule, 'T-ECA-03');
  assert.equal(
    result.traces.find((t) => t.id === 'T-ECA-07')?.state,
    'not_met',
  );
  assert.equal(result.traces.find((t) => t.id === 'T-ECA-05')?.state, 'met');
  c.facts.recurrence = false;
  c.facts.economics = true;
  result = commercialDecision(c);
  assert.equal(
    result.traces.find((t) => t.id === 'T-ECA-06')?.state,
    'not_met',
  );
});

test('hazır yönetilen uzman alternatifine karşı ayrı farkı olmayan pazaryeri önerilmez', () => {
  const c = productCases.find((c) => c.id === 'great-doers')!;
  assert.equal(c.offer.buyReason, null);
  assert.equal(c.facts.switching, null);
  assert.equal(commercialDecision(c).recommended, false);
  assert.ok(
    c.experiments[0].pass.includes('en iyi hazır yönetilen alternatif'),
  );
});
