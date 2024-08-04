"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Update the quantity of the existing product
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1  }
            : item
        );
      } else {
        // Add the new product to the cart
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const parsePrice = (priceString) => {
    const priceNumber = parseFloat(priceString.replace("$", ""));
    return isNaN(priceNumber) ? 0 : priceNumber;
  };

  const cartTotal = cart.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0
  );

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    cartTotal,
    updateCartItemQuantity,
    cartItemCount: cart.reduce((count, item) => count + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
