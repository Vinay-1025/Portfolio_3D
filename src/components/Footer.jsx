import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { PiHeartFill } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const pfx = pathname === '/' ? '' : '/'

  return (
    <footer className="footer">
      <div className="footer__line" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <span style={{ color: 'var(--cyan)' }}>&lt;</span>
            <span style={{ color: 'var(--amber)' }}>VSG</span>
            <span style={{ color: 'var(--cyan)' }}>/&gt;</span>
          </span>
          <span className="footer__sub" style={{ color: 'var(--text-secondary)' }}>Vinay Sriram Gavara</span>
        </div>

        <div className="footer__links">
          <a href={`${pfx}#about`}>About</a>
          <a href={`${pfx}#skills`}>Skills</a>
          <a href={`${pfx}#education`}>Education</a>
          <a href={`${pfx}#projects`}>Projects</a>
          <a href={`${pfx}#certifications`}>Certifications</a>
          <a href={`${pfx}#experience`}>Experience</a>
          <a href={`${pfx}#team`}>Team</a>
          <a href={`${pfx}#contact`}>Contact</a>
        </div>

        <div className="footer__socials">
          <a href="https://github.com/Vinay-1025" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="GitHub Profile">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/g-vinay-sriram" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="LinkedIn Profile">
            <FaLinkedin size={20} />
          </a>
          <a href="mailto:vinaysriramgavara9@gmail.com" className="footer__social" aria-label="Email Me">
            <MdEmail size={22} />
          </a>
        </div>
      </div>

      <div className="footer__copy">
        <span>© {year} </span>
        <span style={{ color: 'var(--amber)' }}>
          Vinay Sriram Gavara
        </span>
        <span>. Built with</span>
        <span style={{ color: '#ff4c4cff' }}> <PiHeartFill /> </span>
        <span>. All rights reserved.</span>
      </div>
    </footer>
  )
}
