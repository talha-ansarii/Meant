"use client";

import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Meteors } from "../ui/meteors";
import NightModelComponent from "./NightModelComponents";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
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

const Night = ({ products, setShow, show }) => {
  const [mouseIn, setMouseIn] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 1024 });

  const canvasref = useRef(null);
  const ref = useRef(null);

  const productName = "Night Muse Lipstick";
  const product = products.find((p) => p.name === productName);





  // gsap.registerPlugin(ScrollTrigger);

  // useGSAP(() => {
  //   if (ref.current) {
  //     gsap.from(ref.current, {
  //       scale: 0,
  //       opacity: 0,
  //       duration: 2,
  //       ease: "ease-in",
  //       scrollTrigger: {
  //         trigger: ref.current,
  //         start: "top bottom",
  //         end: "bottom top",
  //       },
  //     });

  //     ScrollTrigger.create({
  //       trigger: canvasref.current,
  //       start: "top 100%",
  //       onEnter: () =>
  //         gsap.to(window, {
  //           scrollTo: { y: ref.current, offsetY: 100 },
  //           duration: 0.3,
  //         }),
  //     });
  //   }
  // }, []);

  return (
    <div>
      <div className="w-full h-[1000px] bg-black relative overflow-hidden">
        <div className="bg-black md:mt-[200px] lg:mt-[200px] md:w-[90%] w-[80%] h-[100vh] md:flex-row lg:flex-row flex-col  overflow-hidden m-auto flex  ">
          <Meteors number={20} />

          <div className="w-[90%] md:w-[50%] lg:w-[50%] text-white z-20 flex flex-col gap-10 lg:px-16 md:px-16 h-[850px] md:pt-[200px] lg:pt-[200px]">
            <din className="">
              <Image
                src="/HomePage/Night/Night Muse Lipstick.svg"
                alt="hero"
                width={556}
                height={75}
              />
            </din>
            <div className="font-poppins font-[400] text-[10px] leading-[20px] md:text-[20px] md:leading-[30px] lg:text-[26px] lg:leading-[39px]">
              Four stunning matte lipstick shades for your perfect day out!
              <br />
              Available in four new lip adapting shades.
            </div>
           
          </div>
          {show && !isMobile && !isTablet && (
            <div ref={canvasref} className="w-[90%] md:w-[50%] lg:w-[50%] h-[850px] relative">
            <Meteors number={20} />
            <div
              onMouseLeave={() => setMouseIn(false)}
              onMouseEnter={() => setMouseIn(true)}
              className=" w-[100%]  pt-[150px] h-[850px] z-30 "
            >
              <Canvas ref={ref}>
                <Suspense fallback={null}>
                  <NightModelComponent mouseIn={mouseIn} />
                </Suspense>
              </Canvas>
            </div>
          </div>
          )}
          {isMobile && (
            <div ref={canvasref} className="w-[90%] md:w-[50%] lg:w-[50%] h-[850px] relative">
            <Meteors number={20} />
            <div
              onMouseLeave={() => setMouseIn(false)}
              onMouseEnter={() => setMouseIn(true)}
              className=" w-[100%] pt-12 lg:pt-[150px]  md:pt-[150px] h-[850px] z-30 "
            >
              <Canvas ref={ref}>
                <Suspense fallback={null}>
                  <NightModelComponent mouseIn={mouseIn} />
                </Suspense>
              </Canvas>
            </div>
          </div>
          )}
          {isTablet && (
            <div ref={canvasref} className="w-[50%] h-[850px] relative">
            <Meteors number={20} />
            <div
              onMouseLeave={() => setMouseIn(false)}
              onMouseEnter={() => setMouseIn(true)}
              className=" w-[100%]  pt-[150px] h-[800px] z-30 "
            >
              <Canvas ref={ref}>
                <Suspense fallback={null}>
                  <NightModelComponent mouseIn={mouseIn} />
                </Suspense>
              </Canvas>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Night;
