import React from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Banner = () => {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 768 });

  return (
    <div
      className={`relative overflow-hidden ${
        isMobile
          ? "mx-4 max-w-full h-[200px] rounded-xl"
          : isTablet
          ? "mx-auto max-w-[600px] h-[250px] rounded-xl"
          : "mx-auto md:max-w-[1085px] lg:max-w-[1085px] h-[300px] rounded-xl"
      }`}
    >
      <Image
        src={
          isMobile
            ? "/assets/images/mob-banner.webp"
            : "/assets/images/banner.webp"
        }
        alt="Banner"
        layout="fill"
        className="object-cover rounded-xl"
      />
    </div>
  );
};

export default Banner;
