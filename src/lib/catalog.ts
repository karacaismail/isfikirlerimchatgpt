import {
  defaultProfiles,
  groupIds,
  profileScore,
  scoreGroup,
  searchText,
  type GroupId,
  type Project,
} from './model.ts';

export type GuideMetadata = {
  cluster: string;
  customerType: string;
  revenueType: string;
  summary: string;
  buyer: string;
  firstOffer: string;
  nextStep: string;
};
export type GuideIndex = Record<string, GuideMetadata>;
export type CatalogPreferences = {
  query: string;
  cluster: string | null;
  customer: string | null;
  revenue: string | null;
  stage: string | null;
  platform: string | null;
  income: string | null;
  decision: string | null;
  sort: string;
  selected: string[];
  weights: Record<GroupId, number>;
};
export const filterKeys = [
  'cluster',
  'customer',
  'revenue',
  'stage',
  'platform',
  'income',
  'decision',
] as const;
export type FilterKey = (typeof filterKeys)[number];
const urlKeys = {
  query: 'q',
  cluster: 'cluster',
  customer: 'customer',
  revenue: 'revenue',
  stage: 'stage',
  platform: 'platform',
  income: 'income',
  decision: 'decision',
  sort: 'sort',
} as const;

export function createDefaultPreferences(): CatalogPreferences {
  return {
    query: '',
    cluster: null,
    customer: null,
    revenue: null,
    stage: null,
    platform: null,
    income: null,
    decision: null,
    sort: 'name',
    selected: [],
    weights: { ...defaultProfiles.fast },
  };
}

export const uniqueOptions = (values: string[]) =>
  [...new Set(values)].sort((a, b) => a.localeCompare(b, 'tr'));

export function filterOptions(projects: Project[], guides: GuideIndex) {
  const metadata = projects.flatMap((p) =>
    guides[p.id] ? [guides[p.id]] : [],
  );
  return {
    cluster: uniqueOptions(metadata.map((g) => g.cluster)),
    customer: uniqueOptions(metadata.map((g) => g.customerType)),
    revenue: uniqueOptions(metadata.map((g) => g.revenueType)),
    stage: uniqueOptions(projects.map((p) => p.maturity.product)),
    platform: uniqueOptions(projects.flatMap((p) => p.platforms.proposed)),
    income: uniqueOptions(projects.flatMap((p) => p.monetization)),
    decision: uniqueOptions(projects.map((p) => p.decision)),
  };
}

function validWeights(value: unknown): value is Record<GroupId, number> {
  if (!value || typeof value !== 'object') return false;
  const weights = value as Record<string, unknown>;
  return (
    groupIds.every(
      (id) =>
        typeof weights[id] === 'number' &&
        Number.isFinite(weights[id]) &&
        (weights[id] as number) >= 0 &&
        (weights[id] as number) <= 100,
    ) &&
    Math.abs(
      groupIds.reduce((sum, id) => sum + (weights[id] as number), 0) - 100,
    ) < 0.0001
  );
}

export function sanitizePreferences(
  raw: unknown,
  projects: Project[],
  guides: GuideIndex,
): CatalogPreferences {
  const result = createDefaultPreferences();
  if (!raw || typeof raw !== 'object') return result;
  const input = raw as Record<string, unknown>;
  const options = filterOptions(projects, guides);
  if (typeof input.query === 'string') result.query = input.query.slice(0, 200);
  for (const key of filterKeys) {
    const value = input[key];
    if (typeof value === 'string' && options[key].includes(value))
      result[key] = value;
  }
  if (
    typeof input.sort === 'string' &&
    ['name', 'profile', ...groupIds].includes(input.sort)
  )
    result.sort = input.sort;
  if (Array.isArray(input.selected)) {
    result.selected = [
      ...new Set(
        input.selected.filter(
          (id): id is string =>
            typeof id === 'string' && projects.some((p) => p.id === id),
        ),
      ),
    ].slice(0, 4);
  }
  const weights = input.weights;
  if (validWeights(weights))
    result.weights = Object.fromEntries(
      groupIds.map((id) => [id, weights[id]]),
    ) as Record<GroupId, number>;
  return result;
}

export function resetFilters(prefs: CatalogPreferences): CatalogPreferences {
  return {
    ...createDefaultPreferences(),
    selected: [...prefs.selected],
    weights: { ...prefs.weights },
  };
}

export function preferencesFromUrl(
  search: string,
  saved: CatalogPreferences,
  projects: Project[],
  guides: GuideIndex,
): CatalogPreferences {
  const params = new URLSearchParams(search);
  if (!Object.values(urlKeys).some((key) => params.has(key)))
    return sanitizePreferences(saved, projects, guides);
  const candidate: Record<string, unknown> = { ...resetFilters(saved) };
  for (const [key, urlKey] of Object.entries(urlKeys))
    if (params.has(urlKey)) candidate[key] = params.get(urlKey);
  return sanitizePreferences(candidate, projects, guides);
}

export function queryStringForPreferences(
  search: string,
  prefs: CatalogPreferences,
) {
  const params = new URLSearchParams(search);
  for (const key of Object.values(urlKeys)) params.delete(key);
  if (prefs.query) params.set('q', prefs.query);
  for (const key of filterKeys)
    if (prefs[key]) params.set(urlKeys[key], prefs[key]);
  if (prefs.sort !== 'name') params.set('sort', prefs.sort);
  const result = params.toString();
  return result ? `?${result}` : '';
}

export function filterProjects(
  projects: Project[],
  prefs: CatalogPreferences,
  guides: GuideIndex,
): Project[] {
  const terms = searchText(prefs.query).trim().split(/\s+/u).filter(Boolean);
  return projects.filter((p) => {
    const guide = guides[p.id];
    const haystack = searchText(
      [
        p.name,
        ...p.aliases,
        p.definition,
        p.customer,
        p.problem,
        guide?.summary,
        guide?.buyer,
        guide?.firstOffer,
        guide?.nextStep,
      ]
        .filter(Boolean)
        .join(' '),
    );
    return (
      terms.every((term) => haystack.includes(term)) &&
      (!prefs.cluster || guide?.cluster === prefs.cluster) &&
      (!prefs.customer || guide?.customerType === prefs.customer) &&
      (!prefs.revenue || guide?.revenueType === prefs.revenue) &&
      (!prefs.stage || p.maturity.product === prefs.stage) &&
      (!prefs.platform || p.platforms.proposed.includes(prefs.platform)) &&
      (!prefs.income || p.monetization.includes(prefs.income)) &&
      (!prefs.decision || p.decision === prefs.decision)
    );
  });
}

export function catalogScore(project: Project, prefs: CatalogPreferences) {
  if (prefs.sort === 'profile') return profileScore(project, prefs.weights);
  if (groupIds.includes(prefs.sort as GroupId)) {
    const score = scoreGroup(
      prefs.sort as GroupId,
      project.scores[prefs.sort as GroupId],
    );
    return score.complete ? score.lower : null;
  }
  return 0;
}

export function sortProjects(projects: Project[], prefs: CatalogPreferences) {
  const sorted = [...projects].sort((a, b) => {
    const x = catalogScore(a, prefs),
      y = catalogScore(b, prefs);
    if (x === null && y !== null) return 1;
    if (y === null && x !== null) return -1;
    if (x !== null && y !== null && x !== y) return y - x;
    return a.name.localeCompare(b.name, 'tr');
  });
  return {
    sorted,
    complete: sorted.filter((p) => catalogScore(p, prefs) !== null),
    incomplete: sorted.filter((p) => catalogScore(p, prefs) === null),
  };
}
