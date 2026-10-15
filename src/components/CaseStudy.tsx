import { Picture } from './Picture'
import { useLanguage } from '../lib/i18n'
import { caseStudy } from '../content/site'

export function CaseStudy() {
  const { t } = useLanguage()
  const [main, ...rest] = caseStudy.images
  return (
    <section className="bg-graphite text-plaster">
      <div className="container-page section">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="heading-lg">{t('case.heading')}</h2>
            {[t('case.text1'), t('case.text2')].map((text) => (
              <p key={text} className="mt-6 max-w-[52ch] leading-relaxed text-plaster/80">
                {text}
              </p>
            ))}
          </div>
          <figure className="lg:col-span-7">
            <div className="isolate aspect-[16/10] overflow-hidden rounded-media" data-reveal>
              <Picture src={main.src} alt={main.alt} className="h-full w-full scale-[1.14] object-cover" data-parallax />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {rest.map((img) => (
                <div key={img.src} className="isolate aspect-[4/3] overflow-hidden rounded-media" data-reveal>
                  <Picture src={img.src} alt={img.alt} className="h-full w-full scale-[1.14] object-cover" data-parallax />
                </div>
              ))}
            </div>
            <figcaption className="mt-4 text-sm text-plaster/60">{t('case.caption')}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
