/* ==========================================================================
   DANE FIRMY — JEDYNE MIEJSCE DO EDYCJI
   --------------------------------------------------------------------------
   Wszystko poniżej trafia jednocześnie do treści stron, stopki, danych
   strukturalnych JSON-LD, sitemap.xml i tagów Open Graph.

   >>> UWAGA: pola oznaczone DO_UZUPELNIENIA zawierają dane przykładowe. <<<
   Przed publikacją podmień je na prawdziwe — spójność NAP (Name, Address,
   Phone) między stroną, wizytówką Google i katalogami firm to jeden
   z najsilniejszych czynników lokalnego SEO. Rozbieżny numer telefonu
   albo skrócony adres realnie obniżają widoczność w mapach.

   Po każdej zmianie uruchom: npm run build
   ========================================================================== */

export const site = {
  /* --- Tożsamość -------------------------------------------------------- */
  name: 'Tatry Marketing',
  legalName: 'Tatry Marketing Sp. z o.o.', // DO_UZUPELNIENIA: pełna nazwa z KRS/CEIDG
  tagline: 'Agencja SEO i stron WWW',
  slogan: 'Pozycjonowanie i strony internetowe dla firm z Podhala',

  /* --- Adres domeny ----------------------------------------------------- */
  // DO_UZUPELNIENIA: docelowa domena, bez ukośnika na końcu.
  // Używana w canonical, Open Graph, sitemap.xml i JSON-LD.
  url: 'https://tatrymarketing.pl',

  /* --- Kontakt (NAP) ---------------------------------------------------- */
  phone: '+48 500 100 200', // DO_UZUPELNIENIA
  phoneHref: '+48500100200', // ten sam numer bez spacji — do atrybutu href="tel:"
  email: 'kontakt@tatrymarketing.pl', // DO_UZUPELNIENIA
  street: 'ul. Krupówki 12/3', // DO_UZUPELNIENIA
  postalCode: '34-500', // DO_UZUPELNIENIA
  city: 'Zakopane',
  region: 'małopolskie',
  country: 'PL',
  countryName: 'Polska',

  /* Współrzędne siedziby — DO_UZUPELNIENIA na dokładne.
     Trafiają do JSON-LD (geo) i pomagają Google powiązać firmę z lokalizacją.
     Obecne wskazują centrum Zakopanego. */
  geo: { lat: 49.29899, lng: 19.94966 },

  /* --- Dane rejestrowe -------------------------------------------------- */
  vatId: 'PL0000000000', // DO_UZUPELNIENIA: NIP w formacie PL + 10 cyfr
  regon: '000000000', // DO_UZUPELNIENIA

  /* --- Godziny otwarcia ------------------------------------------------- */
  // Format zgodny ze schema.org OpeningHoursSpecification
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], from: '08:00', to: '16:00' }
  ],
  openingHoursText: 'poniedziałek – piątek, 8:00 – 16:00',

  /* --- Profile społecznościowe ------------------------------------------ */
  // DO_UZUPELNIENIA: prawdziwe adresy. Trafiają do JSON-LD jako "sameAs",
  // co pomaga Google potwierdzić tożsamość firmy. Puste wpisy usuń.
  social: {
    facebook: 'https://www.facebook.com/tatrymarketing',
    linkedin: 'https://www.linkedin.com/company/tatrymarketing',
    instagram: 'https://www.instagram.com/tatrymarketing'
  },

  /* Adres wizytówki Google Business Profile — DO_UZUPELNIENIA.
     Ustaw na null, jeśli wizytówka nie jest jeszcze założona. */
  googleBusinessProfile: null,

  /* --- Rok założenia ---------------------------------------------------- */
  founded: '2016', // DO_UZUPELNIENIA

  /* --- Wideo w sekcji hero ----------------------------------------------
     Tło filmowe na stronie głównej. Ustaw `enabled: false`, żeby wrócić
     do samego gradientu — reszta strony nie wymaga wtedy żadnych zmian.

     Wideo NIGDY nie jest pobierane na starcie. Skrypt dociąga je dopiero
     po sprawdzeniu warunków (szeroki ekran, brak trybu ograniczonych
     animacji, brak oszczędzania danych), więc nie wpływa na LCP ani
     na transfer użytkowników mobilnych. Do czasu wczytania — i zawsze
     na telefonach — widoczny jest plakat, który wygląda jak dotychczasowe
     tło gradientowe.

     ŹRÓDŁO NAGRANIA — dwie możliwości:

     1. Plik we własnym repozytorium (domyślnie):
            webm: '/assets/video/hero.webm'
        Zero zapytań do obcych serwerów, pełna kontrola, działa zawsze.

     2. Bezpośredni adres pliku na CDN lub innym hostingu:
            webm: 'https://cdn.twojadomena.pl/hero.webm'
        Sensowne przy dużych plikach. Wymaga hostingu obsługującego
        żądania zakresowe (Range) i nagłówki CORS — spełniają to
        Cloudflare R2, Bunny, Amazon S3 i każdy zwykły serwer WWW.
        Pamiętaj wtedy o rozszerzeniu `media-src` w nagłówku
        Content-Security-Policy w pliku .htaccess.

     CZEGO TU NIE WPISAĆ: linku do Dysku Google, YouTube ani Vimeo.
     Dysk nie udostępnia bezpośredniego adresu pliku (zwraca stronę HTML
     i blokuje hotlinkowanie), a YouTube i Vimeo wymagają osadzenia
     odtwarzacza w <iframe> — co oznacza obce ciasteczka, obowiązek
     baneru zgody i kilkaset kB cudzego JavaScriptu na ścieżce
     krytycznej. Film z Dysku najpierw pobierz i przekoduj — polecenia
     są w README, sekcja „Wideo w sekcji hero".

     >>> DO_UZUPELNIENIA: wskaż źródło nagrania. <<<
     Build ostrzega, jeśli pliku brakuje. */
  heroVideo: {
    enabled: true,

    /* Tryb źródła:
         'file'    — własny plik z assets/video/ lub CDN (zalecane),
         'youtube' — osadzony odtwarzacz YouTube.

       Tryb 'youtube' jest wygodny (nie trzeba hostować pliku), ale ma koszty,
       o których warto pamiętać:
         - ładuje kilkaset kB obcego JavaScriptu, co obciąża Core Web Vitals,
         - ustawia pliki cookie serwisu Google, więc strona wymaga baneru
           zgody, a polityka prywatności musi to opisywać (jest to już w niej
           uwzględnione — sekcja o osadzonym odtwarzaczu włącza się sama),
         - nie da się wyłączyć wszystkich elementów interfejsu odtwarzacza,
         - film musi pozostać publiczny; zmiana widoczności psuje tło.

       Przejście na 'file' to zmiana jednej linijki — reszta działa tak samo.
       Przygotowanie pliku: ./build/prepare-video.sh nagranie.mp4 */
    source: 'youtube',

    /* Identyfikator filmu z adresu YouTube:
       https://www.youtube.com/watch?v=fa45gzEzJvo  ->  'fa45gzEzJvo' */
    youtubeId: 'fa45gzEzJvo',
    youtubeStart: 0, // sekunda, od której startuje pętla

    webm: '/assets/video/hero.webm', // preferowany — mniejszy przy tej samej jakości
    mp4: '/assets/video/hero.mp4', // zapas dla Safari i starszych przeglądarek
    poster: '/assets/img/hero-poster.jpg',
    /* Poniżej tej szerokości ekranu wideo się nie ładuje (zostaje plakat).
       768 px odcina telefony — tam koszt transferu przewyższa efekt. */
    minWidth: 768,
    /* Przezroczystość nagrania na tle granatu. Niżej = mocniejsza marka
       i lepszy kontrast tekstu, wyżej = wyraźniejszy film. */
    opacity: 0.92
  },

  /* --- Ustawienia techniczne -------------------------------------------- */
  lang: 'pl-PL',
  locale: 'pl_PL',

  /* Kod Google Analytics / Search Console — DO_UZUPELNIENIA.
     Zostaw null, dopóki nie masz zgody na cookies analityczne (RODO). */
  analyticsId: null,
  searchConsoleVerification: null
};

/* --------------------------------------------------------------------------
   Miejscowości obsługiwane przez agencję.
   `page: true` oznacza, że powstaje dedykowana podstrona lokalna
   (/pozycjonowanie/<slug>/). Reszta pojawia się jako lista obszaru działania
   — bez własnej podstrony, żeby nie tworzyć stron o zerowej wartości,
   które Google klasyfikuje jako doorway pages.
   -------------------------------------------------------------------------- */
export const areas = [
  { slug: 'zakopane', name: 'Zakopane', inflected: 'w Zakopanem', page: true },
  { slug: 'nowy-targ', name: 'Nowy Targ', inflected: 'w Nowym Targu', page: true },
  { slug: 'rabka-zdroj', name: 'Rabka-Zdrój', inflected: 'w Rabce-Zdroju', page: true },
  { slug: 'nowy-sacz', name: 'Nowy Sącz', inflected: 'w Nowym Sączu', page: true },
  { slug: 'bialy-dunajec', name: 'Biały Dunajec', inflected: 'w Białym Dunajcu', page: false },
  { slug: 'poronin', name: 'Poronin', inflected: 'w Poroninie', page: false },
  { slug: 'bukowina-tatrzanska', name: 'Bukowina Tatrzańska', inflected: 'w Bukowinie Tatrzańskiej', page: false },
  { slug: 'koscielisko', name: 'Kościelisko', inflected: 'w Kościelisku', page: false },
  { slug: 'czarny-dunajec', name: 'Czarny Dunajec', inflected: 'w Czarnym Dunajcu', page: false },
  { slug: 'szaflary', name: 'Szaflary', inflected: 'w Szaflarach', page: false },
  { slug: 'nowy-targ-powiat', name: 'powiat nowotarski', inflected: 'w powiecie nowotarskim', page: false },
  { slug: 'chocholow', name: 'Chochołów', inflected: 'w Chochołowie', page: false },
  { slug: 'krakow', name: 'Kraków', inflected: 'w Krakowie', page: false },
  { slug: 'myslenice', name: 'Myślenice', inflected: 'w Myślenicach', page: false }
];

/* --------------------------------------------------------------------------
   Usługi — źródło dla podstron, menu, stopki i danych strukturalnych Service.
   -------------------------------------------------------------------------- */
export const services = [
  {
    slug: 'pozycjonowanie-seo',
    name: 'Pozycjonowanie SEO',
    navDesc: 'Wejście na pierwszą stronę Google',
    icon: 'trending',
    short:
      'Prowadzimy firmę na pierwszą stronę Google na frazy, których naprawdę szukają Twoi klienci — lokalnie i w całej Polsce.',
    priceFrom: '1 500 zł'
  },
  {
    slug: 'strony-internetowe',
    name: 'Strony internetowe',
    navDesc: 'Szybkie strony gotowe pod SEO',
    icon: 'code',
    short:
      'Projektujemy i kodujemy strony, które ładują się w ułamku sekundy i od pierwszego dnia są przygotowane pod pozycjonowanie.',
    priceFrom: '4 900 zł'
  },
  {
    slug: 'audyt-seo',
    name: 'Audyt SEO',
    navDesc: 'Diagnoza, co blokuje wzrost',
    icon: 'search',
    short:
      'Sprawdzamy stronę pod kątem technicznym, treściowym i linkowym, a wynik dostajesz jako listę zadań uszeregowaną według wpływu na wyniki.',
    priceFrom: '2 400 zł'
  },
  {
    slug: 'google-ads',
    name: 'Google Ads',
    navDesc: 'Ruch płatny na start i w sezonie',
    icon: 'target',
    short:
      'Kampanie, które dowożą zapytania od pierwszego tygodnia — zanim pozycjonowanie nabierze rozpędu i w szczycie sezonu.',
    priceFrom: '900 zł'
  }
];

/* --------------------------------------------------------------------------
   Nawigacja główna
   -------------------------------------------------------------------------- */
export const mainNav = [
  { label: 'Start', href: '/' },
  {
    label: 'Usługi',
    href: '/uslugi/',
    panel: services.map((s) => ({
      label: s.name,
      href: `/uslugi/${s.slug}/`,
      desc: s.navDesc
    }))
  },
  { label: 'Realizacje', href: '/realizacje/' },
  { label: 'Cennik', href: '/cennik/' },
  { label: 'O nas', href: '/o-nas/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Kontakt', href: '/kontakt/' }
];
