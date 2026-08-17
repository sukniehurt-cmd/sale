/* ==========================================================================
   Komponenty — powtarzalne bloki treści
   --------------------------------------------------------------------------
   Każdy zwraca gotowy fragment HTML. Wspólne komponenty gwarantują, że
   hierarchia nagłówków, atrybuty ARIA i klasy są identyczne na wszystkich
   podstronach — a to właśnie te drobiazgi rozjeżdżają się najszybciej,
   gdy strony pisze się osobno.
   ========================================================================== */

import { site, services, areas } from '../content/site.mjs';
import { icon } from './icons.mjs';
import { esc, breadcrumbs } from './layout.mjs';

/* --------------------------------------------------------------------------
   Nagłówek podstrony (wszystko poza stroną główną)
   -------------------------------------------------------------------------- */
export function pageHead({ crumbs, eyebrow, h1, lead, meta }) {
  return `<section class="pagehead">
  <div class="wrap">
    ${breadcrumbs(crumbs)}
    <div class="pagehead__inner">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
      <h1>${h1}</h1>
      ${lead ? `<p class="pagehead__lead">${lead}</p>` : ''}
      ${meta || ''}
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------------------------------
   Nagłówek sekcji
   -------------------------------------------------------------------------- */
export function sectionHead({ eyebrow, h2, lead, center = false, id }) {
  return `<div class="head${center ? ' head--center' : ''}">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
      <h2${id ? ` id="${id}"` : ''}>${h2}</h2>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>`;
}

/* --------------------------------------------------------------------------
   Karta usługi
   -------------------------------------------------------------------------- */
export function serviceCard(s) {
  return `<article class="card card--hover">
        <div class="card__icon">${icon(s.icon)}</div>
        <h3><a href="/uslugi/${s.slug}/" style="text-decoration:none;color:inherit">${esc(s.name)}</a></h3>
        <p>${esc(s.short)}</p>
        <a class="card__link" href="/uslugi/${s.slug}/">
          Zobacz szczegóły <span class="sr-only">usługi ${esc(s.name)}</span>${icon('arrowRight')}
        </a>
      </article>`;
}

/** Siatka wszystkich usług; `except` pomija bieżącą (bez linkowania do siebie). */
export function servicesGrid(except) {
  const list = services.filter((s) => s.slug !== except);
  return `<div class="grid grid--${list.length === 3 ? '3' : '4'}">
      ${list.map(serviceCard).join('\n      ')}
    </div>`;
}

/* --------------------------------------------------------------------------
   Karta z ikoną — uniwersalna
   -------------------------------------------------------------------------- */
export function iconCard({ icon: ic, title, text, list, amber }) {
  return `<article class="card">
        <div class="card__icon${amber ? ' card__icon--amber' : ''}">${icon(ic)}</div>
        <h3>${esc(title)}</h3>
        ${text ? `<p>${text}</p>` : ''}
        ${
          list
            ? `<ul class="card__list">
          ${list.map((li) => `<li>${li}</li>`).join('\n          ')}
        </ul>`
            : ''
        }
      </article>`;
}

/* --------------------------------------------------------------------------
   Kroki procesu
   -------------------------------------------------------------------------- */
export function steps(items) {
  return `<div class="grid grid--4">
      ${items
        .map(
          (s, i) => `<article class="step">
        <p class="step__num" aria-hidden="true">${i + 1}</p>
        <h3><span class="sr-only">Krok ${i + 1}: </span>${esc(s.title)}</h3>
        <p>${s.text}</p>
      </article>`
        )
        .join('\n      ')}
    </div>`;
}

/* --------------------------------------------------------------------------
   Statystyki
   -------------------------------------------------------------------------- */
export function stats(items) {
  return `<div class="stats">
      ${items
        .map(
          (s) => `<div class="stat">
        <p class="stat__value">${esc(s.value)}</p>
        <p class="stat__label">${esc(s.label)}</p>
      </div>`
        )
        .join('\n      ')}
    </div>`;
}

/* --------------------------------------------------------------------------
   Sekcja FAQ
   --------------------------------------------------------------------------
   Zbudowana na natywnych <details>/<summary>: rozwija się bez JavaScriptu,
   obsługuje klawiaturę out of the box, a treść odpowiedzi jest w kodzie
   źródłowym od razu — robot Google widzi ją bez wykonywania skryptów.
   Ta sama tablica zasila znacznik FAQPage, więc treść i dane strukturalne
   nie mogą się rozminąć.
   -------------------------------------------------------------------------- */
export function faqList(items) {
  return `<div class="faq">
      ${items
        .map(
          (it) => `<details class="faq__item">
        <summary class="faq__q">${esc(it.q)}${icon('plus')}</summary>
        <div class="faq__a">${it.a}</div>
      </details>`
        )
        .join('\n      ')}
    </div>`;
}

/* --------------------------------------------------------------------------
   Opinie klientów
   --------------------------------------------------------------------------
   >>> DO_UZUPELNIENIA: poniższe opinie są przykładowe. <<<
   Zanim wystawisz stronę, zastąp je prawdziwymi wypowiedziami klientów
   (najlepiej z ich zgodą i nazwą firmy). Do czasu zebrania realnych opinii
   NIE dodawaj znacznika Review/AggregateRating — fikcyjne oceny w danych
   strukturalnych to prosta droga do ręcznej kary od Google.
   -------------------------------------------------------------------------- */
export function quotes(items) {
  const starRow = `<div class="quote__stars" role="img" aria-label="Ocena 5 na 5">${icon('star').repeat(5)}</div>`;
  return `<div class="grid grid--3">
      ${items
        .map(
          (q) => `<figure class="quote">
        ${starRow}
        <blockquote class="quote__text"><p>${q.text}</p></blockquote>
        <figcaption class="quote__author">
          <span class="quote__avatar" aria-hidden="true">${esc(q.initials)}</span>
          <span>
            <span class="quote__name">${esc(q.name)}</span>
            <span class="quote__role">${esc(q.role)}</span>
          </span>
        </figcaption>
      </figure>`
        )
        .join('\n      ')}
    </div>`;
}

/* --------------------------------------------------------------------------
   Obszar działania — linkowanie wewnętrzne do stron lokalnych
   -------------------------------------------------------------------------- */
export function areaChips(currentSlug) {
  return `<div class="areas">
      ${areas
        .map((a) => {
          if (a.slug === currentSlug) {
            return `<span class="area-chip area-chip--static" aria-current="page">${icon('mapPin')} ${esc(a.name)}</span>`;
          }
          return a.page
            ? `<a class="area-chip" href="/pozycjonowanie/${a.slug}/">${icon('mapPin')} ${esc(a.name)}</a>`
            : `<span class="area-chip area-chip--static">${icon('mapPin')} ${esc(a.name)}</span>`;
        })
        .join('\n      ')}
    </div>`;
}

/* --------------------------------------------------------------------------
   Pasek wezwania do działania
   -------------------------------------------------------------------------- */
export function ctaBand({ h2, text, primary, secondary } = {}) {
  return `<section class="section">
  <div class="wrap">
    <div class="cta-band">
      <h2>${h2 || 'Sprawdźmy, ile klientów tracisz w wyszukiwarce'}</h2>
      <p>${text || `Bezpłatna analiza widoczności Twojej strony i trzech konkurentów z regionu. Bez zobowiązań — dostajesz konkretną listę tego, co blokuje Cię w Google, nawet jeśli nie zdecydujesz się na współpracę.`}</p>
      <div class="btn-row btn-row--center">
        <a class="btn btn--amber" href="${primary?.href || '/kontakt/'}">${esc(primary?.label || 'Zamów bezpłatną analizę')}</a>
        <a class="btn btn--ghost-light" href="${secondary?.href || `tel:${site.phoneHref}`}">${esc(secondary?.label || `Zadzwoń: ${site.phone}`)}</a>
      </div>
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------------------------------
   Powiązane strony — linkowanie wewnętrzne
   --------------------------------------------------------------------------
   Świadomie ręczne, a nie automatyczne „polecane": linki mają prowadzić
   do stron faktycznie powiązanych tematycznie. Losowe linkowanie rozmywa
   przepływ mocy w obrębie serwisu.
   -------------------------------------------------------------------------- */
export function relatedLinks(items, title = 'Sprawdź również') {
  return `<section class="section section--tight section--snow">
  <div class="wrap">
    ${sectionHead({ h2: title })}
    <div class="linkbox">
      ${items
        .map(
          (i) => `<a href="${i.href}">
        <span class="linkbox__label">${esc(i.label)}</span>
        <span class="linkbox__title">${esc(i.title)}</span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------------------------------
   Sylwetka Tatr — dekoracja hero
   -------------------------------------------------------------------------- */
export function mountainRange() {
  /* aria-hidden: czysta dekoracja, nie niesie treści. */
  return `<svg class="hero__range" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M0 220V150l120-46 90 32 110-70 96 58 118-96 104 74 92-52 130 84 88-40 122 66 96-30 74 26v64z" fill="#0b1f33" opacity=".55"/>
    <path d="M0 220v-38l150-58 110 40 120-64 130 70 110-84 120 92 110-54 140 76 110-38 140 58 100-24v24z" fill="#071726" opacity=".8"/>
  </svg>`;
}

/* --------------------------------------------------------------------------
   Wizualizacja realizacji — wykres wzrostu widoczności
   -------------------------------------------------------------------------- */
export function caseChart(points, label) {
  /* Wykres rysowany z liczb przekazanych w tablicy `points` (0–100).
     role="img" + aria-label, bo sam kształt nic nie mówi czytnikowi ekranu —
     wartości liczbowe są dodatkowo wypisane tekstem w sekcji wyników. */
  const w = 480;
  const h = 260;
  const pad = 24;
  const stepX = (w - pad * 2) / (points.length - 1);
  const coords = points.map((p, i) => [pad + i * stepX, h - pad - (p / 100) * (h - pad * 2)]);
  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${(w - pad).toFixed(1)} ${h - pad} L${pad} ${h - pad} Z`;
  const dots = coords
    .map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#ffffff" stroke="#2e7d5b" stroke-width="2.5"/>`)
    .join('');
  const grid = [0, 1, 2, 3]
    .map((i) => {
      const y = pad + ((h - pad * 2) / 3) * i;
      return `<line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="#e2e8ed" stroke-width="1"/>`;
    })
    .join('');

  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" style="width:100%;height:auto;background:#f7fafc">
      <defs>
        <linearGradient id="g-${points.join('')}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3b9b72" stop-opacity=".28"/>
          <stop offset="100%" stop-color="#3b9b72" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${grid}
      <path d="${area}" fill="url(#g-${points.join('')})"/>
      <path d="${line}" fill="none" stroke="#2e7d5b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${dots}
    </svg>`;
}

/* --------------------------------------------------------------------------
   Okładka wpisu blogowego — generowana, bez plików graficznych
   -------------------------------------------------------------------------- */
export function postCover(seed) {
  /* Deterministyczny wzór z ziarna (tytułu wpisu): ta sama nazwa zawsze
     daje tę samą grafikę, więc okładki nie zmieniają się przy każdym buildzie. */
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) % 997;
  const a = 20 + (n % 40);
  const b = 55 + ((n >> 2) % 30);
  const c = 30 + ((n >> 4) % 45);

  return `<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="400" height="225" fill="#0f2a44"/>
      <circle cx="${320 + (n % 30)}" cy="${40 + (n % 25)}" r="26" fill="#e0a458" opacity=".85"/>
      <path d="M0 225V${140 + (n % 20)}l${a * 2} -${a}l${b} ${b / 2}l${c * 1.6} -${c * 1.4}l${a * 1.8} ${a}l${b * 1.4} -${b / 1.6}l${c * 2} ${c}l90 -40V225z" fill="#3b9b72" opacity=".55"/>
      <path d="M0 225V${175 + (n % 15)}l${b * 1.6} -${b / 1.4}l${a * 2.2} ${a / 1.5}l${c * 1.5} -${c}l${b * 2} ${b / 1.2}l120 -30V225z" fill="#16395b"/>
    </svg>`;
}

/* --------------------------------------------------------------------------
   Blok „dlaczego my" — używany na kilku podstronach
   -------------------------------------------------------------------------- */
export function trustBadges() {
  return `<div class="hero__badges">
        <span class="hero__badge">${icon('mapPin')} Działamy na Podhalu, nie zdalnie z drugiego końca Polski</span>
        <span class="hero__badge">${icon('chart')} Raport co miesiąc, bez ściemy</span>
        <span class="hero__badge">${icon('handshake')} Umowa bez okresu wypowiedzenia dłuższego niż miesiąc</span>
      </div>`;
}
