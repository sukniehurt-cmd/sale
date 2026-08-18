# Pralnia AF — strona firmowa

Strona wizytówka firmy sprzątającej (pranie dywanów, wykładzin oraz tapicerki
meblowej i samochodowej) działającej w Zakopanem i na Podhalu.

Projekt zbudowany jest w React + Vite i **kompiluje się do zwykłych plików
statycznych**. Gotowy katalog `dist/` wystarczy wgrać na dowolny hosting
przez FTP — nie jest potrzebna baza danych ani Node.js po stronie serwera.
Jedynym elementem wymagającym serwera jest formularz wyceny, który korzysta
z PHP (dostępnego na każdym hostingu współdzielonym).

---

## Spis treści

1. [Szybki start](#szybki-start)
2. [Publikacja na hostingu](#publikacja-na-hostingu)
3. [Co trzeba uzupełnić przed publikacją](#co-trzeba-uzupełnić-przed-publikacją)
4. [Zdjęcia i wideo](#zdjęcia-i-wideo)
5. [Formularz wyceny](#formularz-wyceny)
6. [Struktura projektu](#struktura-projektu)
7. [Co zmieniasz i gdzie](#co-zmieniasz-i-gdzie)
8. [SEO, dostępność, wydajność](#seo-dostępność-wydajność)

---

## Szybki start

Wymagany Node.js w wersji 20 lub nowszej.

```bash
npm install      # instalacja bibliotek (jednorazowo)
npm run dev      # podgląd na http://localhost:3000 z odświeżaniem na żywo
npm run build    # zbudowanie strony do katalogu dist/
npm run preview  # podgląd tego, co trafi na serwer
npm run pack     # build + spakowanie dist/ do pliku pralnia-af-www.zip
npm run lint     # kontrola typów TypeScript
```

`npm run build` przed zbudowaniem sprawdza typy — jeżeli w kodzie jest błąd,
budowanie zatrzyma się z komunikatem, zamiast wypuścić zepsutą stronę.

---

## Publikacja na hostingu

Katalog `dist/` jest już zbudowany i leży w repozytorium — jeżeli nic nie
zmieniasz w treści, możesz wgrać go od razu.

1. Wejdź na serwer FTP (FileZilla, Total Commander, menedżer plików w panelu
   hostingu) i otwórz katalog strony — zwykle `public_html`, `htdocs`
   albo `www`.
2. Wgraj **całą zawartość** katalogu `dist/` (pliki i podkatalogi, **nie** sam
   katalog `dist`). Na serwerze powinny się znaleźć m.in.:

   ```
   public_html/
   ├── index.html
   ├── .htaccess          ← plik ukryty, w kliencie FTP włącz pokazywanie ukrytych plików
   ├── favicon.ico
   ├── favicon.svg
   ├── robots.txt
   ├── sitemap.xml
   ├── site.webmanifest
   ├── 404.html
   ├── polityka-prywatnosci.html
   ├── wyslij.php
   ├── assets/            ← skrypty, style i krój pisma
   ├── img/               ← zdjęcia
   └── video/             ← miejsce na tło wideo
   ```

3. Włącz certyfikat SSL w panelu hostingu (na większości serwerów jest
   darmowy i włącza się jednym kliknięciem).
4. Wejdź na stronę i sprawdź: telefon, formularz wyceny, suwak „przed / po”.

> **Uwaga na plik `.htaccess`.** Zaczyna się od kropki, więc wiele programów
> FTP domyślnie go nie pokazuje i pomija przy wysyłaniu. Bez niego strona
> nadal działa, ale traci kompresję, pamięć podręczną i stronę błędu 404.

### Publikacja w podkatalogu

Strona używa ścieżek względnych, więc działa też pod adresem typu
`https://domena.pl/podglad/` — wystarczy wgrać pliki do odpowiedniego katalogu.

---

## Co trzeba uzupełnić przed publikacją

W treści roboczo przyjęto domenę `pralnia-af.pl`. Jeżeli adres będzie inny,
trzeba go podmienić w pięciu miejscach:

| Plik | Co zmienić |
|---|---|
| `index.html` | `<link rel="canonical">`, znaczniki `og:` oraz blok danych strukturalnych (JSON-LD) |
| `public/robots.txt` | adres mapy witryny |
| `public/sitemap.xml` | oba adresy `<loc>` |
| `public/wyslij.php` | stałe `ODBIORCA`, `NADAWCA`, `DOMENA` |
| `src/site.config.ts` | pole `url` |

Dodatkowo:

- **`public/polityka-prywatnosci.html`** — uzupełnij nazwę firmy, adres
  siedziby i NIP (miejsca oznaczone `[NAZWA FIRMY]`, `[ADRES]`, `[NIP]`).
  Bez tego polityka prywatności nie spełnia wymagań RODO.
- **Opinie klientów** (`src/data/testimonials.ts`) — to prawdziwe opinie
  przepisane z profilu Google. Warto zamiast tego podlinkować profil firmy
  w wizytówce Google, żeby były weryfikowalne.
- **Liczby `600+` i `10+`** (`src/site.config.ts`) — upewnij się, że zgadzają
  się ze stanem faktycznym.

Po każdej zmianie w `src/` uruchom `npm run build` i wgraj `dist/` ponownie.
Zmiany w plikach z katalogu `public/` również wymagają przebudowania
(albo ręcznego skopiowania pliku na serwer).

---

## Zdjęcia i wideo

> **Ważne.** Archiwum, z którego powstał ten projekt, miało uszkodzone pliki
> binarne — wszystkie zdjęcia (`about-us.jpg`, `efekt.jpg`) oraz nagranie
> wideo zostały w nim zapisane jako tekst i nie da się ich odzyskać.
> W ich miejsce wstawiono **grafiki zastępcze**, oznaczone napisem
> „zdjęcie poglądowe”. Trzeba je podmienić na prawdziwe zdjęcia firmy.

Wszystkie obrazy leżą w `public/img/`. Wystarczy nadpisać plik o tej samej
nazwie — nazwy plików są używane w kodzie:

| Plik | Gdzie się pojawia | Zalecany rozmiar |
|---|---|---|
| `hero-poster.jpg` | tło sekcji powitalnej | 1920 × 1080 |
| `o-nas.jpg` | sekcja „O nas” (kadr pionowy) | 1000 × 1250 |
| `efekt-przed.jpg` | suwak „przed / po”, lewa strona | 1600 × 900 |
| `efekt-po.jpg` | suwak „przed / po”, prawa strona | 1600 × 900 |
| `og.jpg` | miniatura przy udostępnianiu w mediach społecznościowych | 1200 × 630 |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | ikony aplikacji i zakładki | jak w nazwie |

Żeby suwak „przed / po” działał przekonująco, oba zdjęcia (`efekt-przed`
i `efekt-po`) muszą przedstawiać **ten sam fragment tego samego dywanu**,
sfotografowany z tego samego miejsca.

Przed wgraniem warto przepuścić zdjęcia przez kompresor (np. squoosh.app)
i zejść poniżej 300 kB na plik — inaczej strona będzie się wolno wczytywać
na telefonach.

### Tło wideo

Sekcja powitalna sama sprawdza, czy na serwerze leży plik
`video/hero.mp4`. Jeżeli go wgrasz, nagranie płynnie pojawi się w tle;
jeżeli nie — tłem pozostaje zdjęcie `hero-poster.jpg`. Nie trzeba niczego
przebudowywać. Szczegóły i gotowe polecenie kompresji: `public/video/README.md`.

Osoby, które w ustawieniach systemu wyłączyły animacje
(*prefers-reduced-motion*), zawsze widzą samo zdjęcie.

---

## Formularz wyceny

Formularz wysyła zgłoszenie do skryptu `wyslij.php`, a ten przekazuje je
e-mailem funkcją `mail()` — działa to na praktycznie każdym hostingu
współdzielonym w Polsce, bez konfiguracji.

**Przed publikacją ustaw trzy wartości na początku pliku
`public/wyslij.php`:**

```php
const ODBIORCA = 'kontakt@pralnia-af.pl';    // tu przychodzą zgłoszenia
const NADAWCA  = 'formularz@pralnia-af.pl';  // musi być adres w Twojej domenie
const DOMENA   = 'pralnia-af.pl';
```

Adres w `NADAWCA` musi należeć do domeny strony — inaczej serwery pocztowe
uznają wiadomość za podszywanie się i wyrzucą ją do spamu.

Zabezpieczenia, które już działają:

- ukryte pole („pułapka na roboty”), którego człowiek nie widzi,
- jedno zgłoszenie na 30 sekund z jednego adresu IP,
- kontrola poprawności danych po stronie przeglądarki **i** serwera,
- czyszczenie znaków nowej linii, żeby formularza nie dało się użyć
  jako bramki do wysyłania spamu,
- obowiązkowa zgoda na przetwarzanie danych z odnośnikiem do polityki
  prywatności.

Jeżeli wysyłka się nie uda (np. hosting blokuje `mail()`), formularz nie
udaje sukcesu — pokazuje komunikat o błędzie razem z numerem telefonu.
Gdyby hosting nie miał PHP, usuń plik `wyslij.php`, a w `src/site.config.ts`
podmień `formEndpoint` na adres zewnętrznej usługi (np. Formspree).

**Po wdrożeniu koniecznie wyślij testowe zgłoszenie** i sprawdź, czy
wiadomość dotarła — warto zajrzeć też do folderu ze spamem.

---

## Struktura projektu

```
pralnia-af/
├── index.html              szkielet strony, znaczniki SEO i dane strukturalne
├── vite.config.ts          konfiguracja budowania
├── package.json            polecenia i lista bibliotek
├── public/                 pliki kopiowane na serwer bez zmian
│   ├── .htaccess           kompresja, pamięć podręczna, nagłówki bezpieczeństwa
│   ├── 404.html            strona błędu
│   ├── polityka-prywatnosci.html
│   ├── wyslij.php          obsługa formularza
│   ├── robots.txt, sitemap.xml, site.webmanifest, favicon.*
│   ├── img/                zdjęcia i ikony
│   └── video/              miejsce na tło wideo
├── src/
│   ├── site.config.ts      ⭐ dane firmy: telefon, e-mail, godziny, obszar
│   ├── data/               treść opinii i pytań (FAQ)
│   ├── components/         poszczególne sekcje strony
│   ├── hooks/              podświetlanie aktywnej sekcji w menu
│   ├── fonts/             krój Playfair Display (lokalnie, bez Google Fonts)
│   └── index.css           kolory marki i style bazowe
└── dist/                   ⭐ gotowe pliki do wgrania na serwer
```

---

## Co zmieniasz i gdzie

| Chcę zmienić… | Plik |
|---|---|
| numer telefonu, e-mail, godziny, obszar działania | `src/site.config.ts` |
| pozycje w menu | `src/site.config.ts` (tablica `nav`) |
| pytania i odpowiedzi | `src/data/faq.ts` **oraz** blok `FAQPage` w `index.html` |
| opinie klientów | `src/data/testimonials.ts` |
| listę usług | `src/components/Services.tsx` |
| zakresy w sekcji wyceny | `src/components/Pricing.tsx` |
| tekst o firmie | `src/components/About.tsx` |
| kolory marki | `src/index.css` (blok `@theme`) |
| tytuł i opis w Google | `index.html` (znaczniki `<title>` i `description`) |

---

## SEO, dostępność, wydajność

Co jest już zrobione:

- unikalny tytuł i opis, adres kanoniczny, komplet znaczników Open Graph
  wraz z obrazkiem do udostępniania,
- dane strukturalne `HomeAndConstructionBusiness` (godziny, obszar działania,
  telefon, zakres usług) oraz `FAQPage` — pytania mogą pojawić się
  bezpośrednio w wynikach wyszukiwania,
- znaczniki geograficzne i mapa witryny zgłoszona w `robots.txt`,
- dokładnie jeden nagłówek `<h1>` i uporządkowana hierarchia nagłówków,
- opisy alternatywne zdjęć, etykiety pól formularza, odnośnik „przejdź do
  treści”, widoczne obramowanie fokusa, obsługa suwaka „przed / po”
  klawiaturą (strzałki, Home, End),
- poszanowanie ustawienia „ogranicz animacje” w systemie,
- krój pisma i wszystkie skrypty serwowane z własnej domeny — brak zapytań
  do serwerów Google przy wczytywaniu (jedyny wyjątek to osadzona mapa,
  która ładuje się dopiero, gdy użytkownik do niej dojedzie),
- zdjęcia z atrybutami `width`/`height` oraz `loading="lazy"` — strona nie
  „skacze” podczas wczytywania.

Po wdrożeniu warto:

1. dodać stronę do [Google Search Console](https://search.google.com/search-console)
   i zgłosić `sitemap.xml`,
2. sprawdzić wynik w [PageSpeed Insights](https://pagespeed.web.dev/),
3. podpiąć wizytówkę Google Moja Firma — dla firmy usługowej działającej
   lokalnie to zwykle ważniejsze niż sama strona.
