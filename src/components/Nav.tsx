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
  const [musicOn, setMusicOn] = useState(false)
  const header = useRef<HTMLElement>(null)
  const audioContext = useRef<AudioContext | null>(null)
  const audioSource = useRef<AudioBufferSourceNode | null>(null)
  const audioGain = useRef<GainNode | null>(null)
  const audioBuffer = useRef<AudioBuffer | null>(null)
  const autoStartAttempted = useRef(false)
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

  useEffect(() => () => {
    try { audioSource.current?.stop() } catch { /* already stopped */ }
    void audioContext.current?.close()
  }, [])

  async function toggleMusic() {
    if (musicOn) {
      const source = audioSource.current
      const gain = audioGain.current
      const context = audioContext.current
      if (context && gain) {
        gain.gain.cancelScheduledValues(context.currentTime)
        gain.gain.setTargetAtTime(0, context.currentTime, 0.08)
        window.setTimeout(() => { try { source?.stop() } catch { /* already stopped */ } }, 300)
      }
      audioSource.current = null
      setMusicOn(false)
      return
    }

    try {
      const Context = window.AudioContext
      if (!Context) return
      const context = audioContext.current ?? new Context()
      audioContext.current = context
      if (context.state === 'suspended') await context.resume()
      if (!audioBuffer.current) audioBuffer.current = createAmbientBuffer(context)
      const source = context.createBufferSource()
      const gain = context.createGain()
      source.buffer = audioBuffer.current
      source.loop = true
      gain.gain.setValueAtTime(0, context.currentTime)
      gain.gain.setTargetAtTime(0.36, context.currentTime, 0.9)
      source.connect(gain)
      gain.connect(context.destination)
      source.start()
      audioSource.current = source
      audioGain.current = gain
      setMusicOn(true)
    } catch {
      setMusicOn(false)
    }
  }

  useEffect(() => {
    const startAfterVisitorGesture = (event: Event) => {
      const target = event.target
      if (target instanceof Element && target.closest('[data-music-toggle]')) return
      if (autoStartAttempted.current) return
      autoStartAttempted.current = true
      void toggleMusic()
    }
    document.addEventListener('pointerdown', startAfterVisitorGesture, { capture: true, passive: true })
    document.addEventListener('keydown', startAfterVisitorGesture, { capture: true })
    return () => {
      document.removeEventListener('pointerdown', startAfterVisitorGesture, true)
      document.removeEventListener('keydown', startAfterVisitorGesture, true)
    }
  }, [musicOn])

  const soundButton = (mobile = false) => (
    <button
      type="button"
      data-music-toggle
      onClick={() => void toggleMusic()}
      aria-label={musicOn ? t('music.off') : t('music.on')}
      aria-pressed={musicOn}
      title={musicOn ? t('music.off') : t('music.on')}
      className={`inline-flex size-10 items-center justify-center rounded-full border border-current/45 transition-colors hover:bg-graphite/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${mobile ? 'md:hidden' : 'hidden md:inline-flex'}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-[18px]" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 10v4h3l4 3V7l-4 3H4Z" />
        {musicOn ? <><path d="M15 9a4 4 0 0 1 0 6" /><path d="M17.5 6.5a7.5 7.5 0 0 1 0 11" /></> : <path d="m16 9 5 6m0-6-5 6" />}
      </svg>
    </button>
  )

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
          {soundButton()}
          <a href="#kontakt" className="rounded-full border border-current/75 px-4 py-2 text-sm font-medium transition-colors hover:bg-graphite hover:text-plaster">{t('nav.book')}</a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {soundButton(true)}
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
            <button type="button" data-music-toggle onClick={() => void toggleMusic()} aria-pressed={musicOn} className="mt-4 inline-flex min-h-11 items-center gap-3 self-start rounded-full border border-line px-4 py-2 text-sm">
              <span aria-hidden="true">{musicOn ? '♫' : '♪'}</span>{musicOn ? t('music.off') : t('music.on')}
            </button>
            <a href="#kontakt" className="mt-4 self-start rounded-full bg-graphite px-5 py-3 text-sm font-medium text-plaster" onClick={() => setOpen(false)}>{t('nav.bookShort')}</a>
          </nav>
        </div>
      )}
    </header>
  )
}

function createAmbientBuffer(context: AudioContext) {
  const seconds = 48
  const sampleRate = context.sampleRate
  const sampleCount = Math.floor(sampleRate * seconds)
  const buffer = context.createBuffer(1, sampleCount, sampleRate)
  const data = buffer.getChannelData(0)
  const random = (min = 0, max = 1) => min + Math.random() * (max - min)

  // Soft, irregular fire sounds: short warm pops with a few brighter crackles.
  for (let start = random(0.2, 1); start < seconds - 0.5; start += random(0.12, 0.42)) {
    const duration = random(0.025, 0.11)
    const startIndex = Math.floor(start * sampleRate)
    const endIndex = Math.min(sampleCount, startIndex + Math.floor(duration * sampleRate))
    const pitch = random(120, 820)
    const amplitude = random(0.008, 0.027)
    const phase = random(0, Math.PI * 2)
    for (let i = startIndex; i < endIndex; i++) {
      const elapsed = (i - startIndex) / sampleRate
      const envelope = Math.exp(-elapsed * random(20, 30))
      const noise = random(-1, 1)
      data[i] += amplitude * envelope * (0.62 * Math.sin(2 * Math.PI * pitch * elapsed + phase) + 0.38 * noise)
    }
  }

  // A few loose bird phrases, with gentle descending and rising whistles.
  for (let phrase = random(1.5, 3); phrase < seconds - 2; phrase += random(4.2, 7.5)) {
    const chirpCount = Math.floor(random(2, 5))
    let start = phrase
    for (let chirp = 0; chirp < chirpCount; chirp++) {
      const duration = random(0.12, 0.28)
      const startIndex = Math.floor(start * sampleRate)
      const endIndex = Math.min(sampleCount, startIndex + Math.floor(duration * sampleRate))
      const lowHz = random(2050, 2850)
      const highHz = lowHz + random(-520, 720)
      const phase = random(0, Math.PI * 2)
      const amplitude = random(0.008, 0.016)
      for (let i = startIndex; i < endIndex; i++) {
        const progress = (i - startIndex) / Math.max(1, endIndex - startIndex)
        const elapsed = (i - startIndex) / sampleRate
        const frequency = lowHz + (highHz - lowHz) * progress
        const envelope = Math.sin(Math.PI * progress) ** 1.5
        const trill = Math.sin(2 * Math.PI * (7 + 2 * Math.sin(progress * Math.PI)) * elapsed)
        data[i] += amplitude * envelope * (Math.sin(2 * Math.PI * frequency * elapsed + phase) + 0.16 * trill)
      }
      start += duration + random(0.045, 0.14)
    }
  }

  // Filtered, gently changing noise gives the loop a continuous stream-like bed.
  let lowWater = 0
  let highWater = 0
  let filteredWater = 0
  const filter = 0.035
  for (let i = 0; i < sampleCount; i++) {
    const time = i / sampleRate
    const white = random(-1, 1)
    lowWater += filter * (white - lowWater)
    highWater = white - lowWater
    filteredWater += 0.012 * (lowWater - filteredWater)
    const swell = 0.83 + 0.13 * Math.sin(2 * Math.PI * time / 11) + 0.07 * Math.sin(2 * Math.PI * time / 4.7)
    const water = (filteredWater * 0.7 + highWater * 0.13) * swell * 0.075
    const edgeFade = Math.min(1, time / 1.2, (seconds - time) / 1.2)
    data[i] = (data[i] + water) * Math.max(0, edgeFade)
  }
  return buffer
}
