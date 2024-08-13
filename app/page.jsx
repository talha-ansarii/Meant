"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/homePage/Banner";
import Day from "@/components/homePage/Day";
import HeroSection from "@/components/homePage/HeroSection";
import Icons from "@/components/homePage/Icons";
import Night from "@/components/homePage/Night";
import Picture from "@/components/homePage/Picture";
import { Suspense, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  addProductToWishlist,
  getWishlistProducts,
  removeProductFromWishlist,
} from "@/utils/wishlistUtils";
import { addProductToCart } from "@/utils/cartUtils";
import { useRouter } from "next/navigation";
import { FaArrowDown } from "react-icons/fa";
import Mobile from "@/components/animations/Mobile";
import { useMediaQuery } from "react-responsive";
import Tab from "@/components/animations/Tab";
import Desktop from "@/components/animations/Desktop";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import LikeButton from "@/components/likeButton/LikeButton";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [isInWishlist1, setIsInWishlist1] = useState(false);
  const [isInCart1, setIsInCart1] = useState(false);
  const { isSignedIn } = useUser();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });
 
    const [wishlistFilled, setWishlistFilled] = useState(false);


  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products");
        const data = await response.json();
        setProducts(data);

        // console.log("Fetched products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    console.log(products)
  }, []);


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
    <div className="relative  bg-black">
      <Toaster position="top-right" richColors />
        {isMobile && (
          <div className="absolute z-[200] top-0 left-0  w-full h-full">
          {/* {console.log("Mobile")} */}
            <Mobile />
          </div>
        )}
        {isTablet && (
          
          <div className="absolute z-[200] top-0  left-0 w-full h-full">
          {console.log("Tablet")}
            <Tab />
          </div>
        )}
        {isDesktop && (
          <div className="absolute z-[200] top-0  left-0 w-full h-full">
          {/* {console.log("Desktop")} */}
            <Desktop />
          </div>
        )}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full relative z-[300] bg-black">
          <Header />
        </div>
        <div className="absolute w-full">
          <div className="pt-[100px] relative w-full pb-4">
            <HeroSection />

            <div className="relative">
            <div className="flex absolute z-[300] left-[20px] top-[850px] l mt-2 items-center ml-[20px]   gap-4 md:left-[400px] md:top-[800px] lg:left-[820px] lg:top-[1600px] ">
              
              <div
              onClick={(e) => handleWishlistClick(e, product1)}
              className="relative mr-[16px]">
              <LikeButton
               wishlistFilled={wishlistFilled}
                />

              </div>
              <HoverBorderGradient
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[100px] h-[30px] md:w-[130px] lg:w-[147px] md:h-[45px] lg:h-[45px] md:text-[14px] lg:text-[14px] flex items-center justify-center cursor-pointer font-poppins space-x-2 text-[10px] font-[500] leading-[18px]"
                onClick={handleCartClick}
                disabled={isInCart1}
              >
                <span>ADD TO CART</span>
              </HoverBorderGradient>

              <HoverBorderGradient
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[100px] h-[30px] md:w-[130px] lg:w-[147px] md:h-[45px] lg:h-[45px] flex items-center justify-center font-poppins space-x-2 text-[10px] md:text-[14px] lg:text-[14px] font-[500] leading-[18px]"
              >
                <Link href={"/product/58"}>
                  <span>ORDER NOW</span>
                </Link>
              </HoverBorderGradient>
            </div>
            </div>
            <div className="z-[100] relative" >

            <Day products={products} />
            </div>
            {/* <div className="w-full bg-black h-[900px]"></div> */}

            <Night show={show} setShow={setShow} products={products} />
            <div>
              <Picture />
            </div>
            <Icons />
            <Banner />
            <Footer />
          </div>
        </div>
        
      </Suspense>
    </div>
  );
}
