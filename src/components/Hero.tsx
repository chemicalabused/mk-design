import { hero } from '../content/site'
import { Picture } from './Picture'

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="grid min-h-svh grid-cols-1 lg:grid-cols-12">
        <div className="relative order-first h-[58svh] lg:order-last lg:col-span-7 lg:h-auto lg:min-h-svh">
          <Picture
            src={hero.image.src}
            alt={hero.image.alt}
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-end px-5 pb-10 pt-10 sm:px-8 lg:col-span-5 lg:justify-center lg:px-12 lg:pt-28">
          <h1 className="heading-xl reveal">
            {hero.headline.map((line, i) => (
              <span key={line} className="block" style={{ animationDelay: `${i * 90}ms` }}>
                {line}
              </span>
            ))}
          </h1>
          <p className="reveal mt-6 max-w-[42ch] text-base leading-relaxed text-slate sm:text-lg" style={{ animationDelay: '320ms' }}>
            {hero.lead}
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3" style={{ animationDelay: '420ms' }}>
            <a
              href={hero.primary.href}
              className="rounded-full bg-graphite px-6 py-3.5 text-sm font-medium text-plaster transition-colors hover:bg-ink"
            >
              {hero.primary.label}
            </a>
            <a
              href={hero.secondary.href}
              className="rounded-full border border-graphite/40 px-6 py-3.5 text-sm font-medium transition-colors hover:border-graphite"
            >
              {hero.secondary.label}
            </a>
          </div>
          <ul className="reveal mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-slate sm:flex-row sm:flex-wrap sm:gap-x-8" style={{ animationDelay: '520ms' }}>
            {hero.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
