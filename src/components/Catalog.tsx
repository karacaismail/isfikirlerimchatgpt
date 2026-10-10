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
  createDefaultPreferences,
  filterKeys,
  filterOptions,
  filterProjects,
  preferencesFromUrl,
  queryStringForPreferences,
  resetFilters,
  sanitizePreferences,
  sortProjects,
  type CatalogPreferences,
  type FilterKey,
} from '../lib/catalog';
import {
  goalIds,
  goalLabels,
  kindLabels,
  coverageLabels,
  evaluateCandidate,
  strategicCriteria,
  assessmentFor,
  assessmentLabels,
  type Candidate,
  type GoalId,
  strategicRules,
  runtimeLabel,
} from '../lib/strategy';
type Props = {
  candidates: Candidate[];
  base: string;
  mode: 'catalog' | 'compare';
};
const storageKey = 'isfikirlerim-gelistirme-v2';
const filterLabels: Record<FilterKey, string> = {
  focus: 'Geliştirme odağı',
  kind: 'Kayıt türü',
  coverage: 'İnceleme derinliği',
  capability: 'Yazılım kabiliyeti',
  rule: 'Öncelikli ECA kuralı',
};
export default function Catalog({ candidates, base, mode }: Props) {
  const [prefs, setPrefs] = useState<CatalogPreferences>(
    createDefaultPreferences,
  );
  const [ready, setReady] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [table, setTable] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const [urlFailed, setUrlFailed] = useState(false);
  const initialized = useRef(false);
  const opener = useRef<HTMLButtonElement>(null);
  const update = <K extends keyof CatalogPreferences>(
    key: K,
    value: CatalogPreferences[K],
  ) => setPrefs((p) => sanitizePreferences({ ...p, [key]: value }, candidates));
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    let saved = createDefaultPreferences();
    try {
      saved = sanitizePreferences(
        JSON.parse(localStorage.getItem(storageKey) || 'null'),
        candidates,
      );
    } catch {
      setStorageFailed(true);
    }
    setPrefs(preferencesFromUrl(location.search, saved, candidates));
    setFiltersOpen(matchMedia('(min-width:48rem)').matches);
    setReady(true);
  }, [candidates]);
  useEffect(() => {
    if (!ready) return;
    const restore = () =>
      setPrefs((p) =>
        preferencesFromUrl(location.search, resetFilters(p), candidates),
      );
    addEventListener('popstate', restore);
    return () => removeEventListener('popstate', restore);
  }, [ready, candidates]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(prefs));
    } catch {
      setStorageFailed(true);
    }
    try {
      const search = queryStringForPreferences(location.search, prefs);
      if (search !== location.search)
        history.replaceState(
          history.state,
          '',
          `${location.pathname}${search}${location.hash}`,
        );
    } catch {
      setUrlFailed(true);
    }
  }, [prefs, ready]);
  const options = filterOptions(candidates, prefs.goal);
  const sorted = sortProjects(filterProjects(candidates, prefs), prefs);
  const active = filterKeys.filter((k) => prefs[k]);
  const hasFilters = !!(prefs.query || active.length);
  const chosen = prefs.selected.flatMap((id) =>
    candidates.filter((c) => c.id === id),
  );
  const label = (key: FilterKey, value: string) =>
    key === 'focus'
      ? goalLabels[value as GoalId]
      : key === 'kind'
        ? kindLabels[value as Candidate['kind']]
        : key === 'coverage'
          ? coverageLabels[value as Candidate['coverage']]
          : key === 'rule'
            ? `${value} · ${strategicRules.find((r) => r.id === value)?.title || value}`
            : value;
  const selection = (c: Candidate) =>
    prefs.selected.includes(c.id)
      ? prefs.selected.filter((id) => id !== c.id)
      : [...prefs.selected, c.id];
  const fields: [string, (c: Candidate) => string][] = [
    ['Geliştirilecek dilim', (c) => c.slice.title],
    ['Tamamlanacak sonuç', (c) => c.slice.outcome],
    [
      'ECA önerisi',
      (c) =>
        `${evaluateCandidate(c, prefs.goal).label} (${evaluateCandidate(c, prefs.goal).ruleIds.join(', ')})`,
    ],
    ['Neden şimdi?', (c) => c.rationale],
    ['Karşı görüş', (c) => c.counterargument],
    ['Kabul koşulları', (c) => c.slice.acceptance.join(' · ')],
    [
      'Bağımlılıklar',
      (c) =>
        c.dependencies
          .map(
            (d) =>
              `${d.title} (${d.state === 'observed' ? 'kaynakta' : d.state === 'inferred' ? 'öneri' : 'bilinmiyor'}): ${d.reason}`,
          )
          .join(' · ') || 'Karşılaştırılabilir bağımlılık kaydı yok.',
    ],
    ['Önceliği değiştirecek bilgi', (c) => c.reconsiderWhen],
    ...strategicCriteria.map(
      (criterion) =>
        [
          criterion.title,
          (c: Candidate) => {
            const a = assessmentFor(c, criterion.id);
            return `${assessmentLabels[a.state]}: ${a.finding} Kanıt: ${a.evidenceIds.join(', ') || 'yok'}. Doğrulama: ${a.verification}`;
          },
        ] as [string, (c: Candidate) => string],
    ),
  ];
  const entry = (c: Candidate) => {
    const result = evaluateCandidate(c, prefs.goal);
    return (
      <article key={c.id} className="project-entry" data-project={c.id}>
        <div className="project-tags">
          <span className="project-tag">{kindLabels[c.kind]}</span>
          <span className="project-tag">{coverageLabels[c.coverage]}</span>
        </div>
        <h3>
          <a href={`${base}projeler/${c.id}/`}>{c.name}</a>
        </h3>
        <p className="project-summary">{c.definition}</p>
        <dl className="project-facts">
          <div>
            <dt>Geliştirilecek dilim</dt>
            <dd>{c.slice.title}</dd>
          </div>
          <div>
            <dt>Neden şimdi?</dt>
            <dd>{c.rationale}</dd>
          </div>
        </dl>
        <p className="project-next-step">
          <strong>{result.label}:</strong> {c.slice.steps[0]}{' '}
          <span className="meta">{result.ruleIds.join(', ')}</span>
        </p>
        <div className="actions">
          <a className="button-link" href={`${base}projeler/${c.id}/`}>
            Adım adım incele
          </a>
          <Button
            variant="light"
            disabled={
              !ready || (!prefs.selected.includes(c.id) && chosen.length === 4)
            }
            aria-pressed={prefs.selected.includes(c.id)}
            onClick={() => update('selected', selection(c))}
          >
            {c.name}:{' '}
            {prefs.selected.includes(c.id)
              ? 'seçimden çıkar'
              : 'karşılaştırmaya ekle'}
          </Button>
        </div>
        <details className="score-disclosure">
          <summary>Kararın gerekçesi ve karşı görüş</summary>
          <p>
            <strong>Karşı görüş:</strong> {c.counterargument}
          </p>
          <p>
            <strong>Karar ne zaman değişir?</strong> {c.reconsiderWhen}
          </p>
          <p>Kaynakta: {c.observed}</p>
          <p>{runtimeLabel(c)} Efor: tahmin edilmedi.</p>
          <a href={`${base}projeler/${c.id}/#kurallar`}>ECA kural izini aç</a>
        </details>
      </article>
    );
  };
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <section
        className="catalog-layout"
        aria-label="Etkileşimli proje kataloğu"
        data-ready={ready}
      >
        <noscript>
          <p className="notice">
            JavaScript kapalı. Proje açıklamaları ve ayrıntı bağlantıları
            okunabilir; filtre ve karşılaştırma için JavaScript gerekir.
          </p>
        </noscript>
        <div className="catalog-toolbar">
          <TextInput
            className="catalog-search"
            label="Proje veya problem ara"
            placeholder="Ör. ürün modeli, izin, entegrasyon"
            value={prefs.query}
            disabled={!ready}
            onChange={(e) => update('query', e.currentTarget.value)}
            maxLength={200}
          />
          <details
            className="filter-disclosure"
            open={filtersOpen}
            onToggle={(e) => setFiltersOpen(e.currentTarget.open)}
          >
            <summary>
              Filtreler{active.length ? ` (${active.length} etkin)` : ''}
            </summary>
            <div className="filters">
              <Select
                label="Karar hedefim"
                data={goalIds.map((value) => ({
                  value,
                  label: goalLabels[value],
                }))}
                value={prefs.goal}
                onChange={(v) => update('goal', (v || 'flow') as GoalId)}
                disabled={!ready}
              />
              <Select
                label="Sıralama"
                data={[
                  { value: 'name', label: 'Ada göre' },
                  {
                    value: 'fit',
                    label: 'Seçilen hedefle ilişkili olanlar önce',
                  },
                  { value: 'coverage', label: 'Ayrıntılı incelenenler önce' },
                ]}
                value={prefs.sort}
                onChange={(v) => update('sort', v || 'name')}
                disabled={!ready}
              />
            </div>
            <fieldset className="cluster-chips">
              <legend>Geliştirme odağı</legend>
              <Button
                variant="default"
                className="filter-chip"
                aria-pressed={!prefs.focus}
                disabled={!ready}
                onClick={() => update('focus', null)}
              >
                Tüm odaklar
              </Button>
              {goalIds.map((id) => (
                <Button
                  key={id}
                  variant="default"
                  className="filter-chip"
                  aria-pressed={prefs.focus === id}
                  disabled={!ready}
                  onClick={() =>
                    update('focus', prefs.focus === id ? null : id)
                  }
                >
                  {goalLabels[id]} (
                  {filterProjects(candidates, { ...prefs, focus: id }).length})
                </Button>
              ))}
            </fieldset>
            <div className="filters">
              {(['kind', 'coverage', 'capability', 'rule'] as FilterKey[]).map(
                (key) => (
                  <Select
                    key={key}
                    label={filterLabels[key]}
                    placeholder="Tümü"
                    data={options[key].map((value) => ({
                      value,
                      label: label(key, value),
                    }))}
                    value={prefs[key]}
                    onChange={(v) => update(key, v)}
                    disabled={!ready}
                    allowDeselect
                  />
                ),
              )}
            </div>
            <div className="actions catalog-options">
              <Button
                variant="light"
                ref={opener}
                onClick={(event) => {
                  event.currentTarget.focus();
                  setRulesOpen(true);
                }}
                disabled={!ready}
              >
                Karar kurallarını incele
              </Button>
              {mode === 'catalog' && (
                <Button
                  variant="light"
                  onClick={() => setTable((t) => !t)}
                  disabled={!ready}
                >
                  {table ? 'Kart görünümü' : 'Tablo görünümü'}
                </Button>
              )}
              <a
                className="quiet-link"
                href={`${base}strateji.json`}
                download="yazilim-stratejisi.json"
              >
                Strateji verisini indir
              </a>
            </div>
            <p className="meta">
              {storageFailed
                ? 'Tarayıcı saklama alanına erişilemedi; tercihler bu oturumda çalışır.'
                : 'Karar hedefi ve karşılaştırma seçimi bu tarayıcıda saklanır.'}{' '}
              {urlFailed
                ? 'Filtreler adres çubuğuna yazılamadı.'
                : 'Arama ve filtreleri paylaşmak için sayfanın adresini kopyala.'}
            </p>
          </details>
          {hasFilters && (
            <div className="active-filters" aria-label="Etkin filtreler">
              {prefs.query && (
                <Button
                  variant="default"
                  className="filter-chip"
                  aria-label="Arama filtresini kaldır"
                  onClick={() => update('query', '')}
                >
                  Arama: {prefs.query} · Kaldır
                </Button>
              )}
              {active.map((key) => (
                <Button
                  key={key}
                  variant="default"
                  className="filter-chip"
                  aria-label={`${filterLabels[key]} filtresini kaldır`}
                  onClick={() => update(key, null)}
                >
                  {label(key, prefs[key]!)} · Kaldır
                </Button>
              ))}
              <Button
                variant="light"
                onClick={() => setPrefs(resetFilters(prefs))}
              >
                Filtreleri temizle
              </Button>
            </div>
          )}
        </div>
        <div className="comparison-tray">
          <p role="status" aria-live="polite">
            {chosen.length}/4 proje seçili · {sorted.length} kayıt
          </p>
          <div className="actions">
            <a className="button-link" href={`${base}karsilastir/`}>
              Seçilen projeleri karşılaştır
            </a>
            <Button
              variant="light"
              disabled={!ready || !chosen.length}
              onClick={() => update('selected', [])}
            >
              Karşılaştırma seçimini temizle
            </Button>
          </div>
        </div>
        <p className="notice">
          Bu görünüm kesin bir başarı sırası üretmez. Seçilen hedef önerileri
          yorumlamaya yarar; bilinmeyen ölçütler puana çevrilmez. Sıralama
          tercihi yalnız liste düzenidir.
        </p>
        {mode === 'compare' && (
          <section
            className="comparison"
            aria-label="Seçilen projelerin karşılaştırması"
          >
            {chosen.length < 2 ? (
              <p>Karşılaştırmak için aşağıdan en az iki proje seçin.</p>
            ) : (
              <>
                <div className="comparison-projects">
                  {chosen.map((c) => (
                    <h2 key={c.id}>
                      <a href={`${base}projeler/${c.id}/`}>{c.name}</a>
                    </h2>
                  ))}
                </div>
                {fields.map(([title, get]) => (
                  <section className="comparison-criterion" key={title}>
                    <h3>{title}</h3>
                    <div className="comparison-cells">
                      {chosen.map((c) => (
                        <div className="comparison-cell" key={c.id}>
                          <h4>{c.name}</h4>
                          <p>{get(c)}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </>
            )}
          </section>
        )}
        {sorted.length === 0 ? (
          <p className="notice">
            Bu arama ve filtrelerle eşleşen proje bulunamadı. Filtreleri
            temizleyerek yeniden dene.
          </p>
        ) : table && mode === 'catalog' ? (
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Proje karşılaştırma tablosu"
            onKeyDown={scrollTableWithKeyboard}
          >
            <table className="catalog-table">
              <caption>
                Yazılım dilimleri; satır sırası yatırım önceliği değildir.
              </caption>
              <thead>
                <tr>
                  <th>Proje</th>
                  <th>Geliştirilecek dilim</th>
                  <th>ECA önerisi</th>
                  <th>Kabul koşulu</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c) => (
                  <tr key={c.id}>
                    <th>
                      <a href={`${base}projeler/${c.id}/`}>{c.name}</a>
                    </th>
                    <td>{c.slice.title}</td>
                    <td>{evaluateCandidate(c, prefs.goal).label}</td>
                    <td>{c.slice.acceptance.join(' · ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="project-grid">{sorted.map(entry)}</div>
        )}
        <Modal
          opened={rulesOpen}
          onClose={() => setRulesOpen(false)}
          title="Karar kuralları nasıl çalışır?"
          centered
          returnFocus
          transitionProps={{ duration: 0 }}
        >
          <p>
            Olay, koşul ve eylem ayrı kaydedilir. Bilinmeyen koşul tetiklenmez;
            çalışma kanıtının eksik olması önce başlangıç doğrulaması önerir.
          </p>
          <p>
            Kritik hata, çelişki, rol/veri sınırı ve entegrasyon kabulü; yeni
            özellik önerisinin önünde değerlendirilir. Eşit öncelikli farklı
            eylemler çatışma olarak gösterilir.
          </p>
          <p>
            Bu rehber kaynak yazılımı çalıştırmaz. Kontrol listesi işaretleri
            kabul kanıtını değiştirmez.
          </p>
          <a href={`${base}kararlar/#eca`}>
            14 ECA kuralını ve gerekçelerini aç
          </a>
          <Button variant="light" onClick={() => setRulesOpen(false)}>
            Kapat
          </Button>
        </Modal>
      </section>
    </MantineProvider>
  );
}
