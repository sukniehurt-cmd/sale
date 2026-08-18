import {CheckCircle2, Sparkles} from 'lucide-react';
import {site} from '../site.config';

const zalety = [
  'Dojazd do klienta gratis',
  'Bezpieczne dla dzieci i zwierząt',
  'Krótki czas schnięcia tapicerki',
  'Gwarancja satysfakcji i jakości',
];

export default function About() {
  return (
    <section id="o-nas" className="py-20 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 relative">
          <div className="aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="img/o-nas.jpg"
              alt="Pranie dywanu maszyną ekstrakcyjną w domu klienta"
              width={1000}
              height={1250}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 xl:-right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
            <div className="flex items-center gap-4">
              <span className="bg-brand-50 p-4 rounded-full text-brand-600">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-3xl font-bold text-brand-600">
                  {site.stats.years}
                </span>
                <span className="block text-slate-500 font-medium">
                  lat doświadczenia
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <p className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" aria-hidden="true" /> Poznaj firmę AF
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-slate-900 mb-6 leading-tight">
            Eksperci od trudnych zabrudzeń na Podhalu
          </h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Jesteśmy profesjonalną firmą czyszczącą działającą na terenie
            Zakopanego i całego Podhala. Naszą misją jest przywracanie tkaninom
            pierwotnego wyglądu, miękkości i świeżości.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Korzystamy z nowoczesnego sprzętu ekstrakcyjnego oraz certyfikowanych,
            bezpiecznych środków czyszczących. Zaufali nam zarówno klienci
            indywidualni, jak i dziesiątki lokalnych pensjonatów i hoteli.
          </p>
          <ul className="space-y-4">
            {zalety.map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2
                  className="w-5 h-5 text-brand-400 shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
