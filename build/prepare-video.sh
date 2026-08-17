#!/usr/bin/env bash
# =============================================================================
# Przygotowanie nagrania do sekcji hero
# -----------------------------------------------------------------------------
# Zamienia dowolny plik wideo na komplet potrzebny stronie:
#   assets/video/hero.webm     — format podstawowy
#   assets/video/hero.mp4      — zapas dla Safari i starszych przeglądarek
#   assets/img/hero-poster.jpg — plakat (klatka widoczna zanim ruszy wideo)
#
# Użycie:
#   ./build/prepare-video.sh nagranie.mp4              # pierwsze 10 s
#   ./build/prepare-video.sh nagranie.mp4 12           # od 12. sekundy
#   ./build/prepare-video.sh nagranie.mp4 12 8         # od 12. sekundy, 8 s
#
# Wymaga ffmpeg:
#   Ubuntu/Debian: sudo apt install ffmpeg
#   macOS:         brew install ffmpeg
#   Windows:       https://ffmpeg.org/download.html (albo WSL)
# =============================================================================

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

WEJSCIE="${1:-}"
START="${2:-0}"
CZAS="${3:-10}"

if [[ -z "$WEJSCIE" ]]; then
  echo "Użycie: $0 <plik-wideo> [sekunda-startu] [długość-w-sekundach]"
  echo "Przykład: $0 ~/Pobrane/drony-tatry.mp4 12 8"
  exit 1
fi

if [[ ! -f "$WEJSCIE" ]]; then
  echo "Nie znaleziono pliku: $WEJSCIE"
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Brak ffmpeg. Zainstaluj: sudo apt install ffmpeg  (albo: brew install ffmpeg)"
  exit 1
fi

mkdir -p "$ROOT/assets/video" "$ROOT/assets/img"

echo
echo "  Przygotowanie nagrania do sekcji hero"
echo "  źródło: $WEJSCIE"
echo "  wycinek: od ${START}s, długość ${CZAS}s"
echo

# Wspólne ustawienia obrazu:
#   scale=1920:-2  — szerokość 1920 px, wysokość dobrana automatycznie do
#                    liczby parzystej (kodery tego wymagają)
#   fps=25         — 25 klatek wystarczy dla tła; więcej to tylko większy plik
FILTR="scale=1920:-2,fps=25"

# --- WebM (VP9) --------------------------------------------------------------
# Format podstawowy: przy tej samej jakości waży wyraźnie mniej niż MP4.
# -an usuwa dźwięk — tło jest wyciszone, więc ścieżka audio to czysty balast.
echo "  [1/3] WebM…"
ffmpeg -hide_banner -loglevel error -y \
  -ss "$START" -i "$WEJSCIE" -t "$CZAS" \
  -an -c:v libvpx-vp9 -crf 40 -b:v 0 -row-mt 1 \
  -vf "$FILTR" \
  "$ROOT/assets/video/hero.webm"

# --- MP4 (H.264) -------------------------------------------------------------
# Zapas dla Safari i starszych przeglądarek.
# -movflags +faststart przenosi metadane na początek pliku, dzięki czemu
# odtwarzanie startuje przed pobraniem całości.
echo "  [2/3] MP4…"
ffmpeg -hide_banner -loglevel error -y \
  -ss "$START" -i "$WEJSCIE" -t "$CZAS" \
  -an -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p \
  -movflags +faststart \
  -vf "$FILTR" \
  "$ROOT/assets/video/hero.mp4"

# --- Plakat ------------------------------------------------------------------
# Pierwsza klatka wycinka. To ona jest widoczna na telefonach, przy włączonym
# trybie ograniczonych animacji i zanim wideo zdąży się wczytać — więc powinna
# pochodzić z tego samego ujęcia, żeby przejście było niewidoczne.
echo "  [3/3] Plakat…"
ffmpeg -hide_banner -loglevel error -y \
  -ss "$START" -i "$WEJSCIE" -frames:v 1 -q:v 3 \
  -vf "scale=1600:-2" \
  "$ROOT/assets/img/hero-poster.jpg"

echo
echo "  Gotowe:"
for f in assets/video/hero.webm assets/video/hero.mp4 assets/img/hero-poster.jpg; do
  rozmiar=$(du -h "$ROOT/$f" | cut -f1)
  printf "    %-32s %s\n" "$f" "$rozmiar"
done

# Ostrzeżenie o wadze: tło jest przyciemnione i rozmyte ruchem, więc mocna
# kompresja jest niewidoczna — a ciężki plik zjada zysk z reszty optymalizacji.
WAGA_KB=$(du -k "$ROOT/assets/video/hero.webm" | cut -f1)
if (( WAGA_KB > 3072 )); then
  echo
  echo "  UWAGA: hero.webm przekracza 3 MB."
  echo "  Skróć wycinek albo podnieś kompresję — zmień -crf 40 na wyższą wartość"
  echo "  (np. 45) w tym skrypcie. Tło jest przyciemnione, więc różnicy nie widać."
fi

echo
echo "  Następny krok:  npm run build"
echo
