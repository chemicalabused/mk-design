import { process } from '../content/site'

export function Process() {
  return (
    <section id="proces" className="bg-plaster">
      <div className="container-page section grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="heading-lg">Jak przebiega współpraca</h2>
          <p className="mt-5 max-w-[40ch] leading-relaxed text-slate">
            Cztery etapy, ten sam zespół od pierwszego do ostatniego. Można zatrzymać się po dokumentacji albo pójść z nami do końca.
          </p>
        </div>
        <ol className="lg:col-span-7">
          {process.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line py-6 first:border-t-0 first:pt-0 lg:first:pt-1">
              <span className="font-display text-2xl leading-none text-brass">{i + 1}</span>
              <div>
                <h3 className="heading-md">{step.title}</h3>
                <p className="mt-2 max-w-[56ch] leading-relaxed text-slate">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
