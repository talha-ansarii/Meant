"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { Meteors } from "../ui/meteors";
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
import LikeButton from "../likeButton/LikeButton";

const Night = ({ products, setShow, show }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { isSignedIn } = useUser();
  const [wishlistFilled, setWishlistFilled] = useState(false);
  const router = useRouter();

  const canvasref = useRef(null);
  const ref = useRef(null);

  const productName = "Night Muse Lipstick";
  const product = products.find((p) => p.name === productName);

   const handleCartClick = async (e) => {
    e.stopPropagation();
  
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
  
    try {
      await addProductToCart(product.id, 1);
      toast.success("Added to cart");
  
      
  
      // Retrieve existing cart items from local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      // Check if the product is already in the cart
      const existingCartItemIndex = cartItems.findIndex(item => item.id === product.id);
  
      if (existingCartItemIndex !== -1) {
        // If product exists, update its quantity
        cartItems[existingCartItemIndex].quantity += 1;
      } else {
        // If product doesn't exist, add it to the cart
        const newCartItem = { id: product.id, quantity: 1 };
        cartItems.push(newCartItem);
      }
  
      // Save the updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  useEffect(() => {

    if(product){
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
        const contains = wishListproducts.some(prod => prod.productId === product.id);
        setWishlistFilled(contains);
      };
  
      fetchWishlistProducts();

    }
  }, [product, isSignedIn]);

  const handleWishlistClick = async (e,product) => {


    e.stopPropagation();

    
    const wishlistKey = 'wishlist';
    
    // Initialize the wishlist from localStorage or an empty array
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
    if (!isSignedIn) {
      if (wishlistFilled) {
        wishlist = wishlist.filter((item) => item !== product.id);
        toast.error("Removed from wishlist");
      } else {
        if (!wishlist.includes(product.id)) {
          wishlist.push(product.id);
        }
        toast.success("Added to wishlist");
      }
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    } else {
      try {
        if (wishlistFilled) {
          await removeProductFromWishlist(product.id);
          toast.error("Removed from wishlist");
        } else {
          await addProductToWishlist(product.id);
          toast.success("Added to wishlist");
        }
  
        // Update local storage
        if (!wishlist.includes(product.id)) {
          wishlist.push(product.id);
        } else {
          wishlist = wishlist.filter((item) => item !== product.id);
        }
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      } catch (error) {
        console.error("Error updating wishlist in the database", error);
        toast.error("Error updating wishlist");
      }
    }
  
    setWishlistFilled(!wishlistFilled);
  };

  return (
    <div className="relative">
      <div className=" h-[800px] md:h-[500px] overflow-x-hidden relative lg:h-[700px] bg-black over flex flex-col pt-[0px] md:flex-row lg:flex-row gap-6 w-[90%] m-auto ">
        <Toaster position="top-right" richColors />

        <div className="absolute">
          <Meteors number={20} />
        </div>

        <div className="pt-[100px] w-full md:pt-[180px] lg:w-[50%] md:w-[50%]  md:p-0 lg:p-0">
          <Image
            src="/assets/images/night.png"
            width={600}
            height={600}
            className="w-full relative  z-[200]"
          />
        </div>
        <div className="flex w-full lg:w-[50%] md:w-[50%] flex-col gap-4">
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
            <div className="ml-[20px] mt-8 flex items-center gap-4">
            <div
              onClick={(e) => handleWishlistClick(e, product)}
               className="relative mr-[16px]">
              <LikeButton wishlistFilled={wishlistFilled} />

              </div>

              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[10px] leading-[18px] w-[100px] h-[30px] md:w-[130px] lg:w-[147px] md:h-[45px] lg:h-[45px] md:text-[14px] flex justify-center items-center cursor-pointer lg:text-[14px] bg-black text-white rounded-[34px]"
                onClick={handleCartClick}
                disabled={isInCart}
              >
                <span>ADD TO CART</span>
              </HoverBorderGradient>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[10px] leading-[18px]  w-[100px] h-[30px] md:w-[130px] lg:w-[147px] md:h-[45px] lg:h-[45px] md:text-[14px] lg:text-[14px] flex justify-center items-center bg-black text-white rounded-[34px]"
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
