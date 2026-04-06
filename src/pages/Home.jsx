import { useEffect } from 'react'
import '../index.css'
import '../App.css'
import Cursor from '../components/Cursor'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import MobileProjects from '../components/MobileProjects'
import Education from '../components/Education'
import Certifications from '../components/Certifications'
import Experience from '../components/Experience'
import Team from '../components/Team'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ParticleField from '../components/ParticleField'
import SpaceShipCursor from '../components/SpaceShipCursor'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <Helmet>
        <title>Vinay Sriram Gavara | Full Stack Developer</title>
        <meta name="description" content="Vinay Sriram Gavara — Full Stack Developer & Software Engineer. Explore my 3D animated portfolio showcasing modern web applications, robust backend systems, and creative UI/UX." />
        <meta property="og:title" content="Vinay Sriram Gavara | Full Stack Developer" />
        <meta property="og:description" content="Explore my 3D animated portfolio showcasing modern web applications, robust backend systems, and creative UI/UX." />
      </Helmet>
      <SpaceShipCursor />
      <Cursor />
      <ParticleField interactive={true} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <div id="projects">
          <div className="desktop-only">
            <Projects />
          </div>
          <div className="mobile-only">
            <MobileProjects />
          </div>
        </div>
        <Certifications />
        <Experience />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
