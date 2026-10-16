import { useId } from 'react'
import type { Country } from '../content/site'

export type FlagCode = Country | 'gb'

// Round flag for the language switcher and project locations. Inline SVG
// rather than emoji: Windows renders flag emoji as plain letters. The thin
// ring keeps the white half of the Polish flag visible on light backgrounds.
export function Flag({ code, className = 'size-5' }: { code: FlagCode; className?: string }) {
  const id = useId()
  return (
    <span className={`inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-black/15 ${className}`} aria-hidden="true">
      {code === 'pl' && (
        <svg viewBox="0 0 2 2" className="block size-full">
          <rect width="2" height="1" fill="#fff" />
          <rect y="1" width="2" height="1" fill="#dc143c" />
        </svg>
      )}
      {code === 'ua' && (
        <svg viewBox="0 0 2 2" className="block size-full">
          <rect width="2" height="1" fill="#0057b7" />
          <rect y="1" width="2" height="1" fill="#ffd700" />
        </svg>
      )}
      {/* Civil flag of Spain (red-yellow-red, 1:2:1): the coat of arms would
          be an unreadable smudge at this size. */}
      {code === 'es' && (
        <svg viewBox="0 0 4 4" className="block size-full">
          <rect width="4" height="4" fill="#aa151b" />
          <rect y="1" width="4" height="2" fill="#f1bf00" />
        </svg>
      )}
      {code === 'gb' && (
        <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className="block size-full">
          <clipPath id={`${id}-t`}>
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}-t)`} stroke="#c8102e" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
        </svg>
      )}
    </span>
  )
}
