import { ProductOpenDay } from '@/public/models/ProductOpenDay';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React, { use, useEffect, useRef } from 'react'

const DayModelComponent = ({mouseIn}) => {


    const angleToRadians = (angleInDegrees) => {
        return (angleInDegrees * Math.PI) / 180;
      };

    const orbitRef = useRef(null);
    useEffect(() => {
        // console.log(orbitRef.current)
        // console.log(mouseIn)
        if (mouseIn === false)   {
            orbitRef.current.setAzimuthalAngle(angleToRadians(0));
            orbitRef.current.setPolarAngle(angleToRadians(100));
            orbitRef.current.update();
        }
        
    }, [mouseIn])
    useFrame((state) => {
        if (!!orbitRef.current && mouseIn === true) {
            // console.log(state)
            const { x, y } = state.pointer;
            orbitRef.current.setAzimuthalAngle(x * angleToRadians(10));
            orbitRef.current.setPolarAngle((y + 1) * angleToRadians(60));
            orbitRef.current.update();
            
            
        }
    },[mouseIn])
  return (
    <>
    <PerspectiveCamera makeDefault position={[0, 2, 10]} />
    <OrbitControls enableZoom={false} ref={orbitRef} />

    <mesh position={[0, 0, 0]} scale={1.2} rotation={[0.5,0,0]}  >
      <ProductOpenDay   />
       
    </mesh>

    {/* <ambientLight args={["#ffffff", 10]} />
    <directionalLight
      args={["#ffffff", 15, 7, 0.785398, 0.4]}
      position={[0, 2, 0]}
    /> */}
    <ambientLight intensity={0.5} />
      <directionalLight
        position={[2, 5, 5]}
        intensity={1}
        
      />
      <directionalLight
        position={[-2, 5, 5]}
        intensity={1}
        
      />
      <directionalLight
        position={[0, -5, 5]}
        intensity={0.2}
      />
      {/* <directionalLight
        position={[0, 3, 5]}
        intensity={1}
      /> */}
  </>
  )
}

export default DayModelComponent