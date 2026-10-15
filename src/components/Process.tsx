import { process } from '../content/site'
import { useLanguage } from '../lib/i18n'

export function Process() {
  const { t } = useLanguage()
  const keys = ['consult', 'concept', 'docs', 'execution']
  return (
    <section id="proces" className="bg-plaster">
      <div className="container-page section grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="heading-lg">{t('process.heading')}</h2>
          <p className="mt-5 max-w-[40ch] leading-relaxed text-slate">
            {t('process.intro')}
          </p>
        </div>
        <ol className="lg:col-span-7">
          {process.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-6 first:border-t-0 first:pt-0 lg:first:pt-1">
              <span className="font-display text-2xl leading-none text-brass">{i + 1}</span>
              <div>
                <h3 className="heading-md">{t(`process.${keys[i]}`)}</h3>
                <p className="mt-2 max-w-[56ch] leading-relaxed text-slate">{t(`process.${keys[i]}Text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
