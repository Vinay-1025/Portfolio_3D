import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaGraduationCap, FaSchool, FaTrophy, FaDownload } from 'react-icons/fa'
import './Education.css'

const education = [
  {
    degree: 'B.Tech, Computer Science',
    field: 'Computer Science & Engineering',
    institution: 'Rajiv Gandhi University of Knowledge Technologies - Srikakulam',
    period: '2021 — 2025',
    grade: 'CGPA: 8.72 / 10',
    description: 'Focused on core CS principles, web development, and practical software engineering. Active lead in technical events and training.',
    highlights: ['DSA', 'Web Technologies', 'Software Engineering', 'Placement Coordination'],
    icon: <FaGraduationCap />,
    color: '#00f5ff',
  },
  {
    degree: 'Pre-University Course',
    field: 'Mathematics, Physics & Chemistry',
    institution: 'Rajiv Gandhi University of Knowledge Technologies - Srikakulam',
    period: '2019 — 2021',
    grade: 'CGPA: 9.21 / 10',
    description: 'Specialized in pure sciences with a strong academic performance across all technical subjects.',
    highlights: ['Mathematics', 'Physics', 'Chemistry', 'English Literary Club'],
    icon: <FaSchool />,
    color: '#ffb347',
  },
  {
    degree: 'SSC (Secondary School)',
    field: 'General Studies',
    institution: 'Zilla Parishad High School - Kothapalem',
    period: '2018 — 2019',
    grade: 'CGPA: 9.8 / 10',
    description: 'Achieved high academic distinction and developed a strong foundation for higher technical studies.',
    highlights: ['General Science', 'Mathematics', 'Leadership', 'Quizzing'],
    icon: <FaTrophy />,
    color: '#a78bfa',
  },
]

export default function Education() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="education" className="section education" ref={containerRef}>
      <div className="edu__bg-glow" />
      <div className="container">
        <motion.div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>03. Education</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Academic Journey</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
            The foundations that built my engineering career and technical mindset.
          </p>
        </motion.div>

        <div className="edu-vertical-timeline">
          <motion.div
            className="edu-line"
            style={{ scaleY, originY: 0 }}
          />
          {education.map((edu, i) => (
            <div key={i} className={`edu-item-wrapper ${i % 2 === 0 ? 'edu-item--left' : 'edu-item--right'}`}>
              <motion.div
                className="edu-item-3d"
                initial={{ opacity: 0, rotateY: i % 2 === 0 ? -45 : 45, x: i % 2 === 0 ? -100 : 100, z: -100 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0, z: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="edu-dot" style={{ background: edu.color }}>
                  <span className="edu-icon-small" style={{ color: '#fff' }}>{edu.icon}</span>
                </div>
                <div className="edu-content glass-card" style={{ '--edu-accent': edu.color }}>
                  <div className="edu-period" style={{ color: edu.color }}>{edu.period}</div>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <p className="edu-institution">{edu.institution}</p>
                  <div className="edu-grade">{edu.grade}</div>
                  <p className="edu-description">{edu.description}</p>
                  <div className="edu-tags">
                    {edu.highlights.map(h => (
                      <span key={h} className="edu-tag" style={{ border: `1px solid ${edu.color}25`, color: edu.color }}>{h}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          className="edu-resume-cta reveal"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="resume-cta-card glass-card" style={{ padding: '2rem' }}>
            <div className="resume-cta-text">
              <h4>Want the full roadmap?</h4>
              <p>Download my professional resume for a complete overview of my journey.</p>
            </div>
            <a href="/Vinaysriram_gavara_Resume_1.pdf" download="Vinay_Sriram_Gavara_Resume.pdf" className="btn-primary">
              <span>Download Resume</span>
              <FaDownload size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
