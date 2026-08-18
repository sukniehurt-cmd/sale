import {useEffect, useState} from 'react';

/**
 * Zwraca identyfikator sekcji aktualnie widocznej na ekranie —
 * na tej podstawie nawigacja podświetla właściwy odnośnik.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        // Sekcja liczy się jako aktywna, gdy zajmuje środek ekranu.
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
