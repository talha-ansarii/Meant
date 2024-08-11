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
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn]);

  const handleAddToCart = async (item) => {
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
    try {
      await addProductToCart(item.id, 1);
      toast.success("Added to cart");
      removeFromWishlist(item.id);
      console.log("Product added to cart:", data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wishlist = await getWishlistProducts();
        const products = await getAllProducts();

        if (wishlist && products) {
          setLoading(false);
          const filteredProducts = products.filter((product) =>
            wishlist.some(
              (wishlistItem) => wishlistItem.productId === product.id
            )
          );

          console.log(filteredProducts);
          setWishlistArray(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeFromWishlist = async (productId) => {
    removeProductFromWishlist(productId);
    toast.error("Removed from wishlist");
    const updatedWishlist = wishlistArray.filter(
      (item) => item.id !== productId
    );
    setWishlistArray(updatedWishlist);
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
                    ₹{item.price}
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
