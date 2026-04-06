import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Environment, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

function SceneContent({ accentColor }) {
  const groupRef = useRef()

  // Subtle mouse tracking rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * Math.PI) / 4, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.pointer.y * Math.PI) / 4, 0.05)
      // Idle slow spin
      groupRef.current.rotation.z = t * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        {/* Core Distorted Sphere */}
        <Sphere args={[1.2, 64, 64]} position={[0, 0, -2]}>
          <MeshDistortMaterial 
            color={accentColor} 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.9} 
            roughness={0.1} 
            distort={0.4} 
            speed={2.5} 
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* Outer Tech Wireframe */}
        <Icosahedron args={[1.6, 2]} position={[0, 0, -2]}>
          <meshStandardMaterial 
            color={accentColor} 
            wireframe={true} 
            transparent 
            opacity={0.15} 
            emissive={accentColor}
            emissiveIntensity={0.5}
          />
        </Icosahedron>

        {/* Orbiting Ring (optional accent) */}
        <mesh position={[0, 0, -2]} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2, 0.02, 16, 100]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

export default function ProjectThreeScene({ accentColor }) {
  return (
    <div className="project-three-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '800px', zIndex: 0, pointerEvents: 'none', opacity: 0.8 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color={accentColor} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
        <pointLight position={[0, 0, 2]} intensity={2} color={accentColor} distance={10} />
        
        <SceneContent accentColor={accentColor} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
