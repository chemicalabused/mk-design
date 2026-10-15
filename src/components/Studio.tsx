import { studio } from '../content/site'
import { useLanguage } from '../lib/i18n'

export function Studio() {
  const { t } = useLanguage()
  return (
    <section id="pracownia" className="container-page section">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow text-brass">{t('studio.label')}</p>
          <h2 className="heading-lg mt-5">{t('studio.heading')}</h2>
        </div>
        <div className="lg:col-span-7">
          {studio.bio.map((key) => (
            <p key={key} className="mb-5 max-w-[62ch] text-lg leading-relaxed text-ink/80 last:mb-0">
              {t(key)}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-14 grid gap-8 border-t border-line pt-7 sm:grid-cols-3 sm:gap-6">
        {studio.principles.map((key, index) => (
          <div key={key} className="border-b border-line pb-6 last:border-0 sm:border-0 sm:pb-0">
            <p className="text-xs tracking-[0.16em] text-brass">0{index + 1}</p>
            <h3 className="heading-sm mt-4">{t(key)}</h3>
            <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-slate">{t(`${key}Text`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
