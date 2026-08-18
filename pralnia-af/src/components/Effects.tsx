import {Sparkles} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function Effects() {
  return (
    <section id="efekty" className="py-20 lg:py-28 px-6 lg:px-12 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" aria-hidden="true" /> Niezaprzeczalne rezultaty
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-slate-900 mb-6">
            Zobacz efekty naszej pracy
          </h2>
          <p className="text-lg text-slate-600">
            Przesuń suwak w lewo lub w prawo, aby zobaczyć różnicę przed
            i po dogłębnym praniu ekstrakcyjnym.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <BeforeAfterSlider
            beforeImage="img/efekt-przed.jpg"
            afterImage="img/efekt-po.jpg"
            beforeAlt="Dywan przed praniem — widoczne zabrudzenia i plamy"
            afterAlt="Ten sam dywan po praniu ekstrakcyjnym — czysty i odświeżony"
          />
        </div>
      </div>
    </section>
  );
}
