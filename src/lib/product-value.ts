import { z } from 'zod';
const text = z.string().min(1);
const maybe = text.nullable();
export const positionLabels = {
  product: 'Bağımsız ürün hipotezi',
  feature: 'Ürün içi özellik',
  infrastructure: 'Altyapı',
  umbrella: 'Çatı',
  research: 'Araştırma',
} as const;
export const commercialLabels = {
  test: 'Değer önerisini sına',
  narrow: 'Satın alma nedenini daralt',
  internal: 'Tüketici ürünle değerlendir',
  merge: 'Ürünün içinde değerlendir',
  clarify: 'İş fikri henüz netleşmedi',
  split: 'Ürün seçeneklerini ayır',
  defer: 'Bu kapsamı beklet',
} as const;
export const productSummarySchema = z
  .object({
    position: z.enum([
      'product',
      'feature',
      'infrastructure',
      'umbrella',
      'research',
    ]),
    action: z.enum([
      'test',
      'narrow',
      'internal',
      'merge',
      'clarify',
      'split',
      'defer',
    ]),
    recommended: z.boolean(),
    buyer: text,
    value: text,
    reason: text,
    alternative: text,
    objection: text,
  })
  .strict();
export type ProductSummary = z.infer<typeof productSummarySchema>;
export const productCaseSchema = z
  .object({
    id: text,
    position: z.enum([
      'product',
      'feature',
      'infrastructure',
      'umbrella',
      'research',
    ]),
    buyer: z
      .object({
        user: maybe,
        decisionMaker: maybe,
        payer: maybe,
        firstSegment: maybe,
        excluded: text,
      })
      .strict(),
    problem: z
      .object({
        workflow: maybe,
        trigger: maybe,
        frequency: maybe,
        cost: maybe,
      })
      .strict(),
    offer: z
      .object({ outcome: maybe, buyReason: maybe, smallestScope: text })
      .strict(),
    alternatives: z
      .array(
        z
          .object({
            name: text,
            url: z.url().nullable(),
            claim: text,
            limitation: text,
          })
          .strict(),
      )
      .min(1),
    competition: z
      .object({
        copyable: text,
        advantage: maybe,
        missingAdvantage: text,
        counterargument: text,
      })
      .strict(),
    distribution: z
      .object({
        channel: maybe,
        access: z.enum(['unknown', 'hypothesis', 'observed']),
        firstOffer: maybe,
        steps: z.array(text).min(1),
        cost: text,
      })
      .strict(),
    economics: z
      .object({
        unit: maybe,
        recurrence: maybe,
        costs: z.array(text).min(1),
        risk: text,
      })
      .strict(),
    portfolio: z
      .object({ consumer: maybe, contribution: maybe, opportunityCost: text })
      .strict(),
    evidenceIds: z.array(text).min(1),
    sources: z.array(
      z
        .object({
          id: text,
          title: text,
          url: z.url(),
          accessed: z.iso.date(),
          claim: text,
          limitation: text,
        })
        .strict(),
    ),
    experiments: z
      .array(
        z
          .object({
            assumption: text,
            action: text,
            measure: text,
            pass: text,
            fail: text,
            effort: z
              .object({ status: z.literal('not_estimated'), basis: text })
              .strict()
              .optional(),
          })
          .strict(),
      )
      .length(3),
    facts: z
      .object({
        buyer: z.boolean().nullable(),
        problem: z.boolean().nullable(),
        switching: z.boolean().nullable(),
        differentiation: z.boolean().nullable(),
        channel: z.boolean().nullable(),
        recurrence: z.boolean().nullable(),
        economics: z.boolean().nullable(),
      })
      .strict(),
    growth: z.object({ loop: maybe, reason: text }).strict().optional(),
    businessThesis: maybe.optional(),
    conclusion: text,
  })
  .strict()
  .superRefine((c, ctx) => {
    if (c.distribution.access !== 'observed' && c.facts.channel === true)
      ctx.addIssue({
        code: 'custom',
        path: ['facts', 'channel'],
        message: 'Kanal hipotezi gözlenen erişim sayılmaz.',
      });
    if (c.facts.switching === true && !c.offer.buyReason)
      ctx.addIssue({
        code: 'custom',
        path: ['offer', 'buyReason'],
        message: 'Geçiş hipotezi ayrı satın alma nedeni gerektirir.',
      });
    if (new Set(c.sources.map((s) => s.id)).size !== c.sources.length)
      ctx.addIssue({
        code: 'custom',
        path: ['sources'],
        message: 'Kaynak kimlikleri tekil olmalı.',
      });
  });
export type ProductCase = z.infer<typeof productCaseSchema>;
export const commercialCriteria = [
  {
    id: 'buyer',
    group: 'G',
    title: 'Kullanıcı, karar verici ve ödeyen',
    question: 'İlk dar alıcı kim; bütçeyi ve geçiş kararını kim yönetiyor?',
  },
  {
    id: 'problem',
    group: 'G',
    title: 'Ekonomik sorun',
    question:
      'Hangi tetikleyici, ne sıklıkta zaman, hata veya para kaybı yaratıyor?',
  },
  {
    id: 'switching',
    group: 'G',
    title: 'Alternatife karşı satın alma nedeni',
    question:
      'Hazır ürün, elle iş veya hiçbir şey yapmamaya göre neden geçsin?',
  },
  {
    id: 'differentiation',
    group: 'G',
    title: 'Kolay kopyanın ötesinde avantaj',
    question:
      'AI ile özelliği kopyalamak kolayken eldeki hangi birikim farkı koruyor?',
  },
  {
    id: 'recurrence',
    group: 'G',
    title: 'Tekrar değer ve ücret birimi',
    question: 'İlk kurulumdan sonra neden kullanmaya ve ödemeye devam etsin?',
  },
  {
    id: 'economics',
    group: 'G',
    title: 'Birim katkı ve hizmet yükü',
    question:
      'Gelir; satış, veri, kurulum, AI, altyapı ve desteği karşılayabilir mi?',
  },
  {
    id: 'channel',
    group: 'O',
    title: 'Reklamsız erişim',
    question:
      'Hangi alıcıya, hangi niyet anında, hangi teklif ve emekle ulaşılacak?',
  },
  {
    id: 'viral',
    group: 'V',
    title: 'Kullanıcılar arası büyüme',
    question:
      'Kullanım başka bağımsız kullanıcıları doğal olarak getiriyor mu? Ücretli dönüşüm ayrıca değerlendirilir. Paylaşım düğmesi yeterli değil.',
  },
  {
    id: 'scope',
    group: 'U',
    title: 'İlk uçtan uca değer',
    question:
      'Tek özelliğin ötesinde hangi en küçük akış müşterinin işini bitiriyor?',
  },
  {
    id: 'portfolio',
    group: 'U',
    title: 'Portföy katkısı ve fırsat maliyeti',
    question:
      'Hangi somut ürüne katkı verir; bu yatırımla hangi diğer iş bekler?',
  },
] as const;
export const commercialRules = [
  {
    id: 'T-ECA-01',
    event: 'Bağımsız ürün öneriliyor',
    condition:
      'Somut kullanıcı, ödeyen, sorun ve sonuç hipotezini birleştiren iş cümlesi kurulamıyor',
    action: 'İş fikri henüz netleşmedi; eksik parçayı belirle.',
  },
  {
    id: 'T-ECA-02',
    event: 'Ayrı ürün satışı öneriliyor',
    condition:
      'Bağımsız üründe ayrı satın alma nedeni veya geçiş hipotezi gösterilemiyor',
    action: 'Daralt; genel AI özelliğini bağımsız ürün gerekçesi yapma.',
  },
  {
    id: 'T-ECA-03',
    event: 'Altyapı veya özellik yatırımı öneriliyor',
    condition: 'Çalışma bağımsız ürün yerine ürün içi kabiliyet',
    action: 'Özelliği tüketici ürünün değer ve bakım katkısıyla değerlendir.',
  },
  {
    id: 'T-ECA-04',
    event: 'Çatı veya araştırma satış adayı oluyor',
    condition: 'Birden fazla iş mantığı veya netleşmemiş ürün sınırı var',
    action: 'Çatıyı ayrı ürün sayma; alıcı ve değer seçeneklerini ayır.',
  },
  {
    id: 'T-ECA-05',
    event: 'Reklamsız erişim öneriliyor',
    condition: 'Alıcıya gerçek erişim henüz gözlenmedi',
    action:
      'Kanalı hipotez olarak tut; belirli teklifin erişim ve edinme emeğini sına.',
  },
  {
    id: 'T-ECA-06',
    event: 'Tekrar satış veya abonelik öneriliyor',
    condition: 'Tekrar ihtiyacı veya birim katkı bilinmiyor',
    action:
      'Ücret birimi ve sürekli hizmet maliyetini ölç; aboneliği varsayma.',
  },
  {
    id: 'T-ECA-07',
    event: 'Yeni yatırım kararı veriliyor',
    condition:
      'Bağımsız ürünün ekonomisi veya temel problemi hakkında olumsuz değerlendirme var',
    action:
      'Bu kapsamı beklet; dar alternatif kararın neden değişeceğini açıklasın.',
  },
  {
    id: 'T-ECA-08',
    event: 'Dar ürün hipotezi karşılaştırılıyor',
    condition:
      'İş cümlesi ve ayrı geçiş hipotezi kurulabiliyor; belirleyici olumsuz bulgu yok',
    action:
      'Değer önerisini alternatifle sına. Bu gerçekleşmiş talep veya satış kabulü değildir.',
  },
] as const;
export function businessSentence(c: ProductCase) {
  if (
    !c.buyer.user ||
    !c.buyer.payer ||
    !c.problem.workflow ||
    !c.offer.outcome ||
    !c.offer.buyReason
  )
    return null;
  return c.businessThesis || null;
}
export function commercialDecision(c: ProductCase) {
  const complete =
    !!c.buyer.user &&
    !!c.buyer.payer &&
    !!c.problem.workflow &&
    !!c.offer.outcome &&
    c.facts.buyer === true &&
    c.facts.problem === true &&
    !!businessSentence(c);
  const separateValue = !!c.offer.buyReason && c.facts.switching === true;
  const negative =
    c.position === 'product' &&
    (c.facts.economics === false || c.facts.problem === false);
  const testable =
    c.position === 'product' && complete && separateValue && !negative;
  const action: ProductSummary['action'] =
    c.position === 'umbrella'
      ? 'split'
      : c.position === 'infrastructure'
        ? 'internal'
        : c.position === 'feature'
          ? 'merge'
          : c.position === 'research'
            ? 'clarify'
            : negative
              ? 'defer'
              : !complete
                ? 'clarify'
                : !separateValue
                  ? 'narrow'
                  : 'test';
  const conditions: (boolean | null)[] = [
    c.position === 'product' && !complete,
    c.position === 'product' && !separateValue,
    ['infrastructure', 'feature'].includes(c.position),
    ['umbrella', 'research'].includes(c.position),
    c.distribution.access !== 'observed',
    c.facts.recurrence === null || c.facts.economics === null,
    negative,
    testable,
  ];
  const summary: ProductSummary = {
    position: c.position,
    action,
    recommended: action === 'test',
    buyer: c.buyer.firstSegment || 'Bağımsız ilk alıcı belirlenemedi.',
    value: c.offer.buyReason || 'Ayrı ödeme gerekçesi gösterilemedi.',
    reason: c.conclusion,
    alternative: c.alternatives[0].name,
    objection: c.competition.counterargument,
  };
  const determiningRule = {
    clarify: c.position === 'research' ? 'T-ECA-04' : 'T-ECA-01',
    narrow: 'T-ECA-02',
    internal: 'T-ECA-03',
    merge: 'T-ECA-03',
    split: 'T-ECA-04',
    defer: 'T-ECA-07',
    test: 'T-ECA-08',
  }[action];
  return {
    action,
    determiningRule,
    recommended: summary.recommended,
    summary,
    traces: commercialRules.map((r, i) => ({
      ...r,
      state:
        conditions[i] === null ? 'unknown' : conditions[i] ? 'met' : 'not_met',
    })),
  };
}
export function criterionFinding(
  c: ProductCase,
  id: (typeof commercialCriteria)[number]['id'],
) {
  const finding = {
    buyer:
      [c.buyer.firstSegment, c.buyer.user, c.buyer.decisionMaker, c.buyer.payer]
        .filter(Boolean)
        .join(' · ') || 'Belirlenemedi.',
    problem:
      [
        c.problem.workflow,
        c.problem.trigger,
        c.problem.frequency,
        c.problem.cost,
      ]
        .filter(Boolean)
        .join(' · ') || 'Belirlenemedi.',
    switching: c.offer.buyReason || 'Ayrı satın alma nedeni gösterilemedi.',
    differentiation:
      c.competition.advantage ||
      `Eldeki kalıcı avantaj gösterilemedi. ${c.competition.missingAdvantage}`,
    recurrence:
      [c.economics.recurrence, c.economics.unit].filter(Boolean).join(' · ') ||
      'Belirlenemedi.',
    economics: `${c.economics.costs.join(' · ')}. ${c.economics.risk}`,
    channel: `${c.distribution.channel || 'Gerçek erişim belirlenemedi.'} ${c.distribution.cost}`,
    viral:
      c.growth?.reason || 'Büyüme mekanizması değerlendirmesi kaydedilmedi.',
    scope: c.offer.smallestScope,
    portfolio: [
      c.portfolio.consumer,
      c.portfolio.contribution,
      c.portfolio.opportunityCost,
    ]
      .filter(Boolean)
      .join(' · '),
  }[id];
  const fact = id in c.facts ? c.facts[id as keyof ProductCase['facts']] : null;
  return {
    finding,
    state:
      id === 'scope'
        ? 'Kapsam önerisi; çalışma kabulü yok'
        : id === 'portfolio'
          ? c.portfolio.consumer
            ? 'Katkı hipotezi; ölçülmedi'
            : 'Somut tüketici belirlenmedi'
          : id === 'viral'
            ? c.growth?.loop
              ? 'Büyüme hipotezi; ölçülmedi'
              : 'Kullanıcı getiren döngü gösterilmedi'
            : fact === null
              ? 'Bilinmiyor'
              : fact
                ? 'Analist hipotezi'
                : 'Olumsuz değerlendirme',
  };
}
export const productValueSchema = z
  .object({
    version: z.literal('1.0'),
    date: z.iso.date(),
    basis: z.string().min(1),
    cases: z.array(productCaseSchema).min(1),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (new Set(data.cases.map((c) => c.id)).size !== data.cases.length)
      ctx.addIssue({
        code: 'custom',
        path: ['cases'],
        message: 'Ticari vaka kimlikleri tekil olmalı.',
      });
  });
export function validateProductBindings(
  cases: ProductCase[],
  candidates: {
    id: string;
    evidence: { id: string }[];
    commercial?: ProductSummary;
  }[],
) {
  if (
    cases.length !== candidates.length ||
    new Set(cases.map((c) => c.id)).size !== cases.length
  )
    throw new Error('Ticari vaka kapsamı adaylarla birebir eşleşmeli.');
  for (const c of cases) {
    const candidate = candidates.find((d) => d.id === c.id);
    if (!candidate) throw new Error(`Bilinmeyen aday: ${c.id}`);
    for (const id of c.evidenceIds)
      if (!candidate.evidence.some((e) => e.id === id))
        throw new Error(`${c.id}: bağlı kanıt bulunamadı: ${id}`);
    if (
      JSON.stringify(candidate.commercial) !==
      JSON.stringify(commercialDecision(c).summary)
    )
      throw new Error(`${c.id}: ticari özet vaka sonucuyla eşleşmiyor.`);
  }
}
