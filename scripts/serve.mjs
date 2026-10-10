import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { gzipSync } from 'node:zlib';
const root = resolve('dist');
const base = '/isfikirlerimchatgpt';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    if (url.pathname !== base && !url.pathname.startsWith(base + '/')) {
      res.writeHead(404);
      res.end('Bulunamadı');
      return;
    }
    let path = resolve(
      root,
      '.' + decodeURIComponent(url.pathname.slice(base.length)),
    );
    if (path !== root && !path.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const data = await readFile(path);
    const gzip = (req.headers['accept-encoding'] || '').includes('gzip');
    res.writeHead(200, {
      'Content-Type': types[extname(path)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      Vary: 'Accept-Encoding',
      ...(gzip ? { 'Content-Encoding': 'gzip' } : {}),
    });
    res.end(gzip ? gzipSync(data) : data);
  } catch {
    res.writeHead(404);
    res.end('Bulunamadı');
  }
}).listen(4179, '127.0.0.1', () =>
  console.log('Üretim çıktısı: http://127.0.0.1:4179/isfikirlerimchatgpt/'),
);
