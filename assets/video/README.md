# Wideo do sekcji hero

Wgraj tutaj pliki nagrania tła:

- `hero.webm` — format podstawowy
- `hero.mp4` — zapas dla Safari i starszych przeglądarek

Polecenia do przycięcia i przekodowania (docelowo **8–15 s, poniżej 3 MB**)
znajdziesz w głównym `README.md`, sekcja „Wideo w sekcji hero".

Do czasu wgrania plików strona wyświetla plakat `assets/img/hero-poster.jpg`,
czyli tło wyglądające jak dotychczasowy gradient. Nic się nie psuje —
`npm run build` tylko o tym przypomina ostrzeżeniem.

Nie chcesz wideo? Ustaw `heroVideo.enabled = false`
w `build/content/site.mjs` i uruchom `npm run build`.
