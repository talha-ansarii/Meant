import React, { useState, useEffect } from "react";
import FlipWords from "@/components/ui/flip-words";
import Image from "next/image";
import Typewriter from 'typewriter-effect';


const HeroSection = () => {
  const limited = ["Limited"];
  const collection = ["Edition"];
  
  
  // State to control the visibility of the scroll prompt text
  const [showScrollText, setShowScrollText] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollText(false); // Hide the scroll text once scrolling starts
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center h-[700px] md:h-[700px] lg:h-[300px] bg-black w-full">
      <div className="absolute sandana  left-[50%] translate-x-[-50%] top-[80px] lg:top-[100px] lg:left-[50%] lg:translate-x-[-50%] text-xl lg:text-3xl">
    
        <Typewriter
  options={{
    pauseFor: 2500,
    strings: ['Limited Edition'],
    autoStart: true,
    loop: true,
  }}
/>




    
      </div>
      {/* Scroll Text */}
      {showScrollText && (
        <div className="absolute bottom-[200px] text-6xl lg:bottom-[-300px] w-full flex justify-center">
          <div className="text-gray-500 mb-4 text-center text-sm">
            Scroll down
          </div>
        </div>
      )}
      {/* Uncomment the Image component if needed */}
      {/* <Image
        src={"/assets/images/close.png"}
        alt="close"
        width={400}
        height={400}
        className="w-[500px] md:w-[750px]"
      /> */}
    </div>
  );
};

export default HeroSection;
