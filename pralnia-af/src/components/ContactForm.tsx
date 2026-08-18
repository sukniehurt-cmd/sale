import {useId, useState} from 'react';
import {AlertCircle, CheckCircle2, Loader2, Send} from 'lucide-react';
import {site} from '../site.config';

type Status = 'idle' | 'sending' | 'ok' | 'error';

const uslugi = [
  'Pranie dywanu / wykładziny',
  'Tapicerka meblowa (kanapa, narożnik, fotele)',
  'Tapicerka samochodowa',
  'Materac',
  'Dezynfekcja ozonem',
  'Inne / nie wiem',
];

/** Prosty warunek na numer: co najmniej 9 cyfr po odrzuceniu spacji i znaków. */
const isPhoneValid = (value: string) => value.replace(/\D/g, '').length >= 9;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');
  const id = useId();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!isPhoneValid(String(data.get('telefon') ?? ''))) {
      setStatus('error');
      setErrorText('Podaj numer telefonu składający się z co najmniej 9 cyfr.');
      return;
    }

    setStatus('sending');
    setErrorText('');

    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        body: data,
        headers: {Accept: 'application/json'},
      });

      // Hosting bez PHP zwróci kod błędu albo stronę HTML zamiast JSON-a —
      // wtedy zamiast „wysłano” pokazujemy numer telefonu.
      const payload = await response.json().catch(() => null);

      if (response.ok && payload?.ok) {
        setStatus('ok');
        form.reset();
        return;
      }

      setStatus('error');
      setErrorText(
        typeof payload?.error === 'string'
          ? payload.error
          : `Nie udało się wysłać wiadomości. Zadzwoń: ${site.phone.display}.`,
      );
    } catch {
      setStatus('error');
      setErrorText(
        `Brak połączenia z serwerem. Zadzwoń do nas: ${site.phone.display}.`,
      );
    }
  };

  if (status === 'ok') {
    return (
      <div
        role="status"
        className="bg-white/5 border border-brand-400/40 rounded-3xl p-8 text-center">
        <CheckCircle2
          className="w-14 h-14 text-brand-300 mx-auto mb-5"
          aria-hidden="true"
        />
        <h3 className="font-display text-2xl text-white mb-3">
          Dziękujemy za zgłoszenie!
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Odezwiemy się najpóźniej następnego dnia roboczego. Jeśli sprawa jest
          pilna, zadzwoń:{' '}
          <a href={site.phone.href} className="text-brand-300 font-semibold underline">
            {site.phone.display}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-slate-400 hover:text-white underline">
          Wyślij kolejne zgłoszenie
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
      {/* Pułapka na roboty — pole niewidoczne dla człowieka musi zostać puste. */}
      <div className="absolute w-px h-px overflow-hidden -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${id}-firma`}>Nie wypełniaj tego pola</label>
        <input id={`${id}-firma`} name="firma" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-imie`} className="block text-sm text-slate-300 mb-2">
            Imię <span className="text-brand-300">*</span>
          </label>
          <input
            id={`${id}-imie`}
            name="imie"
            type="text"
            required
            autoComplete="given-name"
            maxLength={80}
            className="w-full bg-slate-900/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-400 outline-none transition"
            placeholder="Jan"
          />
        </div>

        <div>
          <label htmlFor={`${id}-telefon`} className="block text-sm text-slate-300 mb-2">
            Telefon <span className="text-brand-300">*</span>
          </label>
          <input
            id={`${id}-telefon`}
            name="telefon"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            className="w-full bg-slate-900/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-400 outline-none transition"
            placeholder="600 100 200"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="block text-sm text-slate-300 mb-2">
          E-mail <span className="text-slate-500">(opcjonalnie)</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={120}
          className="w-full bg-slate-900/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-400 outline-none transition"
          placeholder="jan@example.com"
        />
      </div>

      <div>
        <label htmlFor={`${id}-usluga`} className="block text-sm text-slate-300 mb-2">
          Czego dotyczy zlecenie?
        </label>
        <select
          id={`${id}-usluga`}
          name="usluga"
          defaultValue={uslugi[0]}
          className="w-full bg-slate-900/60 border border-white/15 rounded-xl px-4 py-3 text-white focus:border-brand-400 outline-none transition">
          {uslugi.map((usluga) => (
            <option key={usluga} value={usluga} className="bg-slate-900">
              {usluga}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-wiadomosc`} className="block text-sm text-slate-300 mb-2">
          Szczegóły <span className="text-slate-500">(wymiary, rodzaj plam, termin)</span>
        </label>
        <textarea
          id={`${id}-wiadomosc`}
          name="wiadomosc"
          rows={4}
          maxLength={2000}
          className="w-full bg-slate-900/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-400 outline-none transition resize-y"
          placeholder="Np. narożnik 3-osobowy z plamami po kawie, Zakopane, najchętniej w przyszłym tygodniu."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id={`${id}-zgoda`}
          name="zgoda"
          type="checkbox"
          required
          value="tak"
          className="mt-1 w-5 h-5 shrink-0 accent-brand-400"
        />
        <label htmlFor={`${id}-zgoda`} className="text-sm text-slate-400 leading-relaxed">
          Wyrażam zgodę na kontakt w sprawie wyceny i przetwarzanie moich danych
          zgodnie z{' '}
          <a
            href="polityka-prywatnosci.html"
            className="text-brand-300 underline hover:text-brand-200">
            polityką prywatności
          </a>
          . <span className="text-brand-300">*</span>
        </label>
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          {errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-3 bg-brand-400 hover:bg-brand-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full py-4 font-bold text-lg transition">
        {status === 'sending' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            Wysyłanie…
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" />
            Poproś o darmową wycenę
          </>
        )}
      </button>

      <p className="text-xs text-slate-500 text-center">
        Odpowiadamy zwykle tego samego dnia. Pola oznaczone{' '}
        <span className="text-brand-300">*</span> są wymagane.
      </p>
    </form>
  );
}
