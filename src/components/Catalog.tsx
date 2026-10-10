import { useEffect, useRef, useState } from 'react';
import {
  Button,
  MantineProvider,
  Modal,
  Select,
  TextInput,
} from '@mantine/core';
import { theme } from './Proof';
import { scrollTableWithKeyboard } from '../lib/table-scroll';
import {
  defaultProfiles,
  groupIds,
  groupNames,
  profileScore,
  scoreGroup,
  scoreLabel,
  searchText,
  type GroupId,
  type Project,
} from '../lib/model';

type Props = { projects: Project[]; base: string; mode: 'catalog' | 'compare' };
const storageKey = 'isfikirlerim-tercihler-v1';
type Preferences = {
  query: string;
  stage: string | null;
  platform: string | null;
  income: string | null;
  decision: string | null;
  ownership: string | null;
  sort: string;
  selected: string[];
  weights: Record<GroupId, number>;
};
const defaults: Preferences = {
  query: '',
  stage: null,
  platform: null,
  income: null,
  decision: null,
  ownership: null,
  sort: 'name',
  selected: [],
  weights: { ...defaultProfiles.fast },
};
const unique = (values: string[]) =>
  [...new Set(values)].sort((a, b) => a.localeCompare(b, 'tr'));
function validWeights(value: unknown): value is Record<GroupId, number> {
  return (
    typeof value === 'object' &&
    value !== null &&
    groupIds.every(
      (k) =>
        typeof (value as Record<string, unknown>)[k] === 'number' &&
        Number.isFinite((value as Record<string, number>)[k]) &&
        (value as Record<string, number>)[k] >= 0 &&
        (value as Record<string, number>)[k] <= 100,
    )
  );
}
function readPreferences(projects: Project[]): Preferences {
  try {
    const raw = JSON.parse(
      localStorage.getItem(storageKey) || 'null',
    ) as unknown;
    if (!raw || typeof raw !== 'object') return defaults;
    const p = raw as Partial<Preferences>;
    const result = { ...defaults };
    if (typeof p.query === 'string') result.query = p.query.slice(0, 200);
    for (const key of [
      'stage',
      'platform',
      'income',
      'decision',
      'ownership',
    ] as const)
      if (typeof p[key] === 'string' && p[key].length < 150)
        result[key] = p[key];
    if (['name', ...groupIds, 'profile'].includes(p.sort || ''))
      result.sort = p.sort!;
    if (Array.isArray(p.selected))
      result.selected = unique(
        p.selected.filter(
          (id) => typeof id === 'string' && projects.some((x) => x.id === id),
        ),
      ).slice(0, 4);
    if (
      validWeights(p.weights) &&
      Object.values(p.weights).reduce((a, b) => a + b, 0) === 100
    )
      result.weights = p.weights;
    return result;
  } catch {
    return defaults;
  }
}
export default function Catalog({ projects, base, mode }: Props) {
  const [prefs, setPrefs] = useState<Preferences>(defaults);
  const [ready, setReady] = useState(false);
  const [table, setTable] = useState(false);
  const [weightsOpen, setWeightsOpen] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const weightsOpener = useRef<HTMLButtonElement>(null);
  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
    setPrefs((p) => ({ ...p, [key]: value }));
  useEffect(() => {
    setPrefs(readPreferences(projects));
    setReady(true);
  }, [projects]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(prefs));
    } catch {
      setStorageFailed(true);
    }
  }, [prefs, ready]);
  const filtered = projects.filter((p) => {
    const haystack = searchText(
      [p.name, ...p.aliases, p.definition, p.customer, p.problem].join(' '),
    );
    return (
      haystack.includes(searchText(prefs.query)) &&
      (!prefs.stage || p.maturity.product === prefs.stage) &&
      (!prefs.platform || p.platforms.proposed.includes(prefs.platform)) &&
      (!prefs.income || p.monetization.includes(prefs.income)) &&
      (!prefs.decision || p.decision === prefs.decision) &&
      (!prefs.ownership || p.ownership === prefs.ownership)
    );
  });
  const value = (p: Project) =>
    prefs.sort === 'profile'
      ? profileScore(p, prefs.weights)
      : groupIds.includes(prefs.sort as GroupId)
        ? scoreGroup(prefs.sort as GroupId, p.scores[prefs.sort as GroupId])
            .complete
          ? scoreGroup(prefs.sort as GroupId, p.scores[prefs.sort as GroupId])
              .lower
          : null
        : 0;
  const sorted = [...filtered].sort((a, b) => {
    const x = value(a),
      y = value(b);
    if (x === null && y !== null) return 1;
    if (y === null && x !== null) return -1;
    if (x !== null && y !== null && x !== y) return y - x;
    return a.name.localeCompare(b.name, 'tr');
  });
  const complete = sorted.filter((p) => value(p) !== null),
    incomplete = sorted.filter((p) => value(p) === null);
  const chosen = prefs.selected.flatMap((id) =>
    projects.filter((p) => p.id === id),
  );
  const sum = groupIds.reduce((a, g) => a + prefs.weights[g], 0);
  const selection = (p: Project) =>
    prefs.selected.includes(p.id)
      ? prefs.selected.filter((id) => id !== p.id)
      : [...prefs.selected, p.id];
  const fields = [
    ['İş tanımı', (p: Project) => p.definition],
    [
      'Müşteri ve ödeme yapan',
      (p: Project) => `${p.customer} Ödeme: ${p.payer}`,
    ],
    ['Ticari seçenek', (p: Project) => p.commercialOptions.join(' · ')],
    ['Mevcut durum', (p: Project) => p.observed],
    ['Önerilen ilk kapsam', (p: Project) => p.mmp.join(' · ')],
    [
      'Karar ve engeller',
      (p: Project) =>
        `${p.decision}: ${p.decisionRationale} ${p.blockers.join(' · ')}`,
    ],
    [
      'Doğrulama',
      (p: Project) =>
        `${p.confidence.source} Çalıştırma: ${p.confidence.runtime} Gelir: ${p.confidence.revenue}`,
    ],
  ] as const;
  function projectEntry(p: Project) {
    return (
      <article key={p.id} className="project-entry" data-project={p.id}>
        <p className="eyebrow">{p.maturity.product} · Geçici değerlendirme</p>
        <h3>
          <a href={`${base}projeler/${p.id}/`}>{p.name}</a>
        </h3>
        <p>{p.definition}</p>
        <p>
          <strong>Ödeme yapan:</strong> {p.payer}
        </p>
        <p>
          <strong>Karar:</strong> {p.decision}
        </p>
        <div className="score-list">
          {groupIds.map((g) => (
            <p key={g}>
              <strong>{groupNames[g]}:</strong> {scoreLabel(g, p.scores[g])}
            </p>
          ))}
        </div>
        <Button
          disabled={
            !ready || (!prefs.selected.includes(p.id) && chosen.length === 4)
          }
          aria-pressed={prefs.selected.includes(p.id)}
          onClick={() => update('selected', selection(p))}
        >
          {prefs.selected.includes(p.id)
            ? `${p.name}: seçimden çıkar`
            : `${p.name}: karşılaştırmaya ekle`}
        </Button>
      </article>
    );
  }
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <section aria-label="Etkileşimli proje kataloğu" data-ready={ready}>
        <noscript>
          <p className="notice">
            JavaScript kapalı. Aşağıdaki proje açıklamaları ve ayrıntı
            bağlantıları okunabilir; etkileşimli filtre ve karşılaştırma için
            modern tarayıcı gerekir.
          </p>
        </noscript>
        <div className="filters">
          <TextInput
            label="Proje veya problem ara"
            placeholder="Ad, diğer ad veya müşteri"
            value={prefs.query}
            disabled={!ready}
            onChange={(e) => update('query', e.currentTarget.value)}
            maxLength={200}
          />
          <Select
            label="Sahiplik"
            placeholder="Tüm yayımlanabilir kayıtlar"
            data={[{ value: 'bana ait', label: 'Bana ait' }]}
            value={prefs.ownership}
            onChange={(v) => update('ownership', v)}
            disabled={!ready}
            allowDeselect
          />
          <Select
            label="Ürün aşaması"
            placeholder="Tüm aşamalar"
            data={unique(projects.map((p) => p.maturity.product))}
            value={prefs.stage}
            onChange={(v) => update('stage', v)}
            disabled={!ready}
            allowDeselect
          />
          <Select
            label="Önerilen platform"
            placeholder="Tüm platformlar"
            data={unique(projects.flatMap((p) => p.platforms.proposed))}
            value={prefs.platform}
            onChange={(v) => update('platform', v)}
            disabled={!ready}
            allowDeselect
          />
          <Select
            label="Gelir modeli"
            placeholder="Tüm modeller"
            data={unique(projects.flatMap((p) => p.monetization))}
            value={prefs.income}
            onChange={(v) => update('income', v)}
            disabled={!ready}
            allowDeselect
          />
          <Select
            label="Önerilen karar"
            placeholder="Tüm kararlar"
            data={unique(projects.map((p) => p.decision))}
            value={prefs.decision}
            onChange={(v) => update('decision', v)}
            disabled={!ready}
            allowDeselect
          />
          <Select
            label="Sıralama"
            data={[
              { value: 'name', label: 'Ada göre' },
              ...groupIds.map((g) => ({ value: g, label: groupNames[g] })),
              { value: 'profile', label: 'Kişisel ağırlıklar' },
            ]}
            value={prefs.sort}
            onChange={(v) => update('sort', v || 'name')}
            disabled={!ready}
          />
        </div>
        <div className="actions">
          <Button
            onClick={() =>
              setPrefs((p) => ({
                ...defaults,
                selected: p.selected,
                weights: p.weights,
              }))
            }
            disabled={!ready}
          >
            Filtreleri temizle
          </Button>
          <Button
            ref={weightsOpener}
            onClick={() => setWeightsOpen(true)}
            disabled={!ready}
          >
            Ağırlıkları düzenle
          </Button>
          {mode === 'catalog' && (
            <Button onClick={() => setTable((t) => !t)} disabled={!ready}>
              {table ? 'Kart görünümü' : 'Tablo görünümü'}
            </Button>
          )}
          <a
            className="button-link"
            href={`${base}veri.json`}
            download="is-fikirlerim.json"
          >
            Kamuya açık veriyi indir
          </a>
        </div>
        <p className="meta">
          {storageFailed
            ? 'Tarayıcı saklama alanına erişilemedi; tercihler bu oturumda çalışır.'
            : 'Arama, filtreler, seçim ve ağırlıklar yalnız bu tarayıcıda saklanır.'}
        </p>
        <p role="status" aria-live="polite">
          {filtered.length} proje · {chosen.length}/4 karşılaştırma seçimi
        </p>
        {mode === 'catalog' && chosen.length > 0 && (
          <a className="button-link" href={`${base}karsilastir/`}>
            Seçilen projeleri karşılaştır
          </a>
        )}
        {mode === 'compare' && (
          <section aria-label="Seçilen projelerin karşılaştırması">
            <h2>Karşılaştırma</h2>
            <p>
              Her proje için önerilen ilk müşteri ve ticari seçenek
              karşılaştırılır. Farklı müşteri ekonomileri eşdeğer kabul edilmez.
            </p>
            {chosen.length < 2 ? (
              <p className="notice">
                Karşılaştırmak için aşağıdan en az iki proje seçin.
              </p>
            ) : (
              <>
                {fields.map(([label, render]) => (
                  <section className="comparison-criterion" key={label}>
                    <h3>{label}</h3>
                    <div className="comparison-cells">
                      {chosen.map((p) => (
                        <article className="comparison-cell" key={p.id}>
                          <h3>{p.name}</h3>
                          <p>{render(p)}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
                {groupIds.map((g) => (
                  <section className="comparison-criterion" key={g}>
                    <h3>{groupNames[g]}</h3>
                    <div className="comparison-cells">
                      {chosen.map((p) => (
                        <article className="comparison-cell" key={p.id}>
                          <h3>{p.name}</h3>
                          <p>{scoreLabel(g, p.scores[g])}</p>
                          <p>
                            {p.scores[g]
                              .filter((c) => c.score !== null)
                              .map((c) => c.rationale)
                              .join(' ') ||
                              'Ölçütleri değerlendirecek kanıt belirlenemedi.'}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </>
            )}
            <Button
              onClick={() => update('selected', [])}
              disabled={!ready || chosen.length === 0}
            >
              Karşılaştırma seçimini temizle
            </Button>
          </section>
        )}
        <section aria-label="Proje sonuçları">
          <h2>
            {mode === 'compare'
              ? 'Karşılaştırmaya proje seçin'
              : 'Proje sonuçları'}
          </h2>
          {sorted.length === 0 ? (
            <p className="notice">
              Bu arama ve filtrelerle eşleşen proje bulunamadı. Filtreleri
              temizleyerek yeniden başlayın.
            </p>
          ) : (
            <>
              {prefs.sort !== 'name' && (
                <p className="notice">
                  Yalnız tam ölçütlü kayıtlar puanla sıralanır. Eksik ölçütlü
                  projeler ayrı, alfabetik gösterilir. Puan aralıkları
                  istatistiksel güven aralığı değildir.
                </p>
              )}
              {table && mode === 'catalog' ? (
                <div
                  className="table-scroll"
                  tabIndex={0}
                  role="region"
                  aria-label="Proje karşılaştırma tablosu, yatay kaydırılabilir"
                  onKeyDown={scrollTableWithKeyboard}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Proje</th>
                        <th>Müşteri</th>
                        {groupIds.map((g) => (
                          <th key={g}>{groupNames[g]}</th>
                        ))}
                        <th>Karar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((p) => (
                        <tr key={p.id}>
                          <th scope="row">
                            <a href={`${base}projeler/${p.id}/`}>{p.name}</a>
                          </th>
                          <td>{p.customer}</td>
                          {groupIds.map((g) => (
                            <td key={g}>{scoreLabel(g, p.scores[g])}</td>
                          ))}
                          <td>{p.decision}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <div className="project-grid">
                    {complete.map(projectEntry)}
                  </div>
                  {incomplete.length > 0 && (
                    <>
                      <h3>Eksik ölçütlü projeler — kesin sıralama yok</h3>
                      <div className="project-grid">
                        {incomplete.map(projectEntry)}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </section>
        <Modal
          opened={weightsOpen}
          onClose={() => setWeightsOpen(false)}
          title="Karar ağırlıkları"
          withCloseButton={false}
          returnFocus={false}
          onExitTransitionEnd={() => weightsOpener.current?.focus()}
        >
          <p>
            Bunlar karar tercihleridir. Başarı olasılığı değildir. Toplam 100
            olmalıdır.
          </p>
          <div className="stack">
            {groupIds.map((g) => (
              <TextInput
                key={g}
                label={`${groupNames[g]} ağırlığı`}
                type="number"
                min={0}
                max={100}
                value={
                  Number.isFinite(prefs.weights[g]) ? prefs.weights[g] : ''
                }
                onChange={(e) =>
                  update('weights', {
                    ...prefs.weights,
                    [g]:
                      e.currentTarget.value === ''
                        ? NaN
                        : Number(e.currentTarget.value),
                  })
                }
              />
            ))}
          </div>
          <p role="status">
            Ağırlık toplamı: {Number.isFinite(sum) ? sum : 'belirlenemedi'} /
            100
          </p>
          {sum !== 100 && (
            <p role="alert">
              Geçerli toplam 100 olana kadar profil puanı hesaplanmaz.
            </p>
          )}
          <div className="actions">
            <Button
              onClick={() => update('weights', { ...defaultProfiles.fast })}
            >
              Hızlı gelir varsayılanı
            </Button>
            <Button
              onClick={() => update('weights', { ...defaultProfiles.spread })}
            >
              Yayılma varsayılanı
            </Button>
          </div>
          <p>
            {projects.some((p) => profileScore(p, prefs.weights) !== null)
              ? 'Eksik ölçütlü projeler profil sıralamasına alınmaz.'
              : 'Tam puanlı kayıt bulunmadığından sıralama hassasiyeti hesaplanamadı.'}
          </p>
          <Button
            onClick={() => {
              update('sort', 'profile');
              setWeightsOpen(false);
            }}
          >
            Ağırlıkları uygula ve kapat
          </Button>
        </Modal>
      </section>
    </MantineProvider>
  );
}
