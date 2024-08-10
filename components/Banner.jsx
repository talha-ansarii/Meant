import React from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Banner = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 });

  return (
    <div className="mx-auto  my-4 max-w-[1085px] h-[300px] relative overflow-hidden">
      <Image
        src={isMobile ? "/assets/images/mobileBanner.png" : "/assets/images/banner.webp"}
        alt="Banner"
        layout="fill"
        
        className={isMobile ? "object-contain " : "rounded-xl object-cover"} 
      />
    </div>
  );
};

export default Banner;
