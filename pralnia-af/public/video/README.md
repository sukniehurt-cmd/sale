# Tło wideo sekcji powitalnej

Wgraj tutaj plik `hero.mp4`, a nagranie automatycznie pojawi się jako tło
sekcji powitalnej — bez przebudowywania strony.

Zalecane parametry:

- format: MP4 (kodek H.264 + AAC lub bez ścieżki dźwiękowej),
- rozdzielczość: 1920 × 1080,
- długość: 8–15 sekund (materiał jest zapętlany),
- waga: **poniżej 3 MB** — cięższy plik zauważalnie spowalnia wczytywanie
  strony na telefonach.

Przykładowe przygotowanie pliku programem ffmpeg:

```bash
ffmpeg -i nagranie-zrodlowe.mov -t 12 -an \
  -vf "scale=1920:-2" -c:v libx264 -crf 30 -preset slow \
  -movflags +faststart hero.mp4
```

Dopóki pliku nie ma, tłem pozostaje zdjęcie `img/hero-poster.jpg` —
strona wygląda i działa poprawnie w obu wariantach.
