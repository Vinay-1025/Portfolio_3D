import { useRef, useEffect } from 'react'
import { FaCode, FaBolt, FaTools, FaCloud, FaAngular } from 'react-icons/fa'
import {
  SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiDocker,
  SiHtml5, SiCss, SiJavascript, SiWordpress, SiFigma,
  SiGit, SiPostgresql, SiPython, SiGraphql, SiRedis, SiNextdotjs,
  SiAngular
} from 'react-icons/si'
import './Skills.css'
import { BiLogoCss3 } from 'react-icons/bi'

const skillGroups = [
  {
    category: 'Languages',
    icon: <FaCode />,
    skills: [
      { name: 'JavaScript', level: 90, color: '#f7df1e' },
      { name: 'TypeScript', level: 85, color: '#3178c6' },
      { name: 'HTML5', level: 95, color: '#e34f26' },
      { name: 'CSS3', level: 92, color: '#1572b6' },
    ]
  },
  {
    category: 'Frameworks',
    icon: <FaBolt />,
    skills: [
      { name: 'React.js', level: 88, color: '#61dafb' },
      { name: 'Angular', level: 80, color: '#dd0031' },
      { name: 'Node.js', level: 85, color: '#68dc68' },
      { name: 'Bootstrap', level: 90, color: '#7952b3' },
      { name: 'Material UI', level: 82, color: '#0081cb' },
    ]
  },
  {
    category: 'Tools & Platforms',
    icon: <FaTools />,
    skills: [
      { name: 'Git / GitHub', level: 88, color: '#f05033' },
      { name: 'Figma', level: 75, color: '#ff7262' },
      { name: 'Firebase', level: 80, color: '#ffca28' },
      { name: 'WordPress', level: 85, color: '#21759b' },
      { name: 'Linux', level: 78, color: '#fcc624' },
    ]
  },
]

const techIcons = [
  { name: 'HTML', color: '#e34f21', icon: SiHtml5 },
  { name: 'CSS', color: '#1572b6', icon: BiLogoCss3 },
  { name: 'JavaScript', color: '#f7df1e', icon: SiJavascript },
  { name: 'TypeScript', color: '#3178c6', icon: SiTypescript },
  { name: 'React', color: '#61dafb', icon: SiReact },
  { name: 'Angular', color: '#f0093bff', icon: FaAngular },
  { name: 'Node.js', color: '#68dc68', icon: SiNodedotjs },
  { name: 'MongoDB', color: '#47a248', icon: SiMongodb },
  { name: 'AWS', color: '#ff9900', icon: FaCloud },
  { name: 'Docker', color: '#2496ed', icon: SiDocker },
  { name: 'Git', color: '#f05033', icon: SiGit },
  { name: 'WordPress', color: '#21759b', icon: SiWordpress },
  { name: 'Figma', color: '#bd1ef2ff', icon: SiFigma },
]

function SpotlightCard({ children, delay, className }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      className={`spotlight-card reveal ${className || ''}`}
      style={{ transitionDelay: delay }}
      onMouseMove={handleMouseMove}
    >
      <div className="spotlight-card-content">
        {children}
      </div>
    </div>
  )
}

function SkillBadge({ name, color }) {
  return (
    <div className="skill-badge" style={{ '--badge-color': color }}>
      <span className="skill-badge-dot" />
      <span className="skill-badge-name">{name}</span>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="skills__bg-decor" />
      <div className="container">
        <div className="reveal skills-header-wrapper" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>02. Technical Arsenal</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Tools & Technologies</h2>
          <p className="skills-subtitle">
            A comprehensive suite of technologies I leverage to architect and deploy modern, robust digital experiences.
          </p>
        </div>

        {/* Infinite Tech Marquee */}
        <div className="tech-marquee-wrapper reveal" style={{ transitionDelay: '0.1s' }}>
          <div className="tech-marquee">
            {/* Double the array for seamless infinite looping */}
            {[...techIcons, ...techIcons].map((tech, i) => {
              const IconComponent = tech.icon
              return (
                <div key={`${tech.name}-${i}`} className="marquee-chip">
                  <span className="marquee-symbol" style={{ color: tech.color }}>
                    <IconComponent size={24} />
                  </span>
                  <span className="marquee-name">{tech.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bento Grid Skill Groups */}
        <div className="skill-bento-grid">
          {skillGroups.map((group, gi) => (
            <SpotlightCard
              key={group.category}
              delay={`${gi * 0.15 + 0.2}s`}
              className={`bento-box bento-box-${gi + 1}`}
            >
              <div className="bento-header">
                <div className="bento-icon-wrapper">{group.icon}</div>
                <h3 className="bento-title">{group.category}</h3>
              </div>
              <div className="bento-skills">
                {group.skills.map(skill => (
                  <SkillBadge key={skill.name} name={skill.name} color={skill.color} />
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
