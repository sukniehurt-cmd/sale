#!/usr/bin/env node
/* ==========================================================================
   Serwer podglądu — wyłącznie do pracy lokalnej
   --------------------------------------------------------------------------
   Uruchomienie:  npm run serve      (albo: node build/serve.mjs)
   Domyślnie:     http://localhost:4173

   Odwzorowuje zachowanie hostingu produkcyjnego w dwóch istotnych punktach:
   adres kończący się ukośnikiem serwuje index.html z danego katalogu,
   a nieistniejący adres zwraca 404.html z prawidłowym kodem odpowiedzi.
   Bez tego podgląd lokalny wygląda inaczej niż wersja wdrożona.

   To narzędzie deweloperskie — nie używaj go do serwowania strony w sieci.
   ========================================================================== */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

async function resolveFile(urlPath) {
  /* normalize + odcięcie wiodących ukośników blokuje wyjście poza ROOT
     przez ścieżki w rodzaju /../../etc/passwd */
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  let file = join(ROOT, safe);

  if (!file.startsWith(ROOT)) return null;

  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, 'index.html');
  } catch {
    // Adres bez ukośnika na końcu — spróbuj katalogu
    try {
      const alt = join(file, 'index.html');
      await stat(alt);
      return alt;
    } catch {
      return null;
    }
  }

  try {
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const file = await resolveFile(urlPath === '/' ? '/index.html' : urlPath);

  if (!file) {
    // Kod 404 jest istotny: przeglądarka i roboty muszą go zobaczyć,
    // inaczej strona błędu wygląda jak zwykła podstrona (tzw. soft 404).
    try {
      const body = await readFile(join(ROOT, '404.html'));
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 — nie znaleziono');
    }
    console.log(`  404  ${urlPath}`);
    return;
  }

  try {
    const body = await readFile(file);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(body);
    console.log(`  200  ${urlPath}`);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 — błąd serwera');
    console.error(`  500  ${urlPath}`, e.message);
  }
}).listen(PORT, () => {
  console.log(`\n  Podgląd: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log('  Zatrzymanie: Ctrl+C\n');
});
