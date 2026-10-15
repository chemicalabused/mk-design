import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, REDUCE } from '../lib/motion'
import { brand, nav } from '../content/site'
import { languageOptions, useLanguage } from '../lib/i18n'

const navKeys: Record<string, string> = {
  Realizacje: 'nav.realizations',
  Usługi: 'nav.services',
  Proces: 'nav.process',
  Pracownia: 'nav.studio',
  Kontakt: 'nav.contact',
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const header = useRef<HTMLElement>(null)
  const { language, setLanguage, t } = useLanguage()
  const solid = scrolled || open || hovered

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
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      ref={header}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { if (!header.current?.contains(document.activeElement)) setHovered(false) }}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false) }}
      className={`fixed inset-x-0 top-0 z-40 text-current transition-all duration-300 ${
        solid ? 'bg-stone/90 text-ink shadow-[0_12px_36px_rgba(30,28,26,0.08)] backdrop-blur-md' : 'bg-gradient-to-b from-graphite/45 via-graphite/15 to-transparent text-white'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-3">
        <a href="#top" className="flex min-w-0 items-center gap-3.5" aria-label={`${brand.name}, ${t('nav.main').toLowerCase()}`}>
          <img src={solid ? '/images/mdh-logo-dark.png' : '/images/mdh-logo-light.png'} alt={brand.name} className="h-auto w-[170px] transition-opacity duration-300 sm:w-[190px] md:w-[230px]" />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t('nav.main')}>
          {nav.map((item) => <a key={item.href} href={item.href} className="text-sm text-current/85 transition-opacity hover:opacity-65">{t(navKeys[item.label])}</a>)}
          <label className="sr-only" htmlFor="language-desktop">{t('nav.chooseLanguage')}</label>
          <select id="language-desktop" value={language} onChange={(event) => setLanguage(event.target.value as 'pl' | 'en' | 'uk')} className="max-w-28 cursor-pointer bg-transparent text-sm text-current outline-none">
            {languageOptions.map(([code, label]) => <option key={code} value={code} className="text-ink">{label}</option>)}
          </select>
          <a href="#kontakt" className="rounded-full border border-current/75 px-4 py-2 text-sm font-medium transition-colors hover:bg-graphite hover:text-plaster">{t('nav.book')}</a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button type="button" className="min-w-12 px-2 py-2 text-sm" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((v) => !v)}>
            {open ? t('nav.close') : t('nav.open')}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu" className="container-page max-h-[calc(100svh-5rem)] overflow-y-auto text-ink lg:hidden">
          <nav className="flex flex-col border-t border-line py-4" aria-label={t('nav.main')}>
            {nav.map((item) => <a key={item.href} href={item.href} className="py-3 font-display text-2xl" onClick={() => setOpen(false)}>{t(navKeys[item.label])}</a>)}
            <label className="mt-4 text-xs uppercase tracking-[0.14em] text-slate" htmlFor="language-mobile">{t('nav.language')}</label>
            <select id="language-mobile" value={language} onChange={(event) => setLanguage(event.target.value as 'pl' | 'en' | 'uk')} className="mt-2 w-full border-b border-line bg-transparent py-3 text-base text-ink outline-none">
              {languageOptions.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
            <a href="#kontakt" className="mt-4 self-start rounded-full bg-graphite px-5 py-3 text-sm font-medium text-plaster" onClick={() => setOpen(false)}>{t('nav.bookShort')}</a>
          </nav>
        </div>
      )}
    </header>
  )
}
