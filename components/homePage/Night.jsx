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
import Link from "next/link";

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


  const handleAddToCart = async () => {
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
    if (product) {
      try {
        const data = await addProductToCart(product.id, 1);
        console.log("Product added to cart:", data);
      } catch (error) {
        console.error("Error adding product to cart:", error);
        return;
      }
      setIsInCart(true);
    }
  };
  useEffect(() => {
    if (product) {
      const fetchWishlistProducts = async () => {
        const wishListproducts = await getWishlistProducts();
        console.log(wishListproducts);
        const contains = wishListproducts?.some((prod) => {
          // console.log(prod.productId, product.id)
          return prod.productId === product.id;
        });
        setIsInWishlist(contains);
      };

      fetchWishlistProducts();
    }
  }, [isInWishlist]);

  const handleAddToWishlist = () => {
    if (product) {
      if (isInWishlist) {
        removeProductFromWishlist(product.id);
      } else {
        addProductToWishlist(product.id);
      }
      setIsInWishlist(!isInWishlist);
    }
  };



  return (
    <div>
      <div className="w-full h-[1000px] bg-black relative overflow-hidden">
        <div className="bg-black md:mt-[200px] lg:mt-[200px] md:w-[90%] w-[80%] h-[100vh] md:flex-row lg:flex-row flex-col  overflow-hidden m-auto flex  ">
          <Meteors number={20} />
          <Meteors number={20} />


          <div className="w-[90%] md:flex lg:flex md:w-[50%] lg:w-[50%] text-white z-20 hidden flex-col gap-10 lg:px-16 md:px-16 h-[850px] md:pt-[200px] lg:pt-[200px]">
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
            <div className="  md:hidden lg:hidden top-[2500px] z-[300] flex items-center gap-4">
              <svg
                className="w-8 h-8 cursor-pointer"
                fill={isInWishlist ? "#D76D8E" : "none"}
                stroke="#D76D8E"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleAddToWishlist}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

              {/* <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[16px] leading-[24px]  w-[100px] h-[30px] bg-black text-white rounded-[34px]"
                // onClick={handleAddToCart}
                // disabled={isInCart}
              >
              
                <span>ADD TO CART</span>
              </HoverBorderGradient> */}
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[10px] leading-[18px]  w-[100px] h-[30px] bg-black text-white rounded-[34px]"
              >
              <Link href={"/product/60"}>
                <span>ORDER NOW</span>
                
                </Link>
              </HoverBorderGradient>
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
          <Meteors number={20} />

          {isMobile && (
            <div ref={canvasref} className="w-[90%] md:w-[50%] lg:w-[50%]  relative">
            <Meteors number={20} />
            <div
              onMouseLeave={() => setMouseIn(false)}
              onMouseEnter={() => setMouseIn(true)}
              className=" w-[100%] pt-0 lg:pt-[150px]  md:pt-[150px] h-[750px] z-30 "
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

        <div className="w-full md:hidden lg:hidden md:w-[50%] lg:w-[50%] text-white z-20 flex px-4 mt-4 flex-col gap-2 lg:px-16 md:px-16 h-[850px] md:pt-[200px] lg:pt-[200px]">
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
            <div className="  md:hidden lg:hidden top-[2500px] z-[300] flex items-center gap-4">
              <svg
                className="w-8 h-8 cursor-pointer"
                fill={isInWishlist ? "#D76D8E" : "none"}
                stroke="#D76D8E"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleAddToWishlist}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

              {/* <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[16px] leading-[24px]  w-[100px] h-[30px] bg-black text-white rounded-[34px]"
                // onClick={handleAddToCart}
                // disabled={isInCart}
              >
              
                <span>ADD TO CART</span>
              </HoverBorderGradient> */}
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[10px] leading-[18px]  w-[100px] h-[30px] bg-black text-white rounded-[34px]"
              >
              <Link href={"/product/60"}>
                <span>ORDER NOW</span>
                
                </Link>
              </HoverBorderGradient>
            </div>
           
          </div>
      </div>
    </div>
  );
};

export default Night;
