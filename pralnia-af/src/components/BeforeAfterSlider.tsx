import {useCallback, useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

/**
 * Porównanie „przed / po”. Obsługa myszą, palcem i klawiaturą
 * (strzałki, Home, End) — uchwyt jest zwykłym suwakiem dla czytników ekranu.
 */
export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      moveTo(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('pointermove', onMove, {passive: false});
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [moveTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - step));
    else if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + step));
    else if (e.key === 'Home') setPosition(0);
    else if (e.key === 'End') setPosition(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden select-none shadow-2xl border-4 border-white touch-none"
      onPointerDown={(e) => {
        draggingRef.current = true;
        moveTo(e.clientX);
      }}>
      {/* Stan „po” — pełne tło */}
      <img
        src={afterImage}
        alt={afterAlt}
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <p className="absolute top-4 right-4 bg-brand-500/90 text-white px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md shadow-lg border border-white/20">
        PO
      </p>

      {/* Stan „przed” — przycinany do pozycji suwaka */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{clipPath: `inset(0 ${100 - position}% 0 0)`}}>
        <img
          src={beforeImage}
          alt={beforeAlt}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <p className="absolute top-4 left-4 bg-slate-800/90 text-white px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md shadow-lg border border-white/20">
          PRZED
        </p>
      </div>

      {/* Uchwyt */}
      <div
        className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center"
        style={{left: `${position}%`, transform: 'translateX(-50%)'}}>
        <button
          type="button"
          role="slider"
          tabIndex={0}
          aria-label="Porównanie przed i po praniu — przesuń, aby odsłonić efekt"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`Odsłonięte ${Math.round(position)}% zdjęcia sprzed prania`}
          onKeyDown={onKeyDown}
          className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-brand-500 text-brand-500 cursor-ew-resize hover:scale-110 transition-transform">
          <ChevronLeft className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
          <ChevronRight className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
