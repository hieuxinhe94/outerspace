 
  import * as THREE from 'three'
import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {useStore} from '../store'
import { Html } from "@react-three/drei"

export default function Dodecahedrons() {
  const enemies = useStore((state) => state.enemies)
  return enemies.map((data, i) => <Dodecahedron key={i} data={data} />)
}

const box = new THREE.Box3()
box.setFromCenterAndSize(new THREE.Vector3(0, 0, 1), new THREE.Vector3(3, 3, 3)) 

const Dodecahedron = React.memo(({ time, ...props }) => {
    const ref = useRef()
    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <mesh ref={ref} {...props}>
      <dodecahedronGeometry />
      <meshStandardMaterial roughness={0.75} emissive="#404057" />
      <Html distanceFactor={10}>
        <div class="content">
          hello <br />
          world
        </div>
      </Html>
    </mesh>
  )
})
