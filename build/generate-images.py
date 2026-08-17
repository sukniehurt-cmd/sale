#!/usr/bin/env python3
# =============================================================================
# Generator grafik rastrowych — Tatry Marketing
# -----------------------------------------------------------------------------
# Tworzy pliki, których nie da się zastąpić SVG:
#   * favicon.ico + ikony PNG (część systemów nie obsługuje favicon SVG),
#   * apple-touch-icon.png (iOS ignoruje SVG),
#   * ikony PWA 192/512 + wariant maskable,
#   * obraz Open Graph 1200x630 (Facebook i LinkedIn nie renderują SVG
#     w podglądzie linku — bez PNG udostępniony link jest bez grafiki).
#
# Uruchomienie:  python3 build/generate-images.py
# Wymaga:        Pillow  (pip install pillow)
#
# Skrypt uruchamia się rzadko — wynikowe pliki są w repozytorium, więc
# zwykły build (node build/build.mjs) go nie potrzebuje.
# =============================================================================

import os
import sys

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Brak biblioteki Pillow. Zainstaluj: pip install pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "assets", "img")
FONTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
os.makedirs(IMG, exist_ok=True)

# --- Paleta (zgodna z tokenami w assets/css/style.css) ------------------------
NAVY_950 = (7, 23, 38)
NAVY_900 = (11, 31, 51)
NAVY_800 = (15, 42, 68)
NAVY_700 = (22, 57, 91)
PINE_600 = (46, 125, 91)
PINE_500 = (59, 155, 114)
AMBER_500 = (224, 164, 88)
WHITE = (255, 255, 255)


# Kroje zmienne (variable) pobrane z repozytorium google/fonts.
# Świadomie NIE używamy plików z API fonts.googleapis.com — tamte są
# podzbiorem „latin" i nie zawierają polskich znaków diakrytycznych,
# przez co ą, ć, ę, ł, ń, ś, ź, ż renderują się jako puste prostokąty.
FONT_FILES = {
    "sora": "sora-var.ttf",     # osie: wght 100–800
    "inter": "inter-var.ttf",   # osie: opsz 14–32, wght 100–900
}


def font(family, size, weight=400, optical=None):
    """
    Wczytuje krój zmienny i ustawia oś wagi.
    Gdy pliku brak — wraca do DejaVu Sans, który również ma polskie znaki.
    """
    path = os.path.join(FONTS, FONT_FILES.get(family, ""))
    if os.path.exists(path):
        f = ImageFont.truetype(path, size)
        # Kolejność osi różni się między krojami — Inter ma najpierw opsz.
        if family == "inter":
            f.set_variation_by_axes([optical or min(max(size, 14), 32), weight])
        else:
            f.set_variation_by_axes([weight])
        return f

    fallback = (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if weight >= 600
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    )
    if os.path.exists(fallback):
        return ImageFont.truetype(fallback, size)
    return ImageFont.load_default()


# =============================================================================
# Znak marki
# =============================================================================
def draw_mark(size, padding_ratio=0.0, radius_ratio=0.23):
    """
    Rysuje logo jako kwadratowy obraz RGBA.
    padding_ratio > 0 zostawia margines bezpieczeństwa — potrzebny w ikonach
    maskable, które Android przycina do dowolnego kształtu.
    """
    scale = 4  # rysujemy w powiększeniu i zmniejszamy — tańszy antyaliasing
    s = size * scale
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    pad = int(s * padding_ratio)
    box = s - 2 * pad
    d.rounded_rectangle(
        [pad, pad, pad + box, pad + box],
        radius=int(box * radius_ratio),
        fill=NAVY_800,
    )

    def pt(x, y):
        """Współrzędne z siatki 48x48 (jak w favicon.svg) na piksele."""
        return (pad + x / 48 * box, pad + y / 48 * box)

    # Główny masyw
    d.polygon([pt(9, 34.5), pt(19, 17), pt(24.4, 26.4), pt(28.8, 19), pt(39, 34.5)], fill=PINE_500)
    # Zbocze zacienione
    d.polygon([pt(19, 17), pt(24.4, 26.4), pt(21.3, 31.8), pt(15.9, 26)], fill=PINE_600)
    # Zbocze oświetlone
    d.polygon([pt(28.8, 19), pt(33, 26.2), pt(29.4, 28.4), pt(26.5, 23.4)], fill=AMBER_500)
    # Słońce
    cx, cy = pt(35.5, 13.5)
    r = 3.4 / 48 * box
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=AMBER_500)

    return img.resize((size, size), Image.LANCZOS)


# =============================================================================
# Tło z gradientem i sylwetką gór
# =============================================================================
def gradient_background(w, h):
    """Pionowy gradient granatowy — ten sam kierunek co w sekcji hero."""
    img = Image.new("RGB", (w, h), NAVY_900)
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(h - 1, 1)
        d.line(
            [(0, y), (w, y)],
            fill=(
                int(NAVY_900[0] + (NAVY_700[0] - NAVY_900[0]) * t),
                int(NAVY_900[1] + (NAVY_700[1] - NAVY_900[1]) * t),
                int(NAVY_900[2] + (NAVY_700[2] - NAVY_900[2]) * t),
            ),
        )
    return img


def draw_ranges(img):
    """Dwie warstwy grani u dołu — ta sama sylwetka co w hero na stronie."""
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    far = [(0, h), (0, h * 0.74), (w * 0.10, h * 0.60), (w * 0.20, h * 0.70),
           (w * 0.31, h * 0.52), (w * 0.42, h * 0.68), (w * 0.55, h * 0.46),
           (w * 0.68, h * 0.66), (w * 0.80, h * 0.55), (w * 0.91, h * 0.70),
           (w, h * 0.62), (w, h)]
    d.polygon(far, fill=NAVY_950 + (140,))

    near = [(0, h), (0, h * 0.88), (w * 0.13, h * 0.72), (w * 0.26, h * 0.84),
            (w * 0.38, h * 0.66), (w * 0.52, h * 0.86), (w * 0.64, h * 0.70),
            (w * 0.78, h * 0.88), (w * 0.90, h * 0.76), (w, h * 0.84), (w, h)]
    d.polygon(near, fill=NAVY_950 + (230,))

    img.paste(Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB"), (0, 0))
    return img


# =============================================================================
# Łamanie tekstu
# =============================================================================
def wrap(draw, text, fnt, max_width):
    words, lines, line = text.split(), [], ""
    for word in words:
        probe = f"{line} {word}".strip()
        if draw.textlength(probe, font=fnt) <= max_width:
            line = probe
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


# =============================================================================
# Obraz Open Graph 1200x630
# =============================================================================
def build_og(filename, headline, kicker, footer_text):
    W, H = 1200, 630
    img = draw_ranges(gradient_background(W, H))
    d = ImageDraw.Draw(img)

    f_kicker = font("inter", 26, weight=600)
    f_head = font("sora", 62, weight=800)
    f_foot = font("inter", 27, weight=400)

    M = 80  # margines bezpieczeństwa — miniatury bywają przycinane

    # --- Logo i nazwa marki ---
    mark = draw_mark(74)
    img.paste(mark, (M, 62), mark)
    d.text((M + 92, 70), "Tatry Marketing", font=font("sora", 32, weight=800), fill=WHITE)
    d.text((M + 93, 108), "AGENCJA SEO I STRON WWW",
           font=font("inter", 17, weight=600), fill=AMBER_500)

    # --- Nadtytuł z akcentem ---
    y = 232
    d.rectangle([M, y + 9, M + 34, y + 13], fill=AMBER_500)
    d.text((M + 50, y), kicker.upper(), font=f_kicker, fill=PINE_500)

    # --- Nagłówek ---
    y += 58
    for line in wrap(d, headline, f_head, W - 2 * M - 40):
        d.text((M, y), line, font=f_head, fill=WHITE)
        y += 76

    # --- Stopka ---
    d.line([(M, H - 108), (W - M, H - 108)], fill=(255, 255, 255, 40), width=1)
    d.text((M, H - 82), footer_text, font=f_foot, fill=(168, 186, 202))

    img.save(os.path.join(IMG, filename), "PNG", optimize=True)
    print(f"  ✓ {filename}  ({W}x{H})")


# =============================================================================
# Uruchomienie
# =============================================================================
def main():
    print("\n  Generowanie grafik\n")

    # --- Ikony ---
    for size, name in [
        (180, "apple-touch-icon.png"),
        (192, "icon-192.png"),
        (512, "icon-512.png"),
    ]:
        draw_mark(size).save(os.path.join(IMG, name), "PNG", optimize=True)
        print(f"  ✓ {name}  ({size}x{size})")

    # Wariant maskable: Android przycina ikonę do dowolnego kształtu,
    # więc znak musi mieścić się w bezpiecznym okręgu — stąd margines
    # i pełne tło zamiast zaokrąglonego kwadratu.
    maskable = Image.new("RGB", (512, 512), NAVY_800)
    inner = draw_mark(512, padding_ratio=0.18, radius_ratio=0.0)
    maskable.paste(inner, (0, 0), inner)
    maskable.save(os.path.join(IMG, "icon-maskable-512.png"), "PNG", optimize=True)
    print("  ✓ icon-maskable-512.png  (512x512)")

    # --- favicon.ico: kilka rozmiarów w jednym pliku, dla starszych przeglądarek
    ico = draw_mark(64)
    ico.save(
        os.path.join(ROOT, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    )
    print("  ✓ favicon.ico  (16/32/48/64)")

    # --- Obrazy Open Graph ---
    build_og(
        "og-default.png",
        "Twoi klienci szukają Cię w Google. Znajdują konkurencję.",
        "Podhale",
        "tatrymarketing.pl  ·  Pozycjonowanie, strony WWW, Google Ads",
    )
    build_og(
        "og-blog.png",
        "Poradniki SEO dla firm z Podhala",
        "Baza wiedzy",
        "tatrymarketing.pl/blog  ·  Praktyczne wskazówki bez ogólników",
    )

    print("\n  Gotowe.\n")


if __name__ == "__main__":
    main()
