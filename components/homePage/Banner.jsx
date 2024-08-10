"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const images = [
  "/HomePage/banner/1.jpeg",
  "/HomePage/banner/2.jpeg",
  "/HomePage/banner/3.jpeg",
  "/HomePage/banner/4.jpeg"
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
      <div className="w-[80%] lg:h-[486px] h-[200px] md:h-[300px] m-auto flex ">
        <div className="w-[50%]  ">
          <img
            width={100}
            height={100}
            src={images[index]}
            alt="banner"
            className="object-cover w-[100%] lg:h-[486px] h-[200px] md:h-[300px] rounded-l-[10px]"
          />
        </div>
        <div className="w-[50%] relative ">
          <img
            width={100}
            height={100}
            src={"/assets/images/meantForYou.jpeg"}
            alt="banner"
            className="object-cover w-[100%] lg:h-[486px] h-[200px] md:h-[300px] rounded-r-[10px]"
          />
          <div className="absolute left-[50%] top-[63%] translate-x-[-50%] flex flex-col justify-center items-center translate-y-[-50%] ">
           
            <Link href={"/products"} className="poppins-regular font-[600] text-[16px] leading-[24px] text-white w-[116px] h-[36px] bg-black rounded-[3px] mt-[30px]">
              <div className="w-full h-full flex justify-center items-center">
              <div>
              SHOP NOW
              </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
