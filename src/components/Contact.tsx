import { useState, type FormEvent, type ReactNode } from 'react'
import { brand, scopes as SCOPES, type Scope } from '../content/site'
import { translate, useLanguage } from '../lib/i18n'

type Field = 'name' | 'contact' | 'message'
type Errors = Partial<Record<Field, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^[\d\s()+-]+$/

// Returns the i18n key of the problem with one field, or undefined if valid.
function check(field: Field, value: string) {
  const v = value.trim()
  if (field === 'name') return v ? undefined : 'contact.errorName'
  if (field === 'message') return v ? undefined : 'contact.errorMessage'
  if (!v) return 'contact.errorContact'
  const digits = v.replace(/\D/g, '').length
  return EMAIL.test(v) || (PHONE.test(v) && digits >= 9) ? undefined : 'contact.errorContactFormat'
}

export function Contact() {
  const { language, t } = useLanguage()
  // Stable ids, translated only for display and sending, so a language
  // switch keeps the selection.
  const [scopes, setScopes] = useState<Scope[]>([])
  // idle -> sending -> delivered | failed; 'mailto' when no form key is set.
  const [status, setStatus] = useState<'idle' | 'sending' | 'delivered' | 'failed' | 'mailto'>('idle')
  // Keys, not text, so a language switch re-translates visible errors.
  const [errors, setErrors] = useState<Errors>({})

  function toggle(s: Scope) {
    setScopes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
  }

  // Sends through Web3Forms when brand.formKey is set; otherwise opens the
  // visitor's mail client with everything pre-filled.
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const found: Errors = {}
    for (const field of ['name', 'contact', 'message'] as const) {
      const problem = check(field, String(f.get(field) ?? ''))
      if (problem) found[field] = problem
    }
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      setStatus('idle')
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (status === 'sending') return
    // Honeypot: real visitors never see or tick this box.
    if (f.get('botcheck')) return

    if (brand.formKey) {
      setStatus('sending')
      const contact = String(f.get('contact')).trim()
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: brand.formKey,
            subject: `${t('contact.subject')}: ${String(f.get('name')).trim()}`,
            from_name: brand.name,
            ...(EMAIL.test(contact) ? { replyto: contact } : {}),
            // Field names below arrive as-is in the studio's inbox, so they
            // stay Polish whatever language the visitor used.
            'Imię i nazwisko': f.get('name'),
            Kontakt: contact,
            'Lokalizacja i metraż': f.get('where') || '—',
            Zakres: scopes.map((s) => translate('pl', `scope.${s}`)).join(', ') || '—',
            Wiadomość: f.get('message'),
            'Język strony': language.toUpperCase(),
          }),
        })
        const result = (await response.json()) as { success?: boolean }
        if (!response.ok || !result.success) throw new Error('Web3Forms rejected the submission')
        form.reset()
        setScopes([])
        setStatus('delivered')
      } catch {
        setStatus('failed')
      }
      return
    }

    const body = [
      `${t('contact.mailName')}: ${f.get('name')}`,
      `${t('contact.mailContact')}: ${f.get('contact')}`,
      `${t('contact.mailWhere')}: ${f.get('where')}`,
      `${t('contact.mailScope')}: ${scopes.map((s) => t(`scope.${s}`)).join(', ') || t('contact.notProvided')}`,
      '',
      String(f.get('message') ?? ''),
    ].join('\n')
    const url = `mailto:${brand.email}?subject=${encodeURIComponent(t('contact.subject'))}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setStatus('mailto')
  }

  // Once a field has an error, re-check it as the visitor types so the
  // message disappears as soon as it is fixed.
  function onInput(e: FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement
    const name = target.name as Field
    if (!(name in errors)) return
    setErrors((cur) => ({ ...cur, [name]: check(name, target.value) }))
  }

  // Boxed fields: an underline alone did not read as a place to type.
  // slate/70 on white is 3.3:1, enough for a control boundary.
  const field = (name: Field | 'where') =>
    `mt-2 w-full rounded-media border bg-white px-4 py-3 text-base text-ink placeholder:text-slate/85 transition-colors ${
      name !== 'where' && errors[name] ? 'border-error' : 'border-slate/70 hover:border-graphite focus:border-graphite'
    }`
  const a11y = (name: Field) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const error = (name: Field): ReactNode =>
    errors[name] && (
      <span id={`${name}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-error">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="mt-0.5 size-4 shrink-0">
          <circle cx="8" cy="8" r="6.25" />
          <path d="M8 4.75v3.75M8 11h.01" strokeLinecap="round" />
        </svg>
        {t(errors[name])}
      </span>
    )

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

          <form onSubmit={onSubmit} onInput={onInput} noValidate className="lg:col-span-7" aria-label={t('contact.heading')}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block">
                  <span className="text-sm text-slate">{t('contact.name')}</span>
                  <input name="name" required autoComplete="name" className={field('name')} {...a11y('name')} />
                </label>
                {error('name')}
              </div>
              <div>
                <label className="block">
                  <span className="text-sm text-slate">{t('contact.channel')}</span>
                  <input name="contact" required autoComplete="email" className={field('contact')} {...a11y('contact')} />
                </label>
                {error('contact')}
              </div>
              <label className="block sm:col-span-2">
                <span className="text-sm text-slate">{t('contact.location')}</span>
                <input name="where" placeholder={t('contact.locationPlaceholder')} className={field('where')} />
              </label>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm text-slate">{t('contact.scope')}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {SCOPES.map((scope) => {
                  const on = scopes.includes(scope)
                  return (
                    <button
                      key={scope}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(scope)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        on ? 'border-graphite bg-graphite text-plaster' : 'border-slate/70 bg-white hover:border-graphite'
                      }`}
                    >
                      {t(`scope.${scope}`)}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8">
              <label className="block">
                <span className="text-sm text-slate">{t('contact.message')}</span>
                <textarea name="message" rows={4} required className={`${field('message')} resize-y`} {...a11y('message')} />
              </label>
              {error('message')}
            </div>

            {/* Honeypot for bots; Web3Forms also rejects submissions that tick it. */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-full bg-graphite px-6 py-3.5 text-sm font-medium text-plaster transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>
              <p className={`text-sm ${status === 'failed' ? 'text-error' : 'text-slate'}`} role="status">
                {status === 'mailto' && t('contact.sent')}
                {status === 'delivered' && t('contact.delivered')}
                {status === 'failed' && (
                  <>
                    {t('contact.failed')}{' '}
                    <a href={`mailto:${brand.email}`} className="underline underline-offset-4">{brand.email}</a>.
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
