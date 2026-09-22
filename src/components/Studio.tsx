import { studio } from '../content/site'
import { Picture } from './Picture'

export function Studio() {
  return (
    <section id="pracownia" className="container-page section">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Picture src={studio.portrait.src} alt={studio.portrait.alt} className="aspect-[4/5] w-full object-cover object-top" />
          <p className="mt-4 font-display text-xl">{studio.name}</p>
          <p className="text-sm text-slate">{studio.role}</p>
        </div>
        <div className="lg:col-span-7">
          <h2 className="heading-lg">Pracownia</h2>
          {studio.bio.map((t) => (
            <p key={t} className="mt-6 max-w-[58ch] text-lg leading-relaxed">
              {t}
            </p>
          ))}
          <div className="mt-12 border-t border-line pt-8">
            <h3 className="heading-md">{studio.earlier.heading}</h3>
            <p className="mt-3 max-w-[58ch] leading-relaxed text-slate">{studio.earlier.text}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {studio.earlier.images.map((img) => (
                <Picture key={img.src} src={img.src} alt={img.alt} className="aspect-[3/2] w-full object-cover" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
