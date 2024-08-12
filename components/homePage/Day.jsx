"use client";

import Image from "next/image";
import { Toaster, toast } from "sonner";
import React, { useEffect, useRef, useState } from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/utils/cartUtils";

import {
  addProductToWishlist,
  getWishlistProducts,
  removeProductFromWishlist,
} from "@/utils/wishlistUtils";
import Link from "next/link";

const Day = ({ products }) => {
  const [isInWishlist1, setIsInWishlist1] = useState(false);
  const [isInCart1, setIsInCart1] = useState(false);
  const { isSignedIn } = useUser();
  const [wishlistFilled, setWishlistFilled] = useState(false);

  const router = useRouter();

  const ref = useRef(null);
  const canvasref = useRef(null);

  const productName1 = "Day Dazzle Lipstick";
  const product1 = products.find((p) => p.name === productName1);

  const handleCartClick = async (e) => {
    e.stopPropagation();
  
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
  
    try {
      await addProductToCart(product1.id, 1);
      toast.success("Added to cart");
  
      
  
      // Retrieve existing cart items from local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      // Check if the product is already in the cart
      const existingCartItemIndex = cartItems.findIndex(item => item.id === product1.id);
  
      if (existingCartItemIndex !== -1) {
        // If product exists, update its quantity
        cartItems[existingCartItemIndex].quantity += 1;
      } else {
        // If product doesn't exist, add it to the cart
        const newCartItem = { id: product1.id, quantity: 1 };
        cartItems.push(newCartItem);
      }
  
      // Save the updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };




  const handleWishlistClick = async (e, product1) => {
    e.stopPropagation();
    const wishlistKey = 'wishlist';
    
    // Initialize the wishlist from localStorage or an empty array
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
    if (!isSignedIn) {
      if (wishlistFilled) {
        wishlist = wishlist.filter((item) => item !== product1.id);
        toast.error("Removed from wishlist");
      } else {
        if (!wishlist.includes(product1.id)) {
          wishlist.push(product1.id);
        }
        toast.success("Added to wishlist");
      }
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    } else {
      try {
        if (wishlistFilled) {
          await removeProductFromWishlist(product1.id);
          toast.error("Removed from wishlist");
        } else {
          await addProductToWishlist(product1.id);
          toast.success("Added to wishlist");
        }
  
        // Update local storage
        if (!wishlist.includes(product1.id)) {
          wishlist.push(product1.id);
        } else {
          wishlist = wishlist.filter((item) => item !== product1.id);
        }
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      } catch (error) {
        console.error("Error updating wishlist in the database", error);
        toast.error("Error updating wishlist");
      }
    }
  
    setWishlistFilled(!wishlistFilled);
  };
  useEffect(() => {

    if(product1){
      const fetchWishlistProducts = async () => {
        let wishListproducts = [];
  
        if (isSignedIn) {
          // Fetch wishlist products from the database
          try {
            wishListproducts = await getWishlistProducts();
          } catch (error) {
            console.error("Error fetching wishlist products", error);
          }
        } else {
          // Fetch wishlist products from localStorage
          const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
          wishListproducts = localWishlist.map(id => ({ productId: id }));
        }
  
        // Check if the product is in the wishlist
        const contains = wishListproducts.some(prod => prod.productId === product1.id);
        setWishlistFilled(contains);
      };
  
      fetchWishlistProducts();

    }
  }, [product1, isSignedIn]);

  

  return (
    <div>
      <div className="w-full h-[110px] gradient1"></div>
      <Toaster position="top-right" richColors />
      <div className="w-full bg-white lg:h-[700px] md:h-[500px] relative overflow-hidden flex md:flex-row lg:flex-row flex-col  justify-center items-center ">
        <div
          ref={canvasref}
          className="bg-white  overflow-hidden md:w-[90%] lg:w-[80%]  md:flex-row lg:flex-row flex-col m-auto flex"
        >
          <div className="w-[90%] md:mt-[80px] h-full mx-auto flex justify-center items-center pt-[60px]  md:w-[50%] lg:w-[50%] ">
            {/* <div className="w-[1257px] absolute z-0 top-[-300px] left-[-200px] h-[1180px] radial-gradient"></div> */}
            <Image
              width={556}
              alt="day"
              height={556}
              src={"/assets/images/day.png"}
              className=""
            />
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
            <div className="flex l mt-2 items-center   z-[300]  gap-4">
              <svg
                className="w-8 h-8 cursor-pointer"
                fill={wishlistFilled ? "#D76D8E" : "none"}
                stroke="#D76D8E"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(e) => handleWishlistClick(e, product1)}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <HoverBorderGradient
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[100px] h-[30px] md:w-[147px] lg:w-[147px] md:h-[45px] lg:h-[45px] md:text-[14px] lg:text-[14px] flex items-center justify-center cursor-pointer font-poppins space-x-2 text-[10px] font-[500] leading-[18px]"
                onClick={handleCartClick}
                disabled={isInCart1}
              >
                <span>ADD TO CART</span>
              </HoverBorderGradient>

              <HoverBorderGradient
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[100px] h-[30px] md:w-[147px] lg:w-[147px] md:h-[45px] lg:h-[45px] flex items-center justify-center font-poppins space-x-2 text-[10px] md:text-[14px] lg:text-[14px] font-[500] leading-[18px]"
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
