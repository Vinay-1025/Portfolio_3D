import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'

function ScrollHandler({ children }) {
  const { pathname, hash } = useLocation()
  
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const elements = document.querySelectorAll(`#${id}, [data-hash-id="${id}"]`)
        
        for (const el of elements) {
          // Scroll to the first visible element that matches
          if (window.getComputedStyle(el).display !== 'none') {
            const yOffset = -80; // Offset for navbar
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'instant'});
            break;
          }
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])
  
  return children
}

function App() {
  return (
    <Router>
      <ScrollHandler>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTop />
      </ScrollHandler>
    </Router>
  )
}

export default App
