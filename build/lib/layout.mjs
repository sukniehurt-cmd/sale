/* ==========================================================================
   Layout — wspólna powłoka wszystkich podstron
   --------------------------------------------------------------------------
   Jedno miejsce, w którym powstaje <head>, nagłówek i stopka. Dzięki temu
   nie da się zapomnieć o canonicalu na jednej podstronie ani rozjechać
   nawigacji między stronami — najczęstsze źródła błędów SEO w serwisach
   klejonych ręcznie z osobnych plików HTML.
   ========================================================================== */

import { site, mainNav, services, areas } from '../content/site.mjs';
import { icon } from './icons.mjs';
import {
  organizationSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
  renderJsonLd,
  absolute
} from './schema.mjs';

/* --------------------------------------------------------------------------
   Escapowanie
   -------------------------------------------------------------------------- */
export function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* --------------------------------------------------------------------------
   Logo
   -------------------------------------------------------------------------- */
function logoMark() {
  /* Znak marki: stylizowany szczyt tatrzański wpisany w kwadrat.
     Inline SVG zamiast <img> — logo jest w nagłówku każdej strony,
     więc oszczędza to jedno zapytanie HTTP na ścieżce krytycznej. */
  return `<svg class="logo__mark" viewBox="0 0 48 48" role="img" aria-label="${esc(site.name)} — logo" focusable="false">
  <rect width="48" height="48" rx="11" fill="#0f2a44"/>
  <path d="M9 34.5 19 17l5.4 9.4L28.8 19 39 34.5z" fill="#3b9b72"/>
  <path d="M19 17l5.4 9.4-3.1 5.4L15.9 26z" fill="#2e7d5b"/>
  <path d="M28.8 19 33 26.2l-3.6 2.2-2.9-5z" fill="#e0a458"/>
  <circle cx="35.5" cy="13.5" r="3.4" fill="#e0a458"/>
</svg>`;
}

function logo(link = true, extraClass = '') {
  const inner = `${logoMark()}<span class="logo__text"><span class="logo__name">${esc(site.name)}</span><span class="logo__tag">${esc(site.tagline)}</span></span>`;
  return link
    ? `<a class="logo ${extraClass}" href="/"><span class="sr-only">Strona główna — </span>${inner}</a>`
    : `<div class="logo ${extraClass}">${inner}</div>`;
}

/* --------------------------------------------------------------------------
   Nagłówek
   -------------------------------------------------------------------------- */
function header(current) {
  const items = mainNav
    .map((item) => {
      const isActive =
        item.href === current ||
        (item.href !== '/' && current.startsWith(item.href)) ||
        (item.panel && item.panel.some((p) => p.href === current));

      /* aria-current="page" niesie stan aktywnej strony dla czytników
         ekranu; CSS podpina się pod ten sam atrybut, więc wygląd
         i dostępność nie mogą się rozjechać. */
      const aria = isActive ? ' aria-current="page"' : '';

      if (!item.panel) {
        return `<li class="nav__item"><a class="nav__link" href="${item.href}"${aria}>${esc(item.label)}</a></li>`;
      }

      const panelId = `panel-${item.label.toLowerCase().replace(/[^a-z]/g, '')}`;
      const links = item.panel
        .map(
          (p) => `<li><a class="nav__panel-link" href="${p.href}"${p.href === current ? ' aria-current="page"' : ''}>
              <span class="nav__panel-title">${esc(p.label)}</span>
              <span class="nav__panel-desc">${esc(p.desc)}</span>
            </a></li>`
        )
        .join('\n              ');

      /* Nagłówek podmenu jest linkiem do strony zbiorczej usług,
         a osobny przycisk rozwija listę. Gdyby rolę linku pełnił sam
         przycisk, strona /uslugi/ zostałaby odcięta od nawigacji
         i straciła wewnętrzne linkowanie. */
      return `<li class="nav__item nav__item--has-panel" data-open="false">
            <a class="nav__link" href="${item.href}"${aria}>${esc(item.label)}</a>
            <button class="nav__toggle nav__link" type="button" aria-expanded="false" aria-controls="${panelId}">
              <span class="sr-only">Rozwiń listę usług</span>${icon('chevronDown')}
            </button>
            <div class="nav__panel" id="${panelId}">
              <ul>
              ${links}
              </ul>
            </div>
          </li>`;
    })
    .join('\n          ');

  return `<header class="site-header" data-nav-open="false">
    <div class="wrap site-header__bar">
      ${logo()}

      <nav class="nav" id="nav-glowna" aria-label="Nawigacja główna">
        <ul class="nav__list">
          ${items}
        </ul>
        <div class="nav__mobile-cta">
          <a class="btn btn--ghost" href="tel:${site.phoneHref}">${icon('phone')} ${esc(site.phone)}</a>
          <a class="btn btn--primary" href="/kontakt/">Bezpłatna wycena</a>
        </div>
      </nav>

      <div class="header-cta">
        <a class="header-phone" href="tel:${site.phoneHref}">${icon('phone')} ${esc(site.phone)}</a>
        <a class="btn btn--primary" href="/kontakt/">Bezpłatna wycena</a>
      </div>

      <button class="burger" type="button" aria-expanded="false" aria-controls="nav-glowna" aria-label="Otwórz menu">
        <span class="burger__box">
          <span class="burger__line"></span>
          <span class="burger__line"></span>
          <span class="burger__line"></span>
        </span>
      </button>
    </div>
  </header>`;
}

/* --------------------------------------------------------------------------
   Stopka
   -------------------------------------------------------------------------- */
function footer() {
  const serviceLinks = services
    .map((s) => `<li><a href="/uslugi/${s.slug}/">${esc(s.name)}</a></li>`)
    .join('\n            ');

  const areaLinks = areas
    .filter((a) => a.page)
    .map((a) => `<li><a href="/pozycjonowanie/${a.slug}/">Pozycjonowanie ${esc(a.name)}</a></li>`)
    .join('\n            ');

  const socials = Object.entries(site.social)
    .filter(([, url]) => Boolean(url))
    .map(
      ([nazwa, url]) =>
        `<a href="${esc(url)}" rel="noopener noreferrer me" target="_blank" aria-label="${esc(site.name)} — ${esc(nazwa)} (otwiera się w nowej karcie)">${icon(nazwa)}</a>`
    )
    .join('\n          ');

  return `<footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">

        <div class="footer-brand">
          ${logo(true, 'logo--footer')}
          <p>Agencja SEO i tworzenia stron internetowych z Podhala. Pomagamy pensjonatom, restauracjom, wypożyczalniom i firmom usługowym zdobywać klientów z wyszukiwarki — przez cały rok, nie tylko w sezonie.</p>
          <div class="social">
          ${socials}
          </div>
        </div>

        <nav class="footer-col" aria-labelledby="stopka-uslugi">
          <h2 class="footer-col__title" id="stopka-uslugi">Usługi</h2>
          <ul>
            ${serviceLinks}
            <li><a href="/cennik/">Cennik</a></li>
          </ul>
        </nav>

        <nav class="footer-col" aria-labelledby="stopka-obszar">
          <h2 class="footer-col__title" id="stopka-obszar">Obszar działania</h2>
          <ul>
            ${areaLinks}
          </ul>
        </nav>

        <div class="footer-col">
          <h2 class="footer-col__title">Kontakt</h2>
          <ul>
            <li><a href="tel:${site.phoneHref}">${esc(site.phone)}</a></li>
            <li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>
            <li>${esc(site.street)}<br>${esc(site.postalCode)} ${esc(site.city)}</li>
            <li>${esc(site.openingHoursText)}</li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p>&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(site.legalName)}. NIP ${esc(site.vatId)}. Wszelkie prawa zastrzeżone.</p>
        <nav class="footer-legal" aria-label="Informacje prawne">
          <a href="/polityka-prywatnosci/">Polityka prywatności</a>
          <a href="/faq/">Pytania i odpowiedzi</a>
          <a href="/o-nas/">O nas</a>
        </nav>
      </div>
    </div>
  </footer>`;
}

/* --------------------------------------------------------------------------
   Okruszki nawigacyjne
   -------------------------------------------------------------------------- */
export function breadcrumbs(crumbs) {
  if (!crumbs || crumbs.length < 2) return '';
  const items = crumbs
    .map((c, i) => {
      const last = i === crumbs.length - 1;
      return last
        ? `<li><span aria-current="page">${esc(c.label)}</span></li>`
        : `<li><a href="${c.href}">${esc(c.label)}</a></li>`;
    })
    .join('\n        ');

  return `<nav class="crumbs" aria-label="Ścieżka nawigacyjna">
      <ol class="crumbs__list">
        ${items}
      </ol>
    </nav>`;
}

/* ==========================================================================
   Kompletny dokument HTML
   ==========================================================================
   @param {object} p
   @param {string} p.path         adres podstrony, np. "/uslugi/audyt-seo/"
   @param {string} p.title        <title> — do 60 znaków
   @param {string} p.description  meta description — 120–158 znaków
   @param {string} p.body         gotowy HTML treści
   @param {array}  p.crumbs       okruszki [{label, href}]
   @param {array}  p.schema       dodatkowe encje JSON-LD
   @param {string} p.ogImage      ścieżka do obrazu OG
   @param {string} p.ogType       website | article
   @param {boolean} p.noindex     wyłącza indeksowanie (np. 404)
   @param {string} p.modified     data ostatniej modyfikacji (ISO)
   ========================================================================== */
export function page(p) {
  const url = absolute(p.path);
  const ogImage = absolute(p.ogImage || '/assets/img/og-default.png');
  const crumbs = p.crumbs || [];

  /* Graf danych strukturalnych. Kolejność bez znaczenia dla robota,
     ale utrzymana od ogółu do szczegółu dla czytelności. */
  const graph = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      url,
      title: p.title,
      description: p.description,
      breadcrumbs: crumbs,
      modified: p.modified
    }),
    crumbs.length > 1 ? breadcrumbSchema(url, crumbs) : null,
    ...(p.schema || [])
  ];

  const robots = p.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- ===== Podstawowe znaczniki SEO ===== -->
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${esc(url)}">
<meta name="robots" content="${robots}">
<meta name="author" content="${esc(site.name)}">

<!-- Zasięg geograficzny — wspiera dopasowanie do zapytań lokalnych -->
<meta name="geo.region" content="PL-MA">
<meta name="geo.placename" content="${esc(site.city)}">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}">

<!-- ===== Open Graph (Facebook, LinkedIn, komunikatory) ===== -->
<meta property="og:type" content="${p.ogType || 'website'}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(p.ogImageAlt || site.name + ' — ' + site.slogan)}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">${
    p.article
      ? `
<meta property="article:published_time" content="${p.article.published}">
<meta property="article:modified_time" content="${p.article.modified || p.article.published}">
<meta property="article:author" content="${esc(p.article.author)}">
<meta property="article:section" content="${esc(p.article.section)}">`
      : ''
  }

<!-- ===== Twitter / X ===== -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<meta name="twitter:image:alt" content="${esc(p.ogImageAlt || site.name + ' — ' + site.slogan)}">

<!-- ===== Ikony i motyw ===== -->
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0f2a44">

<!-- ===== Zasoby ===== -->
<!--
  Fonty i style leżą na tej samej domenie, więc nie ma potrzeby preconnect.
  Preload dotyczy wyłącznie podzbioru latin obu krojów — to on renderuje
  pierwszy widoczny tekst (LCP). Podzbiór latin-ext przeglądarka dobierze
  sama, gdy natrafi na polskie znaki diakrytyczne.
-->
<link rel="preload" href="/assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/sora-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/fonts.css">
<link rel="stylesheet" href="/assets/css/style.css">
<script src="/assets/js/main.js" defer></script>

<!-- ===== Dane strukturalne ===== -->
${renderJsonLd(graph)}
</head>
<body>

<a class="skip-link" href="#tresc">Przejdź do treści</a>

${header(p.path)}

<main id="tresc">
${p.body}
</main>

${footer()}

</body>
</html>
`;
}
