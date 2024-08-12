"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addProductToCart, getAllProducts } from "@/utils/cartUtils";
import {
  addProductToWishlist,
  getWishlistProducts,
  removeProductFromWishlist,
} from "@/utils/wishlistUtils";
import VideoLoader from "./VideoLoader";

const WishList = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [wishlistArray, setWishlistArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
   
  }, []);




  useEffect(() => {
    const fetchData = async () => {
      try {
        let dbWishlist = [];
        let localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        if (isSignedIn) {
          // Fetch wishlist products from the database
          dbWishlist = await getWishlistProducts();
          // Extract productIds from dbWishlist
          const dbWishlistIds = dbWishlist.map(item => item.productId);

          // Merge and deduplicate the wishlists
          const mergedWishlist = [...new Set([...localWishlist, ...dbWishlistIds])];

          // Sync the merged wishlist back to the database and localStorage
          await syncWishlistToDatabase(mergedWishlist);
          localStorage.setItem('wishlist', JSON.stringify(mergedWishlist));

          // Set the wishlist for filtering
          dbWishlist = mergedWishlist.map(id => ({ productId: id }));
        } else {
          // Map localWishlist to match the structure of dbWishlist
          dbWishlist = localWishlist.map(id => ({ productId: id }));
        }

        const products = await getAllProducts();

        if (dbWishlist && products) {
          const filteredProducts = products.filter((product) =>
            dbWishlist.some((wishlistItem) => wishlistItem.productId === product.id)
          );

          setWishlistArray(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn]);

  const syncWishlistToDatabase = async (wishlist) => {
    console.log(wishlist)
    // Assume this function sends the merged wishlist to the server to update the database
    try {
      await addProductToWishlist(wishlist); // Replace with your actual API call
    } catch (error) {
      console.error("Error syncing wishlist to database:", error);
    }
  };


  const removeFromWishlist = async (productId) => {
    if (isSignedIn) {
      try {
        await removeProductFromWishlist(productId);
        toast.error("Removed from wishlist");
  
        let updatedWishlist = wishlistArray.filter((item) => item.id !== productId);
        setWishlistArray(updatedWishlist);
  
        // Update localStorage
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const updatedLocalWishlist = localWishlist.filter((id) => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedLocalWishlist));
      } catch (error) {
        console.error("Error removing product from wishlist:", error);
        toast.error("Error removing product from wishlist");
      }
    } else {
      const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const updatedLocalWishlist = localWishlist.filter((id) => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedLocalWishlist));

      console.log(wishlistArray)
  
      let updatedWishlist = wishlistArray?.filter((item) => item.id !== productId);
      console.log(updatedWishlist)
        setWishlistArray(updatedWishlist);
      toast.error("Removed from wishlist");
    }
  };
  
  const handleCartClick = async (product) => {
    
  
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
  
    try {
      await addProductToCart(product.id, 1);
      toast.success("Added to cart");
      const updatedwishlistArray = wishlistArray.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedwishlistArray.map((item) => item.id)));
      await removeFromWishlist(product.id);

      setWishlistArray(updatedwishlistArray);
      // Update quantities state
  
      // Retrieve existing cart items from local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      // Check if the product is already in the cart
      const existingCartItemIndex = cartItems.findIndex(item => item.id === product.id);
  
      if (existingCartItemIndex !== -1) {
        // If product exists, update its quantity
        cartItems[existingCartItemIndex].quantity += 1;
      } else {
        // If product doesn't exist, add it to the cart
        const newCartItem = { id: product.id, quantity: 1 };
        cartItems.push(newCartItem);
      }
  
      // Save the updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading)
    return (
      <>{isClient && <div className="w-[100vw] h-[100vh] ">Loading...</div>}</>
    );


  return (
    <div className="pb-4">
      <Toaster position="top-right" richColors />

      <Header />
      <h1 className="text-[40px] font-bold font-playfair-display mb-6 text-center pt-[8.5rem]">
        WISHLIST
      </h1>
      {wishlistArray.length === 0 ? (
        <p className="text-center h-[100vh] ">
          Your wishlist is empty.{" "}<br/>
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
                    ₹{item.price}
                  </p>
                </div>
                {/* Remove from wishlist button */}
                <div className="flex flex-col items-center mt-[1rem]">
                  <button
                    className=" bg-white w-[75%] text-black border border-black p-2 rounded-[3px] font-merriweather font-bold mb-4"
                    onClick={() => handleCartClick(item)}
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
