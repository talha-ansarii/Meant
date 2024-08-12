"use client";

import { motion, AnimatePresence, easeIn } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Cart from "./Cart";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { getCartProducts } from "@/utils/cartUtils";
import { getWishlistProducts } from "@/utils/wishlistUtils";
import { Loader } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  const { user } = useUser();
  const [cartLength, setCartLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);
  // const [isOpened, setIsOpened] = useState(false);
  const { isSignedIn } = useUser();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // console.log(user)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let dbWishlist = [];
        let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (isSignedIn) {
          // Fetch wishlist products from the database
          dbWishlist = await getWishlistProducts();
          // Extract productIds from dbWishlist
          const dbWishlistIds = dbWishlist.map((item) => item.productId);

          // Merge and deduplicate the wishlists
          const mergedWishlist = [
            ...new Set([...localWishlist, ...dbWishlistIds]),
          ];

          // Sync the merged wishlist back to the database and localStorage
          await syncWishlistToDatabase(mergedWishlist);
          localStorage.setItem("wishlist", JSON.stringify(mergedWishlist));

          // Set the wishlist length
          setWishlistLength(mergedWishlist.length);
        } else {
          // Set the wishlist length from local storage
          setWishlistLength(localWishlist.length);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchData();

  }, [isSignedIn]);

  useEffect(() => {
    const setwishLength = async () => {
      let localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setCartLength(localCart.length);
      setWishlistLength(localWishlist.length);
    }

    const inter = setInterval(() => {
      setwishLength();
    }, 500);

    return () => {
      clearInterval(inter);
    }

  }, [wishlistLength]);

  const syncWishlistToDatabase = async (wishlist) => {
    // Assume this function sends the merged wishlist to the server to update the database
    try {
      await updateWishlistInDatabase(wishlist); // Replace with your actual API call
    } catch (error) {
      console.error("Error syncing wishlist to database:", error);
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  const containerVariants = {
    hidden: {
      x: "100%",
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);
  const linkVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div
      className={`w-full m-auto top-[30px] duration-200 left-[50%] translate-x-[-50%] px-[20px] absolute lg:fixed md:fixed z-[300] transition-transform ${
        scrollDirection === "down"
          ? " translate-y-0 lg:-translate-y-[80px] md:-translate-y-[80px] "
          : " translate-y-0 "
      }`}
    >
      <div className="lg:w-[892px] md:w-[741px] hidden z-50  px-[20px] m-auto h-[43px] rounded-[116px]  border md:flex lg:flex items-center justify-between bg-black  ">
        <div>
          <Link href={"/"}>
            <Image
              src="/assets/images/logo.webp"
              width={62}
              height={21}
              alt="logo"
              className="lg:ml-[50px] md:ml-[20px]"
            />
          </Link>
        </div>
        <div className="flex lg:gap-[50px] md:gap-4 playfair font-[500] lg:text-[17px] lg:leading-[22.66px] md:text-[13px] md:leading-[17.66px] text-white">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
          <Link href={"/aboutus"}>About Us</Link>
          <Link href={"/contactus"}>Contact Us</Link>
        </div>
        <div className="flex  relative gap-4 mr-[20px] items-center justify-center ">
          <Link href="/wishlist">
            <FaRegHeart className="w-[23px] cursor-pointer h-[19px] text-[#D76D8E]" />
            {wishlistLength > 0 && (
              <span className="absolute top-[-2px] left-[12px] bg-white text-black rounded-full text-[9px] w-3 h-3  flex items-center justify-center">
                {wishlistLength}
              </span>
            )}
          </Link>
          <FaUser
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-[21px] cursor-pointer h-[22px] text-white"
          />
          <div
            className="relative flex items-center"
            onClick={() => setIsCartOpen(true)}
          >
            <FaShoppingCart className="w-[20px] cursor-pointer h-[22px] text-white" />
            {cartLength > 0 && (
              <span className="absolute bottom-[0.8rem] left-[0.8rem] bg-black text-white rounded-full text-[9px] w-3 h-3  flex items-center justify-center">
                {cartLength}
              </span>
            )}
          </div>
          {profileOpen && (
            <div className="absolute  w-[170px]  rounded-[4px] shadow-md bg-white top-[45px] right-[50%] translate-x-[50%]">
              <div className="w-[15px] h-[16px] absolute bg-white  top-[-8px] rotate-45 left-[50%] translate-x-[-50%]"></div>
              <SignedIn>
                <div className="flex text-[16px] font-[700] items-center justify-center playfair text-black flex-col gap-4 p-4">
                  <div className="flex gap-2 justify-center items-center">
                    <UserButton />
                    <div>{user?.username}</div>
                  </div>

                  <Link className="cursor-pointer" href="/past-orders">
                    Orders
                  </Link>
                </div>
              </SignedIn>

              <SignedOut>
                <div className="flex text-[16px]  font-[700] justify-center items-center playfair text-black flex-col gap-4 p-4">
                  <Link className="cursor-pointer" href="/sign-in">
                    Sign in
                  </Link>
                  <Link className="cursor-pointer" href="/sign-up">
                    Sign up
                  </Link>
                </div>
              </SignedOut>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="md:hidden bg-black relative lg:hidden flex w-[100%] px-[5%] m-auto justify-between items-center">
          <div className="flex w-full ">
            <div className="flex justify-between w-full  ">
              <div>
                {!isOpen ? (
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <svg
                      className="block h-6 w-6 rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="">
                <Link href={"/"}>
                  <Image
                    src="/assets/images/logo.webp"
                    alt="logo"
                    width={100}
                    height={35}
                    className="w-[100px] h-[35px]"
                  />
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/wishlist">
                  <FaRegHeart className="w-[23px] cursor-pointer h-[19px] text-[#D76D8E]" />
                </Link>
                <div
                  className="relative flex  items-center"
                  onClick={() => setIsCartOpen(true)}
                >
                  <FaShoppingCart className="w-[20px] cursor-pointer h-[22px] text-white" />
                </div>
                <FaUser
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-[21px] cursor-pointer h-[22px] text-white"
                />
              </div>
            </div>

            <div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="fixed overflow-hidden top-[-10px] playfair md:hidden bg-black mt-[110px]   h-[100vh] lg:hidden inset-0 z-[200] justify-start pb-[80px] items-start pl-8 text-font-blue inter font-[600] text-[20px] flex flex-col gap-[65px]"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3 text-[#FFFFFF] text-[30px] leading-[28.66px] text-center -10"
                        href="/"
                      >
                        Home
                      </Link>
                    </motion.div>
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3 text-[#FFFFFF] text-[30px] leading-[28.66px] text-center -10"
                        href="/products"
                      >
                        Products
                      </Link>
                    </motion.div>

                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3 text-[#FFFFFF] text-[30px] leading-[28.66px] text-center -10"
                        href="/aboutus"
                      >
                        About Us
                      </Link>
                    </motion.div>
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3 text-[#FFFFFF] text-[30px] leading-[28.66px] text-center -10"
                        href="/contactus"
                      >
                        Contact Us
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              {profileOpen && (
                <div className="absolute  w-[170px]  rounded-[4px] shadow-md bg-white top-[60px] right-[100px] translate-x-[50%]">
                  <div className="w-[15px] h-[16px] absolute bg-white  top-[-8px] rotate-45 left-[92%] translate-x-[-50%]"></div>
                  <SignedIn>
                    <div className="flex text-[16px] font-[700] items-center justify-center playfair text-black flex-col gap-4 p-4">
                      <div className="flex gap-2 justify-center items-center">
                        <UserButton />
                        <div>{user?.username}</div>
                      </div>

                      <Link className="cursor-pointer" href="/past-orders">
                        Orders
                      </Link>
                    </div>
                  </SignedIn>

                  <SignedOut>
                    <div className="flex text-[16px]  font-[700] justify-center items-center playfair text-black flex-col gap-4 p-4">
                      <Link className="cursor-pointer" href="/sign-in">
                        Sign in
                      </Link>
                      <Link className="cursor-pointer" href="/sign-up">
                        Sign up
                      </Link>
                    </div>
                  </SignedOut>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className={`fixed top-[-120px] playfair bg-white mt-[86px] lg:hidden md:hidden  h-[100vh]  inset-0 z-[200] font-[700] text-[20px]  text-black 
          
            `}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <div className="p-4 w-full bg-white flex justify-between items-center">
              <h2 className="text-[30px] font-semibold font-playfair-display">
                Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xl text-[#CDC8C8]"
              >
                ✕
              </button>
            </div>
            <Cart />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`fixed top-[-30px] duration-500 hidden lg:block md:block right-0 w-full md:w-1/3 bg-white text-black h-[100vh] transition-transform transform z-50
            ${isCartOpen ? "translate-x-0" : "translate-x-full"}
            `}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
      >
        <div className="p-4 bg-white flex justify-between items-center">
          <h2 className="text-[30px] font-semibold font-playfair-display">
            Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-xl text-[#CDC8C8]"
          >
            ✕
          </button>
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default Header;
