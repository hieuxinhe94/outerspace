import React from 'react'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Reflector, CameraShake, OrbitControls, useTexture } from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import * as THREE from 'three'
import Model from '../models/Model'
import { Loader, Html } from '@react-three/drei'

function Triangle({ color, ...props }) {
  const ref = useRef()
  const [r] = useState(() => Math.random() * 10000)
  useFrame((_) => (ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10))
  const { paths: [path] } = useLoader(SVGLoader, '/triangle.svg') // prettier-ignore
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), [])
  return (
    <group ref={ref}>
      <mesh geometry={geom} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Rig({ children }) {
  const ref = useRef()
  const vec = new THREE.Vector3()
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
  })
  return <group ref={ref}>{children}</group>
}

function Ground(props) {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {(Material, props) => <Material color="#f0f0f0" metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
    </Reflector>
  )
}

function OtScene() {
  return (
    <>
      <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 1.5, 5] }}>
        <color attach="background" args={['black']} />
        <ambientLight />
        <OrbitControls enableZoom={true} enablePan={false} enableRotate={false} />
        <Suspense fallback={null}>
          <Model pose={1} position={[1, 0, 0.25]} />
          <Model pose={1} position={[-1, 0, 0.25]} />
          <Triangle color="cyan" scale={0.009} position={[0, 0, -10]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="orange" scale={0.009} position={[0, 0, -15]} rotation={[0, 0, Math.PI / 3]} />
          <Ground mirror={1} blur={[500, 100]} mixBlur={12} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-0.8} />
          <Html center position={[0, 0, 2]} style={{ width: '300px', textAlign: 'center', zIndex: 5 }} className="loading">
            <a href="#1" class="btn-round-lg">
              Take-Off Now
            </a>
          </Html>
        </Suspense>
        <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} />
      </Canvas>

      {/* <Link to="/scene/1" class="btn-round-lg">EXPLORE</Link> */}
    </>
  )
}

export default OtScene
