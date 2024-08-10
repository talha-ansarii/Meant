"use client";

import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import DayModelComponent from "./DayModelComponent";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/utils/cartUtils";
import {
  addProductToWishlist,
  getWishlistProducts,
  removeProductFromWishlist,
} from "@/utils/wishlistUtils";
import { useMediaQuery } from "react-responsive";

const Day = ({ products }) => {
  const [mouseIn, setMouseIn] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 1024 });
 

  const router = useRouter();

  const ref = useRef(null);
  const canvasref = useRef(null);

  







  // gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // useGSAP(() => {
  //   if (ref.current && canvasref.current) {
  //     gsap.from(ref.current, {
  //       scale: 0,
  //       opacity: 0,
  //       duration: 2,
  //       ease: "ease-in",
  //       scrollTrigger: {
  //         trigger: ref.current,
  //         start: "top bottom",
  //         end: "bottom top",
  //         // markers: true,
  //       },
  //     });

  //     ScrollTrigger.create({
  //       trigger: canvasref.current,
  //       start: "top 100%",
  //       end: "top top",
  //       // markers: true,
  //       onEnter: () => {
  //         gsap.to(window, {
  //           scrollTo: { y: ref.current, offsetY: 100 },
  //           duration: 0.5,
  //         });
  //       },
  //     });
  //   }
  // }, []);

  return (
    <div>
      <div className="w-full h-[110px] gradient1"></div>
      <div className="w-full bg-white lg:h-[700px] md:h-[500px] relative overflow-hidden flex md:flex-row lg:flex-row flex-col  justify-center items-center ">
        <div
          ref={canvasref}
          className="bg-white  overflow-hidden md:w-[90%] lg:w-[80%]  md:flex-row lg:flex-row flex-col m-auto flex"
        >
          <div className="w-[90%] md:w-[50%] lg:w-[50%] ">
            {/* <div className="w-[1257px] absolute z-0 top-[-300px] left-[-200px] h-[1180px] radial-gradient"></div> */}
           {isMobile && (
            <div
              onMouseLeave={() => setMouseIn(false)}
              onMouseEnter={() => setMouseIn(true)}
              className="w-[100%] h-[700px]  z-30"
            >
              <Canvas ref={ref}>
                <Suspense fallback={null}>
                  <DayModelComponent mouseIn={mouseIn} />
                </Suspense>
              </Canvas>
            </div>
           )}
           {isTablet && (
            <div
              onMouseLeave={() => setMouseIn(false)}
              onMouseEnter={() => setMouseIn(true)}
              className="w-[100%]   h-[750px] z-30"
            >
              <Canvas ref={ref}>
                <Suspense fallback={null}>
                  <DayModelComponent mouseIn={mouseIn} />
                </Suspense>
              </Canvas>
            </div>
           )}
          </div>
          <div className="w-[90%] mx-auto  md:w-[50%] lg:w-[50%] z-20 flex flex-col gap-10 lg:px-16 lg:h-[850px] md:h-[850px] md:pt-[170px] lg:pt-[170px]">
            <div className="">
              <Image
                src="/HomePage/day/Day Dazzle Lipstick.svg"
                alt="hero"
                width={556}
                height={75}
                className="w-[556px] h-[75px]"
              />
            </div>
            <div className="font-poppins font-[400] md:text-[20px] md:leading-[30px] lg:text-[26px] leading-[39px] text-black">
              Four stunning matte lipstick shades for your perfect day out!
              <br />
              Available in four new lip adapting shades.
            </div>
          
          </div>
        </div>
      </div>
      <div className="w-full h-[110px] gradient2"></div>
    </div>
  );
};

export default Day;
