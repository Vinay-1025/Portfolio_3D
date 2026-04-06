import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * ThreeScene - Floating background shapes
 * Updated to use THREE.Timer instead of THREE.Clock (deprecated in recent versions)
 */
export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Floating geometric shapes
    const shapes = []
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x00f5ff, wireframe: true, opacity: 0.3, transparent: true }),
      new THREE.MeshStandardMaterial({ color: 0xffb347, wireframe: true, opacity: 0.25, transparent: true }),
      new THREE.MeshStandardMaterial({ color: 0x00f5ff, wireframe: false, opacity: 0.08, transparent: true }),
    ]

    const geometries = [
      new THREE.OctahedronGeometry(1.2),
      new THREE.TorusGeometry(0.8, 0.15, 8, 30),
      new THREE.TetrahedronGeometry(0.8),
      new THREE.IcosahedronGeometry(0.9),
      new THREE.TorusKnotGeometry(0.5, 0.15, 60, 8),
    ]

    const shapeData = [
      { geo: 0, mat: 0, pos: [-5, 2, -3], speed: [0.003, 0.005, 0], scale: 1.2 },
      { geo: 1, mat: 1, pos: [5, -1, -4], speed: [0.004, 0.002, 0.003], scale: 1.0 },
      { geo: 2, mat: 0, pos: [4, 3, -5], speed: [0.006, 0.003, 0.002], scale: 0.9 },
      { geo: 3, mat: 2, pos: [-4, -2, -3], speed: [0.002, 0.007, 0.004], scale: 1.1 },
      { geo: 4, mat: 1, pos: [0, -4, -6], speed: [0.003, 0.004, 0.005], scale: 0.8 },
    ]

    shapeData.forEach(({ geo, mat, pos, speed, scale }) => {
      const mesh = new THREE.Mesh(geometries[geo], materials[mat].clone())
      mesh.position.set(...pos)
      mesh.scale.setScalar(scale)
      mesh.userData = { speed }
      scene.add(mesh)
      shapes.push(mesh)
    })

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x00f5ff, 0.3)
    scene.add(ambientLight)
    const pointLight1 = new THREE.PointLight(0x00f5ff, 1.5, 20)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)
    const pointLight2 = new THREE.PointLight(0xffb347, 1.0, 20)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Mouse parallax
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let animId
    // Clock is deprecated, using local timestamp or logic for frame updates
    let lastTime = 0

    const animate = (time) => {
      animId = requestAnimationFrame(animate)
      const t = time * 0.001 // seconds

      shapes.forEach(mesh => {
        const { speed } = mesh.userData
        mesh.rotation.x += speed[0]
        mesh.rotation.y += speed[1]
        mesh.rotation.z += speed[2]
        // Gentle float
        mesh.position.y += Math.sin(t * 0.5 + mesh.position.x) * 0.002
      })

      // Camera parallax
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04
      camera.position.y += (mouseY * 1.0 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate(0)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
