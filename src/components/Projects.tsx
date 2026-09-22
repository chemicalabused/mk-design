import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/motion'
import { categories, projects, type Category, type Project } from '../content/site'
import { Picture } from './Picture'

export function Projects() {
  const [filter, setFilter] = useState<Category | 'wszystkie'>('wszystkie')
  const [active, setActive] = useState<Project | null>(null)
  const visible = filter === 'wszystkie' ? projects : projects.filter((p) => p.category === filter)

  useEffect(() => {
    // Cards re-mount on filter change; make sure the new ones are visible and
    // scroll positions below are recalculated.
    gsap.set('#realizacje [data-reveal]', { clearProps: 'opacity,visibility,transform' })
    ScrollTrigger.refresh()
  }, [filter])

  return (
    <section id="realizacje" className="container-page section">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="heading-lg" data-reveal>Realizacje</h2>
        <div className="flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filtruj realizacje">
          {categories.map((c) => {
            const on = c.id === filter
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(c.id)}
                className={`border-b pb-0.5 text-sm transition-colors ${
                  on ? 'border-graphite text-ink' : 'border-transparent text-slate hover:text-ink'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-12">
        {visible.map((p, i) => {
          // alternate 7/5 and 5/7 columns so the grid has a rhythm without cards
          const wide = i % 4 === 0 || i % 4 === 3
          return (
            <li key={p.id} className={wide ? 'sm:col-span-7' : 'sm:col-span-5'} data-reveal>
              <button
                type="button"
                onClick={() => setActive(p)}
                className="group block w-full text-left"
                aria-label={`${p.title}, ${p.place}, otwórz galerię`}
              >
                <div className={`overflow-hidden bg-plaster ${wide ? 'aspect-[4/3]' : 'aspect-[4/3] sm:aspect-[5/4]'}`}>
                  <Picture
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="heading-sm mt-4 max-w-[28ch]">{p.title}</h3>
                <p className="mt-1.5 text-sm text-slate">
                  {p.kind}, {p.place}, {p.year}
                  {p.area ? `, ${p.area}` : ''}
                  {p.status ? `, ${p.status}` : ''}
                </p>
              </button>
            </li>
          )
        })}
      </ul>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  )
}

function Lightbox({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (project && !el.open) el.showModal()
    if (!project && el.open) el.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-auto max-h-[100svh] w-full max-w-5xl bg-plaster p-0 text-ink backdrop:bg-graphite/80 backdrop:backdrop-blur-sm"
    >
      {project && (
        <article className="max-h-[100svh] overflow-y-auto p-5 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="heading-md">{project.title}</h3>
              <p className="mt-1 text-sm text-slate">
                {project.kind}, {project.place}, {project.year}
                {project.area ? `, ${project.area}` : ''}
              </p>
            </div>
            <button type="button" onClick={onClose} className="shrink-0 text-sm underline-offset-4 hover:underline">
              Zamknij
            </button>
          </div>
          <p className="mt-5 max-w-[68ch] leading-relaxed">{project.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.images.map((img) => (
              <Picture key={img.src} src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover" />
            ))}
          </div>
          <a
            href="#kontakt"
            onClick={onClose}
            className="mt-6 inline-block rounded-full bg-graphite px-5 py-3 text-sm font-medium text-plaster"
          >
            Zapytaj o podobny projekt
          </a>
        </article>
      )}
    </dialog>
  )
}
