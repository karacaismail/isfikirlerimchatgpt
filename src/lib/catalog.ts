import { searchText } from './model.ts';
import {
  goalIds,
  evaluateCandidate,
  type Candidate as FullCandidate,
  type GoalId,
} from './strategy.ts';
export type CatalogCandidate = Omit<FullCandidate, 'evidence'>;
type Candidate = CatalogCandidate;
export function toCatalogCandidates(
  candidates: FullCandidate[],
): CatalogCandidate[] {
  return candidates.map(({ evidence: _evidence, ...candidate }) => candidate);
}
export type CatalogPreferences = {
  query: string;
  view: 'cases' | 'all' | 'enablers';
  commercial: string | null;
  goal: GoalId;
  focus: string | null;
  kind: string | null;
  coverage: string | null;
  capability: string | null;
  rule: string | null;
  sort: string;
  selected: string[];
};
export const filterKeys = [
  'commercial',
  'focus',
  'kind',
  'coverage',
  'capability',
  'rule',
] as const;
export type FilterKey = (typeof filterKeys)[number];
export const createDefaultPreferences = (): CatalogPreferences => ({
  query: '',
  view: 'cases',
  commercial: null,
  goal: 'flow',
  focus: null,
  kind: null,
  coverage: null,
  capability: null,
  rule: null,
  sort: 'name',
  selected: [],
});
export const uniqueOptions = (values: string[]) =>
  [...new Set(values)].sort((a, b) => a.localeCompare(b, 'tr'));
export function filterOptions(candidates: Candidate[], goal: GoalId = 'flow') {
  return {
    commercial: uniqueOptions(
      candidates.flatMap((c) => (c.commercial ? [c.commercial.action] : [])),
    ),
    focus: uniqueOptions(candidates.flatMap((c) => c.goals)),
    kind: uniqueOptions(
      candidates.map((c) => c.commercial?.position || c.kind),
    ),
    coverage: uniqueOptions(candidates.map((c) => c.coverage)),
    capability: uniqueOptions(candidates.flatMap((c) => c.capabilities)),
    rule: uniqueOptions(
      candidates.flatMap((c) => evaluateCandidate(c, goal).ruleIds),
    ),
  };
}
export function sanitizePreferences(
  raw: unknown,
  candidates: Candidate[],
): CatalogPreferences {
  const result = createDefaultPreferences();
  if (!raw || typeof raw !== 'object') return result;
  const input = raw as Record<string, unknown>;
  if (typeof input.query === 'string') result.query = input.query.slice(0, 200);
  if (goalIds.includes(input.goal as GoalId))
    result.goal = input.goal as GoalId;
  if (['cases', 'all', 'enablers'].includes(input.view as string))
    result.view = input.view as CatalogPreferences['view'];
  const options = filterOptions(candidates, result.goal);
  for (const key of filterKeys)
    if (typeof input[key] === 'string' && options[key].includes(input[key]))
      result[key] = input[key];
  if (['name', 'fit', 'coverage'].includes(input.sort as string))
    result.sort = input.sort as string;
  if (Array.isArray(input.selected))
    result.selected = [
      ...new Set(
        input.selected.filter(
          (id): id is string =>
            typeof id === 'string' && candidates.some((c) => c.id === id),
        ),
      ),
    ].slice(0, 4);
  return result;
}
export function resetFilters(p: CatalogPreferences): CatalogPreferences {
  return {
    ...createDefaultPreferences(),
    goal: p.goal,
    view: p.view,
    selected: [...p.selected],
  };
}
const keys = ['view', 'q', 'goal', ...filterKeys, 'sort'] as const;
export function preferencesFromUrl(
  search: string,
  saved: CatalogPreferences,
  candidates: Candidate[],
): CatalogPreferences {
  const params = new URLSearchParams(search);
  if (!keys.some((k) => params.has(k)))
    return sanitizePreferences(saved, candidates);
  const input: Record<string, unknown> = {
    ...resetFilters(saved),
    goal: 'flow',
    view: 'cases',
  };
  for (const key of keys)
    if (params.has(key)) input[key === 'q' ? 'query' : key] = params.get(key);
  return sanitizePreferences(input, candidates);
}
export function queryStringForPreferences(
  search: string,
  p: CatalogPreferences,
) {
  const params = new URLSearchParams(search);
  for (const key of [
    ...keys,
    'cluster',
    'customer',
    'revenue',
    'stage',
    'platform',
    'income',
    'decision',
  ])
    params.delete(key);
  if (p.view !== 'cases') params.set('view', p.view);
  if (p.query) params.set('q', p.query);
  params.set('goal', p.goal);
  for (const key of filterKeys) if (p[key]) params.set(key, p[key]);
  if (p.sort !== 'name') params.set('sort', p.sort);
  return params.size ? `?${params}` : '';
}
export function filterProjects(candidates: Candidate[], p: CatalogPreferences) {
  const terms = searchText(p.query).trim().split(/\s+/u).filter(Boolean);
  return candidates.filter((c) => {
    const haystack = searchText(
      [
        c.name,
        ...c.aliases,
        c.definition,
        c.commercial?.buyer || '',
        c.commercial?.value || '',
        c.observed,
        c.slice.title,
        c.slice.outcome,
        ...c.capabilities,
      ].join(' '),
    );
    return (
      (p.view === 'all' ||
        (p.view === 'cases'
          ? c.commercial?.recommended === true
          : ['feature', 'infrastructure', 'umbrella', 'research'].includes(
              c.commercial?.position || '',
            ))) &&
      (!p.commercial || c.commercial?.action === p.commercial) &&
      terms.every((t) => haystack.includes(t)) &&
      (!p.focus || c.goals.includes(p.focus as GoalId)) &&
      (!p.kind || (c.commercial?.position || c.kind) === p.kind) &&
      (!p.coverage || c.coverage === p.coverage) &&
      (!p.capability || c.capabilities.includes(p.capability)) &&
      (!p.rule || evaluateCandidate(c, p.goal).ruleIds.includes(p.rule))
    );
  });
}
export function sortProjects(candidates: Candidate[], p: CatalogPreferences) {
  return [...candidates].sort((a, b) => {
    if (p.sort === 'fit') {
      const diff =
        Number(b.goals.includes(p.goal)) - Number(a.goals.includes(p.goal));
      if (diff) return diff;
    }
    if (p.sort === 'coverage') {
      const order = { detailed: 0, initial: 1, missing: 2 };
      const diff = order[a.coverage] - order[b.coverage];
      if (diff) return diff;
    }
    return a.name.localeCompare(b.name, 'tr');
  });
}
