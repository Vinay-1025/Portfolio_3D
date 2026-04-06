import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import './ScrollToTop.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(total > 0 ? (scrolled / total) * 100 : 0)
      setVisible(scrolled > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const radius = 22
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (scrollPct / 100) * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="scroll-top-btn"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          {/* Progress ring */}
          <svg className="scroll-top-ring" viewBox="0 0 50 50">
            {/* Track */}
            <circle
              cx="25" cy="25" r={radius}
              fill="none"
              stroke="rgba(0,245,255,0.12)"
              strokeWidth="2.5"
            />
            {/* Progress */}
            <circle
              cx="25" cy="25" r={radius}
              fill="none"
              stroke="var(--cyan)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 25 25)"
              style={{ transition: 'stroke-dashoffset 0.1s linear', filter: 'drop-shadow(0 0 4px var(--cyan))' }}
            />
          </svg>

          {/* Arrow icon */}
          <motion.span 
            className="scroll-top-icon"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaArrowUp size={16} />
          </motion.span>

          {/* Glow pulse */}
          <div className="scroll-top-glow" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
