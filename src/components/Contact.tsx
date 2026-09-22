import { useState, type FormEvent } from 'react'
import { brand, contact } from '../content/site'

export function Contact() {
  const [scopes, setScopes] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  function toggle(s: string) {
    setScopes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
  }

  // Until a form backend is chosen, the form opens the visitor's mail client
  // with everything pre-filled, so it works on a static host.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = [
      `Imię i nazwisko: ${f.get('name')}`,
      `Kontakt: ${f.get('contact')}`,
      `Lokalizacja i metraż: ${f.get('where')}`,
      `Zakres: ${scopes.join(', ') || 'nie podano'}`,
      '',
      String(f.get('message') ?? ''),
    ].join('\n')
    const url = `mailto:${brand.email}?subject=${encodeURIComponent('Zapytanie ze strony')}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setSent(true)
  }

  const field =
    'w-full border-b border-line bg-transparent py-3 text-base placeholder:text-slate/60 focus:border-graphite focus:outline-none'

  return (
    <section id="kontakt" className="bg-plaster">
      <div className="container-page py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="heading-lg">{contact.heading}</h2>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-slate">{contact.text}</p>

            <dl className="mt-10 space-y-5 text-base">
              <div>
                <dt className="text-sm text-slate">Telefon</dt>
                <dd className="mt-1 flex flex-wrap gap-x-4">
                  <a href={brand.phoneHref} className="underline-offset-4 hover:underline">{brand.phone}</a>
                  <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                    WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate">E-mail</dt>
                <dd className="mt-1">
                  <a href={`mailto:${brand.email}`} className="underline-offset-4 hover:underline">{brand.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Pracownia</dt>
                <dd className="mt-1">{brand.address || 'Nysa, spotkania po umówieniu terminu'}</dd>
              </div>
            </dl>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-7" aria-label="Formularz kontaktowy">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate">Imię i nazwisko</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className="text-sm text-slate">Telefon lub e-mail</span>
                <input name="contact" required autoComplete="email" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm text-slate">Lokalizacja i metraż</span>
                <input name="where" placeholder="np. Nysa, działka 8 arów, dom ok. 150 m²" className={field} />
              </label>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm text-slate">Czego dotyczy zapytanie</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {contact.scopes.map((s) => {
                  const on = scopes.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(s)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        on ? 'border-graphite bg-graphite text-plaster' : 'border-line hover:border-graphite'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <label className="mt-8 block">
              <span className="text-sm text-slate">Opowiedzcie o projekcie</span>
              <textarea name="message" rows={5} required className={`${field} resize-y`} />
            </label>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-full bg-graphite px-6 py-3.5 text-sm font-medium text-plaster transition-colors hover:bg-ink"
              >
                Wyślij zapytanie
              </button>
              {sent && <p className="text-sm text-slate" role="status">Otworzyliśmy Wasz program pocztowy z gotową wiadomością.</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
