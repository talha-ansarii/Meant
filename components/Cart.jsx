"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import {
  addProductToCart,
  getAllProducts,
  getCartProducts,
  removeFromCart,
  updateCartQuantity,
} from "@/utils/cartUtils";
import VideoLoader from "./VideoLoader";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";

const Cart = ({isCartOpen}) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
const { isSignedIn } = useUser();
  useEffect(() => {
    setIsClient(true);
}, []);

 
useEffect(() => {
  // console.log("Fetching cart data...");
  const fetchCartData = async () => {
    try {
      let dbCart = [];
      let localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      // console.log(localCart)

      if (isSignedIn) {
        // Fetch cart products from the database
        dbCart = await getCartProducts();
        // console.log(dbCart)
        // Extract product and quantity data from dbCart
        const dbCartItems = dbCart.map(item => ({ id: item.productId, quantity: item.quantity }));
        console.log(dbCartItems)
        // Merge and deduplicate the cart items, prioritizing quantities from the database
        const mergedCart = [...localCart];
        // console.log(mergedCart)
        dbCartItems.forEach(dbItem => {
          const existingItemIndex = mergedCart.findIndex(localItem => localItem.id === dbItem.id);
          if (existingItemIndex !== -1) {
            // If item exists in both, update quantity
            mergedCart[existingItemIndex].quantity = Math.max(mergedCart[existingItemIndex].quantity, dbItem.quantity);
          } else {
            // If item doesn't exist in local cart, add it
            mergedCart.push(dbItem);
          }
        });

        // Sync the merged cart back to the database and localStorage
        await syncCartToDatabase(mergedCart);
        localStorage.setItem('cartItems', JSON.stringify(mergedCart));

        // Set the cart for filtering
        dbCart = mergedCart.map(item => ({ productId: item.id, quantity: item.quantity }));
      } else {
        // Map localCart to match the structure of dbCart
        dbCart = localCart.map(item => ({ productId: item.id, quantity: item.quantity }));
      }

      const products = await getAllProducts();

      if (dbCart && products) {
        const filteredProducts = products.filter((product) =>
          dbCart.some((cartItem) => cartItem.productId === product.id)
        );

        let total = 0;
        const productsWithQuantity = filteredProducts.map((product) => {
          const cartItem = dbCart.find((item) => item.productId === product.id);
          total += product.price * cartItem.quantity;
          return { ...product, quantity: cartItem.quantity };
        });

        setCartProducts(productsWithQuantity);
        setCartTotal(total);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCartData();
  // const int = setInterval(() => { fetchCartData(); }
  // , 2000);  

  // return () => clearInterval(int);
}, [isSignedIn, isCartOpen]);

const syncCartToDatabase = async (cart) => {
  // console.log(cart);
  // Assume this function sends the merged cart to the server to update the database
  try {
    if(!cart.length === 0) {

      await addProductToCart(cart); // Replace with your actual API call to update the cart on the server
    }
  } catch (error) {
    console.log("Error syncing cart to database:", error);
  }
};





const handleRemoveFromCart = async (productId) => {
  try {
    let updatedCart;

    if (!isSignedIn) {
      // User is not signed in, update the cart in local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      
      // Remove the product from the cart
      updatedCart = cartItems.filter((item) => item.id !== productId);

      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      // User is signed in, update the cart in the database
      updatedCart = await removeFromCart(productId);
      console.log(updatedCart)
      // Update local storage with the updated cart from the server
      const localCart = updatedCart.map(item => ({ id: item.productId, quantity: item.quantity }));
      console.log(localCart)
      localStorage.setItem("cartItems", JSON.stringify(localCart));

    }

    if (updatedCart) {
      // Update the state to reflect the changes in the UI
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
    if (!isSignedIn) {
      // User is not signed in, update the quantity in local storage
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      console.log(cartItems)
      const productIndex = cartItems.findIndex(item => item.id === productId);
      // console.log(productIndex)
      if (productIndex !== -1) {
        if (action === 'increase') {
          cartItems[productIndex].quantity += 1;
        } else if (action === 'decrease' && cartItems[productIndex].quantity > 1) {
          cartItems[productIndex].quantity -= 1;
        } else if (action === 'decrease' && cartItems[productIndex].quantity === 1) {
          // Remove the item from the cart if the quantity is 1 and action is decrement
          cartItems.splice(productIndex, 1);
        }

        console.log(cartItems)
  
        // Update the cart in local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
        // Fetch product data to update the cart display
        const products = await getAllProducts();
        const filteredProducts = products.filter((product) =>
          cartItems.some((cartItem) => cartItem.id === product.id)
        );
  
        let total = 0;
        const productsWithQuantity = filteredProducts.map((product) => {
          const cartItem = cartItems.find(
            (item) => item.id === product.id
          );
          total += product.price * cartItem.quantity;
          return { ...product, quantity: cartItem.quantity };
        });
  
        setCartProducts(productsWithQuantity);
        setCartTotal(total);
      }
    } else {
      // User is signed in, update the quantity in the database
      const updatedCart = await updateCartQuantity(productId, action);
      console.log(updatedCart)
      if (updatedCart) {
        const localCart = updatedCart.map(item => ({ productId: item.id, quantity: item.quantity }));
        localStorage.setItem("cartItems", JSON.stringify(localCart));
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
    }
  };
  





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
                          className="text-black py-1 px-3 cursor-pointer hover:bg-gray-300"
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
                          className="text-black py-1 px-3 hover:bg-gray-300"
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
