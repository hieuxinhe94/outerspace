import React, { Suspense,useRef,useEffect, useMemo }from 'react'
import { Canvas, useLoader} from '@react-three/fiber'
import { TextureLoader, LinearFilter } from "three"
import {state} from "./store"
import { Block, useBlock } from "./components/block"
import { Text } from "./components/Text"
import Plane from "./components/Plane"

import "./styles.css"
import { Loader,  Html } from '@react-three/drei'


import {useStore} from './store'
import Stars from './3d/Stars'
import Planets from './3d/Planets'
import Effects from './3d/Effects'
import * as THREE from 'three'
import Rings from './3d/Rings'
import Rig from './3d/Rig'  
 
import  Peoples from './3d/Peoples'
import Typewriter from 'typewriter-effect';

import {
  Link
} from 'react-router-dom';
import Menu from './components/Menu'
 
// function Model({ url }) {
//   const { nodes } = useGLTF(url)
//   return (
//     <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={7}>
//       <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
//         <mesh receiveShadow castShadow geometry={nodes.planet002.geometry} material={nodes.planet002.material} />
//         <mesh geometry={nodes.planet003.geometry} material={nodes.planet003.material} />
//       </group>
//     </group>
//   )
// }


function FeatureSection({ image, index, offset, factor, header, aspect, text, topic, link }) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.85 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size * 1.2
  const left = !(index % 2)
  const color ="#FFFFF"
  return (
    <Block factor={factor} offset={offset} className="aaa">
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane map={image} args={[1, 1, 16, 32]} shift={50} size={size} aspect={aspect} 
        position={[((left ? -w : w) * size * 0.25) / 2, 1.5, -10]}
        scale={[w * size * 0.75, (w * size) * 0.75/ aspect, 1]} frustumCulled={false} />
        <Html
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "left" , zIndex: 2}}
          position={[left || mobile ?   (w - 6)/2: -(w) , 6.2, 1]}>
            <div tabIndex={index}>
            <span class="lb-lg"> {(topic)}</span>
          </div>
         
          <div tabIndex={index}>{text}</div>
          <br/>
          <div tabIndex={index}>
           
            <a href="/space/1" class="btn-round-lg">EXPLORE NOW</a>
          </div>
        </Html>
        <Text left={left} right={!left} size={w * 0.02} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1]}>
          {header}
        </Text>
        <Block factor={0.2}>
          <Text opacity={0.75} size={w * 0.01} color="#1A1E2A" position={[((left ? w : -w) / 2) * size, (w * size) / aspect / 1, -10]}>
            {(topic)}
          </Text>
        </Block>
      </group>
    </Block>
  )
}

function Content() {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  )
  useMemo(() => images.forEach((texture) => (texture.minFilter = LinearFilter)), [images])
  const { contentMaxWidth: w, mobile } = useBlock()
  return (
    <>
      <Block factor={1.2} offset={0}>
      <group position={[0, 0, 0]}>
        <Text size={w * 0.04} top>
            What's the other built?
        </Text>
      </group>
      </Block>
      {
      state.paragraphs.map((props, index) => (
        <FeatureSection key={index} index={index} {...props} image={images[index]} />
      ))}

      <JoinNow offset={2.5} />
      <NewFeatures offset={2.6} />
      <Footer offset={3.0}/>
    </>
  )
}

function NewFeatures({offset}) {
  const { contentMaxWidth: w} = useBlock()
  const zoom =70;
  return (<>
  <Block factor={5} offset={offset}>
  <group position={[0, 0, 0]}>
    
    <Html style={{ width: w * zoom, textAlign: "center"}}
          position={[-w , 10, 1]} >
          <div className='highlighting-section'>
           <center class="highlighting-post"> 
            <Highlight/>
           </center>
           <center class="highlighting-post"> 
                  <Highlight/>
            </center>
          <div>
          <center class="highlighting-post"> 
            <Highlight/>
          </center>  
          </div>
          </div>
    </Html>

  </group>
  </Block>
  </>)
}
function Highlight({index}) {
  return (<>
          <div>
            <img class="lb-lg" alt='' height={200} width={250} src='https://cdn2.unrealengine.com/tfoa-blog-feed-01-1920x1080-75716018bc86.jpg'/>
          </div>
          <div >
            <span class="lb-lg-2x"> New release brings Mesh to MetaHuman to Unreal Engine, and much more!</span>
          </div>
         
          <div>
            <span class="lb-lg">
            This release of the MetaHuman framework brings not only new features for MetaHuman Creator.
            This release of the MetaHuman framework brings not only new features for MetaHuman Creator.
            </span>
            </div>
          <br/>
         
    </>)
}

function JoinNow({offset}) {
  const { contentMaxWidth: w} = useBlock()
  const zoom =70;
  return (<>
  <Block factor={5} offset={offset}>
  <group position={[0, 0, 0]} >
    
    <Html style={{ width: w * zoom, textAlign: "center", zIndex: 2}}
          position={[-w , 10, 1]} >
          <div className='joinnow-section'>
           <center> <span> Register to connect your friends</span></center>
            <br/> 
            <center> <span> Stay Connected with Peoples and their Dream.</span></center>
            <br/> 
          <div>
            <a href="#1" class="btn-round-lg">SIGN UP NOW</a>
          </div>
          </div>
    </Html>

  </group>
  </Block>
  </>)
}

function Footer({offset}) {
  const { contentMaxWidth: w} = useBlock()
  const zoom =70;
  return (<>
  <Block factor={5} offset={offset}>
  
    
    <Html style={{ width: w * zoom, textAlign: "center", zIndex: -1}}
          position={[-w , 10, 1]} >
          <div className='footer-section'>
           <center> <span> Footer</span></center>
            
          <div>
           
          </div>
          </div>
    </Html>

   
  </Block>
  </>)
}

export default function Home() {
  var rootPage = document.body;
  rootPage.style.height = "100%";
  rootPage.style.overflow = "hidden";

  const scrollArea = useRef()
  const heroArea = useRef()
  const onScroll = (e) => { 
    
    console.log(e.target.scrollTop - window.innerHeight); 
    if(e.target.scrollTop > 20) {
      const node = heroArea.current;
      console.log(node); 
      node.style.display = "none";
    } else {
      const node = heroArea.current;
      console.log(node); 
      node.style.display = "block";
    }

    return (state.top.current = e.target.scrollTop)
  }
  useEffect(() =>  { console.log("scroll useEffect"); return  onScroll({ target: scrollArea.current })}, []); 
  const { fov } = useStore((state) => state.mutation)
  const actions = useStore((state) => state.actions)
  return (
    <>
    <section ref={heroArea} id='hero-section'>
      <div className="bg" />
      <div onPointerMove={actions.updateMouse} onClick={actions.shoot}>
      <Canvas
        linear
        mode="concurrent"
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 2000], near: 0.01, far: 10000, fov }}
        onCreated={({ gl, camera }) => {
          actions.init(camera)
          gl.toneMapping = THREE.LinearToneMapping
          gl.setClearColor(new THREE.Color('#020209'))
        }}>
        <fog attach="fog" args={['#070710', 100, 700]} />
        <ambientLight intensity={0.25} />
        <Stars />
        <Rings />
        <Suspense fallback={null}>
          <Planets />
          <Peoples/>
          <Rig>
            
          </Rig>
        </Suspense>
        <Effects />
       
      </Canvas>
      
    </div>
    <h1>
    <div class="hero-slogan">
      <Typewriter
        onInit={(typewriter) => {
          typewriter.pauseFor(500)
          .typeString('Welcome to <br/><span style="color: #27ae60;">the OuterSpace</span>!')
          .pauseFor(300)
          //.deleteChars(50)
          .deleteAll(1)
          .typeString('Explore')
          .pauseFor(50)
          .typeString(', Share')
          .pauseFor(50)
          .typeString(' & ')
          .typeString('Build')
          .typeString(' <br/> <span style={{ fontSize: \'0.4em\' }}></span> what you\'re Dream!')
          .pauseFor(1000)
          .start();
        }}
      />
         </div>
       <div>
      
       </div>
      </h1>
      <div className="layer" />
      <Loader />


      <Link className='absolute top-right btn-round-lg' to="/sign-in">SIGN IN</Link>
      <a href="#2" className="absolute bottom-left lb-sm" children="Experiment V1" />
      <div class="arrow">
                <span></span>
                <span></span>
                <span></span>
                {/* <i class="lb-lg">Scroll to see more</i> */}
      </div>
      </section>

      <section id='feature-section'>
      <Canvas linear dpr={[1, 2]} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Suspense fallback={<Html center className="loading" children="Loading..." />}>
          <Content />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div>
      </section>

     
    </>
  )
}
