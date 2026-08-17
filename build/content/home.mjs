/* ==========================================================================
   Strona główna
   --------------------------------------------------------------------------
   Fraza wiodąca: „agencja SEO Podhale" / „pozycjonowanie Podhale".
   Strona główna celuje w frazę najszerszą i markową; frazy szczegółowe
   (miasto + usługa) obsługują podstrony lokalne, żeby się nie kanibalizowały.
   ========================================================================== */

import { site } from './site.mjs';
import { icon } from '../lib/icons.mjs';
import { faqSchema } from '../lib/schema.mjs';
import {
  sectionHead,
  servicesGrid,
  steps,
  stats,
  faqList,
  quotes,
  areaChips,
  ctaBand,
  mountainRange,
  heroMedia,
  postCover
} from '../lib/components.mjs';
import { posts } from './blog.mjs';

/* Pytania widoczne na stronie i zarazem źródło znacznika FAQPage.
   Odpowiedzi są konkretne, bo Google coraz częściej wycina z nich
   fragment rozszerzony — ogólniki nie mają szans. */
const faq = [
  {
    q: 'Ile trwa, zanim pozycjonowanie zacznie dawać efekty?',
    a: '<p>Pierwsze ruchy w rankingu widać zwykle po 4–8 tygodniach, a realny wzrost liczby zapytań po 3–6 miesiącach. Tempo zależy od trzech rzeczy: wieku domeny, stanu technicznego strony i konkurencji na danej frazie. Fraza <strong>„nocleg Zakopane"</strong> to wieloletnia walka z portalami rezerwacyjnymi — <strong>„pokoje z widokiem na Giewont Kościelisko"</strong> potrafi wejść na pierwszą stronę w kwartał. Dlatego zaczynamy od fraz, które da się wygrać, a dopiero z tego zbudowanego zaplecza atakujemy te najtrudniejsze.</p>'
  },
  {
    q: 'Czy pozycjonowanie ma sens dla małego pensjonatu z kilkoma pokojami?',
    a: '<p>Ma — i to często większy niż dla dużego obiektu. Mały pensjonat nie musi wygrywać z Booking.com na ogólne frazy. Wystarczy, że będzie pierwszy na zapytania precyzyjne: <em>„pensjonat z parkingiem Białka Tatrzańska"</em>, <em>„nocleg dla rodziny z psem Bukowina"</em>. To zapytania z niską konkurencją i bardzo wysoką intencją zakupową. Do tego każda rezerwacja bezpośrednia to 15–20% prowizji, której nie oddajesz portalowi — przy kilkunastu rezerwacjach miesięcznie SEO zwraca się z samej oszczędności na prowizjach.</p>'
  },
  {
    q: 'Czym różnicie się od agencji z Krakowa czy Warszawy?',
    a: '<p>Znajomością rynku, na którym pracujecie. Wiemy, że sezon na Podhalu ma dwa szczyty (ferie i lato) i że kampanie trzeba rozgrzewać z wyprzedzeniem, a nie w grudniu. Wiemy, czym różni się ruch szukający „domków" od tego szukającego „apartamentów". Rozumiemy odmianę nazw miejscowości, na której algorytmy potrafią się wyłożyć — <em>„w Zakopanem"</em>, nie <em>„w Zakopanym"</em>. I możemy przyjechać do Was na spotkanie, zamiast prowadzić współpracę wyłącznie mailem.</p>'
  },
  {
    q: 'Ile kosztuje pozycjonowanie i od czego zależy cena?',
    a: `<p>Stała opieka SEO zaczyna się u nas od <strong>${site.name === 'Tatry Marketing' ? '1 500 zł' : ''} netto miesięcznie</strong> dla firmy działającej w jednej miejscowości. Cena rośnie wraz z liczbą fraz, obszarem działania i konkurencyjnością branży. Nie pobieramy opłat za „wejście na pierwszą stronę" liczonych od pozycji — to model, który zachęca agencje do windowania fraz bez ruchu. Płacisz za konkretny zakres prac, który dostajesz opisany w umowie. Pełne widełki znajdziesz w <a href="/cennik/">cenniku</a>.</p>`
  },
  {
    q: 'Czy podpisujecie umowy na 24 miesiące?',
    a: '<p>Nie. Standardowa umowa ma miesięczny okres wypowiedzenia, licząc od końca miesiąca rozliczeniowego. Uważamy, że agencja powinna utrzymywać klienta wynikami, a nie zapisami w umowie. Jedyny wyjątek to projekty, w których ponosimy duży koszt na starcie (np. budowa strony rozliczana w ratach) — wtedy zabezpieczamy sam koszt wytworzenia, nie okres współpracy.</p>'
  },
  {
    q: 'Co się dzieje ze stroną, jeśli zakończymy współpracę?',
    a: '<p>Strona zostaje Wasza — razem z kodem, treściami, dostępami i domeną. Przekazujemy komplet loginów do hostingu, panelu, Google Analytics i Search Console. Nie stosujemy licencji na szablon, która wygasa po zakończeniu współpracy, ani nie trzymamy domeny na własnych danych. To praktyka, przez którą wiele firm w regionie straciło swoje strony przy zmianie wykonawcy, i nie chcemy mieć z nią nic wspólnego.</p>'
  }
];

const testimonials = [
  {
    text: 'Przez dwa lata płaciliśmy agencji z Krakowa za raporty, których nikt u nas nie rozumiał. Tutaj po pierwszym spotkaniu dostaliśmy listę rzeczy do naprawienia napisaną po ludzku. Rezerwacje bezpośrednie wzrosły na tyle, że ograniczyliśmy pokoje wystawiane na portalach.',
    name: 'Anna Gąsienica',
    role: 'Pensjonat pod Reglami, Zakopane',
    initials: 'AG'
  },
  {
    text: 'Nowa strona ładuje się szybciej niż stara wizytówka na Facebooku. Najważniejsze, że sam mogę dodać nowe terminy spływów bez dzwonienia do informatyka. Telefonów w maju mieliśmy dwa razy więcej niż rok wcześniej.',
    name: 'Marcin Bafia',
    role: 'Spływy i wypożyczalnia, Nowy Targ',
    initials: 'MB'
  },
  {
    text: 'Zależało nam na klientach spoza sezonu i to się udało. Wchodzimy wysoko na frazy o konferencjach i imprezach firmowych, o których wcześniej w ogóle nie myśleliśmy. Raporty są krótkie i widać w nich, co zrobiono w danym miesiącu.',
    name: 'Katarzyna Stoch',
    role: 'Hotel i restauracja, Rabka-Zdrój',
    initials: 'KS'
  }
];

export const homePage = {
  path: '/',
  title: 'Pozycjonowanie i strony WWW — Podhale | Tatry Marketing',
  description:
    'Agencja SEO z Podhala. Pozycjonowanie lokalne, szybkie strony WWW i Google Ads dla firm z Zakopanego, Nowego Targu i okolic. Bezpłatna analiza.',
  ogImage: '/assets/img/og-default.png',
  schema: [faqSchema(`${site.url}/`, faq)],

  body: `
<section class="hero hero--video">
  ${heroMedia()}
  ${mountainRange()}
  <div class="wrap hero__inner">

    <div>
      <p class="eyebrow">Agencja SEO i stron WWW z Podhala</p>
      <h1>Twoi klienci szukają Cię w Google. <em>Znajdują konkurencję.</em></h1>
      <p class="hero__lead">
        Pozycjonujemy firmy z Podhala na frazy, które realnie przynoszą telefony
        i rezerwacje — nie na te, które ładnie wyglądają w raporcie.
        Budujemy też strony, które ładują się w ułamku sekundy i od pierwszego
        dnia są przygotowane pod SEO.
      </p>

      <div class="btn-row">
        <a class="btn btn--amber" href="/kontakt/">Zamów bezpłatną analizę</a>
        <a class="btn btn--ghost-light" href="/realizacje/">Zobacz nasze realizacje</a>
      </div>

      <div class="hero__badges">
        <span class="hero__badge">${icon('mapPin')} Spotkania na miejscu, nie tylko przez maila</span>
        <span class="hero__badge">${icon('handshake')} Miesięczny okres wypowiedzenia</span>
        <span class="hero__badge">${icon('shield')} Strona i domena zostają Twoje</span>
      </div>
    </div>

    <aside class="hero__panel" aria-labelledby="panel-tytul">
      <p class="hero__panel-title" id="panel-tytul">Co zwykle znajdujemy w analizie</p>
      <div class="metric">
        <span class="metric__value">68%</span>
        <span class="metric__label">stron w regionie ładuje się na telefonie dłużej niż 3 sekundy</span>
      </div>
      <div class="metric">
        <span class="metric__value">4 na 5</span>
        <span class="metric__label">wizytówek Google ma niepełne dane lub złą kategorię</span>
      </div>
      <div class="metric">
        <span class="metric__value">0</span>
        <span class="metric__label">tyle podstron pod frazy lokalne ma typowa strona pensjonatu</span>
      </div>
      <p style="font-size:.8125rem;color:rgba(255,255,255,.5);margin-top:1.25rem">
        Obserwacje z audytów firm z powiatu tatrzańskiego i nowotarskiego.
      </p>
    </aside>

  </div>
</section>

<!-- ===== Problem ===== -->
<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        ${sectionHead({
          eyebrow: 'Dlaczego strona nie sprzedaje',
          h2: 'Ładna strona to nie to samo co strona, którą da się znaleźć'
        })}
        <p>
          Większość firm z Podhala ma stronę. Problem w tym, że powstała raz,
          kilka lat temu, i od tamtej pory nikt jej nie dotknął. Google patrzy
          wtedy na trzy rzeczy — i zwykle wszystkie trzy wypadają źle.
        </p>
        <ul class="checklist">
          <li><strong>Strona jest wolna na telefonie</strong> Ponad połowa ruchu w turystyce to komórki. Jeśli strona ładuje się cztery sekundy, część odwiedzających wraca do wyników zanim zobaczy zdjęcia.</li>
          <li><strong>Nie ma treści pod to, czego ludzie szukają</strong> Jedna podstrona „Oferta" nie wygra z konkurentem, który ma osobną stronę dla każdej usługi i każdej miejscowości.</li>
          <li><strong>Wizytówka Google żyje własnym życiem</strong> Błędne godziny, brak kategorii, zero zdjęć i odpowiedzi na opinie. A to ona decyduje o widoczności w mapach.</li>
        </ul>
        <div class="btn-row">
          <a class="btn btn--primary" href="/uslugi/audyt-seo/">Sprawdź, co blokuje Twoją stronę</a>
        </div>
      </div>

      <div>
        ${stats([
          { value: '46%', label: 'wyszukiwań w Google ma intencję lokalną' },
          { value: '3 s', label: 'po tylu sekundach ładowania traci się połowę wejść z komórki' },
          { value: '#1–3', label: 'trzy pierwsze wyniki zbierają większość kliknięć' },
          { value: '15–20%', label: 'tyle prowizji oddajesz portalowi za każdą rezerwację' }
        ])}
      </div>
    </div>
  </div>
</section>

<!-- ===== Usługi ===== -->
<section class="section section--snow" aria-labelledby="uslugi-tytul">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Co robimy',
      h2: 'Cztery rzeczy, które robimy dobrze',
      lead: 'Nie zajmujemy się wszystkim. Skupiamy się na tym, co realnie wpływa na to, ilu klientów znajdzie Cię w wyszukiwarce.',
      center: true,
      id: 'uslugi-tytul'
    })}
    ${servicesGrid()}
    <div class="btn-row btn-row--center">
      <a class="btn btn--ghost" href="/uslugi/">Poznaj pełen zakres usług</a>
    </div>
  </div>
</section>

<!-- ===== Proces ===== -->
<section class="section" aria-labelledby="proces-tytul">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Jak pracujemy',
      h2: 'Od pierwszej rozmowy do pierwszych efektów',
      lead: 'Bez tajemnic i bez „magii SEO". Na każdym etapie wiesz, co robimy i po co.',
      center: true,
      id: 'proces-tytul'
    })}
    ${steps([
      {
        title: 'Rozmowa i analiza',
        text: 'Sprawdzamy Twoją stronę, wizytówkę i trzech konkurentów. Dowiadujemy się, na czym Ci zależy: na sezonie, na kliencie spoza sezonu, a może na konkretnej usłudze.'
      },
      {
        title: 'Plan i wycena',
        text: 'Dostajesz listę zadań uszeregowaną według wpływu na wyniki, wraz z terminami i ceną. Bez ukrytych pozycji i bez pakietów, których nie da się rozliczyć.'
      },
      {
        title: 'Wdrożenie',
        text: 'Naprawiamy technikę, piszemy treści, porządkujemy wizytówkę i budujemy zaplecze linkowe. Pracujemy etapami, żeby efekty były widoczne po drodze, a nie dopiero na końcu.'
      },
      {
        title: 'Raport i korekta',
        text: 'Co miesiąc dostajesz krótki raport: co zrobiliśmy, co się zmieniło w pozycjach i ruchu, co robimy dalej. Bez stustronicowych plików PDF, których nikt nie czyta.'
      }
    ])}
  </div>
</section>

<!-- ===== Obszar działania ===== -->
<section class="section section--navy" aria-labelledby="obszar-tytul">
  <div class="wrap">
    <div class="split">
      <div>
        ${sectionHead({
          eyebrow: 'Obszar działania',
          h2: 'Podhale znamy z autopsji, nie z mapy',
          lead: 'Obsługujemy firmy z całego regionu — od Zakopanego po Nowy Sącz. Do klientów z powiatu tatrzańskiego i nowotarskiego dojeżdżamy na spotkania.',
          id: 'obszar-tytul'
        })}
        ${areaChips()}
      </div>
      <div>
        <h3>Dla kogo pracujemy najczęściej</h3>
        <ul class="checklist">
          <li><strong>Baza noclegowa</strong> Pensjonaty, domki, apartamenty i hotele, które chcą więcej rezerwacji bezpośrednich zamiast oddawać prowizję portalom.</li>
          <li><strong>Gastronomia i atrakcje</strong> Restauracje, karczmy, wypożyczalnie sprzętu, szkoły narciarskie, parki linowe i przewodnicy.</li>
          <li><strong>Usługi i rzemiosło</strong> Firmy budowlane, ciesielskie, instalacyjne i gabinety, dla których liczy się telefon z okolicy, a nie ruch z całej Polski.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ===== Opinie ===== -->
<section class="section section--snow" aria-labelledby="opinie-tytul">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Opinie klientów',
      h2: 'Co mówią firmy, z którymi pracujemy',
      center: true,
      id: 'opinie-tytul'
    })}
    ${quotes(testimonials)}
  </div>
</section>

<!-- ===== Blog ===== -->
<section class="section" aria-labelledby="blog-tytul">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Baza wiedzy',
      h2: 'Poradniki dla firm z regionu',
      lead: 'Piszemy o tym, co możesz wdrożyć sam — nawet jeśli nigdy nie zdecydujesz się na współpracę z agencją.',
      center: true,
      id: 'blog-tytul'
    })}
    <div class="posts">
      ${posts
        .map(
          (p) => `<article class="post-card">
        <div class="post-card__cover">${postCover(p.slug)}</div>
        <div class="post-card__body">
          <div class="post-card__meta">
            <span class="post-card__cat">${p.category}</span>
            <time datetime="${p.published}">${p.publishedText}</time>
            <span>·</span>
            <span>${p.readingTime} min czytania</span>
          </div>
          <h3><a href="/blog/${p.slug}/">${p.title}</a></h3>
          <p>${p.excerpt}</p>
          <a class="card__link" href="/blog/${p.slug}/">Czytaj dalej${icon('arrowRight')}</a>
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>

<!-- ===== FAQ ===== -->
<section class="section section--snow" aria-labelledby="faq-tytul">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Pytania i odpowiedzi',
      h2: 'Zanim do nas napiszesz',
      lead: 'Sześć pytań, które słyszymy najczęściej na pierwszym spotkaniu.',
      center: true,
      id: 'faq-tytul'
    })}
    ${faqList(faq)}
    <div class="btn-row btn-row--center">
      <a class="btn btn--ghost" href="/faq/">Zobacz wszystkie pytania</a>
    </div>
  </div>
</section>

${ctaBand()}
`
};

export { faq as homeFaq };
