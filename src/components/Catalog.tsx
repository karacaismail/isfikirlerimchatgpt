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
  customerLabels,
  guideClusters,
  guideFor,
  projectGuides,
  revenueLabels,
} from '../data/guides';
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
  defaultProfiles,
  groupIds,
  groupNames,
  profileScore,
  scoreLabel,
  type Project,
} from '../lib/model';

type Props = { projects: Project[]; base: string; mode: 'catalog' | 'compare' };
const storageKey = 'isfikirlerim-tercihler-v1';
const filterLabels: Record<FilterKey, string> = {
  cluster: 'Başlangıç yolu',
  customer: 'Müşteri türü',
  revenue: 'Gelir türü',
  stage: 'Ürün aşaması',
  platform: 'Önerilen platform',
  income: 'Gelir modeli',
  decision: 'Önerilen karar',
};
export default function Catalog({ projects, base, mode }: Props) {
  const [prefs, setPrefs] = useState<CatalogPreferences>(
    createDefaultPreferences,
  );
  const [ready, setReady] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [table, setTable] = useState(false);
  const [weightsOpen, setWeightsOpen] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const [urlFailed, setUrlFailed] = useState(false);
  const initialized = useRef(false);
  const weightsOpener = useRef<HTMLButtonElement>(null);
  const update = <K extends keyof CatalogPreferences>(
    key: K,
    value: CatalogPreferences[K],
  ) => setPrefs((p) => ({ ...p, [key]: value }));
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    let saved = createDefaultPreferences();
    try {
      saved = sanitizePreferences(
        JSON.parse(localStorage.getItem(storageKey) || 'null'),
        projects,
        projectGuides,
      );
    } catch {
      setStorageFailed(true);
    }
    setPrefs(
      preferencesFromUrl(
        window.location.search,
        saved,
        projects,
        projectGuides,
      ),
    );
    setFiltersOpen(window.matchMedia('(min-width: 48rem)').matches);
    setReady(true);
  }, [projects]);
  useEffect(() => {
    if (!ready) return;
    const restoreUrl = () =>
      setPrefs((current) =>
        preferencesFromUrl(
          window.location.search,
          resetFilters(current),
          projects,
          projectGuides,
        ),
      );
    window.addEventListener('popstate', restoreUrl);
    return () => window.removeEventListener('popstate', restoreUrl);
  }, [projects, ready]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(prefs));
    } catch {
      setStorageFailed(true);
    }
    try {
      const search = queryStringForPreferences(window.location.search, prefs);
      if (search !== window.location.search)
        window.history.replaceState(
          window.history.state,
          '',
          `${window.location.pathname}${search}${window.location.hash}`,
        );
    } catch {
      setUrlFailed(true);
    }
  }, [prefs, ready]);
  const options = filterOptions(projects, projectGuides);
  const filtered = filterProjects(projects, prefs, projectGuides);
  const { sorted, complete, incomplete } = sortProjects(filtered, prefs);
  const advancedCount = ['stage', 'platform', 'income', 'decision'].filter(
    (key) => prefs[key as FilterKey],
  ).length;
  const active = filterKeys.filter((key) => prefs[key]);
  const hasFilters = Boolean(prefs.query || active.length);
  const clusterLabel = (id: string) =>
    guideClusters.find((cluster) => cluster.value === id)?.label || id;
  const filterValueLabel = (key: FilterKey, value: string) =>
    key === 'cluster'
      ? clusterLabel(value)
      : key === 'customer'
        ? customerLabels[value as keyof typeof customerLabels] || value
        : key === 'revenue'
          ? revenueLabels[value as keyof typeof revenueLabels] || value
          : value;
  const chosen = prefs.selected.flatMap((id) =>
    projects.filter((p) => p.id === id),
  );
  const sum = groupIds.reduce((a, g) => a + prefs.weights[g], 0);
  const selection = (p: Project) =>
    prefs.selected.includes(p.id)
      ? prefs.selected.filter((id) => id !== p.id)
      : [...prefs.selected, p.id];
  const fields = [
    ['Ne işe yarar?', (p: Project) => guideFor(p.id).summary],
    ['Kime satılır?', (p: Project) => guideFor(p.id).buyer],
    ['İlk teklif', (p: Project) => guideFor(p.id).firstOffer],
    ['İlk adım', (p: Project) => guideFor(p.id).nextStep],
    ['Yapılacaklar', (p: Project) => guideFor(p.id).steps.join(' · ')],
    ['Kaynaklarda görülen durum', (p: Project) => p.observed],
    ['Önemli koşullar', (p: Project) => p.blockers.join(' · ')],
  ] as const;
  function projectEntry(p: Project) {
    const guide = guideFor(p.id);
    return (
      <article key={p.id} className="project-entry" data-project={p.id}>
        <div className="project-tags">
          <span>{clusterLabel(guide.cluster)}</span>
          <span>{revenueLabels[guide.revenueType]}</span>
        </div>
        <h3>
          <a href={`${base}projeler/${p.id}/`}>{p.name}</a>
        </h3>
        <p className="project-summary">{guide.summary}</p>
        <dl className="project-facts">
          <div>
            <dt>Kime satılır?</dt>
            <dd>{guide.buyer}</dd>
          </div>
          <div>
            <dt>İlk teklif</dt>
            <dd>{guide.firstOffer}</dd>
          </div>
        </dl>
        <p className="project-next-step">
          <strong>İlk adım:</strong> {guide.nextStep}
        </p>
        <div className="actions">
          <a className="button-link" href={`${base}projeler/${p.id}/`}>
            Adım adım incele
          </a>
          <Button
            variant="light"
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
        </div>
        <details className="score-disclosure">
          <summary>Puanları göster</summary>
          <p className="meta">
            Puanlar kaynaklara dayalı geçici değerlendirmedir; gelir veya başarı
            garantisi değildir.
          </p>
          <div className="score-list">
            {groupIds.map((g) => (
              <p key={g}>
                <strong>{groupNames[g]}:</strong> {scoreLabel(g, p.scores[g])}
              </p>
            ))}
          </div>
        </details>
      </article>
    );
  }
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <section
        className="catalog-layout"
        aria-label="Etkileşimli proje kataloğu"
        data-ready={ready}
      >
        <noscript>
          <p className="notice">
            JavaScript kapalı. Aşağıdaki proje açıklamaları ve ayrıntı
            bağlantıları okunabilir; etkileşimli filtre ve karşılaştırma için
            modern tarayıcı gerekir.
          </p>
        </noscript>
        <div className="catalog-toolbar">
          <TextInput
            className="catalog-search"
            label="Proje veya problem ara"
            placeholder="Ör. ürün kataloğu, eğitim, İK"
            value={prefs.query}
            disabled={!ready}
            onChange={(e) => update('query', e.currentTarget.value)}
            maxLength={200}
          />
          <details
            className="filter-disclosure"
            open={filtersOpen}
            onToggle={(event) => setFiltersOpen(event.currentTarget.open)}
          >
            <summary>
              Filtreler{active.length ? ` (${active.length} etkin)` : ''}
            </summary>
            <fieldset className="cluster-chips">
              <legend>Nasıl başlamak istiyorsun?</legend>
              <Button
                className="filter-chip"
                variant="default"
                aria-pressed={!prefs.cluster}
                disabled={!ready}
                onClick={() => update('cluster', null)}
              >
                Tüm yollar (
                {
                  filterProjects(
                    projects,
                    { ...prefs, cluster: null },
                    projectGuides,
                  ).length
                }
                )
              </Button>
              {guideClusters.map((cluster) => (
                <Button
                  key={cluster.value}
                  className="filter-chip"
                  variant="default"
                  aria-pressed={prefs.cluster === cluster.value}
                  disabled={!ready}
                  onClick={() =>
                    update(
                      'cluster',
                      prefs.cluster === cluster.value ? null : cluster.value,
                    )
                  }
                >
                  {cluster.label} (
                  {
                    filterProjects(
                      projects,
                      { ...prefs, cluster: cluster.value },
                      projectGuides,
                    ).length
                  }
                  )
                </Button>
              ))}
            </fieldset>
            <div className="filters">
              <Select
                label="Müşteri türü"
                placeholder="Tüm müşteriler"
                data={options.customer.map((value) => ({
                  value,
                  label: filterValueLabel('customer', value),
                }))}
                value={prefs.customer}
                onChange={(v) => update('customer', v)}
                disabled={!ready}
                allowDeselect
              />
              <Select
                label="Gelir türü"
                placeholder="Tüm gelir türleri"
                data={options.revenue.map((value) => ({
                  value,
                  label: filterValueLabel('revenue', value),
                }))}
                value={prefs.revenue}
                onChange={(v) => update('revenue', v)}
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
            <details className="filter-panel">
              <summary>
                Diğer filtreler
                {advancedCount ? ` (${advancedCount} etkin)` : ''}
              </summary>
              <div className="filters">
                <Select
                  label="Ürün aşaması"
                  placeholder="Tüm aşamalar"
                  data={options.stage}
                  value={prefs.stage}
                  onChange={(v) => update('stage', v)}
                  disabled={!ready}
                  allowDeselect
                />
                <Select
                  label="Önerilen platform"
                  placeholder="Tüm platformlar"
                  data={options.platform}
                  value={prefs.platform}
                  onChange={(v) => update('platform', v)}
                  disabled={!ready}
                  allowDeselect
                />
                <Select
                  label="Önerilen karar"
                  placeholder="Tüm kararlar"
                  data={options.decision}
                  value={prefs.decision}
                  onChange={(v) => update('decision', v)}
                  disabled={!ready}
                  allowDeselect
                />
                <Select
                  label="Gelir modeli"
                  placeholder="Tüm modeller"
                  data={options.income}
                  value={prefs.income}
                  onChange={(v) => update('income', v)}
                  disabled={!ready}
                  allowDeselect
                />
              </div>
            </details>
            <div className="actions catalog-options">
              <Button
                variant="light"
                ref={weightsOpener}
                onClick={() => setWeightsOpen(true)}
                disabled={!ready}
              >
                Ağırlıkları düzenle
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
                href={`${base}veri.json`}
                download="is-fikirlerim.json"
              >
                Kamuya açık veriyi indir
              </a>
            </div>
            <p className="meta">
              {storageFailed
                ? 'Tarayıcı saklama alanına erişilemedi; tercihler bu oturumda çalışır.'
                : 'Karşılaştırma seçimin ve puan ağırlıkların bu tarayıcıda saklanır.'}{' '}
              {urlFailed
                ? 'Filtreler adres çubuğuna yazılamadı.'
                : 'Arama ve filtreleri paylaşmak için sayfanın adresini kopyala.'}
            </p>
          </details>
          {hasFilters && (
            <div className="active-filters" aria-label="Etkin filtreler">
              {prefs.query && (
                <Button
                  className="filter-chip"
                  variant="default"
                  onClick={() => update('query', '')}
                  aria-label="Arama filtresini kaldır"
                >
                  Arama: {prefs.query} · Kaldır
                </Button>
              )}
              {active.map((key) => (
                <Button
                  key={key}
                  className="filter-chip"
                  variant="default"
                  onClick={() => update(key, null)}
                  aria-label={`${filterLabels[key]} filtresini kaldır`}
                >
                  {filterLabels[key]}: {filterValueLabel(key, prefs[key]!)} ·
                  Kaldır
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="result-toolbar">
          <p role="status" aria-live="polite">
            {projects.length} projeden {filtered.length} gösteriliyor ·{' '}
            {chosen.length}/4 karşılaştırma seçimi
          </p>
          {hasFilters && (
            <Button
              variant="light"
              onClick={() => setPrefs(resetFilters)}
              disabled={!ready}
            >
              Filtreleri temizle
            </Button>
          )}
        </div>
        {chosen.length > 0 && (
          <aside className="comparison-tray" aria-label="Karşılaştırma seçimin">
            <p>
              <strong>Seçtiklerin:</strong>{' '}
              {chosen.map((p) => p.name).join(' · ')}
            </p>
            <div className="actions comparison-selection">
              {mode === 'catalog' && (
                <a className="button-link" href={`${base}karsilastir/`}>
                  Seçilen projeleri karşılaştır
                </a>
              )}
              {chosen.map((p) => (
                <Button
                  key={p.id}
                  variant="default"
                  onClick={() =>
                    update(
                      'selected',
                      prefs.selected.filter((id) => id !== p.id),
                    )
                  }
                  aria-label={`${p.name}: karşılaştırma seçiminden çıkar`}
                >
                  {p.name} · Çıkar
                </Button>
              ))}
            </div>
            <p className="meta">
              Filtreler seçimlerini silmez. En fazla dört projeyi yan yana
              karşılaştırabilirsin.
            </p>
          </aside>
        )}
        {mode === 'compare' && (
          <section aria-label="Seçilen projelerin karşılaştırması">
            <h2>Karşılaştırma</h2>
            <p>
              Kime satacağını, ilk teklifini ve yapman gereken işleri yan yana
              gör.
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
            <div className="empty-state">
              <h3>Sonuç bulunamadı</h3>
              <p>
                Bu arama ve filtrelerle eşleşen proje bulunamadı. Bir filtreyi
                kaldırabilir veya tüm projeleri yeniden gösterebilirsin.
              </p>
              <Button onClick={() => setPrefs(resetFilters)} disabled={!ready}>
                Aramayı ve filtreleri sıfırla
              </Button>
            </div>
          ) : (
            <>
              {prefs.sort !== 'name' && (
                <p className="notice">
                  Bilgisi tamamlanan projeler puanla sıralanır. Eksik bilgisi
                  olanlar aşağıda alfabetik gösterilir; aralıklar başarı
                  olasılığı değildir.
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
                        <th>İlk adım</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((p) => (
                        <tr key={p.id}>
                          <th scope="row">
                            <a href={`${base}projeler/${p.id}/`}>{p.name}</a>
                          </th>
                          <td>{guideFor(p.id).buyer}</td>
                          {groupIds.map((g) => (
                            <td key={g}>{scoreLabel(g, p.scores[g])}</td>
                          ))}
                          <td>{guideFor(p.id).nextStep}</td>
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
