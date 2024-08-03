"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "/context/CartContext.js";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useCheckout } from "/context/CheckoutContext";

const Cart = () => {
  const { cart, removeFromCart, cartTotal, updateCartItemQuantity } = useCart();
  const { setCheckoutItems } = useCheckout();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setCheckoutItems(cart);
  };

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 md:px-8">
      <div className="max-h-[85vh] overflow-auto no-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[16px] font-poppins font-semibold text-[#827777]">
            {cart.length} items
          </span>
        </div>
        {cart.length === 0 ? (
          <div className="text-center text-lg">Your cart is empty.</div>
        ) : (
          <div>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start border border-[#CDC8C8] rounded-[7px] p-4 shadow-md"
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
                      <h2 className="text-lg font-normal font-merriweather">
                        {item.name}
                      </h2>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-gray-500 hover:text-gray-300"
                      >
                        <FaTrash size={15} />
                      </button>
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
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="text-black py-1 px-3 rounded-l-lg"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-4 font-poppins font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="text-black py-1 px-3 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-bold font-merriweather">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#CDC8C8] mt-8 pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-[30px] font-semibold font-playfair-display">
                  Estimated Total:
                </h2>
                <h2 className="text-[30px] font-semibold font-playfair-display">
                  ${cartTotal.toFixed(2)}
                </h2>
              </div>
              <p className="mt-2 text-[#827777] font-merriweather font-bold">
                Shipping & Discounts calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={handleCheckout}
                className="mt-8 text-[18px] font-playfair-display font-extrabold inline-block bg-black text-white py-2 px-8 rounded-[30px] text-center w-auto md:w-full"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Cart;
