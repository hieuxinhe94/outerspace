import React from 'react'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas,  useFrame, useLoader } from '@react-three/fiber'
import { Reflector,  OrbitControls, useTexture } from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import {  Html } from '@react-three/drei' 
import GuestModel from '../models/Model'
import { Link } from 'react-router-dom'


function Triangle({ color, ...props }) {
  const ref = useRef()
  const [r] = useState(() => Math.random() * 10000)
  useFrame((_) => (ref.current.position.x = -1.75 + Math.sin(_.clock.elapsedTime + r) / 5))
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
      <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 1.5, 5] }}   >
        <color attach="background" args={['#171040']} />
  
        <OrbitControls enableZoom={true} enablePan={false} enableRotate={false} />
        <Suspense fallback={null}>
            
        
          <GuestModel />
          <Triangle color="red" scale={0.009} position={[5, 0, -10]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="cyan" scale={0.009} position={[0, 0, -10]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="orange" scale={0.009} position={[0, 0, -15]} rotation={[0, 0, Math.PI / 3]} />
          <Ground mirror={1} blur={[500, 100]} mixBlur={12} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-0.8} />
          
          
        

        </Suspense>
       
      </Canvas>

<center class="absolute btn-takeoff ">
<div>
             Enter your name
</div>
<br/>
<Link to="/space/1" class="btn-round-lg lb-lg-2x ">
              Take-Off
</Link>
</center>
      
    </>
  )
}

export default OtScene
