import ProductClosed from '@/public/models/ProductClosed'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React, { use, useEffect, useRef } from 'react'

const CloseBoxComponent = ({mouseIn}) => {
  const modelRef = useRef();
  const lightRef = useRef();

  // useFrame(() => {
  //   if (modelRef.current && lightRef.current) {
  //     modelRef.current.rotation.y += 0.01;
  //     lightRef.current.position.set(
  //       10 * Math.sin(modelRef.current.rotation.y),
  //       10,
  //       10 * Math.cos(modelRef.current.rotation.y)
  //     );
  //   }
  // });
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
     <group ref={modelRef}>
    <PerspectiveCamera makeDefault position={[0, 2, 10]} />
    <OrbitControls enableZoom={false} ref={orbitRef} />

    <mesh position={[0, 0, 0]} scale={2} rotation={[1,0,0]}  >
      <ProductClosed   />
       
    </mesh>
{/* 
    <ambientLight 
    args={["#ffffff", 5]} /> */}
    {/* <directionalLight
      args={["#ffffff", 10]}
      position={[0, 2, 0]}

    /> */}
    {/* <directionalLight  intensity={  1} position={[0, 10, 5]} /> */}
    <ambientLight intensity={0.3} />
      <directionalLight
        position={[1, 5, 5]}
        intensity={1}
        
      />
      <directionalLight
        position={[-1, 5, 5]}
        intensity={1}
        
      />
      <directionalLight
        position={[0, 5, -5]}
        intensity={1}
        
      />
      {/* <pointLight position={[0, 5, 0]} intensity={10} /> */}

     </group>
  </>
  )
}

export default CloseBoxComponent