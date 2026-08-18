import {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {faqs} from '../data/faq';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-32 px-6 lg:px-12 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-medium text-slate-900 mb-6">
            Często zadawane pytania
          </h2>
          <p className="text-lg text-slate-600">
            Masz wątpliwości? Sprawdź odpowiedzi na pytania, które słyszymy
            najczęściej.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`border rounded-2xl transition-colors duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-brand-200 bg-brand-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-brand-200 bg-white'
                }`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-odpowiedz-${index}`}
                    id={`faq-pytanie-${index}`}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 text-lg font-medium text-slate-800">
                    {faq.question}
                    <ChevronDown
                      className={`w-5 h-5 text-brand-600 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {/* grid-rows 0fr → 1fr rozwija dowolnie długą odpowiedź bez przycinania */}
                <div
                  id={`faq-odpowiedz-${index}`}
                  role="region"
                  aria-labelledby={`faq-pytanie-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
