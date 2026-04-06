import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/projectsData'
import { FaBriefcase, FaUser, FaSearchPlus } from 'react-icons/fa'
import ImageModal from './ImageModal'
import './Projects.css'

const projects = projectsData.filter(p => p.featured !== false);

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef()
  const [modalConfig, setModalConfig] = useState({ isOpen: false, images: [], index: 0 })

  const openModal = (images, index = 0) => {
    setModalConfig({ isOpen: true, images, index })
  }

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      let sections = gsap.utils.toArray(".project-detail-section");

      let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + sectionRef.current.offsetWidth * (sections.length - 1),
        }
      });

      // Parallax effect on images inside horizontal scroll
      gsap.utils.toArray(".proj-gsap-img").forEach((img, i) => {
        gsap.to(img, {
          xPercent: 25, // Parallax slide amount
          ease: "none",
          scrollTrigger: {
            trigger: sections[i],
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      });

      // Animate content elements sequentially inside the sliding panels
      sections.forEach((sec, i) => {
        if (i === 0) return; // First visible immediately

        const contentElems = sec.querySelectorAll(".proj-gsap-tag, .proj-gsap-title, .proj-gsap-desc, .proj-gsap-tech, .proj-gsap-links");

        gsap.from(contentElems, {
          x: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sec,
            containerAnimation: scrollTween,
            start: "left center+=250",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Animate the path line
      gsap.to(".snake-path-draw", {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + sectionRef.current.offsetWidth * (sections.length - 1),
          scrub: 1,
        }
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section className="projects-gsap-container" ref={sectionRef}>
      {/* ... header and snake path same as before ... */}
      <div className="projects-fixed-header">
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center' }}>04. Projects</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Things I've Built</h2>
        </div>
      </div>

      <div className="projects-horizontal-wrapper">
        <div className="snake-path-bg">
          <svg width="400%" height="100%" viewBox="0 0 4000 1000" preserveAspectRatio="none">
            <path
              className="snake-path-base"
              d="M 0 500 Q 500 400 1000 500 T 2000 500 T 3000 500 T 4000 500"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
              fill="none"
            />
            <path
              className="snake-path-draw"
              d="M 0 500 Q 500 400 1000 500 T 2000 500 T 3000 500 T 4000 500"
              stroke="url(#gsap-snake-gradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="4000"
              strokeDashoffset="4000"
            />
            <defs>
              <linearGradient id="gsap-snake-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--cyan)" />
                <stop offset="50%" stopColor="var(--amber)" />
                <stop offset="100%" stopColor="var(--purple)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {projects.map((project) => (
          <div key={project.id} data-hash-id={`project-${project.id}`} className="project-detail-section">
            <div className="container project-gsap-grid">

              <div className="proj-gsap-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div className="proj-gsap-tag" style={{ color: project.tagColor, background: `${project.tagColor}15`, marginBottom: 0 }}>
                      {project.icon} <span style={{ marginLeft: '6px' }}>{project.tag}</span>
                    </div>
                    {project.category && (
                      <div className="proj-gsap-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 0 }}>
                        {project.category.includes('Corporate') ? <FaBriefcase /> : <FaUser />} <span style={{ marginLeft: '6px' }}>{project.category}</span>
                      </div>
                    )}
                  </div>
                  {project.isRealTime && (
                    <div className="real-time-badge" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.6rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#ff4d4d',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      <span className="pulse-dot"></span>
                      Real Time Project
                    </div>
                  )}
                </div>
                <h3 className="proj-gsap-title">{project.title}</h3>

                {(project.client || project.contributors) && (
                  <div className="proj-metadata-row" style={{ 
                    display: 'flex', 
                    gap: '3rem', 
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    borderLeft: `2px solid ${project.accent}30`,
                    paddingLeft: '1.5rem'
                  }}>
                    {project.client && (
                      <div className="metadata-item">
                        <span style={{ 
                          display: 'block', 
                          fontSize: '0.75rem', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.1em',
                          color: 'var(--text-muted)',
                          marginBottom: '0.4rem'
                        }}>Client</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{project.client}</span>
                      </div>
                    )}

                    {project.contributors && (
                      <div className="metadata-item">
                        <span style={{ 
                          display: 'block', 
                          fontSize: '0.75rem', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.1em',
                          color: 'var(--text-muted)',
                          marginBottom: '0.4rem'
                        }}>Contributors</span>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          {project.contributors.map((name, idx) => (
                            <div key={idx} className="contributor-link-wrapper">
                              {project.contributors_portfolios && project.contributors_portfolios[idx] ? (
                                <a 
                                  href={project.contributors_portfolios[idx]} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  style={{ 
                                    color: project.accent, 
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid transparent',
                                    transition: 'border-color 0.3s'
                                  }}
                                  onMouseOver={(e) => e.target.style.borderColor = project.accent}
                                  onMouseOut={(e) => e.target.style.borderColor = 'transparent'}
                                >
                                  <FaUser size={12} /> {name}
                                </a>
                              ) : (
                                <span style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                                  <FaUser size={12} /> {name}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <p className="proj-gsap-desc">{project.desc}</p>

                <div className="proj-gsap-tech">
                  {project.tech.map(t => (
                    <span key={t} className="gsap-tech-tag">{t}</span>
                  ))}
                </div>

                <div className="proj-gsap-links">
                  {project.live && project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: project.accent, borderColor: project.accent, color: "black" }}>
                      <span>Live Preview</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="proj-gsap-visual" onClick={() => openModal(project.gallery || [project.image])}>
                <div className="proj-gsap-frame glass-card" style={{ cursor: 'pointer' }}>
                  <img src={project.image} alt={project.title} className="proj-gsap-img" />
                  <div className="proj-gsap-glow" style={{ background: `radial-gradient(circle, ${project.accent}30 0%, transparent 70%)` }} />
                  <div className="proj-view-icon">
                    <FaSearchPlus />
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <ImageModal 
        isOpen={modalConfig.isOpen}
        images={modalConfig.images}
        initialIndex={modalConfig.index}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </section>
  )
}
