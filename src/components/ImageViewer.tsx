import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { ProjectImage } from '../content/site'
import { useLanguage } from '../lib/i18n'

interface Props {
  images: ProjectImage[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

// Full-screen gallery for one project's images. The slides sit side by side
// in a strip; dragging (finger or mouse) moves the strip with the pointer and
// settles on the neighbour once the drag passes a threshold. Arrow buttons
// and the keyboard do the same. Only the current image and its neighbours
// are loaded. Escape is handled by the surrounding <dialog> (Projects.tsx).
export function ImageViewer({ images, index, onIndexChange, onClose }: Props) {
  const { t } = useLanguage()
  const closeRef = useRef<HTMLButtonElement>(null)
  const drag = useRef<{ id: number; x: number; y: number; horizontal?: boolean } | null>(null)
  // Set when a drag ends, so the click that may follow it does not close
  // the viewer; cleared by that click or the next press.
  const dragged = useRef(false)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const current = images[index]
  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && hasPrev) onIndexChange(index - 1)
      if (event.key === 'ArrowRight' && hasNext) onIndexChange(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hasNext, hasPrev, index, onIndexChange])

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    dragged.current = false
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || d.id !== event.pointerId) return
    const dx = event.clientX - d.x
    const dy = event.clientY - d.y
    // Decide direction once, after a few pixels, so vertical gestures and
    // pinches are left to the browser.
    if (d.horizontal === undefined) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      d.horizontal = Math.abs(dx) > Math.abs(dy)
      if (d.horizontal) {
        event.currentTarget.setPointerCapture(event.pointerId)
        setDragging(true)
      }
    }
    if (!d.horizontal) return
    // Resist past the first and last image.
    const atEdge = (dx > 0 && !hasPrev) || (dx < 0 && !hasNext)
    setDragX(atEdge ? dx * 0.3 : dx)
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || d.id !== event.pointerId) return
    drag.current = null
    if (!d.horizontal) return
    const width = event.currentTarget.clientWidth
    const threshold = Math.min(80, width * 0.18)
    if (dragX <= -threshold && hasNext) onIndexChange(index + 1)
    else if (dragX >= threshold && hasPrev) onIndexChange(index - 1)
    setDragX(0)
    setDragging(false)
    dragged.current = true
  }

  const arrow =
    'grid size-12 place-items-center rounded-full border border-white/30 bg-black/35 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-30'

  return (
    <div
      className="fixed inset-0 z-50 bg-graphite/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-roledescription="carousel"
      aria-label={`${t('projects.zoom')}: ${current.alt}`}
    >
      <div
        className="h-full w-full cursor-grab overflow-hidden select-none active:cursor-grabbing"
        style={{ touchAction: 'pan-y pinch-zoom' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className={`flex h-full ${dragging ? '' : 'transition-transform duration-300 ease-out'}`}
          style={{ transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)` }}
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              className="grid h-full w-full shrink-0 place-items-center p-4 pb-24 pt-20 sm:p-8 sm:px-24"
              aria-hidden={i !== index}
              onClick={(event) => {
                if (dragged.current) {
                  dragged.current = false
                  return
                }
                if (event.target === event.currentTarget) onClose()
              }}
            >
              {Math.abs(i - index) <= 1 && (
                <img
                  src={`${image.src}.webp`}
                  alt={image.alt}
                  draggable={false}
                  className="max-h-full max-w-full rounded-media object-contain shadow-2xl"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className={`${arrow} absolute right-4 top-4 sm:right-7 sm:top-7`}
        aria-label={t('projects.closeZoom')}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>

      <p className="pointer-events-none absolute bottom-7 left-4 right-36 text-sm text-white/75 sm:bottom-7 sm:left-8 sm:right-24">
        <span className="mr-3 tabular-nums text-white" aria-live="polite">
          {t('projects.imageCount').replace('{current}', String(index + 1)).replace('{total}', String(images.length))}
        </span>
        <span className="hidden sm:inline">{current.alt}</span>
      </p>

      {/* Arrows: bottom right on phones, at the sides from sm up. */}
      <button
        type="button"
        onClick={() => onIndexChange(index - 1)}
        disabled={!hasPrev}
        className={`${arrow} absolute bottom-4 right-20 sm:bottom-auto sm:left-7 sm:right-auto sm:top-1/2 sm:-translate-y-1/2`}
        aria-label={t('projects.prevImage')}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
      </button>
      <button
        type="button"
        onClick={() => onIndexChange(index + 1)}
        disabled={!hasNext}
        className={`${arrow} absolute bottom-4 right-4 sm:bottom-auto sm:right-7 sm:top-1/2 sm:-translate-y-1/2`}
        aria-label={t('projects.nextImage')}
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-6" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
      </button>
    </div>
  )
}
