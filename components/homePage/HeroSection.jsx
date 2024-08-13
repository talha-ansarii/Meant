import React from "react";
import FlipWords from "@/components/ui/flip-words";
import Image from "next/image";

const HeroSection = () => {
  const limited = [ "Limited"];
  const collection = [ "Collection"];
  return (
    <div>
      <div className="relative flex justify-center items-center h-[700px] md:h-[700px] lg:h-[800px] bg-black w-full">
        <div className="absolute luxurious italiana left-[50%] translate-x-[-50%] top-[100px] lg:top-[100px] lg:left-[50%] lg:translate-x-[-50%] text-xl lg:text-3xl">
        
          <FlipWords
          
            words={limited}
            duration={3000}
            className="inline-block text-white"
          />
          <FlipWords
            words={collection}
            delay={3000}
            duration={3000}
            className="inline-block text-white"
          />
        </div>
        {/* <Image
          src={"/assets/images/close.png"}
          alt="close"
          width={400}
          height={400}
          className="w-[500px] md:w-[750px]"
        /> */}
      </div>
    </div>
  );
};

export default HeroSection;
