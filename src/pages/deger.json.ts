import { productValue } from '../data/product-cases';
export function GET() {
  return new Response(JSON.stringify(productValue), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
