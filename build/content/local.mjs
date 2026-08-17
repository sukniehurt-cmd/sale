/* ==========================================================================
   Podstrony lokalne — /pozycjonowanie/<miasto>/
   --------------------------------------------------------------------------
   UWAGA — najważniejsza zasada tego pliku:

   Podstrony lokalne to obszar, w którym najłatwiej zrobić sobie krzywdę.
   Wygenerowanie dwudziestu bliźniaczych stron, w których podmieniono tylko
   nazwę miejscowości, to klasyczna definicja doorway pages — Google nazywa
   je wprost w swoich wytycznych i traktuje jako spam. Efektem bywa spadek
   widoczności CAŁEJ domeny, nie tylko tych stron.

   Dlatego każda z poniższych stron opisuje realnie inny rynek: inną strukturę
   branż, inny poziom konkurencji, inną sezonowość i inne frazy. Treść nie
   powtarza się między miastami. Miejscowości, dla których nie mamy nic
   odrębnego do powiedzenia, NIE dostają własnej podstrony — pojawiają się
   wyłącznie na liście obszaru działania (patrz `areas` w site.mjs).
   ========================================================================== */

import { site } from './site.mjs';
import { serviceSchema, faqSchema } from '../lib/schema.mjs';
import {
  pageHead,
  sectionHead,
  faqList,
  iconCard,
  steps,
  ctaBand,
  relatedLinks,
  areaChips,
  stats
} from '../lib/components.mjs';

const HOME_CRUMB = { label: 'Strona główna', href: '/' };

function localPage(cfg) {
  const url = `${site.url}/pozycjonowanie/${cfg.slug}/`;
  const crumbs = [
    HOME_CRUMB,
    { label: 'Obszar działania', href: '/uslugi/' },
    { label: `Pozycjonowanie ${cfg.city}` }
  ];

  return {
    path: `/pozycjonowanie/${cfg.slug}/`,
    title: cfg.title,
    description: cfg.description,
    crumbs,
    schema: [
      serviceSchema({
        url,
        name: `Pozycjonowanie stron internetowych — ${cfg.city}`,
        description: cfg.description,
        serviceType: 'Local SEO'
      }),
      faqSchema(url, cfg.faq)
    ],
    body: `
${pageHead({
  crumbs,
  eyebrow: `Pozycjonowanie ${cfg.city}`,
  h1: cfg.h1,
  lead: cfg.lead
})}

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        ${sectionHead({ eyebrow: 'Specyfika rynku', h2: cfg.marketH2 })}
        ${cfg.marketBody}
      </div>
      <div>
        ${stats(cfg.stats)}
        <div class="note" style="margin-top:1.5rem">
          <p><strong>Jak czytać te liczby.</strong> ${cfg.statsNote}</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Branże',
      h2: cfg.branchesH2,
      lead: cfg.branchesLead,
      center: true
    })}
    <div class="grid grid--3">
      ${cfg.branches.map((b) => iconCard(b)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Frazy',
      h2: `Na jakie zapytania pozycjonujemy firmy ${cfg.inflected}`,
      lead: 'Przykłady z projektów prowadzonych w tej okolicy. Dobór fraz zawsze zaczynamy od danych, nie od intuicji.'
    })}
    <div class="table-scroll">
      <table style="width:100%;border-collapse:collapse;font-size:.9375rem">
        <thead>
          <tr>
            <th style="text-align:left;padding:.75rem;background:var(--snow);border-bottom:1px solid var(--line)">Typ zapytania</th>
            <th style="text-align:left;padding:.75rem;background:var(--snow);border-bottom:1px solid var(--line)">Przykład</th>
            <th style="text-align:left;padding:.75rem;background:var(--snow);border-bottom:1px solid var(--line)">Trudność</th>
          </tr>
        </thead>
        <tbody>
          ${cfg.keywords
            .map(
              (k) => `<tr>
            <td style="padding:.75rem;border-bottom:1px solid var(--line)">${k.type}</td>
            <td style="padding:.75rem;border-bottom:1px solid var(--line)"><em>${k.example}</em></td>
            <td style="padding:.75rem;border-bottom:1px solid var(--line)">${k.difficulty}</td>
          </tr>`
            )
            .join('\n          ')}
        </tbody>
      </table>
    </div>
    <p style="margin-top:1.5rem;font-size:.9375rem;color:var(--muted)">
      Trudność oceniamy na podstawie tego, kto zajmuje pierwszą stronę wyników —
      nie na podstawie wskaźnika z narzędzia. Fraza „trudna" nie znaczy „nie do zdobycia";
      znaczy, że wymaga dłuższej pracy i mocniejszego zaplecza.
    </p>
  </div>
</section>

<section class="section section--navy">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Plan działania',
      h2: `Jak wygląda współpraca z firmą ${cfg.inflected}`
    })}
    ${steps(cfg.plan)}
  </div>
</section>

${cfg.extra || ''}

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Pytania i odpowiedzi',
      h2: `Pozycjonowanie ${cfg.city} — najczęstsze pytania`,
      center: true
    })}
    ${faqList(cfg.faq)}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      h2: 'Pozostałe miejscowości, w których pracujemy',
      lead: 'Obsługujemy całe Podhale i okolice. Poniżej miejscowości, z których najczęściej mamy klientów.'
    })}
    ${areaChips(cfg.slug)}
  </div>
</section>

${relatedLinks(cfg.related, 'Sprawdź również')}

${ctaBand({
  h2: cfg.ctaH2,
  text: cfg.ctaText
})}
`
  };
}

/* ==========================================================================
   ZAKOPANE — rynek najbardziej konkurencyjny w regionie
   ========================================================================== */
export const zakopanePage = localPage({
  slug: 'zakopane',
  city: 'Zakopane',
  inflected: 'z Zakopanego',
  title: 'Pozycjonowanie stron Zakopane | Tatry Marketing',
  description:
    'Pozycjonowanie stron w Zakopanem. Najtrudniejszy rynek na Podhalu — pokazujemy, jak firmy wchodzą tu do pierwszej trójki mimo portali rezerwacyjnych.',
  h1: 'Pozycjonowanie stron w Zakopanem',
  lead: 'Najbardziej zatłoczony rynek w całym regionie. Zamiast walczyć o frazy, których nie da się wygrać, budujemy widoczność tam, gdzie portale rezerwacyjne są słabe.',

  marketH2: 'Rynek, na którym ogólne frazy są już rozdane',
  marketBody: `
        <p>
          Zakopane to jedyna miejscowość na Podhalu, w której zapytania ogólne
          są praktycznie poza zasięgiem lokalnej firmy. Pierwszą stronę na
          <em>„nocleg Zakopane"</em> zajmują serwisy z dziesiątkami tysięcy podstron
          i budżetami nieporównywalnymi z niczym w regionie. Walka o tę frazę
          to najdroższy sposób, żeby nie osiągnąć nic.
        </p>
        <p>
          Dobra wiadomość jest taka, że te same portale mają wyraźne słabe punkty.
          Nie radzą sobie z zapytaniami zawierającymi konkret — nazwę dzielnicy,
          udogodnienie, sytuację gościa. I to jest przestrzeń, w której lokalna
          firma może wygrać.
        </p>
        <p><strong>Trzy kierunki, które sprawdzają się w Zakopanem:</strong></p>
        <ul class="checklist">
          <li><strong>Dzielnice i przysiółki zamiast miasta</strong> Krzeptówki, Olcza, Kościelisko, Ząb, Murzasichle, Małe Ciche. Konkurencja spada tam drastycznie, a intencja zakupowa rośnie — kto wpisuje nazwę dzielnicy, ten już wie, czego szuka.</li>
          <li><strong>Udogodnienia jako fraza</strong> „z balią", „z sauną", „z psem", „z parkingiem", „blisko wyciągu", „dla rodziny z małym dzieckiem". Portale opisują to filtrami, nie treścią — dlatego przegrywają z dedykowaną podstroną.</li>
          <li><strong>Wydarzenia i sezony</strong> Puchar Świata na Wielkiej Krokwi, sylwester na Krupówkach, ferie w konkretnym województwie, długie weekendy. Te frazy trzeba przygotować kwartał wcześniej — kto zdąży, ten zbiera cały ruch.</li>
        </ul>`,

  stats: [
    { value: '4 mln', label: 'turystów rocznie odwiedza Zakopane i okolice' },
    { value: '~70%', label: 'ruchu turystycznego przypada na dwa szczyty sezonu' },
    { value: '17%', label: 'średnia prowizja oddawana portalom rezerwacyjnym' },
    { value: '3×', label: 'tyle wyższa konkurencja niż w pozostałych miastach regionu' }
  ],
  statsNote:
    'Skala ruchu turystycznego w Zakopanem oznacza jedno: nawet wąska fraza z pozoru niszowa potrafi tu dać więcej zapytań niż fraza ogólna w mniejszej miejscowości. Dlatego strategia oparta na konkretach działa lepiej niż walka o zapytania ogólne.',

  branchesH2: 'Branże, z którymi pracujemy w Zakopanem',
  branchesLead:
    'Każda z nich ma inną sezonowość i inne zapytania — to nie jest jeden rynek, tylko kilka nakładających się na siebie.',
  branches: [
    {
      icon: 'building',
      title: 'Obiekty noclegowe',
      text: 'Największa grupa klientów i najtrudniejsza konkurencja. Cel jest zawsze ten sam: odzyskać część rezerwacji od portali.',
      list: [
        'Osobna podstrona dla każdego typu pokoju',
        'Strony pod udogodnienia i grupy gości',
        'Podstrony sezonowe przygotowane z wyprzedzeniem',
        'Optymalizacja ścieżki rezerwacji bezpośredniej'
      ]
    },
    {
      icon: 'users',
      title: 'Gastronomia i atrakcje',
      text: 'Karczmy, restauracje, wypożyczalnie sprzętu, szkoły narciarskie, parki linowe, przewodnicy.',
      list: [
        'Widoczność w mapach jest tu ważniejsza niż w wynikach',
        'Zdjęcia i opinie decydują o kliknięciu',
        'Frazy wokół konkretnych lokalizacji i szlaków',
        'Kampanie punktowe na czas wydarzeń'
      ]
    },
    {
      icon: 'handshake',
      title: 'Usługi dla turystyki',
      text: 'Firmy obsługujące obiekty: pralnie, sprzątanie, catering, obsługa techniczna, transfery.',
      list: [
        'Rynek B2B, zupełnie inne frazy',
        'Mniejsza konkurencja, wyższa wartość klienta',
        'Nacisk na treści budujące wiarygodność',
        'Widoczność całoroczna, nie sezonowa'
      ]
    }
  ],

  keywords: [
    { type: 'Ogólna (odradzamy)', example: 'nocleg Zakopane', difficulty: 'Bardzo trudna — portale' },
    { type: 'Dzielnica', example: 'pokoje Krzeptówki Zakopane', difficulty: 'Średnia' },
    { type: 'Udogodnienie', example: 'domek z balią Zakopane', difficulty: 'Średnia' },
    { type: 'Grupa gości', example: 'nocleg z psem Zakopane centrum', difficulty: 'Łatwa' },
    { type: 'Wydarzenie', example: 'nocleg Puchar Świata Zakopane', difficulty: 'Łatwa (sezonowa)' },
    { type: 'Usługa lokalna', example: 'wypożyczalnia nart Zakopane Krupówki', difficulty: 'Średnia' },
    { type: 'B2B', example: 'pralnia dla hoteli Zakopane', difficulty: 'Łatwa' }
  ],

  plan: [
    {
      title: 'Analiza konkurencji',
      text: 'Sprawdzamy, kto realnie zajmuje pierwszą stronę na interesujące Cię frazy. W Zakopanem to kluczowy etap — połowa fraz z pierwszego briefu zwykle odpada jako niemożliwa do wygrania.'
    },
    {
      title: 'Mapa fraz do zdobycia',
      text: 'Budujemy listę zapytań konkretnych: dzielnice, udogodnienia, sytuacje gości. To one dają realny ruch, a nie zapytania ogólne.'
    },
    {
      title: 'Rozbudowa struktury',
      text: 'Osobna podstrona pod każdą wyznaczoną intencję. Na tym etapie strona zwykle rośnie z pięciu podstron do kilkunastu.'
    },
    {
      title: 'Wizytówka i sezony',
      text: 'Równolegle porządkujemy wizytówkę Google i przygotowujemy treści sezonowe z wyprzedzeniem — tak, by szczyt zastał stronę gotową.'
    }
  ],

  faq: [
    {
      q: 'Czy da się wejść na pierwszą stronę na frazę „nocleg Zakopane"?',
      a: '<p>Uczciwa odpowiedź: dla pojedynczego obiektu praktycznie nie. Pierwszą stronę zajmują serwisy agregujące tysiące ofert, budowane od kilkunastu lat. Nawet gdyby udało się tam wejść, ruch z takiej frazy jest niskiej jakości — to ludzie na etapie rozglądania się, którzy odwiedzą jeszcze kilkadziesiąt stron. Znacznie lepiej opłaca się być pierwszym na dziesięć fraz konkretnych, które razem dają więcej zapytań i o wiele wyższą konwersję.</p>'
    },
    {
      q: 'Mamy obiekt poza ścisłym centrum. To problem?',
      a: '<p>Przeciwnie — to przewaga w wyszukiwarce. Frazy z nazwami dzielnic i okolicznych miejscowości (Krzeptówki, Olcza, Ząb, Murzasichle, Małe Ciche) mają wielokrotnie niższą konkurencję niż frazy z samym „Zakopane", a użytkownik, który je wpisuje, ma bardzo konkretne oczekiwanie. Często wystarczy jedna porządna, dedykowana podstrona, żeby wejść do pierwszej trójki. Warto też opisać dojazd i odległości — to treść, której portale nie mają.</p>'
    },
    {
      q: 'Kiedy zacząć przygotowania do sezonu zimowego?',
      a: '<p>Najpóźniej we wrześniu, a optymalnie w sierpniu. Nowa podstrona potrzebuje zwykle 6–12 tygodni, żeby zbudować pozycję na frazę sezonową. Strona pod sylwestra opublikowana w listopadzie nie zdąży — ta sama strona zbudowana w sierpniu i odświeżona w październiku zbierze ruch przez cały grudzień. Ta sama zasada dotyczy ferii: przygotowanie zaczynamy w listopadzie, nie w styczniu.</p>'
    },
    {
      q: 'Czy warto pozycjonować się w językach obcych?',
      a: '<p>Zależy od struktury gości. Jeśli istotną część stanowią Czesi, Słowacy, Węgrzy albo Brytyjczycy, wersja obcojęzyczna bywa opłacalna — konkurencja jest tam znacznie niższa niż na frazach polskich. Warunek jest jeden: to muszą być teksty napisane przez człowieka znającego język, a nie przepuszczone przez tłumacza automatycznego, oraz poprawnie wdrożone znaczniki <code>hreflang</code>. Źle zrobiona wielojęzyczność potrafi zaszkodzić wersji polskiej.</p>'
    }
  ],

  related: [
    { label: 'Usługa', title: 'Na czym polega pozycjonowanie', href: '/uslugi/pozycjonowanie-seo/' },
    { label: 'Poradnik', title: 'Jak wypozycjonować pensjonat', href: '/blog/pozycjonowanie-pensjonatu-w-zakopanem/' },
    { label: 'Lokalnie', title: 'Pozycjonowanie Nowy Targ', href: '/pozycjonowanie/nowy-targ/' },
    { label: 'Cennik', title: 'Ile to kosztuje', href: '/cennik/' }
  ],

  ctaH2: 'Sprawdźmy, gdzie jesteś na tle konkurencji z Zakopanego',
  ctaText:
    'Bezpłatna analiza: Twój obiekt i trzy obiekty konkurencyjne z okolicy, z listą fraz, na których Cię wyprzedzają. Bez zobowiązań.'
});

/* ==========================================================================
   NOWY TARG — rynek handlowo-usługowy, nie turystyczny
   ========================================================================== */
export const nowyTargPage = localPage({
  slug: 'nowy-targ',
  city: 'Nowy Targ',
  inflected: 'z Nowego Targu',
  title: 'Pozycjonowanie stron Nowy Targ | Tatry Marketing',
  description:
    'Pozycjonowanie stron w Nowym Targu. Rynek handlowo-usługowy, nie turystyczny — inne frazy, niższa konkurencja i klient całoroczny zamiast sezonowego.',
  h1: 'Pozycjonowanie stron w Nowym Targu',
  lead: 'Stolica Podhala rządzi się zupełnie inną logiką niż Zakopane. Mniej turystyki, więcej handlu, usług i rzemiosła — a to oznacza inne frazy i o wiele niższą konkurencję.',

  marketH2: 'Klient całoroczny zamiast sezonowego',
  marketBody: `
        <p>
          Nowy Targ bywa traktowany jako „Zakopane, tylko mniejsze". To błąd,
          który kosztuje firmy realne pieniądze. Tutejszy rynek jest przede wszystkim
          handlowo-usługowy: największe targowisko w tej części Polski, tradycja
          wyrobów skórzanych, warsztaty, firmy budowlane i instalacyjne, hurtownie,
          gabinety, transport.
        </p>
        <p>
          Konsekwencje dla pozycjonowania są bardzo konkretne:
        </p>
        <ul class="checklist">
          <li><strong>Ruch jest równomierny przez cały rok</strong> Nie ma dwóch szczytów i martwego listopada. To ułatwia planowanie i sprawia, że efekty SEO są stabilniejsze niż w obiektach turystycznych.</li>
          <li><strong>Konkurencja w wyszukiwarce jest niska</strong> Wiele firm z Nowego Targu nadal nie ma strony albo ma taką sprzed dekady. Wejście do pierwszej trójki bywa tu kwestią kilku miesięcy, nie lat.</li>
          <li><strong>Zasięg jest szerszy niż samo miasto</strong> Firma usługowa z Nowego Targu obsługuje zwykle cały powiat. Frazy trzeba budować pod okoliczne miejscowości, nie tylko pod miasto.</li>
          <li><strong>Wartość pojedynczego klienta jest wysoka</strong> Jedno zlecenie budowlane albo instalacyjne bywa warte więcej niż kilkanaście rezerwacji noclegowych — dlatego nawet niewielki ruch potrafi się tu bardzo dobrze zwracać.</li>
        </ul>`,

  stats: [
    { value: '~33 tys.', label: 'mieszkańców miasta, ok. 90 tys. w powiecie' },
    { value: 'Cały rok', label: 'równomierne zapotrzebowanie, bez martwych miesięcy' },
    { value: 'Niska', label: 'konkurencja w wyszukiwarce w większości branż usługowych' },
    { value: '3–6 mies.', label: 'typowy czas wejścia do pierwszej trójki lokalnie' }
  ],
  statsNote:
    'Niska konkurencja to okno, które się zamyka. Firmy, które zbudują widoczność teraz, będą ją utrzymywać znacznie mniejszym kosztem niż te, które zaczną za trzy lata — pozycje raz zdobyte broni się taniej, niż się je zdobywa.',

  branchesH2: 'Branże, z którymi pracujemy w Nowym Targu',
  branchesLead:
    'Rynek zdominowany przez usługi i rzemiosło. Klient szuka wykonawcy z okolicy i zwykle dzwoni, zamiast wypełniać formularz.',
  branches: [
    {
      icon: 'building',
      title: 'Budownictwo i rzemiosło',
      text: 'Firmy ogólnobudowlane, ciesielskie, dekarskie, instalacyjne, wykończeniowe, stolarnie.',
      list: [
        'Osobna podstrona pod każdą usługę',
        'Frazy z nazwami okolicznych miejscowości',
        'Galeria realizacji jako główny argument sprzedażowy',
        'Telefon widoczny na każdym ekranie'
      ]
    },
    {
      icon: 'handshake',
      title: 'Handel i hurt',
      text: 'Sklepy, hurtownie, wyroby skórzane, materiały budowlane, motoryzacja.',
      list: [
        'Widoczność w mapach na pierwszym miejscu',
        'Aktualne godziny i asortyment w wizytówce',
        'Frazy typu „gdzie kupić" i „sklep w pobliżu"',
        'Zdjęcia wnętrza sklepu w wizytówce'
      ]
    },
    {
      icon: 'users',
      title: 'Usługi profesjonalne',
      text: 'Gabinety, kancelarie, biura rachunkowe, szkoły jazdy, warsztaty.',
      list: [
        'Treści budujące wiarygodność i kompetencje',
        'Systematyczne zbieranie opinii',
        'Odpowiedzi na typowe pytania klientów',
        'Sylwetki osób w zespole'
      ]
    }
  ],

  keywords: [
    { type: 'Usługa + miasto', example: 'firma budowlana Nowy Targ', difficulty: 'Średnia' },
    { type: 'Usługa + okolica', example: 'dekarz powiat nowotarski', difficulty: 'Łatwa' },
    { type: 'Wąska specjalizacja', example: 'więźba dachowa na wymiar Podhale', difficulty: 'Łatwa' },
    { type: 'Zakupowa', example: 'kożuchy Nowy Targ targowisko', difficulty: 'Średnia' },
    { type: 'Pilna potrzeba', example: 'hydraulik Nowy Targ całodobowo', difficulty: 'Średnia' },
    { type: 'Profesjonalna', example: 'biuro rachunkowe Nowy Targ ceny', difficulty: 'Łatwa' }
  ],

  plan: [
    {
      title: 'Zasięg działania',
      text: 'Ustalamy, jak daleko realnie dojeżdżacie do klienta. To wyznacza listę miejscowości, pod które budujemy treści — i decyduje o połowie skuteczności.'
    },
    {
      title: 'Rozbicie usług',
      text: 'Jedna podstrona „Usługi" z listą punktowaną nie wygra z niczym. Rozbijamy ofertę na osobne podstrony, każda pod inną intencję.'
    },
    {
      title: 'Dowody realizacji',
      text: 'W rzemiośle zdjęcia wykonanych prac przekonują bardziej niż jakikolwiek tekst. Budujemy z nich galerię, która jednocześnie pracuje na SEO.'
    },
    {
      title: 'Wizytówka i opinie',
      text: 'W usługach lokalnych mapy odpowiadają za większość telefonów. Konfigurujemy wizytówkę i wdrażamy proces zbierania opinii po każdym zleceniu.'
    }
  ],

  faq: [
    {
      q: 'Prowadzę jednoosobową firmę budowlaną. Czy SEO ma dla mnie sens?',
      a: '<p>Zwykle tak, i to bardziej niż dla dużych firm. Konkurencja w wyszukiwarce w tej branży w powiecie nowotarskim jest wciąż niska — wiele firm nie ma strony w ogóle albo ma wizytówkę bez treści. Przy jednoosobowej działalności wystarczy prosta strona z rozbiciem na usługi, galerią realizacji i porządnie prowadzoną wizytówką Google. Trzeba jednak policzyć na starcie: jeśli macie komplet zleceń z poleceń na rok naprzód, inwestycja w SEO może po prostu nie mieć sensu i powiemy to wprost.</p>'
    },
    {
      q: 'Klienci i tak dzwonią, nie piszą. Po co mi strona?',
      a: '<p>Właśnie dlatego, że dzwonią. Zanim ktoś zadzwoni, sprawdza firmę w Google — a jeśli nic nie znajduje albo trafia na stronę sprzed dekady, dzwoni do kogoś innego. Strona w tej branży nie ma zbierać formularzy, tylko doprowadzić do telefonu. Dlatego numer musi być widoczny i klikalny na każdym ekranie, a galeria realizacji ma odpowiadać na pytanie „czy ci ludzie robią porządną robotę".</p>'
    },
    {
      q: 'Obsługuję cały powiat. Czy potrzebuję strony pod każdą miejscowość?',
      a: '<p>Nie. Osobne podstrony mają sens tylko dla tych miejscowości, gdzie faktycznie macie realizacje i możecie napisać coś konkretnego — na przykład pokazać wykonane tam prace. Generowanie dwudziestu bliźniaczych stron różniących się wyłącznie nazwą wsi to doorway pages, które Google traktuje jako spam. Bezpieczniejsze i skuteczniejsze jest wymienienie obszaru działania na stronie usługi oraz poprawne ustawienie zasięgu w wizytówce Google.</p>'
    },
    {
      q: 'Ile to trwa w Nowym Targu?',
      a: '<p>Krócej niż w Zakopanem, bo konkurencja jest niższa. Przy frazach usługowych z nazwą miasta pierwsze wejścia do pierwszej trójki widzimy zwykle po 3–4 miesiącach, przy frazach z okolicznymi miejscowościami czasem już po 6–8 tygodniach. Warunek jest jeden: strona musi mieć poprawną technikę na starcie. Jeśli ładuje się pięć sekund, żadna treść tego nie nadrobi.</p>'
    }
  ],

  related: [
    { label: 'Usługa', title: 'Pozycjonowanie SEO — zakres prac', href: '/uslugi/pozycjonowanie-seo/' },
    { label: 'Usługa', title: 'Strona dla firmy usługowej', href: '/uslugi/strony-internetowe/' },
    { label: 'Lokalnie', title: 'Pozycjonowanie Rabka-Zdrój', href: '/pozycjonowanie/rabka-zdroj/' },
    { label: 'Poradnik', title: 'Wizytówka Google krok po kroku', href: '/blog/wizytowka-google-firma-podhale/' }
  ],

  ctaH2: 'Sprawdźmy, czego szukają Twoi klienci w Nowym Targu',
  ctaText:
    'Przygotujemy listę fraz, na które ludzie z powiatu szukają Twoich usług, wraz z informacją, kto jest na nich dziś widoczny. Bezpłatnie i bez zobowiązań.'
});

/* ==========================================================================
   RABKA-ZDRÓJ — uzdrowisko, turystyka zdrowotna i rodzinna
   ========================================================================== */
export const rabkaPage = localPage({
  slug: 'rabka-zdroj',
  city: 'Rabka-Zdrój',
  inflected: 'z Rabki-Zdroju',
  title: 'Pozycjonowanie stron Rabka-Zdrój | Tatry Marketing',
  description:
    'Pozycjonowanie stron w Rabce-Zdroju. Uzdrowisko, turystyka rodzinna i zdrowotna — inne frazy, dłuższy proces decyzyjny i ruch przez cały rok.',
  h1: 'Pozycjonowanie stron w Rabce-Zdroju',
  lead: 'Uzdrowisko rządzi się własnymi prawami: gość planuje pobyt z dużym wyprzedzeniem, porównuje dłużej, a decyzję często podejmuje w imieniu kogoś innego — dziecka lub rodzica.',

  marketH2: 'Dłuższa decyzja, wyższa stawka za zaufanie',
  marketBody: `
        <p>
          Rabka to jedyne miejsce w naszym obszarze działania, gdzie turystyka
          zdrowotna i rodzinna dominuje nad wypoczynkową. Uzdrowisko dziecięce,
          sanatoria, turnusy rehabilitacyjne, ośrodki wypoczynku rodzinnego —
          i wynikający z tego zupełnie inny profil wyszukiwań.
        </p>
        <p>
          Kluczowa różnica: <strong>tutaj rzadko decyduje osoba, która skorzysta z pobytu</strong>.
          Decyduje rodzic dziecka albo dorosłe dziecko starszego rodzica. To zmienia
          wszystko — od doboru fraz po sposób pisania treści.
        </p>
        <ul class="checklist">
          <li><strong>Wyszukiwanie z dużym wyprzedzeniem</strong> Turnusy rezerwuje się na miesiące naprzód. Treści muszą być gotowe dużo wcześniej niż w klasycznej turystyce — i muszą wytrzymać wielokrotne powroty tego samego użytkownika.</li>
          <li><strong>Pytania zamiast haseł</strong> Ludzie wpisują całe zdania: „czy dziecko z astmą może jechać na turnus", „ile trwa turnus rehabilitacyjny NFZ". Odpowiedź na takie pytanie w treści strony wygrywa z ofertą napisaną hasłami.</li>
          <li><strong>Zaufanie ponad cenę</strong> Kadra, certyfikaty, warunki, konkretny opis zabiegów, zdjęcia rzeczywistych pomieszczeń. To one przekonują — nie hasła marketingowe.</li>
          <li><strong>Ruch całoroczny</strong> Sanatoria działają przez cały rok, a największy ruch w wyszukiwaniach przypada nie na wakacje, lecz na okres planowania: styczeń–marzec i wrzesień–październik.</li>
        </ul>`,

  stats: [
    { value: 'Cały rok', label: 'sanatoria i turnusy działają bez przerwy sezonowej' },
    { value: '2–6 mies.', label: 'z takim wyprzedzeniem szuka się turnusu' },
    { value: 'Rodzic', label: 'najczęściej to on szuka, nie osoba korzystająca z pobytu' },
    { value: 'Niska', label: 'konkurencja na frazy pytające i szczegółowe' }
  ],
  statsNote:
    'Długi proces decyzyjny to szansa: użytkownik wraca na stronę kilkukrotnie, zanim zdecyduje. Wygrywa ten, kto na każdym etapie odpowie na kolejne pytanie — dlatego treści poradnikowe mają tu wyższą wartość niż gdziekolwiek indziej w regionie.',

  branchesH2: 'Branże, z którymi pracujemy w Rabce',
  branchesLead: 'Wspólny mianownik: klient podejmuje decyzję wolniej i potrzebuje więcej dowodów.',
  branches: [
    {
      icon: 'shield',
      title: 'Sanatoria i ośrodki',
      text: 'Turnusy rehabilitacyjne, pobyty NFZ i komercyjne, ośrodki dla dzieci.',
      list: [
        'Osobna podstrona dla każdego typu turnusu',
        'Wyjaśnienie procedur NFZ prostym językiem',
        'Opis kadry i wyposażenia',
        'Odpowiedzi na pytania o wskazania i przeciwwskazania'
      ]
    },
    {
      icon: 'users',
      title: 'Noclegi rodzinne',
      text: 'Pensjonaty i apartamenty nastawione na rodziny z dziećmi, często przy okazji turnusu.',
      list: [
        'Frazy wokół udogodnień dla dzieci',
        'Odległość od uzdrowiska i atrakcji',
        'Pobyty dłuższe niż weekendowe',
        'Treści o tym, co robić z dzieckiem w okolicy'
      ]
    },
    {
      icon: 'handshake',
      title: 'Zdrowie i rehabilitacja',
      text: 'Gabinety fizjoterapii, rehabilitacja, poradnie, usługi towarzyszące pobytom.',
      list: [
        'Wiarygodność jako główny czynnik wyboru',
        'Opis metod i kwalifikacji zrozumiały dla pacjenta',
        'Widoczność w mapach i systematyczne opinie',
        'Treści odpowiadające na pytania pacjentów'
      ]
    }
  ],

  keywords: [
    { type: 'Pytanie', example: 'ile trwa turnus rehabilitacyjny dla dziecka', difficulty: 'Łatwa' },
    { type: 'Usługa + miasto', example: 'sanatorium dla dzieci Rabka', difficulty: 'Trudna' },
    { type: 'Wskazanie', example: 'turnus dla dziecka z astmą Rabka', difficulty: 'Łatwa' },
    { type: 'Rodzinna', example: 'pensjonat dla rodzin z dziećmi Rabka-Zdrój', difficulty: 'Średnia' },
    { type: 'Proceduralna', example: 'skierowanie na turnus NFZ jak załatwić', difficulty: 'Średnia' },
    { type: 'Okolica', example: 'atrakcje dla dzieci Rabka okolice', difficulty: 'Łatwa' }
  ],

  plan: [
    {
      title: 'Mapa pytań',
      text: 'Zbieramy realne pytania, które zadają klienci — z telefonów, maili i z wyszukiwarki. To one, a nie hasła reklamowe, stają się szkieletem treści.'
    },
    {
      title: 'Treści wyjaśniające',
      text: 'Procedury NFZ, wskazania, przebieg turnusu, co spakować. Ten typ treści przyciąga ruch na długo przed decyzją i buduje zaufanie.'
    },
    {
      title: 'Dowody wiarygodności',
      text: 'Kadra z imienia i nazwiska, certyfikaty, zdjęcia rzeczywistych pomieszczeń, konkretne opisy zabiegów. W tej branży to działa mocniej niż cena.'
    },
    {
      title: 'Wyprzedzenie sezonowe',
      text: 'Treści pod okresy planowania — styczeń–marzec i wrzesień–październik — przygotowujemy kwartał wcześniej, żeby zdążyły zbudować pozycję.'
    }
  ],

  faq: [
    {
      q: 'Czy da się konkurować z dużymi sieciami sanatoriów?',
      a: '<p>Na frazy ogólne w rodzaju „sanatorium dla dzieci" — trudno. Ale na zapytania szczegółowe i pytające jak najbardziej. Duże ośrodki mają rozbudowane strony, lecz rzadko odpowiadają na konkretne wątpliwości rodziców: czy można przyjechać z rodzeństwem, jak wygląda dzień dziecka na turnusie, co jeśli dziecko ma dietę eliminacyjną. Mniejszy ośrodek, który odpowie na te pytania rzetelnie, wygrywa ten ruch — a jest to ruch od osób blisko decyzji.</p>'
    },
    {
      q: 'Czy w branży zdrowotnej obowiązują dodatkowe wymogi?',
      a: '<p>Tak, i warto o nich pamiętać. Google stosuje ostrzejsze kryteria wobec treści dotyczących zdrowia (kategoria „Your Money or Your Life"): oczekuje wyraźnego autorstwa, kwalifikacji i wiarygodnych źródeł. W praktyce oznacza to, że treści medyczne powinny być podpisane przez osobę z odpowiednim wykształceniem, a informacje o zabiegach — rzetelne i pozbawione obietnic wyleczenia. Do tego dochodzą przepisy o reklamie usług medycznych. Pilnujemy obu tych warstw przy pisaniu treści.</p>'
    },
    {
      q: 'Kiedy publikować treści na sezon?',
      a: '<p>Wcześniej, niż podpowiada intuicja. Główne okresy planowania turnusów to styczeń–marzec oraz wrzesień–październik. Treść potrzebuje 8–12 tygodni, żeby zbudować pozycję, więc materiały na sezon wiosenny przygotowujemy w listopadzie, a na jesienny — w czerwcu. To odwrotność klasycznej turystyki i najczęstszy błąd ośrodków, które publikują ofertę dopiero wtedy, gdy sezon się zaczyna.</p>'
    },
    {
      q: 'Mamy pensjonat, nie sanatorium. Czy to ten sam rynek?',
      a: '<p>Częściowo, i warto to wykorzystać. Rodziny przyjeżdżające na turnus dziecka często szukają noclegu dla siebie w pobliżu — to grupa niemal całkowicie pomijana przez konkurencję. Podstrona odpowiadająca wprost na potrzebę „nocleg dla rodzica przy turnusie dziecka w Rabce" trafia w intencję, na którą prawie nikt nie celuje, a która ma bardzo wysoką konwersję.</p>'
    }
  ],

  related: [
    { label: 'Usługa', title: 'Pozycjonowanie SEO — zakres prac', href: '/uslugi/pozycjonowanie-seo/' },
    { label: 'Usługa', title: 'Audyt przed startem', href: '/uslugi/audyt-seo/' },
    { label: 'Lokalnie', title: 'Pozycjonowanie Nowy Sącz', href: '/pozycjonowanie/nowy-sacz/' },
    { label: 'Cennik', title: 'Widełki cenowe', href: '/cennik/' }
  ],

  ctaH2: 'Zobaczmy, o co pytają Twoi przyszli goście',
  ctaText:
    'Przygotujemy listę realnych zapytań związanych z Twoją ofertą wraz z oceną, jak trudno na nie wejść. Bezpłatnie, bez zobowiązań.'
});

/* ==========================================================================
   NOWY SĄCZ — największy rynek, więcej B2B i e-commerce
   ========================================================================== */
export const nowySaczPage = localPage({
  slug: 'nowy-sacz',
  city: 'Nowy Sącz',
  inflected: 'z Nowego Sącza',
  title: 'Pozycjonowanie stron Nowy Sącz | Tatry Marketing',
  description:
    'Pozycjonowanie stron w Nowym Sączu. Największy rynek w regionie: produkcja, handel, e-commerce i usługi B2B. Wyższa konkurencja, ale i większa skala.',
  h1: 'Pozycjonowanie stron w Nowym Sączu',
  lead: 'Największe miasto w naszym zasięgu i jedyne, w którym rynek wykracza poza obsługę lokalnych klientów — z produkcją, handlem hurtowym i sprzedażą internetową w tle.',

  marketH2: 'Rynek, który sięga dalej niż własny powiat',
  marketBody: `
        <p>
          Nowy Sącz różni się od reszty naszego obszaru skalą i strukturą.
          To ośrodek z rozwiniętą produkcją, handlem hurtowym, firmami działającymi
          na terenie całej Polski i rosnącą liczbą sklepów internetowych. Turystyka
          jest tu ważna, ale nie jest głównym motorem gospodarki.
        </p>
        <p>
          W praktyce oznacza to, że część klientów z Nowego Sącza potrzebuje
          zupełnie innej strategii niż firma z Zakopanego:
        </p>
        <ul class="checklist">
          <li><strong>Frazy ogólnopolskie obok lokalnych</strong> Producent czy hurtownia nie konkuruje z sąsiadem, tylko z firmami z Warszawy i Poznania. To zmienia poziom trudności i wydłuża horyzont czasowy.</li>
          <li><strong>Sprzedaż internetowa</strong> Sklepy wymagają pracy nad kartami produktów, kategoriami i danymi strukturalnymi produktów — to inny warsztat niż strona usługowa.</li>
          <li><strong>Dłuższy proces sprzedaży w B2B</strong> Klient biznesowy czyta specyfikacje, porównuje i wraca kilkukrotnie. Wygrywają treści merytoryczne, nie hasła.</li>
          <li><strong>Wyższa konkurencja lokalna</strong> W usługach dla mieszkańców rynek jest tu bardziej nasycony niż w Nowym Targu — więcej firm ma strony i prowadzi działania w wyszukiwarce.</li>
        </ul>`,

  stats: [
    { value: '~80 tys.', label: 'mieszkańców — największe miasto w obszarze działania' },
    { value: 'Ogólnopolski', label: 'zasięg części firm produkcyjnych i handlowych' },
    { value: '6–12 mies.', label: 'realny horyzont dla fraz ogólnopolskich' },
    { value: 'Wysoka', label: 'konkurencja lokalna w usługach dla mieszkańców' }
  ],
  statsNote:
    'Frazy ogólnopolskie są trudniejsze, ale nieporównanie bardziej wartościowe. Jedno zapytanie hurtowe potrafi być warte tyle, co kilkadziesiąt zapytań lokalnych — dlatego przy firmach produkcyjnych dłuższy horyzont zwykle się opłaca.',

  branchesH2: 'Branże, z którymi pracujemy w Nowym Sączu',
  branchesLead: 'Trzy różne modele, każdy wymagający innego podejścia do treści i struktury strony.',
  branches: [
    {
      icon: 'building',
      title: 'Produkcja i B2B',
      text: 'Producenci, podwykonawcy, firmy sprzedające do innych firm w całym kraju.',
      list: [
        'Frazy branżowe zamiast lokalnych',
        'Treści techniczne i specyfikacje',
        'Katalogi produktów do pobrania',
        'Sylwetki firmy i realizacji jako dowód kompetencji'
      ]
    },
    {
      icon: 'code',
      title: 'Sklepy internetowe',
      text: 'E-commerce lokalny i ogólnopolski, sprzedaż własnych wyrobów.',
      list: [
        'Optymalizacja kategorii i kart produktów',
        'Dane strukturalne Product i Offer',
        'Szybkość ładowania listingów',
        'Treści poradnikowe przyciągające ruch na wczesnym etapie'
      ]
    },
    {
      icon: 'users',
      title: 'Usługi lokalne',
      text: 'Gabinety, warsztaty, gastronomia, usługi dla mieszkańców miasta.',
      list: [
        'Silna konkurencja — decyduje jakość wykonania',
        'Widoczność w mapach i opinie',
        'Frazy z dzielnicami i okolicznymi gminami',
        'Systematyczna praca nad treścią'
      ]
    }
  ],

  keywords: [
    { type: 'Lokalna usługowa', example: 'serwis klimatyzacji Nowy Sącz', difficulty: 'Średnia' },
    { type: 'Branżowa ogólnopolska', example: 'producent mebli na wymiar Małopolska', difficulty: 'Trudna' },
    { type: 'Produktowa', example: 'skrzynie transportowe drewniane sklep', difficulty: 'Trudna' },
    { type: 'Poradnikowa', example: 'jak dobrać rozmiar skrzyni transportowej', difficulty: 'Łatwa' },
    { type: 'B2B', example: 'podwykonawca konstrukcji stalowych Sądecczyzna', difficulty: 'Łatwa' },
    { type: 'Okolica', example: 'mechanik Stary Sącz', difficulty: 'Łatwa' }
  ],

  plan: [
    {
      title: 'Rozdzielenie rynków',
      text: 'Ustalamy, która część oferty walczy lokalnie, a która ogólnopolsko. To dwie różne strategie i mieszanie ich jest najczęstszym błędem w tym mieście.'
    },
    {
      title: 'Szybkie wygrane lokalnie',
      text: 'Zaczynamy od fraz lokalnych i okolicznych gmin — dają ruch w kilka miesięcy i finansują dłuższą pracę nad frazami trudniejszymi.'
    },
    {
      title: 'Budowa autorytetu',
      text: 'Równolegle pracujemy nad treściami branżowymi i linkami. Bez tego frazy ogólnopolskie pozostają poza zasięgiem, niezależnie od jakości strony.'
    },
    {
      title: 'Skalowanie',
      text: 'Gdy zaplecze zaczyna działać, przenosimy nacisk na frazy o największej wartości. To zwykle drugi rok współpracy.'
    }
  ],

  faq: [
    {
      q: 'Działamy w całej Polsce. Czy warto zaczynać od fraz lokalnych?',
      a: '<p>Zwykle tak. Frazy lokalne są łatwiejsze, dają ruch szybciej i budują wiarygodność domeny, która potem pomaga wejść na frazy trudniejsze. Traktujemy je jak rozbieg: pierwsze miesiące to widoczność w Nowym Sączu i okolicznych gminach, a równolegle powstaje zaplecze treściowe pod frazy ogólnopolskie. Próba atakowania od pierwszego dnia wyłącznie najtrudniejszych fraz zwykle kończy się półroczną ciszą i utratą cierpliwości.</p>'
    },
    {
      q: 'Prowadzimy sklep internetowy. Czym to się różni od strony usługowej?',
      a: '<p>Warsztatem. W sklepie największy potencjał leży zwykle w kategoriach, nie w stronie głównej — to one odpowiadają na frazy zakupowe. Do tego dochodzą karty produktów (unikalne opisy, nie te od producenta), dane strukturalne <code>Product</code> i <code>Offer</code>, obsługa wariantów, filtrów i paginacji tak, żeby nie tworzyły tysięcy duplikatów. Osobnym tematem jest szybkość — listing z setką produktów to zupełnie inne wyzwanie niż strona z pięcioma podstronami.</p>'
    },
    {
      q: 'Nowy Sącz to jeszcze Podhale?',
      a: '<p>Geograficznie to już Sądecczyzna, nie Podhale — i nie udajemy inaczej. Obsługujemy to miasto, bo jest w zasięgu dojazdu i bo znamy tutejszy rynek, ale specyfika jest inna niż w powiecie tatrzańskim czy nowotarskim. Mówimy o tym wprost, bo agencja twierdząca, że jest ekspertem od wszystkiego wszędzie, zwykle nie jest ekspertem nigdzie.</p>'
    },
    {
      q: 'Ile trwa wejście na frazy ogólnopolskie?',
      a: '<p>Realnie 6–12 miesięcy przy systematycznej pracy, a w branżach mocno konkurencyjnych dłużej. Nie ma tu skrótów — liczy się jakość treści, zaplecze linkowe i wiek domeny. Jeśli potrzebujecie zapytań szybciej, sensownym rozwiązaniem jest równoległa <a href="/uslugi/google-ads/">kampania Google Ads</a>, która dowozi ruch od pierwszego tygodnia, a przy okazji pokazuje, które frazy realnie konwertują — tę wiedzę przenosimy potem do strategii SEO.</p>'
    }
  ],

  related: [
    { label: 'Usługa', title: 'Pozycjonowanie SEO — zakres prac', href: '/uslugi/pozycjonowanie-seo/' },
    { label: 'Usługa', title: 'Google Ads na start', href: '/uslugi/google-ads/' },
    { label: 'Lokalnie', title: 'Pozycjonowanie Zakopane', href: '/pozycjonowanie/zakopane/' },
    { label: 'Realizacje', title: 'Projekty, które zrobiliśmy', href: '/realizacje/' }
  ],

  ctaH2: 'Ustalmy, gdzie leży Twój największy potencjał',
  ctaText:
    'Przeanalizujemy Twoją stronę pod kątem fraz lokalnych i branżowych, i pokażemy, które z nich są w zasięgu w najbliższych miesiącach.'
});

export const localPages = [zakopanePage, nowyTargPage, rabkaPage, nowySaczPage];
