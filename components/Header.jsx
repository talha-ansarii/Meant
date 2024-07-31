"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useWishlist } from "/context/WishlistContext.js";
import { useCart } from "@/context/CartContext";
import Cart from "./Cart";

const Header = () => {
  const { wishlistCount } = useWishlist();
  const { cartItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

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
    <div className="w-full ">
      <div className="lg:w-[892px] md:w-[741px] hidden fixed z-50 top-[30px] left-[50%] translate-x-[-50%] px-[20px] m-auto h-[43px] rounded-[116px]  border md:flex lg:flex items-center justify-between bg-black  ">
        <div>
          <Image
            src="/assets/images/logo.webp"
            width={62}
            height={21}
            alt="logo"
            className="lg:ml-[50px] md:ml-[20px]"
          />
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
            {wishlistCount > 0 && (
              <span className="absolute top-[17px] right-[7.8rem] bg-white text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <FaUser
            onClick={() => setProfileOpen(!profileOpen)}
           className="w-[21px] cursor-pointer h-[22px] text-white" />
          <div
            className="relative flex items-center"
            onClick={() => setIsCartOpen(true)}
          >
            <FaShoppingCart className="w-[20px] cursor-pointer h-[22px] text-white" />
            {cartItemCount > 0 && (
              <span className="absolute bottom-[1.3rem] left-[1.2rem] bg-black text-white rounded-full text-xs w-5 h-5  flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>{
            profileOpen && (
              <div className="absolute  w-[150px] h-[100px] rounded-[4px] shadow-md bg-white top-[45px] right-[50%] translate-x-[50%]">
<div className="w-[15px] h-[16px] absolute bg-white  top-[-8px] rotate-45 left-[50%] translate-x-[-50%]">
            
</div>
{
              isLogin? (
               
                  <div className="flex text-[16px] font-[700] items-center justify-center playfair text-black flex-col gap-4 p-4">
                    <Link className="cursor-pointer" href="/profile">Profile</Link>
                    <Link className="cursor-pointer" href="/past-orders">Orders</Link>
                    <Link className="cursor-pointer" href="/logout">Logout</Link>
                </div>
              ): (
                
                  <div className="flex text-[16px] font-[700] justify-center items-center playfair text-black flex-col gap-4 p-4">
                    <Link className="cursor-pointer" href="/profile">Log in</Link>
                    <Link className="cursor-pointer" href="/past-orders">Sign up</Link>
                  </div>
              )

            }
          </div>
            )
          }
         
          
        </div>
      </div>

      <div>
        <div className="md:hidden relative lg:hidden flex w-[100%] px-[5%] m-auto justify-between items-center">
          <div className="my-6 ml-4">
            <Image
              src="/assets/images/logo.webp"
              alt="logo"
              width={100}
              height={50}
              className="w-[100px] h-[50px]"
            />
          </div>
          <div>
            <div>
              {!isOpen ? (
                <button
                  onClick={() => {
                    setIsOpen(true);
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
            <div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="fixed playfair md:hidden bg-black mt-[86px] h-[calc(100vh-0px)] lg:hidden inset-0 z-[200] justify-evenly pb-[80px] items-start pl-6 text-font-blue inter font-[700] text-[20px] flex flex-col gap-[32px]"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3 text-[#FFFFFF] text-[40px] leading-[28.66px] text-center -10"
                        href="/"
                      >
                        Home
                      </Link>
                    </motion.div>
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3 text-[#FFFFFF] text-[40px] leading-[28.66px] text-center -10"
                        href="/products"
                      >
                        Products
                      </Link>
                    </motion.div>

                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3 text-[#FFFFFF] text-[40px] leading-[28.66px] text-center -10"
                        href="/aboutus"
                      >
                        About Us
                      </Link>
                    </motion.div>
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3 text-[#FFFFFF] text-[40px] leading-[28.66px] text-center -10"
                        href="/contactus"
                      >
                        Contact Us
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed top-0 right-0 w-full md:w-1/3 bg-white text-black h-full transition-transform transform z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            <div className="p-4 flex justify-between items-center">
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
    </div>
  );
};

export default Header;
