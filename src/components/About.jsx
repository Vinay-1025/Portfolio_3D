import { FaMapMarkerAlt, FaCircle, FaBullseye, FaRocket, FaLightbulb, FaGraduationCap } from 'react-icons/fa'
import './About.css'

function Hl({ children, color = 'var(--cyan)' }) {
  return (
    <span className="about-highlight" style={{ '--hl-color': color }}>
      {children}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__inner">
          <div className="about__left reveal-left">
            <div className="section-label">01. About Me</div>
            <h2 className="section-title">Turning Ideas Into<br />Digital Reality</h2>

            <p className="about__bio">
              Hi! I'm <Hl>Vinay Sriram Gavara</Hl>, a passionate and detail-oriented{' '}
              <Hl color="var(--amber)">Full Stack Web Developer</Hl> with a strong focus on{' '}
              <Hl color="rgba(204, 155, 252, 1)">frontend development</Hl>. I specialize in building{' '}
              <Hl color="rgba(133, 234, 143, 1)">responsive</Hl>,{' '}
              <Hl color="#e2cd64">visually appealing</Hl> web applications that users love.
            </p>

            <p className="about__bio">
              With hands-on experience across{' '}
              <Hl color="#6481f9">React</Hl>,{' '}
              <Hl color="#f96464">Angular</Hl> &amp;{' '}
              <Hl color="#55d06f">Node.js</Hl>, I deliver{' '}
              <Hl>high-quality solutions</Hl> that blend{' '}
              <Hl color="var(--amber)">clean code</Hl> with{' '}
              <Hl color="rgba(204, 155, 252, 1)">intuitive design</Hl>. Always eager to explore new technologies and push the boundaries of digital experiences.
            </p>

            <div className="about__meta">
              {[
                { label: 'Location', val: <><FaMapMarkerAlt style={{ color: 'var(--cyan)', marginRight: 6 }} /> AndhraPradesh, India</> },
                { label: 'Status', val: <><FaCircle style={{ color: '#22c55e', fontSize: '0.6rem', marginRight: 6 }} /> Open to Opportunities</> },
                { label: 'Graduation', val: <><FaGraduationCap style={{ color: 'var(--amber)', marginRight: 6 }} /> B.Tech CSE (2025)</> },
                { label: 'Interests', val: 'UI, Web & Full Stack Development' },
              ].map(item => (
                <div key={item.label} className="meta-row">
                  <span className="meta-label">{item.label}</span>
                  <span className="meta-val">{item.val}</span>
                </div>
              ))}
            </div>

            <div className="about__buttons">
              <a href="#contact" className="btn-primary"><span>Let's Talk</span></a>
              <a href="#projects" className="btn-secondary"><span>View Projects</span></a>
            </div>
          </div>

          <div className="about__right reveal-right">
            <div className="about__card-wrap">
              <div className="about__img-card glass-card">
                <div className="img-placeholder">
                  <div className="img-grid">
                    <pre className="about__code">
                      {`const Vinay = {
  `}
                      <span style={{ color: 'var(--amber)' }}>role:</span>{` "Full Stack Dev",
  `}
                      <span style={{ color: 'var(--amber)' }}>stack:</span>{` ["React", "Angular",
         "Node", "Express"],
  `}
                      <span style={{ color: 'var(--amber)' }}>passion:</span>{` "Frontend &
            UX Excellence",
  `}
                      <span style={{ color: 'var(--amber)' }}>coffee:</span>{` "Essential",
  `}
                      <span style={{ color: 'var(--amber)' }}>motto:</span>{` "Code with purpose"
`}
                      <span className="last-line">{'};'}</span>
                    </pre>
                  </div>
                </div>
                <div className="about__card-glow" />
              </div>
              <div className="about__float-tag about__float-tag--1 glass-card">
                <FaBullseye style={{ color: 'var(--cyan)' }} />
                <span>Clean Code</span>
              </div>
              <div className="about__float-tag about__float-tag--2 glass-card">
                <FaRocket style={{ color: 'var(--amber)' }} />
                <span>Fast Delivery</span>
              </div>
              <div className="about__float-tag about__float-tag--3 glass-card">
                <FaLightbulb style={{ color: '#a78bfa' }} />
                <span>Problem Solver</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}
