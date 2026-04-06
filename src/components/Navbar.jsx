import { useState, useEffect } from 'react'
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const { pathname } = useLocation()
  const pfx = pathname === '/' ? '' : '/'

  useEffect(() => {
    const NAVBAR_HEIGHT = 90

    const updateActive = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map(link => {
        const el = document.getElementById(link.href.slice(1))
        if (!el) return null
        return {
          id: link.href.slice(1),
          top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT,
        }
      }).filter(Boolean)

      const scrollPos = window.scrollY
      let current = ''

      // If at the very top, before the first actual section (About)
      if (sections.length > 0 && scrollPos < sections[0].top - 200) {
        current = '' // Hero state
      } else {
        for (const section of sections) {
          if (scrollPos >= section.top - 120) {
            current = section.id
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive() // run on mount
    return () => window.removeEventListener('scroll', updateActive)
  }, [])

  return (
    <BootstrapNavbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
    >
      <Container>
        <BootstrapNavbar.Brand href={`${pfx}#`} className="navbar__logo">
          <span className="logo-bracket" style={{ color: 'var(--cyan)' }}>&lt;</span>
          <span className="logo-name">VSG</span>
          <span className="logo-bracket" style={{ color: 'var(--cyan)' }}>/&gt;</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar__hamburger" aria-label="Toggle navigation">
          <span /><span /><span />
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="navbar__right">
          <Nav className="ms-auto navbar__links align-items-lg-center">
            {navLinks.map((link, i) => (
              <Nav.Link
                key={link.href}
                href={`${pfx}${link.href}`}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                active={activeSection === link.href.slice(1)}
                onClick={() => setExpanded(false)}
              >
                <span className="link-num d-none d-lg-inline">0{i + 1}.</span>
                {link.label}
              </Nav.Link>
            ))}
            <Nav.Link
              href="/Vinaysriram_gavara_Resume_1.pdf"
              download
              className="btn-primary navbar__resume text-center"
              onClick={() => setExpanded(false)}
            >
              <span>Resume</span>
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}
