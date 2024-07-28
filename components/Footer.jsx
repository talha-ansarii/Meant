
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'

const Footer = () => {
  return (
    <div className='w-full  bg-black'>
    <div className='w-[80%] m-auto '>
    <Link href={"/"} className=' my-8 lg:hidden md:hidden w-full flex justify-center items-center'>
            <Image src={"/logo.png"} alt="logo" width={139} height={46} />
        </Link>
    <div className='lg:hidden md:hidden block w-full bg-white h-[1px]'></div>

    <div className=' lg:hidden md:hidden w-full my-6 flex justify-center items-center gap-4'>
    <Link href={"/"}>
    <img src='/fbb.svg' alt='igg' className='w-[38px] h-[38px]'/>

    </Link>
    <Link href={"/"}>

    <img src='/igg.svg' alt='igg' className='w-[31px] h-[31px]'/>
    </Link>

    </div>
    <div className='w-full bg-white h-[1px]'></div>
    <div className='flex w-full pb-2 '>
        <div className=' hidden lg:block md:block lg:w-[60%] md:w-[50%] pt-[80px]'>
            <Image src={"/logo.png"} alt="logo" width={248} height={81} />
        </div>
        <div className='lg:w-[40%] md:w-[50%] pt-3 lg:pt-[50px] md:pt-[50px] grid md:grid-cols-3 grid-cols-2 lg:grid-cols-3  poppins-regular w-full text-white '>
            <div className='flex  lg:justify-end '>
            <div className='flex flex-col gap-2 lg:gap-4 md:gap-4'>
                <div className='text-[14px] leading-[26px] lg:text-[20px] md:text-[20px] md:leading-[26px] font-[500] lg:leading-[26px]'>Discover Meant</div>
                <Link href={"/aboutus"} className='text-[11px] leading-[16px] md:text-[14px] md:leading-[21px]  lg:text-[14px] font-[400] lg:leading-[21px]'>About</Link>
                <Link href={"/"} className='text-[11px] leading-[16px] md:text-[14px] md:leading-[21px]  lg:text-[14px] font-[400] lg:leading-[21px]'>Production</Link>

            </div>
            </div>
            <div className='flex justify-end '>
            <div className='flex flex-col gap-2 lg:gap-4 md:gap-4'>

                <div className='text-[14px] leading-[26px] lg:text-[20px] md:text-[20px] md:leading-[26px] font-[500] lg:leading-[26px]'>Help</div>
                <Link href={"/"} className='text-[11px] leading-[16px] md:text-[14px] md:leading-[21px]  lg:text-[14px] font-[400] lg:leading-[21px]'>FAQ</Link>
                <Link href={"/contactus"} className='text-[11px] leading-[16px] md:text-[14px] md:leading-[21px]  lg:text-[14px] font-[400] lg:leading-[21px]'>Contact US</Link>
                <Link href={"/"} className='text-[11px] leading-[16px] md:text-[14px] md:leading-[21px]  lg:text-[14px] font-[400] lg:leading-[21px]'>Track Package</Link>
                <Link href={"/"} className='text-[11px] leading-[16px] md:text-[14px] md:leading-[21px]  lg:text-[14px] font-[400] lg:leading-[21px]'>Shipping & Returns</Link>
                <Link href={"/"} className='text-[11px] leading-[16px] md:text-[14px] md:leading-[21px]  lg:text-[14px] font-[400] lg:leading-[21px]'>Terms & Conditions</Link>
                <Link href={"/"} className='text-[11px] leading-[16px] md:text-[14px] md:leading-[21px]  lg:text-[14px] font-[400] lg:leading-[21px]'>Privacy Policy</Link>
            </div>
            </div>
            
            <div className='lg:flex md:flex hidden  justify-end  '>
            <div className='flex flex-col gap-4'>
                <div className='text-[20px] font-[500] leading-[26px]'>
                Social
                </div>
                <div className='text-[14px] font-[400] leading-[21px]'>
                <Link href={"/"} className='flex gap-2 items-center'>
                        <img src='/igg.svg' alt='igg' className='w-[14px] h-[14px]'/>
                        <div>Instagram</div>
                    </Link>
                </div>
                <div className='text-[14px] font-[400] leading-[21px]'>
                <Link href={"/"} className='flex gap-2 items-center'>
                        <img src='/fbb.svg' alt='igg' className='w-[16px] h-[16px]'/>
                        <div>Facebook</div>
                    </Link>
                </div>
            </div>

            </div>
        </div>
    </div>
    <div className='w-full h-[22px] flex justify-center mt-12 lg:mt-0 md:mt-0 lg:justify-between md:justify-between text-white   inter font-[400] text-[10px] leading-[10px]'>
    <div className='hidden md:block lg:block'>
    Terms and Conditions & Privacy Policy
    </div>
    <div  className='hidden md:block lg:block'>With ‪‪❤︎‬ From INDIA</div>
    <div>
    Copyright © 2024 Meant IN
    </div>
    </div>
    </div>
    </div>

  )
}

export default Footer