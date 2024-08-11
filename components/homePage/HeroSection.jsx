import React from "react";
import FlipWords from "@/components/ui/flip-words";
import Image from "next/image";

const HeroSection = () => {
  const words = ["Edition", "Collection", "Series"];
  return (
    <div>
      <div className="relative flex justify-center items-center h-[calc(100vh-100px)] md:h-[800px] lg:h-[800px] bg-black w-full">
        <div className="absolute font-poppins italiana left-[70%] top-[590px] lg:top-[150px] lg:left-[50%] lg:translate-x-[150px] text-md lg:text-3xl">
          <span>Limited </span>
          <FlipWords
            words={words}
            duration={3000}
            className="inline-block text-white"
          />
        </div>
        <Image
          src={"/assets/images/close.png"}
          alt="close"
          width={400}
          height={400}
          className="w-[500px] md:w-[750px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
