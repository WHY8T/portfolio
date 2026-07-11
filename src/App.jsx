import { useState } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Dock from './components/Dock'
import Background from './components/Background'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Certifications from './components/sections/Certifications'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Loader onFinished={() => setReady(true)} />
      <CustomCursor />

      {/* Static background layer, shared by the whole page */}
      <Background />

      <Navbar />

      <main
        className="relative z-10"
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.8s ease-out',
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
        <Contact />
        <Footer />
        <Dock />
      </main>
    </>
  )
}
