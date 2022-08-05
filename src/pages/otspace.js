
import React from 'react';
import { Link } from 'react-router-dom'
import { Canvas,  useFrame, useLoader } from '@react-three/fiber'
import { Reflector,  OrbitControls, useTexture, Html } from '@react-three/drei'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Sky, PointerLockControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"
import { Ground } from "../components/Ground"
import { Player } from "../components/Player"
import { Cube, Cubes } from "../components/Cube"
import { Joystick } from 'react-joystick-component';

const joyOptions = {
  // Zone où mettre le joystick (element HTML zone: getElementById('myid')) :
  //  zone: Element,
  // Valid CSS color :
   // color: 'red',
  // Default to 100 :
    size: 100,
  // Defaults to 0.1 (0 -> 1) : 
    threshold: 0.25,
  // Defaults to 250 :
  //  fadeTime: 200,
  // Defaults to false (no multitouch for 'static' or 'semi' modes) :
  //  multitouch: Boolean,
  // Defaults to 1 (with mutlitouch) :
  //  maxNumberOfNipples: 1,
  // Defaults to false (rien compris, à tester) :
  //  dataOnly: Boolean,
  // Defaults to {top: 0, left: 0} (static mode) ex: {left: '10%', bottom: '10%'} :
  //  position: {top: '10%', left:'10%'},
  // Defaults to ‘dynamic’ (other : 'static' or 'semi') :
    mode: 'static',
  // Reset joystick position (defaults to true) :
    restJoystick: true,
  // Defaults to 0.5 (not with 'dynamics' mode) :
    restOpacity: 0.5,
  // Defaults to 200 (which distance we recycle the previous js - 'semi' mode) :
    catchDistance: 200,
  // defaults to false (locks movement to the X axis)
    lockX: false,
  // defaults to false (locks movement to the Y axis)
    lockY: false
  };
  
export default function OtSpace (){
    return ( <>
        <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 1.5, 5] }}  shadows  >
          <color attach="background" args={['#171040']} />
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          
          <Suspense fallback={<Html center className="loading" children="Welcome to xyz Space... (slogan)" />} > 
             
          <Physics gravity={[0, -30, 0]}>
                <Ground />
                <Player />
                 
                {/* <Cube position={[0, 0.5, -10]} />
                <Cubes /> */}
            </Physics>
            {/* <PointerLockControls /> */}

         </Suspense>
        </Canvas>
        <center class="absolute control-player">
        <div>
          
        <Joystick joyOptions={joyOptions}
        baseColor="#ffffff50" stickColor="#ffffff75"
         
           size={100} move={(evt) => {}} stop={(evt) => {}}></Joystick>
        </div>
        <br/>
        </center>

      <div className='absolute top-left'>
        <Link to="/space/1" class="btn-round-lg lb-lg-2x ">
                    Back
        </Link>
      </div>
      
      </>)
}

