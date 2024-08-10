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
import Link from "next/link";

const Day = ({ products }) => {
  const [mouseIn, setMouseIn] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 1024 });
  const [isInWishlist1, setIsInWishlist1] = useState(false);
  const [isInCart1, setIsInCart1] = useState(false);
  const { isSignedIn } = useUser();
 

  const router = useRouter();

  const ref = useRef(null);
  const canvasref = useRef(null);

  const productName1 = "Day Dazzle Lipstick";
  const product1 = products.find((p) => p.name === productName1);

  

  const handleAddToCart1 = async () => {
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
    if (product1) {
      try {
        const data = await addProductToCart(product1.id, 1);
        console.log("Product added to cart:", data);
      } catch (error) {
        console.error("Error adding product to cart:", error);
        return;
      }
      setIsInCart1(true);
    }
  };
  const handleAddToWishlist1 = () => {
    if (product1) {
      if (isInWishlist1) {
        removeProductFromWishlist(product1.id);
      } else {
        addProductToWishlist(product1.id);
      }
      setIsInWishlist1(!isInWishlist1);
    }
  };

  useEffect(() => {
    if (product1) {
      const fetchWishlistProducts = async () => {
        const wishListproducts = await getWishlistProducts();
        console.log(wishListproducts);
        const contains = wishListproducts?.some((prod) => {
          // console.log(prod.productId, product.id)
          return prod.productId === product1.id;
        });
        setIsInWishlist1(contains);
      };

      fetchWishlistProducts();
    }
  }, [isInWishlist1]);

  







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
          <div className="w-[90%] mx-auto  md:w-[50%] lg:w-[50%] z-20 flex flex-col lg:gap-10 lg:px-16 lg:h-[850px] md:h-[850px] md:pt-[170px] lg:pt-[170px]">
            <div className="">
              <Image
                src="/HomePage/day/Day Dazzle Lipstick.svg"
                alt="hero"
                width={556}
                height={75}
                className="w-[556px] h-[75px]"
              />
            </div>
            <div className="font-poppins font-[400] mb-2 md:text-[20px] md:leading-[30px] lg:text-[26px] leading-[20px] text-black">
              Four stunning matte lipstick shades for your perfect day out!
              <br />
              Available in four new lip adapting shades.
            </div>
            <div className="flex lg:hidden mt-2 items-center md:hidden  z-[300]  gap-4">
              <svg
                className="w-8 h-8 cursor-pointer"
                fill={isInWishlist1 ? "#D76D8E" : "none"}
                stroke="#D76D8E"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleAddToWishlist1}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <HoverBorderGradient
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[100px] h-[30px] flex items-center justify-center font-poppins space-x-2 text-[10px] font-[500] leading-[18px]"
                onClick={handleAddToCart1}
                disabled={isInCart1}
              >
                <span>ADD TO CART</span>
              </HoverBorderGradient>

              <HoverBorderGradient
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[100px] h-[30px] flex items-center justify-center font-poppins space-x-2 text-[10px] font-[500] leading-[18px]"
              >
              <Link href={"/product/58"}>
              <span>ORDER NOW</span>
              </Link>
                
              </HoverBorderGradient>
            </div>
          
          </div>
        </div>
      </div>
      <div className="w-full h-[110px] gradient2"></div>
    </div>
  );
};

export default Day;
