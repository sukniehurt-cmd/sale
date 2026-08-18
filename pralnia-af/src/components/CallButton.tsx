import {useEffect, useState} from 'react';
import {Phone} from 'lucide-react';
import {site} from '../site.config';

/**
 * Przycisk „zadzwoń” przyklejony do dołu ekranu na telefonach —
 * pojawia się dopiero po zjechaniu poza sekcję powitalną.
 */
export default function CallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={site.phone.href}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`sm:hidden fixed bottom-5 left-5 right-5 z-40 flex items-center justify-center gap-3 bg-brand-600 text-white rounded-full py-4 font-bold shadow-2xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24 pointer-events-none'
      }`}>
      <Phone className="w-5 h-5" aria-hidden="true" />
      Zadzwoń: {site.phone.display}
    </a>
  );
}
