import {useEffect, useRef, useState} from 'react';
import {Droplets, Menu, Phone, X} from 'lucide-react';
import {nav, site} from '../site.config';
import {useActiveSection} from '../hooks/useActiveSection';

/** Stała lista sekcji — dzięki temu obserwator nie jest tworzony na nowo. */
const SECTION_IDS = nav.map((item) => item.href.slice(1));

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(SECTION_IDS);

  // Nagłówek przykleja się do góry dopiero po zjechaniu poza sekcję hero.
  useEffect(() => {
    const onScroll = () => setIsStuck(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobilne: Escape zamyka, kliknięcie poza panelem zamyka,
  // a tło strony nie przewija się pod otwartym menu.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener('keydown', onKey);
    // Nasłuch dodajemy w kolejnej klatce, żeby kliknięcie otwierające
    // menu samo go od razu nie zamknęło.
    const id = window.setTimeout(
      () => document.addEventListener('pointerdown', onPointer),
      0,
    );
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      window.clearTimeout(id);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isStuck
          ? 'bg-brand-900/90 backdrop-blur-lg shadow-lg py-3 lg:py-4'
          : 'bg-transparent py-5 lg:py-8'
      }`}>
      <div className="flex items-center justify-between px-6 lg:px-12">
        <a
          href="#start"
          className="flex items-center gap-2 drop-shadow-md text-white"
          aria-label={`${site.name} — przejdź na górę strony`}>
          <Droplets className="w-6 h-6 lg:w-7 lg:h-7 text-brand-200" aria-hidden="true" />
          <span className="text-xl lg:text-2xl font-bold tracking-wide">
            <span className="text-white">{site.brandFirst}</span>{' '}
            <span className="text-brand-300">{site.brandSecond}</span>
          </span>
        </a>

        <nav
          aria-label="Nawigacja główna"
          className="hidden lg:flex items-center p-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`px-5 py-2 rounded-full text-sm transition-colors ${
                  isActive
                    ? 'bg-white text-brand-600 font-medium shadow-sm'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.phone.href}
            className="hidden sm:flex items-center gap-3 bg-white text-brand-600 hover:bg-brand-50 transition-all border border-white/50 rounded-full pl-6 pr-2 py-2 text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:scale-105">
            {site.phone.display}
            <span className="bg-brand-600 text-white p-1.5 rounded-full">
              <Phone className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </a>

          <button
            type="button"
            className="lg:hidden bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 text-white"
            aria-expanded={isOpen}
            aria-controls="menu-mobilne"
            aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
            onClick={() => setIsOpen((open) => !open)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="menu-mobilne"
          ref={panelRef}
          className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-slate-200 hover:text-white font-medium text-lg border-b border-white/10 pb-3 last:border-0">
              {item.label}
            </a>
          ))}
          <a
            href={site.phone.href}
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center justify-center gap-3 bg-brand-400 hover:bg-brand-500 transition-colors text-white rounded-full py-3 text-lg font-bold">
            <Phone className="w-5 h-5" aria-hidden="true" />
            Zadzwoń: {site.phone.display}
          </a>
        </div>
      )}
    </header>
  );
}
