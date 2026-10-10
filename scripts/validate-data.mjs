import { productCases } from '../src/data/product-cases.ts';
import { validateProductBindings } from '../src/lib/product-value.ts';
import { development } from '../src/data/development.ts';
import { strategySchema } from '../src/lib/strategy.ts';
import { readFile } from 'node:fs/promises';
import { datasetSchema } from '../src/lib/model.ts';
const data = datasetSchema.parse(
  JSON.parse(await readFile('src/data/portfolio.json', 'utf8')),
);
console.log(
  `Veri şeması: ${data.projects.length} arındırılmış kişisel proje; kimlik, kanıt ve ölçüt bağları geçerli.`,
);

const strategy = strategySchema.parse(development);
console.log(
  `Strateji ${strategy.version}: ${strategy.candidates.length} yazılım adayı; koşul, kanıt ve bağımlılık bağları geçerli.`,
);

validateProductBindings(productCases, strategy.candidates);
console.log(
  `Ticari değerlendirme: ${productCases.length} vaka; aday, kaynak ve özet bağları geçerli.`,
);
