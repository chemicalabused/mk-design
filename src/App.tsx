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
      <Nav />
      <main>
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
