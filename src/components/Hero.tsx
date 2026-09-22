import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, REDUCE } from '../lib/motion'
import { hero } from '../content/site'
import { Picture } from './Picture'

export function Hero() {
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
    <section id="top" ref={root} className="relative">
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-12">
        <div className="relative order-first h-[58svh] overflow-hidden lg:order-last lg:col-span-7 lg:h-auto lg:min-h-svh">
          <Picture
            src={hero.image.src}
            alt={hero.image.alt}
            priority
            className="absolute inset-0 h-full w-full object-cover"
            data-hero-image
          />
          <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-stone/80 to-transparent" />
        </div>

        <div className="flex flex-col justify-end px-5 pb-10 pt-10 sm:px-8 lg:col-span-5 lg:justify-center lg:px-12 lg:pt-28">
          <h1 className="heading-xl">
            {hero.headline.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="block" data-hero-line>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-slate sm:text-lg" data-hero-fade>
            {hero.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-hero-fade>
            <a
              href={hero.primary.href}
              className="rounded-full bg-graphite px-6 py-3.5 text-sm font-medium text-plaster transition-colors hover:bg-ink"
            >
              {hero.primary.label}
            </a>
            <a
              href={hero.secondary.href}
              className="rounded-full border border-graphite/40 px-6 py-3.5 text-sm font-medium transition-colors hover:border-graphite"
            >
              {hero.secondary.label}
            </a>
          </div>
          <ul className="mt-12 flex flex-col gap-1.5 border-t border-line pt-6 text-sm text-slate" data-hero-fade>
            {hero.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
