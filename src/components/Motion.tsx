import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, REDUCE } from '../lib/motion'

/**
 * Page-wide scroll motion. Elements opt in with data attributes; use them
 * sparingly (media and grids, not body text):
 *  - data-reveal            fade and rise once when scrolled into view
 *  - data-parallax          drift slightly against scroll (wrap in overflow-hidden)
 * Everything is skipped when the visitor prefers reduced motion.
 */
export function Motion({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(`not all and ${REDUCE}`, () => {
      gsap.set('[data-reveal]', { autoAlpha: 0, y: 28 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.09, overwrite: true }),
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    })

    // Fonts and lazy images shift layout after first paint; recalculate.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => mm.revert()
  })

  return <>{children}</>
}
