"use Client"

import ProductClosed from "@/public/models/ProductClosed";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { use, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const CloseBoxComponent = ({ mouseIn }) => {
  const modelRef = useRef();
  const lightRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const [scale, setScale] = useState(2);

  useEffect(() => {
    if(isMobile){
      setScale(1);
    }
  }, []);

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
    if (mouseIn === false) {
      orbitRef.current.setAzimuthalAngle(0);
      orbitRef.current.setPolarAngle(angleToRadians(80));
      orbitRef.current.update();
    }
  }, [mouseIn]);
  useFrame(
    (state) => {
      if (!!orbitRef.current && mouseIn === true) {
        const { x, y } = state.pointer;
        orbitRef.current.setAzimuthalAngle(x * angleToRadians(10));
        orbitRef.current.setPolarAngle((y + 1) * angleToRadians(50));
        orbitRef.current.update();
      }
    },
    [mouseIn]
  );
  return (
    <>
      <group ref={modelRef}>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <OrbitControls enableZoom={false} ref={orbitRef} />

        <mesh position={[0, 0, 0]} scale={scale} rotation={[1, 0, 0]}>
          <ProductClosed />
        </mesh>

        <ambientLight intensity={0.3} />
        <directionalLight position={[1, 5, 5]} intensity={1} />
        <directionalLight position={[-1, 5, 5]} intensity={1} />
        <directionalLight position={[0, 5, -5]} intensity={1} />
      </group>
    </>
  );
};

export default CloseBoxComponent;
