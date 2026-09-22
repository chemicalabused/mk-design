import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { CaseStudy } from './components/CaseStudy'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Studio } from './components/Studio'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Motion } from './components/Motion'

function App() {
  return (
    <Motion>
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-graphite focus:px-4 focus:py-2 focus:text-sm focus:text-plaster"
      >
        Przejdź do treści
      </a>
      <Nav />
      <main id="tresc">
        <Hero />
        <Projects />
        <CaseStudy />
        <Services />
        <Process />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </Motion>
  )
}

export default App
