import {Droplets} from 'lucide-react';
import {nav, site} from '../site.config';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-white mb-4">
            <Droplets className="w-6 h-6 text-brand-300" aria-hidden="true" />
            <span className="text-xl font-bold tracking-wide">
              {site.brandFirst} <span className="text-brand-300">{site.brandSecond}</span>
            </span>
          </p>
          <p className="leading-relaxed">{site.tagline}</p>
          <p className="mt-4">
            <a href={site.phone.href} className="text-white font-semibold hover:underline">
              {site.phone.display}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:underline break-all">
              {site.email}
            </a>
          </p>
        </div>

        <nav aria-label="Nawigacja w stopce">
          <h2 className="text-white font-semibold mb-4">Strona</h2>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="hover:text-white transition-colors">
                Pytania i odpowiedzi
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-white font-semibold mb-4">Dojeżdżamy do miejscowości</h2>
          <p className="leading-relaxed">{site.areaList.join(' · ')}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        {/* Dolny zapas na telefonach — pod przyklejonym przyciskiem „Zadzwoń” */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 pb-28 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>
            © {new Date().getFullYear()} {site.name} Zakopane. Wszelkie prawa zastrzeżone.
          </p>
          <a href="polityka-prywatnosci.html" className="hover:text-white transition-colors">
            Polityka prywatności
          </a>
        </div>
      </div>
    </footer>
  );
}
