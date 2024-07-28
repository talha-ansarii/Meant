"use client"
import React, { useState } from 'react';
import CartItem from './CartItem';
import Link from 'next/link';

const Cart = ({setCartOpen}) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Day Dazzle Lipstick',
      shades: ['#FA70CB', '#DA3D12', '#F7879A','#841644'],
      price: 20,
      quantity: 1,
      imageUrl: '/HomePage/banner/2.jpeg', // Replace with actual image URL
    },
    {
      id: 2,
      name: 'Day Dazzle Lipstick',
      shades: ['#FA70CB', '#DA3D12', '#F7879A','#841644'],
      price: 20,
      quantity: 1,
      imageUrl: '/HomePage/banner/2.jpeg', // Replace with actual image URL
    },
   
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const estimatedTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="  flex flex-col  justify-between  w-[638px] h-[100vh] text-black  bg-white shadow-lg ">
<div className=' flex justify-between  m-4 items-baseline gap-6  '>
<div className='flex gap-4 items-baseline'>

      <h2 className="text-[32px] playfair font-[600] ">Cart</h2>
      <div className='text-[#827777] font-poppins font-[600] text-[20px]'>{cartItems.length} 
        {cartItems.length > 1 ? ' items' : ' item'}
      </div>
</div>
<div
className='cursor-pointer'
onClick={() => setCartOpen(false)}
>
    <img src='/cross.svg' alt='close' className='w-[20px] h-[20px]' />
</div>

</div>
      {cartItems.length > 0 ? (
        <>

        <div className=' h-[calc(100vh-40%)] overflow-auto '>
          {cartItems.map(item => (
            <CartItem handleQuantityChange={handleQuantityChange} handleRemoveItem={handleRemoveItem} item={item} />
          ))}
          </div>
          <div className=" mx-6 p-4 border-t pt-4 mt-4">
            <div className="flex playfair font-[600] justify-between text-[32px]">
              <span>Estimated Total:</span>
              <span>${estimatedTotal}</span>
            </div>
            <p className="text-[16px] font-[700] font-merriweather text-[#827777]">Shipping & Discounts calculated at checkout</p>
            <div className='w-full flex justify-center items-center'>
            <Link
            href={'/checkout'}
             className="mt-4 flex justify-center items-center w-[332px] h-[40px] bg-black text-[20px] playfair font-[800] text-white rounded-[34px]">
              <div>Checkout</div>
            </Link>
            </div>
          </div>
        
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
