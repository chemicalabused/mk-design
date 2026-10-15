import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { languageOptions, useLanguage } from '../lib/i18n'
import { Flag } from './Flag'

// Disclosure-style language switcher: a trigger with the current code and a
// small panel of options. Escape and outside clicks close it; arrow keys move
// between options.
export function LanguageMenu() {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    root.current?.querySelector<HTMLButtonElement>('[aria-current="true"]')?.focus()
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [open])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && open) {
      event.stopPropagation()
      setOpen(false)
      trigger.current?.focus()
      return
    }
    if (!open || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return
    event.preventDefault()
    const items = [...(root.current?.querySelectorAll<HTMLButtonElement>('[data-language-option]') ?? [])]
    const index = items.indexOf(document.activeElement as HTMLButtonElement)
    const next = event.key === 'ArrowDown' ? index + 1 : index - 1
    items[(next + items.length) % items.length]?.focus()
  }

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${t('nav.chooseLanguage')}: ${languageOptions.find(([code]) => code === language)?.[1]}`}
        onClick={() => setOpen((value) => !value)}
        // A flag and chevron, no pill: an outlined trigger read as a second
        // button next to the consultation CTA.
        className="inline-flex min-h-10 items-center gap-1.5 px-1 text-current/85 transition-opacity hover:opacity-70"
      >
        <Flag language={language} />
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`size-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="m3 4.5 3 3 3-3" />
        </svg>
      </button>
      {open && (
        <ul
          id={panelId}
          className="absolute right-0 top-full mt-2 min-w-44 rounded-media border border-line bg-plaster p-1.5 text-ink shadow-[0_18px_40px_rgba(30,28,26,0.16)]"
        >
          {languageOptions.map(([code, label]) => {
            const current = code === language
            return (
              <li key={code}>
                <button
                  type="button"
                  lang={code}
                  data-language-option
                  aria-current={current}
                  onClick={() => {
                    setLanguage(code)
                    setOpen(false)
                    trigger.current?.focus()
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-stone focus-visible:bg-stone ${current ? 'font-medium' : 'text-slate'}`}
                >
                  <Flag language={code} />
                  <span className="flex-1">{label}</span>
                  {current && (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="size-4 text-brass">
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
