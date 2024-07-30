"use client"
import React, { useState } from 'react';
import CartItem from './CartItem';
import CheckoutItem from './CheckoutItem';

const Checkout = () => {
  const [checkoutItem, setCheckoutItem] = useState([
    {
      id: 1,
      name: 'Day Dazzle Lipstick',
      shades: ['#FA70CB', '#DA3D12', '#F7879A','#841644'],
      price: 20,
      quantity: 1,
      imageUrl: '/HomePage/banner/2.jpeg', // Replace with actual image URL
    },
  ]);
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#CDC8C8]/[40%] p-4">
      <div className="w-full p-6">
      <div className=' h-[calc(100vh-40%)] overflow-auto '>
          {checkoutItem.map(item => (
            <CheckoutItem  item={item} />
          ))}
          </div>
         
      </div>
      <div className='w-full p-6'>
       <div className='w-full h-[1px] bg-[#CDC8C8]'></div>
        <div className="my-12">
          
          <div className="mt-1 flex my-4">
            <input
              type="text"
              placeholder='Discount code'
              id="discount-code"
              className="block w-full px-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            <button className="ml-2 px-4 py-2 bg-black text-white rounded-md">
              Apply
            </button>
          </div>
        </div>
       <div className='w-full h-[1px] bg-[#CDC8C8]'></div>

        <div className=" pt-4">
          <div className="flex justify-between text-[10px] font-poppins font-[500] text-[#827777]">
            <span>Subtotal</span>
            <span className='text-[13px] text-black'>$20</span>
          </div>
          <div className="flex justify-between text-[10px] font-poppins mb-4 font-[500] text-[#827777] mt-2">
            <span>Shipping</span>
            <span className='text-[13px] text-black'>$4</span>
          </div>
       <div className='w-full h-[1px] bg-[#CDC8C8]'></div>

          <div className="flex justify-between text-[10px] font-[500] font-poppins text-black mt-4">
            <span>Total</span>
            <span className='text-[20px] text-black'>$24</span>
          </div>
        </div></div>
    </div>
  );
};

export default Checkout;
