import React from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Banner = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 });

  return (
    <div
      className={`relative overflow-hidden ${
        isMobile ? "mx-4 max-w-full h-[200px] rounded-xl" : "mx-auto max-w-[1085px] h-[300px] rounded-xl"
      }`}
    >
      <Image
        src={isMobile ? "/assets/images/mobileBanner.png" : "/assets/images/banner.webp"}
        alt="Banner"
        layout="fill"
        className={`object-cover ${isMobile ? "rounded-xl" : "rounded-xl"}`}
      />
    </div>
  );
};

export default Banner;
