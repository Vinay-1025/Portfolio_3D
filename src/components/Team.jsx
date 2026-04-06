import React from 'react';
import { FaExternalLinkAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Team.css';
import mohanImg from '../assets/team/mohan.png';
import shafiyaImg from '../assets/team/shafiya.png';
import venkateshImg from '../assets/team/venkatesh.jfif';
import harshithaImg from '../assets/team/harshitha.png';
import aswiniImg from '../assets/team/aswini.png';

const teamMembers = [
  {
    name: 'Mohan Patro',
    role: 'Full Stack Developer',
    description: 'Expert in architecting high-performance backend systems and crafting immersive frontend experiences with a focus on scalability.',
    portfolio: 'https://portfolio-m-phi.vercel.app/',
    image: mohanImg,
    accent: '#00f5ff'
  },
  {
    name: 'Venkatesh Gannisetti',
    role: 'Full Stack Developer',
    description: 'Mastering end-to-end development by integrating secure server-side logic with state-of-the-art interactive UI frameworks.',
    portfolio: 'https://venkateshganisettiportfolio.netlify.app/',
    image: venkateshImg,
    accent: '#ffb347'
  },
  {
    name: 'Shafiya',
    role: 'Full Stack Developer',
    description: 'Fusing design thinking with full-stack engineering to build highly intuitive, scalable, and performance-optimized web solutions.',
    portfolio: 'https://portfolio-pi-dun-83.vercel.app/',
    image: shafiyaImg,
    accent: '#68dc68'
  },
  // {
  //   name: 'Harshitha Chandaka',
  //   role: 'AI/ML Engineer',
  //   description: 'Specializing in developing intelligent algorithms and machine learning models to solve complex data-driven challenges and enhance system intelligence.',
  //   portfolio: '#',
  //   image: harshithaImg,
  //   accent: '#a220f8ff'
  // },
  {
    name: 'Aswini Rajulapudi',
    role: 'AI/ML Engineer',
    description: 'A dedicated AI/ML engineer focused on building robust and scalable machine learning solutions to drive impact and innovation.',
    portfolio: '#',
    image: aswiniImg,
    accent: '#ff4c4cff'
  }
];

export default function Team() {
  return (
    <section id="team" className="team-section section">
      <div className="container">
        <div className="section-label" style={{ justifyContent: 'center' }}>07. Collaborative Partners</div>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>The Creative Minds</h2>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card reveal"
              style={{
                '--member-accent': member.accent,
                '--member-accent-glow': `${member.accent}40`,
                '--member-accent-fade': `${member.accent}15`
              }}
            >
              <div className="member-image-wrapper">
                <img src={member.image} alt={member.name} className="member-image" />
                <div className="member-glow" style={{ background: `radial-gradient(circle, ${member.accent}40 0%, transparent 70%)` }} />
              </div>

              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role" style={{ color: member.accent }}>{member.role}</p>
                <p className="member-desc">{member.description}</p>

                <div className="member-links">
                  {member.portfolio !== '#' && (
                    <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="member-link-btn">
                      <span>Explore Portfolio <FaExternalLinkAlt size={14} /></span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}