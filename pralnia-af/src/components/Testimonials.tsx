import {Quote, Star} from 'lucide-react';
import {testimonials} from '../data/testimonials';

export default function Testimonials() {
  return (
    <section id="opinie" className="py-20 lg:py-32 px-6 lg:px-12 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 bg-white shadow-sm text-brand-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" aria-hidden="true" /> Zaufali nam
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-slate-900">
            Opinie naszych klientów
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((opinia, idx) => (
            <li
              key={opinia.id}
              className={`relative bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl transition-all duration-300 ${
                idx % 2 !== 0 ? 'md:translate-y-8' : ''
              }`}>
              <Quote
                className="absolute top-8 right-8 w-16 h-16 text-brand-50 rotate-180 pointer-events-none"
                aria-hidden="true"
              />

              <p
                className="flex gap-1 mb-6 relative"
                aria-label={`Ocena: ${opinia.rating} na 5`}>
                {Array.from({length: opinia.rating}).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    aria-hidden="true"
                  />
                ))}
              </p>

              <blockquote className="text-lg text-slate-700 leading-relaxed mb-8 relative italic">
                „{opinia.text}”
              </blockquote>

              <div className="flex items-center gap-4 relative">
                <span
                  aria-hidden="true"
                  className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold text-lg">
                  {opinia.initial}
                </span>
                <span>
                  <span className="block font-bold text-slate-900">{opinia.name}</span>
                  <span className="block text-slate-500 text-sm">{opinia.date}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
