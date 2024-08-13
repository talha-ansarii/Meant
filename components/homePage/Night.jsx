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
import NightModelComponent from "./NightModelComponents";
import { useMediaQuery } from "react-responsive";
import NightModel from "../animations/NightModel";
import TabNightModel from "../animations/TabNightModel";
import MobileNightModel from "../animations/MobileNIghtModel";

const Night = ({ products, setShow, show }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { isSignedIn } = useUser();
  const [wishlistFilled, setWishlistFilled] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

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
      const existingCartItemIndex = cartItems.findIndex(
        (item) => item.id === product.id
      );

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
    if (product) {
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
          const localWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];
          wishListproducts = localWishlist.map((id) => ({
            productId: id,
          }));
        }

        // Check if the product is in the wishlist
        const contains = wishListproducts.some(
          (prod) => prod.productId === product.id
        );
        setWishlistFilled(contains);
      };

      fetchWishlistProducts();
    }
  }, [product, isSignedIn]);

  const handleWishlistClick = async (e, product) => {
    e.stopPropagation();

    const wishlistKey = "wishlist";

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
    <div className="relative z-[100]">
      <div className=" md:h-[600px] md:overflow-y-hidden overflow-x-hidden relative lg:h-[850px] bg-black over flex flex-col pt-[0px] md:flex-row lg:flex-row gap-6 w-[90%] m-auto">
        <Toaster position="top-right" richColors />

        <div className="absolute">
          <Meteors number={20} />
        </div>

        <div className="w-full overflow-visible md:pt-[180px] lg:w-[50%] md:w-[50%] md:p-0 lg:p-0">
          {isMobile &&

           (
            
            <div className="w-[100%] relative z-[300] mobile-nightmodel">
              <MobileNightModel />
            </div>
          )}
          {isTablet && (
            <div className="w-[100%] lg:pt-[150px] md:overflow-y-hidden md:mt-[-100px] md:h-auto h-[700px] relative z-[300]">
              <TabNightModel />
            </div>
          )}
          {isDesktop && (
            <div className="w-[100%] lg:mt-[-50px] md:mt-[-300px] h-[800px] relative z-[300]">
              <NightModel />
            </div>
          )}
        </div>
        <div className="flex w-full lg:w-[50%] md:w-[50%] flex-col gap-4">
          <div className="">
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
                className="relative mr-[16px]"
              >
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
                className="font-poppins font-[500] text-[10px] leading-[18px] w-[100px] h-[30px] md:w-[130px] lg:w-[147px] md:h-[45px] lg:h-[45px] md:text-[14px] lg:text-[14px] flex justify-center items-center bg-black text-white rounded-[34px]"
              >
                <Link href={"/product/60"}>
                  <span>ORDER NOW</span>
                </Link>
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for mobile adjustments */}
      <style jsx>{`
        @media (max-width: 400px) {
          .mobile-nightmodel {
            margin: 0 auto; /* Center the MobileNightModel on very small screens */
            max-width: 100%; /* Ensure it doesn't exceed container width */
          }

          .flex.w-full.lg\\:w-\\[50\\%\\].md\\:w-\\[50\\%\\].flex-col.gap-4 {
            align-items: center; /* Center the flex content on small screens */
            padding: 0 10px; /* Add some padding */
          }
        }
      `}</style>
    </div>
  );
};

export default Night;
