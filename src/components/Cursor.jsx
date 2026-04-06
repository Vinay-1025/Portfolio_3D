import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let followerX = mouseX
    let followerY = mouseY

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system (Stars/Sparkles)
    let particles = []

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        // Starts larger, fades smaller
        this.size = Math.random() * 2.5 + 1
        // Scatter slightly in random directions
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.life = 1
        // Tech portfolio colors
        this.color = Math.random() > 0.5 ? '#00f5ff' : '#ffb347'
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life -= 0.02
        this.size = Math.max(0, this.size - 0.05)
      }
      draw() {
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.life

        ctx.beginPath()
        // Draw a basic glowing circle
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add a soft glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
      }
    }

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursor) {
        cursor.style.left = mouseX + 'px'
        cursor.style.top = mouseY + 'px'
      }

      // Add particles on move to create the trail
      for (let i = 0; i < 3; i++) {
        // Add slight randomness to spawn location so it feels voluminous
        const offsetX = Math.random() * 10 - 5
        const offsetY = Math.random() * 10 - 5
        particles.push(new Particle(mouseX + offsetX, mouseY + offsetY))
      }
    }

    let animId
    const animate = () => {
      // Follower physics
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      if (follower) {
        follower.style.left = followerX + 'px'
        follower.style.top = followerY + 'px'
      }

      // Render particle trail
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Remove dead particles
        if (particles[i].life <= 0 || particles[i].size <= 0) {
          particles.splice(i, 1)
          i--
        }
      }

      animId = requestAnimationFrame(animate)
    }

    const onMouseDown = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(0.7)'
      if (follower) follower.style.transform = 'translate(-50%,-50%) scale(1.4)'
    }
    const onMouseUp = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)'
      if (follower) follower.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    const onHoverIn = () => {
      if (cursor) { cursor.style.width = '6px'; cursor.style.height = '6px' }
      if (follower) { follower.style.width = '48px'; follower.style.height = '48px'; follower.style.borderColor = 'var(--amber)' }
    }
    const onHoverOut = () => {
      if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px' }
      if (follower) { follower.style.width = '36px'; follower.style.height = '36px'; follower.style.borderColor = 'rgba(0,245,255,0.5)' }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Attach hover effects to interactive elements dynamically
    const attachHovers = () => {
      document.querySelectorAll('a, button, .tilt-card').forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
        el.addEventListener('mouseenter', onHoverIn)
        el.addEventListener('mouseleave', onHoverOut)
      })
    }
    // Call once, and optionally could run on a MutationObserver if DOM changes frequently
    attachHovers()

    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20000000 }} />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  )
}
