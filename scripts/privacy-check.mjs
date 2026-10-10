import { development } from '../src/data/development.ts';
import { strategySchema } from '../src/lib/strategy.ts';
import { readdir, readFile, stat, lstat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { datasetSchema } from '../src/lib/model.ts';
const data = datasetSchema.parse(
  JSON.parse(await readFile('src/data/portfolio.json', 'utf8')),
);
const patterns = [
  /[/]Users[/]/i,
  /[/]home[/][^/]+[/]/i,
  /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /sk-(?:proj-)?[A-Za-z0-9_-]{25,}/,
  /"(?:relative_path|reviewed_ranges|private_notes|local_path|customer_email)"\s*:/,
];
const allowedRoot = new Set([
  '.github',
  '.gitignore',
  '.nvmrc',
  '.prettierrc.json',
  '.prettierignore',
  'AGENTS.md',
  'README.md',
  'astro.config.mjs',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'playwright.config.ts',
  'src',
  'scripts',
  'tests',
  'docs',
  'public',
  'node_modules',
  'dist',
  '.astro',
  'test-results',
  'playwright-report',
  '.git',
]);
const errors = [];
const rootEntries = await readdir('.');
for (const entry of rootEntries)
  if (!allowedRoot.has(entry))
    errors.push(`İzin listesi dışındaki kök: ${entry}`);
async function walk(path) {
  if ((await lstat(path)).isSymbolicLink()) {
    errors.push(`Sembolik kök yayımlanamaz: ${path}`);
    return;
  }
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const p = join(path, entry.name);
    if (entry.isSymbolicLink()) {
      errors.push(`Sembolik bağlantı yayımlanamaz: ${p}`);
      continue;
    }
    if (entry.isDirectory()) {
      await walk(p);
      continue;
    }
    if (
      /\.(?:map|env|pem|key|sqlite|db|zip|tar|rar)$/i.test(p) ||
      /(?:inventory|ledger|shards)/i.test(p)
    )
      errors.push(`Özel çıktı türü: ${p}`);
    if (
      ![
        '.html',
        '.js',
        '.css',
        '.json',
        '.txt',
        '.xml',
        '.svg',
        '.md',
        '.astro',
        '.tsx',
        '.ts',
      ].includes(extname(p))
    )
      continue;
    const text = await readFile(p, 'utf8');
    for (let i = 0; i < patterns.length; i++)
      if (patterns[i].test(text))
        errors.push(`Gizlilik örüntüsü ${i + 1}: ${p}`);
  }
}
for (const directory of [
  'dist',
  'src',
  'docs',
  ...(rootEntries.includes('public') ? ['public'] : []),
])
  await walk(directory);
for (const file of ['README.md', 'AGENTS.md']) {
  const text = await readFile(file, 'utf8');
  for (let i = 0; i < patterns.length; i++)
    if (patterns[i].test(text))
      errors.push(`Kaynak gizlilik örüntüsü ${i + 1}: ${file}`);
}
for (const p of data.projects)
  if (p.sources.some((e) => e.kind === 'dosya' && e.url))
    errors.push(`Özel dosyaya URL: ${p.id}`);
const exported = JSON.parse(await readFile('dist/veri.json', 'utf8'));
if (JSON.stringify(exported) !== JSON.stringify(data))
  errors.push('Dışa aktarılan veri ile izinli veri eşleşmiyor');
const strategyExport = JSON.parse(await readFile('dist/strateji.json', 'utf8'));
if (
  JSON.stringify(strategyExport) !==
  JSON.stringify(strategySchema.parse(development))
)
  errors.push('Strateji dışa aktarımı izinli veriyle eşleşmiyor');
if (errors.length) throw new Error(errors.join('\n'));
const size = (await stat('dist/veri.json')).size;
console.log(
  `Gizlilik kapısı: şema izin listesi, kaynak yolları/secret örüntüleri, çıktı türleri, dışa aktarım eşitliği geçti (${size} bayt). İçerik incelemesini ve geçmiş sızıntı denetimini tek başına kanıtlamaz.`,
);
