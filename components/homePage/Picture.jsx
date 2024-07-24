"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'
import React, { useRef } from 'react'

const Picture = () => {

  const left = useRef(null)
  const right = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    const tl = gsap.timeline();
    const tl2 = gsap.timeline();
    
  
    tl.from(left.current, {
      x: -2000, // Starting position off-screen
      duration: 4,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: left.current,
        start: 'top 50%', // Adjusted start position for better effect
        end: 'bottom bottom', // Adjusted end position
        markers: false, // Visualize the triggers
        scrub: 1, // Smooth scrubbing effect
      },
    });
    tl2.from(right.current, {
      x: 2000, // Starting position off-screen
      duration: 4,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: left.current,
        start: 'top 50%', // Adjusted start position for better effect
        end: 'bottom bottom', // Adjusted end position
        markers: false, // Visualize the triggers
        scrub: 1, // Smooth scrubbing effect
      },
    });
    
  },[])


  return (
    <div className='w-full bg-black overflow-hidden' >
<div className='w-[75%] m-auto py-[100px] bg-black'>

      <div ref={left}  className='flex justify-between mb-12'>
        <Image width={261} height={209} src={"/HomePage/example.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border  ' />
        <Image width={261} height={209} src={"/HomePage/example.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border  ' />
        <Image width={261} height={209} src={"/HomePage/example.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border  ' />
        <Image width={261} height={209} src={"/HomePage/example.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border  ' />
      </div>
      <div ref={right} className='flex justify-between mt-12'>
        <Image width={261} height={209} src={"/HomePage/example.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border  ' />
        <Image width={261} height={209} src={"/HomePage/example.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border  ' />
        <Image width={261} height={209} src={"/HomePage/example.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border  ' />
        <Image width={261} height={209} src={"/HomePage/example.jpeg"} alt="example" className='w-[261px] h-[209px] object-cover rounded-[15px] border  ' />
      </div>
</div>

    
    </div>
  )
}

export default Picture