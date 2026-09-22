import { services } from '../content/site'

export function Services() {
  return (
    <section id="uslugi" className="container-page py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="heading-lg">Co robimy</h2>
          <p className="mt-6 max-w-[40ch] leading-relaxed text-slate">
            Cztery rzeczy, które zwykle robi się w czterech różnych firmach. U nas w jednej, z wizualizacją 3D w każdym projekcie.
          </p>
        </div>
        <dl className="lg:col-span-8">
          {services.map((s) => (
            <div key={s.title} className="grid gap-2 border-t border-line py-7 sm:grid-cols-12 sm:gap-6">
              <dt className="heading-md sm:col-span-5">{s.title}</dt>
              <dd className="leading-relaxed text-slate sm:col-span-7">{s.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
