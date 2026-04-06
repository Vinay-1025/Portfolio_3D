import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBriefcase, FaExternalLinkAlt, FaCalendarAlt, FaBuilding, FaCode, FaArrowRight } from 'react-icons/fa'
import { MdWorkOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './Experience.css'

const experiences = [
  {
    id: 'accelyzei',
    role: 'Full Stack Developer Intern',
    company: 'Accelyzei Technologies Pvt. Ltd.',
    period: 'July 2025 — Present',
    type: 'Internship',
    location: 'Remote, India',
    color: '#00f5ff',
    summary: 'Built and shipped multiple production-ready full-stack applications including a financial management platform, HRMS, and the official company website.',
    tech: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'WordPress', 'Elementor'],
    projects: [
      {
        name: 'Bill Stack — Financial Management System',
        desc: 'A full-featured financial management platform with role-based dashboards for admins, managers, and employees. Includes invoice generation, expense tracking, and real-time financial reporting.',
        tech: ['React.js', 'Redux', 'Node.js', 'MongoDB'],
        highlights: ['Role-based access control', 'Real-time dashboards', 'Category management', 'Expense analytics', 'Invoice generation', 'Payroll management'],
        projectId: 5,
      },
      {
        name: 'HRMS — Human Resource Management System',
        desc: 'Comprehensive HRMS covering the full employee lifecycle — from onboarding to payroll, leave management, attendance tracking, and performance reviews.',
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
        highlights: ['Employee onboarding', 'Payroll management', 'Leave & attendance tracking', 'Performance reviews'],
        projectId: 6,
      },
      {
        name: 'Aerosilicon Technologies — Official Website',
        desc: 'Designed and developed the company\'s official marketing website with SEO optimization, responsive design, and interactive animations.',
        tech: ['WordPress', 'Elementor', 'CSS3'],
        highlights: ['SEO optimized', 'Fully responsive'],
        projectId: 7,
      },
    ],
  },
  {
    id: 'bioline',
    role: 'Frontend Developer',
    company: 'Bioline Dental Labs',
    period: '2024 (Freelancing Project)',
    type: 'Freelance / Contract',
    location: 'Remote',
    color: '#ffb347',
    summary: 'Designed and delivered a real-time web-based application for dental lab operations management with a focus on clean UI and secure authentication.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Node.js', 'Express.js', 'MySQL'],
    projects: [
      {
        name: 'Dental Lab Management Software',
        desc: 'A comprehensive web application to digitize dental lab operations. Streamlined workflows for order tracking, patient records, technician assignments, and delivery scheduling.',
        tech: ['HTML', 'CSS', 'Bootstrap', 'Node.js', 'MySQL'],
        highlights: ['JWT authentication', 'Interactive dashboards', 'Order management', 'Real-time tracking'],
        projectId: 9,
      },
    ],
  },
]

export default function Experience() {
  const [activeExp, setActiveExp] = useState(experiences[0].id)
  const [expandedProject, setExpandedProject] = useState(null)

  const active = experiences.find(e => e.id === activeExp)

  return (
    <section id="experience" className="section experience">
      <div className="exp__bg" />
      <Container>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>06. Experience</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>My Journey</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
            Real-world roles where I shipped products, led features, and grew as an engineer.
          </p>
        </div>

        <div className="exp-layout">
          {/* Company Tabs */}
          <div className="exp-tabs">
            {experiences.map(exp => (
              <button
                key={exp.id}
                className={`exp-tab ${activeExp === exp.id ? 'exp-tab--active' : ''}`}
                onClick={() => { setActiveExp(exp.id); setExpandedProject(null) }}
                style={{ '--tab-color': exp.color }}
              >
                <span className="exp-tab__dot" style={{ background: exp.color }} />
                <div className="exp-tab__info">
                  <span className="exp-tab__company">{exp.company}</span>
                  <span className="exp-tab__role">{exp.role}</span>
                  <span className="exp-tab__period">{exp.period}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Company Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp}
              className="exp-content"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* Company Header */}
              <div className="exp-content__header glass-card" style={{ '--company-color': active.color }}>
                <div className="exp-content__title-row">
                  <div>
                    <h3 className="exp-content__role">{active.role}</h3>
                    <div className="exp-content__company" style={{ color: active.color }}>
                      <FaBuilding size={12} style={{ marginRight: 6 }} />
                      {active.company}
                    </div>
                  </div>
                  <div className="exp-content__meta">
                    <span className="exp-meta-pill" style={{ borderColor: active.color, color: active.color }}>
                      <FaCalendarAlt size={11} /> {active.period}
                    </span>
                    <span className="exp-type-pill">{active.type}</span>
                  </div>
                </div>
                <p className="exp-content__summary">{active.summary}</p>
                <div className="exp-tech-row">
                  {active.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="exp-projects">
                <div className="exp-projects__label">
                  <FaCode size={13} style={{ color: active.color }} />
                  <span style={{ color: active.color }}>{active.projects.length} Project{active.projects.length > 1 ? 's' : ''} Delivered</span>
                </div>
                <div className="exp-projects__grid">
                  {active.projects.map((proj, i) => (
                    <motion.div
                      key={proj.name}
                      className={`proj-card glass-card ${expandedProject === i ? 'proj-card--expanded' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                      style={{ '--proj-color': active.color, cursor: 'pointer' }}
                    >
                      <div className="proj-card__header">
                        <div className="proj-card__num" style={{ color: active.color }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <h4 className="proj-card__name">{proj.name}</h4>
                        <div className="proj-card__toggle" style={{ color: active.color }}>
                          {expandedProject === i ? '−' : '+'}
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedProject === i && (
                          <motion.div
                            className="proj-card__body"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="proj-card__desc">{proj.desc}</p>
                            <div className="proj-card__highlights">
                              {proj.highlights.map(h => (
                                <span key={h} className="proj-highlight" style={{ borderColor: `${active.color}40`, color: active.color }}>
                                  ✦ {h}
                                </span>
                              ))}
                            </div>
                            <div className="proj-card__tech">
                              {proj.tech.map(t => (
                                <span key={t} className="tech-tag">{t}</span>
                              ))}
                            </div>
                            {/* {proj.projectId && (
                              <div style={{ marginTop: '1.5rem' }} className='know-more'>
                                <Link
                                  to={`/project/${proj.projectId}`}
                                  className="btn-primary"
                                  style={{ background: active.color, borderColor: active.color, color: 'black', padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}
                                >
                                  <span>Know More <FaArrowRight size={10} style={{ marginLeft: '6px' }} /></span>
                                </Link>
                              </div>
                            )} */}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
