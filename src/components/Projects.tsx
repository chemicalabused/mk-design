import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap, ScrollTrigger, REDUCE } from '../lib/motion'
import { categories, projects, type Category, type Project } from '../content/site'
import { Picture } from './Picture'
import { ImageViewer } from './ImageViewer'
import { imageAt } from '../lib/images'
import { useLanguage } from '../lib/i18n'

// Rendered widths for srcset. Cards take ~7/12 of the 1472px content box at
// most; gallery tiles are half of the 1024px dialog minus padding. On phones
// both are ~350px wide, but the hint says 260px: that caps a 3x screen at the
// 800px variant (260 x 3 = 780; 267 would ask for 801 and get 1200px), which
// looks the same at that size and is about half the bytes of the 1200px one.
const CARD_SIZES = '(min-width: 1600px) 860px, (min-width: 640px) 58vw, 260px'
const TILE_SIZES = '(min-width: 1072px) 475px, (min-width: 640px) calc(50vw - 3.5rem), 260px'

export function Projects() {
  const { t, localizeProject } = useLanguage()
  const [filter, setFilter] = useState<Category | 'wszystkie'>('wszystkie')
  const [active, setActive] = useState<Project | null>(null)
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)
  // Order comes from site.ts. Memoised so hovering a card (state above)
  // does not rebuild every localised project.
  const visible = useMemo(
    () => (filter === 'wszystkie' ? projects : projects.filter((p) => p.category === filter)).map(localizeProject),
    [filter, localizeProject],
  )
  // The card that opened the gallery gets focus back when it closes. The
  // Lightbox remounts per project (key below), so the dialog is gone before
  // the browser could restore focus itself.
  const opener = useRef<HTMLElement | null>(null)
  const rows = Array.from({ length: Math.ceil(visible.length / 2) }, (_, index) => visible.slice(index * 2, index * 2 + 2))

  // Cards re-mount on filter change; make sure the new ones are visible and
  // scroll positions below are recalculated. Skipped on first render so the
  // initial rows keep their scroll reveal (Motion.tsx).
  const shownFilter = useRef(filter)
  useEffect(() => {
    if (shownFilter.current === filter) return
    shownFilter.current = filter
    gsap.set('#realizacje [data-reveal]', { clearProps: 'opacity,visibility,transform' })
    ScrollTrigger.refresh()
  }, [filter])

  return (
    <section id="realizacje" className="container-page section">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="heading-lg">{t('projects.heading')}</h2>
        <div className="-mx-5 flex gap-x-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none]" role="group" aria-label={t('projects.filter')}>
          {categories.map((c) => {
            const on = c.id === filter
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setHoveredProjectId(null)
                  setFilter(c.id)
                }}
                className={`shrink-0 border-b pb-0.5 text-sm transition-colors ${
                  on ? 'border-graphite text-ink' : 'border-transparent text-slate hover:text-ink'
                }`}
              >
                {t(c.key)}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-10 flex flex-col gap-y-10">
        {rows.map((pair, rowIndex) => {
          const hoveredIndex = pair.findIndex((p) => p.id === hoveredProjectId)
          // Keep the alternating 7/5 composition, but let the hovered card take the wider share.
          const wideIndex = hoveredIndex >= 0 ? hoveredIndex : rowIndex % 2 === 0 ? 0 : 1
          return (
            <li
              key={`${filter}-${rowIndex}`}
              className="flex flex-col gap-y-10 sm:flex-row sm:gap-x-6"
              data-reveal
              onPointerLeave={(event) => {
                if (event.pointerType !== 'touch') setHoveredProjectId(null)
              }}
            >
              {pair.map((p, index) => {
                const wide = index === wideIndex
                return (
                  <div
                    key={p.id}
                    className={`w-full min-w-0 sm:basis-0 sm:transition-[flex-grow] sm:duration-700 sm:ease-in-out ${pair.length === 1 ? 'sm:max-w-[58.333%]' : ''}`}
                    style={{ flexGrow: wide ? 7 : 5 }}
                  >
                    <button
                      type="button"
                      onPointerEnter={(event) => {
                        if (event.pointerType !== 'touch') setHoveredProjectId(p.id)
                      }}
                      onFocus={() => setHoveredProjectId(p.id)}
                      onBlur={(event) => {
                        const row = event.currentTarget.closest('li')
                        if (!row?.contains(event.relatedTarget as Node | null)) setHoveredProjectId(null)
                      }}
                      onClick={(event) => {
                        opener.current = event.currentTarget
                        setActive(p)
                      }}
                      className="group block w-full text-left"
                      aria-label={`${p.title}${p.place ? `, ${p.place}` : ''}, ${t('projects.openGallery')}`}
                    >
                      <div className="relative isolate aspect-[4/3] overflow-hidden rounded-media bg-plaster">
                        {p.videos?.length ? (
                          <ProjectCover project={p} active={p.id === hoveredProjectId} />
                        ) : (
                          <Picture
                            src={p.images[0].src}
                            alt={p.images[0].alt}
                            sizes={CARD_SIZES}
                            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                          />
                        )}
                        <span
                          className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-plaster/95 px-4 py-2.5 text-xs font-medium text-ink shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:translate-y-2 sm:opacity-0"
                          aria-hidden="true"
                        >
                          {t('projects.open')}
                          <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 10h12m-5-5 5 5-5 5" /></svg>
                        </span>
                      </div>
                      <h3 className="heading-sm mt-4 max-w-[28ch] underline decoration-transparent underline-offset-[5px] transition-colors duration-300 group-hover:decoration-graphite/60">{p.title}</h3>
                      <p className="mt-1.5 text-sm text-slate">
                        {[p.kind, p.place, p.year, p.area].filter(Boolean).join(' · ')}
                      </p>
                      <p className="mt-1 text-xs tracking-wide text-brass">{p.status}</p>
                    </button>
                  </div>
                )
              })}
            </li>
          )
        })}
      </ul>

      <Lightbox
        key={active?.id ?? 'closed'}
        project={active}
        onClose={() => {
          setActive(null)
          requestAnimationFrame(() => opener.current?.focus())
        }}
      />
    </section>
  )
}

function Lightbox({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDialogElement>(null)
  const [zoomIndex, setZoomIndex] = useState<number | null>(null)

  // Leaving the viewer returns focus to the tile of the image the visitor
  // ended on, which may not be the one they opened.
  function closeZoom() {
    const last = zoomIndex
    setZoomIndex(null)
    requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>(`[data-zoom-index="${last}"]`)?.focus())
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (project && !el.open) el.showModal()
    if (!project && el.open) el.close()
    if (!project) return
    // Only the dialog should scroll while it is open; otherwise the wheel
    // chains to the page underneath once the gallery reaches its end.
    // Pad by the scrollbar width so the page does not jump sideways.
    const root = document.documentElement
    root.style.paddingRight = `${window.innerWidth - root.clientWidth}px`
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = ''
      root.style.paddingRight = ''
    }
  }, [project])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={(event) => {
        if (zoomIndex !== null) {
          event.preventDefault()
          closeZoom()
        }
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-auto max-h-[100svh] w-full max-w-5xl overflow-hidden bg-plaster p-0 text-ink backdrop:bg-graphite/80 backdrop:backdrop-blur-sm sm:max-h-[calc(100svh-3rem)] sm:w-[calc(100%-3rem)] sm:rounded-media"
    >
      {project && (
        // inert while the image viewer is open, so Tab cannot reach the
        // gallery hidden behind it.
        <article inert={zoomIndex !== null} className="max-h-[100svh] overflow-y-auto overscroll-contain p-5 sm:max-h-[calc(100svh-3rem)] sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="heading-md">{project.title}</h3>
              <p className="mt-1 text-sm text-slate">
                {[project.kind, project.place, project.year, project.area].filter(Boolean).join(' · ')}
              </p>
              <p className="mt-1 text-xs tracking-wide text-brass">{project.status}</p>
            </div>
            <button type="button" onClick={onClose} className="shrink-0 text-sm underline-offset-4 hover:underline">
              {t('projects.close')}
            </button>
          </div>
          <p className="mt-5 max-w-[68ch] leading-relaxed">{project.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.videos?.map((clip, index) => (
              <figure key={clip.src} className="min-w-0 sm:col-span-2">
                <div className="isolate aspect-video overflow-hidden rounded-media bg-graphite">
                  <VideoFigure
                    src={clip.src}
                    startAt={clip.startAt}
                    playbackRate={clip.playbackRate ?? 1}
                    poster={imageAt((project.coverImage ?? project.images[0]).src, 1200)}
                    label={`${project.title}, ${t('projects.film')} ${index + 1}`}
                  />
                </div>
                <figcaption className="mt-2 text-xs text-slate">
                  {t('projects.film')} {index + 1}{clip.hasAudio === false ? ` · ${t('projects.noSound')}` : ` · ${t('projects.videoSound')}`}
                </figcaption>
              </figure>
            ))}
            {project.images.map((img, imageIndex) => (
              <figure key={img.src} className="min-w-0">
                <div className={`isolate aspect-[4/3] overflow-hidden rounded-media ${img.type === 'plan' || img.type === 'elevation' ? 'bg-white' : 'bg-graphite/5'}`}>
                  <button
                    type="button"
                    data-zoom-index={imageIndex}
                    onClick={() => setZoomIndex(imageIndex)}
                    className="group relative block h-full w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass"
                    aria-label={`${t('projects.zoom')}: ${img.alt}`}
                  >
                  <Picture
                    src={img.src}
                    alt={img.alt}
                    sizes={TILE_SIZES}
                    className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] ${img.type === 'plan' || img.type === 'elevation' ? 'object-contain' : 'object-cover'}`}
                  />
                    <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-graphite/75 text-white opacity-80 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-graphite group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.7"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                </div>
                <figcaption className="mt-2 text-xs text-slate">
                  {img.type === 'plan' ? t('projects.plan') : img.type === 'elevation' ? t('projects.elevation') : img.type === 'photo' ? t('projects.photo') : t('projects.render')}
                </figcaption>
              </figure>
            ))}
          </div>
          <a
            href="#kontakt"
            onClick={onClose}
            className="mt-6 inline-block rounded-full bg-graphite px-5 py-3 text-sm font-medium text-plaster"
          >
            {t('projects.askSimilar')}
          </a>
        </article>
      )}
      {project && zoomIndex !== null && (
        <ImageViewer images={project.images} index={zoomIndex} onIndexChange={setZoomIndex} onClose={closeZoom} />
      )}
    </dialog>
  )
}

// Card cover: a responsive, lazy image that is always there, with the
// project's video layered on top only once the card is near the viewport.
// Until then no poster or video bytes are fetched.
function ProjectCover({ project, active }: { project: Project; active: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [clipIndex, setClipIndex] = useState(0)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  // Touch screens have no hover, so the loop plays while the card is on
  // screen, unless the visitor prefers reduced motion. Hover-to-play stays,
  // since the visitor starts it.
  const [autoplay, setAutoplay] = useState(false)
  const clips = project.videos ?? []
  const clip = clips[clipIndex]
  const cover = project.coverImage ?? project.images[0]

  useEffect(() => {
    const hoverless = window.matchMedia('(hover: none)')
    const reduce = window.matchMedia(REDUCE)
    const update = () => setAutoplay(hoverless.matches && !reduce.matches)
    update()
    hoverless.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      hoverless.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el || !clip) return
    const nearby = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNear(true)
        nearby.disconnect()
      }
    }, { rootMargin: '400px 0px' })
    const onScreen = new IntersectionObserver(([entry]) => {
      setVisible(entry.intersectionRatio >= 0.3)
    }, { threshold: [0, 0.3] })
    nearby.observe(el)
    onScreen.observe(el)
    return () => {
      nearby.disconnect()
      onScreen.disconnect()
    }
  }, [clip])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (visible && (autoplay || active)) void video.play().catch(() => {})
    else video.pause()
  }, [active, autoplay, near, visible, clipIndex])

  return (
    <div ref={root} className="relative h-full w-full">
      <Picture
        src={cover.src}
        alt={cover.alt}
        sizes={CARD_SIZES}
        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
      />
      {clip && near && (
        <video
          ref={videoRef}
          key={clip.src}
          src={clip.src}
          muted
          playsInline
          loop={clips.length === 1}
          preload={autoplay ? 'metadata' : 'none'}
          onLoadedMetadata={(event) => {
            event.currentTarget.playbackRate = clip.playbackRate ?? 1
            if (clip.startAt > 0) event.currentTarget.currentTime = clip.startAt
          }}
          onPlaying={() => setPlaying(true)}
          onEnded={() => {
            if (clips.length < 2) return
            // Hide until the next clip has a frame, or it shows black.
            setPlaying(false)
            setClipIndex((index) => (index + 1) % clips.length)
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

function VideoFigure({ src, startAt, playbackRate, poster, label }: { src: string; startAt: number; playbackRate: number; poster: string; label: string }) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      muted={false}
      playsInline
      preload="metadata"
      onLoadedMetadata={(event) => {
        event.currentTarget.playbackRate = playbackRate
        event.currentTarget.currentTime = startAt
      }}
      className="h-full w-full object-cover"
      aria-label={label}
    />
  )
}
