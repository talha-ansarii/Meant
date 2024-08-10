"use client";

import React, { Suspense, useState } from "react";
import { Spotlight } from "../ui/spotlight";
import { Canvas } from "@react-three/fiber";
import CloseBoxComponent from "./CloseBoxComponent";
import VideoLoader from "../VideoLoader";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {


  

  return (
    <div>
      <div className="relative flex justify-center  items-center h-[calc(100vh-100px)] md:h-[800px] lg:h-[800px] bg-black w-full ">
        
        <div className="absolute font-poppins italiana left-[70%] top-[590px] lg:top-[150px] lg:left-[50%] lg:translate-x-[150px] text-md lg:text-3xl">Limited Edition</div>
       <img

       src={"/assets/images/close.png"}
        width={400}
        height={400}
        className="w-[500px] md:w-[750px]  "
        />
       
      </div>
    </div>
  );
};

export default HeroSection;
