#!/usr/bin/env node
/* ==========================================================================
   Generator statyczny — Tatry Marketing
   --------------------------------------------------------------------------
   Uruchomienie:  node build/build.mjs   (albo: npm run build)

   Skrypt zamienia moduły z build/content/ na gotowe pliki HTML w katalogu
   głównym repozytorium, a przy okazji generuje sitemap.xml, robots.txt
   i manifest. Nie korzysta z żadnych zewnętrznych zależności — działa
   na czystym Node (18+).

   Dlaczego generator, skoro wynikiem są statyczne pliki HTML?
   Bo nagłówek, stopka i sekcja <head> istnieją w jednym miejscu. Przy
   dwudziestu jeden podstronach klejonych ręcznie prędzej czy później
   któraś zostaje bez canonicala albo ze starym menu — a to są dokładnie
   te błędy, które kosztują widoczność.
   ========================================================================== */

import { writeFileSync, mkdirSync, existsSync, rmSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from './content/site.mjs';
import { page } from './lib/layout.mjs';
import { homePage } from './content/home.mjs';
import { servicePages } from './content/services.mjs';
import { localPages } from './content/local.mjs';
import { otherPages } from './content/pages.mjs';
import { blogPages } from './content/blog-pages.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* --------------------------------------------------------------------------
   Komplet podstron
   -------------------------------------------------------------------------- */
const pages = [homePage, ...servicePages, ...localPages, ...blogPages, ...otherPages];

/* --------------------------------------------------------------------------
   Priorytety i częstotliwość zmian w sitemap.xml
   --------------------------------------------------------------------------
   Google traktuje te wartości jako wskazówkę, nie polecenie, ale porządkują
   one strukturę serwisu i nic nie kosztują. Strony prawne i błędu do mapy
   nie trafiają.
   -------------------------------------------------------------------------- */
function sitemapMeta(path) {
  if (path === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (path === '/uslugi/' || path.startsWith('/uslugi/')) return { priority: '0.9', changefreq: 'monthly' };
  if (path.startsWith('/pozycjonowanie/')) return { priority: '0.8', changefreq: 'monthly' };
  if (path === '/kontakt/' || path === '/cennik/') return { priority: '0.8', changefreq: 'monthly' };
  if (path === '/blog/') return { priority: '0.7', changefreq: 'weekly' };
  if (path.startsWith('/blog/')) return { priority: '0.6', changefreq: 'yearly' };
  return { priority: '0.5', changefreq: 'yearly' };
}

const EXCLUDED_FROM_SITEMAP = ['/404.html', '/polityka-prywatnosci/'];

/* --------------------------------------------------------------------------
   Zapis pliku wraz z utworzeniem katalogów pośrednich
   -------------------------------------------------------------------------- */
function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  return full;
}

/* --------------------------------------------------------------------------
   Adres URL → ścieżka pliku
   /uslugi/audyt-seo/  →  uslugi/audyt-seo/index.html
   --------------------------------------------------------------------------
   Katalog + index.html daje adresy z ukośnikiem na końcu, bez rozszerzenia
   .html. Taki adres jest czytelniejszy i — co ważniejsze — nie zmieni się,
   gdy kiedyś podmienisz technologię. Zmiana struktury adresów to najdroższa
   operacja w SEO, więc lepiej od razu ustawić ją docelowo.
   -------------------------------------------------------------------------- */
function outPath(p) {
  if (p.outFile) return p.outFile;
  if (p.path === '/') return 'index.html';
  return join(p.path.replace(/^\/|\/$/g, ''), 'index.html');
}

/* --------------------------------------------------------------------------
   Czyszczenie poprzedniego wyniku
   --------------------------------------------------------------------------
   Usuwamy wyłącznie katalogi, które sami generujemy. Nigdy nie dotykamy
   assets/, build/ ani .git/ — dlatego lista jest jawna, a nie wyliczana.
   -------------------------------------------------------------------------- */
const GENERATED_DIRS = ['uslugi', 'pozycjonowanie', 'blog', 'realizacje', 'cennik', 'o-nas', 'kontakt', 'faq', 'polityka-prywatnosci'];

function clean() {
  for (const dir of GENERATED_DIRS) {
    const full = join(ROOT, dir);
    if (existsSync(full)) rmSync(full, { recursive: true, force: true });
  }
}

/* ==========================================================================
   Walidacja — uruchamiana przy każdym buildzie
   --------------------------------------------------------------------------
   Sensem tych kontroli jest wychwycenie błędów SEO w momencie ich powstania,
   a nie trzy miesiące później w Search Console. Build kończy się kodem
   błędu, jeśli którakolwiek reguła krytyczna zostanie złamana.
   ========================================================================== */
const problems = [];
const warnings = [];

function validate(p, html) {
  const label = p.path;

  /* --- Title: 30–60 znaków ---
     Powyżej ~60 znaków Google ucina tytuł w wynikach wyszukiwania.
     Poniżej 30 zwykle marnuje się miejsce na frazy. */
  if (!p.title) problems.push(`${label}: brak title`);
  else if (p.title.length > 60) warnings.push(`${label}: title ma ${p.title.length} znaków (zalecane ≤ 60) — Google go utnie`);
  else if (p.title.length < 30) warnings.push(`${label}: title ma tylko ${p.title.length} znaków — zmarnowane miejsce`);

  /* --- Meta description: 120–160 znaków ---
     Dolnego progu nie egzekwujemy na stronach z noindex (np. 404) —
     one i tak nie trafiają do wyników wyszukiwania. */
  if (!p.description) problems.push(`${label}: brak meta description`);
  else if (p.description.length > 160) warnings.push(`${label}: description ma ${p.description.length} znaków (zalecane ≤ 160)`);
  else if (p.description.length < 70 && !p.noindex) warnings.push(`${label}: description ma tylko ${p.description.length} znaków`);

  /* --- Dokładnie jeden <h1> --- */
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count === 0) problems.push(`${label}: brak <h1>`);
  else if (h1Count > 1) problems.push(`${label}: ${h1Count} nagłówków <h1> — powinien być dokładnie jeden`);

  /* --- Canonical --- */
  if (!html.includes('rel="canonical"')) problems.push(`${label}: brak linku canonical`);

  /* --- Poprawność JSON-LD ---
     Błąd składni w danych strukturalnych jest niewidoczny na stronie,
     a unieważnia cały blok. Dlatego parsujemy go przy każdym buildzie. */
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ldMatch) {
    problems.push(`${label}: brak danych strukturalnych JSON-LD`);
  } else {
    try {
      JSON.parse(ldMatch[1].replace(/\\u003C/g, '<'));
    } catch (e) {
      problems.push(`${label}: niepoprawny JSON-LD — ${e.message}`);
    }
  }

  /* --- Obrazy bez atrybutu alt ---
     Dotyczy <img>. Ikony SVG są oznaczone aria-hidden i nie wymagają alt. */
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  for (const img of imgs) {
    if (!/\salt\s*=/.test(img)) problems.push(`${label}: <img> bez atrybutu alt — ${img.slice(0, 70)}`);
  }

  /* --- Atrybut lang --- */
  if (!html.includes('<html lang="pl">')) problems.push(`${label}: brak atrybutu lang na <html>`);

  /* --- Open Graph --- */
  for (const prop of ['og:title', 'og:description', 'og:image', 'og:url']) {
    if (!html.includes(`property="${prop}"`)) problems.push(`${label}: brak znacznika ${prop}`);
  }

  /* --- Linki otwierane w nowej karcie muszą mieć rel="noopener" --- */
  const blankLinks = html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || [];
  for (const a of blankLinks) {
    if (!/rel="[^"]*noopener/.test(a)) warnings.push(`${label}: target="_blank" bez rel="noopener"`);
  }
}

/* --------------------------------------------------------------------------
   Kontrola linków wewnętrznych — czy każdy prowadzi do istniejącej strony
   -------------------------------------------------------------------------- */
function checkInternalLinks(rendered) {
  const known = new Set(pages.map((p) => p.path));
  known.add('/404.html');

  for (const { p, html } of rendered) {
    const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
    for (const href of new Set(hrefs)) {
      // Pliki statyczne sprawdzamy na dysku, nie na liście podstron
      if (/\.(css|js|svg|png|ico|xml|txt|webmanifest|woff2|jpg|jpeg|webp)$/.test(href)) {
        if (!existsSync(join(ROOT, href))) {
          problems.push(`${p.path}: link do nieistniejącego pliku ${href}`);
        }
        continue;
      }
      if (!known.has(href)) {
        problems.push(`${p.path}: link do nieistniejącej podstrony ${href}`);
      }
    }
  }
}

/* --------------------------------------------------------------------------
   Kontrola plików wideo dla sekcji hero
   --------------------------------------------------------------------------
   Brak nagrania nie jest błędem — strona działa wtedy na samym plakacie,
   dokładnie jak przed wprowadzeniem wideo. Ale łatwo o tym zapomnieć
   po wgraniu serwisu na serwer, więc build o tym przypomina.
   -------------------------------------------------------------------------- */
function checkHeroVideo() {
  const v = site.heroVideo;
  if (!v || !v.enabled) return;

  const isExternal = (p) => /^https?:\/\//.test(p);

  /* Adresy zewnętrzne (CDN) sprawdzamy tylko pod kątem sensowności —
     istnienia pliku na cudzym serwerze i tak nie zweryfikujemy offline. */
  for (const key of ['webm', 'mp4']) {
    const src = v[key];
    if (!src || !isExternal(src)) continue;

    if (/drive\.google|docs\.google|youtube|youtu\.be|vimeo|dropbox/.test(src)) {
      problems.push(
        `sekcja hero: ${src} nie jest bezpośrednim adresem pliku wideo. ` +
          `Dysk Google, YouTube, Vimeo i Dropbox nie pozwalają na użycie ich jako źródła <video> — ` +
          `pobierz nagranie i wgraj je do assets/video/ albo na własny CDN (patrz README)`
      );
    } else {
      warnings.push(
        `sekcja hero: nagranie ładowane z obcego serwera (${new URL(src).host}) — ` +
          `pamiętaj o dopisaniu media-src do Content-Security-Policy w .htaccess`
      );
    }
  }

  const missing = ['webm', 'mp4']
    .map((k) => v[k])
    .filter(Boolean)
    .filter((p) => !isExternal(p))
    .filter((p) => !existsSync(join(ROOT, p)));

  if (missing.length === 2) {
    warnings.push(
      `sekcja hero: brak plików wideo (${missing.join(', ')}) — wyświetli się sam plakat. ` +
        `Wgraj je do assets/video/ albo ustaw heroVideo.enabled = false w site.mjs`
    );
  } else if (missing.length === 1) {
    warnings.push(`sekcja hero: brak pliku ${missing[0]} — zostanie użyty tylko drugi format`);
  }

  if (v.poster && !existsSync(join(ROOT, v.poster))) {
    problems.push(`sekcja hero: brak plakatu ${v.poster} — uruchom: npm run images`);
  }
}

/* --------------------------------------------------------------------------
   Kontrola unikalności tytułów i opisów
   --------------------------------------------------------------------------
   Dwie podstrony z identycznym title to sygnał, że konkurują ze sobą
   o tę samą frazę — Google zgłasza to w Search Console jako duplikat.
   -------------------------------------------------------------------------- */
function checkUniqueness() {
  const titles = new Map();
  const descs = new Map();
  for (const p of pages) {
    if (titles.has(p.title)) problems.push(`Zduplikowany title: "${p.title}" — ${p.path} i ${titles.get(p.title)}`);
    else titles.set(p.title, p.path);

    if (descs.has(p.description)) problems.push(`Zduplikowana description: ${p.path} i ${descs.get(p.description)}`);
    else descs.set(p.description, p.path);
  }
}

/* ==========================================================================
   sitemap.xml
   ========================================================================== */
function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);

  const urls = pages
    .filter((p) => !p.noindex && !EXCLUDED_FROM_SITEMAP.includes(p.path))
    .map((p) => {
      const meta = sitemapMeta(p.path);
      const loc = site.url + p.path;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${p.modified || today}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Mapa strony generowana automatycznie przez build/build.mjs.
  Nie edytuj ręcznie — zmiany zostaną nadpisane przy kolejnym buildzie.
  Po wdrożeniu zgłoś ten adres w Google Search Console.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>
`;
}

/* ==========================================================================
   robots.txt
   ========================================================================== */
function buildRobots() {
  return `# ==========================================================================
# robots.txt — ${site.name}
# ==========================================================================
# Serwis jest w całości przeznaczony do indeksowania. Blokujemy wyłącznie
# katalog z kodem generatora, który nie zawiera treści dla użytkowników.

User-agent: *
Allow: /
Disallow: /build/

# Boty scrapujące treść pod modele językowe — odkomentuj, jeśli nie chcesz,
# by treści z bloga trafiały do zbiorów treningowych. Uwaga: blokada
# GPTBot nie wpływa na widoczność w Google.
# User-agent: GPTBot
# Disallow: /
# User-agent: CCBot
# Disallow: /

# Mapa strony
Sitemap: ${site.url}/sitemap.xml
`;
}

/* ==========================================================================
   site.webmanifest
   ========================================================================== */
function buildManifest() {
  return JSON.stringify(
    {
      name: `${site.name} — ${site.tagline}`,
      short_name: site.name,
      description: site.slogan,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0f2a44',
      lang: 'pl-PL',
      dir: 'ltr',
      icons: [
        { src: '/assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/assets/img/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    },
    null,
    2
  );
}

/* ==========================================================================
   .htaccess — konfiguracja dla serwerów Apache
   ========================================================================== */
function buildHtaccess() {
  return `# ==========================================================================
# .htaccess — ${site.name}
# --------------------------------------------------------------------------
# Plik działa na serwerach Apache (większość hostingów współdzielonych w PL).
# Na nginx, Netlify, Vercel czy GitHub Pages jest ignorowany — tam trzeba
# odpowiedniki wpisać w konfiguracji danej platformy (patrz README).
# ==========================================================================

# --- Strona błędu 404 -----------------------------------------------------
ErrorDocument 404 /404.html

# --- Kanoniczny adres -----------------------------------------------------
# Jeden adres = jedna strona. Bez tych reguł ta sama treść jest dostępna pod
# http://, https://, z www i bez www — Google widzi wtedy cztery kopie
# i musi zgadywać, którą indeksować.
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Wymuszenie HTTPS
  RewriteCond %{HTTPS} !=on
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Usunięcie www
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^(.*)$ https://%1%{REQUEST_URI} [L,R=301]

  # Dodanie ukośnika na końcu adresu katalogu
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(/$|\\.)
  RewriteRule ^(.*)$ /$1/ [L,R=301]
</IfModule>

# --- Kompresja ------------------------------------------------------------
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# --- Cache przeglądarki ---------------------------------------------------
# Fonty i obrazy zmieniają się rzadko, więc mogą leżeć w cache rok.
# HTML nie może — inaczej odwiedzający nie zobaczy aktualizacji treści.
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html                 "access plus 0 seconds"
  ExpiresByType text/css                  "access plus 1 year"
  ExpiresByType application/javascript    "access plus 1 year"
  ExpiresByType font/woff2                "access plus 1 year"
  ExpiresByType image/svg+xml             "access plus 6 months"
  ExpiresByType image/png                 "access plus 6 months"
  ExpiresByType image/jpeg                "access plus 6 months"
  ExpiresByType image/webp                "access plus 6 months"
  ExpiresByType video/webm                "access plus 6 months"
  ExpiresByType video/mp4                 "access plus 6 months"
  ExpiresByType application/xml           "access plus 1 day"
</IfModule>

# --- Nagłówki bezpieczeństwa ---------------------------------------------
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"

  # Strona nie ładuje żadnych zasobów z zewnątrz — dlatego polityka
  # może być tak restrykcyjna. Po dodaniu Analytics albo osadzonej mapy
  # trzeba ją rozszerzyć, inaczej te elementy przestaną działać.
  # media-src 'self' wystarcza, gdy wideo hero leży w assets/video/.
  # Jeśli serwujesz je z CDN, dopisz tam jego adres, np.:
  #   media-src 'self' https://cdn.twojadomena.pl;
  Header set Content-Security-Policy "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; media-src 'self'; form-action 'self'; frame-ancestors 'self'; base-uri 'self'"
</IfModule>

# --- Kodowanie znaków -----------------------------------------------------
AddDefaultCharset UTF-8
`;
}

/* ==========================================================================
   Uruchomienie
   ========================================================================== */
function main() {
  const t0 = Date.now();
  console.log('\n\x1b[1m  Tatry Marketing — generowanie serwisu\x1b[0m\n');

  clean();

  const rendered = [];
  for (const p of pages) {
    const html = page(p);
    validate(p, html);
    const file = outPath(p);
    write(file, html);
    rendered.push({ p, html, file });
  }

  write('sitemap.xml', buildSitemap());
  write('robots.txt', buildRobots());
  write('site.webmanifest', buildManifest());
  write('.htaccess', buildHtaccess());

  checkUniqueness();
  checkInternalLinks(rendered);
  checkHeroVideo();

  /* --- Podsumowanie --- */
  for (const { p, file, html } of rendered) {
    const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
    console.log(`  \x1b[32m✓\x1b[0m  ${file.padEnd(46)} ${kb.padStart(6)} kB   ${p.path}`);
  }

  console.log(`\n  \x1b[32m✓\x1b[0m  sitemap.xml, robots.txt, site.webmanifest, .htaccess`);
  console.log(`\n  Wygenerowano \x1b[1m${rendered.length}\x1b[0m podstron w ${Date.now() - t0} ms\n`);

  if (warnings.length) {
    console.log('  \x1b[33mOstrzeżenia:\x1b[0m');
    for (const w of warnings) console.log(`    ! ${w}`);
    console.log('');
  }

  if (problems.length) {
    console.log('  \x1b[31mBłędy:\x1b[0m');
    for (const e of problems) console.log(`    ✗ ${e}`);
    console.log('');
    process.exitCode = 1;
  } else {
    console.log('  \x1b[32mWalidacja SEO: bez błędów.\x1b[0m\n');
  }
}

main();
