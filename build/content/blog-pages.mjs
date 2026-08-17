/* ==========================================================================
   Blog — strona listy i strony pojedynczych wpisów
   --------------------------------------------------------------------------
   Strony generują się z tablicy `posts` (blog.mjs). Dodanie nowego wpisu
   nie wymaga dotykania tego pliku ani sitemap.xml.
   ========================================================================== */

import { site } from './site.mjs';
import { posts } from './blog.mjs';
import { icon } from '../lib/icons.mjs';
import { articleSchema } from '../lib/schema.mjs';
import { pageHead, sectionHead, postCover, ctaBand, relatedLinks } from '../lib/components.mjs';

const HOME_CRUMB = { label: 'Strona główna', href: '/' };
const BLOG_CRUMB = { label: 'Blog', href: '/blog/' };

/* --------------------------------------------------------------------------
   Kafelek wpisu — używany na liście bloga i na stronie głównej
   -------------------------------------------------------------------------- */
export function postCard(p) {
  return `<article class="post-card">
        <div class="post-card__cover">${postCover(p.slug)}</div>
        <div class="post-card__body">
          <div class="post-card__meta">
            <span class="post-card__cat">${p.category}</span>
            <time datetime="${p.published}">${p.publishedText}</time>
            <span aria-hidden="true">·</span>
            <span>${p.readingTime} min czytania</span>
          </div>
          <h2 style="font-size:var(--fs-h4);margin-bottom:.75rem"><a href="/blog/${p.slug}/">${p.title}</a></h2>
          <p>${p.excerpt}</p>
          <a class="card__link" href="/blog/${p.slug}/">
            Czytaj dalej<span class="sr-only">: ${p.title}</span>${icon('arrowRight')}
          </a>
        </div>
      </article>`;
}

/* ==========================================================================
   /blog/
   ========================================================================== */
export const blogIndexPage = {
  path: '/blog/',
  title: 'Blog — poradniki SEO i strony WWW dla firm z Podhala',
  description:
    'Praktyczne poradniki o pozycjonowaniu, wizytówce Google i stronach internetowych. Piszemy o rzeczach, które możesz wdrożyć samodzielnie.',
  crumbs: [HOME_CRUMB, { label: 'Blog' }],
  modified: posts[0].modified,
  ogImage: '/assets/img/og-blog.png',
  ogImageAlt: 'Tatry Marketing — poradniki SEO dla firm z Podhala',
  body: `
${pageHead({
  crumbs: [HOME_CRUMB, { label: 'Blog' }],
  eyebrow: 'Baza wiedzy',
  h1: 'Poradniki dla firm z Podhala',
  lead: 'Piszemy o rzeczach, które możesz wdrożyć samodzielnie — nawet jeśli nigdy nie zdecydujesz się na współpracę z agencją. Bez ogólników i bez ukrytej reklamy w co drugim akapicie.'
})}

<section class="section">
  <div class="wrap">
    <div class="posts">
      ${posts.map(postCard).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Masz temat?',
      h2: 'O czym chcesz przeczytać?',
      lead: 'Piszemy o problemach, które realnie zgłaszają nam klienci. Jeśli masz pytanie, na które nie znajdujesz odpowiedzi w internecie — napisz, a przygotujemy o tym tekst.',
      center: true
    })}
    <div class="btn-row btn-row--center">
      <a class="btn btn--primary" href="/kontakt/">Zaproponuj temat</a>
    </div>
  </div>
</section>

${ctaBand()}
`
};

/* ==========================================================================
   Strony pojedynczych wpisów
   ========================================================================== */
export const blogPostPages = posts.map((p, index) => {
  const url = `${site.url}/blog/${p.slug}/`;
  const crumbs = [HOME_CRUMB, BLOG_CRUMB, { label: p.title }];

  /* Kolejny i poprzedni wpis — proste linkowanie wewnętrzne, dzięki któremu
     żaden artykuł nie zostaje odcięty od reszty serwisu. */
  const others = posts.filter((_, i) => i !== index).slice(0, 3);

  /* Liczba słów do znacznika BlogPosting — liczona z faktycznej treści,
     żeby nie deklarować wartości niezgodnej ze stanem strony. */
  const words = p.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

  return {
    path: `/blog/${p.slug}/`,
    title: p.metaTitle,
    ogTitle: p.title,
    description: p.metaDescription,
    crumbs,
    ogType: 'article',
    modified: p.modified,
    ogImage: '/assets/img/og-blog.png',
    ogImageAlt: `${p.category} — ${p.title}`,
    article: {
      published: p.published,
      modified: p.modified,
      author: p.author,
      section: p.category
    },
    schema: [
      articleSchema({
        url,
        title: p.title,
        description: p.metaDescription,
        published: p.published,
        modified: p.modified,
        author: p.author,
        words,
        section: p.category
      })
    ],
    body: `
${pageHead({
  crumbs,
  eyebrow: p.category,
  h1: p.title,
  meta: `<div class="article-meta">
        <span>${p.author}</span>
        <span class="article-meta__dot" aria-hidden="true">·</span>
        <span>Opublikowano <time datetime="${p.published}">${p.publishedText}</time></span>
        <span class="article-meta__dot" aria-hidden="true">·</span>
        <span>Aktualizacja <time datetime="${p.modified}">${p.modifiedText}</time></span>
        <span class="article-meta__dot" aria-hidden="true">·</span>
        <span>${p.readingTime} min czytania</span>
      </div>`
})}

<section class="section">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:minmax(0,1fr);justify-items:center">
      <div style="max-width:44rem;width:100%">

        <nav class="toc" aria-labelledby="spis-tresci">
          <p class="toc__title" id="spis-tresci">W tym artykule</p>
          <ol>
            ${p.toc.map((t) => `<li><a href="#${t.id}">${t.label}</a></li>`).join('\n            ')}
          </ol>
        </nav>

        <article class="prose" style="margin-top:2.5rem">
          ${p.body}
        </article>

        <div style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--line)">
          <p style="font-size:.9375rem;color:var(--muted)">
            <strong style="color:var(--ink)">${p.author}</strong> — ${p.authorRole}.
            Tekst powstał na podstawie projektów prowadzonych dla firm z Podhala.
            Masz pytanie do tego materiału? <a href="/kontakt/">Napisz do nas</a>.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>

${relatedLinks(
  [
    ...others.map((o) => ({
      label: o.category,
      title: o.title,
      href: `/blog/${o.slug}/`
    })),
    { label: 'Usługi', title: 'Zobacz, jak możemy pomóc', href: '/uslugi/' }
  ],
  'Przeczytaj również'
)}

${ctaBand()}
`
  };
});

export const blogPages = [blogIndexPage, ...blogPostPages];
