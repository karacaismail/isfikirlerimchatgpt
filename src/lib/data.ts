import raw from '../data/portfolio.json';
import { datasetSchema } from './model';
export const portfolio = datasetSchema.parse(raw);
