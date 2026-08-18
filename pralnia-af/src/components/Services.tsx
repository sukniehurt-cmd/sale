import {CarFront, Droplets, ShieldCheck, Sparkles} from 'lucide-react';
import type {ReactNode} from 'react';

const uslugi: {title: string; icon: ReactNode; desc: string}[] = [
  {
    title: 'Pranie dywanów',
    icon: <Droplets className="w-8 h-8" aria-hidden="true" />,
    desc: 'Głębokie pranie ekstrakcyjne usuwające roztocza i plamy oraz przywracające puszystość włókien.',
  },
  {
    title: 'Tapicerka meblowa',
    icon: <Sparkles className="w-8 h-8" aria-hidden="true" />,
    desc: 'Czyszczenie kanap, narożników, foteli i materacy. Neutralizujemy nieprzyjemne zapachy.',
  },
  {
    title: 'Wnętrza samochodowe',
    icon: <CarFront className="w-8 h-8" aria-hidden="true" />,
    desc: 'Kompleksowe pranie wnętrza auta: fotele, podłoga, bagażnik i podsufitka.',
  },
  {
    title: 'Dezynfekcja ozonem',
    icon: <ShieldCheck className="w-8 h-8" aria-hidden="true" />,
    desc: 'Skuteczne zwalczanie wirusów, bakterii oraz trwałych, nieprzyjemnych zapachów.',
  },
];

export default function Services() {
  return (
    <section id="uslugi" className="py-20 lg:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-slate-900 mb-6">
            W czym możemy Ci pomóc?
          </h2>
          <p className="text-lg text-slate-600">
            Oferujemy kompleksowe usługi prania ekstrakcyjnego i czyszczenia —
            dla domu, pensjonatu i firmy.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {uslugi.map((usluga) => (
            <li
              key={usluga.title}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                {usluga.icon}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{usluga.title}</h3>
              <p className="text-slate-600 leading-relaxed">{usluga.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
