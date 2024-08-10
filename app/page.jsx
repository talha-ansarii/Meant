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
import {
  addProductToWishlist,
  getWishlistProducts,
  removeProductFromWishlist,
} from "@/utils/wishlistUtils";
import { addProductToCart } from "@/utils/cartUtils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowDown } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [isInWishlist1, setIsInWishlist1] = useState(false);
  const [isInCart1, setIsInCart1] = useState(false);
  const { isSignedIn } = useUser();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

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

  // Arrow button scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleArrowClick = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    setShowArrow(false);
  };

  return (
    <div className="relative">
      <Suspense
        fallback={
          <div className="w-[100vw] h-[100vh] flex justify-center items-center  ">
            <VideoLoader />
          </div>
        }
      >
        <div className="w-full bg-black">
          <Header />
        </div>
        <div className="absolute w-full">
          <div className="pt-[100px] relative w-full pb-4">
            <HeroSection />

            <Day products={products} />
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
        {/* Arrow Button */}
        {showArrow && (
          <div
            onClick={handleArrowClick}
            className="fixed bottom-10 right-10 cursor-pointer z-50 rounded-full"
          >
            <FaArrowDown size={30} color="#F7879A" />
          </div>
        )}
      </Suspense>
    </div>
  );
}
