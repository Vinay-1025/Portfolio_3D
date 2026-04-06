import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap } from 'react-icons/fi';
import Cursor from '../components/Cursor';
import ParticleField from '../components/ParticleField';
import './NotFound.css';

const HyperspaceEffect = () => {
  const streaks = Array.from({ length: 60 });
  const colors = ['streak-cyan', 'streak-amber', 'streak-white'];

  return (
    <div className="hyperspace-container" style={{ perspective: 'none', display: 'block' }}>
      {streaks.map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const top = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = Math.random() * 0.2 + 0.1;

        return (
          <motion.div
            key={i}
            className={`hyperspace-streak ${color}`}
            initial={{
              x: '100vw',
              y: top + 'vh',
              scaleX: Math.random() * 2 + 1,
              opacity: 0
            }}
            animate={{
              x: '-100vw',
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear"
            }}
            style={{
              height: Math.random() > 0.8 ? '4px' : '1px',
              boxShadow: color === 'streak-amber' ? '0 0 15px rgba(255, 191, 0, 0.6)' : '0 0 15px rgba(0, 245, 255, 0.6)'
            }}
          />
        );
      })}
    </div>
  );
};

const SpaceshipSVG = ({ isJumping }) => (
  <svg width="200" height="100" viewBox="-120 -50 200 100" style={{ transform: 'scale(1.5)', overflow: 'visible' }}>
    <defs>
      <linearGradient id="MetalDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="MetalLight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="60%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <radialGradient id="GlassGrad">
        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
        <stop offset="80%" stopColor="#0ea5e9" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.3" />
      </radialGradient>
      <radialGradient id="HeavyThrustGlow">
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
        <stop offset="40%" stopColor="#00f5ff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
      <filter id="plasmaGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00f5ff" />
      </filter>
    </defs>
    <g>
      {/* Heavy Thrust Layers (Behind Ship) */}
      <g>
        <motion.path
          d="M-32,0 L-140,-15 L-160,0 L-140,15 Z"
          fill="rgba(0, 245, 255, 0.9)"
          filter="blur(15px)"
          animate={isJumping ? {
            scaleX: [1, 3, 2, 4, 1],
            scaleY: [1, 1.5, 1, 1.8, 1],
            opacity: [0.3, 0.8, 0.5, 1, 0.3],
            x: -20
          } : {
            scaleX: [0.5, 0.8, 0.6, 0.9, 0.5],
            opacity: [0.1, 0.3, 0.2, 0.4, 0.1],
          }}
          transition={{ duration: 0.15, repeat: Infinity }}
          style={{ transformOrigin: '-32px center' }}
        />
        <motion.path
          d="M-20,0 L-30,-8 L-90,0 L-90,8 Z"
          fill="url(#HeavyThrustGlow)"
          filter="blur(1px)"
          animate={isJumping ? {
            scaleX: [1.5, 4, 2.5, 5, 1.5],
            opacity: [0.8, 1, 0.7, 1, 0.8],
            x: -15
          } : {
            scaleX: [0.8, 1.2, 1, 1.4, 0.8],
            opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
          }}
          transition={{ duration: 0.08, repeat: Infinity }}
          style={{ transformOrigin: '-32px center' }}
        />
      </g>

      {/* Exact RealisticShip Design from SpaceShipCursor */}
      <g>
        <path fill="url(#MetalDark)" d="M40,0 L-12,-22 L-8,-8 L-30,0 L-8,8 L-12,22 Z" />
        <path fill="url(#MetalLight)" d="M35,0 L-10,-18 L-5,-6 L-25,0 L-5,6 L-10,18 Z" />
        <g opacity="0.4">
          <rect x="-15" y="-12" width="6" height="2" fill="#000" />
          <rect x="-15" y="10" width="6" height="2" fill="#000" />
          <line x1="0" y1="-14" x2="10" y2="-10" stroke="#000" strokeWidth="0.5" />
          <line x1="0" y1="14" x2="10" y2="10" stroke="#000" strokeWidth="0.5" />
          <rect x="5" y="-5" width="2" height="10" fill="rgba(255,255,255,0.05)" />
          <circle cx="-18" cy="-5" r="0.8" fill="#ffaa00" />
          <circle cx="-18" cy="5" r="0.8" fill="#ffaa00" />
        </g>
        <ellipse cx="10" cy="0" rx="12" ry="4.5" fill="url(#GlassGrad)" />
        <path d="M15,0 L8,-2 L8,2 Z" fill="#fff" opacity="0.2" />
        <g fill="#222">
          <rect x="-12" y="-24" width="18" height="4" rx="1" />
          <rect x="-12" y="20" width="18" height="4" rx="1" />
          <rect x="2" y="-23.5" width="2" height="3" fill="#333" />
          <rect x="2" y="20.5" width="2" height="3" fill="#333" />
        </g>
        {/* Rear Engine Ion Glow */}
        <g>
          <circle cx="-32" cy="0" r="5" fill="#00f5ff" opacity="0.4">
            <animate attributeName="r" values="4;6;4" dur="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="-30" cy="0" r="3" fill="#a1eef0ff" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="0.6s" repeatCount="indefinite" />
          </circle>
        </g>
        <circle cx="-10" cy="-20" r="1.5" fill="#ff0000">
          <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="-10" cy="20" r="1.5" fill="#00ff00">
          <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <rect x="20" y="-1" width="5" height="2" fill="#00f5ff" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
        </rect>
      </g>
    </g>
  </svg>
);

export default function NotFound() {
  const navigate = useNavigate();
  const [isJumping, setIsJumping] = useState(false);

  const handleJump = () => {
    setIsJumping(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="not-found-page">
      <AnimatePresence>
        {isJumping && (
          <motion.div
            className="jump-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 1.5, times: [0, 0.8, 1] }}
          />
        )}
      </AnimatePresence>

      <Cursor />
      <ParticleField interactive={false} />
      <AnimatePresence>
        {isJumping && <HyperspaceEffect />}
      </AnimatePresence>
      <div className="nebula"></div>
      <div className="starfield"></div>
      <div className="lensing-overlay"></div>

      {/* Realistic Black Hole */}
      {!isJumping && (
        <motion.div
          className="black-hole-container"
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="accretion-disk-flat"></div>
          <div className="accretion-disk-folded"></div>
          <div className="black-hole-core">
            <div className="photon-ring"></div>
          </div>
        </motion.div>
      )}

      {/* Side-View Ship Acceleration */}
      <motion.div
        className="spaceship-wrapper"
        initial={{ x: '120vw', y: '50vh', rotate: 0 }}
        animate={isJumping ? {
          x: '115vw',
          scale: 6,
          opacity: [1, 1, 0]
        } : {
          x: ['75vw', '76vw', '75vw'],
          y: ['48vh', '52vh', '48vh'],
          rotate: [0, 2, -2, 0],
        }}
        transition={isJumping ? { duration: 0.8, ease: "circIn" } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }}
      >
        <SpaceshipSVG isJumping={isJumping} />
      </motion.div>

      {/* UI Overlay */}
      <AnimatePresence>
        {!isJumping && (
          <motion.div
            className="not-found-ui"
            exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
          >
            <h1 className="ui-title">404</h1>
            <div className="ui-subtitle">Event Horizon Reached</div>

            <button onClick={handleJump} className="back-home-btn" style={{ border: 'none', cursor: 'pointer' }}>
              <FiZap />
              <span>Engage Hyper-Jump</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="telemetry-footer">
        DIMENSIONAL VOID DETECTED | SIGNAL LOSS: CRITICAL
      </div>
    </div>
  );
}
