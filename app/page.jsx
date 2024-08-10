"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Banner from "@/components/homePage/Banner";
import Day from "@/components/homePage/Day";
import HeroSection from "@/components/homePage/HeroSection";
import Icons from "@/components/homePage/Icons";
import Night from "@/components/homePage/Night";
import Picture from "@/components/homePage/Picture";
import VideoLoader from "@/components/VideoLoader";
import { Suspense, useEffect, useState } from "react";
import Animation from "./test/page";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useUser } from "@clerk/nextjs";
import { addProductToWishlist, getWishlistProducts, removeProductFromWishlist } from "@/utils/wishlistUtils";
import { addProductToCart } from "@/utils/cartUtils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [show ,setShow] = useState(false);
  const [isInWishlist1, setIsInWishlist1] = useState(false);
  const [isInCart1, setIsInCart1] = useState(false);
  const { isSignedIn } = useUser();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const isTablet = useMediaQuery({ maxWidth: 1024 });
  
  
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
  }, []);
  const productName = "Night Muse Lipstick";
  const product = products.find((p) => p.name === productName);
  const productName1 = "Day Dazzle Lipstick";
  const product1 = products.find((p) => p.name === productName1);

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

  return (
    <div className="relative">
      <Suspense
        fallback={
          <div className="w-[100vw] h-[100vh] flex justify-center items-center  ">
            <VideoLoader />
          </div>
        }
      >
      <div className="absolute hidden md:hidden lg:block w-full z-[200]">
      <Animation show={show} setShow={setShow}/>

      </div>
        
        <div className="w-full bg-black">
        <Header />

        </div>
<div className="absolute w-full">
        <div className="pt-[100px] relative w-full pb-4">
          <HeroSection />
          {!isMobile && !isTablet && (
          <div className="lg:flex items-center md:hidden hidden absolute z-[300] left-[800px] top-[1500px] gap-4">
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
                className=" bg-black text-white w-[147px] h-[44px] flex items-center justify-center font-poppins space-x-2 text-[16px] font-[500] leading-[24px]"
                onClick={handleAddToCart1}
                disabled={isInCart1}
              >
                <span>ADD TO CART</span>
              </HoverBorderGradient>

              <HoverBorderGradient
                containerClassName=" rounded-[34px]"
                as="button"
                className=" bg-black text-white w-[147px] h-[44px] flex items-center justify-center font-poppins space-x-2 text-[16px] font-[500] leading-[24px]"
              >
              <Link href={"/product/58"}>
              <span>ORDER NOW</span>
              </Link>
                
              </HoverBorderGradient>
            </div>

          )}
          <Day products={products} />
          {/* <div className="w-full bg-black h-[900px]"></div> */}
          {!isMobile && !isTablet && (
          <div className="absolute left-[250px] md:hidden hidden top-[2500px] z-[300] lg:flex items-center gap-4">
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
                className="font-poppins font-[500] text-[16px] leading-[24px]  w-[147px] h-[44px] bg-black text-white rounded-[34px]"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
              
                <span>ADD TO CART</span>
              </HoverBorderGradient>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="font-poppins font-[500] text-[16px] leading-[24px]  w-[147px] h-[44px] bg-black text-white rounded-[34px]"
              >
              <Link href={"/product/60"}>
                <span>ORDER NOW</span>
                
                </Link>
              </HoverBorderGradient>
            </div>

          )}
          <Night show={show} setShow={setShow} products={products} />
          <Picture />
          <Icons />
          <Banner />
          <Footer />
        </div>

</div>


      </Suspense>
    </div>
  );
}
