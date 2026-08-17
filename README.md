# Tatry Marketing — strona agencji SEO

Serwis agencji SEO i tworzenia stron internetowych działającej na terenie Podhala.
Statyczny HTML generowany z szablonów — bez bazy danych, bez zewnętrznych
zależności w warstwie wykonawczej i bez żadnego zapytania do serwera trzeciego
podczas wczytywania strony.

---

## Spis treści

1. [Szybki start](#szybki-start)
2. [Co trzeba uzupełnić przed publikacją](#co-trzeba-uzupełnić-przed-publikacją)
3. [Struktura projektu](#struktura-projektu)
4. [Jak dodać treść](#jak-dodać-treść)
5. [Co zostało zrobione pod SEO](#co-zostało-zrobione-pod-seo)
6. [Dostępność](#dostępność)
7. [Wydajność](#wydajność)
8. [Formularz kontaktowy](#formularz-kontaktowy)
9. [Publikacja](#publikacja)
10. [Po wdrożeniu](#po-wdrożeniu)

---

## Szybki start

Potrzebny wyłącznie Node.js w wersji 18 lub nowszej. Żadnych pakietów z npm.

```bash
npm run build     # generuje wszystkie pliki HTML + sitemap.xml + robots.txt
npm run serve     # podgląd na http://localhost:4173
npm run dev       # jedno i drugie naraz
```

`npm run build` przy każdym uruchomieniu sprawdza serwis pod kątem SEO i kończy
się kodem błędu, gdy coś jest nie tak. Kontrolowane są między innymi: długość
tytułów i opisów, obecność canonicala, dokładnie jeden `<h1>` na stronie,
poprawność składni JSON-LD, brakujące atrybuty `alt`, duplikaty tytułów oraz
linki wewnętrzne prowadzące donikąd.

Ponowne wygenerowanie grafik (ikony, favicon, obrazy Open Graph) wymaga Pythona
z biblioteką Pillow i uruchamia się osobno — pliki wynikowe są w repozytorium,
więc zwykły build ich nie potrzebuje:

```bash
pip install pillow
npm run images
```

---

## Co trzeba uzupełnić przed publikacją

To jest najważniejsza sekcja tego pliku. Serwis jest gotowy technicznie,
ale zawiera dane przykładowe. **Wszystkie znajdują się w jednym pliku:**
[`build/content/site.mjs`](build/content/site.mjs) — są w nim oznaczone
komentarzem `DO_UZUPELNIENIA`.

### Krytyczne — bez tego nie publikuj

| Co | Gdzie | Dlaczego to ważne |
|---|---|---|
| Adres domeny (`url`) | `site.mjs` | Trafia do canonical, Open Graph i sitemap. Zły adres = błędy indeksowania |
| Telefon, e-mail, adres | `site.mjs` | Spójność NAP to jeden z najsilniejszych czynników SEO lokalnego |
| Nazwa firmy, NIP, REGON | `site.mjs` | Wymóg prawny w stopce i polityce prywatności |
| Współrzędne siedziby (`geo`) | `site.mjs` | Trafiają do danych strukturalnych; obecne wskazują centrum Zakopanego |
| Obsługa formularza | `build/content/pages.mjs` | Bez tego formularz nie wysyła zgłoszeń — patrz [Formularz kontaktowy](#formularz-kontaktowy) |

### Ważne — uzupełnij przed kampanią

| Co | Gdzie |
|---|---|
| Prawdziwe opinie klientów (obecne są przykładowe) | `build/content/home.mjs`, `build/content/pages.mjs` |
| Prawdziwe realizacje i wyniki | `build/content/pages.mjs`, sekcja `cases` |
| Imiona i zdjęcia zespołu | `build/content/pages.mjs`, strona „O nas” |
| Profile społecznościowe | `site.mjs`, pole `social` |
| Adres wizytówki Google | `site.mjs`, pole `googleBusinessProfile` |
| Weryfikacja polityki prywatności | `build/content/pages.mjs` |

### Dwie rzeczy, których świadomie NIE zrobiono

**Brak znacznika `AggregateRating` / `Review`.** Ocen w danych strukturalnych
nie wolno wystawiać na podstawie opinii przykładowych — to najczęstsza przyczyna
ręcznych kar Google za dane strukturalne. Gdy zbierzesz prawdziwe opinie
i umieścisz je na stronie, znacznik można dodać w
[`build/lib/schema.mjs`](build/lib/schema.mjs) (jest tam komentarz w miejscu,
gdzie ma trafić).

**Brak Google Analytics i baneru cookie.** Strona nie ustawia żadnych plików
cookie i nie wysyła danych odwiedzających nigdzie — dlatego baner zgody nie jest
potrzebny, a polityka prywatności może być krótka i prawdziwa. Po dodaniu
Analytics trzeba dodać baner zgody, zaktualizować politykę prywatności
i rozszerzyć nagłówek `Content-Security-Policy` w `.htaccess`.

---

## Struktura projektu

```
.
├── build/                     ← kod źródłowy (nie trafia na serwer)
│   ├── build.mjs              generator + walidacja SEO
│   ├── serve.mjs              serwer podglądu
│   ├── generate-images.py     generator ikon i obrazów OG
│   ├── fonts/                 kroje TTF do generowania grafik
│   ├── lib/
│   │   ├── layout.mjs         wspólny <head>, nagłówek, stopka
│   │   ├── components.mjs     powtarzalne bloki treści
│   │   ├── schema.mjs         dane strukturalne JSON-LD
│   │   └── icons.mjs          ikony jako inline SVG
│   └── content/
│       ├── site.mjs           ◀ DANE FIRMY — TU EDYTUJESZ
│       ├── home.mjs           strona główna
│       ├── services.mjs       usługi (5 podstron)
│       ├── local.mjs          podstrony lokalne (4 miasta)
│       ├── blog.mjs           ◀ TREŚĆ WPISÓW BLOGOWYCH
│       ├── blog-pages.mjs     szablony stron bloga
│       └── pages.mjs          realizacje, cennik, o nas, kontakt, FAQ…
│
├── assets/                    ← zasoby (trafiają na serwer)
│   ├── css/style.css          arkusz główny
│   ├── css/fonts.css          deklaracje @font-face
│   ├── fonts/                 Inter + Sora (self-hosted, 176 kB)
│   ├── js/main.js             menu, formularz — strona działa bez tego pliku
│   └── img/                   logo, favicon, obrazy Open Graph
│
└── (pliki generowane — nie edytuj ręcznie)
    index.html, uslugi/, pozycjonowanie/, blog/, realizacje/, cennik/,
    o-nas/, kontakt/, faq/, polityka-prywatnosci/, 404.html,
    sitemap.xml, robots.txt, site.webmanifest, .htaccess
```

**Nie edytuj wygenerowanych plików HTML.** Zmiany zostaną nadpisane przy
następnym `npm run build`. Edytuj pliki w `build/content/`.

### Dlaczego generator, skoro wynikiem jest zwykły HTML

Nagłówek, stopka i sekcja `<head>` istnieją w jednym miejscu. Przy dwudziestu
jeden podstronach klejonych ręcznie prędzej czy później któraś zostaje bez
canonicala albo ze starym menu w stopce — i są to dokładnie te błędy, które
kosztują widoczność, a wykrywa się je pół roku później. Wynik jest zwykłym
statycznym HTML-em, więc hostować go można gdziekolwiek.

---

## Jak dodać treść

### Nowy wpis na blogu

Dopisz obiekt do tablicy `posts` w [`build/content/blog.mjs`](build/content/blog.mjs)
i uruchom `npm run build`. Strona wpisu, kafelek na liście bloga, wpis
w `sitemap.xml` i dane strukturalne `BlogPosting` wygenerują się same.

### Nowa miejscowość

Dopisz wpis do tablicy `areas` w `site.mjs`. Ustawienie `page: false` dodaje
miejscowość do listy obszaru działania — i **w większości przypadków to
wystarczy**.

> **Ostrzeżenie.** Nie twórz osobnej podstrony dla każdej wsi. Dwadzieścia
> bliźniaczych stron różniących się wyłącznie nazwą miejscowości to _doorway
> pages_ — Google nazywa je wprost w wytycznych i traktuje jako spam, a karze
> spadkiem widoczności całej domeny, nie tylko tych stron. Podstronę lokalną
> (`page: true` + wpis w `build/content/local.mjs`) rób tylko wtedy, gdy masz
> o danym rynku coś odrębnego do powiedzenia: inne branże, inną sezonowość,
> inny poziom konkurencji. Cztery istniejące podstrony są napisane właśnie
> w ten sposób i mogą posłużyć za wzór.

### Nowa usługa

Dopisz obiekt do `services` w `site.mjs` (pojawi się w menu, stopce i na
kartach), a treść podstrony dodaj w `build/content/services.mjs`.

---

## Co zostało zrobione pod SEO

### Warstwa techniczna

- Unikalne `<title>` (≤ 60 znaków) i `meta description` (≤ 160) na każdej podstronie — pilnowane przez walidator
- `<link rel="canonical">` z pełnym adresem bezwzględnym
- Adresy przyjazne, z ukośnikiem na końcu, bez rozszerzenia `.html`
- Semantyczny HTML5, dokładnie jeden `<h1>` na stronę, poprawna hierarchia nagłówków
- `sitemap.xml` z priorytetami i datami modyfikacji, `robots.txt`
- Wymuszenie HTTPS, przekierowanie z `www`, jednolity ukośnik na końcu (`.htaccess`)
- Strona 404 z `noindex` i prawidłowym kodem odpowiedzi HTTP
- Znaczniki geolokalizacyjne (`geo.region`, `geo.position`, `ICBM`)

### Dane strukturalne (JSON-LD)

Wszystkie encje w jednym grafie `@graph`, powiązane przez `@id` — rozproszone
bloki Google traktuje jako osobne, niepewne byty.

| Typ | Gdzie |
|---|---|
| `ProfessionalService` + `Organization` | każda strona (adres, geo, godziny, obszar obsługi) |
| `WebSite` | każda strona |
| `WebPage` | każda strona |
| `BreadcrumbList` | każda podstrona |
| `Service` | podstrony usług i lokalne |
| `FAQPage` | strona główna, usługi, cennik, FAQ, strony lokalne |
| `BlogPosting` | wpisy blogowe |

Poprawność składni JSON-LD jest sprawdzana przy każdym buildzie. Znaczniki FAQ
generują się z tej samej tablicy, z której renderowana jest widoczna sekcja
pytań — nie da się ich rozjechać, co jest wymogiem Google.

### Treść i struktura

- 21 podstron, każda pod inną intencję wyszukiwania — jedna intencja = jeden adres URL
- Cztery podstrony lokalne opisujące realnie różne rynki (Zakopane, Nowy Targ, Rabka-Zdrój, Nowy Sącz)
- Trzy poradniki blogowe budujące ruch z fraz informacyjnych
- Świadome linkowanie wewnętrzne: usługi ↔ strony lokalne ↔ blog ↔ cennik
- Open Graph i Twitter Card z prawdziwymi obrazami PNG 1200×630

### Social media

Obrazy podglądu są generowane jako PNG, bo Facebook i LinkedIn nie renderują
SVG — bez tego udostępniony link byłby bez grafiki.

---

## Dostępność

Zweryfikowane automatycznie (axe-core, zestawy WCAG 2.0/2.1/2.2 poziom AA
+ best-practice) na wszystkich 13 kluczowych podstronach: **0 naruszeń**.

- Kontrast tekstu spełnia próg AA (4,5:1) — kilka kolorów zostało w tym celu przyciemnionych, komentarze w `style.css` opisują które i dlaczego
- Link „Przejdź do treści” jako pierwszy element w kolejności tabulacji
- Widoczny wskaźnik fokusu na wszystkich elementach interaktywnych
- Cele dotykowe minimum 44 × 44 px (przyciski) i 24 × 24 px (elementy pomocnicze)
- Pełna obsługa klawiaturą, `Escape` zamyka menu i podmenu
- Poprawne `aria-current`, `aria-expanded`, `aria-label`, etykiety formularza
- Obsługa `prefers-reduced-motion` i `prefers-contrast`
- Sekcja FAQ oparta na `<details>` — działa bez JavaScriptu

**Strona jest w pełni czytelna i nawigowalna z wyłączonym JavaScriptem.**
Skrypt dokłada wyłącznie wygodę (menu mobilne, walidacja formularza), nigdy
treść — dzięki temu robot Google widzi dokładnie to samo co użytkownik.

---

## Wydajność

- **Zero zapytań do zewnętrznych serwerów** — fonty serwowane z własnej domeny
- Fonty zmienne (variable), tylko podzbiory `latin` + `latin-ext`: **176 kB** zamiast 652 kB
- `preload` wyłącznie dla podzbioru renderującego pierwszy widoczny tekst
- Brak bibliotek JavaScript — cały skrypt to około 5 kB, ładowany z `defer`
- Ikony jako inline SVG zamiast biblioteki ikon (oszczędność 50–200 kB)
- Jeden arkusz CSS, brak zasobów blokujących renderowanie poza nim
- Nagłówki cache i kompresja skonfigurowane w `.htaccess`

Self-hosting fontów ma też drugi skutek: adresy IP odwiedzających nie trafiają
do Google, co upraszcza obowiązki wynikające z RODO.

---

## Formularz kontaktowy

Strona jest statyczna, więc formularz wymaga zewnętrznej obsługi. W pliku
`build/content/pages.mjs` znajdź `action="#"` w formularzu na stronie kontaktu
i podstaw jedno z poniższych:

| Usługa | Uwagi |
|---|---|
| [Formspree](https://formspree.io) | Najprostsze wdrożenie, plan darmowy do 50 zgłoszeń/mies. |
| [Basin](https://usebasin.com) | Serwery w UE — istotne przy RODO |
| [Web3Forms](https://web3forms.com) | Darmowe, bez zakładania konta |
| Własny skrypt PHP | Na hostingu z PHP; pełna kontrola nad danymi |

Formularz ma już wbudowaną pułapkę na boty (ukryte pole `_firma_www`) —
większość usług potrafi ją obsłużyć bez dodatkowej konfiguracji, co pozwala
uniknąć reCAPTCHA (a ta z kolei ustawia cookies Google i wymagałaby baneru zgody).

**Do czasu podpięcia obsługi telefon i e-mail są jedynym działającym kanałem
kontaktu.**

---

## Publikacja

### Hosting współdzielony (Apache — większość polskich hostingów)

Wgraj przez FTP zawartość katalogu głównego **z wyjątkiem** `build/`
i `node_modules/`. Plik `.htaccess` zadziała automatycznie.

### GitHub Pages

Ustaw w ustawieniach repozytorium: *Pages → Deploy from a branch → gałąź →
katalog `/ (root)`*. Uwaga: `.htaccess` nie działa na GitHub Pages —
przekierowania i nagłówki trzeba wtedy pominąć albo przenieść na Cloudflare.

### Netlify / Vercel

Wskaż katalog główny jako publiczny, bez polecenia budującego (pliki HTML są
już w repozytorium) albo z poleceniem `npm run build`. Odpowiedniki reguł
z `.htaccess` wpisz do `netlify.toml` lub `vercel.json`.

### Przed przełączeniem domeny

Jeśli zastępujesz istniejącą stronę, **przygotuj mapę przekierowań 301
ze starych adresów na nowe**. Wdrożenie bez przekierowań to najszybszy sposób
na utratę pozycji budowanych latami — spadki ruchu o 60–70% są typowe,
a odbudowa zajmuje miesiące.

---

## Po wdrożeniu

1. **Google Search Console** — dodaj usługę, potwierdź własność, zgłoś `sitemap.xml`
2. **Wizytówka Google** — załóż albo przejmij; przy działalności lokalnej daje efekty najszybciej ze wszystkiego
3. **Test wyników z elementami rozszerzonymi** — sprawdź dane strukturalne: <https://search.google.com/test/rich-results>
4. **PageSpeed Insights** — zmierz Core Web Vitals na wersji produkcyjnej: <https://pagespeed.web.dev>
5. **Podmień dane przykładowe** — opinie, realizacje, zespół (patrz [sekcja wyżej](#co-trzeba-uzupełnić-przed-publikacją))
6. **Zaplanuj treści** — nowa strona to fundament, nie gotowy wynik; pozycje na konkurencyjne frazy buduje systematyczna praca przez kolejne miesiące

---

## Licencje

Kroje pisma **Inter** i **Sora** — SIL Open Font License 1.1 (użycie komercyjne
i self-hosting dozwolone). Kod i treść serwisu należą do właściciela projektu.
