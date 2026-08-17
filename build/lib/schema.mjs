/* ==========================================================================
   Dane strukturalne schema.org (JSON-LD)
   --------------------------------------------------------------------------
   Wszystkie encje trafiają do jednego bloku @graph i są ze sobą powiązane
   przez @id. To ważne: rozproszone, niepowiązane bloki JSON-LD Google
   traktuje jako osobne, niepewne byty. Jeden spójny graf z odwołaniami
   (publisher → Organization, isPartOf → WebSite) daje wyszukiwarce jasny
   obraz: kto publikuje, gdzie i o czym.

   Zasada nadrzędna: opisujemy WYŁĄCZNIE to, co użytkownik widzi na stronie.
   Znaczniki opisujące treść nieobecną na stronie łamią wytyczne Google
   dotyczące danych strukturalnych i grożą ręczną karą.
   ========================================================================== */

import { site, areas } from '../content/site.mjs';

const ID = {
  org: `${site.url}/#organizacja`,
  website: `${site.url}/#witryna`
};

/* --------------------------------------------------------------------------
   ProfessionalService — firma jako lokalny podmiot gospodarczy.
   Typ ProfessionalService dziedziczy po LocalBusiness, więc niesie komplet
   sygnałów lokalnych (adres, geo, godziny), a jednocześnie precyzyjniej
   opisuje agencję niż ogólne LocalBusiness.
   -------------------------------------------------------------------------- */
export function organizationSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  if (site.googleBusinessProfile) sameAs.push(site.googleBusinessProfile);

  const node = {
    '@type': ['ProfessionalService', 'Organization'],
    '@id': ID.org,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/`,
    description: `${site.name} — agencja SEO i tworzenia stron internetowych działająca na terenie Podhala. Pozycjonowanie lokalne, strony WWW, audyty SEO i kampanie Google Ads.`,
    slogan: site.slogan,
    foundingDate: site.founded,
    telephone: site.phone,
    email: site.email,
    vatID: site.vatId,
    priceRange: '$$',
    logo: {
      '@type': 'ImageObject',
      '@id': `${site.url}/#logo`,
      url: `${site.url}/assets/img/logo.svg`,
      contentUrl: `${site.url}/assets/img/logo.svg`,
      width: 512,
      height: 512,
      caption: site.name
    },
    image: `${site.url}/assets/img/og-default.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.city,
      postalCode: site.postalCode,
      addressRegion: site.region,
      addressCountry: site.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng
    },
    openingHoursSpecification: site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.from,
      closes: h.to
    })),
    /* Obszar obsługi — komplet miejscowości, także tych bez własnej
       podstrony. Dzięki temu zasięg działania jest zadeklarowany wprost,
       bez tworzenia pustych stron pod każdą wieś. */
    areaServed: areas.map((a) => ({
      '@type': 'City',
      name: a.name
    })),
    knowsLanguage: ['pl-PL'],
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone,
      email: site.email,
      contactType: 'sprzedaż',
      areaServed: 'PL',
      availableLanguage: ['Polish']
    }
  };

  /* UWAGA: świadomie NIE dodajemy tu aggregateRating ani review.
     Znacznik ocen wolno wystawić tylko wtedy, gdy opinie są prawdziwe,
     zebrane od klientów i widoczne na stronie. Sztuczne oceny to
     najczęstsza przyczyna ręcznych kar za dane strukturalne.
     Gdy zbierzesz realne opinie — patrz README, sekcja „Opinie". */

  return node;
}

/* --------------------------------------------------------------------------
   WebSite + SearchAction — bez tego Google nie ma podstawy, by pokazać
   pole wyszukiwania w obrębie witryny (sitelinks searchbox).
   -------------------------------------------------------------------------- */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${site.url}/`,
    name: site.name,
    description: site.slogan,
    publisher: { '@id': ID.org },
    inLanguage: site.lang
  };
}

/* --------------------------------------------------------------------------
   WebPage — konkretna podstrona osadzona w witrynie.
   -------------------------------------------------------------------------- */
export function webPageSchema({ url, title, description, breadcrumbs, modified }) {
  const node = {
    '@type': 'WebPage',
    '@id': `${url}#strona`,
    url,
    name: title,
    description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.org },
    inLanguage: site.lang
  };
  if (modified) node.dateModified = modified;
  if (breadcrumbs && breadcrumbs.length > 1) {
    node.breadcrumb = { '@id': `${url}#okruszki` };
  }
  return node;
}

/* --------------------------------------------------------------------------
   BreadcrumbList — ścieżka nawigacyjna. Google wykorzystuje ją do
   zamiany surowego adresu URL w wyniku wyszukiwania na czytelną ścieżkę.
   -------------------------------------------------------------------------- */
export function breadcrumbSchema(url, crumbs) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#okruszki`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? absolute(c.href) : undefined
    }))
  };
}

/* --------------------------------------------------------------------------
   Service — pojedyncza usługa agencji.
   -------------------------------------------------------------------------- */
export function serviceSchema({ url, name, description, serviceType }) {
  return {
    '@type': 'Service',
    '@id': `${url}#usluga`,
    name,
    description,
    serviceType: serviceType || name,
    provider: { '@id': ID.org },
    areaServed: areas.map((a) => ({ '@type': 'City', name: a.name })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: site.phone
    }
  };
}

/* --------------------------------------------------------------------------
   FAQPage — pytania i odpowiedzi.
   Warunek konieczny: każde pytanie i każda odpowiedź muszą być widoczne
   w treści strony. Dlatego generator przyjmuje tę samą tablicę, z której
   renderowana jest sekcja FAQ — nie da się ich rozjechać.
   -------------------------------------------------------------------------- */
export function faqSchema(url, items) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripTags(it.a)
      }
    }))
  };
}

/* --------------------------------------------------------------------------
   Article — wpis blogowy.
   -------------------------------------------------------------------------- */
export function articleSchema({ url, title, description, published, modified, author, image, words, section }) {
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#artykul`,
    headline: title,
    description,
    datePublished: published,
    dateModified: modified || published,
    author: {
      '@type': 'Person',
      name: author,
      worksFor: { '@id': ID.org }
    },
    publisher: { '@id': ID.org },
    mainEntityOfPage: { '@id': `${url}#strona` },
    image: image ? absolute(image) : `${site.url}/assets/img/og-default.png`,
    articleSection: section,
    wordCount: words,
    inLanguage: site.lang,
    isAccessibleForFree: true
  };
}

/* --------------------------------------------------------------------------
   Narzędzia
   -------------------------------------------------------------------------- */
export function absolute(href) {
  if (!href) return site.url + '/';
  if (/^https?:\/\//.test(href)) return href;
  return site.url + href;
}

/** Usuwa znaczniki HTML — w JSON-LD odpowiedzi FAQ mają być czystym tekstem. */
function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&oacute;/g, 'ó')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Składa końcowy blok <script type="application/ld+json">.
 * Znak `<` jest escapowany na < — inaczej ciąg "</" w treści
 * przedwcześnie zamknąłby element <script> i rozbił stronę.
 */
export function renderJsonLd(nodes) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean)
  };
  const json = JSON.stringify(graph, null, 2).replace(/</g, '\\u003C');
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

export { ID as schemaIds };
