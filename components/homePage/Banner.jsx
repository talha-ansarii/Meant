"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
const images = [
  "/HomePage/banner/1.jpeg",
  "/HomePage/banner/2.jpeg",
  "/HomePage/banner/3.jpeg",
];
const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === 2) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [index]);
  return (
    <div className="w-full bg-black pb-[100px] ">
      <div className="w-[80%] h-[486px] m-auto flex ">
        <div className="w-[50%]  ">
          <Image
            width={100}
            height={100}
            src={images[index]}
            alt="banner"
            className="object-cover w-[100%] h-[486px] rounded-l-[10px]"
          />
        </div>
        <div className="w-[50%] relative ">
          <Image
            width={100}
            height={100}
            src={"/HomePage/banner/bg.jpeg"}
            alt="banner"
            className="object-cover w-[100%] h-[486px] rounded-r-[10px]"
          />
          <div className="absolute left-[50%] top-[50%] translate-x-[-50%] flex flex-col justify-center items-center translate-y-[-50%] ">
            <div className="relative w-[246px] h-[18px] ">
              <div className="absolute top-0 left-0 w-[246px] h-[18px] bg-black"></div>
              <div className="absolute top-[-17.5px] left-[20px]  w-[246px] poppins-regular text-white text-[32px] leading-[48px] font-[600] text-wrap">
                Meant for you
              </div>
            </div>
            <div className=" poppins-regular text-[16px] leading-[24px] mt-[30px] font-[600] text-center">
              A buttery, pigment-rich, soft matte
              <br /> lipstick that hugs lips in pure
              <br /> comfort all day.
            </div>
            <button className="poppins-regular font-[600] text-[16px] leading-[24px] text-white w-[116px] h-[36px] bg-black rounded-[3px] mt-[30px]">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
