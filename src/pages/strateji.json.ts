import { development } from '../data/development';
import { strategySchema } from '../lib/strategy';
export function GET() {
  return new Response(JSON.stringify(strategySchema.parse(development)), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
