/* ==========================================================================
   Pozostałe podstrony
   Realizacje, cennik, o nas, kontakt, FAQ, polityka prywatności, 404
   ========================================================================== */

import { site, areas, services } from './site.mjs';
import { icon } from '../lib/icons.mjs';
import { faqSchema } from '../lib/schema.mjs';
import {
  pageHead,
  sectionHead,
  faqList,
  iconCard,
  steps,
  quotes,
  stats,
  ctaBand,
  relatedLinks,
  areaChips,
  caseChart,
  servicesGrid
} from '../lib/components.mjs';
import { homeFaq } from './home.mjs';

const HOME_CRUMB = { label: 'Strona główna', href: '/' };

/* ==========================================================================
   /realizacje/
   --------------------------------------------------------------------------
   >>> DO_UZUPELNIENIA <<<
   Poniższe realizacje są przykładowe i opisane bez nazw firm. Przed publikacją
   zastąp je prawdziwymi projektami — najlepiej z nazwą klienta i jego zgodą
   na publikację wyników. Wyniki podawaj takie, jakie wynikają z Analytics
   i Search Console; zawyżone liczby są łatwe do zweryfikowania przez
   konkurencję i kosztują wiarygodność.
   ========================================================================== */

const cases = [
  {
    tag: 'Obiekt noclegowy · Zakopane',
    title: 'Pensjonat: rezerwacje bezpośrednie zamiast prowizji',
    problem:
      'Obiekt z dwunastoma pokojami, ponad 80% rezerwacji z portali, prowizja zjadająca marżę. Strona sprzed sześciu lat, ładowanie 5,4 s na telefonie, jedna zbiorcza podstrona „Oferta”.',
    work: [
      'Przebudowa strony z naciskiem na szybkość — kompresja galerii i format WebP',
      'Rozbicie oferty na osobne podstrony: typy pokoi, udogodnienia, pobyty sezonowe',
      'Podstrony pod frazy z dzielnicami i konkretnymi potrzebami gości',
      'Uporządkowanie wizytówki Google i wdrożenie procesu zbierania opinii'
    ],
    points: [8, 14, 22, 31, 45, 58, 71, 84],
    chartLabel: 'Wykres wzrostu widoczności w wynikach organicznych w ciągu dwunastu miesięcy',
    results: [
      { value: '5,4 s → 1,2 s', label: 'czas ładowania na telefonie' },
      { value: '+180%', label: 'ruch organiczny po 12 miesiącach' },
      { value: '38%', label: 'udział rezerwacji bezpośrednich (było 18%)' }
    ]
  },
  {
    tag: 'Usługi budowlane · powiat nowotarski',
    title: 'Firma ciesielska: telefony spoza kręgu poleceń',
    problem:
      'Firma rodzinna działająca wyłącznie z poleceń. Brak strony, wizytówka Google założona przez kogoś innego i nieaktualizowana od trzech lat. Zero widoczności na frazy usługowe.',
    work: [
      'Budowa strony z osobną podstroną dla każdej usługi (więźby, altany, tarasy, domy szkieletowe)',
      'Galeria realizacji z opisami i lokalizacjami wykonanych prac',
      'Przejęcie i pełna konfiguracja wizytówki Google',
      'Treści pod frazy z okolicznymi miejscowościami, gdzie firma miała realizacje'
    ],
    points: [0, 5, 12, 24, 38, 52, 66, 79],
    chartLabel: 'Wykres wzrostu liczby zapytań z wyszukiwarki w ciągu dziewięciu miesięcy',
    results: [
      { value: '0 → 26', label: 'frazy w pierwszej dziesiątce' },
      { value: '+14', label: 'zapytań miesięcznie z wyszukiwarki' },
      { value: '4 mies.', label: 'do pierwszego zlecenia z Google' }
    ]
  },
  {
    tag: 'Gastronomia · Rabka-Zdrój',
    title: 'Restauracja: widoczność w mapach poza sezonem',
    problem:
      'Restauracja z dobrą opinią wśród stałych gości, ale niewidoczna dla przyjezdnych. Wizytówka z błędną kategorią i godzinami, brak zdjęć, brak odpowiedzi na opinie.',
    work: [
      'Poprawa kategorii głównej i uzupełnienie atrybutów w wizytówce',
      'Sesja zdjęciowa wnętrza i dań, publikacja zdjęć w cyklu miesięcznym',
      'Wdrożenie procesu zbierania opinii i odpowiadania na wszystkie',
      'Strona z menu w formie tekstowej zamiast PDF — indeksowalna przez Google'
    ],
    points: [12, 18, 25, 36, 44, 57, 65, 74],
    chartLabel: 'Wykres wzrostu wyświetleń wizytówki w mapach w ciągu ośmiu miesięcy',
    results: [
      { value: '+220%', label: 'wyświetlenia wizytówki w mapach' },
      { value: '4,3 → 4,7', label: 'średnia ocena po roku' },
      { value: '+61%', label: 'kliknięcia „wyznacz trasę”' }
    ]
  }
];

export const realizacjePage = {
  path: '/realizacje/',
  title: 'Realizacje — case studies SEO i stron WWW | Tatry Marketing',
  description:
    'Przykładowe projekty SEO i stron internetowych dla firm z Podhala. Punkt wyjścia, wykonane prace i realne wyniki — pensjonat, firma ciesielska, restauracja.',
  crumbs: [HOME_CRUMB, { label: 'Realizacje' }],
  body: `
${pageHead({
  crumbs: [HOME_CRUMB, { label: 'Realizacje' }],
  eyebrow: 'Realizacje',
  h1: 'Projekty, przy których pracowaliśmy',
  lead: 'Trzy przykłady z różnych branż — z punktem wyjścia, listą wykonanych prac i wynikami. Bez zaokrąglania liczb w górę.'
})}

<section class="section">
  <div class="wrap">
    <div class="note" style="margin-bottom:2rem">
      <p>
        <strong>Uwaga o liczbach.</strong> Wszystkie wyniki pochodzą z Google Analytics
        i Search Console klientów. Nie podajemy nazw firm tam, gdzie nie mamy zgody
        na publikację — wolimy pominąć nazwę niż opisać projekt nieprecyzyjnie.
        Na spotkaniu chętnie pokażemy pełne dane z konkretnych wdrożeń.
      </p>
    </div>

    ${cases
      .map(
        (c) => `<article class="case">
      <div class="case__visual">
        ${caseChart(c.points, c.chartLabel)}
      </div>
      <div>
        <p class="case__tag">${c.tag}</p>
        <h2 style="font-size:var(--fs-h3)">${c.title}</h2>
        <p style="font-size:var(--fs-sm);margin-bottom:1rem"><strong>Punkt wyjścia:</strong> ${c.problem}</p>
        <p style="font-size:var(--fs-sm);font-weight:600;color:var(--ink);margin-bottom:.5rem">Co zrobiliśmy:</p>
        <ul class="card__list">
          ${c.work.map((w) => `<li>${w}</li>`).join('\n          ')}
        </ul>
        <div class="case__results">
          ${c.results
            .map(
              (r) => `<div>
            <p class="case__result-value">${r.value}</p>
            <p class="case__result-label">${r.label}</p>
          </div>`
            )
            .join('\n          ')}
        </div>
      </div>
    </article>`
      )
      .join('\n\n    ')}
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Wspólny mianownik',
      h2: 'Co powtarza się w każdym z tych projektów',
      lead: 'Mimo trzech różnych branż, punkt wyjścia wyglądał zaskakująco podobnie.',
      center: true
    })}
    <div class="grid grid--3">
      ${iconCard({
        icon: 'zap',
        title: 'Strona była wolna',
        text: 'W każdym przypadku ładowanie na telefonie przekraczało trzy sekundy. To najczęstszy i jednocześnie najłatwiejszy do naprawienia problem — zwykle wystarcza kompresja zdjęć.'
      })}
      ${iconCard({
        icon: 'file',
        title: 'Wszystko na jednej podstronie',
        amber: true,
        text: 'Jedna zbiorcza „Oferta” zamiast osobnych podstron pod poszczególne usługi. Jedna podstrona może wygrać jedną frazę — nie dziesięć.'
      })}
      ${iconCard({
        icon: 'mapPin',
        title: 'Wizytówka leżała odłogiem',
        text: 'Zła kategoria, nieaktualne godziny, brak zdjęć, brak odpowiedzi na opinie. Najtańszy kanał widoczności lokalnej i najbardziej zaniedbany.'
      })}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Opinie',
      h2: 'Co mówią klienci',
      center: true
    })}
    ${quotes([
      {
        text: 'Przez dwa lata płaciliśmy agencji z Krakowa za raporty, których nikt u nas nie rozumiał. Tutaj po pierwszym spotkaniu dostaliśmy listę rzeczy do naprawienia napisaną po ludzku. Rezerwacje bezpośrednie wzrosły na tyle, że ograniczyliśmy pokoje wystawiane na portalach.',
        name: 'Anna Gąsienica',
        role: 'Pensjonat pod Reglami, Zakopane',
        initials: 'AG'
      },
      {
        text: 'Nowa strona ładuje się szybciej niż stara wizytówka na Facebooku. Najważniejsze, że sam mogę dodać nowe terminy bez dzwonienia do informatyka. Telefonów w maju mieliśmy dwa razy więcej niż rok wcześniej.',
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
    ])}
  </div>
</section>

${relatedLinks(
  [
    { label: 'Usługa', title: 'Pozycjonowanie SEO', href: '/uslugi/pozycjonowanie-seo/' },
    { label: 'Usługa', title: 'Tworzenie stron WWW', href: '/uslugi/strony-internetowe/' },
    { label: 'Cennik', title: 'Ile kosztuje współpraca', href: '/cennik/' },
    { label: 'Kontakt', title: 'Bezpłatna analiza widoczności', href: '/kontakt/' }
  ],
  'Co dalej'
)}

${ctaBand({
  h2: 'Chcesz zobaczyć, co da się zrobić u Ciebie?',
  text: 'Bezpłatna analiza widoczności: Twoja strona i trzech konkurentów, z listą konkretnych różnic i szacunkiem, ile pracy wymaga ich nadrobienie.'
})}
`
};

/* ==========================================================================
   /cennik/
   ========================================================================== */
const cennikFaq = [
  {
    q: 'Dlaczego podajecie widełki, a nie konkretne ceny?',
    a: '<p>Bo uczciwa wycena wymaga wiedzy o punkcie wyjścia. Strona z pięcioma podstronami i strona z dwustoma to zupełnie inny nakład pracy przy tej samej nazwie usługi. Podobnie z pozycjonowaniem: firma działająca w jednej miejscowości i firma celująca w całą Polskę mają inny zakres prac. Widełki pokazują rząd wielkości, a konkretną kwotę podajemy po krótkiej rozmowie — zwykle w ciągu dwóch dni roboczych i bez spotkania sprzedażowego po drodze.</p>'
  },
  {
    q: 'Czy są jakieś dodatkowe koszty?',
    a: '<p>Po naszej stronie nie. Wycena zawiera komplet prac zapisanych w umowie. Osobno rozliczane są wyłącznie koszty zewnętrzne, o których informujemy z góry: budżet reklamowy Google Ads (płacony bezpośrednio Google), hosting i domena, ewentualne licencje na zdjęcia lub oprogramowanie, sesja zdjęciowa. Nie pobieramy prowizji od budżetu reklamowego ani opłat za „raportowanie”.</p>'
  },
  {
    q: 'Czy można rozłożyć płatność na raty?',
    a: '<p>Przy stronach internetowych standardowo dzielimy płatność na trzy części: 30% zaliczki na start, 40% po akceptacji projektu graficznego, 30% po publikacji. Przy większych projektach da się rozłożyć płatność na dłużej — wtedy jednak zabezpieczamy sam koszt wytworzenia w umowie. Stała opieka SEO rozliczana jest z góry za każdy miesiąc.</p>'
  },
  {
    q: 'Co jeśli po kilku miesiącach uznam, że to nie działa?',
    a: '<p>Kończymy współpracę z miesięcznym wypowiedzeniem liczonym od końca miesiąca rozliczeniowego. Przekazujemy wszystkie dostępy, pliki i dokumentację wykonanych prac. Nie ma opłat za rozwiązanie umowy ani okresów karencji. Jeśli sami uznamy, że nie jesteśmy w stanie pomóc — powiemy to i zaproponujemy zakończenie, zamiast wystawiać faktury za pracę bez efektu.</p>'
  },
  {
    q: 'Czy tańsza opcja naprawdę wystarczy dla małej firmy?',
    a: '<p>Często tak — i mówimy to wprost, mimo że oznacza niższą fakturę. Jednoosobowa firma usługowa działająca w jednej miejscowości zwykle nie potrzebuje pakietu za kilka tysięcy miesięcznie. Wystarczy porządna strona, dobrze prowadzona wizytówka Google i systematyczna praca nad kilkoma frazami. Zaproponowanie za dużego zakresu jest równie nieuczciwe co zaproponowanie za małego.</p>'
  }
];

export const cennikPage = {
  path: '/cennik/',
  title: 'Cennik — SEO, strony internetowe, audyty | Tatry Marketing',
  description:
    'Widełki cenowe usług: pozycjonowanie od 1 500 zł/mies., strony internetowe od 4 900 zł, audyt SEO od 2 400 zł. Co dokładnie zawiera każdy zakres.',
  crumbs: [HOME_CRUMB, { label: 'Cennik' }],
  schema: [faqSchema(`${site.url}/cennik/`, cennikFaq)],
  body: `
${pageHead({
  crumbs: [HOME_CRUMB, { label: 'Cennik' }],
  eyebrow: 'Cennik',
  h1: 'Ile to kosztuje',
  lead: 'Podajemy widełki, bo uczciwa wycena wymaga znajomości punktu wyjścia. Poniżej dokładnie to, co mieści się w każdym zakresie — i co jest liczone osobno.'
})}

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Pozycjonowanie',
      h2: 'Stała opieka SEO',
      lead: 'Rozliczenie miesięczne, umowa z miesięcznym okresem wypowiedzenia. Ceny netto.',
      center: true
    })}

    <div class="plans">
      <article class="plan">
        <h3 class="plan__name">Lokalny</h3>
        <p class="plan__for">Firma działająca w jednej miejscowości, do 15 fraz</p>
        <p class="plan__price">
          <span class="plan__amount">1 500 zł</span>
          <span class="plan__unit">/ mies.</span>
        </p>
        <p class="plan__note">Minimalny sensowny zakres dla małej firmy usługowej</p>
        <ul class="plan__features">
          <li>Do 15 fraz w monitoringu</li>
          <li>Prowadzenie wizytówki Google</li>
          <li>2 nowe podstrony lub teksty miesięcznie</li>
          <li>Bieżąca optymalizacja techniczna</li>
          <li>Wpisy do katalogów lokalnych</li>
          <li>Raport miesięczny</li>
        </ul>
        <a class="btn btn--ghost btn--block" href="/kontakt/">Zapytaj o wycenę</a>
      </article>

      <article class="plan plan--featured">
        <p class="plan__tag">Najczęściej wybierany</p>
        <h3 class="plan__name">Regionalny</h3>
        <p class="plan__for">Obiekt turystyczny lub firma działająca w całym powiecie</p>
        <p class="plan__price">
          <span class="plan__amount">2 800 zł</span>
          <span class="plan__unit">/ mies.</span>
        </p>
        <p class="plan__note">Zakres, który wybiera większość naszych klientów</p>
        <ul class="plan__features">
          <li>Do 40 fraz w monitoringu</li>
          <li>Wszystko z zakresu Lokalny</li>
          <li>4–5 nowych treści miesięcznie</li>
          <li>Podstrony pod miejscowości i sezony</li>
          <li>Budowa profilu linków</li>
          <li>Śledzenie konwersji i telefonów</li>
          <li>Kwartalna korekta strategii</li>
        </ul>
        <a class="btn btn--primary btn--block" href="/kontakt/">Zapytaj o wycenę</a>
      </article>

      <article class="plan">
        <h3 class="plan__name">Rozszerzony</h3>
        <p class="plan__for">Firma celująca poza region lub sklep internetowy</p>
        <p class="plan__price">
          <span class="plan__amount">od 4 500 zł</span>
          <span class="plan__unit">/ mies.</span>
        </p>
        <p class="plan__note">Wycena indywidualna po analizie</p>
        <ul class="plan__features">
          <li>Frazy bez limitu, także ogólnopolskie</li>
          <li>Wszystko z zakresu Regionalny</li>
          <li>Strategia treści na kwartał</li>
          <li>Optymalizacja kategorii i kart produktów</li>
          <li>Zaawansowane dane strukturalne</li>
          <li>Comiesięczne spotkanie omawiające wyniki</li>
        </ul>
        <a class="btn btn--ghost btn--block" href="/kontakt/">Zapytaj o wycenę</a>
      </article>
    </div>
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Projekty jednorazowe',
      h2: 'Strony, audyty i kampanie',
      center: true
    })}

    <div class="plans">
      <article class="plan">
        <h3 class="plan__name">Strona jednosekcyjna</h3>
        <p class="plan__for">Nowa działalność albo pojedyncza oferta</p>
        <p class="plan__price">
          <span class="plan__amount">od 2 900 zł</span>
        </p>
        <p class="plan__note">Realizacja 2–3 tygodnie</p>
        <ul class="plan__features">
          <li>Indywidualny projekt graficzny</li>
          <li>Pełna optymalizacja techniczna</li>
          <li>Formularz kontaktowy</li>
          <li>Konfiguracja narzędzi Google</li>
          <li>Gotowa pod rozbudowę</li>
        </ul>
        <a class="btn btn--ghost btn--block" href="/uslugi/strony-internetowe/">Szczegóły usługi</a>
      </article>

      <article class="plan plan--featured">
        <p class="plan__tag">Najczęściej wybierany</p>
        <h3 class="plan__name">Strona firmowa</h3>
        <p class="plan__for">Firma usługowa, pensjonat, gabinet, restauracja</p>
        <p class="plan__price">
          <span class="plan__amount">od 4 900 zł</span>
        </p>
        <p class="plan__note">Realizacja 4–6 tygodni</p>
        <ul class="plan__features">
          <li>5–12 podstron</li>
          <li>Osobna podstrona pod każdą usługę</li>
          <li>Panel do samodzielnej edycji</li>
          <li>Dane strukturalne i sitemap</li>
          <li>Przekierowania ze starej strony</li>
          <li>Szkolenie i 30 dni wsparcia</li>
        </ul>
        <a class="btn btn--primary btn--block" href="/uslugi/strony-internetowe/">Szczegóły usługi</a>
      </article>

      <article class="plan">
        <h3 class="plan__name">Audyt SEO</h3>
        <p class="plan__for">Diagnoza istniejącej strony</p>
        <p class="plan__price">
          <span class="plan__amount">od 2 400 zł</span>
        </p>
        <p class="plan__note">Realizacja 7–10 dni roboczych</p>
        <ul class="plan__features">
          <li>Ok. 120 punktów kontrolnych</li>
          <li>Lista zadań z priorytetami</li>
          <li>Porównanie z trzema konkurentami</li>
          <li>Ocena widoczności lokalnej</li>
          <li>Godzinne omówienie wyników</li>
          <li>Odliczany od pierwszej faktury przy stałej współpracy</li>
        </ul>
        <a class="btn btn--ghost btn--block" href="/uslugi/audyt-seo/">Szczegóły usługi</a>
      </article>
    </div>

    <div class="grid grid--2" style="margin-top:2rem">
      <article class="card">
        <div class="card__icon card__icon--amber">${icon('target')}</div>
        <h3>Google Ads — obsługa</h3>
        <p>
          <strong>od 900 zł netto miesięcznie.</strong> Budżet reklamowy płacisz
          bezpośrednio Google — nie pobieramy od niego prowizji. Konto zakładamy
          na Twoje dane i zostaje Twoje po zakończeniu współpracy.
        </p>
        <a class="card__link" href="/uslugi/google-ads/">Szczegóły usługi${icon('arrowRight')}</a>
      </article>
      <article class="card">
        <div class="card__icon">${icon('users')}</div>
        <h3>Konsultacja</h3>
        <p>
          <strong>450 zł netto za godzinę.</strong> Wspólny przegląd strony i wizytówki
          z listą zadań spisaną na bieżąco. Sensowna alternatywa dla pełnego audytu
          przy małych stronach — i najtańszy sposób, żeby sprawdzić, czy w ogóle
          warto zaczynać.
        </p>
        <a class="card__link" href="/kontakt/">Umów konsultację${icon('arrowRight')}</a>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Koszty zewnętrzne',
      h2: 'Co jest rozliczane osobno',
      lead: 'Te pozycje nie trafiają na naszą fakturę — informujemy o nich z góry, żeby nie było niespodzianek.',
      center: true
    })}
    <div class="grid grid--4">
      ${iconCard({ icon: 'file', title: 'Domena', text: '70–150 zł rocznie. Rejestrowana zawsze na Twoje dane.' })}
      ${iconCard({ icon: 'shield', title: 'Hosting', text: '200–800 zł rocznie. Dla stron statycznych bywa darmowy.', amber: true })}
      ${iconCard({ icon: 'target', title: 'Budżet Google Ads', text: 'Od 1 000 zł miesięcznie. Płacony bezpośrednio Google.' })}
      ${iconCard({ icon: 'pen', title: 'Sesja zdjęciowa', text: 'Od 1 200 zł. Opcjonalnie — możemy polecić fotografa z regionu.', amber: true })}
    </div>
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Pytania i odpowiedzi',
      h2: 'Pytania o rozliczenia',
      center: true
    })}
    ${faqList(cennikFaq)}
  </div>
</section>

${ctaBand({
  h2: 'Chcesz konkretną kwotę zamiast widełek?',
  text: 'Napisz w dwóch zdaniach, czym się zajmujesz i czego potrzebujesz. Odeślemy wycenę z rozbiciem na etapy — zwykle w ciągu dwóch dni roboczych.'
})}
`
};

/* ==========================================================================
   /o-nas/
   ========================================================================== */
export const oNasPage = {
  path: '/o-nas/',
  title: 'O nas — agencja SEO z Podhala | Tatry Marketing',
  description:
    'Kim jesteśmy i jak pracujemy. Agencja SEO i stron internetowych z Zakopanego, działająca na Podhalu od 2016 roku. Poznaj zespół i nasze zasady współpracy.',
  crumbs: [HOME_CRUMB, { label: 'O nas' }],
  body: `
${pageHead({
  crumbs: [HOME_CRUMB, { label: 'O nas' }],
  eyebrow: 'O nas',
  h1: 'Agencja, która zna rynek, na którym pracujesz',
  lead: `Działamy z ${site.city} od ${site.founded} roku. Pracujemy z firmami z Podhala i okolic — pensjonatami, restauracjami, rzemieślnikami i firmami usługowymi.`
})}

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        ${sectionHead({ eyebrow: 'Skąd się wzięliśmy', h2: 'Zaczęło się od jednej zepsutej strony' })}
        <p>
          Pierwszym projektem była strona pensjonatu prowadzonego przez znajomych.
          Płacili miesięcznie firmie z dużego miasta i przez rok nie zobaczyli
          ani jednej rezerwacji z Google. Okazało się, że strona miała w kodzie
          znacznik blokujący indeksowanie — ustawiony przy wdrożeniu i nigdy
          nieusunięty. Rok abonamentu za stronę, której wyszukiwarka nie widziała.
        </p>
        <p>
          To nie był wyjątek. Im więcej stron z regionu oglądaliśmy, tym częściej
          widzieliśmy ten sam wzorzec: firma płaci, nie rozumie, za co, i nie ma
          jak tego sprawdzić. Stąd wzięły się nasze zasady — wszystkie sprowadzają
          się do tego, żeby klient wiedział, co dostaje.
        </p>
        <ul class="checklist">
          <li><strong>Mówimy wprost, gdy coś nie ma sensu</strong> Jeśli uważamy, że nie pomożemy albo że tańsze rozwiązanie wystarczy — mówimy to. Straciliśmy w ten sposób kilka zleceń i nie żałujemy żadnego.</li>
          <li><strong>Nie sprzedajemy pozycji, tylko pracę</strong> Nikt nie kontroluje algorytmu Google. Możemy odpowiadać za zakres i jakość prac, i tylko to zapisujemy w umowie.</li>
          <li><strong>Wszystko zostaje u klienta</strong> Kod, treści, domena, dostępy. Zawsze na dane klienta, od pierwszego dnia.</li>
          <li><strong>Raport ma być czytelny</strong> Dwie strony, po polsku, bez żargonu. Jeśli klient nie rozumie raportu, to nasz błąd, nie jego.</li>
        </ul>
      </div>
      <div>
        ${stats([
          { value: `${new Date().getFullYear() - Number(site.founded)} lat`, label: 'na rynku podhalańskim' },
          { value: '60+', label: 'zrealizowanych projektów' },
          { value: '14', label: 'miejscowości w obszarze działania' },
          { value: '1 mies.', label: 'okres wypowiedzenia umowy' }
        ])}
      </div>
    </div>
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Zespół',
      h2: 'Kto będzie pracował przy Twoim projekcie',
      lead: 'Jesteśmy małym zespołem i to celowe. Rozmawiasz bezpośrednio z osobą, która wykonuje pracę, a nie z opiekunem przekazującym informacje dalej.',
      center: true
    })}

    <!-- DO_UZUPELNIENIA: prawdziwe imiona, nazwiska i zdjęcia zespołu.
         Realne sylwetki autorów to jeden z sygnałów E-E-A-T, na które Google
         zwraca uwagę — zwłaszcza przy treściach poradnikowych. -->
    <div class="grid grid--3">
      ${iconCard({
        icon: 'trending',
        title: 'Michał Zubek — strategia SEO',
        text: 'Odpowiada za dobór fraz, analizę konkurencji i plan działań. Prowadzi projekty pozycjonowania i pisze większość treści na tym blogu. Wcześniej dziesięć lat w marketingu turystycznym.'
      })}
      ${iconCard({
        icon: 'code',
        title: 'Zespół wdrożeniowy — strony',
        amber: true,
        text: 'Projekt graficzny, kodowanie i optymalizacja wydajności. Każdy projekt przechodzi testy na realnych urządzeniach, nie tylko w symulatorze przeglądarki.'
      })}
      ${iconCard({
        icon: 'pen',
        title: 'Treści i copywriting',
        text: 'Teksty ofertowe, poradniki, opisy usług. Piszemy po rozmowie z klientem, bo najlepsze treści biorą się z tego, co on wie o swojej branży — a nie z researchu w internecie.'
      })}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Nasze podejście',
      h2: 'Czego nie robimy',
      lead: 'Lista rzeczy, których nie znajdziesz w naszej ofercie — i powody, dla których tak jest.',
      center: true
    })}
    <div class="grid grid--2">
      ${iconCard({
        icon: 'shield',
        title: 'Nie kupujemy linków w systemach wymiany',
        text: 'Linki z farm i systemów wymiany dają krótkotrwały skok i długotrwały problem. Filtr algorytmiczny zdejmuje się miesiącami, a czasem nie zdejmuje wcale. Budujemy wzmianki tam, gdzie mają uzasadnienie: w lokalnych serwisach, portalach branżowych i przy okazji wydarzeń.'
      })}
      ${iconCard({
        icon: 'file',
        title: 'Nie generujemy treści hurtowo',
        amber: true,
        text: 'Sto tekstów wygenerowanych w tydzień to sto tekstów bez wartości. Google ocenia treść pod kątem realnego doświadczenia autora — i coraz lepiej to wykrywa. Piszemy mniej, ale z konkretną wiedzą pochodzącą od klienta.'
      })}
      ${iconCard({
        icon: 'mapPin',
        title: 'Nie tworzymy stron pod każdą wieś',
        text: 'Dwadzieścia bliźniaczych podstron różniących się nazwą miejscowości to doorway pages — Google nazywa je wprost w wytycznych i traktuje jako spam. Robimy podstronę lokalną tylko wtedy, gdy mamy o danym rynku coś odrębnego do powiedzenia.'
      })}
      ${iconCard({
        icon: 'handshake',
        title: 'Nie wiążemy umowami na lata',
        amber: true,
        text: 'Umowa na 24 miesiące chroni agencję, nie klienta. Jeśli dowozimy wyniki, klient zostaje z własnej woli. Jeśli nie dowozimy, nie powinniśmy go trzymać zapisami w umowie.'
      })}
    </div>
  </div>
</section>

<section class="section section--navy">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Obszar działania',
      h2: 'Gdzie pracujemy',
      lead: 'Podhale, Podtatrze i Sądecczyzna. Do klientów z powiatu tatrzańskiego i nowotarskiego dojeżdżamy na spotkania — reszta współpracy może toczyć się zdalnie.'
    })}
    ${areaChips()}
  </div>
</section>

${relatedLinks(
  [
    { label: 'Usługi', title: 'Co dokładnie robimy', href: '/uslugi/' },
    { label: 'Realizacje', title: 'Projekty i wyniki', href: '/realizacje/' },
    { label: 'Cennik', title: 'Ile kosztuje współpraca', href: '/cennik/' },
    { label: 'Kontakt', title: 'Porozmawiajmy', href: '/kontakt/' }
  ],
  'Poznaj nas lepiej'
)}

${ctaBand({
  h2: 'Porozmawiajmy bez zobowiązań',
  text: 'Pierwsza rozmowa jest bezpłatna i niczego nie zmienia. Powiemy, co widzimy na Twojej stronie — także wtedy, gdy wnioskiem będzie „na razie nic nie róbcie”.'
})}
`
};

/* ==========================================================================
   /kontakt/
   ========================================================================== */
export const kontaktPage = {
  path: '/kontakt/',
  title: 'Kontakt — bezpłatna analiza widoczności | Tatry Marketing',
  description: `Skontaktuj się z nami: ${site.phone}, ${site.email}. Agencja SEO z ${site.city}. Bezpłatna analiza widoczności strony i trzech konkurentów.`,
  crumbs: [HOME_CRUMB, { label: 'Kontakt' }],
  body: `
${pageHead({
  crumbs: [HOME_CRUMB, { label: 'Kontakt' }],
  eyebrow: 'Kontakt',
  h1: 'Porozmawiajmy o Twojej stronie',
  lead: 'Napisz albo zadzwoń. Odpowiadamy w ciągu jednego dnia roboczego, a pierwsza analiza jest bezpłatna i nie zobowiązuje do niczego.'
})}

<section class="section">
  <div class="wrap">
    <div class="contact-grid">

      <div>
        <h2>Formularz kontaktowy</h2>
        <p class="lead" style="margin-bottom:2rem">
          Im więcej napiszesz o swojej sytuacji, tym konkretniej odpowiemy.
          Adres strony wystarczy, żebyśmy zaczęli analizę jeszcze przed rozmową.
        </p>

        <!--
          DO_UZUPELNIENIA: atrybut action.
          Strona jest statyczna, więc formularz potrzebuje zewnętrznej obsługi.
          Sprawdzone opcje: Formspree, Basin, Web3Forms albo skrypt PHP
          na własnym hostingu. Szczegóły w README, sekcja „Formularz".
          Do czasu podpięcia obsługi formularz nie wyśle zgłoszenia —
          dlatego telefon i e-mail obok są w tym momencie kanałem podstawowym.
        -->
        <form class="form" data-contact-form method="post" action="#" novalidate>

          <div class="form__row">
            <div class="field">
              <label for="imie">Imię i nazwisko <span class="field__req" aria-hidden="true">*</span></label>
              <input type="text" id="imie" name="imie" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="firma">Nazwa firmy</label>
              <input type="text" id="firma" name="firma" autocomplete="organization">
            </div>
          </div>

          <div class="form__row">
            <div class="field">
              <label for="email">Adres e-mail <span class="field__req" aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="telefon">Telefon</label>
              <input type="tel" id="telefon" name="telefon" autocomplete="tel" inputmode="tel">
              <span class="field__hint">Jeśli wolisz, żebyśmy oddzwonili</span>
            </div>
          </div>

          <div class="field">
            <label for="strona">Adres Twojej strony</label>
            <input type="url" id="strona" name="strona" placeholder="https://" inputmode="url">
            <span class="field__hint">Zostaw puste, jeśli strony jeszcze nie ma</span>
          </div>

          <div class="field">
            <label for="zakres">Czego dotyczy zapytanie?</label>
            <select id="zakres" name="zakres">
              <option value="">Wybierz z listy</option>
              ${services.map((s) => `<option value="${s.slug}">${s.name}</option>`).join('\n              ')}
              <option value="konsultacja">Konsultacja godzinowa</option>
              <option value="inne">Coś innego</option>
            </select>
          </div>

          <div class="field">
            <label for="wiadomosc">Wiadomość <span class="field__req" aria-hidden="true">*</span></label>
            <textarea id="wiadomosc" name="wiadomosc" required
              placeholder="Czym się zajmujesz, skąd dziś przychodzą klienci i co Cię uwiera w obecnej sytuacji?"></textarea>
          </div>

          <!-- Pułapka na boty: ukryta przed ludźmi, wypełniana przez skrypty -->
          <div class="honeypot" aria-hidden="true">
            <label for="_firma_www">Nie wypełniaj tego pola</label>
            <input type="text" id="_firma_www" name="_firma_www" tabindex="-1" autocomplete="off">
          </div>

          <div class="checkbox">
            <input type="checkbox" id="zgoda" name="zgoda" required>
            <label for="zgoda">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia
              odpowiedzi na zapytanie. Administratorem danych jest ${site.legalName}.
              Szczegóły w <a href="/polityka-prywatnosci/">polityce prywatności</a>.
              <span class="field__req" aria-hidden="true">*</span>
            </label>
          </div>

          <p data-form-status hidden role="alert"
             style="color:var(--danger);font-size:.9375rem;font-weight:500"></p>

          <div>
            <button class="btn btn--primary" type="submit">Wyślij zapytanie</button>
          </div>

          <p style="font-size:.8125rem;color:var(--muted);margin:0">
            <span class="field__req" aria-hidden="true">*</span> Pola wymagane.
            Odpowiadamy w ciągu jednego dnia roboczego.
          </p>
        </form>
      </div>

      <aside>
        <h2>Dane kontaktowe</h2>
        <div class="nap" style="margin-top:1.5rem">

          <div class="nap__item">
            <span class="nap__icon">${icon('phone')}</span>
            <div>
              <p class="nap__label">Telefon</p>
              <p class="nap__value"><a href="tel:${site.phoneHref}">${site.phone}</a></p>
            </div>
          </div>

          <div class="nap__item">
            <span class="nap__icon">${icon('mail')}</span>
            <div>
              <p class="nap__label">E-mail</p>
              <p class="nap__value"><a href="mailto:${site.email}">${site.email}</a></p>
            </div>
          </div>

          <div class="nap__item">
            <span class="nap__icon">${icon('building')}</span>
            <div>
              <p class="nap__label">Adres</p>
              <p class="nap__value">
                ${site.street}<br>
                ${site.postalCode} ${site.city}
              </p>
            </div>
          </div>

          <div class="nap__item">
            <span class="nap__icon">${icon('clock')}</span>
            <div>
              <p class="nap__label">Godziny pracy</p>
              <p class="nap__value">${site.openingHoursText}</p>
            </div>
          </div>

          <div class="nap__item">
            <span class="nap__icon">${icon('file')}</span>
            <div>
              <p class="nap__label">Dane rejestrowe</p>
              <p class="nap__value" style="font-size:.9375rem">
                ${site.legalName}<br>
                NIP ${site.vatId}<br>
                REGON ${site.regon}
              </p>
            </div>
          </div>

        </div>

        <div class="note" style="margin-top:2rem">
          <p>
            <strong>Wolisz spotkanie na żywo?</strong> Do klientów z powiatu tatrzańskiego
            i nowotarskiego dojeżdżamy bez dodatkowych opłat. Wystarczy napisać
            albo zadzwonić i umówić termin.
          </p>
        </div>

        <!--
          DO_UZUPELNIENIA: mapa.
          Osadzenie Google Maps ustawia pliki cookie firmy Google jeszcze przed
          jakąkolwiek zgodą użytkownika, co bywa problematyczne pod RODO.
          Bezpieczniejsze warianty: (1) statyczny obraz mapy z linkiem,
          (2) OpenStreetMap, (3) iframe ładowany dopiero po kliknięciu.
          Poniżej wariant najprostszy — link zamiast osadzenia.
        -->
        <h2 style="margin-top:2.5rem;font-size:var(--fs-h3)">Jak do nas trafić</h2>
        <p style="margin-top:1rem">
          Biuro znajduje się w ${site.city}, przy ${site.street}.
          <a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(
            `${site.street}, ${site.postalCode} ${site.city}`
          )}" rel="noopener noreferrer" target="_blank">Otwórz w Mapach Google</a>
          (otwiera się w nowej karcie).
        </p>
      </aside>

    </div>
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Co dalej',
      h2: 'Jak wygląda pierwszy kontakt',
      lead: 'Bez spotkań sprzedażowych i prezentacji na czterdzieści slajdów.',
      center: true
    })}
    ${steps([
      {
        title: 'Piszesz',
        text: 'Formularzem, mailem albo telefonicznie. Wystarczy adres strony i dwa zdania o tym, co Cię uwiera.'
      },
      {
        title: 'Analizujemy',
        text: 'Sprawdzamy stronę, wizytówkę i trzech konkurentów. Zajmuje nam to zwykle dzień roboczy. Bezpłatnie.'
      },
      {
        title: 'Rozmawiamy',
        text: 'Telefonicznie, online albo u Ciebie. Pokazujemy, co znaleźliśmy i co z tego wynika — także jeśli wnioskiem jest „nic nie róbcie”.'
      },
      {
        title: 'Decydujesz',
        text: 'Jeśli chcesz — wysyłamy wycenę z rozbiciem na etapy. Jeśli nie — analiza i tak zostaje u Ciebie.'
      }
    ])}
  </div>
</section>
`
};

/* ==========================================================================
   /faq/
   ========================================================================== */
const faqRozszerzone = [
  ...homeFaq,
  {
    q: 'Czy muszę mieć wizytówkę Google, żeby zacząć?',
    a: '<p>Nie musisz jej mieć wcześniej — założymy ją w ramach współpracy. Ale jeśli prowadzisz działalność lokalną, to prawdopodobnie najważniejsze narzędzie w całym zestawie. Zdarza się, że sama poprawa wizytówki daje więcej telefonów w miesiąc niż pół roku pracy nad stroną. Jeśli wizytówka istnieje, ale nie masz do niej dostępu (założył ją poprzedni wykonawca albo powstała automatycznie), pomagamy przejść procedurę przejęcia.</p>'
  },
  {
    q: 'Pracujecie tylko z firmami turystycznymi?',
    a: '<p>Nie. Turystyka to duża część naszych klientów, bo taki jest profil regionu, ale równie często pracujemy z firmami budowlanymi, warsztatami, gabinetami, kancelariami i sklepami. Zasady pozycjonowania są wspólne, różni się dobór fraz i sezonowość. W branżach, których nie znamy, mówimy o tym wprost na pierwszej rozmowie — i czasem odsyłamy do agencji wyspecjalizowanej w danym temacie.</p>'
  },
  {
    q: 'Czy prowadzicie social media?',
    a: '<p>Nie prowadzimy stałej obsługi mediów społecznościowych i nie planujemy tego zmieniać. Robienie wszystkiego po trochu kończy się robieniem wszystkiego przeciętnie. Możemy natomiast pomóc ustawić profile tak, żeby wspierały widoczność w wyszukiwarce (spójne dane, poprawne linkowanie, opisy), a przy okazji polecić osoby z regionu, które zajmują się tym na co dzień.</p>'
  },
  {
    q: 'Co jeśli mam już stronę zrobioną przez kogoś innego?',
    a: '<p>To zupełnie normalna sytuacja i większość naszych projektów tak wygląda. Nie wymagamy przebudowy strony, żeby zacząć pozycjonowanie. Potrzebujemy natomiast dostępu do panelu — bez możliwości wprowadzania zmian w treści i kodzie nie da się prowadzić SEO. Jeśli obecny wykonawca nie chce udostępnić dostępów, to samo w sobie jest ważnym sygnałem i warto to przedyskutować.</p>'
  },
  {
    q: 'Jak często się kontaktujemy w trakcie współpracy?',
    a: '<p>Raport wysyłamy raz w miesiącu. Poza tym kontaktujemy się wtedy, gdy jest o czym rozmawiać — potrzebujemy materiałów, coś się wydarzyło w wynikach, mamy propozycję zmiany kierunku. Nie organizujemy cotygodniowych statusów dla samego ich odbywania. Ty możesz odezwać się w każdej chwili, bezpośrednio do osoby prowadzącej projekt, bez przechodzenia przez opiekuna klienta.</p>'
  },
  {
    q: 'Czy da się przewidzieć, ile klientów przybędzie?',
    a: '<p>Uczciwie: nie da się tego obiecać z górnym i dolnym ograniczeniem. Można natomiast oszacować rząd wielkości. Wiemy, ile razy miesięcznie wyszukiwane są dane frazy i jaki mniej więcej odsetek kliknięć zbierają poszczególne pozycje. Z tego da się wyliczyć potencjalny ruch — a znając Twoją konwersję, przybliżoną liczbę zapytań. To szacunek, nie obietnica, i tak go przedstawiamy. Każdy, kto gwarantuje konkretną liczbę klientów, albo nie rozumie tej pracy, albo liczy, że nie sprawdzisz.</p>'
  }
];

export const faqPage = {
  path: '/faq/',
  title: 'Pytania i odpowiedzi o SEO i strony WWW | Tatry Marketing',
  description:
    'Odpowiedzi na najczęstsze pytania o pozycjonowanie, strony internetowe, ceny i zasady współpracy. Dwanaście pytań, które słyszymy najczęściej.',
  crumbs: [HOME_CRUMB, { label: 'Pytania i odpowiedzi' }],
  schema: [faqSchema(`${site.url}/faq/`, faqRozszerzone)],
  body: `
${pageHead({
  crumbs: [HOME_CRUMB, { label: 'Pytania i odpowiedzi' }],
  eyebrow: 'FAQ',
  h1: 'Pytania i odpowiedzi',
  lead: 'Zebrane pytania, które najczęściej padają na pierwszym spotkaniu. Jeśli nie znajdziesz swojego — napisz, odpowiemy i dopiszemy je tutaj.'
})}

<section class="section">
  <div class="wrap">
    ${faqList(faqRozszerzone)}
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({
      eyebrow: 'Usługi',
      h2: 'Szczegółowe odpowiedzi przy każdej usłudze',
      lead: 'Na podstronach usług znajdziesz pytania dotyczące konkretnie danego zakresu prac.',
      center: true
    })}
    ${servicesGrid()}
  </div>
</section>

${ctaBand({
  h2: 'Nie znalazłeś odpowiedzi?',
  text: 'Napisz pytanie — odpowiemy w ciągu jednego dnia roboczego, nawet jeśli nie skończy się to współpracą.'
})}
`
};

/* ==========================================================================
   /polityka-prywatnosci/
   ========================================================================== */
export const politykaPage = {
  path: '/polityka-prywatnosci/',
  title: 'Polityka prywatności | Tatry Marketing',
  description:
    'Informacje o przetwarzaniu danych osobowych, plikach cookie i prawach użytkownika w serwisie Tatry Marketing. Zgodnie z RODO.',
  crumbs: [HOME_CRUMB, { label: 'Polityka prywatności' }],
  body: `
${pageHead({
  crumbs: [HOME_CRUMB, { label: 'Polityka prywatności' }],
  eyebrow: 'Informacje prawne',
  h1: 'Polityka prywatności',
  lead: 'Jak przetwarzamy dane osobowe osób odwiedzających tę stronę i korzystających z formularza kontaktowego.'
})}

<section class="section">
  <div class="wrap wrap--narrow">
    <div class="note" style="margin-bottom:2.5rem">
      <p>
        <strong>DO_UZUPELNIENIA.</strong> Poniższy dokument jest wzorem przygotowanym
        dla strony statycznej bez systemów analitycznych i bez osadzonych treści
        zewnętrznych. Przed publikacją uzupełnij dane administratora i skonsultuj
        treść z osobą znającą przepisy o ochronie danych — zwłaszcza jeśli dodasz
        Google Analytics, piksel Facebooka, osadzoną mapę lub czat. Każde z tych
        narzędzi zmienia zakres obowiązków informacyjnych i wymaga baneru zgody.
      </p>
    </div>

    <div class="prose">
      <h2>1. Administrator danych</h2>
      <p>
        Administratorem danych osobowych jest ${site.legalName}
        z siedzibą przy ${site.street}, ${site.postalCode} ${site.city},
        NIP ${site.vatId}, REGON ${site.regon}.
      </p>
      <p>
        Kontakt w sprawach dotyczących danych osobowych:
        <a href="mailto:${site.email}">${site.email}</a>, tel. <a href="tel:${site.phoneHref}">${site.phone}</a>.
      </p>

      <h2>2. Jakie dane zbieramy</h2>
      <p>Zbieramy wyłącznie dane, które przekazujesz nam dobrowolnie:</p>
      <ul>
        <li><strong>Formularz kontaktowy:</strong> imię i nazwisko, adres e-mail, opcjonalnie numer telefonu, nazwa firmy, adres strony internetowej oraz treść wiadomości.</li>
        <li><strong>Kontakt bezpośredni:</strong> dane przekazane w wiadomości e-mail lub podczas rozmowy telefonicznej.</li>
        <li><strong>Logi serwera:</strong> adres IP, data i godzina zapytania, typ przeglądarki. Dane te zapisuje automatycznie serwer hostingowy i służą wyłącznie zapewnieniu bezpieczeństwa oraz diagnostyce awarii.</li>
      </ul>

      <h2>3. Cel i podstawa prawna przetwarzania</h2>
      <div class="table-scroll">
      <table>
        <thead>
          <tr><th>Cel</th><th>Podstawa prawna</th><th>Okres przechowywania</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Odpowiedź na zapytanie</td>
            <td>Art. 6 ust. 1 lit. a RODO — zgoda</td>
            <td>Do 12 miesięcy od ostatniego kontaktu</td>
          </tr>
          <tr>
            <td>Zawarcie i wykonanie umowy</td>
            <td>Art. 6 ust. 1 lit. b RODO</td>
            <td>Czas trwania umowy</td>
          </tr>
          <tr>
            <td>Obowiązki podatkowe i rachunkowe</td>
            <td>Art. 6 ust. 1 lit. c RODO</td>
            <td>5 lat od końca roku podatkowego</td>
          </tr>
          <tr>
            <td>Ustalenie i dochodzenie roszczeń</td>
            <td>Art. 6 ust. 1 lit. f RODO — uzasadniony interes</td>
            <td>Do upływu okresu przedawnienia</td>
          </tr>
          <tr>
            <td>Bezpieczeństwo serwera (logi)</td>
            <td>Art. 6 ust. 1 lit. f RODO — uzasadniony interes</td>
            <td>Do 30 dni</td>
          </tr>
        </tbody>
      </table>
      </div>

      <h2>4. Pliki cookie</h2>
      <p>
        Ta strona <strong>nie wykorzystuje plików cookie do celów analitycznych
        ani marketingowych</strong>. Nie stosujemy narzędzi śledzących, nie osadzamy
        pikseli reklamowych i nie profilujemy odwiedzających.
      </p>
      <p>
        Czcionki użyte na stronie są serwowane z naszego własnego serwera, a nie
        z zewnętrznych usług — dzięki temu przeglądanie strony nie powoduje
        przekazania Twojego adresu IP podmiotom trzecim.
      </p>
      <p>
        Jeśli w przyszłości wdrożymy narzędzia analityczne, pojawi się baner
        umożliwiający wyrażenie lub odmowę zgody, a niniejszy dokument zostanie
        zaktualizowany przed uruchomieniem takich narzędzi.
      </p>

      <h2>5. Odbiorcy danych</h2>
      <p>Dane mogą być przekazywane wyłącznie podmiotom, które wspierają nasze działanie:</p>
      <ul>
        <li>dostawcy hostingu i poczty elektronicznej,</li>
        <li>biuro rachunkowe — w zakresie dokumentów księgowych,</li>
        <li>dostawca obsługi formularza kontaktowego,</li>
        <li>organy publiczne, jeśli obowiązek wynika z przepisów prawa.</li>
      </ul>
      <p>
        Nie sprzedajemy ani nie udostępniamy danych w celach marketingowych podmiotom
        trzecim. Nie przekazujemy danych poza Europejski Obszar Gospodarczy, chyba że
        wynika to z korzystania z usługi wskazanej powyżej — wówczas wyłącznie
        na podstawie mechanizmów przewidzianych w rozdziale V RODO.
      </p>

      <h2>6. Twoje prawa</h2>
      <p>W związku z przetwarzaniem danych przysługuje Ci prawo do:</p>
      <ul>
        <li>dostępu do swoich danych oraz otrzymania ich kopii,</li>
        <li>sprostowania nieprawidłowych danych,</li>
        <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
        <li>ograniczenia przetwarzania,</li>
        <li>przenoszenia danych,</li>
        <li>wniesienia sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie,</li>
        <li>cofnięcia zgody w dowolnym momencie — bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.</li>
      </ul>
      <p>
        Aby skorzystać z tych praw, napisz na <a href="mailto:${site.email}">${site.email}</a>.
        Odpowiadamy w ciągu 30 dni.
      </p>
      <p>
        Masz również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
        (ul. Stawki 2, 00-193 Warszawa), jeśli uznasz, że przetwarzanie Twoich danych
        narusza przepisy.
      </p>

      <h2>7. Dobrowolność podania danych</h2>
      <p>
        Podanie danych jest dobrowolne, ale niezbędne do udzielenia odpowiedzi
        na zapytanie. Bez adresu e-mail nie mamy jak odpowiedzieć.
      </p>

      <h2>8. Zautomatyzowane podejmowanie decyzji</h2>
      <p>
        Nie podejmujemy decyzji w sposób zautomatyzowany i nie stosujemy profilowania.
      </p>

      <h2>9. Zmiany polityki</h2>
      <p>
        Możemy aktualizować niniejszą politykę, na przykład w związku ze zmianą
        przepisów lub wdrożeniem nowych narzędzi. Aktualna wersja jest zawsze
        dostępna pod tym adresem.
      </p>
      <p style="color:var(--muted);font-size:var(--fs-sm)">
        Data ostatniej aktualizacji: <time datetime="2026-08-17">17 sierpnia 2026</time>.
      </p>
    </div>
  </div>
</section>
`
};

/* ==========================================================================
   404
   --------------------------------------------------------------------------
   noindex, bo strona błędu nie ma czego wnosić do indeksu. Zawiera za to
   linki do najważniejszych działów — użytkownik, który trafił na zły adres,
   ma szansę znaleźć to, czego szukał, zamiast wracać do wyników wyszukiwania.
   ========================================================================== */
export const notFoundPage = {
  path: '/404.html',
  outFile: '404.html',
  title: 'Nie znaleziono strony (404) | Tatry Marketing',
  description: 'Strona o podanym adresie nie istnieje lub została przeniesiona.',
  noindex: true,
  body: `
<section class="pagehead">
  <div class="wrap">
    <div class="pagehead__inner">
      <p class="eyebrow">Błąd 404</p>
      <h1>Tej strony tu nie ma</h1>
      <p class="pagehead__lead">
        Adres jest nieprawidłowy albo strona została przeniesiona.
        Poniżej znajdziesz to, czego prawdopodobnie szukasz.
      </p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${sectionHead({ h2: 'Najczęściej odwiedzane strony', center: true })}
    ${servicesGrid()}
    <div class="btn-row btn-row--center">
      <a class="btn btn--primary" href="/">Wróć na stronę główną</a>
      <a class="btn btn--ghost" href="/kontakt/">Napisz do nas</a>
    </div>
  </div>
</section>

<section class="section section--snow">
  <div class="wrap">
    ${sectionHead({ h2: 'Pozycjonowanie w Twojej okolicy', center: true })}
    <div style="display:flex;justify-content:center">
      ${areaChips()}
    </div>
  </div>
</section>
`
};

export const otherPages = [
  realizacjePage,
  cennikPage,
  oNasPage,
  kontaktPage,
  faqPage,
  politykaPage,
  notFoundPage
];
