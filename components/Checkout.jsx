"use client";

import React, { useEffect, useState } from "react";
import { useCheckout } from "/context/CheckoutContext";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCartProducts } from "@/utils/cartUtils";
import axios from "axios";
import { useRouter } from "next/navigation";




const Checkout = ({cartProducts, setCartProducts,cartTotal,setCartTotal}) => {


  return (
    <div className="flex flex-col pt-[100px] items-center justify-between min-h-screen bg-[#CDC8C8]/[40%] p-4">
      <div className="w-full p-6">
        <div className="h-[calc(100vh-40%)] overflow-auto no-scrollbar">
          {cartProducts.map((item) => (
            <div
              key={item.id}
              className="flex items-start border border-[#CDC8C8] rounded-[7px] p-4 shadow-md mb-4"
            >
              <div className="flex-shrink-0 h-[120px]">
                <Image
                  src={item.images[0]?.src}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-[120px] h-[120px] object-cover rounded-[10px]"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg text-black font-normal font-merriweather">
                    {item.name}
                  </h2>
                </div>
                {/* <div className="my-2 mb-[1rem]">
                  <div className="grid grid-cols-2 gap-1 w-[26px]">
                    {item.shades.map((shade, index) => (
                      <span
                        key={index}
                        className="w-[13px] h-[13px] inline-block"
                        style={{ backgroundColor: shade }}
                      ></span>
                    ))}
                  </div>
                </div> */}
                <div className="flex items-center justify-between mt-2 space-x-4">
                  <div className="flex items-center border border-black rounded-[3px]">
                    <span className="mx-4 text-black font-poppins font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <p className="text-lg text-black font-bold font-merriweather">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full p-6">
        <div className="w-full h-[1px] bg-[#CDC8C8]"></div>
        <div className="my-12">
          <div className="mt-1 flex my-4">
            <input
              type="text"
              placeholder="Discount code"
              id="discount-code"
              className="block w-full px-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            <button className="ml-2 px-4 py-2 bg-black text-white rounded-md">
              Apply
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#CDC8C8]"></div>
        <div className="pt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[16px] font-poppins font-semibold text-[#827777]">
              Shipping & Handling:
            </p>
            <p className="text-[16px] font-poppins font-semibold text-[#827777]">
              $0
            </p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-[16px] font-poppins font-semibold text-[#827777]">
              Discount:
            </p>
            <p className="text-[16px] font-poppins font-semibold text-[#827777]">
              -$0
            </p>
          </div>
          <div className="w-full h-[1px] bg-[#CDC8C8]"></div>
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-[30px] text-black font-semibold font-playfair-display">
              Estimated Total:
            </h2>
            <h2 className="text-[30px] text-black font-semibold font-playfair-display">
              $
              {cartTotal.toFixed(2)}
            </h2>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Checkout;
