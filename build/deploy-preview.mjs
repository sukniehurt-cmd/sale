#!/usr/bin/env node
/* ==========================================================================
   Wdrożenie kopii podglądowej (GitHub Pages)
   --------------------------------------------------------------------------
   Uruchomienie:  node build/deploy-preview.mjs <katalog-wyjsciowy> [base]

   Tworzy kopię wygenerowanego serwisu przystosowaną do publikacji na GitHub
   Pages jako podgląd roboczy. Trzy różnice wobec wersji produkcyjnej:

   1. ŚCIEŻKI. Pages serwuje repozytorium projektu pod adresem
      https://uzytkownik.github.io/<repo>/, a strona używa ścieżek liczonych
      od korzenia domeny (/uslugi/). Bez przepisania wszystkie odnośniki
      i zasoby prowadziłyby w pustkę.

   2. BLOKADA INDEKSOWANIA. Kopia zawiera dane przykładowe — fikcyjny NIP,
      telefon i opinie. Wersja z takimi danymi nie może trafić do wyników
      wyszukiwania, bo konkurowałaby z docelową stroną i wprowadzała
      w błąd. Stąd meta noindex na każdej podstronie oraz robots.txt
      blokujący wszystkie roboty.

   3. CANONICAL zostaje bez zmian i wskazuje domenę docelową — to dodatkowe
      zabezpieczenie przed zaindeksowaniem kopii.

   Wersja produkcyjna w katalogu głównym repozytorium pozostaje nietknięta.
   ========================================================================== */

import { readdirSync, statSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = process.argv[2];
const BASE = (process.argv[3] || '/sale').replace(/\/$/, '');

if (!OUT) {
  console.error('Użycie: node build/deploy-preview.mjs <katalog-wyjsciowy> [prefiks-sciezki]');
  process.exit(1);
}

/* Katalogi pomijane — kod generatora nie ma czego szukać na serwerze */
const SKIP = new Set(['build', '.git', 'node_modules', '.github']);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/* --------------------------------------------------------------------------
   Przepisanie ścieżek liczonych od korzenia na ścieżki z prefiksem
   --------------------------------------------------------------------------
   Zmieniamy wyłącznie ścieżki zaczynające się od pojedynczego ukośnika.
   Adresy bezwzględne (https://…) zostają nietknięte — dotyczy to canonicala,
   Open Graph i danych strukturalnych, które mają wskazywać domenę docelową.
   -------------------------------------------------------------------------- */
function rewritePaths(html) {
  return html
    .replace(/(\s(?:href|src|poster|action)=")\/(?!\/)/g, `$1${BASE}/`)
    .replace(/(\sdata-(?:webm|mp4)=")\/(?!\/)/g, `$1${BASE}/`)
    .replace(/url\('\/(?!\/)/g, `url('${BASE}/`);
}

/* Meta robots trzeba nadpisać, a nie dopisać — inaczej obowiązuje pierwsza. */
function forceNoindex(html) {
  const tag = '<meta name="robots" content="noindex, nofollow">';
  return html.includes('name="robots"')
    ? html.replace(/<meta name="robots"[^>]*>/, tag)
    : html.replace('</head>', `${tag}\n</head>`);
}

/* Pasek informujący, że to kopia robocza — żeby nikt nie wziął jej
   za wersję produkcyjną ani nie zaczął z niej dzwonić pod fikcyjny numer. */
function addBanner(html) {
  const banner = `<div style="position:sticky;top:0;z-index:300;padding:.55rem 1rem;text-align:center;
background:#7a2e0e;color:#ffe9d6;font:600 13px/1.45 Inter,system-ui,sans-serif">
PODGLĄD ROBOCZY — dane firmy, opinie i realizacje są przykładowe.
Strona wyłączona z indeksowania.
</div>`;
  return html.replace(/<body>/, `<body>\n${banner}`);
}

/* -------------------------------------------------------------------------- */
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let htmlCount = 0;
let assetCount = 0;

for (const file of walk(ROOT)) {
  const rel = file.slice(ROOT.length + 1);
  const dest = join(OUT, rel);
  mkdirSync(dirname(dest), { recursive: true });

  if (extname(file) === '.html') {
    let html = readFileSync(file, 'utf8');
    html = rewritePaths(html);
    html = forceNoindex(html);
    html = addBanner(html);
    writeFileSync(dest, html, 'utf8');
    htmlCount++;
  } else {
    copyFileSync(file, dest);
    assetCount++;
  }
}

/* robots.txt: pełna blokada. To kopia robocza, nie ma czego indeksować. */
writeFileSync(
  join(OUT, 'robots.txt'),
  `# Kopia robocza serwisu — wyłączona z indeksowania.
# Wersja produkcyjna ma własny robots.txt zezwalający na indeksowanie.
User-agent: *
Disallow: /
`,
  'utf8'
);

/* .nojekyll wyłącza przetwarzanie przez Jekylla — bez tego GitHub Pages
   pomija pliki i katalogi zaczynające się od podkreślenia. */
writeFileSync(join(OUT, '.nojekyll'), '', 'utf8');

console.log(`\n  Kopia podglądowa: ${OUT}`);
console.log(`  Prefiks ścieżek:  ${BASE}/`);
console.log(`  Podstrony: ${htmlCount}   pozostałe pliki: ${assetCount}`);
console.log(`  Indeksowanie: zablokowane (meta noindex + robots.txt)\n`);
