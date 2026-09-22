import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, REDUCE } from '../lib/motion'
import { brand, nav } from '../content/site'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const header = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`not all and ${REDUCE}`, () => {
      const hide = gsap.to(header.current, { yPercent: -100, duration: 0.35, ease: 'power2.inOut', paused: true })
      ScrollTrigger.create({
        start: 'top -240',
        end: 'max',
        onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
        onLeaveBack: () => hide.reverse(),
      })
    })
    return () => mm.revert()
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'bg-stone/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-3.5" aria-label={`${brand.name}, strona główna`}>
          <img src="/images/logo-mark.png" alt="" className="h-11 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.05rem] tracking-[0.42em] text-graphite">DESIGN</span>
            <span className="mt-1.5 text-[0.62rem] font-medium tracking-[0.5em] text-brass">HOUSE</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Główna">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-ink/80 transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-full border border-graphite px-4 py-2 text-sm font-medium transition-colors hover:bg-graphite hover:text-plaster"
          >
            Bezpłatna konsultacja
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden -mr-2 p-2 text-sm"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Zamknij' : 'Menu'}
        </button>
      </div>

      {open && (
        <div id="menu" className="container-page md:hidden">
          <nav className="flex flex-col border-t border-line py-4" aria-label="Główna">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-3 font-display text-2xl"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="mt-4 self-start rounded-full bg-graphite px-5 py-3 text-sm font-medium text-plaster"
              onClick={() => setOpen(false)}
            >
              Bezpłatna konsultacja
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
