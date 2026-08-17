/* ==========================================================================
   Blog — wpisy
   --------------------------------------------------------------------------
   Blog pełni w SEO dwie role: zbiera ruch z fraz informacyjnych („ile kosztuje
   strona internetowa") i buduje wewnętrzne linkowanie do stron ofertowych.
   Dlatego każdy wpis ma świadomie rozmieszczone linki do usług i stron
   lokalnych — a nie tylko treść samą w sobie.

   Nowy wpis = nowy obiekt w tablicy `posts`. Reszta (strona wpisu, wpis
   na liście bloga, sitemap.xml, JSON-LD BlogPosting) generuje się sama.
   ========================================================================== */

export const posts = [
  /* ======================================================================
     1
     ====================================================================== */
  {
    slug: 'pozycjonowanie-pensjonatu-w-zakopanem',
    title: 'Jak wypozycjonować pensjonat w Zakopanem i przestać oddawać prowizję portalom',
    metaTitle: 'Pozycjonowanie pensjonatu w Zakopanem — poradnik 2026',
    metaDescription:
      'Praktyczny przewodnik: jak pensjonat z Zakopanego może zdobywać rezerwacje bezpośrednie z Google zamiast oddawać 15–20% prowizji portalom rezerwacyjnym.',
    excerpt:
      'Booking zabiera 15–20% od każdej rezerwacji. Pokazujemy krok po kroku, jak przechwycić część tego ruchu bezpośrednio z wyszukiwarki — bez walki o frazy, których i tak nie wygrasz.',
    category: 'SEO lokalne',
    published: '2026-06-14',
    publishedText: '14 czerwca 2026',
    modified: '2026-08-02',
    modifiedText: '2 sierpnia 2026',
    author: 'Michał Zubek',
    authorRole: 'Strateg SEO, Tatry Marketing',
    readingTime: 11,
    toc: [
      { id: 'arytmetyka', label: 'Arytmetyka prowizji: ile realnie tracisz' },
      { id: 'frazy', label: 'Wybór fraz: czego nie wygrasz, a co wygrasz' },
      { id: 'struktura', label: 'Struktura strony pod frazy lokalne' },
      { id: 'wizytowka', label: 'Wizytówka Google — najszybszy zysk' },
      { id: 'tresc', label: 'Treść, której nie ma konkurencja' },
      { id: 'rezerwacja', label: 'Ścieżka rezerwacji bezpośredniej' },
      { id: 'plan', label: 'Plan na pierwsze 90 dni' }
    ],
    body: `
<p class="lead">
  Rozmowa, którą odbywamy z właścicielami obiektów w Zakopanem mniej więcej raz w miesiącu,
  zaczyna się tak samo: „Jesteśmy na Bookingu, mamy oceny 9,2, obłożenie w sezonie dobre —
  tylko po sezonie cisza, a prowizje zjadają marżę". To nie jest problem marketingu.
  To problem tego, kto kontroluje kanał sprzedaży.
</p>

<p>
  Ten tekst jest o odzyskiwaniu kontroli. Nie o rezygnacji z portali — one świetnie
  zapełniają ostatnie wolne pokoje i przyprowadzają gości z zagranicy. Chodzi o to,
  żeby gość, który już wie, jak nazywa się Twój obiekt, albo szuka czegoś
  bardzo konkretnego, trafiał na Twoją stronę, a nie na wynik portalu.
</p>

<h2 id="arytmetyka">Arytmetyka prowizji: ile realnie tracisz</h2>

<p>
  Zacznijmy od liczb, bo one najszybciej ustawiają priorytety. Weźmy obiekt
  z ośmioma pokojami, średnią ceną 320 zł za dobę i obłożeniem na poziomie 55%
  w skali roku.
</p>

<div class="table-scroll">
<table>
  <thead>
    <tr><th>Pozycja</th><th>Wartość</th></tr>
  </thead>
  <tbody>
    <tr><td>Sprzedane doby w roku</td><td>ok. 1 600</td></tr>
    <tr><td>Przychód roczny</td><td>ok. 512 000 zł</td></tr>
    <tr><td>Udział rezerwacji z portali</td><td>70%</td></tr>
    <tr><td>Prowizja (średnio 17%)</td><td><strong>ok. 61 000 zł rocznie</strong></td></tr>
  </tbody>
</table>
</div>

<p>
  Sześćdziesiąt tysięcy złotych. Teraz kluczowe pytanie: <strong>ile z tych rezerwacji
  było naprawdę „przyprowadzonych" przez portal, a ile to goście, którzy i tak
  by do Ciebie trafili?</strong> Z naszych obserwacji istotna część to rezerwacje
  powracające albo takie, w których gość znał już nazwę obiektu — usłyszał
  od znajomych, widział na Instagramie, był rok wcześniej.
</p>

<blockquote>
  <p>
    Przesunięcie choćby jednej trzeciej rezerwacji z portalu na kanał bezpośredni
    to w powyższym przykładzie <strong>ok. 20 000 zł rocznie</strong> zostające w firmie.
    To wielokrotność rocznego kosztu prowadzenia SEO dla takiego obiektu.
  </p>
</blockquote>

<p>
  I jeszcze jedno, o czym rzadko się mówi: rezerwacja bezpośrednia daje Ci adres
  e-mail gościa. Portal go nie przekazuje. Bez tego adresu nie wyślesz oferty
  na przyszły sezon i za każdym razem kupujesz tego samego klienta od nowa.
</p>

<h2 id="frazy">Wybór fraz: czego nie wygrasz, a co wygrasz</h2>

<p>
  Najczęstszy błąd, jaki widzimy w briefach od klientów: „chcemy być pierwsi
  na <em>nocleg Zakopane</em>". Powiedzmy to wprost — <strong>nie będziecie</strong>,
  i to nie jest kwestia budżetu.
</p>

<p>
  Pierwszą stronę na takie zapytanie okupują serwisy z dziesiątkami tysięcy
  podstron, budżetami na treści liczonymi w setkach tysięcy złotych i profilami
  linków budowanymi od piętnastu lat. Nawet gdyby udało się tam wejść, ruch
  z tej frazy jest fatalnej jakości: to ludzie na etapie „rozglądam się",
  którzy odwiedzą jeszcze trzydzieści innych stron.
</p>

<p>Frazy, które realnie da się wygrać, mają jedną z trzech cech:</p>

<h3>1. Konkret zamiast ogółu</h3>
<ul>
  <li><em>pensjonat z widokiem na Giewont</em></li>
  <li><em>domki z balią Kościelisko</em></li>
  <li><em>nocleg z psem Bukowina Tatrzańska</em></li>
  <li><em>apartament dla rodziny z małym dzieckiem Zakopane</em></li>
</ul>
<p>
  Zapytań tego typu jest mniej, ale intencja zakupowa jest w nich ogromna.
  Ktoś, kto wpisuje „nocleg z psem", ma psa i szuka miejsca <em>teraz</em>.
</p>

<h3>2. Zdarzenie i sezon</h3>
<ul>
  <li><em>nocleg Zakopane sylwester</em></li>
  <li><em>pokoje ferie zimowe Podhale</em></li>
  <li><em>nocleg blisko Puchar Świata Zakopane</em></li>
</ul>
<p>
  Te frazy mają wąskie okno, ale trzeba je przygotować z wyprzedzeniem.
  Strona pod sylwestra opublikowana w listopadzie nie zdąży się wypozycjonować.
  Ta sama strona zbudowana w sierpniu i odświeżona we wrześniu — zdąży.
</p>

<h3>3. Okolica zamiast centrum</h3>
<p>
  Konkurencja na frazy z nazwą Zakopanego jest największa w regionie.
  Ale <em>„nocleg Ząb"</em>, <em>„pokoje Murzasichle"</em> czy
  <em>„domki Małe Ciche"</em> to zapytania, w których często wystarczy porządna,
  dedykowana podstrona, żeby wejść do pierwszej trójki. Jeśli obiekt leży
  poza ścisłym centrum, to nie wada — to Twoja przewaga w wyszukiwarce.
</p>

<h2 id="struktura">Struktura strony pod frazy lokalne</h2>

<p>
  Google nie ocenia „strony pensjonatu". Ocenia <strong>każdą podstronę osobno</strong>,
  pod kątem konkretnego zapytania. Jeśli cała oferta mieści się na jednej podstronie
  „Pokoje", masz jedną szansę na jedną frazę.
</p>

<p>Struktura, którą zalecamy obiektom noclegowym:</p>

<div class="table-scroll">
<table>
  <thead>
    <tr><th>Adres</th><th>Fraza wiodąca</th></tr>
  </thead>
  <tbody>
    <tr><td><code>/</code></td><td>nazwa obiektu + pensjonat Zakopane</td></tr>
    <tr><td><code>/pokoje/</code></td><td>pokoje Zakopane z widokiem</td></tr>
    <tr><td><code>/pokoje/apartament-rodzinny/</code></td><td>apartament dla rodziny Zakopane</td></tr>
    <tr><td><code>/domki-z-balia/</code></td><td>domki z balią Podhale</td></tr>
    <tr><td><code>/nocleg-z-psem/</code></td><td>nocleg z psem Zakopane</td></tr>
    <tr><td><code>/sylwester-w-gorach/</code></td><td>sylwester Zakopane nocleg</td></tr>
    <tr><td><code>/atrakcje/szlaki-z-dziecmi/</code></td><td>szlaki dla dzieci Tatry</td></tr>
  </tbody>
</table>
</div>

<p>
  Zasada jest prosta: <strong>jedna intencja = jedna podstrona</strong>. Jeśli dwie podstrony
  celują w to samo zapytanie, zaczynają ze sobą konkurować i obie tracą — to zjawisko
  nazywa się kanibalizacją i jest jednym z najczęstszych problemów, jakie znajdujemy
  w <a href="/uslugi/audyt-seo/">audytach</a>.
</p>

<h2 id="wizytowka">Wizytówka Google — najszybszy zysk</h2>

<p>
  Jeśli masz zrobić w tym tygodniu jedną rzecz, niech to będzie wizytówka.
  Efekty widać w tygodniach, nie miesiącach, a kosztuje wyłącznie czas.
</p>

<ul>
  <li><strong>Kategoria główna.</strong> Nie „hotel", jeśli prowadzisz pensjonat. Zła kategoria wycina Cię z części zapytań.</li>
  <li><strong>Zdjęcia co miesiąc.</strong> Minimum 20 na start, potem regularnie. Obiekty publikujące zdjęcia systematycznie notują wyraźnie więcej wyświetleń w mapach.</li>
  <li><strong>Godziny, także świąteczne.</strong> Wpisz osobno okres świąteczny i ferie.</li>
  <li><strong>Odpowiedzi na wszystkie opinie.</strong> Także te negatywne — zwłaszcza te. Odpowiedź czyta kolejnych trzydziestu potencjalnych gości.</li>
  <li><strong>Pytania i odpowiedzi.</strong> Możesz sam zadać pytanie i sam na nie odpowiedzieć. „Czy jest parking?", „Czy blisko wyciąg?" — to realnie zmniejsza liczbę telefonów.</li>
  <li><strong>Wpisy o wydarzeniach.</strong> Wolne terminy, oferta na długi weekend, informacja o warunkach na szlakach.</li>
</ul>

<p>
  Rozwinięcie tematu opisaliśmy osobno:
  <a href="/blog/wizytowka-google-firma-podhale/">wizytówka Google dla firmy z Podhala</a>.
</p>

<h2 id="tresc">Treść, której nie ma konkurencja</h2>

<p>
  Portale rezerwacyjne mają przewagę w skali, ale mają jedną fundamentalną słabość:
  <strong>nie znają okolicy</strong>. Ich opisy są generowane masowo i brzmią
  identycznie dla obiektu w Zakopanem i w Karpaczu.
</p>

<p>Ty wiesz rzeczy, których nie wie żaden algorytm:</p>

<ul>
  <li>że na Sarnią Skałę z sześciolatkiem wchodzi się półtorej godziny, a nie „40 minut" jak podaje przewodnik,</li>
  <li>że parking pod Halą Gąsienicową w lipcu zapełnia się przed siódmą rano,</li>
  <li>że w drugim tygodniu marca jest najlepszy stosunek śniegu do cen,</li>
  <li>że z Twojego tarasu widać Giewont, ale tylko z lewej strony i tylko przy dobrej pogodzie.</li>
</ul>

<p>
  To jest materiał na treści, których nikt inny nie napisze. Google od kilku lat
  wprost premiuje treści z realnym doświadczeniem (zasada E-E-A-T: doświadczenie,
  ekspertyza, autorytet, wiarygodność). Opis w stylu „nasz pensjonat oferuje komfortowe
  pokoje w malowniczej okolicy" nie niesie żadnej informacji i tak jest oceniany.
</p>

<blockquote>
  <p>
    Praktyczny test: jeśli dany akapit dałoby się przekleić na stronę konkurencji
    bez zmiany choćby jednego słowa — nie ma on wartości dla wyszukiwarki.
  </p>
</blockquote>

<h2 id="rezerwacja">Ścieżka rezerwacji bezpośredniej</h2>

<p>
  Ruch bez konwersji to koszt, nie zysk. Kiedy gość już trafi na Twoją stronę,
  musi mieć powód, żeby zarezerwować u Ciebie zamiast wrócić do portalu.
</p>

<ul>
  <li><strong>Gwarancja najniższej ceny.</strong> Widoczna, na każdej podstronie z ofertą. Legalna i skuteczna.</li>
  <li><strong>Coś, czego portal nie sprzeda.</strong> Późne wymeldowanie, transfer z dworca, śniadanie w cenie, drugi rodzaj sera na śniadanie — cokolwiek, byle konkretne.</li>
  <li><strong>Telefon widoczny stale.</strong> Znacząca część gości w tym segmencie woli zadzwonić niż wypełniać formularz. Numer musi być klikalny na komórce.</li>
  <li><strong>Silnik rezerwacyjny, który nie wygląda jak z 2011 roku.</strong> Trzy kliknięcia do rezerwacji, bez zakładania konta.</li>
  <li><strong>Szybkość ładowania.</strong> Galeria z nieskompresowanymi zdjęciami po 4 MB potrafi zabić konwersję na komórce skuteczniej niż zła cena. Piszemy o tym przy okazji <a href="/uslugi/strony-internetowe/">budowy stron</a>.</li>
</ul>

<h2 id="plan">Plan na pierwsze 90 dni</h2>

<p>Gdybyśmy mieli ułożyć kolejność działań dla obiektu startującego od zera:</p>

<h3>Dni 1–14: fundament techniczny</h3>
<ul>
  <li>Kompresja zdjęć i wdrożenie formatu WebP — zwykle największy pojedynczy zysk na szybkości.</li>
  <li>Poprawa wyników Core Web Vitals na urządzeniach mobilnych.</li>
  <li>Konfiguracja Google Search Console i Analytics, jeśli ich nie ma.</li>
  <li>Uporządkowanie wizytówki Google.</li>
</ul>

<h3>Dni 15–45: struktura i treść</h3>
<ul>
  <li>Rozbicie oferty na osobne podstrony według intencji.</li>
  <li>Napisanie unikalnych opisów pokoi — bez kopiowania z portalu (duplikacja treści działa na Twoją niekorzyść).</li>
  <li>Pierwsze dwa poradniki okolicznościowe.</li>
  <li>Wdrożenie danych strukturalnych: <code>LodgingBusiness</code>, <code>FAQPage</code>.</li>
</ul>

<h3>Dni 46–90: widoczność i konwersja</h3>
<ul>
  <li>Wpisy do lokalnych katalogów i portali turystycznych ze spójnym NAP.</li>
  <li>Kontakt z lokalnymi blogami i serwisami o Tatrach.</li>
  <li>Optymalizacja ścieżki rezerwacyjnej na podstawie zebranych danych.</li>
  <li>Pierwsza korekta strategii fraz w oparciu o dane z Search Console.</li>
</ul>

<p>
  Po 90 dniach nie będziesz jeszcze pierwszy na wszystkie zaplanowane frazy.
  Ale będziesz miał fundament, na którym kolejne miesiące dokładają wyniki —
  zamiast łatać w kółko to samo.
</p>

<hr class="divider">

<p>
  <strong>Chcesz sprawdzić, jak Twój obiekt wypada na tle konkurencji z okolicy?</strong>
  Robimy bezpłatną analizę widoczności — Twoja strona i trzy obiekty konkurencyjne,
  z konkretną listą różnic. <a href="/kontakt/">Napisz do nas</a> albo zobacz,
  jak wygląda <a href="/pozycjonowanie/zakopane/">pozycjonowanie w Zakopanem</a> u nas.
</p>
`
  },

  /* ======================================================================
     2
     ====================================================================== */
  {
    slug: 'ile-kosztuje-strona-internetowa',
    title: 'Ile kosztuje strona internetowa w 2026 roku? Uczciwe widełki i co jest w cenie',
    metaTitle: 'Ile kosztuje strona internetowa w 2026? Realne widełki cen',
    metaDescription:
      'Od 1 500 zł do 40 000 zł — skąd taka rozpiętość cen stron internetowych? Rozkładamy wycenę na czynniki pierwsze i pokazujemy, za co realnie płacisz.',
    excerpt:
      'Ta sama strona bywa wyceniana na 2 000 zł i na 20 000 zł. Rozkładamy wycenę na czynniki pierwsze i pokazujemy, które oszczędności wracają potem jako koszt.',
    category: 'Strony WWW',
    published: '2026-05-08',
    publishedText: '8 maja 2026',
    modified: '2026-07-20',
    modifiedText: '20 lipca 2026',
    author: 'Michał Zubek',
    authorRole: 'Strateg SEO, Tatry Marketing',
    readingTime: 9,
    toc: [
      { id: 'widelki', label: 'Widełki cenowe: cztery przedziały' },
      { id: 'sklada', label: 'Z czego składa się wycena' },
      { id: 'pulapki', label: 'Pięć pułapek w tanich ofertach' },
      { id: 'utrzymanie', label: 'Koszty, o których nikt nie mówi na starcie' },
      { id: 'decyzja', label: 'Jak zdecydować, ile wydać' }
    ],
    body: `
<p class="lead">
  „Ile kosztuje strona internetowa?" to pytanie w rodzaju „ile kosztuje samochód".
  Odpowiedź brzmi: od 1 500 zł do 40 000 zł, a jedno i drugie może być uczciwą ceną —
  za zupełnie różne rzeczy. Poniżej rozkładamy tę rozpiętość na czynniki pierwsze.
</p>

<h2 id="widelki">Widełki cenowe: cztery przedziały</h2>

<div class="table-scroll">
<table>
  <thead>
    <tr><th>Przedział</th><th>Co realnie dostajesz</th><th>Dla kogo</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1 500 – 3 500 zł</strong></td>
      <td>Gotowy szablon z podmienioną treścią i zdjęciami. Zwykle WordPress z kupionym motywem, bez indywidualnego projektu graficznego.</td>
      <td>Jednoosobowa działalność, która potrzebuje „czegokolwiek" pod wizytówkę Google</td>
    </tr>
    <tr>
      <td><strong>4 000 – 9 000 zł</strong></td>
      <td>Indywidualny projekt graficzny, 5–10 podstron, podstawowa optymalizacja SEO, panel do samodzielnej edycji treści.</td>
      <td>Większość małych i średnich firm usługowych, pensjonatów, restauracji</td>
    </tr>
    <tr>
      <td><strong>10 000 – 20 000 zł</strong></td>
      <td>Rozbudowany serwis, copywriting w cenie, sesja zdjęciowa, integracje (rezerwacje, płatności, CRM), strategia treści pod SEO.</td>
      <td>Firmy, dla których strona jest głównym kanałem sprzedaży</td>
    </tr>
    <tr>
      <td><strong>20 000 zł i więcej</strong></td>
      <td>Sklep internetowy, system rezerwacyjny, wielojęzyczność, dedykowane funkcje pisane od zera.</td>
      <td>E-commerce, sieci obiektów, projekty z niestandardową logiką</td>
    </tr>
  </tbody>
</table>
</div>

<p>
  W naszym <a href="/cennik/">cenniku</a> większość projektów dla firm z Podhala
  mieści się w drugim przedziale. Trzeci dotyczy obiektów, które sprzedają
  bezpośrednio i potrzebują pełnej integracji z systemem rezerwacyjnym.
</p>

<h2 id="sklada">Z czego składa się wycena</h2>

<p>
  Kiedy dostajesz ofertę na 7 000 zł, płacisz nie za „stronę", tylko za pakiet prac.
  Orientacyjny rozkład dla projektu w tym przedziale:
</p>

<div class="table-scroll">
<table>
  <thead>
    <tr><th>Etap</th><th>Udział w cenie</th><th>Co się dzieje</th></tr>
  </thead>
  <tbody>
    <tr><td>Analiza i architektura informacji</td><td>10–15%</td><td>Badanie fraz, ustalenie struktury podstron, analiza konkurencji</td></tr>
    <tr><td>Projekt graficzny</td><td>20–25%</td><td>Makiety, projekt wszystkich typów podstron, wersje mobilne</td></tr>
    <tr><td>Kodowanie</td><td>30–35%</td><td>Przełożenie projektu na działający kod, responsywność, optymalizacja</td></tr>
    <tr><td>Treści</td><td>10–20%</td><td>Copywriting, teksty pod frazy, opisy usług</td></tr>
    <tr><td>SEO techniczne i wdrożenie</td><td>10–15%</td><td>Dane strukturalne, sitemap, Search Console, przekierowania ze starej strony</td></tr>
    <tr><td>Testy i szkolenie</td><td>5–10%</td><td>Testy na urządzeniach, szkolenie z obsługi panelu</td></tr>
  </tbody>
</table>
</div>

<p>
  Warto zwrócić uwagę na dwie pozycje, które w tanich ofertach po prostu nie istnieją:
  <strong>analiza na starcie</strong> i <strong>SEO techniczne</strong>. To one decydują,
  czy strona będzie się dało znaleźć — a nie wygląd nagłówka.
</p>

<h2 id="pulapki">Pięć pułapek w tanich ofertach</h2>

<h3>1. Strona nie należy do Ciebie</h3>
<p>
  Model „strona za 99 zł miesięcznie" zwykle oznacza, że nie kupujesz strony,
  tylko ją wynajmujesz. Rezygnujesz — zostajesz bez niczego, łącznie z treściami,
  za które zapłaciłeś. Zawsze pytaj wprost: <em>„czy po zakończeniu współpracy
  dostaję kod, bazę danych i domenę zapisaną na moje dane?"</em>.
</p>

<h3>2. Domena zarejestrowana na wykonawcę</h3>
<p>
  Zdarza się częściej, niż powinno. Sprawdź w bazie WHOIS, kto figuruje jako abonent
  Twojej domeny. Jeśli nie Ty — to nie jest Twoja domena, niezależnie od tego,
  kto za nią płaci.
</p>

<h3>3. Szablon z kilkunastoma wtyczkami</h3>
<p>
  Kupiony motyw WordPress z demo zawiera zwykle 15–25 wtyczek, z których używasz trzech.
  Reszta ładuje się przy każdym wejściu, spowalnia stronę i mnoży wektory ataku.
  Strona ładująca się cztery sekundy na komórce traci gości, zanim zobaczą ofertę.
</p>

<h3>4. Brak przekierowań ze starej strony</h3>
<p>
  Wdrożenie nowej strony bez mapy przekierowań 301 ze starych adresów to najszybszy
  sposób na utratę pozycji zbudowanych latami. Widzieliśmy spadki ruchu o 60–70%
  po „udanym" wdrożeniu. Odbudowa zajmuje miesiące i kosztuje więcej niż przygotowanie
  przekierowań na starcie.
</p>

<h3>5. Treści z generatora</h3>
<p>
  Teksty wygenerowane hurtowo, bez znajomości firmy, brzmią identycznie na dziesiątkach
  stron. Google ocenia treść pod kątem realnej wartości i doświadczenia autora —
  wypełniacz nie zbuduje pozycji, niezależnie od tego, ile go będzie.
</p>

<h2 id="utrzymanie">Koszty, o których nikt nie mówi na starcie</h2>

<p>Strona to nie jednorazowy wydatek. Roczne koszty utrzymania dla typowej firmowej strony:</p>

<div class="table-scroll">
<table>
  <thead>
    <tr><th>Pozycja</th><th>Koszt roczny</th><th>Uwagi</th></tr>
  </thead>
  <tbody>
    <tr><td>Domena <code>.pl</code></td><td>70 – 150 zł</td><td>Pierwszy rok często promocyjny — sprawdź cenę odnowienia</td></tr>
    <tr><td>Hosting</td><td>200 – 800 zł</td><td>Dla stron statycznych bywa darmowy</td></tr>
    <tr><td>Certyfikat SSL</td><td>0 zł</td><td>Let's Encrypt wystarcza; płatny potrzebny w wyjątkowych przypadkach</td></tr>
    <tr><td>Aktualizacje (WordPress)</td><td>600 – 2 400 zł</td><td>Nieaktualizowana instalacja to kwestia czasu do włamania</td></tr>
    <tr><td>Kopie zapasowe</td><td>0 – 300 zł</td><td>Często w cenie hostingu, ale sprawdź, czy da się z nich odtworzyć</td></tr>
  </tbody>
</table>
</div>

<p>
  To jeden z powodów, dla których część naszych projektów budujemy jako
  <strong>strony statyczne</strong>: nie ma bazy danych, nie ma wtyczek do aktualizowania,
  nie ma czego zhakować, a hosting bywa darmowy. Wadą jest brak panelu w wersji
  „klikam i zmieniam wszystko" — dlatego to rozwiązanie dla stron wizerunkowo-ofertowych,
  a nie dla serwisu z nowym wpisem codziennie.
</p>

<h2 id="decyzja">Jak zdecydować, ile wydać</h2>

<p>Zamiast pytać „ile kosztuje strona", odpowiedz sobie na trzy pytania:</p>

<ol>
  <li>
    <strong>Ile wart jest dla Ciebie jeden klient?</strong> Jeśli pojedyncze zlecenie
    to 8 000 zł, strona za 9 000 zł zwraca się przy drugim kliencie. Jeśli sprzedajesz
    kawę po 12 zł, rachunek wygląda inaczej.
  </li>
  <li>
    <strong>Skąd dziś przychodzą Twoi klienci?</strong> Jeśli 80% to polecenia,
    strona jest wizytówką i nie musi być rozbudowana. Jeśli masz zdobywać klientów
    z Google — strona jest narzędziem sprzedaży i oszczędzanie na niej jest pozorne.
  </li>
  <li>
    <strong>Czy masz plan na treści po wdrożeniu?</strong> Najdroższa strona bez nowych
    treści przez dwa lata przegra z tanią, ale rozwijaną. Jeśli nie masz czasu
    na treści, lepiej wydać mniej na projekt i przeznaczyć różnicę na
    <a href="/uslugi/pozycjonowanie-seo/">stałą opiekę SEO</a>.
  </li>
</ol>

<blockquote>
  <p>
    Nasza rekomendacja dla małej firmy z Podhala: zamiast wydać 15 000 zł na stronę
    i zero na jej rozwój, lepiej wydać 7 000 zł na dobrą stronę i przez rok
    finansować systematyczną pracę nad widocznością. Wyniki są nieporównywalne.
  </p>
</blockquote>

<hr class="divider">

<p>
  <strong>Potrzebujesz konkretnej wyceny zamiast widełek?</strong>
  <a href="/kontakt/">Napisz do nas</a> — po krótkiej rozmowie o zakresie
  wysyłamy wycenę z rozbiciem na etapy. Zobacz też, jak wygląda u nas
  <a href="/uslugi/strony-internetowe/">tworzenie stron internetowych</a>.
</p>
`
  },

  /* ======================================================================
     3
     ====================================================================== */
  {
    slug: 'wizytowka-google-firma-podhale',
    title: 'Wizytówka Google dla firmy z Podhala — 12 ustawień, które zmieniają widoczność',
    metaTitle: 'Wizytówka Google — konfiguracja krok po kroku (Podhale)',
    metaDescription:
      'Jak skonfigurować wizytówkę Google, żeby firma z Podhala pojawiała się w mapach i wynikach lokalnych. 12 ustawień i najczęstsze błędy.',
    excerpt:
      'Wizytówka to najtańszy kanał widoczności lokalnej i jednocześnie najbardziej zaniedbany. Dwanaście ustawień, które da się poprawić w jedno popołudnie.',
    category: 'SEO lokalne',
    published: '2026-04-02',
    publishedText: '2 kwietnia 2026',
    modified: '2026-06-30',
    modifiedText: '30 czerwca 2026',
    author: 'Michał Zubek',
    authorRole: 'Strateg SEO, Tatry Marketing',
    readingTime: 8,
    toc: [
      { id: 'dlaczego', label: 'Dlaczego wizytówka bije stronę na głowę' },
      { id: 'ustawienia', label: '12 ustawień po kolei' },
      { id: 'opinie', label: 'Opinie: jak zbierać i jak odpowiadać' },
      { id: 'bledy', label: 'Błędy, które kosztują pozycje' }
    ],
    body: `
<p class="lead">
  Wizytówka Google Business Profile to jedyne narzędzie marketingowe, które
  jest darmowe, zajmuje popołudnie i potrafi w miesiąc zmienić liczbę telefonów.
  A mimo to cztery na pięć wizytówek firm, które audytujemy w regionie,
  ma niepełne dane albo źle dobraną kategorię.
</p>

<h2 id="dlaczego">Dlaczego wizytówka bije stronę na głowę</h2>

<p>
  Kiedy ktoś w Zakopanem wpisuje „wypożyczalnia nart", Google pokazuje najpierw
  mapę z trzema firmami (tzw. <em>local pack</em>), a dopiero pod nią klasyczne wyniki.
  Ta mapa zbiera lwią część kliknięć — zwłaszcza na telefonie, gdzie zajmuje
  praktycznie cały pierwszy ekran.
</p>

<p>
  O tym, kto się w niej znajdzie, decydują trzy czynniki:
</p>

<ul>
  <li><strong>Odległość</strong> — od miejsca, w którym stoi szukający. Na to nie masz wpływu.</li>
  <li><strong>Trafność</strong> — jak dobrze wizytówka pasuje do zapytania. Na to masz wpływ ogromny.</li>
  <li><strong>Rozpoznawalność</strong> — opinie, wzmianki, spójność danych w sieci. Na to masz wpływ pośredni, ale realny.</li>
</ul>

<h2 id="ustawienia">12 ustawień po kolei</h2>

<h3>1. Kategoria główna</h3>
<p>
  Najważniejsze pojedyncze pole w całej wizytówce. Wybierz najbardziej precyzyjną
  dostępną kategorię — „Wypożyczalnia sprzętu narciarskiego", nie „Sklep sportowy".
  Kategoria główna decyduje o tym, w jakich zapytaniach w ogóle jesteś brany pod uwagę.
</p>

<h3>2. Kategorie dodatkowe</h3>
<p>
  Do dziewięciu, ale nie na siłę. Dodawaj wyłącznie te, które opisują usługi
  faktycznie świadczone. Kategorie niezwiązane z działalnością rozmywają trafność.
</p>

<h3>3. Nazwa dokładnie taka jak w rzeczywistości</h3>
<p>
  Kuszące jest wpisanie „Karczma Regionalna Zakopane Centrum Tanio". To naruszenie
  regulaminu i realne ryzyko zawieszenia wizytówki. Nazwa to nazwa firmy —
  ta z szyldu i z faktur.
</p>

<h3>4. Adres spójny ze stroną i katalogami</h3>
<p>
  Zapis <em>„ul. Krupówki 12/3"</em> na stronie i <em>„Krupówki 12 lok. 3"</em>
  w wizytówce to dla algorytmu dwa różne adresy. Trzymaj jeden zapis wszędzie —
  to jest ten słynny NAP (Name, Address, Phone), o którym mówi każdy poradnik SEO.
</p>

<h3>5. Obszar działania</h3>
<p>
  Jeśli dojeżdżasz do klienta (usługi budowlane, instalacje, catering) — wypełnij
  obszar działania i wpisz konkretne miejscowości. Jeśli klient przychodzi do Ciebie
  (restauracja, pensjonat) — zostaw sam adres, bez obszaru.
</p>

<h3>6. Godziny otwarcia, w tym specjalne</h3>
<p>
  Na Podhalu to szczególnie istotne: godziny w ferie, w sylwestra, w Boże Narodzenie
  i w martwym listopadzie potrafią się drastycznie różnić. Google wprost obniża
  widoczność wizytówek z nieaktualnymi godzinami, bo generują złe doświadczenia.
</p>

<h3>7. Opis firmy (750 znaków)</h3>
<p>
  Nie upychaj tu fraz. Napisz, co robicie, dla kogo i co Was wyróżnia, używając
  naturalnego języka. Frazy pojawią się same, jeśli opis jest konkretny.
</p>

<h3>8. Zdjęcia — regularnie, nie jednorazowo</h3>
<p>
  Start: minimum 20 zdjęć (zewnątrz, wnętrza, zespół, produkt/usługa w akcji).
  Potem kilka nowych co miesiąc. Regularność liczy się bardziej niż liczba —
  wizytówka bez nowego zdjęcia od roku wygląda dla algorytmu jak firma, której
  może już nie być.
</p>

<h3>9. Usługi i produkty rozpisane osobno</h3>
<p>
  Każda usługa jako osobna pozycja z opisem i ceną (albo widełkami). To pole
  jest indeksowane i realnie wpływa na dopasowanie do zapytań szczegółowych.
</p>

<h3>10. Atrybuty</h3>
<p>
  „Parking na miejscu", „Przyjazne zwierzętom", „Dostępne dla wózków", „Wi-Fi".
  To dokładnie te filtry, według których użytkownicy zawężają wyniki w mapach.
  Brak wypełnionego atrybutu = wypadasz z filtra.
</p>

<h3>11. Pytania i odpowiedzi</h3>
<p>
  Możesz sam zadać pytanie ze swojego prywatnego konta i odpowiedzieć na nie
  z konta firmowego. To dozwolone i sensowne — uprzedzasz najczęstsze wątpliwości
  i zmniejszasz liczbę telefonów z tym samym pytaniem.
</p>

<h3>12. Wpisy (posty)</h3>
<p>
  Krótkie aktualności: wolne terminy, oferta na długi weekend, zmiana godzin,
  nowa usługa. Wpisy wygasają po tygodniu, więc wymagają regularności —
  ale to najprostszy sygnał, że firma jest aktywna.
</p>

<h2 id="opinie">Opinie: jak zbierać i jak odpowiadać</h2>

<p>
  Opinie to jeden z najsilniejszych czynników w lokalnych wynikach. Dwie zasady,
  których warto się trzymać:
</p>

<p>
  <strong>Zbieraj systematycznie, nie zrywami.</strong> Dwadzieścia opinii w jednym
  tygodniu i cisza przez rok wygląda podejrzanie. Dwie–trzy miesięcznie przez cały
  rok budują wiarygodny profil. Najskuteczniejszy moment to chwila, w której klient
  jest zadowolony — przy wymeldowaniu, po odebranej usłudze. Krótki link
  albo kod QR na paragonie działa lepiej niż mail wysłany tydzień później.
</p>

<p>
  <strong>Odpowiadaj na wszystkie, zwłaszcza na negatywne.</strong> Odpowiedź nie jest
  dla autora opinii — on już wyszedł. Jest dla trzydziestu kolejnych osób, które ją
  przeczytają. Spokojna, konkretna odpowiedź na krytykę buduje więcej zaufania
  niż dziesięć entuzjastycznych pięciogwiazdkowych wpisów.
</p>

<blockquote>
  <p>
    Czego nie robić: nie kupuj opinii i nie proś o nie rodziny. Google wykrywa
    nienaturalne wzorce (te same urządzenia, konta bez historii, nagłe skoki),
    a usunięcie wykrytych opinii cofa profil do punktu wyjścia. Bywa,
    że razem z wizytówką.
  </p>
</blockquote>

<h2 id="bledy">Błędy, które kosztują pozycje</h2>

<ul>
  <li><strong>Duplikat wizytówki.</strong> Powstaje przy zmianie adresu albo gdy ktoś kiedyś założył drugą. Dwie wizytówki dzielą między siebie sygnały — trzeba zgłosić duplikat do usunięcia.</li>
  <li><strong>Numer telefonu inny niż na stronie.</strong> Klasyk. Numer komórkowy w wizytówce, stacjonarny na stronie — dla algorytmu to dwie różne firmy.</li>
  <li><strong>Wirtualne biuro jako adres.</strong> Google systematycznie weryfikuje adresy i zawiesza wizytówki bez fizycznej obecności.</li>
  <li><strong>Brak linku do strony albo link do Facebooka.</strong> Wizytówka i strona wzajemnie się wzmacniają — rozłączenie ich to strata po obu stronach.</li>
  <li><strong>Zdjęcia pobrane z internetu.</strong> Poza kwestią praw autorskich: Google rozpoznaje zdjęcia stockowe i nie traktuje ich jako sygnału realnej działalności.</li>
</ul>

<hr class="divider">

<p>
  <strong>Chcesz, żeby ktoś to przejrzał za Ciebie?</strong> Przegląd wizytówki
  wchodzi w zakres naszego <a href="/uslugi/audyt-seo/">audytu SEO</a>, a przy stałej
  współpracy prowadzimy ją na bieżąco. Zobacz też, jak wygląda
  <a href="/uslugi/pozycjonowanie-seo/">pozycjonowanie lokalne</a> w praktyce,
  albo od razu <a href="/kontakt/">napisz do nas</a>.
</p>
`
  }
];
