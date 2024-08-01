import React from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Banner = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 });

  return (
    <div className="mx-auto my-4 max-w-[1100px] h-[300px] relative overflow-hidden">
      <Image
        src={isMobile ? "/assets/images/mob-banner.webp" : "/assets/images/banner.webp"}
        alt="Banner"
        layout="fill"
        objectFit="cover"
        lassName={isMobile ? "" : "rounded-xl"} 
      />
    </div>
  );
};

export default Banner;
