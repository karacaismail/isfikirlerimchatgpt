import { z } from 'zod';

export const groupIds = ['G', 'V', 'O', 'U'] as const;
export type GroupId = (typeof groupIds)[number];
export const groupNames: Record<GroupId, string> = {
  G: 'Gelir potansiyeli',
  V: 'Ürün içi yayılma',
  O: 'Reklamsız edinim',
  U: 'Uygulama ve işletme uygunluğu',
};
const s = z.string().min(1);
const publicURL = z
  .url()
  .refine(
    (value) => value.startsWith('https://'),
    'Dış kaynak HTTPS kullanmalı',
  );
export const criterionSchema = z
  .object({
    id: s,
    score: z.number().int().min(0).max(5).nullable(),
    rationale: s,
    evidence: z.array(s),
    basis: z.enum(['çıkarım', 'varsayım', 'ölçüm', 'belirsiz']),
    change: s,
  })
  .strict();
const experimentSchema = z
  .object({
    hypothesis: s,
    action: s,
    metric: s,
    threshold: s,
    failure: s,
    effort: s,
  })
  .strict();
const sourceSchema = z
  .object({
    id: s,
    title: s,
    kind: z.enum(['dosya', 'dış kaynak', 'çıkarım', 'kullanıcı beyanı']),
    locator: s,
    claim: s,
    url: publicURL.optional(),
    accessed: s,
    limitation: s,
  })
  .strict();
export const projectSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: s,
    aliases: z.array(s),
    ownership: z.literal('bana ait'),
    kind: s,
    definition: s,
    originalVision: s,
    observed: s,
    proposedDirection: s,
    customer: s,
    user: s,
    payer: s,
    problem: s,
    value: s,
    workflow: z.array(s),
    alternatives: z.array(s),
    monetization: z.array(s),
    commercialOptions: z.array(s),
    platforms: z
      .object({
        current: z.array(s),
        target: z.array(s),
        proposed: z.array(s),
        deferred: z.array(s),
        operation: s,
        relationship: s,
        structure: s,
      })
      .strict(),
    maturity: z
      .object({ product: s, commercial: s, enterprise: s, scale: s })
      .strict(),
    features: z.array(
      z.object({ name: s, status: s, evidence: z.array(s) }).strict(),
    ),
    scores: z
      .object({
        G: z.array(criterionSchema),
        V: z.array(criterionSchema),
        O: z.array(criterionSchema),
        U: z.array(criterionSchema),
      })
      .strict(),
    risks: z.array(s),
    blockers: z.array(s),
    mmp: z.array(s),
    notNeeded: z.array(s),
    decision: s,
    decisionRationale: s,
    changeEvidence: s,
    distribution: s,
    viralLoop: s,
    experiments: z.array(experimentSchema).length(3),
    finance: z
      .object({ status: s, assumptions: z.array(s), conditions: s })
      .strict(),
    confidence: z
      .object({ source: s, runtime: s, market: s, revenue: s })
      .strict(),
    competitors: z.array(
      z
        .object({
          name: s,
          customer: s,
          solution: s,
          price: s,
          free: s,
          strength: s,
          gap: s,
          switching: s,
          url: publicURL,
          accessed: s,
          limitation: s,
        })
        .strict(),
    ),
    sources: z.array(sourceSchema).min(1),
    contradictions: z.array(s),
    relationships: z.array(s),
    reviewDate: s,
    provisional: z.boolean(),
    publishability: z.literal('arındırılmış özet'),
  })
  .strict();
export type Project = z.infer<typeof projectSchema>;
export type Criterion = z.infer<typeof criterionSchema>;
export const coverageSchema = z
  .object({
    date: s,
    inventoryFiles: z.number().int().nonnegative(),
    inventoryBytes: z.number().nonnegative(),
    originalFiles: z.number().int().nonnegative(),
    uniqueOriginalHashes: z.number().int().nonnegative(),
    reviewedFull: z.number().int().nonnegative(),
    reviewedPartial: z.number().int().nonnegative(),
    reviewedLines: z.number().int().nonnegative(),
    originalLines: z.number().int().nonnegative().nullable(),
    linkedReviewed: z.number().int().nonnegative(),
    protectedFiles: z.number().int().nonnegative(),
    pendingFiles: z.number().int().nonnegative(),
    runtimeProjects: z.number().int().nonnegative(),
    localIdeas: z.number().int().nonnegative(),
    personalFound: z.number().int().nonnegative(),
    ownership: z
      .object({
        personal: z.number(),
        employer: z.number(),
        friend: z.number(),
        uncertain: z.number(),
      })
      .strict(),
    inventoryComplete: z.boolean(),
    contentComplete: z.boolean(),
    limitations: z.array(s),
  })
  .strict();
export const datasetSchema = z
  .object({
    version: z.literal('1.1'),
    date: s,
    projects: z.array(projectSchema),
    coverage: coverageSchema,
    reviewUpdate: z
      .object({
        capturedAt: s,
        fullTextFiles: z.number().int().nonnegative(),
        partialTextFiles: z.number().int().nonnegative(),
        textLines: z.number().int().nonnegative(),
        documentTextFiles: z.number().int().nonnegative(),
        formulaCells: z.number().int().nonnegative(),
        changedInputCases: z.number().int().nonnegative(),
        contentComplete: z.literal(false),
      })
      .strict(),
  })
  .strict()
  .superRefine((data, ctx) => {
    const ids = data.projects.map((p) => p.id);
    if (new Set(ids).size !== ids.length)
      ctx.addIssue({
        code: 'custom',
        message: 'Proje kimlikleri benzersiz olmalı',
      });
    for (const p of data.projects) {
      const sources = new Set(p.sources.map((e) => e.id));
      if (sources.size !== p.sources.length)
        ctx.addIssue({
          code: 'custom',
          message: `${p.id}: kanıt kimliği yineleniyor`,
        });
      for (const g of groupIds) {
        const expected = criteria[g].map((c) => c.id);
        if (
          p.scores[g].length !== expected.length ||
          p.scores[g].some((c, i) => c.id !== expected[i])
        )
          ctx.addIssue({
            code: 'custom',
            message: `${p.id}: ${g} ölçüt sözleşmesi`,
          });
        for (const c of p.scores[g]) {
          if (c.score !== null && c.evidence.length === 0)
            ctx.addIssue({
              code: 'custom',
              message: `${p.id}: puanın kanıtı eksik`,
            });
          for (const id of c.evidence)
            if (!sources.has(id))
              ctx.addIssue({
                code: 'custom',
                message: `${p.id}: bulunamayan kanıt ${id}`,
              });
        }
      }
      for (const f of p.features)
        for (const id of f.evidence)
          if (!sources.has(id))
            ctx.addIssue({
              code: 'custom',
              message: `${p.id}: özellik kanıtı eksik ${id}`,
            });
    }
  });

type Definition = {
  id: string;
  title: string;
  weight: number;
  anchors: string[];
};
const make = (
  id: string,
  title: string,
  weight: number,
  anchors: string[],
): Definition => ({ id, title, weight, anchors });
export const criteria: Record<GroupId, Definition[]> = {
  G: [
    make('problem', 'Sorunun ekonomik karşılığı', 20, [
      'Kayıp yok',
      'Seyrek rahatsızlık',
      'Manuel emek var',
      'Düzenli iş kaybı hipotezi',
      'Ölçülmüş belirgin kayıp',
      'Kritik, ölçülmüş ve bütçelenmiş kayıp',
    ]),
    make('payer', 'Ödeme yapan ve bütçe', 15, [
      'Alıcı yok',
      'Alıcı belirsiz',
      'Rol tahmini',
      'Dar alıcı tanımlı',
      'Bütçe sahibiyle görüşüldü',
      'Bütçe ve satın alma yolu doğrulandı',
    ]),
    make('willingness', 'Ödeme isteği ve fiyat', 15, [
      'Ödeme reddi',
      'İlgi zayıf',
      'Rakip fiyatı dayanak',
      'Fiyat görüşmesi olumlu',
      'Ücretli pilot',
      'Tekrarlayan ödeme',
    ]),
    make('margin', 'Satışın ekonomik katkısı', 15, [
      'Katkı negatif',
      'Maliyet baskın',
      'Marj zayıf',
      'Modelde pozitif',
      'Gerçekte pozitif',
      'Destek dahil sürdürülebilir katkı',
    ]),
    make('speed', 'İlk altı ayda satış koşulları', 15, [
      'Kritik engel',
      'Uzun altyapı işi',
      'Birçok bağımlılık',
      'Dar kapsam yönetilebilir',
      'Pilot adayı ve hazır akış',
      'Satış kanalı ve teslim doğrulandı',
    ]),
    make('repeat', 'Tekrar gelir', 10, [
      'Tek seferlik ihtiyaç',
      'Nadiren kullanım',
      'Dönemsel ihtiyaç',
      'Düzenli kullanım hipotezi',
      'Tekrar kullanım ölçüldü',
      'Yenileme geliri ölçüldü',
    ]),
    make('difference', 'Satın alma gerekçesi', 10, [
      'Fark yok',
      'Genel vaat',
      'Dar fark hipotezi',
      'Somut iş avantajı',
      'Müşteri tercih etti',
      'Tekrarlanan tercih ve kalıcı avantaj',
    ]),
  ],
  V: [
    make('invite', 'Doğal davet', 25, [
      'Davet gerekmiyor',
      'İsteğe bağlı davet',
      'Nadir ortak işlem',
      'Akışta düzenli davet',
      'Etkin davet ölçüldü',
      'Tekrarlanan kullanıcı kazanımı ölçüldü',
    ]),
    make('output', 'Paylaşılabilir çıktı', 20, [
      'Çıktı paylaşılmaz',
      'Düşük dış değer',
      'Özel rapor',
      'Alıcıya yararlı çıktı',
      'Paylaşım ölçüldü',
      'Paylaşım etkin kullanıcı üretti',
    ]),
    make('recipient', 'Alıcının bağımsız değeri', 20, [
      'Alıcıya değer yok',
      'Yalnız merak',
      'Okuma yararı',
      'Kendi işini çözer',
      'İlk değer ölçüldü',
      'Tekrar değer ve kullanım ölçüldü',
    ]),
    make('activation', 'İlk değere geçiş', 15, [
      'Geçiş yok',
      'Ağır kurulum',
      'Birçok kayıt adımı',
      'Basit ilk akış',
      'Dönüşüm ölçüldü',
      'Hızlı dönüşüm tekrarlandı',
    ]),
    make('frequency', 'Yayılma sıklığı', 10, [
      'Tekrar tetik yok',
      'Yıllık',
      'Seyrek',
      'Haftalık hipotez',
      'Haftalık ölçüm',
      'Sık ve kalıcı ölçüm',
    ]),
    make('seed', 'Küçük grupla başlama', 5, [
      'Büyük ağ şart',
      'Yoğun ağ gerekir',
      'Niş kitle gerekir',
      'Küçük ekip yeterli',
      'Küçük pilot çalıştı',
      'Birden fazla küçük grupta çalıştı',
    ]),
    make('privacy', 'Paylaşım engelleri', 5, [
      'Yasal/hak engeli',
      'Çok hassas',
      'Önemli gizlilik yükü',
      'İzinli paylaşım tasarımı',
      'Onaylı akış denendi',
      'Güvenli yayılma doğrulandı',
    ]),
  ],
  O: [
    make('search', 'Arama niyeti', 25, [
      'Talep gözlenmedi',
      'Çok genel arama',
      'Dar sorgu hipotezi',
      'Niyetli sorgu tanımlı',
      'Nitelikli trafik ölçüldü',
      'Trafikten satış ölçüldü',
    ]),
    make('community', 'Niş topluluk erişimi', 20, [
      'Kanal yok',
      'Genel topluluk',
      'Uygun niş var',
      'Ulaşma planı somut',
      'Nitelikli görüşme geldi',
      'Satış tekrarlanıyor',
    ]),
    make('ecosystem', 'Ekosistemde keşif', 15, [
      'Ekosistem yok',
      'Uyumsuz',
      'Entegrasyon planı',
      'İlgili katalog var',
      'Listeden kullanıcı geldi',
      'Listeden satış ölçüldü',
    ]),
    make('content', 'İçerik ve ücretsiz araç', 15, [
      'İçerik yolu yok',
      'Genel yazı',
      'Dar yararlı içerik',
      'İşe yarayan araç planı',
      'Nitelikli talep ölçüldü',
      'Düzenli satış ölçüldü',
    ]),
    make('partners', 'Ortaklık dağıtımı', 15, [
      'Ortak yolu yok',
      'Varsayılan ortak',
      'İlgili roller var',
      'Somut ortak teklifi',
      'Ortak pilot var',
      'Ortaklardan gelir ölçüldü',
    ]),
    make('access', 'Kurucunun erişim avantajı', 10, [
      'Erişim yok',
      'Zayıf erişim',
      'Sınırlı ilişki',
      'Doğrulanmış ilgili erişim',
      'Aktif kanal',
      'Sürekli müşteri üreten kanal',
    ]),
  ],
  U: [
    make('scope', 'Kalan satılabilir iş', 25, [
      'Gerçekleşemez',
      'Çok geniş',
      'Çok eksik',
      'Daraltılabilir',
      'Uçtan uca pilot hazır',
      'Teslim ve destek doğrulandı',
    ]),
    make('assets', 'Kullanılabilir varlıklar', 20, [
      'Kullanım hakkı yok',
      'Yalnız not',
      'İskelet kod',
      'Anlamlı kod var',
      'Akış yerelde testli',
      'Tekrarlanan gerçek kullanım',
    ]),
    make('dependencies', 'Teknik bağımlılıklar', 15, [
      'Çözümsüz',
      'Kritik bilinmeyen',
      'Çok dış bağımlılık',
      'Yönetilebilir plan',
      'Entegrasyon testli',
      'Hata ve geri dönüş testli',
    ]),
    make('operations', 'İşletim ve destek', 15, [
      'Sürdürülemez',
      'Ağır elle iş',
      'Yük belirsiz',
      'Dar destek kapsamı',
      'Pilot yükü ölçüldü',
      'Sürdürülebilir yük ölçüldü',
    ]),
    make('resources', 'Kaynak ve maliyet', 15, [
      'Karşılanamaz',
      'Büyük açık',
      'Belirsiz bütçe',
      'Sınırlı bütçe modeli',
      'Kaynak tahsis edildi',
      'Gerçek maliyet karşılanıyor',
    ]),
    make('rights', 'Veri, hak ve güvenlik', 10, [
      'Hak engeli',
      'Kritik açık',
      'Önemli doğrulama eksiği',
      'Kapsam ve plan var',
      'Temel kontroller testli',
      'Ürün bağlamı doğrulanmış',
    ]),
  ],
};

export function scoreGroup(group: GroupId, values: Criterion[]) {
  let lower = 0,
    unknown = 0;
  for (const def of criteria[group]) {
    const value = values.find((v) => v.id === def.id)?.score ?? null;
    if (value === null) unknown += def.weight;
    else lower += (def.weight * value) / 5;
  }
  return {
    lower: Math.round(lower * 10) / 10,
    upper: Math.round((lower + unknown) * 10) / 10,
    unknown,
    complete: unknown === 0,
  };
}
export function scoreLabel(group: GroupId, values: Criterion[]) {
  const x = scoreGroup(group, values);
  return x.complete
    ? `${x.lower}/100`
    : `${x.lower}–${x.upper}/100 · %${x.unknown} ağırlık bilinmiyor`;
}
export const defaultProfiles = {
  fast: { G: 45, V: 0, O: 30, U: 25 },
  spread: { G: 30, V: 35, O: 20, U: 15 },
};
export function profileScore(
  project: Pick<Project, 'scores'>,
  weights: Record<GroupId, number>,
) {
  if (
    groupIds.some(
      (g) => !Number.isFinite(weights[g]) || weights[g] < 0 || weights[g] > 100,
    ) ||
    Math.abs(groupIds.reduce((a, g) => a + weights[g], 0) - 100) > 0.0001
  )
    return null;
  let total = 0;
  for (const group of groupIds) {
    if (weights[group] === 0) continue;
    const score = scoreGroup(group, project.scores[group]);
    if (!score.complete) return null;
    total += (score.lower * weights[group]) / 100;
  }
  return Math.round(total * 10) / 10;
}
export function searchText(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replaceAll('ı', 'i');
}
export function financeScenario(input: {
  leads: number;
  meetingRate: number;
  paidRate: number;
  price: number;
  churn: number;
  variableCost: number;
  feeRate: number;
  fixedCost: number;
  previousCustomers: number;
  setupPrice: number;
}) {
  const keys = [
    'leads',
    'meetingRate',
    'paidRate',
    'price',
    'churn',
    'variableCost',
    'feeRate',
    'fixedCost',
    'previousCustomers',
    'setupPrice',
  ] as const;
  if (
    !input ||
    keys.some((k) => !Number.isFinite(input[k]) || input[k] < 0) ||
    [input.meetingRate, input.paidRate, input.churn, input.feeRate].some(
      (v) => v > 1,
    )
  )
    return null;
  const newCustomers = input.leads * input.meetingRate * input.paidRate;
  const activeCustomers =
    input.previousCustomers * (1 - input.churn) + newCustomers;
  const subscription = activeCustomers * input.price;
  const setup = newCustomers * input.setupPrice;
  const revenue = subscription + setup;
  const contribution =
    revenue * (1 - input.feeRate) - activeCustomers * input.variableCost;
  return {
    newCustomers,
    activeCustomers,
    subscription,
    setup,
    revenue,
    contribution,
    operatingResult: contribution - input.fixedCost,
  };
}
