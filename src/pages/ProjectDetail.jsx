import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsData } from '../data/projectsData'
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaSearchPlus, FaBriefcase, FaUser } from 'react-icons/fa'
import Cursor from '../components/Cursor'
import Footer from '../components/Footer'
import ProjectThreeScene from '../components/ProjectThreeScene'
import ParticleField from '../components/ParticleField'
import SpaceShipCursor from '../components/SpaceShipCursor'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion, useScroll } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import './ProjectDetail.css'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projectsData.find(p => p.id === parseInt(id))
  const isCorporate = project?.category === 'Corporate Project'
  const pageRef = useRef()
  const [visibleCount, setVisibleCount] = useState(3)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    window.scrollTo(0, 0)
    setVisibleCount(3)
  }, [id])

  useGSAP(() => {
    if (!project) return;

    // 1. Initial Page Load Stagger Animation (Premium spatial reveal)
    const tl = gsap.timeline()

    tl.from(".back-link", {
      opacity: 0,
      x: -20,
      duration: 0.8,
      ease: "expo.out",
    })
      .fromTo(".detail-tag, .detail-category-tag, .detail-title, .detail-subtitle, .detail-links a",
        {
          opacity: 0,
          y: 50,
          rotationX: -15,   // Adds 3D flip-up feel
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out"
        }, "-=0.6")

    // 2. Cinematic Hero Reveal (Clip-path expansion + Parallax)
    const heroWrapper = document.querySelector(".detail-hero-img-wrapper");
    if (heroWrapper) {
      gsap.fromTo(heroWrapper,
        { clipPath: "inset(15% 5% 15% 5% round 30px)", scale: 0.95 },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroWrapper,
            start: "top 95%",
            end: "top 20%",
            scrub: 1
          }
        }
      );

      // Fade out on scroll past
      gsap.fromTo(heroWrapper,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: heroWrapper,
            start: "bottom 60%",
            end: "bottom 0%",
            scrub: true
          }
        }
      );

      // Parallax on Hero Image inside the wrapper
      gsap.fromTo(".detail-hero-img",
        { yPercent: -10, scale: 1.1 },
        {
          yPercent: 10,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroWrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }

    // 3. Scroll Reveal for Content Sections
    const sections = gsap.utils.toArray(".detail-section");
    sections.forEach(sec => {
      gsap.from(sec, {
        opacity: 0,
        y: 80,
        scale: 0.98,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 90%", // Forgiving trigger threshold
          toggleActions: "play none none reverse"
        }
      });
    });

    // 4. Pinned Horizontal Scrolling Gallery
    const track = document.querySelector('.horizontal-scroll-track');
    const galleryContainer = document.querySelector('.detail-gallery-container');
    
    if (track && galleryContainer && project.gallery && project.gallery.length > 0) {
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 100); // Added padding offset
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: galleryContainer,
        start: "top 5%", // Pin slightly below the progress bar
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }

    // 5. Magnetic Buttons
    const magnets = document.querySelectorAll('.btn-primary, .btn-secondary, .back-link')
    const magnetMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4
      gsap.to(e.currentTarget, { x, y, duration: 0.4, ease: "power2.out" })
    }
    const magnetLeave = (e) => {
      gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" })
    }
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', magnetMove)
      btn.addEventListener('mouseleave', magnetLeave)
    })

    // 5. Mouse Interaction Parallax and 3D Tilts
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const moveX = (clientX - centerX) / centerX; // Range -1 to 1
      const moveY = (clientY - centerY) / centerY;

      // Header parallax (moves opposite to mouse) - REMOVED per user request
      /* gsap.to(".detail-header", {
        x: moveX * -25,
        y: moveY * -25,
        ease: "power2.out",
        duration: 1
      }); */

      // Background glow parallax (moves with mouse)
      gsap.to(".detail-glow-bg", {
        x: moveX * 40,
        y: moveY * 40,
        ease: "power2.out",
        duration: 1.5
      });

      // Hero image 3D Tilt removed to maintain flush full-width edges

      // Tech Stack Card 3D Tilt
      gsap.to(".detail-card", {
        rotationY: moveX * -3,
        rotationX: moveY * 3,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      magnets.forEach(btn => {
        btn.removeEventListener('mousemove', magnetMove)
        btn.removeEventListener('mouseleave', magnetLeave)
      })
    };

  }, { scope: pageRef, dependencies: [id, project] });

  if (!project) {
    return (
      <div className="project-not-found">
        <SpaceShipCursor />
        <Cursor />
        <h2>Project Not Found</h2>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    )
  }

  const allOtherProjects = projectsData.filter(p => p.id !== project.id);
  const otherProjects = allOtherProjects.slice(0, visibleCount);

  return (
    <div className="project-detail-page" ref={pageRef} style={{ '--accent-color': project.accent, '--tag-color': project.tagColor }}>
      <Helmet>
        <title>{project.title} | Vinay Sriram Gavara</title>
        <meta name="description" content={project.desc} />
        <meta property="og:title" content={`${project.title} | Vinay Sriram Gavara`} />
        <meta property="og:description" content={project.desc} />
        <meta property="og:image" content={project.image} />
      </Helmet>
      <motion.div 
        className="reading-progress-bar" 
        style={{ scaleX: scrollYProgress, background: project.accent }} 
      />
      <SpaceShipCursor />
      <Cursor />
      <ParticleField interactive={true} />

      {/* 3D Scene and Background Glow */}
      <ProjectThreeScene accentColor={project.accent} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(5, 8, 15, 0.75)', zIndex: 0, pointerEvents: 'none' }} />
      <div className="detail-glow-bg" style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}15 0%, transparent 70%)` }} />

      <nav className="detail-nav container">
        <Link to={`/#project-${project.id}`} className="back-link">
          <FaArrowLeft /> Back to Portfolio
        </Link>
      </nav>

      <main className="detail-main container">

        {/* Header Section */}
        <header className="detail-header">
          <div className="detail-tags-wrapper" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', margin: '0 auto 1.5rem', maxWidth: 'fit-content' }}>
            <div className="detail-tag" style={{ background: `${project.tagColor}15`, color: project.tagColor, margin: 0 }}>
              {project.icon} {project.tag}
            </div>
            {project.category && (
              <div className="detail-category-tag detail-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)', margin: 0 }}>
                {project.category.includes('Corporate') ? <FaBriefcase /> : <FaUser />} {project.category}
              </div>
            )}
          </div>
          <h1 className="section-title">{project.title}</h1>
          <p className="detail-subtitle">{project.desc}</p>

          {!isCorporate && (
            <div className="detail-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <span><FaGithub /> View Code</span>
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: project.accent, color: 'black', borderColor: project.accent }}>
                  <span><FaExternalLinkAlt /> View Live</span>
                </a>
              )}
            </div>
          )}
        </header>

        {/* Hero Image */}
        {!isCorporate && project.image && (
          <div className="detail-hero-img-wrapper">
            <img src={project.image} alt={project.title} className="detail-hero-img" />
            <div className="img-glow" style={{ boxShadow: `0 30px 60px ${project.accent}30` }} />
          </div>
        )}

        {/* Content Details */}
        <div className="detail-content-grid">

          <div className="detail-left-col">
            <section className="detail-section">
              <h2 className="section-title">Overview</h2>
              <p className="detail-paragraph">{project.fullDescription}</p>
            </section>

            {!isCorporate && project.highlights && (
              <section className="detail-section">
                <h2 className="section-title">Key Highlights</h2>
                <ul className="detail-highlights">
                  {project.highlights.map((highlight, index) => (
                    <li key={index}>
                      <span className="highlight-bullet" style={{ background: project.accent }}></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Corporate Data Sections */}
            {isCorporate && (
              <>
                {project.painPoints && (
                  <section className="detail-section">
                    <h2 className="section-title">Pain Points Addressed</h2>
                    <p className="detail-paragraph">{project.painPoints}</p>
                  </section>
                )}
                {project.solution && (
                  <section className="detail-section">
                    <h2 className="section-title">Constructed Solution</h2>
                    <p className="detail-paragraph">{project.solution}</p>
                  </section>
                )}
                {project.architecture && (
                  <section className="detail-section">
                    <h2 className="section-title">Architecture Setup</h2>
                    <p className="detail-paragraph">{project.architecture}</p>
                  </section>
                )}
                {project.research && (
                  <section className="detail-section">
                    <h2 className="section-title">Research & Delivery</h2>
                    <p className="detail-paragraph">{project.research}</p>
                  </section>
                )}
              </>
            )}
          </div>

          <div className="detail-right-col">
            <section className="detail-section detail-card">
              <h3 className="card-heading">Tech Stack</h3>
              <div className="detail-tech-stack">
                {project.tech.map((t, index) => (
                  <span key={index} className="detail-tech-tag">{t}</span>
                ))}
              </div>
            </section>
          </div>

        </div>

        {/* Pinned Horizontal Gallery */}
        {!isCorporate && project.gallery && project.gallery.length > 0 && (
          <section className="detail-gallery-container">
            <div className="horizontal-scroll-wrapper">
              <h2 className="section-title gallery-title" style={{ paddingLeft: '5vw' }}>Visual Showcase</h2>
              <div className="horizontal-scroll-track">
                {project.gallery.map((item, idx) => (
                  <div className="horizontal-img-card" key={idx}>
                    <img
                      className="horizontal-img"
                      src={item.url}
                      alt={item.title || `${project.title} view ${idx + 1}`}
                    />
                    <div className="horizontal-img-glow" style={{ boxShadow: `0 30px 60px ${project.accent}20` }} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* More Projects Section */}
      <section className="detail-other-projects container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>More Projects</h2>
        <div className="other-projects-grid">
          {otherProjects.map(p => (
            <Link to={`/project/${p.id}`} key={p.id} className="other-project-card glass-card">
              <div className="other-project-img-wrapper">
                <img src={p.image} alt={p.title} className="other-project-img" />
                <div className="other-project-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${p.accent}50 0%, transparent 70%)` }} />
              </div>
              <div className="other-project-info">
                <h4 className="other-project-title">{p.title}</h4>
                <span className="other-project-tag" style={{ color: p.tagColor }}>{p.tag}</span>
              </div>
            </Link>
          ))}
        </div>

        {visibleCount < allOtherProjects.length ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="btn-secondary"
              style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
            >
              <span>View More</span>
            </button>
          </div>
        ) : allOtherProjects.length > 3 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setVisibleCount(3)}
              className="btn-secondary"
              style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
            >
              View Less
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
