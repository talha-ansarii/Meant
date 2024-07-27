"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="w-full my-4  ">
      <div
        className="w-[80%] hidden  fixed z-50 left-[50%] translate-x-[-50%] backdrop-blur-md  px-[20px] m-auto h-[86px] rounded-[116px] nav-shadow border md:flex lg:flex items-center justify-between ;
"
      >
        <div>
          <Image
            src="/assets/images/logo.webp"
            width={100}
            height={33}
            alt="logo"
            className="lg:ml-[50px] md:ml-[20px]"
          />
        </div>
        <div className=" flex lg:gap-[50px] md:gap-4 playfair font-[500] lg:text-[20px] lg:leading-[26.66px] md:text-[15px] md:leading-[20.66px] text-white">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
          <Link href={"/aboutus"}>About Us</Link>
          <Link href={"/contactus"}>Contact Us</Link>
        </div>
        <div className="flex gap-4 mr-[20px] cursor-pointer">
          <FaRegHeart className="w-8 h-8 text-[#D76D8E]" />
          <FaUser className="w-8 h-8 text-white" />
          <FaShoppingCart className="w-8 h-8 text-white" />
        </div>
      </div>

      <div>
        <div className="md:hidden relative lg:hidden  flex w-[100%] px-[5%]  m-auto justify-between items-center">
          <div className="my-6 ml-4 ">
            <Image
              src="/assets/images/logo.webp"
              alt="logo"
              width={100}
              height={50}
              className="w-[100px] h-[50px]"
            />
          </div>
          <div>
            <d iv>
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
            </d>
            <div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="fixed playfair md:hidden bg-black mt-[86px] h-[calc(100vh-0px)] lg:hidden  inset-0 z-[200]  justify-evenly pb-[80px] items-start pl-6 text-font-blue inter font-[700] text-[20px] flex flex-col gap-[32px]"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                  >
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3   text-[#FFFFFF] text-[40px] leading-[28.66px] text-center -10"
                        href="/"
                      >
                        Home
                      </Link>
                    </motion.div>
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3   text-[#FFFFFF] text-[40px] leading-[28.66px] text-center -10"
                        href="/"
                      >
                        Products
                      </Link>
                    </motion.div>

                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3   text-[#FFFFFF] text-[40px] leading-[28.66px] text-center -10"
                        href="/ourstory"
                      >
                        About Us
                      </Link>
                    </motion.div>
                    <motion.div variants={linkVariants}>
                      <Link
                        className="flex gap-3   text-[#FFFFFF] text-[40px] leading-[28.66px] text-center -10"
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
    </div>
  );
};

export default Header;
