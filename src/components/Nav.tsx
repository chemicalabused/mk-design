import { useEffect, useState } from 'react'
import { brand, nav } from '../content/site'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'bg-stone/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label={`${brand.name}, strona główna`}>
          <img src="/images/logo-mark.png" alt="" className="h-7 w-auto" />
          <span className="font-display text-lg tracking-wide">{brand.name}</span>
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
