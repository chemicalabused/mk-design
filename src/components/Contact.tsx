import { useState, type FormEvent } from 'react'
import { brand } from '../content/site'
import { useLanguage } from '../lib/i18n'

export function Contact() {
  const { t } = useLanguage()
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
      `${t('contact.mailName')}: ${f.get('name')}`,
      `${t('contact.mailContact')}: ${f.get('contact')}`,
      `${t('contact.mailWhere')}: ${f.get('where')}`,
      `${t('contact.mailScope')}: ${scopes.join(', ') || t('contact.notProvided')}`,
      '',
      String(f.get('message') ?? ''),
    ].join('\n')
    const url = `mailto:${brand.email}?subject=${encodeURIComponent(t('contact.subject'))}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setSent(true)
  }

  const field =
    'w-full border-b border-line bg-transparent py-3 text-base placeholder:text-slate/60 focus:border-graphite focus:outline-none'

  return (
    <section id="kontakt" className="bg-plaster">
      <div className="container-page section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="heading-lg">{t('contact.heading')}</h2>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-slate">{t('contact.text')}</p>

            <dl className="mt-10 space-y-5 text-base">
              <div>
                <dt className="text-sm text-slate">{t('contact.phone')}</dt>
                <dd className="mt-1 flex flex-wrap gap-x-4">
                  <a href={brand.phoneHref} className="underline-offset-4 hover:underline">{brand.phone}</a>
                  <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                    WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate">{t('contact.email')}</dt>
                <dd className="mt-1">
                  <a href={`mailto:${brand.email}`} className="underline-offset-4 hover:underline">{brand.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate">{t('contact.studio')}</dt>
                <dd className="mt-1">{brand.address || t('contact.address')}</dd>
              </div>
            </dl>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-7" aria-label={t('contact.heading')}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate">{t('contact.name')}</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className="text-sm text-slate">{t('contact.channel')}</span>
                <input name="contact" required autoComplete="email" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm text-slate">{t('contact.location')}</span>
                <input name="where" placeholder={t('contact.locationPlaceholder')} className={field} />
              </label>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm text-slate">{t('contact.scope')}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {(['home', 'interior', 'garden', 'investment', 'turnkey'] as const).map((scope) => {
                  const s = t(`scope.${scope}`)
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
              <span className="text-sm text-slate">{t('contact.message')}</span>
              <textarea name="message" rows={4} required className={`${field} resize-y`} />
            </label>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-full bg-graphite px-6 py-3.5 text-sm font-medium text-plaster transition-colors hover:bg-ink"
              >
                {t('contact.send')}
              </button>
              {sent && <p className="text-sm text-slate" role="status">{t('contact.sent')}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
