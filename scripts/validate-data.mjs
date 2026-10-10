import { readFile } from 'node:fs/promises';
import { datasetSchema } from '../src/lib/model.ts';
const data = datasetSchema.parse(
  JSON.parse(await readFile('src/data/portfolio.json', 'utf8')),
);
console.log(
  `Veri şeması: ${data.projects.length} arındırılmış kişisel proje; kimlik, kanıt ve ölçüt bağları geçerli.`,
);
