import { z } from 'zod';

export const goalIds = ['flow', 'core', 'reliability', 'discovery'] as const;
export type GoalId = (typeof goalIds)[number];
export const goalLabels: Record<GoalId, string> = {
  flow: 'Çalışan ürün akışı',
  core: 'Ortak altyapı',
  reliability: 'Doğruluk ve güvenilirlik',
  discovery: 'Teknik belirsizliği azaltma',
};
export const criterionIds = [
  'goal',
  'baseline',
  'slice',
  'uncertainty',
  'blocker',
  'dependency',
  'reuse',
  'correctness',
  'safety',
  'operability',
  'maintenance',
  'option',
  'opportunity',
  'reversibility',
] as const;
export type CriterionId = (typeof criterionIds)[number];
export const factIds = [
  'runtime',
  'bounded',
  'blockingFailure',
  'scopeLarge',
  'sharedContract',
  'speculativeCore',
  'roleBoundary',
  'externalEffect',
  'accepted',
  'invalidated',
  'conflictingEvidence',
] as const;
export type FactId = (typeof factIds)[number];
const text = z.string().min(1);
const referenceIds = z.array(text);
export const factSchema = z
  .object({
    state: z.enum(['yes', 'no', 'unknown', 'conflict']),
    evidenceIds: referenceIds,
    reason: text,
  })
  .strict();
export type Fact = z.infer<typeof factSchema>;
const referenceSchema = z
  .object({
    id: text,
    label: text,
    kind: z.enum(['source', 'user', 'analysis', 'runtime']),
    claim: text,
    limitation: text,
  })
  .strict();
const assessmentSchema = z
  .object({
    criterion: z.enum(criterionIds),
    state: z.enum(['observed', 'inferred', 'unknown', 'contradictory']),
    finding: text,
    evidenceIds: referenceIds,
    verification: text,
    decisionImpact: text,
  })
  .strict();
const dependencySchema = z
  .object({
    candidateId: text.nullable(),
    title: text,
    state: z.enum(['observed', 'inferred', 'unknown']),
    reason: text,
    evidenceIds: referenceIds,
  })
  .strict();
export const candidateSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: text,
    aliases: z.array(text),
    kind: z.enum(['product', 'platform', 'umbrella', 'research']),
    ownership: z.literal('user'),
    coverage: z.enum(['detailed', 'initial', 'missing']),
    definition: text,
    observed: text,
    goals: z.array(z.enum(goalIds)).min(1),
    capabilities: z.array(text).min(1),
    slice: z
      .object({
        title: text,
        outcome: text,
        acceptance: z.array(text).min(1),
        steps: z.array(text).min(1),
      })
      .strict(),
    rationale: text,
    counterargument: text,
    reconsiderWhen: text,
    effort: z
      .object({ status: z.literal('not_estimated'), reason: text })
      .strict(),
    assessments: z.array(assessmentSchema),
    dependencies: z.array(dependencySchema),
    facts: z.record(z.enum(factIds), factSchema),
    evidence: z.array(referenceSchema).min(1),
  })
  .strict();
export type Candidate = z.infer<typeof candidateSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export const strategySchema = z
  .object({
    version: z.literal('2.0'),
    date: text,
    objective: text,
    ownershipBasis: text,
    exclusions: z.array(text),
    candidates: z.array(candidateSchema).min(1),
  })
  .strict()
  .superRefine((data, ctx) => {
    const ids = new Set(data.candidates.map((c) => c.id));
    if (ids.size !== data.candidates.length)
      ctx.addIssue({
        code: 'custom',
        message: 'Aday kimlikleri benzersiz olmalı',
      });
    for (const c of data.candidates) {
      const refs = new Set(c.evidence.map((e) => e.id));
      if (refs.size !== c.evidence.length)
        ctx.addIssue({ code: 'custom', message: `${c.id}: yinelenen kanıt` });
      if (
        new Set(c.assessments.map((a) => a.criterion)).size !==
        c.assessments.length
      )
        ctx.addIssue({ code: 'custom', message: `${c.id}: yinelenen ölçüt` });
      for (const entry of [
        ...c.assessments,
        ...c.dependencies,
        ...Object.values(c.facts),
      ])
        for (const id of entry.evidenceIds)
          if (!refs.has(id))
            ctx.addIssue({
              code: 'custom',
              message: `${c.id}: bulunamayan kanıt ${id}`,
            });
      for (const fact of Object.values(c.facts))
        if (
          (fact.state === 'yes' ||
            fact.state === 'no' ||
            fact.state === 'conflict') &&
          !fact.evidenceIds.length
        )
          ctx.addIssue({
            code: 'custom',
            message: `${c.id}: koşulun dayanağı eksik`,
          });
      const runtimeReferences = new Set(
        c.evidence.filter((e) => e.kind === 'runtime').map((e) => e.id),
      );
      for (const key of ['runtime', 'accepted', 'blockingFailure'] as const) {
        const fact = c.facts[key];
        if (
          (fact.state === 'yes' || fact.state === 'no') &&
          !fact.evidenceIds.some((id) => runtimeReferences.has(id))
        )
          ctx.addIssue({
            code: 'custom',
            message: `${c.id}: ${key} için çalıştırma kanıtı gerekli`,
          });
      }
      if (c.facts.accepted.state === 'yes' && c.facts.runtime.state !== 'yes')
        ctx.addIssue({
          code: 'custom',
          message: `${c.id}: kabul için çalışan başlangıç gerekli`,
        });
      for (const d of c.dependencies)
        if (d.candidateId && !ids.has(d.candidateId))
          ctx.addIssue({
            code: 'custom',
            message: `${c.id}: bağımlılık adayı yok`,
          });
    }
    const visited = new Set<string>();
    const active = new Set<string>();
    const walk = (id: string): boolean => {
      if (active.has(id)) return true;
      if (visited.has(id)) return false;
      active.add(id);
      const c = data.candidates.find((x) => x.id === id);
      for (const d of c?.dependencies || [])
        if (d.candidateId && d.state === 'observed' && walk(d.candidateId))
          return true;
      active.delete(id);
      visited.add(id);
      return false;
    };
    if (data.candidates.some((c) => walk(c.id)))
      ctx.addIssue({
        code: 'custom',
        message: 'Gözlenen bağımlılıklarda döngü var',
      });
  });
export type Strategy = z.infer<typeof strategySchema>;

export const kindLabels = {
  product: 'Ürün',
  platform: 'Altyapı',
  umbrella: 'Çatı / ürün ailesi',
  research: 'Araştırma / araç adayı',
};
export const coverageLabels = {
  detailed: 'Ayrıntılı kaynak incelemesi',
  initial: 'İlk kaynak değerlendirmesi',
  missing: 'Kaynak eşleşmesi eksik',
};
export const factLabels = {
  yes: 'Koşul destekleniyor',
  no: 'Koşul desteklenmiyor',
  unknown: 'Bilinmiyor',
  conflict: 'Çelişkili',
};
export const assessmentLabels = {
  observed: 'Kaynakta gözlenen',
  inferred: 'Stratejik çıkarım',
  unknown: 'Bilinmiyor',
  contradictory: 'Çelişkili',
};
export const strategicCriteria: {
  id: CriterionId;
  title: string;
  question: string;
  evidence: string;
}[] = [
  {
    id: 'goal',
    title: 'Hedefe katkı',
    question:
      'Bu çalışma seçtiğin yazılım hedefinde hangi davranışı tamamlayacak?',
    evidence: 'Açık hedef, kullanıcı sonucu ve alternatiflerle karşılaştırma.',
  },
  {
    id: 'baseline',
    title: 'Çalışan başlangıç',
    question: 'Bugünkü sürüm temiz ortamda kurulup kritik akışı tamamlıyor mu?',
    evidence: 'Commit, ortam, komut, sonuç ve tekrar üretilebilir başlangıç.',
  },
  {
    id: 'slice',
    title: 'Tamamlanabilir dilim',
    question:
      'Girdi, kalıcı sonuç ve hata davranışı tek bir akışta sınırlandırılabiliyor mu?',
    evidence: 'Uçtan uca senaryo, kapsam dışı işler ve kabul kontrolleri.',
  },
  {
    id: 'uncertainty',
    title: 'Karar verdiren bilgi',
    question: 'Bu çalışmanın sonucu hangi önemli kararı değiştirecek?',
    evidence: 'Varsayım, onu yanlışlayacak deney ve sonuç sonrası karar.',
  },
  {
    id: 'blocker',
    title: 'Teknik engel',
    question:
      'Hangi doğrulanmış hata seçilen akışı veya başka tüketicileri durduruyor?',
    evidence:
      'Tekrarlanabilir başarısızlık ve etkilenen akışlar; yalnız TODO sayısı değil.',
  },
  {
    id: 'dependency',
    title: 'Bağımlılık yükü',
    question:
      'Bu dilim hangi dış sistemlere veya tamamlanmamış parçalara bağlı?',
    evidence:
      'Zorunlu ve isteğe bağlı bağlar, erişim ve bağımsız çalışma yolu.',
  },
  {
    id: 'reuse',
    title: 'Gerçek yeniden kullanım',
    question: 'Aynı sözleşmeyi hangi somut ürün akışları kullanacak?',
    evidence:
      'İsimlendirilmiş tüketici, ortak sözleşme ve tüketici uyumluluk testi.',
  },
  {
    id: 'correctness',
    title: 'Alan doğruluğu',
    question:
      'Yanlış hesap, geçersiz durum veya veri kaybı nasıl fark edilecek?',
    evidence: 'Referans örnekler, invariantlar, olumsuz ve sınır durumları.',
  },
  {
    id: 'safety',
    title: 'Değişiklik güvenliği',
    question:
      'Rol, tenant, veri ve sürüm değişikliğinin etkisi nasıl denetlenecek?',
    evidence:
      'İzin/ret testleri, veri bütünlüğü, migration ve geri dönüş kanıtı.',
  },
  {
    id: 'operability',
    title: 'İşletilebilirlik',
    question: 'Hata anlaşılır, izlenebilir ve kurtarılabilir mi?',
    evidence:
      'Hata kaydı, timeout, tekrar deneme, idempotency ve geri yükleme senaryosu.',
  },
  {
    id: 'maintenance',
    title: 'Sürekli bakım maliyeti',
    question: 'Kurulum ve ortak sürüm değişiklikleri ne kadar ek iş getiriyor?',
    evidence: 'Gözlenen bakım işi ve süre; tahminse dayanağı ve aralığı.',
  },
  {
    id: 'option',
    title: 'Sonraki projelere katkı',
    question: 'Bu dilim sonraki hangi somut akışları kolaylaştıracak?',
    evidence: 'İsimlendirilmiş sonraki dilim ve engeli kaldırma bağı.',
  },
  {
    id: 'opportunity',
    title: 'Alternatif maliyet',
    question: 'Aynı emekle başka adayda hangi sonuç tamamlanabilir?',
    evidence:
      'Aynı büyüklükte dilimlerin kalan işi, belirsizliği ve hedef katkısı.',
  },
  {
    id: 'reversibility',
    title: 'Geri dönüşlülük',
    question: 'Varsayım yanlışsa bu karar ne kadar kod, veri ve zaman bağlar?',
    evidence: 'Değiştirilebilir sınır, çıkış yolu ve geri alma denemesi.',
  },
];
export function assessmentFor(
  candidate: Candidate,
  criterion: CriterionId,
): Assessment {
  const found = candidate.assessments.find((a) => a.criterion === criterion);
  if (found) return found;
  const definition = strategicCriteria.find((c) => c.id === criterion)!;
  return {
    criterion,
    state: 'unknown',
    finding: 'Bu ölçüt için karşılaştırılabilir kanıt henüz kaydedilmedi.',
    evidenceIds: [],
    verification: definition.evidence,
    decisionImpact:
      'Eksik bilgi puana çevrilmez. Bu ölçüt kararı değiştirecekse ilgili teknik deneyi önce planla.',
  };
}
export type Action =
  | 'verify'
  | 'repair'
  | 'build'
  | 'narrow'
  | 'share'
  | 'expand'
  | 'defer'
  | 'record'
  | 'conflict';
export const actionLabels: Record<Action, string> = {
  verify: 'Önce teknik kanıt üret',
  repair: 'Kritik engeli gider',
  build: 'Tanımlı dilimi geliştir',
  narrow: 'Kapsamı daralt',
  share: 'Tüketiciyle ortaklaştır',
  expand: 'Sonraki akışa genişlet',
  defer: 'Dilimi yeniden değerlendir',
  record: 'Karar kaydını koru',
  conflict: 'Kural çatışmasını çöz',
};
export type RuleTrace = {
  id: string;
  title: string;
  state: 'met' | 'not_met' | 'unknown' | 'conflict';
  triggered: boolean;
  priority: number;
  action: Action;
  reason: string;
  evidenceIds: string[];
};
type RuleDefinition = {
  id: string;
  title: string;
  event: string;
  condition: string;
  action: string;
  rationale: string;
  counterargument: string;
  reconsiderWhen: string;
  priority: number;
  result: Action;
  check: (
    c: Candidate,
    g: GoalId,
  ) => Omit<RuleTrace, 'id' | 'title' | 'triggered' | 'priority' | 'action'>;
};
const stateFor = (f: Fact, expected: 'yes' | 'no' = 'yes') =>
  ({
    state:
      f.state === 'unknown'
        ? 'unknown'
        : f.state === 'conflict'
          ? 'conflict'
          : f.state === expected
            ? 'met'
            : 'not_met',
    reason: f.reason,
    evidenceIds: f.evidenceIds,
  }) as const;
const yes = (c: Candidate, key: FactId) => stateFor(c.facts[key]);
const fixed = (state: 'met' | 'not_met', reason: string) => ({
  state,
  reason,
  evidenceIds: [],
});
const conjunction = (
  a: ReturnType<typeof stateFor>,
  b: ReturnType<typeof stateFor>,
) =>
  ({
    state:
      a.state === 'conflict' || b.state === 'conflict'
        ? 'conflict'
        : a.state === 'not_met' || b.state === 'not_met'
          ? 'not_met'
          : a.state === 'unknown' || b.state === 'unknown'
            ? 'unknown'
            : 'met',
    reason: `${a.reason} ${b.reason}`,
    evidenceIds: [...new Set([...a.evidenceIds, ...b.evidenceIds])],
  }) as ReturnType<typeof stateFor>;
export const strategicRules: RuleDefinition[] = [
  {
    id: 'ECA-01',
    title: 'Amacı koru',
    event: 'Geliştirme karşılaştırması açıldı',
    condition: 'Amaç yazılım altyapısına yatırım',
    action: 'Satış ve tahsilatı teknik önceliğin belirleyicisi yapma.',
    rationale: 'Ölçüt, kullanıcının kararına hizmet etmeli.',
    counterargument:
      'Ticari bilgi daha sonra ayrı bir hedef olarak ele alınabilir.',
    reconsiderWhen: 'Kullanıcı geliştirme hedefini değiştirirse.',
    priority: 0,
    result: 'record',
    check: () =>
      fixed('met', 'Bu sürüm yazılım geliştirme yatırımını değerlendirir.'),
  },
  {
    id: 'ECA-02',
    title: 'Başlangıcı doğrula',
    event: 'Bir geliştirme dilimi ele alındı',
    condition: 'Tekrarlanabilir çalışma kanıtı yok veya bilinmiyor',
    action: 'Temiz kurulum ve mevcut kritik akışın sonucunu kaydet.',
    rationale:
      'Kaynak kod çalıştırma sonucu değildir; ilk iş kanıt üreten teknik çalışma olabilir.',
    counterargument:
      'Bütün ürünü kabul ettirmek gerekmez; seçilen dilimin başlangıcı yeterlidir.',
    reconsiderWhen:
      'Commit ve ortamına bağlı tekrar üretilebilir başlangıç sonucu geldiğinde.',
    priority: 70,
    result: 'verify',
    check: (c) =>
      c.facts.runtime.state === 'yes'
        ? fixed('not_met', 'Başlangıç kanıtı kayıtlı.')
        : c.facts.runtime.state === 'conflict'
          ? {
              ...yes(c, 'runtime'),
              state: 'met',
              reason:
                'Çalışma kanıtları çelişiyor; başlangıç yeniden doğrulanmalı.',
            }
          : {
              ...yes(c, 'runtime'),
              state: 'met',
              reason: c.facts.runtime.reason,
            },
  },
  {
    id: 'ECA-03',
    title: 'Engeli önce gider',
    event: 'Kritik akış başarısızlığı kaydedildi',
    condition: 'Başarısızlık seçilen veya bağımlı akışı durduruyor',
    action: 'Dar hata düzeltmesini yeni özellikten önce ele al.',
    rationale: 'Çalışmayan zorunlu yol ek özelliklerle telafi edilemez.',
    counterargument:
      'Statik risk veya TODO, çalıştırılmış başarısızlık olarak gösterilmez.',
    reconsiderWhen: 'Başarısız senaryo ve regresyonu geçtiğinde.',
    priority: 100,
    result: 'repair',
    check: (c) => yes(c, 'blockingFailure'),
  },
  {
    id: 'ECA-04',
    title: 'Ürün dilimini tamamla',
    event: 'Yeni geliştirme kapsamı önerildi',
    condition: 'Dar akış tanımlı ve çalışan başlangıç doğrulanmış',
    action: 'Girdiden kalıcı sonuca ve hata davranışına kadar dilimi geliştir.',
    rationale:
      'Geniş modül listesi yerine ölçülebilir ürün davranışı tamamlanır.',
    counterargument:
      'Dar dilim ortak altyapının gerekli parçasını da içerebilir.',
    reconsiderWhen: 'Kabul davranışı veya zorunlu bağımlılık değiştiğinde.',
    priority: 20,
    result: 'build',
    check: (c) => conjunction(yes(c, 'bounded'), yes(c, 'runtime')),
  },
  {
    id: 'ECA-05',
    title: 'Kapsamı küçült',
    event: 'Dilim bağımlılıklarla büyüdü',
    condition: 'Sonuç çok sayıda tamamlanmamış modüle bağlı',
    action: 'Kullanıcı sonucunu koruyarak kapsamı daralt.',
    rationale: 'Önce bütün platformu bitirme şartı ilk sonucu geciktirebilir.',
    counterargument:
      'Gerçek zorunlu bağımlılık yalnız küçültmek için kaldırılmaz.',
    reconsiderWhen: 'Bağımsız kabul edilebilir akış tanımlandığında.',
    priority: 60,
    result: 'narrow',
    check: (c) =>
      c.facts.bounded.state === 'yes'
        ? fixed(
            'not_met',
            'Önerilen dilim zaten dar kapsamlı; geniş proje vizyonu bu dilimin zorunlu kapsamı değil.',
          )
        : yes(c, 'scopeLarge'),
  },
  {
    id: 'ECA-06',
    title: 'Tüketiciyle ortaklaştır',
    event: 'Ortak altyapı yatırımı önerildi',
    condition:
      'Somut tüketiciler aynı sözleşmeyi kullanıyor ve başlangıç doğrulanmış',
    action: 'Ortak kabiliyeti tüketici uyumluluk testiyle çıkar.',
    rationale:
      'Teknoloji benzerliği tek başına yeniden kullanım kanıtı değildir.',
    counterargument:
      'Gerekli tek tüketicili altyapı ürün dilimi içinde geliştirilebilir.',
    reconsiderWhen:
      'İkinci tüketici farklı sınırlar veya bakım yükü gösterdiğinde.',
    priority: 30,
    result: 'share',
    check: (c) => conjunction(yes(c, 'sharedContract'), yes(c, 'runtime')),
  },
  {
    id: 'ECA-07',
    title: 'Gereksiz genellemeyi durdur',
    event: 'Çekirdek kapsamı büyüdü',
    condition: 'Henüz tüketmeyen ürünlere göre genel motor tasarlanıyor',
    action: 'Genel motoru büyütmeden somut ürün dilimini tamamla.',
    rationale: 'Gelecek ürün iddiası bugünün bağımlılığı yapılmamalı.',
    counterargument: 'Kanıtlı tüketicinin gereken sözleşmesi ertelenmez.',
    reconsiderWhen: 'Gerçek tüketici ve ortak sözleşme kanıtlandığında.',
    priority: 65,
    result: 'narrow',
    check: (c, g) =>
      g === 'core'
        ? yes(c, 'speculativeCore')
        : fixed('not_met', 'Ortak çekirdek hedefi seçilmedi.'),
  },
  {
    id: 'ECA-08',
    title: 'Rol ve veri sınırını doğrula',
    event: 'Yetki veya veri sınırı geliştirme kapsamına alındı',
    condition:
      'Akış ayrı roller/tenantlar kullanıyor; dilim henüz kabul edilmemiş',
    action:
      'İzinli ve izinsiz erişim, ayrım ve veri bütünlüğünü kabul kapsamına al.',
    rationale: 'Güvenilirlik açığı başka ölçütlerin yüksek olmasıyla kapanmaz.',
    counterargument: 'Ürünün kullanmadığı tenant yapısı zorunlu kılınmaz.',
    reconsiderWhen:
      'Seçilen sınırın olumlu ve olumsuz testleri kabul edildiğinde.',
    priority: 75,
    result: 'verify',
    check: (c) =>
      c.facts.accepted.state === 'yes'
        ? fixed('not_met', 'Dilim kabul kanıtı kayıtlı.')
        : yes(c, 'roleBoundary'),
  },
  {
    id: 'ECA-09',
    title: 'Dış işlemin hatasını sına',
    event: 'Dış sisteme işlem yapan akış seçildi',
    condition:
      'Yeniden deneme çift yan etki üretebilir; dilim henüz kabul edilmemiş',
    action: 'Ret, timeout, tekrar deneme ve idempotency sözleşmesini doğrula.',
    rationale: 'Bir success bayrağı dış sistemin sonucunu ispatlamaz.',
    counterargument: 'Salt okunur işlem için çift yazma şartı uydurulmaz.',
    reconsiderWhen:
      'Gerçek adapterın hata ve yeniden işleme senaryoları kabul edildiğinde.',
    priority: 75,
    result: 'verify',
    check: (c) =>
      c.facts.accepted.state === 'yes'
        ? fixed('not_met', 'Dilim kabul kanıtı kayıtlı.')
        : yes(c, 'externalEffect'),
  },
  {
    id: 'ECA-10',
    title: 'Çelişkiyi görünür tut',
    event: 'Kaynaklar veya sonuçlar karşılaştırıldı',
    condition: 'Karar verdiren kanıtlar çelişkili',
    action: 'Çelişkiyi çözen en küçük teknik doğrulamayı önce yap.',
    rationale: 'Bilinmeyen sıfıra, çelişki sessiz başarıya çevrilmez.',
    counterargument: 'Kararı etkilemeyen bilgi bütün geliştirmeyi bekletmez.',
    reconsiderWhen: 'Çelişkili iddialar aynı sürüm ve senaryoda sınandığında.',
    priority: 90,
    result: 'verify',
    check: (c) => {
      const entries = Object.values(c.facts).filter(
        (f) => f.state === 'conflict',
      );
      return entries.length
        ? {
            state: 'met',
            reason: entries.map((f) => f.reason).join(' '),
            evidenceIds: [...new Set(entries.flatMap((f) => f.evidenceIds))],
          }
        : yes(c, 'conflictingEvidence');
    },
  },
  {
    id: 'ECA-11',
    title: 'Kanıtla genişlet',
    event: 'Seçilen dilimin kabul sonucu kaydedildi',
    condition: 'İşlev ve hata davranışı kabul kanıtına sahip',
    action: 'Sonraki somut akışa veya tüketiciye genişlet.',
    rationale: 'Büyüme kararı tamamlanan davranışın üstüne kurulur.',
    counterargument: 'Bir dilimin kabulü bütün ürünün üretim kabulü değildir.',
    reconsiderWhen: 'Yeni akış farklı risk veya sözleşme getirirse.',
    priority: 40,
    result: 'expand',
    check: (c) => yes(c, 'accepted'),
  },
  {
    id: 'ECA-12',
    title: 'Varsayımı yeniden değerlendir',
    event: 'Dilim inceleme noktasına geldi',
    condition: 'Temel varsayım yanlışlandı veya bakım yükü faydayı aştı',
    action:
      'Dilimi yeniden tasarla ya da beklet; bütün projeyi değersiz sayma.',
    rationale: 'Geçmiş emek sonraki yatırımı tek başına haklı çıkarmaz.',
    counterargument: 'Ölçülmemiş maliyet yüksekmiş gibi kabul edilmez.',
    reconsiderWhen:
      'Yeni hedef, daha dar kapsam veya farklı bağımlılık kanıtı geldiğinde.',
    priority: 95,
    result: 'defer',
    check: (c) => yes(c, 'invalidated'),
  },
  {
    id: 'ECA-13',
    title: 'Yeni kanıtla yeniden karar ver',
    event: 'Karar görünümü yeni veriyle açıldı',
    condition: 'Hedef, bağımlılık, efor veya çalışma kanıtı değişebilir',
    action: 'Kural izini sürüm ve hedefle yeniden üret.',
    rationale: 'Karar sabit proje sırası değil, kanıta bağlı öneridir.',
    counterargument: 'Bu statik rehber kaynak projeleri otomatik izlemiyor.',
    reconsiderWhen: 'Veri sürümü güncellendiğinde veya hedef değiştiğinde.',
    priority: 0,
    result: 'record',
    check: () =>
      fixed(
        'met',
        'Kurallar mevcut veri ve seçilen hedefle değerlendirilir; canlı izleme yapılmaz.',
      ),
  },
  {
    id: 'ECA-14',
    title: 'İşaret ile kabulü ayır',
    event: 'Kontrol listesi kullanıldı',
    condition: 'Kişisel işaret ürün testinin sonucu değildir',
    action: 'Kişisel ilerlemeyi ayrı tut; kabul için çalışma kanıtı kaydet.',
    rationale: 'Checkbox tıklamak runtime veya kalite kabulü üretmez.',
    counterargument:
      'Kontrol listesi günlük çalışmayı takip etmek için kullanılabilir.',
    reconsiderWhen: 'Gerçek kabul kanıtı veri sürümüne işlendiğinde.',
    priority: 0,
    result: 'record',
    check: () =>
      fixed('met', 'Tarayıcıdaki işaretler hiçbir kural koşulunu değiştirmez.'),
  },
];
export function resolveTraces(traces: RuleTrace[]) {
  const triggered = traces
    .filter((t) => t.triggered && t.priority > 0)
    .sort((a, b) => b.priority - a.priority);
  const winners = triggered.filter(
    (t) => t.priority === triggered[0]?.priority,
  );
  const conflicts =
    new Set(winners.map((t) => t.action)).size > 1
      ? winners.map((t) => t.id)
      : [];
  const action: Action = conflicts.length
    ? 'conflict'
    : winners[0]?.action || 'verify';
  return {
    action,
    label: actionLabels[action],
    ruleIds: winners.map((t) => t.id),
    conflicts,
    traces,
  };
}
export function evaluateCandidate(candidate: Candidate, goal: GoalId) {
  return resolveTraces(
    strategicRules.map((rule) => {
      const condition = rule.check(candidate, goal);
      return {
        id: rule.id,
        title: rule.title,
        ...condition,
        triggered: condition.state === 'met',
        priority: rule.priority,
        action: rule.result,
      };
    }),
  );
}

export function runtimeLabel(c: Candidate) {
  return {
    yes: 'Çalışan başlangıç kanıtı kayıtlı; bu bütün ürünün kabulü değildir.',
    no: 'Başlangıç çalıştırması başarısız; çalışma kanıtını incele.',
    unknown: 'Bu kayıtta çalıştırma sonucu yok (not_run).',
    conflict:
      'Çalıştırma kanıtları çelişkili; sürüm ve senaryo eşliği çözülmeli.',
  }[c.facts.runtime.state];
}
export function acceptanceLabel(c: Candidate) {
  return {
    yes: 'Bu dilimin kabul kanıtı kayıtlı.',
    no: 'Bu dilim kabul koşullarını karşılamadı.',
    unknown:
      'Kabul koşulları öneridir; geçtiklerine dair çalışma kanıtı kayıtlı değil.',
    conflict: 'Bu dilimin kabul sonuçları çelişkili.',
  }[c.facts.accepted.state];
}
