import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-black mt-16">
      <div className="w-full md:w-[80%] m-auto">
        <div className="w-full bg-white h-[1px] mb-4"></div>

        <div className="flex flex-col md:flex-row md:space-x-8 pb-4">
          <div className="w-full md:w-[50%] pt-8 md:pt-[80px]">
            <Image
              src="/assets/images/logo.webp"
              alt="logo"
              width={248}
              height={81}
              className="mx-auto md:mx-0"
            />
          </div>

          <div className="w-full md:w-[50%] pt-4 md:pt-[50px] flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
              <div className="text-lg md:text-[20px] font-semibold leading-6 md:leading-[26px] text-white">
                Discover Meant
              </div>
              <Link href="/about" className="text-sm md:text-[14px] text-white">
                About
              </Link>
              <Link
                href="/production"
                className="text-sm md:text-[14px] text-white"
              >
                Production
              </Link>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
              <div className="text-lg md:text-[20px] font-semibold leading-6 md:leading-[26px] text-white">
                Help
              </div>
              <Link href="/faq" className="text-sm md:text-[14px] text-white">
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-sm md:text-[14px] text-white"
              >
                Contact Us
              </Link>
              <Link
                href="/track-package"
                className="text-sm md:text-[14px] text-white"
              >
                Track Package
              </Link>
              <Link
                href="/shipping-returns"
                className="text-sm md:text-[14px] text-white"
              >
                Shipping & Returns
              </Link>
              <Link
                href="/terms-conditions"
                className="text-sm md:text-[14px] text-white"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm md:text-[14px] text-white"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
              <div className="text-lg md:text-[20px] font-semibold leading-6 md:leading-[26px] text-white">
                Social
              </div>
              <a
                className="text-sm md:text-[14px] text-white flex items-center gap-2"
                href="https://instagram.com"
              >
                <FaInstagram className="w-5 h-5" />
                <div>Instagram</div>
              </a>
              <a
                className="text-sm md:text-[14px] text-white flex items-center gap-2"
                href="https://facebook.com"
              >
                <FaFacebook className="w-5 h-5" />
                <div>Facebook</div>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-[22px] flex flex-col md:flex-row justify-between text-white inter font-normal text-xs md:text-[12px] leading-[14px] md:leading-[18px] py-4">
          <div className="text-center md:text-left">
            <Link href="/terms-conditions" className="text-white">
              Terms and Conditions
            </Link>
            &nbsp; &amp; &nbsp;
            <Link href="/privacy-policy" className="text-white">
              Privacy Policy
            </Link>
          </div>
          <div className="text-center mt-2 md:mt-0">With ‪‪❤︎‬ From INDIA</div>
          <div className="text-center mt-2 md:mt-0">
            Copyright © 2024 Meant IN
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
