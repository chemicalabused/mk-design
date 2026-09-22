import { services } from '../content/site'

export function Services() {
  return (
    <section id="uslugi" className="container-page section">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <h2 className="heading-lg lg:col-span-5">Co robimy</h2>
        <p className="max-w-[46ch] leading-relaxed text-slate lg:col-span-7 lg:pt-3">
          Cztery rzeczy, które zwykle robi się w czterech różnych firmach. U nas w jednej, z wizualizacją 3D w każdym projekcie.
        </p>
      </div>
      <dl className="mt-12">
        {services.map((s) => (
          <div key={s.title} className="grid gap-2 border-t border-line py-7 lg:grid-cols-12 lg:gap-8">
            <dt className="heading-md lg:col-span-5">{s.title}</dt>
            <dd className="max-w-[60ch] leading-relaxed text-slate lg:col-span-7">{s.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
