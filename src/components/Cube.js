import { useCallback, useState } from "react"
import { useTexture } from "@react-three/drei"
import { useBox } from "@react-three/cannon"
import create from "zustand" 

// This is a super naive implementation and wouldn't allow for more than a few thousand boxes.
// In order to make this scale this has to be one instanced mesh, then it could easily be
// hundreds of thousands.

const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) => set((state) => ({
     cubes: [...state.cubes, [x, y, z]] })),
}))

export const Cubes = () => {
  const cubes = useCubeStore((state) => state.cubes)
  return cubes.map((coords, index) => <Cube key={index} position={coords} />)
}

export const Cube = (props) => {
  const [ref] = useBox(() => ({ type: "Static", ...props }))
  const [hover, set] = useState(null)
  const addCube = useCubeStore((state) =>  {  console.log('add cube'); return state.addCube})
  const texture = useTexture('/SurfaceImperfections003_1K_var1.jpg')
  const onMove = useCallback((e) => (e.stopPropagation(),console.log('onMove'), set(Math.floor(e.faceIndex / 2))), [])
  const onOut = useCallback(() => set(null),console.log('onOut'),  [])
  const onClick = useCallback((e) => {
    e.stopPropagation()
    console.log('onClick')
    const { x, y, z } = ref.current.position
    console.log(ref.current.position)
    const dir = [
      [x + 1, y, z],
      [x - 1, y, z],
      [x, y + 1, z],
      [x, y - 1, z],
      [x, y, z + 1],
      [x, y, z - 1],
    ]
    console.log(dir[Math.floor(e.faceIndex / 2)])

    addCube(...dir[Math.floor(e.faceIndex / 2)])
  }, [])
  return (
    <mesh ref={ref} receiveShadow castShadow onPointerMove={onMove} onPointerOut={onOut} onClick={onClick}>
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial attach={`material-${index}`} key={index} map={texture} color={hover === index ? "hotpink" : "white"} />
      ))}
      <boxGeometry />
    </mesh>
  )
}
