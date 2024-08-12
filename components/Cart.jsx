"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import {
  getAllProducts,
  getCartProducts,
  removeFromCart,
  updateCartQuantity,
} from "@/utils/cartUtils";
import VideoLoader from "./VideoLoader";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
const { isSignedIn } = useUser();
  useEffect(() => {
    setIsClient(true);
}, []);

 
  useEffect(() => {
    const fetchData = async () => {
      const cart = await getCartProducts();
      const products = await getAllProducts();
      setLoading(false);
      // console.log(cart)
      // console.log(products)
      if (cart && products) {
        // Filter products that are in the cart
        const filteredProducts = products.filter((product) =>
          cart.some((cartItem) => cartItem.productId === product.id)
        );

        let total = 0;
        const productsWithQuantity = filteredProducts.map((product) => {
          const cartItem = cart.find((item) => item.productId === product.id);
          total += product.price * cartItem.quantity;

          return { ...product, quantity: cartItem?.quantity };
        });

        setCartProducts(productsWithQuantity);
        setCartTotal(total);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      const updatedCart = await removeFromCart(productId);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      if (updatedCart) {
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((product) => product.id !== productId)
        );
        const removedProduct = cartProducts.find(
          (product) => product.id === productId
        );
        if (removedProduct) {
          setCartTotal(
            (prevTotal) =>
              prevTotal - removedProduct.price * removedProduct.quantity
          );
        }
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleQuantityChange = async (productId, action) => {
    const updatedCart = await updateCartQuantity(productId, action);
    if (updatedCart) {
      // Update the cart products and total
      const products = await getAllProducts();
      const filteredProducts = products.filter((product) =>
        updatedCart.some((cartItem) => cartItem.productId === product.id)
      );

      let total = 0;
      const productsWithQuantity = filteredProducts.map((product) => {
        const cartItem = updatedCart.find(
          (item) => item.productId === product.id
        );
        total += product.price * cartItem.quantity;
        return { ...product, quantity: cartItem.quantity };
      });

      setCartProducts(productsWithQuantity);
      setCartTotal(total);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="overflow-x-hidden">
      <div className="w-[100%] playfair h-[100%] flex justify-center items-center">
        <p className="text-xl font-medium">Please sign in to view your Cart</p>
      </div>

      </div>
    );
  }



  if (loading) return <>{isClient && <div className="w-[100vw] text-black h-[100vh] ">
  Loading...
  </div>}</>;


  return (
    <div className="w-full min-h-screen  bg-white text-black px-4 md:px-8">
      <div className="max-h-[100vh] overflow-auto no-scrollbar">
        <div className="flex justify-between items-center pb-4">
          <span className="text-[16px] font-poppins font-semibold text-[#827777]">
            {cartProducts.length} items
          </span>
        </div>
        {cartProducts.length === 0 ? (
          <div className="text-center text-lg">Your cart is empty.</div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-130px)] justify-between ">
            <ul className="space-y-6 ">
              {cartProducts.map((item) => (
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
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="ml-4 text-gray-500 hover:text-gray-300"
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 space-x-4">
                      <div className="flex items-center border border-black rounded-[3px]">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, "decrease")
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
                            handleQuantityChange(item.id, "increase")
                          }
                          className="text-black py-1 px-3 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-bold font-merriweather">
                      ₹{item.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#CDC8C8] mt-8 pt-4">
              <div className="flex justify-between items-center">
                <h2 className="lg:text-[30px] md:text-[30px] text-[25px] font-semibold font-playfair-display">
                  Estimated Total:
                </h2>
                <h2 className="lg:text-[30px] md:text-[30px] text-[25px] font-semibold font-playfair-display">
                ₹{cartTotal.toFixed(2)}
                </h2>
              </div>
              <p className="mt-2 text-[#827777] font-merriweather font-semibold text-xs ">
                {"("}Shipping & Discounts calculated at checkout{")"}
              </p>
              <Link
                href="/checkout"
                className="mt-8 text-[18px] w-full font-playfair-display font-extrabold inline-block bg-black text-white py-2 px-8 rounded-[30px] text-center  md:w-full"
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
