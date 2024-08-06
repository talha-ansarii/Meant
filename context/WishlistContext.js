"use client";

import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(new Set());

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => new Set(prevWishlist).add(product));
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = new Set(prevWishlist);
      updatedWishlist.forEach((item) => {
        if (item.id === productId) {
          updatedWishlist.delete(item);
        }
      });
      return updatedWishlist;
    });
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    wishlistCount: wishlist.size,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
