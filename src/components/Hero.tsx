import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, REDUCE } from '../lib/motion'
import { hero } from '../content/site'
import { Picture } from './Picture'
import { useLanguage } from '../lib/i18n'

export function Hero() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`not all and ${REDUCE}`, () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero-image]', { scale: 1.08, duration: 2.2, ease: 'expo.out' }, 0)
          .from('[data-hero-line]', { yPercent: 110, duration: 1.1, stagger: 0.09 }, 0.1)
          .from('[data-hero-fade]', { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.1 }, 0.55)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="relative flex min-h-svh items-end overflow-hidden bg-graphite">
      <Picture
        src={hero.image.src}
        alt={hero.image.alt}
        priority
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <video
        className="md-hero-video absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={`${hero.image.src}.webp`}
        aria-hidden="true"
        tabIndex={-1}
        data-hero-image
      >
        <source src={hero.video} type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/25 to-graphite/10"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-graphite/30 via-transparent to-transparent" />

      <div className="container-page relative z-10 w-full pb-14 pt-36 text-white sm:pb-20 lg:pb-24">
        <div className="max-w-5xl">
          <h1 className="hero-heading font-display text-[clamp(3rem,5.6vw,5rem)] font-normal leading-[1.08] tracking-[-0.01em]">
            {[t('hero.head1'), t('hero.head2'), t('hero.head3')].map((line, index) => (
              <span
                key={line}
                className={`hero-heading-line block overflow-hidden pb-[0.17em] -mb-[0.17em] ${index === 0 ? 'hero-heading-topic' : 'hero-heading-main'}`}
              >
                <span className="block" data-hero-line>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-white/85 sm:text-lg" data-hero-fade>
            {t('hero.lead')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3" data-hero-fade>
            <a
              href={hero.primary.href}
              className="rounded-full bg-white px-6 py-3.5 text-sm font-medium text-graphite transition-colors hover:bg-plaster"
            >
              {t('hero.primary')}
            </a>
            <a
              href={hero.secondary.href}
              className="px-2 py-3.5 text-sm font-medium text-white underline decoration-white/50 underline-offset-[6px] transition-colors hover:decoration-white"
            >
              {t('hero.secondary')}
            </a>
          </div>
          <p className="mt-7 text-[10px] uppercase tracking-[0.16em] text-white/75 sm:text-xs" data-hero-fade>
            {t('hero.meta')}
          </p>
        </div>
      </div>
    </section>
  )
}
