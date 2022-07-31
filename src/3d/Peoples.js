import * as THREE from 'three'
import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {useStore} from '../store'
import { Html } from "@react-three/drei"
import people1Img from '../images/people-1.jpg'
export default function Peoples() {
  const enemies = useStore((state) => state.enemies)
  return enemies.map((data, i) => <Drone key={i} data={data} />)
}

const box = new THREE.Box3()
box.setFromCenterAndSize(new THREE.Vector3(0, 0, 1), new THREE.Vector3(3, 3, 3))
// const glowMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('lightblue') })
// const bodyMaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('black') })

const Drone = React.memo(({ data }) => {
  const { clock } = useStore((state) => state.mutation)
 // const { nodes, materials } = useLoader(GLTFLoader, '/drone.gltf')
  const [ people1] = useLoader(THREE.TextureLoader, [people1Img])
  const ref = useRef()

  useFrame(() => {
    const r = Math.cos((clock.getElapsedTime() / 2) * data.speed) * Math.PI
    ref.current.position.copy(data.offset)
    ref.current.rotation.set(r, r, r)
  })

  return (
    <group ref={ref} scale={[15, 15, 15]}>
       <mesh position={[5, -5, -5]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        {/* <boxGeometry args={[2, 2, 2]} /> */}
        <meshStandardMaterial map={people1} roughness={1} fog={true} />
        <Html distanceFactor={10}>
        <div class="content">
          Pham <br />
          Hieu
        </div>
      </Html>
      </mesh>
      {/* <mesh name="Sphere_DroneGlowmat_0" geometry={nodes.Sphere_DroneGlowmat_0.geometry} material={materials.DroneGlowmat} />
      <mesh name="Sphere_Body_0" geometry={nodes.Sphere_Body_0.geometry} material={bodyMaterial} /> */}
    </group>

    
  )
})
