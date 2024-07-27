import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full my-4">
      <div className="w-[80%] fixed z-50 left-[50%] translate-x-[-50%] backdrop-blur-md px-[20px] m-auto h-[86px] rounded-[116px] shadow-custom-white border flex items-center justify-between">
        <div>
          <Image
            src="/assets/images/logo.webp"
            width={100}
            height={33}
            alt="logo"
            className="ml-[80px]"
          />
        </div>
        <div className="flex gap-[100px] font-playfair-display font-[500] text-[20px] leading-[26.66px] text-white">
          <Link href={"/"}>Home</Link>
          <Link href={"/ProductList"}>Products</Link>
          <Link href={"/About"}>About Us</Link>
          <Link href={"/Contact"}>Contact Us</Link>
        </div>
        <div className="flex gap-4 mr-[20px]">
          <FaRegHeart className="w-8 h-8 text-[#D76D8E]"/>
          <FaUser className="w-8 h-8 text-white" />
          <FaShoppingCart className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
