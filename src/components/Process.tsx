import { process } from '../content/site'

export function Process() {
  return (
    <section id="proces" className="bg-plaster">
      <div className="container-page py-20 sm:py-28">
        <h2 className="heading-lg">Jak przebiega współpraca</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {process.map((step, i) => (
            <li key={step.title} className="border-t border-line pt-5">
              <span className="font-display text-4xl text-brass">{i + 1}</span>
              <h3 className="heading-md mt-3">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-slate">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
