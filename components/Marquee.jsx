"use client";
import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  const marqueeVariants = {
    animate: {
      x: ["0%", "-10%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        },
      },
    },
  };
  return (
    <div className="w-full flex-col bg-black h-[97px] flex items-center poppins-regular overflow-hidden ">
      <div className="w-full h-[1px] m-1 bg-white overflow-hidden "></div>
      <div class="overflow-hidden ">
        <div class=" flex overflow-hidden whitespace-nowrap font-migra text-white text-[36px] leading-[43.56px] ">
          <motion.div
            className="flex items-center"
            variants={marqueeVariants}
            animate="animate"
          >
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
            <div className="flex items-center">
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">WATERPROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">SMUDGE PROOF</span>
              <span>
                <div className="bg-[#F7879A] w-[25px] h-[25px] rounded-full"></div>
              </span>
              <span className="mx-4 text-4xl">LONG LASTING</span>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="w-full h-[1px] m-1 bg-white overflow-hidden "></div>
    </div>
  );
};

export default Marquee;
