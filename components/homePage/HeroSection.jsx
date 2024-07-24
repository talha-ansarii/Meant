"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Spotlight } from "../ui/spotlight";
import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import CloseBoxComponent from "./CloseBoxComponent";



const HeroSection = () => {

    const orbitRef = useRef(null);
    const [mouseIn, setMouseIn] = useState(false);

   

    

  return (
    <div>

    <div className="relative flex justify-center items-center h-[1000px] bg-black w-full ">

      <Spotlight
        className="absolute -top-40 left-[200px] md:left-60 md:-top-20"
        fill="white"
      />
      <div onMouseLeave={
        ()=>setMouseIn(false)
      } onMouseEnter={
        ()=>setMouseIn(true)
      } className=" w-[900px] h-[800px]  ">

      <Canvas   className="absolute" >
        
      
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
