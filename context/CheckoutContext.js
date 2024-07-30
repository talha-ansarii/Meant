"use client"

import React, { createContext, useState, useContext } from "react";

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [checkoutItems, setCheckoutItems] = useState([]);

  return (
    <CheckoutContext.Provider value={{ checkoutItems, setCheckoutItems }}>
      {children}
    </CheckoutContext.Provider>
  );
};
