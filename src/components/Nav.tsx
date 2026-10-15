import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, REDUCE } from '../lib/motion'
import { brand, nav } from '../content/site'
import { languageOptions, useLanguage } from '../lib/i18n'
import { LanguageMenu } from './LanguageMenu'
import { Flag } from './Flag'

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

  // Escape closes the mobile menu and returns focus to its toggle.
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButton.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
    {/* Tapping anywhere outside the open mobile menu closes it. Rendered
        outside the header: GSAP transforms the header, which would make a
        fixed child position against it instead of the viewport. */}
    {open && (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-30 bg-graphite/40 backdrop-blur-sm lg:hidden"
        onClick={() => setOpen(false)}
      />
    )}
    <header
      ref={header}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { if (!header.current?.contains(document.activeElement)) setHovered(false) }}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false) }}
      className={`fixed inset-x-0 top-0 z-40 isolate transition-colors duration-300 ${solid ? 'text-ink' : 'text-white'}`}
    >
      {/* Frosted layer behind the bar. Over the hero it fades out at the bottom
          so there is no hard edge; once solid it becomes a tinted glass bar. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 ${
          solid
            ? `${open ? 'bg-stone/95' : 'bg-stone/75'} shadow-[0_12px_36px_rgba(30,28,26,0.08)]`
            : 'mx-auto max-w-[1920px] bg-gradient-to-b from-graphite/70 via-graphite/35 to-transparent [mask-image:linear-gradient(to_bottom,black_80%,transparent)]'
        }`}
      />
      <div className="container-page flex h-20 items-center justify-between gap-3">
        <a href="#top" className="flex min-w-0 items-center gap-3.5" aria-label={`${brand.name}, ${t('nav.main').toLowerCase()}`}>
          <img src={solid ? '/images/mdh-logo-dark.png' : '/images/mdh-logo-light.png'} alt={brand.name} width={720} height={165} className="h-auto w-[170px] transition-opacity duration-300 sm:w-[190px] md:w-[230px]" />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={t('nav.main')}>
          {nav.map((item) => <a key={item.href} href={item.href} className="text-sm text-current/85 transition-opacity hover:opacity-65">{t(item.key)}</a>)}
          <LanguageMenu />
          <span aria-hidden="true" className="-mx-1 h-5 w-px bg-current/25" />
          <a href="#kontakt" className="rounded-full border border-current/75 px-4 py-2 text-sm font-medium transition-colors hover:bg-graphite hover:text-plaster">{t('nav.book')}</a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button ref={menuButton} type="button" className="min-w-12 px-2 py-2 text-sm" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((v) => !v)}>
            {open ? t('nav.close') : t('nav.open')}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu" className="container-page max-h-[calc(100svh-5rem)] overflow-y-auto text-ink lg:hidden">
          <nav className="flex flex-col border-t border-line py-4" aria-label={t('nav.main')}>
            {nav.map((item) => <a key={item.href} href={item.href} className="py-3 font-display text-2xl" onClick={() => setOpen(false)}>{t(item.key)}</a>)}
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate" id="language-mobile">{t('nav.language')}</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby="language-mobile">
              {languageOptions.map(([code, label]) => (
                <button
                  key={code}
                  type="button"
                  lang={code}
                  aria-pressed={code === language}
                  onClick={() => setLanguage(code)}
                  // Selected = outlined, not filled, so it does not compete with
                  // the filled consultation button below.
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors ${code === language ? 'border-graphite bg-white font-medium text-ink' : 'border-line text-slate hover:border-graphite'}`}
                >
                  <Flag language={code} />
                  {label}
                </button>
              ))}
            </div>
            <a href="#kontakt" className="mt-4 self-start rounded-full bg-graphite px-5 py-3 text-sm font-medium text-plaster" onClick={() => setOpen(false)}>{t('nav.bookShort')}</a>
          </nav>
        </div>
      )}
    </header>
    </>
  )
}
