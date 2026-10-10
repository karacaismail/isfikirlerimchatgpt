import { portfolio } from '../lib/data';
export function GET() {
  return new Response(JSON.stringify(portfolio), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
