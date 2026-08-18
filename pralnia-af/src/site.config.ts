/**
 * Jedno miejsce na wszystkie dane firmy.
 * Zmiana czegokolwiek tutaj przebudowuje całą stronę (npm run build).
 *
 * UWAGA: adres domeny, NIP i adres siedziby trzeba podmienić przed publikacją —
 * te same wartości występują też w plikach index.html, public/sitemap.xml,
 * public/robots.txt oraz public/polityka-prywatnosci.html.
 */
export const site = {
  name: 'Pralnia AF',
  brandFirst: 'AF',
  brandSecond: 'CLEANING',
  url: 'https://pralnia-af.pl',
  tagline: 'Pranie dywanów i tapicerki — Zakopane i całe Podhale',

  phone: {
    display: '536 212 505',
    href: 'tel:+48536212505',
  },
  email: 'kontakt@pralnia-af.pl',

  area: 'Zakopane, Nowy Targ, Kościelisko i okolice',
  areaList: [
    'Zakopane',
    'Nowy Targ',
    'Kościelisko',
    'Poronin',
    'Biały Dunajec',
    'Bukowina Tatrzańska',
    'Szaflary',
    'Nowe Bystre',
  ],

  hours: [
    { days: 'Poniedziałek – Sobota', time: '08:00 – 21:30' },
    { days: 'Niedziela', time: '09:00 – 18:00' },
  ],

  stats: {
    clients: '600+',
    years: '10+',
  },

  /** Mapa Google osadzana w sekcji kontaktu. */
  mapEmbed:
    'https://www.google.com/maps?q=Zakopane,+Polska&hl=pl&z=10&output=embed',

  /**
   * Tło wideo sekcji hero. Plik wgrywasz do katalogu `public/video/`.
   * Dopóki go nie ma, tłem pozostaje zdjęcie `img/hero-poster.jpg` —
   * strona działa poprawnie w obu przypadkach.
   */
  heroVideo: 'video/hero.mp4',
  heroPoster: 'img/hero-poster.jpg',

  /** Adres skryptu obsługującego formularz (PHP na hostingu). */
  formEndpoint: 'wyslij.php',
} as const;

export const nav = [
  { href: '#start', label: 'Strona główna' },
  { href: '#o-nas', label: 'O nas' },
  { href: '#uslugi', label: 'Usługi' },
  { href: '#efekty', label: 'Efekty' },
  { href: '#cennik', label: 'Wycena' },
  { href: '#kontakt', label: 'Kontakt' },
] as const;
