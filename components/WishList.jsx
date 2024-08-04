"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "/context/WishlistContext.js";
import { useCart } from "/context/CartContext.js";
import Header from "./Header";
import Footer from "./Footer";

const WishList = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlistArray = Array.from(wishlist);

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    removeFromWishlist(item.id);
  };

  return (
    <div className="pb-4">
      <Header />
      <h1 className="text-[40px] font-bold font-playfair-display mb-6 text-center pt-[8.5rem]">
        WISHLIST
      </h1>
      {wishlistArray.length === 0 ? (
        <p className="text-center">
          Your wishlist is empty.{" "}
          <Link href="/products">Start adding some products!</Link>
        </p>
      ) : (
        <div className="p-4 w-[82%] m-auto pt-[2rem] grid grid-cols-1 md:grid-cols-3 gap-8">
          {wishlistArray.map((item) => (
            <div
              key={item.id}
              className="relative border rounded-lg overflow-hidden shadow-lg bg-white"
            >
              <div className="relative">
                {/* Link to the single product page */}
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.images[0]?.src}
                    alt={item.name}
                    width={400}
                    height={350}
                    className="w-full h-auto"
                  />
                </Link>
              </div>
              <div className="p-4">
                {/* Product name and price */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-playfair-display font-bold text-black">
                    {item.name}
                  </h3>
                  <p className="text-lg font-playfair-display font-bold text-black">
                    {item.price}
                  </p>
                </div>
                {/* Remove from wishlist button */}
                <div className="flex flex-col items-center mt-[1rem]">
                  <button
                    className=" bg-white w-[75%] text-black border border-black p-2 rounded-[3px] font-merriweather font-bold mb-4"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className=" bg-white text-black border border-black p-2 rounded-[3px] font-merriweather font-bold"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WishList;
