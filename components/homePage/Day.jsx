"use client";

import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import DayModelComponent from "./DayModelComponent";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useCart } from "/context/CartContext";
import { useWishlist } from "/context/WishlistContext";
import products from "@/constants/products";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Day = () => {
  const [mouseIn, setMouseIn] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  const ref = useRef(null);
  const canvasref = useRef(null);

  const { addToCart, cart } = useCart();
  const { addToWishlist, wishlist, removeFromWishlist } = useWishlist();

  const productName = "Day Dazzle Lipstick";
  const product = products.find(p => p.name === productName);

  useEffect(() => {
    if (product) {
      // Check if product is in wishlist or cart
      const wishlistArray = Array.from(wishlist)
      const productInWishlist = wishlistArray.some(item => item.id === product.id);
      const productInCart = cart.some(item => item.id === product.id);
      setIsInWishlist(productInWishlist);
      setIsInCart(productInCart);
    }
  }, [wishlist, cart, product]);

  const handleAddToCart = () => {
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
    if (product) {
      addToCart(product, 1); 
      setIsInCart(true);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      if (isInWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
      setIsInWishlist(!isInWishlist);
    }
  };

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  useGSAP(() => {
    if (ref.current) {
      gsap.from(ref.current, {
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: "ease-in",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          // markers: true,
        },
      });

      ScrollTrigger.create({
        trigger: canvasref.current,
        start: "top 100%",

        // markers: true,
        onEnter: () =>
          gsap.to(window, {
            scrollTo: { y: ref.current, offsetY: 100 },
            duration: 0.3,
          }),
      });
    }
  }, []);

  return (
    <div>
      <div className="w-full h-[110px] gradient1"></div>
      <div className="w-full bg-white relative overflow-hidden flex  justify-center items-center">
        <div
          ref={canvasref}
          className="bg-white  h-[100vh] overflow-hidden w-[80%] m-auto flex"
        >
          <div className="w-[50%] ">
            {/* <div className="w-[1257px] absolute z-0 top-[-300px] left-[-200px] h-[1180px] radial-gradient"></div> */}
            <div
              onMouseLeave={() => setMouseIn(false)}
              onMouseEnter={() => setMouseIn(true)}
              className="w-[100%] pt-[150px]  h-[850px] z-30"
            >
              <Canvas ref={ref}>
                <Suspense fallback={null}>
                  <DayModelComponent mouseIn={mouseIn} />
                </Suspense>
              </Canvas>
            </div>
          </div>
          <div className="w-[50%] z-20 flex flex-col gap-10 px-16 h-[850px] pt-[170px]">
            <div className="">
              <Image
                src="/HomePage/day/Day Dazzle Lipstick.svg"
                alt="hero"
                width={556}
                height={75}
              />
            </div>
            <div className="font-poppins font-[400] text-[26px] leading-[39px] text-black">
              Four stunning matte lipstick shades for your perfect day out!
              <br />
              Available in four new lip adapting shades.
            </div>
            <div className="flex items-center gap-4">
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
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[147px] h-[44px] flex items-center justify-center font-poppins space-x-2 text-[16px] font-[500] leading-[24px]"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                <span>ADD TO CART</span>
              </HoverBorderGradient>

              <HoverBorderGradient
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[147px] h-[44px] flex items-center justify-center font-poppins space-x-2 text-[16px] font-[500] leading-[24px]"
              >
                <span>ORDER NOW</span>
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
