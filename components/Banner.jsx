import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="mx-auto my-4 max-w-[1300px] h-[300px] relative overflow-hidden">
      <Image
        src="/assets/images/banner.webp"
        alt="Banner"
        layout="fill"
        objectFit="cover"
        className="rounded-xl"
      />
    </div>
  );
};

export default Banner;
