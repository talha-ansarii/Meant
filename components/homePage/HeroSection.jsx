"use client";

import React, { Suspense, useState } from "react";
import { Spotlight } from "../ui/spotlight";
import { Canvas } from "@react-three/fiber";
import CloseBoxComponent from "./CloseBoxComponent";
import VideoLoader from "../VideoLoader";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const [mouseIn, setMouseIn] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 480 });

  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 1024 });

  

  return (
    <div>
      <div className="relative flex justify-center pt-[200px] items-center h-[300px] md:h-[800px] lg:h-[800px] bg-black w-full ">
        
        <div className="absolute playfair top-0 right-[40px] text-2xl">Limited Edition</div>
        {
          isMobile && (
            <div
          onMouseLeave={() => setMouseIn(false)}
          onMouseEnter={() => setMouseIn(true)}
          className=" w-[900px] mt-[-200px]  h-[800px]  "
        >
          <Canvas className="absolute">
            <ambientLight intensity={1} />
            <Suspense fallback={null}>
              <CloseBoxComponent mouseIn={mouseIn} />
            </Suspense>
          </Canvas>
        </div>
          )
        }
        {
          isTablet && (
            <div
          onMouseLeave={() => setMouseIn(false)}
          onMouseEnter={() => setMouseIn(true)}
          className=" w-[900px] mt-[-200px]  h-[800px]  "
        >
          <Canvas className="absolute">
            <ambientLight intensity={1} />
            <Suspense fallback={null}>
              <CloseBoxComponent mouseIn={mouseIn} />
            </Suspense>
          </Canvas>
        </div>
          )
        }
      </div>
    </div>
  );
};

export default HeroSection;
