import { ProductOpenDay } from "@/public/models/ProductOpenDay";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { use, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const DayModelComponent = ({ mouseIn }) => {
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 1024 });
  const [scale , setScale] = useState(1.2)
  const angleToRadians = (angleInDegrees) => {
    return (angleInDegrees * Math.PI) / 180;
  };

  useEffect(() => {
    if(isMobile){
      setScale(0.8)
    }
    if(isTablet){
      setScale(0.8)
    }
  }, [isMobile, isTablet, scale]);

  // const orbitRef = useRef(null);
  // useEffect(() => {
  //   if (mouseIn === false) {
  //     orbitRef.current.setAzimuthalAngle(angleToRadians(0));
  //     orbitRef.current.setPolarAngle(angleToRadians(100));
  //     orbitRef.current.update();
  //   }
  // }, [mouseIn]);
  // useFrame(
  //   (state) => {
  //     if (!!orbitRef.current && mouseIn === true) {
  //       const { x, y } = state.pointer;
  //       orbitRef.current.setAzimuthalAngle(x * angleToRadians(10));
  //       orbitRef.current.setPolarAngle((y + 1) * angleToRadians(60));
  //       orbitRef.current.update();
  //     }
  //   },
  //   [mouseIn]
  // );
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} />
      {/* <OrbitControls enableZoom={false} ref={orbitRef} /> */}

      <mesh position={[0, 0, 0]} scale={scale} rotation={[0.5, 0, 0]}>
        <ProductOpenDay />
      </mesh>

      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 5]} intensity={1} />
      <directionalLight position={[-2, 5, 5]} intensity={1} />
      <directionalLight position={[0, -5, 5]} intensity={0.2} />
    </>
  );
};

export default DayModelComponent;
