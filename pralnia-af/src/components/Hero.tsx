import {useEffect, useRef, useState} from 'react';
import {ArrowRight, ShieldCheck, Sparkles, Truck} from 'lucide-react';
import {site} from '../site.config';

/**
 * Sekcja powitalna. Tłem jest zdjęcie `heroPoster`; jeżeli na serwerze
 * leży też plik wideo, nagranie wjeżdża płynnie dopiero po wczytaniu —
 * brak pliku nie psuje wyglądu strony.
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoExists, setVideoExists] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Sprawdzamy, czy nagranie w ogóle leży na serwerze. Dzięki temu brak pliku
  // nie zostawia po sobie błędu w konsoli przeglądarki.
  useEffect(() => {
    if (prefersReducedMotion) return;
    let anulowane = false;

    fetch(site.heroVideo, {method: 'HEAD'})
      .then((response) => {
        if (!anulowane && response.ok) setVideoExists(true);
      })
      .catch(() => {
        /* brak pliku — zostaje samo zdjęcie */
      });

    return () => {
      anulowane = true;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Gdy plik jest już w pamięci podręcznej, zdarzenie potrafi paść
    // przed podpięciem nasłuchu — stąd dodatkowe sprawdzenie stanu.
    if (video.readyState >= 3) setVideoReady(true);
  }, [videoExists]);

  return (
    <section
      id="start"
      className="relative min-h-screen bg-brand-400 text-white flex flex-col overflow-hidden">
      {/* Tło: zdjęcie zawsze, wideo warunkowo */}
      <div className="absolute inset-0 z-0">
        <img
          src={site.heroPoster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        {videoExists && !prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={site.heroPoster}
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}>
            <source src={site.heroVideo} type="video/mp4" />
          </video>
        )}
        {/* Przyciemnienie — bez niego biały tekst bywa nieczytelny na jasnym kadrze */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/70 via-brand-900/45 to-brand-900/75" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-12 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="w-full max-w-4xl">
          <p className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Pranie ekstrakcyjne z dojazdem — {site.area}
          </p>

          <h1 className="font-display text-[2.6rem] sm:text-6xl lg:text-[5.5rem] font-medium leading-[1.12] tracking-tight drop-shadow-lg text-balance">
            Krystaliczna czystość
            <br className="hidden sm:block" /> Twoich dywanów
            <br className="hidden sm:block" /> i tapicerek
          </h1>

          <div className="max-w-xl mt-8 lg:mt-10">
            <p className="text-white/90 text-lg lg:text-xl font-light leading-relaxed mb-8 drop-shadow">
              Profesjonalne pranie dywanów, wykładzin, tapicerki meblowej
              i samochodowej. Przywracamy fabryczną świeżość i usuwamy
              najtrudniejsze zabrudzenia — u Ciebie w domu lub w firmie.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <a
                href="#wycena-formularz"
                className="inline-flex items-center justify-center gap-4 bg-white text-brand-600 hover:bg-brand-50 transition rounded-full pl-6 pr-2 py-2 text-lg font-medium group shadow-lg">
                Darmowa wycena
                <span className="bg-brand-600 text-white p-2.5 rounded-full group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
                </span>
              </a>

              <a
                href={site.phone.href}
                className="inline-flex items-center justify-center gap-3 border border-white/40 hover:bg-white/10 transition rounded-full px-6 py-3.5 text-lg font-medium backdrop-blur-sm">
                Zadzwoń: {site.phone.display}
              </a>
            </div>
          </div>

          {/* Wyróżniki */}
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12 text-sm lg:text-base text-white/90">
            <li className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-brand-200" aria-hidden="true" />
              Darmowy dojazd do klienta
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-200" aria-hidden="true" />
              Środki bezpieczne dla dzieci i zwierząt
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-brand-200" aria-hidden="true" />
              <span>
                <strong className="font-semibold">{site.stats.clients}</strong>{' '}
                zadowolonych klientów
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
