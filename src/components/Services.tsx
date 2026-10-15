import { services } from '../content/site'
import { useLanguage } from '../lib/i18n'

export function Services() {
  const { t } = useLanguage()
  const keys = ['architecture', 'interiors', 'landscape', 'delivery']
  return (
    <section id="uslugi" className="container-page section">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <h2 className="heading-lg lg:col-span-5">{t('services.heading')}</h2>
        <p className="max-w-[46ch] leading-relaxed text-slate lg:col-span-7 lg:pt-3">
          {t('services.intro')}
        </p>
      </div>
      <dl className="mt-12">
        {services.map((s, index) => (
          <div key={s.title} className="grid gap-2 border-t border-line py-7 lg:grid-cols-12 lg:gap-8">
            <dt className="heading-md lg:col-span-5">{t(`services.${keys[index]}`)}</dt>
            <dd className="max-w-[60ch] leading-relaxed text-slate lg:col-span-7">{t(`services.${keys[index]}Text`)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
