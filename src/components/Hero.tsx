import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, REDUCE } from '../lib/motion'
import { hero } from '../content/site'
import { Picture } from './Picture'
import { useLanguage } from '../lib/i18n'

export function Hero() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)
  // The loop is 1.4 MB. Attach it only after the page has loaded so it does
  // not compete with the app bundle on slow connections; the poster shows
  // until then. Skipped when the visitor asked to save data, and under reduced
  // motion, where the video is hidden anyway (index.css).
  const [videoSrc, setVideoSrc] = useState<string>()

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData || window.matchMedia(REDUCE).matches) return
    const attach = () => setVideoSrc(hero.video)
    if (document.readyState === 'complete') {
      attach()
      return
    }
    window.addEventListener('load', attach, { once: true })
    return () => window.removeEventListener('load', attach)
  }, [])

  useGSAP(
    () => {
      // Hand the start pose over from CSS (.js rules in index.css, which hold
      // the prerendered hero still) to GSAP. Dropping the class in the same
      // tick as the fromTo calls below set the pose inline means no frame is
      // painted in between, and the CSS failsafe can no longer cut the
      // timeline short on slow devices.
      document.documentElement.classList.remove('js')
      const mm = gsap.matchMedia()
      mm.add(`not all and ${REDUCE}`, () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          // fromTo so the start pose is explicit and rendered immediately.
          .fromTo('[data-hero-image]', { scale: 1.08 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
          .fromTo('[data-hero-line]', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.1)
          // Rise only, no fade: text that starts at opacity 0 is not counted as
          // painted, which pushed mobile LCP from 3.2 s to 5.6 s.
          .fromTo('[data-hero-fade]', { y: 18 }, { y: 0, duration: 0.9, stagger: 0.1 }, 0.55)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="relative mx-auto flex min-h-svh w-full max-w-[1920px] items-end overflow-hidden bg-graphite">
      <Picture
        src={hero.image.src}
        alt={t(hero.image.altKey)}
        // 16:9 cover: on portrait screens the image is as wide as 16/9 of the height.
        sizes="(min-aspect-ratio: 16/9) min(100vw, 1920px), 178vh"
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
        // No poster: the responsive <Picture> above already sits underneath
        // and stays visible until the video has frames.
        src={videoSrc}
        aria-hidden="true"
        tabIndex={-1}
        data-hero-image
      />
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
