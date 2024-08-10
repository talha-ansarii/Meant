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
      <div className=" h-[700px] overflow-x-hidden relative lg:h-[600px] bg-black over flex flex-col pt-[0px] md:flex-row lg:flex-row gap-6 w-[90%] m-auto ">
      <div className="w-full">
    <Meteors number={20} />

      </div>
        <div className="pt-[100px] w-full md:w-[50%] lg:w-[50%]  md:p-0 lg:p-0">
          <Image
            src="/assets/images/night.png"
            width={600}
            height={600}
            className="w-full relative z-[200]"
          />
        </div>
        <div className="flex flex-col gap-4">
          <din className="">
            <div className="flex md:pt-[200px] flex-col gap-y-6">
              <Image
                src="/HomePage/Night/Night Muse Lipstick.svg"
                alt="hero"
                width={556}
                height={75}
              />

              <div className="font-poppins font-[400] text-[10px] leading-[20px] md:text-[20px] md:leading-[30px] lg:text-[26px] lg:leading-[39px]">
                Four stunning matte lipstick shades for your perfect day out!
                <br />
                Available in four new lip adapting shades.
              </div>
            </div>
            <div className="   mt-8 flex items-center gap-4">
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

              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[10px] leading-[18px] w-[100px] h-[30px] md:w-[147px] lg:w-[147px] md:h-[45px] lg:h-[45px] md:text-[14px] flex justify-center items-center cursor-pointer lg:text-[14px] bg-black text-white rounded-[34px]"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                <span>ADD TO CART</span>
              </HoverBorderGradient>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[10px] leading-[18px]  w-[100px] h-[30px] md:w-[147px] lg:w-[147px] md:h-[45px] lg:h-[45px] md:text-[14px] lg:text-[14px] flex justify-center items-center bg-black text-white rounded-[34px]"
              >
                <Link href={"/product/60"}>
                  <span>ORDER NOW</span>
                </Link>
              </HoverBorderGradient>
            </div>
          </din>
        </div>
      </div>
    </div>
  );
};

export default Night;

{
  /* <div className="bg-black md:mt-[0px] lg:mt-[0px] md:w-[90%] w-[80%] h-[900px] md:flex-row lg:flex-row gap-4 flex-col overflow-hidden m-auto flex  ">
<Meteors number={20} />

<div className="pt-[100px] md:p-0 lg:p-0">
<Image 
src="/assets/images/night.png"
width={600}
height={600}
className="z-[1000] border relative  object-cover w-[400px] h-[400px] md:w-[50%] lg:w-[50%] md:h-[100vh] lg:h-[100vh] "
/>

</div>


<div className="w-[90%]  mt-4 md:flex lg:flex md:w-[50%] lg:w-[50%] text-white z-20 flex flex-col lg:gap-10 gap-4 lg:px-16 md:px-16  md:pt-[200px] lg:pt-[200px]">
 
 
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

    <HoverBorderGradient
      containerClassName="rounded-full"
      as="div"
      className="font-poppins font-[500] text-[10px] leading-[18px]  w-[100px] h-[30px] bg-black text-white rounded-[34px]"
      onClick={handleAddToCart}
      disabled={isInCart}
    >
    
      <span>ADD TO CART</span>
    </HoverBorderGradient>
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


<Meteors number={20} />



</div> */
}
