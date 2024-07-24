import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full   bg-black'>
    <div className='w-[80%] m-auto '>
    <div className='w-full bg-white h-[1px]'></div>
    <div className='flex w-full pb-2 '>
        <div className='w-[60%] pt-[80px]'>
            <Image src={"/logo.png"} alt="logo" width={248} height={81} />
        </div>
        <div className='w-[40%]  pt-[50px] grid grid-cols-3 poppins-regular  text-white'>
            <div className='flex justify-end '>
            <div className='flex flex-col gap-4'>
                <div className='text-[20px] font-[500] leading-[26px]'>Discover Meant</div>
                <a className='text-[14px] font-[400] leading-[21px]'>About</a>
                <a className='text-[14px] font-[400] leading-[21px]'>Production</a>

            </div>
            </div>
            <div className='flex justify-end '>
            <div className='flex flex-col gap-4'>

                <div className='text-[20px] font-[500] leading-[26px]'>Help</div>
                <a className='text-[14px] font-[400] leading-[21px]'>FAQ</a>
                <a className='text-[14px] font-[400] leading-[21px]'>Contact US</a>
                <a className='text-[14px] font-[400] leading-[21px]'>Track Package</a>
                <a className='text-[14px] font-[400] leading-[21px]'>Shipping & Returns</a>
                <a className='text-[14px] font-[400] leading-[21px]'>Terms & Conditions</a>
                <a className='text-[14px] font-[400] leading-[21px]'>Privacy Policy</a>
            </div>
            </div>
            
            <div className='flex justify-end '>
            <div className='flex flex-col gap-4'>
                <div className='text-[20px] font-[500] leading-[26px]'>
                Social
                </div>
                <a className='text-[14px] font-[400] leading-[21px]'>
                <div className='flex gap-2 items-center'>
                        <img src='/igg.svg' alt='igg' className='w-[14px] h-[14px]'/>
                        <div>Instagram</div>
                    </div>
                </a>
                <a className='text-[14px] font-[400] leading-[21px]'>
                <div className='flex gap-2 items-center'>
                        <img src='/fbb.svg' alt='igg' className='w-[16px] h-[16px]'/>
                        <div>Instagram</div>
                    </div>
                </a>
            </div>

            </div>
        </div>
    </div>
    <div className='w-full h-[22px] flex justify-between text-white   inter font-[400] text-[10px] leading-[10px]'>
    <div>
    Terms and Conditions & Privacy Policy
    </div>
    <div>With ‪‪❤︎‬ From INDIA</div>
    <div>
    Copyright © 2024 Meant IN
    </div>
    </div>
    </div>
    </div>
  )
}

export default Footer