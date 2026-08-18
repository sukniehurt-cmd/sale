import {ArrowRight, CheckCircle2} from 'lucide-react';

const zakresy = [
  {
    title: 'Tapicerka meblowa',
    subtitle: 'Odnawiamy serce Twojego salonu',
    items: [
      'Krzesła, pufy i fotele biurowe',
      'Fotele wypoczynkowe i uszaki',
      'Kanapy, sofy i wersalki',
      'Narożniki małe i duże',
    ],
    featured: false,
  },
  {
    title: 'Dywany i wykładziny',
    subtitle: 'Przywracamy świeżość podłogom',
    items: [
      'Wykładziny biurowe i obiektowe',
      'Dywany syntetyczne (krótki włos)',
      'Dywany typu shaggy (długi włos)',
      'Dywany wełniane i premium',
    ],
    featured: true,
  },
  {
    title: 'Pojazdy i dodatki',
    subtitle: 'Czystość w drodze i w sypialni',
    items: [
      'Fotele samochodowe (materiałowe)',
      'Komplety foteli i kanapy tylne',
      'Materace sypialniane 1-osobowe',
      'Materace sypialniane 2-osobowe',
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="cennik" className="py-20 lg:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-slate-900 mb-6">
            Indywidualna wycena
          </h2>
          <p className="text-lg text-slate-600">
            Każde zlecenie traktujemy indywidualnie — cena zależy od wielkości,
            rodzaju materiału oraz stopnia zabrudzenia. Sprawdź zakres usług
            i poproś o bezpłatną wycenę.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {zakresy.map((zakres) => (
            <li
              key={zakres.title}
              className={
                zakres.featured
                  ? 'bg-brand-600 p-8 rounded-3xl shadow-xl flex flex-col md:-translate-y-4'
                  : 'bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col'
              }>
              {zakres.featured && (
                <p className="bg-brand-300 text-brand-900 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full self-center mb-4">
                  Najpopularniejsze
                </p>
              )}
              <h3
                className={`text-2xl font-bold mb-2 text-center ${
                  zakres.featured ? 'text-white' : 'text-slate-900'
                }`}>
                {zakres.title}
              </h3>
              <p
                className={`mb-6 pb-6 border-b text-center ${
                  zakres.featured
                    ? 'text-brand-100 border-brand-500'
                    : 'text-slate-500 border-slate-200'
                }`}>
                {zakres.subtitle}
              </p>
              <ul
                className={`space-y-4 mb-8 flex-1 ${
                  zakres.featured ? 'text-brand-50' : 'text-slate-700'
                }`}>
                {zakres.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 ${
                        zakres.featured ? 'text-brand-200' : 'text-brand-400'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {zakres.featured && (
                <a
                  href="#wycena-formularz"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-white text-brand-600 rounded-full font-bold hover:bg-brand-50 transition group">
                  Poproś o wycenę
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
