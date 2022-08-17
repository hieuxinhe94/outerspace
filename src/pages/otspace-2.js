
import React,  { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Canvas,  useThree } from '@react-three/fiber'
import { useGLTF,   Html } from '@react-three/drei'
import {  useRef, Suspense } from 'react'
import { Effects, OrbitControls, OrthographicCamera, BakeShadows } from '@react-three/drei'
import { Physics} from "@react-three/cannon"
import { Ground } from "../components/Ground"
import { Player } from "../components/Player"
import { Cube, Cubes } from "../components/Cube"
import { Joystick } from 'react-joystick-component';
import { useControls } from '../helper/useControls';
import DirectionMarker from '../components/DirectionMarker';

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

export default function OtSpace2 ({...props}, ref){
    const player = useRef()
    const playerGroup = useRef()

    return ( <>
        <Canvas camera={{ fov: 75, near: 0.1, far: 100, position: [0, 1.5, 5] }}  shadows  >
        <color attach="background" args={['#202030']} />
        <fog attach="fog" args={['#202030', 10, 25]} />

        <hemisphereLight intensity={0.2} color="#eaeaea" groundColor="blue" />
        <directionalLight castShadow intensity={0.2} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} position={[10, 10, -10]} />
    
        <Effects disableGamma>
          <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
        </Effects>
        <BakeShadows />
          <Suspense fallback={<Html center className="loading" children="Welcome to xyz Space... (slogan)" />} > 
          <group ref={playerGroup} position={[0,0,0]}>
          <Physics broadphase="SAP"gravity={[0, -50 , 0]}  contactEquationRelaxation={4} friction={1e-3} >
              <group ref={player} position={[0,0,0]}>
              <Ground key={"ground"} ></Ground>
              <DirectionMarker   />
              <Player key={"player"} />
            
              </group>
            </Physics>
            {/* <PointerLockControls /> */}
            </group>
           <group>
           <DynamicModel position={[3, 0.5, -10]} url={"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf"} />
           </group>
         </Suspense>
         
         {/* <CameraController /> */}
        </Canvas>
        <center class="absolute control-player">
        <div>
          
        <Joystick joyOptions={joyOptions} baseColor="#ffffff50" stickColor="#ffffff75"
           size={100} 
           move={(evt) => {
          //  console.log("moveeee")
          //  console.log(playerGroup.current.position)
          //  debugger;
           //playerGroup.current.position.x +=0.01
           //player.current.position.x +=0.01

           }} stop={(evt) => {}}></Joystick>
                <br/>
                <div class="positioner">
                  <div class="ctl_menu">
                    <div class="ctl_menu_title">
                      Hieu Pham
                    </div>
                    <div class="ctl_menu_item">
                      <input class="toggle" name="ctl_menu_group" id="sneaky_toggle" type="radio"/>
                      <div class="expander">
                        <label for="sneaky_toggle"><i class="ctl_menu_icon bi bi-telephone-forward"></i> <span class="ctl_menu_text">Mic ON</span></label>
                      </div>
                    </div>
                
                    <div class="ctl_menu_item">
                      <input class="toggle" name="ctl_menu_group" id="sneaky_toggle3" type="radio"/>
                      <div class="expander">
                        <label for="sneaky_toggle3"><i class="ctl_menu_icon bi bi-universal-access"></i> <span class="ctl_menu_text">Body action</span></label>
                      </div>
                    </div>
                    

                    <div class="ctl_menu_item">
                      <input class="toggle" name="ctl_menu_group" id="sneaky_toggle2" type="radio"/>
                      <div class="expander">
                        <label for="sneaky_toggle2"><i class="ctl_menu_icon bi bi-arrows-fullscreen"></i> <span class="ctl_menu_text">Full</span></label>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
        <br/>
        </center>

      <div className='absolute top-left mt-50'>
        <Link to="/space/1" class="btn-round-lg lb-lg-2x ">
                    Back
        </Link>
      </div>
      
      </>)
}

function DynamicModel({ url, ...props }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} {...props} />
}

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

