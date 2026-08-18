import {Clock, Mail, MapPin, Phone} from 'lucide-react';
import {site} from '../site.config';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section
      id="kontakt"
      className="py-20 lg:py-32 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Dane kontaktowe */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-white mb-6">
              Zamów pranie z darmowym dojazdem
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Zadzwoń lub wypełnij formularz — szybko i sprawnie odświeżymy Twoje
              wnętrza. Dojeżdżamy na terenie całego Podhala.
            </p>

            <div className="space-y-6">
              <a
                href={site.phone.href}
                className="flex items-center gap-5 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                <span className="bg-brand-500 p-3 rounded-xl shrink-0">
                  <Phone className="w-6 h-6 text-white" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-slate-400 mb-1">Zadzwoń do nas</span>
                  <span className="block text-xl font-bold tracking-wider">
                    {site.phone.display}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-5 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                <span className="bg-white/10 p-3 rounded-xl shrink-0">
                  <Mail className="w-6 h-6 text-slate-300" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-slate-400 mb-1">Napisz e-mail</span>
                  <span className="block text-lg font-medium break-all">{site.email}</span>
                </span>
              </a>

              <div className="flex items-center gap-5 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="bg-white/10 p-3 rounded-xl shrink-0">
                  <MapPin className="w-6 h-6 text-slate-300" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-slate-400 mb-1">Obszar działania</span>
                  <span className="block text-lg font-medium">{site.area}</span>
                </span>
              </div>

              <div className="flex items-start gap-5 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="bg-white/10 p-3 rounded-xl shrink-0">
                  <Clock className="w-6 h-6 text-slate-300" aria-hidden="true" />
                </span>
                <div className="w-full">
                  <p className="text-sm text-slate-400 mb-2">Godziny pracy</p>
                  <dl className="space-y-1">
                    {site.hours.map((entry) => (
                      <div key={entry.days} className="flex justify-between gap-4 text-slate-200">
                        <dt>{entry.days}</dt>
                        <dd className="font-medium whitespace-nowrap">{entry.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden border border-white/10 h-64">
              <iframe
                title="Mapa obszaru działania — Zakopane i Podhale"
                src={site.mapEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Formularz wyceny */}
          <div id="wycena-formularz" className="w-full lg:w-1/2 scroll-mt-28">
            <h3 className="font-display text-2xl lg:text-3xl text-white mb-2">
              Formularz darmowej wyceny
            </h3>
            <p className="text-slate-400 mb-6">
              Opisz, co mamy wyczyścić — oddzwonimy z ceną i wolnym terminem.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
