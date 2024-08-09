"use client";

import React, { Suspense, useState } from "react";
import { Spotlight } from "../ui/spotlight";
import { Canvas } from "@react-three/fiber";
import CloseBoxComponent from "./CloseBoxComponent";
import VideoLoader from "../VideoLoader";

const HeroSection = () => {
  const [mouseIn, setMouseIn] = useState(false);

  return (
    <div>
      <div className="relative flex justify-center items-center h-[800px] bg-black w-full ">
        <Spotlight
          className="absolute -top-40 left-[200px] md:left-60 md:-top-20"
          fill="white"
        />
        <dov className="absolute playfair top-0 right-[40px] text-2xl">Limited Edition Collection</dov>
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
      </div>
    </div>
  );
};

export default HeroSection;
