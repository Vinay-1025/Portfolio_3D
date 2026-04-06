import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projectsData } from '../data/projectsData'
import { FaBriefcase, FaUser, FaSearchPlus } from 'react-icons/fa'
import ImageModal from './ImageModal'
import './MobileProjects.css'

export default function MobileProjects() {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, images: [], index: 0 })

  const openModal = (images, index = 0) => {
    setModalConfig({ isOpen: true, images, index })
  }

  return (
    <section className="mobile-projects-container section">
      <div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>04. Projects</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Things I've Built</h2>

        <div className="mobile-projects-list">
          {projectsData.filter(p => p.featured !== false).map((project) => (
            <div key={project.id} data-hash-id={`project-${project.id}`} className="mobile-proj-card glass-card reveal">
              <div className="mobile-proj-visual" onClick={() => openModal(project.gallery || [project.image])}>
                <img src={project.image} alt={project.title} className="mobile-proj-img" />
                <div className="mobile-proj-glow" style={{ background: `radial-gradient(circle, ${project.accent}40 0%, transparent 70%)` }} />
                <div className="mobile-view-hint">
                  <FaSearchPlus /> Tap to view gallery
                </div>
              </div>

              <div className="mobile-proj-content">
                {/* ... same content as before ... */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <div className="mobile-proj-tag" style={{ color: project.tagColor, background: `${project.tagColor}15`, marginBottom: 0 }}>
                      {project.icon} <span style={{ marginLeft: '4px' }}>{project.tag}</span>
                    </div>
                  </div>
                  {project.isRealTime && (
                    <div className="real-time-badge" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#ff4d4d',
                      textTransform: 'uppercase'
                    }}>
                      <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                      Real Time
                    </div>
                  )}
                </div>
                <h3 className="mobile-proj-title">{project.title}</h3>

                {(project.client || project.contributors) && (
                  <div className="mobile-proj-metadata" style={{
                    marginBottom: '1.5rem',
                    borderLeft: `2px solid ${project.accent}30`,
                    paddingLeft: '1rem'
                  }}>
                    {project.client && (
                      <div style={{ marginBottom: project.contributors ? '1rem' : 0 }}>
                        <span style={{
                          display: 'block',
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--text-muted)',
                          marginBottom: '0.2rem'
                        }}>Client</span>
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{project.client}</span>
                      </div>
                    )}

                    {project.contributors && (
                      <div className="metadata-item">
                        <span style={{
                          display: 'block',
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--text-muted)',
                          marginBottom: '0.4rem'
                        }}>Contributors</span>
                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                          {project.contributors.map((name, idx) => (
                            <div key={idx}>
                              {project.contributors_portfolios && project.contributors_portfolios[idx] ? (
                                <a
                                  href={project.contributors_portfolios[idx]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: project.accent,
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    textDecoration: 'underline'
                                  }}
                                >
                                  <FaUser size={10} /> {name}
                                </a>
                              ) : (
                                <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)' }}>
                                  <FaUser size={10} /> {name}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <p className="mobile-proj-desc">{project.desc}</p>

                <div className="mobile-proj-tech">
                  {project.tech.map(t => (
                    <span key={t} className="mobile-tech-tag">{t}</span>
                  ))}
                </div>

                <div className="mobile-proj-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    {/* {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: project.accent, borderColor: project.accent, color: "black", flex: 1, justifyContent: 'center' }}>
                        <span>GitHub</span>
                      </a>
                    )} */}
                    {project.live && project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: project.accent, borderColor: project.accent, color: "black", flex: 1, justifyContent: 'center' }}>
                        <span>Live Preview</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
