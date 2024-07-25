import ProductClosed from '@/public/models/ProductClosed'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React, { use, useEffect, useRef } from 'react'

const CloseBoxComponent = ({mouseIn}) => {
    const angleToRadians = (angleInDegrees) => {
        return (angleInDegrees * Math.PI) / 180;
      };

    const orbitRef = useRef(null);
    useEffect(() => {
        // console.log(orbitRef.current)
        // console.log(mouseIn)
        if (mouseIn === false)   {
            orbitRef.current.setAzimuthalAngle(0);
            orbitRef.current.setPolarAngle(angleToRadians(80));
            orbitRef.current.update();
        }
        
    }, [mouseIn])
    useFrame((state) => {
        if (!!orbitRef.current && mouseIn === true) {
            // console.log(state)
            const { x, y } = state.pointer;
            orbitRef.current.setAzimuthalAngle(x * angleToRadians(10));
            orbitRef.current.setPolarAngle((y + 1) * angleToRadians(50));
            orbitRef.current.update();
            
            
        }
    },[mouseIn])
  return (
    <>
    <PerspectiveCamera makeDefault position={[0, 2, 10]} />
    <OrbitControls enableZoom={false} ref={orbitRef} />

    <mesh position={[0, 0, 0]} scale={2} rotation={[1,0,0]}  >
      <ProductClosed   />
       
    </mesh>

    <ambientLight args={["#ffffff", 10]} />
    <directionalLight
      args={["#ffffff", 15, 7, 0.785398, 0.4]}
      position={[0, 2, 0]}

    />
  </>
  )
}

export default CloseBoxComponent