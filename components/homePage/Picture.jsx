"use client"

import React, { useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
const Picture = () => {

  const { ref, inView } = useInView({
    triggerOnce: true, // Animation will trigger only once
    threshold: 0.1, // Adjust the threshold as needed
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
    <div className='w-full bg-black overflow-hidden' >
<div className='w-[75%] m-auto py-[50px] bg-black'>
<AnimatePresence>
      <motion.div
     initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariantsLeft}
      ref={ref}
        className='flex justify-between mb-12'>
        <img width={261} height={209} src={"/HomePage/pictures/1.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover object-top rounded-[15px] border  ' />
        <img width={261} height={209} src={"/HomePage/pictures/2.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border object-top  ' />
        <img width={261} height={209} src={"/HomePage/pictures/3.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border object-top  ' />
        <img width={261} height={209} src={"/HomePage/pictures/4.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border object-top  ' />
      </motion.div>
      <motion.div 
       initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariantsRight}
      ref={ref}
       className='flex justify-between mt-12'>
        <img width={261} height={209} src={"/HomePage/pictures/5.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border object-top ' />
        <img width={261} height={209} src={"/HomePage/pictures/6.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border object-top ' />
        <img width={261} height={209} src={"/HomePage/pictures/7.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border object-top ' />
        <img width={261} height={209} src={"/HomePage/pictures/8.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border object-top ' />
      </motion.div>

</AnimatePresence>
</div>

    
    </div>
  )
}

export default Picture