/* ==========================================================================
   Usługi — strona zbiorcza i cztery podstrony szczegółowe
   --------------------------------------------------------------------------
   Podział na osobne podstrony zamiast jednej długiej „Oferty" jest celowy:
   Google ocenia każdy adres URL osobno, więc jedna podstrona = jedna intencja
   wyszukiwania. Strona zbiorcza /uslugi/ zbiera frazy szersze i rozprowadza
   moc linkowania na podstrony szczegółowe.
   ========================================================================== */

import { site, services } from './site.mjs';
import { icon } from '../lib/icons.mjs';
import { serviceSchema, faqSchema } from '../lib/schema.mjs';
import {
  pageHead,
  sectionHead,
  servicesGrid,
  steps,
  faqList,
  iconCard,
  ctaBand,
  relatedLinks,
  areaChips
} from '../lib/components.mjs';

const HOME_CRUMB = { label: 'Strona główna', href: '/' };
const USLUGI_CRUMB = { label: 'Usługi', href: '/uslugi/' };

/* ==========================================================================
   /uslugi/ — strona zbiorcza
   ========================================================================== */
export const uslugiPage = {
  path: '/uslugi/',
  title: 'Usługi — SEO, strony WWW i Google Ads | Tatry Marketing',
  description:
    'Pozycjonowanie stron, tworzenie stron internetowych, audyty SEO i kampanie Google Ads dla firm z Podhala. Zobacz zakres prac, terminy i widełki cenowe.',
  crumbs: [HOME_CRUMB, { label: 'Usługi' }],
  body: `
${pageHead({
  crumbs: [HOME_CRUMB, { label: 'Usługi' }],
  eyebrow: 'Zakres usług',
  h1: 'Cztery usługi, jeden cel: więcej klientów z wyszukiwarki',
  lead: 'Nie sprzedajemy pakietów „wszystko dla wszystkich". Poniżej dokładnie to, co robimy — z zakresem prac, terminami i widełkami cen.'
})}

<section class="section" aria-labelledby="lista-uslug">
  <div class="wrap">
    <!-- Nagłówek istnieje wyłącznie dla czytników ekranu: hierarchia musi iść
         h1 → h2 → h3, a karty usług zaczynają się od h3. Wizualnie tę rolę
         pełni już nagłówek strony, więc powtarzanie go byłoby zbędne. -->
    <h2 class="sr-only" id="lista-uslug">Lista usług</h2>
    ${servicesGrid()}
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Jak to się układa',
      h2: 'W jakiej kolejności to zwykle robimy',
      lead: 'Rzadko zaczynamy od pozycjonowania. Najczęściej zaczynamy od sprawdzenia, czy jest co pozycjonować.',
      center: true
    })}
    ${steps([
      {
        title: 'Audyt',
        text: 'Jeśli strona już istnieje — zaczynamy od diagnozy. Bez tego pozycjonowanie polega na dolewaniu paliwa do dziurawego baku.'
      },
      {
        title: 'Strona',
        text: 'Jeśli audyt pokaże, że taniej zbudować od nowa niż naprawiać — budujemy. Zdarza się to przy stronach starszych niż pięć lat.'
      },
      {
        title: 'SEO',
        text: 'Stała praca nad treścią, techniką i widocznością lokalną. To tu powstaje większość długoterminowych efektów.'
      },
      {
        title: 'Google Ads',
        text: 'Włączamy, gdy potrzebny jest ruch od zaraz — na starcie współpracy albo w szczycie sezonu, gdy stawka za kliknięcie się zwraca.'
      }
    ])}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        ${sectionHead({
          eyebrow: 'Zasady współpracy',
          h2: 'Cztery rzeczy, które ustalamy zawsze na starcie'
        })}
        <ul class="checklist">
          <li><strong>Wiesz, za co płacisz</strong> Umowa zawiera zakres prac, nie ogólnikowe „działania SEO". Możesz w każdej chwili sprawdzić, co zostało zrobione.</li>
          <li><strong>Wszystko należy do Ciebie</strong> Kod, treści, domena, dostępy do Analytics i Search Console. Zawsze zapisane na Twoje dane.</li>
          <li><strong>Miesięczne wypowiedzenie</strong> Bez umów na dwa lata. Jeśli nie dowozimy, odchodzisz na koniec kolejnego miesiąca.</li>
          <li><strong>Raport, który da się przeczytać</strong> Dwie strony: co zrobiliśmy, co się zmieniło, co dalej. Bez eksportu z narzędzia na sto stron.</li>
        </ul>
      </div>
      <div>
        <div class="grid" style="gap:1rem">
          ${iconCard({
            icon: 'mapPin',
            title: 'Znamy rynek, na którym pracujesz',
            text: 'Wiemy, że sezon ma dwa szczyty, że ruch w listopadzie wygląda inaczej niż w lipcu i że frazy trzeba przygotować z kwartalnym wyprzedzeniem.'
          })}
          ${iconCard({
            icon: 'users',
            title: 'Rozmawiasz z osobą, która robi robotę',
            amber: true,
            text: 'Bez łańcucha opiekun–koordynator–specjalista. Kontaktujesz się bezpośrednio z osobą prowadzącą Twój projekt.'
          })}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--navy">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Obszar działania',
      h2: 'Gdzie pracujemy',
      lead: 'Podhale, Podtatrze i okolice. Do klientów z powiatu tatrzańskiego i nowotarskiego dojeżdżamy na spotkania.'
    })}
    ${areaChips()}
  </div>
</section>

${ctaBand({
  h2: 'Nie wiesz, od czego zacząć?',
  text: 'Napisz w dwóch zdaniach, czym się zajmujesz i co Cię uwiera. Odpiszemy, która z tych usług ma u Ciebie sens — a która byłaby wyrzuceniem pieniędzy.'
})}
`
};

/* ==========================================================================
   Wspólny szkielet podstrony usługi
   ========================================================================== */
function servicePage(cfg) {
  const url = `${site.url}/uslugi/${cfg.slug}/`;
  const crumbs = [HOME_CRUMB, USLUGI_CRUMB, { label: cfg.navName }];

  return {
    path: `/uslugi/${cfg.slug}/`,
    title: cfg.title,
    description: cfg.description,
    crumbs,
    schema: [
      serviceSchema({
        url,
        name: cfg.schemaName,
        description: cfg.description,
        serviceType: cfg.serviceType
      }),
      faqSchema(url, cfg.faq)
    ],
    body: `
${pageHead({
  crumbs,
  eyebrow: cfg.eyebrow,
  h1: cfg.h1,
  lead: cfg.lead
})}

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        ${sectionHead({ eyebrow: cfg.problemEyebrow, h2: cfg.problemH2 })}
        ${cfg.problemBody}
      </div>
      <div>
        <div class="card">
          <div class="card__icon">${icon(cfg.icon)}</div>
          <h3>${cfg.boxTitle}</h3>
          <ul class="card__list">
            ${cfg.boxList.map((li) => `<li>${li}</li>`).join('\n            ')}
          </ul>
          <p style="font-size:.875rem;color:var(--muted);margin:0">
            <strong>Od ${cfg.priceFrom} netto.</strong> ${cfg.priceNote}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Zakres prac',
      h2: cfg.scopeH2,
      lead: cfg.scopeLead,
      center: true
    })}
    <div class="grid grid--3">
      ${cfg.scope.map((c) => iconCard(c)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Przebieg',
      h2: cfg.processH2,
      center: true
    })}
    ${steps(cfg.process)}
  </div>
</section>

${cfg.extra || ''}

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Pytania i odpowiedzi',
      h2: cfg.faqH2 || 'Najczęstsze pytania',
      center: true
    })}
    ${faqList(cfg.faq)}
  </div>
</section>

${relatedLinks(cfg.related, 'Powiązane strony')}

${ctaBand(cfg.cta)}
`
  };
}

/* ==========================================================================
   /uslugi/pozycjonowanie-seo/
   ========================================================================== */
export const seoPage = servicePage({
  slug: 'pozycjonowanie-seo',
  navName: 'Pozycjonowanie SEO',
  icon: 'trending',
  title: 'Pozycjonowanie stron Podhale — SEO lokalne | Tatry Marketing',
  description:
    'Pozycjonowanie stron dla firm z Podhala. Frazy lokalne, wizytówka Google, treści i technika. Stała opieka SEO od 1 500 zł netto miesięcznie.',
  schemaName: 'Pozycjonowanie stron internetowych (SEO)',
  serviceType: 'Search Engine Optimization',
  eyebrow: 'Pozycjonowanie SEO',
  h1: 'Pozycjonowanie stron dla firm z Podhala',
  lead: 'Prowadzimy firmy na pierwszą stronę Google na frazy, które przynoszą telefony i rezerwacje — a nie na te, które dobrze wyglądają w raporcie.',
  priceFrom: '1 500 zł / mies.',
  priceNote: 'Cena zależy od liczby fraz, obszaru działania i konkurencyjności branży.',

  problemEyebrow: 'Punkt wyjścia',
  problemH2: 'Wysoka pozycja na złą frazę jest warta zero',
  problemBody: `
        <p>
          Widzieliśmy raporty, w których agencja chwaliła się pierwszym miejscem
          na frazę wyszukiwaną trzy razy w miesiącu — a klient nie miał ani jednego
          nowego telefonu. Formalnie wszystko się zgadzało. Praktycznie: strata czasu
          i pieniędzy.
        </p>
        <p>
          Dlatego u nas dobór fraz to nie jest dodatek do oferty, tylko pierwszy
          i najważniejszy etap pracy. Szukamy zapytań spełniających trzy warunki naraz:
        </p>
        <ul class="checklist">
          <li><strong>Ktoś ich faktycznie szuka</strong> Sprawdzamy realne wolumeny, z uwzględnieniem sezonowości — na Podhalu potrafi ona zmienić liczbę zapytań dziesięciokrotnie.</li>
          <li><strong>Da się je wygrać</strong> Analizujemy, kto zajmuje pierwszą stronę. Jeśli to wyłącznie portale z tysiącami podstron, szukamy obejścia zamiast palić budżet.</li>
          <li><strong>Prowadzą do zakupu</strong> „Jak wybrać narty" i „wypożyczalnia nart Zakopane" to dwie różne intencje. Druga płaci rachunki.</li>
        </ul>`,

  boxTitle: 'Co dostajesz co miesiąc',
  boxList: [
    'Prace techniczne i optymalizacja strony',
    'Nowe treści pod zaplanowane frazy',
    'Prowadzenie wizytówki Google',
    'Budowa profilu linków i wzmianek lokalnych',
    'Raport z pozycji, ruchu i wykonanych prac',
    'Kontakt bezpośrednio z osobą prowadzącą projekt'
  ],

  scopeH2: 'Z czego składa się pozycjonowanie',
  scopeLead:
    'SEO to nie jedna czynność, tylko cztery obszary pracujące razem. Zaniedbanie jednego blokuje efekty z pozostałych.',
  scope: [
    {
      icon: 'zap',
      title: 'Technika',
      text: 'Fundament, bez którego reszta nie zadziała.',
      list: [
        'Szybkość ładowania i Core Web Vitals',
        'Poprawność wersji mobilnej',
        'Struktura adresów URL i nagłówków',
        'Dane strukturalne schema.org',
        'Mapa strony, robots.txt, przekierowania',
        'Usuwanie duplikatów i kanibalizacji'
      ]
    },
    {
      icon: 'pen',
      title: 'Treść',
      text: 'To, co ostatecznie odpowiada na zapytanie użytkownika.',
      list: [
        'Plan podstron pod intencje wyszukiwania',
        'Teksty ofertowe i opisy usług',
        'Poradniki budujące ruch informacyjny',
        'Optymalizacja tytułów i opisów w wynikach',
        'Aktualizacja treści, które traciły pozycje'
      ]
    },
    {
      icon: 'mapPin',
      title: 'SEO lokalne',
      text: 'Decyduje o widoczności w mapach i w wynikach z okolicy.',
      list: [
        'Pełna konfiguracja wizytówki Google',
        'Spójność danych NAP w całej sieci',
        'Wpisy do katalogów i portali regionalnych',
        'Strategia zbierania i obsługi opinii',
        'Podstrony pod poszczególne miejscowości'
      ]
    },
    {
      icon: 'link',
      title: 'Linki i wzmianki',
      text: 'Sygnał, że inni traktują stronę jako wartą polecenia.',
      list: [
        'Współpraca z lokalnymi serwisami i blogami',
        'Portale turystyczne i branżowe',
        'Wzmianki przy okazji wydarzeń w regionie',
        'Porządkowanie szkodliwych linków z przeszłości'
      ]
    },
    {
      icon: 'chart',
      title: 'Pomiar',
      text: 'Bez danych zostają domysły.',
      list: [
        'Google Analytics 4 i Search Console',
        'Śledzenie telefonów i formularzy',
        'Miesięczny raport pozycji i ruchu',
        'Kwartalna korekta strategii'
      ]
    },
    {
      icon: 'refresh',
      title: 'Sezonowość',
      text: 'Specyfika, którą agencje spoza regionu zwykle pomijają.',
      list: [
        'Przygotowanie treści z wyprzedzeniem przed sezonem',
        'Osobne strony pod ferie, sylwestra i długie weekendy',
        'Plan na miesiące poza szczytem',
        'Rozłożenie prac tak, by szczyt zastał stronę gotową'
      ]
    }
  ],

  processH2: 'Jak wygląda pierwsze pół roku',
  process: [
    {
      title: 'Miesiąc 1 — diagnoza',
      text: 'Audyt techniczny, analiza fraz i konkurencji, plan podstron. Naprawiamy błędy blokujące indeksowanie. Porządkujemy wizytówkę.'
    },
    {
      title: 'Miesiące 2–3 — budowa',
      text: 'Nowe podstrony pod zaplanowane frazy, przepisanie treści ofertowych, wdrożenie danych strukturalnych, pierwsze wzmianki lokalne.'
    },
    {
      title: 'Miesiące 4–5 — rozpęd',
      text: 'Pierwsze wyraźne wzrosty pozycji. Rozbudowa treści poradnikowych, praca nad linkami, optymalizacja stron z największym potencjałem.'
    },
    {
      title: 'Miesiąc 6 — podsumowanie',
      text: 'Porównanie z punktem wyjścia, korekta strategii na kolejne półrocze. To moment, w którym widać, czy współpraca ma sens dalej.'
    }
  ],

  faqH2: 'Pytania o pozycjonowanie',
  faq: [
    {
      q: 'Czy gwarantujecie pierwsze miejsce w Google?',
      a: '<p>Nie — i żadna uczciwa agencja tego nie zrobi. Nikt nie ma wpływu na algorytm Google ani na to, co zrobi konkurencja. Gwarantujemy natomiast konkretny zakres prac zapisany w umowie i pełną przejrzystość tego, co się dzieje. Jeśli po sześciu miesiącach nie widać ruchu w danych z Search Console, sami zaproponujemy zakończenie współpracy — utrzymywanie klienta, któremu nie pomagamy, nie ma sensu dla żadnej ze stron.</p>'
    },
    {
      q: 'Pracowaliśmy już z agencją i nie było efektów. Co robicie inaczej?',
      a: '<p>Najpierw sprawdzamy, co się wydarzyło wcześniej — czasem problem leży w linkach kupionych w wątpliwych miejscach, czasem w strukturze strony, której nie da się uratować bez przebudowy. Pokazujemy to na danych, zanim cokolwiek zaproponujemy. Druga różnica: dostajesz plan z konkretnymi zadaniami i terminami, a nie abonament za bliżej nieokreślone „działania". Możesz w każdym miesiącu sprawdzić, co zostało zrobione.</p>'
    },
    {
      q: 'Czy muszę mieć nową stronę, żeby zacząć pozycjonowanie?',
      a: '<p>Zwykle nie. Większość stron da się doprowadzić do stanu, w którym pozycjonowanie ma sens. Przebudowę proponujemy tylko wtedy, gdy koszt naprawy przekracza koszt zbudowania od nowa — dotyczy to głównie stron na przestarzałych systemach, bez wersji mobilnej albo z architekturą uniemożliwiającą dodawanie podstron. Powiemy to wprost i pokażemy rachunek, zamiast sprzedawać stronę przy okazji.</p>'
    },
    {
      q: 'Jak mierzycie efekty?',
      a: '<p>Trzema warstwami. Pierwsza to pozycje na ustalone frazy — najprostsza, ale najmniej istotna. Druga to ruch organiczny w Search Console i Analytics, z podziałem na podstrony i typy zapytań. Trzecia, najważniejsza, to konwersje: telefony, formularze, kliknięcia w adres e-mail. Konfigurujemy ich śledzenie na starcie, bo bez tego cała reszta jest ćwiczeniem teoretycznym.</p>'
    },
    {
      q: 'Czy pozycjonujecie firmy spoza Podhala?',
      a: '<p>Tak, choć naszą specjalnością jest rynek lokalny i to tutaj jesteśmy najbardziej użyteczni. Jeśli prowadzisz firmę działającą w całej Polsce, chętnie porozmawiamy — ale uprzedzimy uczciwie, jeśli uznamy, że agencja wyspecjalizowana w Twojej branży zrobi to lepiej.</p>'
    }
  ],

  related: [
    { label: 'Usługa', title: 'Audyt SEO — diagnoza przed startem', href: '/uslugi/audyt-seo/' },
    { label: 'Lokalnie', title: 'Pozycjonowanie w Zakopanem', href: '/pozycjonowanie/zakopane/' },
    { label: 'Cennik', title: 'Ile kosztuje stała opieka SEO', href: '/cennik/' },
    { label: 'Poradnik', title: 'Jak wypozycjonować pensjonat', href: '/blog/pozycjonowanie-pensjonatu-w-zakopanem/' }
  ],

  cta: {
    h2: 'Zacznijmy od sprawdzenia, gdzie jesteś',
    text: 'Bezpłatna analiza widoczności: Twoja strona i trzech konkurentów z regionu, z listą konkretnych różnic. Bez zobowiązań.'
  }
});

/* ==========================================================================
   /uslugi/strony-internetowe/
   ========================================================================== */
export const wwwPage = servicePage({
  slug: 'strony-internetowe',
  navName: 'Strony internetowe',
  icon: 'code',
  title: 'Tworzenie stron internetowych — Podhale | Tatry Marketing',
  description:
    'Projektujemy i kodujemy szybkie strony internetowe dla firm z Podhala. Przygotowane pod SEO od pierwszego dnia. Realizacja 4–8 tygodni, od 4 900 zł netto.',
  schemaName: 'Projektowanie i tworzenie stron internetowych',
  serviceType: 'Web Design and Development',
  eyebrow: 'Strony internetowe',
  h1: 'Strony, które ładują się szybko i da się je znaleźć',
  lead: 'Projektujemy i kodujemy strony przygotowane pod pozycjonowanie od pierwszego dnia — a nie takie, które trzeba potem ratować audytem.',
  priceFrom: '4 900 zł',
  priceNote: 'Cena zależy od liczby podstron, zakresu treści i potrzebnych integracji.',

  problemEyebrow: 'Nasze podejście',
  problemH2: 'Strona to narzędzie sprzedaży, nie folder reklamowy',
  problemBody: `
        <p>
          Najładniejsza strona jest bezwartościowa, jeśli nikt jej nie znajduje
          albo jeśli ładuje się tak długo, że gość wraca do wyników wyszukiwania.
          Dlatego u nas projekt graficzny powstaje <em>po</em> ustaleniu, na jakie
          frazy strona ma odpowiadać i jak ma wyglądać ścieżka do kontaktu.
        </p>
        <p>Konkrety, których trzymamy się w każdym projekcie:</p>
        <ul class="checklist">
          <li><strong>Najpierw telefon, potem komputer</strong> Ponad połowa ruchu w turystyce i usługach lokalnych to urządzenia mobilne. Projektujemy od małego ekranu w górę, a nie odwrotnie.</li>
          <li><strong>Budżet wydajnościowy</strong> Ustalamy z góry limit wagi strony i trzymamy się go. Zdjęcia w formacie WebP, brak zbędnych bibliotek, fonty serwowane z własnego serwera.</li>
          <li><strong>Struktura pod frazy</strong> Osobna podstrona dla każdej usługi i każdej istotnej intencji — zamiast jednej zbiorczej „Oferty", która nie wygra z niczym.</li>
          <li><strong>Dostępność</strong> Kontrast, obsługa klawiaturą, opisy alternatywne. To wymóg prawny dla części podmiotów, a dla wszystkich — po prostu więcej klientów.</li>
        </ul>`,

  boxTitle: 'W cenie każdego projektu',
  boxList: [
    'Indywidualny projekt graficzny (bez kupnych szablonów)',
    'Kodowanie i wersja mobilna',
    'Optymalizacja szybkości i Core Web Vitals',
    'Dane strukturalne, sitemap.xml, robots.txt',
    'Konfiguracja Analytics i Search Console',
    'Przekierowania 301 ze starej strony',
    'Szkolenie z obsługi i 30 dni wsparcia'
  ],

  scopeH2: 'Co budujemy',
  scopeLead: 'Trzy typy projektów, które realizujemy najczęściej dla firm z regionu.',
  scope: [
    {
      icon: 'building',
      title: 'Strona firmowa',
      text: 'Najczęstszy wybór: firma usługowa, rzemieślnicza, gabinet, kancelaria.',
      list: [
        '5–12 podstron',
        'Podstrona pod każdą usługę',
        'Formularz kontaktowy i mapa',
        'Panel do samodzielnej edycji treści',
        'Realizacja: 4–6 tygodni'
      ]
    },
    {
      icon: 'mapPin',
      title: 'Strona obiektu noclegowego',
      text: 'Pensjonat, domki, apartamenty — z naciskiem na rezerwacje bezpośrednie.',
      list: [
        'Galeria zoptymalizowana pod szybkość',
        'Osobna podstrona dla każdego pokoju',
        'Integracja z silnikiem rezerwacyjnym',
        'Podstrony sezonowe i okolicznościowe',
        'Realizacja: 6–8 tygodni'
      ]
    },
    {
      icon: 'file',
      title: 'Strona jednosekcyjna',
      text: 'Dla nowej działalności albo pojedynczej oferty — z możliwością rozbudowy.',
      list: [
        'Jedna strona, wyraźna ścieżka do kontaktu',
        'Pełna optymalizacja techniczna',
        'Gotowa pod rozbudowę o podstrony',
        'Realizacja: 2–3 tygodnie'
      ]
    }
  ],

  processH2: 'Jak przebiega projekt',
  process: [
    {
      title: 'Rozmowa i analiza',
      text: 'Ustalamy, kto jest odbiorcą, czego szuka w Google i co ma zrobić po wejściu na stronę. Analizujemy trzech konkurentów. Efekt: struktura podstron i lista fraz.'
    },
    {
      title: 'Projekt',
      text: 'Makiety, a po ich akceptacji projekt graficzny wszystkich typów podstron — w wersji mobilnej i desktopowej. Poprawki wliczone w cenę, bez limitu rund na tym etapie.'
    },
    {
      title: 'Kodowanie i treści',
      text: 'Przekładamy projekt na kod, wprowadzamy treści, wdrażamy dane strukturalne i optymalizujemy szybkość. Możesz śledzić postęp na wersji testowej.'
    },
    {
      title: 'Publikacja',
      text: 'Przekierowania ze starych adresów, konfiguracja narzędzi Google, testy na realnych urządzeniach, szkolenie z panelu. Przez 30 dni poprawiamy drobiazgi bez dopłat.'
    }
  ],

  extra: `
<section class="section section--navy">
  <div class="wrap">
    <div class="split">
      <div>
        ${sectionHead({
          eyebrow: 'Technologia',
          h2: 'WordPress czy strona statyczna?'
        })}
        <p>
          Nie mamy jednej technologii do wszystkiego. Wybieramy tę, która pasuje
          do sposobu, w jaki będziesz korzystać ze strony.
        </p>
        <p>
          <strong>Strona statyczna</strong> — gdy treści zmieniają się rzadko.
          Ładuje się błyskawicznie, nie ma bazy danych ani wtyczek do aktualizowania,
          praktycznie nie da się jej zhakować, a hosting bywa darmowy. Wadą jest
          mniej wygodna edycja rozbudowanych treści.
        </p>
        <p>
          <strong>WordPress</strong> — gdy planujesz regularnie publikować
          i chcesz mieć pełną swobodę edycji. Wymaga aktualizacji i kosztuje więcej
          w utrzymaniu, ale daje wygodę, której statyczna strona nie zapewni.
        </p>
        <p>
          Powiemy wprost, co ma sens w Twoim przypadku — łącznie z sytuacją,
          w której lepszym wyborem jest tańsze rozwiązanie.
        </p>
      </div>
      <div>
        <div class="grid" style="gap:1rem">
          ${iconCard({
            icon: 'zap',
            title: 'Budżet wydajnościowy',
            text: 'Każdy projekt ma z góry ustalony limit wagi i czasu ładowania. Jeśli jakiś element go przekracza — szukamy innego rozwiązania, zamiast dokładać kolejny skrypt.'
          })}
          ${iconCard({
            icon: 'shield',
            title: 'Wszystko zostaje Twoje',
            text: 'Kod, treści, domena i dostępy zapisane na Twoje dane. Bez licencji wygasających po zakończeniu współpracy i bez domeny na naszych danych.'
          })}
        </div>
      </div>
    </div>
  </div>
</section>`,

  faqH2: 'Pytania o strony internetowe',
  faq: [
    {
      q: 'Ile trwa zbudowanie strony?',
      a: '<p>Strona jednosekcyjna: 2–3 tygodnie. Standardowa strona firmowa: 4–6 tygodni. Rozbudowany serwis obiektu noclegowego z integracją rezerwacji: 6–8 tygodni. Termin liczymy od momentu otrzymania materiałów — najczęstszą przyczyną opóźnień jest oczekiwanie na zdjęcia i treści od klienta, dlatego listę potrzebnych materiałów dostajesz na pierwszym spotkaniu.</p>'
    },
    {
      q: 'Czy mogę sam edytować treści?',
      a: '<p>Tak. Każdy projekt zawiera panel do edycji treści i szkolenie z jego obsługi (zwykle godzina wystarcza). Przy stronach statycznych panel działa nieco inaczej niż w WordPressie, ale podstawowe operacje — zmiana tekstu, wymiana zdjęcia, dodanie wpisu — są równie proste. Nagrywamy też krótkie filmiki z najczęstszymi czynnościami, żebyś nie musiał do nas dzwonić za pół roku.</p>'
    },
    {
      q: 'Co ze zdjęciami? Nie mamy dobrych.',
      a: '<p>To bardzo częsty problem i szczerze — potrafi zaważyć na skuteczności strony bardziej niż projekt graficzny. Możemy polecić fotografów pracujących w regionie i znających specyfikę obiektów turystycznych. Przy większych projektach sesja bywa wliczona w cenę. Doraźnie da się pracować na zdjęciach stockowych, ale odradzamy to w turystyce — goście rozpoznają zdjęcie, którego nie ma w rzeczywistości, i to kosztuje zaufanie.</p>'
    },
    {
      q: 'Czy strona będzie od razu widoczna w Google?',
      a: '<p>Będzie zaindeksowana w ciągu kilku–kilkunastu dni i od startu przygotowana pod SEO: poprawna struktura, dane strukturalne, szybkość, mapa strony. Ale samo zbudowanie strony nie daje wysokich pozycji na konkurencyjne frazy — to wymaga systematycznej pracy przez kolejne miesiące. Nowa strona to dobry fundament, nie gotowy wynik. Jeśli zależy Ci na ruchu od zaraz, warto na start włączyć <a href="/uslugi/google-ads/">kampanię Google Ads</a>.</p>'
    },
    {
      q: 'Mamy stronę, ale jest stara. Naprawiać czy budować od nowa?',
      a: '<p>Zależy od rachunku. Jeśli strona ma poprawną strukturę i da się ją przyspieszyć — naprawa jest tańsza i zachowuje wypracowane pozycje. Jeśli działa na przestarzałym systemie, nie ma wersji mobilnej albo jej architektura uniemożliwia dodawanie podstron — przebudowa wychodzi taniej niż łatanie. Rozstrzyga to <a href="/uslugi/audyt-seo/">audyt</a>: dostajesz porównanie kosztów obu ścieżek i naszą rekomendację z uzasadnieniem.</p>'
    }
  ],

  related: [
    { label: 'Usługa', title: 'Pozycjonowanie nowej strony', href: '/uslugi/pozycjonowanie-seo/' },
    { label: 'Cennik', title: 'Ile kosztuje strona internetowa', href: '/cennik/' },
    { label: 'Poradnik', title: 'Widełki cenowe stron w 2026', href: '/blog/ile-kosztuje-strona-internetowa/' },
    { label: 'Realizacje', title: 'Projekty, które zrobiliśmy', href: '/realizacje/' }
  ],

  cta: {
    h2: 'Porozmawiajmy o Twojej stronie',
    text: 'Napisz, czym się zajmujesz i co Cię uwiera w obecnej stronie. Odeślemy wstępną wycenę z rozbiciem na etapy — bez spotkania sprzedażowego po drodze.',
    primary: { label: 'Zamów wycenę strony', href: '/kontakt/' }
  }
});

/* ==========================================================================
   /uslugi/audyt-seo/
   ========================================================================== */
export const auditPage = servicePage({
  slug: 'audyt-seo',
  navName: 'Audyt SEO',
  icon: 'search',
  title: 'Audyt SEO strony — analiza i lista zadań | Tatry Marketing',
  description:
    'Audyt SEO, który kończy się listą zadań, a nie stustronicowym PDF-em. Technika, treści, linki i widoczność lokalna. Od 2 400 zł netto, realizacja 7–10 dni.',
  schemaName: 'Audyt SEO strony internetowej',
  serviceType: 'SEO Audit',
  eyebrow: 'Audyt SEO',
  h1: 'Audyt SEO, który kończy się listą zadań',
  lead: 'Sprawdzamy stronę pod kątem technicznym, treściowym i linkowym. Wynik dostajesz jako listę konkretnych zadań uszeregowaną według wpływu na wyniki — nie jako eksport z narzędzia.',
  priceFrom: '2 400 zł',
  priceNote: 'Jednorazowo. Przy późniejszej stałej współpracy odliczamy tę kwotę od pierwszej faktury.',

  problemEyebrow: 'Po co to robić',
  problemH2: 'Zanim wydasz pieniądze na pozycjonowanie, sprawdź, czy jest co pozycjonować',
  problemBody: `
        <p>
          Najczęstszy scenariusz, jaki widzimy: firma płaci za SEO od roku, pozycje
          drgają, ruch stoi w miejscu. Przyczyna zwykle leży poza samym pozycjonowaniem —
          w błędzie technicznym blokującym indeksowanie, w duplikacji treści albo
          w strukturze, przez którą dwie podstrony walczą o tę samą frazę.
        </p>
        <p>
          Audyt to diagnoza przed leczeniem. Odpowiada na pytanie: co konkretnie
          blokuje tę stronę i w jakiej kolejności to naprawiać, żeby najszybciej
          zobaczyć efekt.
        </p>
        <p><strong>Czym nasz audyt nie jest:</strong></p>
        <ul class="checklist">
          <li><strong>Nie jest eksportem z narzędzia</strong> Wygenerowanie listy 400 „błędów" zajmuje trzy minuty i jest bezużyteczne. Wartość leży w ocenie, które z nich w ogóle mają znaczenie u Ciebie.</li>
          <li><strong>Nie jest pretekstem do sprzedaży</strong> Jeśli strona jest w dobrym stanie, napiszemy to wprost. Zdarza się i jest to uczciwsze niż wymyślanie problemów.</li>
          <li><strong>Nie jest listą bez priorytetów</strong> Każde zadanie ma ocenę wpływu i szacunek pracochłonności. Wiesz, co zrobić najpierw, a co może poczekać rok.</li>
        </ul>`,

  boxTitle: 'Co dostajesz',
  boxList: [
    'Dokument z listą zadań uszeregowaną priorytetami',
    'Ocena wpływu i pracochłonności każdego zadania',
    'Porównanie z trzema konkurentami',
    'Analiza fraz z potencjałem, których nie wykorzystujesz',
    'Ocena wizytówki Google i widoczności lokalnej',
    'Godzinne omówienie wyników, na żywo lub online',
    'Zadania opisane tak, by wykonał je dowolny wykonawca'
  ],

  scopeH2: 'Co sprawdzamy',
  scopeLead: 'Cztery obszary, około 120 punktów kontrolnych. Poniżej najważniejsze z nich.',
  scope: [
    {
      icon: 'zap',
      title: 'Technika',
      list: [
        'Indeksowanie i budżet crawlowania',
        'Szybkość ładowania, Core Web Vitals',
        'Poprawność wersji mobilnej',
        'Certyfikat SSL i przekierowania',
        'Dane strukturalne',
        'Błędy 404 i łańcuchy przekierowań'
      ]
    },
    {
      icon: 'pen',
      title: 'Treści',
      list: [
        'Dopasowanie treści do intencji zapytań',
        'Kanibalizacja i duplikacja',
        'Tytuły i opisy w wynikach wyszukiwania',
        'Struktura nagłówków',
        'Braki treściowe wobec konkurencji',
        'Opisy alternatywne obrazów'
      ]
    },
    {
      icon: 'link',
      title: 'Linki',
      list: [
        'Profil linków przychodzących',
        'Linki potencjalnie szkodliwe',
        'Porównanie z konkurencją',
        'Linkowanie wewnętrzne i przepływ mocy',
        'Strony osierocone, bez linków wewnętrznych'
      ]
    },
    {
      icon: 'mapPin',
      title: 'Widoczność lokalna',
      list: [
        'Kompletność wizytówki Google',
        'Spójność danych NAP w sieci',
        'Obecność w katalogach regionalnych',
        'Profil opinii i sposób odpowiadania',
        'Pozycje w wynikach mapowych'
      ]
    }
  ],

  processH2: 'Jak to przebiega',
  process: [
    {
      title: 'Dostępy',
      text: 'Potrzebujemy wglądu do Google Analytics i Search Console. Jeśli ich nie masz — konfigurujemy je w ramach audytu, bez dopłaty.'
    },
    {
      title: 'Analiza',
      text: 'Około tygodnia pracy: narzędzia plus ręczna weryfikacja. Automat nie odróżni świadomej decyzji od błędu — dlatego każdy wynik przechodzi przez człowieka.'
    },
    {
      title: 'Dokument',
      text: 'Dostajesz listę zadań z priorytetami, oceną wpływu i szacunkiem pracochłonności. Napisaną tak, żeby zrozumiał ją też ktoś spoza branży.'
    },
    {
      title: 'Omówienie',
      text: 'Godzinna rozmowa, na żywo lub online. Tłumaczymy każde zadanie i odpowiadamy na pytania. Nagranie zostaje u Ciebie.'
    }
  ],

  faqH2: 'Pytania o audyt',
  faq: [
    {
      q: 'Czy muszę potem współpracować z Wami przy wdrożeniu?',
      a: '<p>Nie. Audyt jest usługą samodzielną, a zadania opisujemy tak, żeby wykonał je dowolny wykonawca — Wasz informatyk, inna agencja albo Wy sami, jeśli chodzi o treści i wizytówkę. Znaczna część naszych audytów trafia właśnie do firm, które mają własnego wykonawcę strony i potrzebują wyłącznie diagnozy. Jeśli zdecydujecie się na stałą współpracę, koszt audytu odliczamy od pierwszej faktury.</p>'
    },
    {
      q: 'Ile to trwa?',
      a: '<p>Od 7 do 10 dni roboczych od momentu otrzymania dostępów. Dla większych serwisów (powyżej 500 podstron) do dwóch tygodni. Jeśli sprawa jest pilna — na przykład ruch spadł nagle i trzeba znaleźć przyczynę — robimy skrócony audyt awaryjny w 48 godzin. Skupia się wtedy wyłącznie na tym, co mogło spowodować spadek.</p>'
    },
    {
      q: 'Czy audyt ma sens dla małej strony z pięcioma podstronami?',
      a: '<p>Przy stronie tej wielkości pełny audyt bywa przerostem formy. Zwykle proponujemy wtedy konsultację: dwie godziny wspólnego przeglądu strony i wizytówki, z listą zadań spisaną na bieżąco. Kosztuje ułamek ceny audytu i przy małych stronach daje praktycznie ten sam efekt. Napiszcie, co macie — powiemy szczerze, co ma sens.</p>'
    },
    {
      q: 'Co jeśli okaże się, że strona nadaje się do przebudowy?',
      a: '<p>Napiszemy to wprost i pokażemy rachunek: ile kosztowałoby doprowadzenie obecnej strony do porządku, a ile zbudowanie nowej. Zdarza się, że naprawa wychodzi taniej — i wtedy też to mówimy, mimo że budujemy strony. Decyzja i tak należy do Was, a wiedza z audytu przydaje się w obu wariantach.</p>'
    }
  ],

  related: [
    { label: 'Usługa', title: 'Stała opieka SEO po audycie', href: '/uslugi/pozycjonowanie-seo/' },
    { label: 'Usługa', title: 'Budowa strony od nowa', href: '/uslugi/strony-internetowe/' },
    { label: 'Cennik', title: 'Koszt audytu i konsultacji', href: '/cennik/' },
    { label: 'Poradnik', title: 'Wizytówka Google krok po kroku', href: '/blog/wizytowka-google-firma-podhale/' }
  ],

  cta: {
    h2: 'Sprawdźmy, co blokuje Twoją stronę',
    text: 'Zanim zamówisz pełny audyt, możemy zrobić bezpłatny przegląd wstępny — trzy największe problemy, które widać od razu. Bez zobowiązań.',
    primary: { label: 'Zamów audyt', href: '/kontakt/' }
  }
});

/* ==========================================================================
   /uslugi/google-ads/
   ========================================================================== */
export const adsPage = servicePage({
  slug: 'google-ads',
  navName: 'Google Ads',
  icon: 'target',
  title: 'Google Ads dla firm z Podhala | Tatry Marketing',
  description:
    'Prowadzenie kampanii Google Ads dla firm z Podhala. Ruch od pierwszego tygodnia, kampanie sezonowe pod ferie i wakacje. Obsługa od 900 zł netto miesięcznie.',
  schemaName: 'Prowadzenie kampanii Google Ads',
  serviceType: 'Search Engine Marketing',
  eyebrow: 'Google Ads',
  h1: 'Kampanie Google Ads, które dowożą zapytania od pierwszego tygodnia',
  lead: 'Pozycjonowanie potrzebuje miesięcy. Reklama działa od razu — dlatego najczęściej używamy jej na starcie współpracy i w szczycie sezonu.',
  priceFrom: '900 zł / mies.',
  priceNote: 'Obsługa kampanii. Budżet reklamowy płacisz bezpośrednio Google — nie pobieramy od niego prowizji.',

  problemEyebrow: 'Kiedy to ma sens',
  problemH2: 'Reklama nie zastąpi SEO. Ale bywa, że jest jedynym sensownym wyborem',
  problemBody: `
        <p>
          Nie polecamy Google Ads każdemu. To pieniądze, które przestają pracować
          w dniu wyłączenia kampanii — w przeciwieństwie do pozycji wypracowanych
          organicznie. Ale są cztery sytuacje, w których reklama jest po prostu
          najrozsądniejszym rozwiązaniem:
        </p>
        <ul class="checklist">
          <li><strong>Start nowej strony</strong> Zanim SEO nabierze rozpędu, mijają miesiące. Reklama wypełnia tę lukę i przy okazji dostarcza danych o tym, które frazy realnie konwertują.</li>
          <li><strong>Szczyt sezonu</strong> W ferie i w wakacje stawka za kliknięcie rośnie, ale rośnie też skłonność do rezerwacji. Przy dobrze policzonej marży to się opłaca.</li>
          <li><strong>Wolne terminy last minute</strong> Kampania włączana punktowo, gdy trzeba zapełnić konkretny weekend. SEO tego nie zrobi.</li>
          <li><strong>Frazy nie do wygrania organicznie</strong> Gdy pierwszą stronę okupują wyłącznie portale rezerwacyjne, reklama bywa jedynym wejściem na to zapytanie.</li>
        </ul>
        <p>
          Jeśli Twoja sytuacja nie mieści się w żadnym z tych punktów — powiemy,
          że lepiej te pieniądze przeznaczyć na <a href="/uslugi/pozycjonowanie-seo/">pozycjonowanie</a>.
        </p>`,

  boxTitle: 'Co obejmuje obsługa',
  boxList: [
    'Konfiguracja konta i struktury kampanii',
    'Dobór fraz i wykluczeń',
    'Teksty reklam i testy wariantów',
    'Konfiguracja śledzenia konwersji',
    'Bieżąca optymalizacja stawek',
    'Miesięczny raport z kosztem pozyskania zapytania'
  ],

  scopeH2: 'Rodzaje kampanii, które prowadzimy',
  scopeLead: 'Dobieramy je do etapu, na jakim jest klient — inaczej wygląda kampania dla nieznanej marki, inaczej dla obiektu z rozpoznawalną nazwą.',
  scope: [
    {
      icon: 'search',
      title: 'Kampanie w wyszukiwarce',
      text: 'Podstawa. Reklama pokazuje się osobie, która właśnie szuka Twojej usługi.',
      list: [
        'Frazy o wysokiej intencji zakupowej',
        'Rozbudowana lista wykluczeń',
        'Kierowanie geograficzne z promieniem',
        'Harmonogram dopasowany do godzin, w których odbierasz telefon'
      ]
    },
    {
      icon: 'refresh',
      title: 'Remarketing',
      text: 'Dla osób, które były na stronie i nie zarezerwowały. W turystyce decyzja rzadko zapada za pierwszym razem.',
      list: [
        'Wykluczenie osób, które już zarezerwowały',
        'Osobny przekaz dla porzuconej rezerwacji',
        'Ograniczenie częstotliwości wyświetleń',
        'Kampania sezonowa do zeszłorocznych gości'
      ]
    },
    {
      icon: 'mapPin',
      title: 'Kampanie lokalne',
      text: 'Reklama w mapach — dla firm, do których klient przychodzi osobiście.',
      list: [
        'Promowanie wizytówki w mapach',
        'Kierowanie na osoby w pobliżu',
        'Mierzenie kliknięć w telefon i nawigację',
        'Kampanie punktowe na czas wydarzeń w regionie'
      ]
    }
  ],

  processH2: 'Jak zaczynamy',
  process: [
    {
      title: 'Rachunek na start',
      text: 'Liczymy, ile może kosztować pozyskanie jednego zapytania i czy przy Twojej marży to się spina. Jeśli nie — mówimy o tym przed podpisaniem umowy.'
    },
    {
      title: 'Konfiguracja',
      text: 'Struktura kampanii, frazy, wykluczenia, teksty reklam i śledzenie konwersji. Bez śledzenia nie ruszamy — inaczej po miesiącu nie da się ocenić, co zadziałało.'
    },
    {
      title: 'Pierwsze dwa tygodnie',
      text: 'Faza uczenia. Zbieramy dane, wycinamy frazy przepalające budżet, testujemy warianty reklam. Koszt zapytania w tym okresie bywa wyższy — to normalne.'
    },
    {
      title: 'Optymalizacja',
      text: 'Stała praca nad obniżaniem kosztu zapytania. Co miesiąc raport pokazujący, ile kosztowało pozyskanie jednego kontaktu i skąd przyszedł.'
    }
  ],

  faqH2: 'Pytania o Google Ads',
  faq: [
    {
      q: 'Jaki budżet reklamowy jest potrzebny na start?',
      a: '<p>Dla firmy lokalnej działającej w jednej miejscowości sensowne minimum to 1 000–1 500 zł miesięcznie budżetu reklamowego (poza naszą obsługą). Poniżej tego progu danych jest za mało, żeby kampania wyszła z fazy uczenia i żeby optymalizacja miała na czym pracować. W szczycie sezonu budżety bywają kilkukrotnie wyższe — ale wtedy też zwrot jest najlepszy.</p>'
    },
    {
      q: 'Czy pobieracie prowizję od budżetu reklamowego?',
      a: '<p>Nie. Płacisz stałą kwotę za obsługę, a budżet reklamowy rozliczasz bezpośrednio z Google, ze swojej karty. Uważamy, że prowizja od wydatku tworzy zły układ zachęt: im więcej wydasz, tym więcej zarabia agencja — nawet jeśli efektywność spada. Konto reklamowe zakładamy na Twoje dane, więc masz do niego pełny wgląd i zostaje Twoje po zakończeniu współpracy.</p>'
    },
    {
      q: 'Czy Google Ads pomaga w pozycjonowaniu?',
      a: '<p>Bezpośrednio nie — reklamy nie wpływają na pozycje organiczne, wbrew temu, co czasem się słyszy. Pośrednio jednak bardzo pomagają: kampania w kilka tygodni pokazuje, które frazy faktycznie prowadzą do kontaktu, a nie tylko generują wejścia. Tę wiedzę przenosimy potem do strategii SEO, zamiast zgadywać przez pół roku. Dlatego przy nowych klientach często zaczynamy od krótkiej kampanii testowej.</p>'
    },
    {
      q: 'Prowadziliśmy kampanię sami i przepaliliśmy budżet. Co robicie inaczej?',
      a: '<p>Najczęstsza przyczyna przepalonego budżetu to brak wykluczeń i zbyt szerokie dopasowanie fraz. Reklama pensjonatu wyświetla się wtedy na „praca w pensjonacie" albo „pensjonat dla seniorów" — klikają ludzie, którzy nigdy nie zarezerwują. Druga przyczyna to brak śledzenia konwersji: bez niego optymalizuje się kliknięcia zamiast zapytań. Zaczynamy od naprawy obu tych rzeczy, zwykle jeszcze w pierwszym tygodniu.</p>'
    }
  ],

  related: [
    { label: 'Usługa', title: 'Pozycjonowanie długoterminowe', href: '/uslugi/pozycjonowanie-seo/' },
    { label: 'Usługa', title: 'Audyt przed startem kampanii', href: '/uslugi/audyt-seo/' },
    { label: 'Cennik', title: 'Koszt obsługi kampanii', href: '/cennik/' },
    { label: 'Kontakt', title: 'Policzmy, czy to się spina', href: '/kontakt/' }
  ],

  cta: {
    h2: 'Policzmy, czy reklama się u Ciebie spina',
    text: 'Podaj średnią wartość zlecenia albo rezerwacji — oszacujemy, ile może kosztować pozyskanie klienta z reklamy i czy warto ją włączać.',
    primary: { label: 'Zapytaj o kampanię', href: '/kontakt/' }
  }
});

export const servicePages = [uslugiPage, seoPage, wwwPage, auditPage, adsPage];
