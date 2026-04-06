import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import './Hero.css'
import ThreeScene from './ThreeScene'

const roles = ['React Developer', 'Software Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Freelancer']

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const role = roles[roleIndex]
    let timeout
    if (!deleting && charIndex <= role.length) {
      timeout = setTimeout(() => {
        setDisplayText(role.slice(0, charIndex))
        setCharIndex(c => c + 1)
      }, 80)
    } else if (!deleting && charIndex > role.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayText(role.slice(0, charIndex))
        setCharIndex(c => c - 1)
      }, 40)
    } else {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
      setCharIndex(0)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  // Mouse Parallax for Character
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 20 // -10 to 10
      const y = (e.clientY / innerHeight - 0.5) * 20 // -10 to 10
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="hero__three-bg">
        <ThreeScene />
      </div>

      <Container className="hero__inner">
        <Row className="align-items-center justify-content-center">
          <Col lg={7} className="hero__content-col">
            <motion.div
              className="hero__content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero__greeting">
                <span className="greeting-pill">Hello, I'm</span>
              </div>
              <h1 className="hero__name">
                Vinay Sriram <span className="hero__name-accent">Gavara</span>
              </h1>
              <div className="hero__role">
                <span className="role-prefix">{'>'}&nbsp;</span>
                <span className="role-text"> {displayText}</span>
                <span className="role-cursor">_</span>
              </div>
              <p className="hero__tagline">
                Building real-world applications that solve problems, not just interfaces.
              </p>
              <p className="hero__bio">
                Full Stack Developer specializing in building scalable, high-performance web applications
                with a strong focus on frontend excellence. Experienced in React, Angular, and modern UI systems,
                with hands-on experience developing real-world products, dashboards, and enterprise applications.
              </p>
              <div className="hero__actions">
                <a href="#projects" className="btn-primary"><span>View My Work</span></a>
                <a href="/resume.pdf" download className="btn-secondary resume-btn">
                  <span>Download Resume</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </Col>

          <Col lg={5} className="hero__right-col">
            {/* Right side — Realistic AI Character with Mouse Parallax */}
            <motion.div
              className="hero__right hero__right--realistic"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="hero__char-container"
                animate={{ x: mousePos.x * -1.5, y: mousePos.y * -1.5, rotateY: mousePos.x * 0.5, rotateX: mousePos.y * -0.5 }}
                transition={{ type: "spring", stiffness: 75, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="hero__char-glow-halo" />
                <img
                  src="/char_realistic_hero.png"
                  alt="Vinay Sriram Gavara - Realistic Character"
                  className="hero__char-img"
                  style={{ transform: 'translateZ(30px)' }}
                />
                <div className="hero__char-reflection" />
              </motion.div>

              {/* Stats quick view with opposite parallax */}
              <motion.div
                className="hero__stats hero__stats--realistic"
                animate={{ x: mousePos.x * 1, y: mousePos.y * 1 }}
                transition={{ type: "spring", stiffness: 75, damping: 20 }}
              >
                <div className="stat-item glass-card">
                  <span className="stat-val">1+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item glass-card">
                  <span className="stat-val">5+</span>
                  <span className="stat-label">Real-world Systems</span>
                </div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <div className="hero__scroll-indicator">
        <div className="mouse">
          <div className="wheel" />
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  )
}
