import * as THREE from 'three'
import React, { useState, forwardRef, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {  useGLTF, Environment, QuadraticBezierLine, CameraShake } from '@react-three/drei'
import AstronautShip from './AstronautShip'

const Spaceman = forwardRef(({ children, ...props }, ref) => {
  const { nodes, materials } = useGLTF('/Astronaut-transformed.glb')
   


  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => {
      material.roughness = 0
    })
  }, [])
  return (
    <mesh
      castShadow
      receiveShadow
      ref={ref}
      {...props}
      geometry={nodes.Astronaut_mesh.geometry}
      material={materials.Astronaut_mat}
      material-envMapIntensity={0}
      dispose={null}>
      {children}
    </mesh>
  )
})

// One-click copy/paste from the poimandres market: https://market.pmnd.rs/model/low-poly-spaceship
const Ship = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('model.gltf')
  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => {
      material.roughness = 0
    })
  }, [])
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube005.geometry} material={materials.Mat0} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_1.geometry} material={materials.Mat1} material-color="black" />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_2.geometry} material={materials.Mat2} material-envMapIntensity={0.2} material-color="black" />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_3.geometry} material={materials.Window_Frame} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_4.geometry} material={materials.Mat4} />
      <mesh castShadow receiveShadow geometry={nodes.Cube005_6.geometry} material={materials.Window} />
    </group>
  )
})

function Cable({ start, end, v1 = new THREE.Vector3(), v2 = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(() => ref.current.setPoints(start.current.getWorldPosition(v1), end.current.getWorldPosition(v2)), [])
  return <QuadraticBezierLine ref={ref} lineWidth={1.5} color="#ff2060" />
}


export default function GuestModel({}) {
  const spaceman = useRef()
  const ship = useRef()
 
  return (<>
<group>
<ambientLight intensity={0.2} />
          <directionalLight position={[-10, 0, -5]} intensity={1} color="red" />
          <directionalLight position={[-1, -2, -5]} intensity={0.2} color="#0c8cbf" />
          <spotLight position={[5, 0, 5]} intensity={2.5} penumbra={1} angle={0.35} castShadow color="#0c8cbf" />

<AstronautShip />    

<Spaceman   scale={0.2}>
  <object3D position={[-0.6, 2, 0]} ref={spaceman} />
  
</Spaceman> 
{/* <CameraShake yawFrequency={0.1} pitchFrequency={0.1} rollFrequency={0.1} />  */}

</group>
  </>)
}
