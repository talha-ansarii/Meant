"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const Picture = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariantsLeft = {
    hidden: {
      x: "-100%",
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };
  const containerVariantsRight = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="w-full bg-black overflow-hidden">
      <div className="w-[75%] m-auto py-[50px] bg-black">
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariantsLeft}
            ref={ref}
            className="flex justify-between mb-12"
          >
            <Image
              width={261}
              height={209}
              src={"/HomePage/pictures/1.jpeg"}
              alt="example"
              className="w-[261px] h-[209px] object-cover object-top rounded-[15px] border mr-4"
            />
            <Image
              width={261}
              height={209}
              src={"/HomePage/pictures/2.jpeg"}
              alt="example"
              className="w-[261px] h-[209px] object-cover object-top  rounded-[15px] border mx-4"
            />
            <Image
              width={261}
              height={209}
              src={"/HomePage/pictures/3.jpeg"}
              alt="example"
              className="w-[261px] h-[209px] object-cover object-top  rounded-[15px] border mx-4"
            />
            <Image
              width={261}
              height={209}
              src={"/HomePage/pictures/4.jpeg"}
              alt="example"
              className="w-[261px] h-[209px] object-cover object-top  rounded-[15px] border ml-4"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariantsRight}
            ref={ref}
            className="flex justify-between mt-12"
          >
            <Image
              width={261}
              height={209}
              src={"/HomePage/pictures/5.jpeg"}
              alt="example"
              className="w-[261px] h-[209px] object-cover object-top  rounded-[15px] border mr-4"
            />
            <Image
              width={261}
              height={209}
              src={"/HomePage/pictures/6.jpeg"}
              alt="example"
              className="w-[261px] h-[209px] object-cover object-top  rounded-[15px] border mx-4"
            />
            <Image
              width={261}
              height={209}
              src={"/HomePage/pictures/7.jpeg"}
              alt="example"
              className="w-[261px] h-[209px] object-cover object-top  rounded-[15px] border mx-4"
            />
            <Image
              width={261}
              height={209}
              src={"/HomePage/pictures/8.jpeg"}
              alt="example"
              className="w-[261px] h-[209px] object-cover object-top  rounded-[15px] border ml-4"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Picture;
