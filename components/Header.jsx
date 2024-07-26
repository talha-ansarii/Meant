import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full my-4  ' >
    <div className='w-[80%] fixed z-50 left-[50%] translate-x-[-50%] backdrop-blur-md  px-[20px] m-auto h-[86px] rounded-[116px] nav-shadow border flex items-center justify-between ;
' >
<div>
  <Image src='/logo.png' width={100} height={33} alt='logo' className='ml-[80px]' />
</div>
<div className=' flex gap-[100px] playfair font-[500] text-[20px] leading-[26.66px] text-white'>
  <Link href={"/"}>Home</Link>
  <Link href={"/products"} >Products</Link>
  <Link href={"/aboutus"} >About Us</Link>
  <Link href={"/contactus"}>Contact Us</Link>
</div>
<div className='flex gap-4 mr-[20px]'>
<svg
                  className="w-8 h-8"
                  fill={"none"}
                  stroke="#D76D8E"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <Image src='/profile.svg' width={26} height={29} alt='profile' />
                <Image src='/cart.svg' width={26} height={29} alt='cart' />

</div>

    </div>
    </div>
  )
}


export default Header