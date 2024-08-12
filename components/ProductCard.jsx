import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addProductToCart } from "../utils/cartUtils";
import {
  addProductToWishlist,
  getWishlistProducts,
  removeProductFromWishlist,
} from "@/utils/wishlistUtils";
import LikeButton from "./likeButton/LikeButton";

const ProductCard = ({
  product,
  quantity,
  onQuantityChange,
  setQuantities,
  quantities,
}) => {
  const [wishlistFilled, setWishlistFilled] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();



  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products");
        const data = await response.json();
        // console.log("Fetched products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      let wishListproducts = [];

      if (isSignedIn) {
        // Fetch wishlist products from the database
        try {
          wishListproducts = await getWishlistProducts();
        } catch (error) {
          console.error("Error fetching wishlist products", error);
        }
      } else {
        // Fetch wishlist products from localStorage
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishListproducts = localWishlist.map(id => ({ productId: id }));
      }

      // Check if the product is in the wishlist
      const contains = wishListproducts.some(prod => prod.productId === product.id);
      setWishlistFilled(contains);
    };

    fetchWishlistProducts();
  }, [product.id, isSignedIn]);

  const handleWishlistClick = async (e) => {
    e.stopPropagation();
    const wishlistKey = 'wishlist';
    
    // Initialize the wishlist from localStorage or an empty array
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
    if (!isSignedIn) {
      if (wishlistFilled) {
        wishlist = wishlist.filter((item) => item !== product.id);
        toast.error("Removed from wishlist");
      } else {
        if (!wishlist.includes(product.id)) {
          wishlist.push(product.id);
        }
        toast.success("Added to wishlist");
      }
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    } else {
      try {
        if (wishlistFilled) {
          await removeProductFromWishlist(product.id);
          toast.error("Removed from wishlist");
        } else {
          await addProductToWishlist(product.id);
          toast.success("Added to wishlist");
        }
  
        // Update local storage
        if (!wishlist.includes(product.id)) {
          wishlist.push(product.id);
        } else {
          wishlist = wishlist.filter((item) => item !== product.id);
        }
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      } catch (error) {
        console.error("Error updating wishlist in the database", error);
        toast.error("Error updating wishlist");
      }
    }
  
    setWishlistFilled(!wishlistFilled);
  };
  
  

  const handleCartClick = async (e) => {
    e.stopPropagation();
  
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
  
    try {
      await addProductToCart(product.id, quantity);
      toast.success("Added to cart");
  
      // Update quantities state
      setQuantities({ ...quantities, [product.id]: 1 });
  
      // Retrieve existing cart items from local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      // Check if the product is already in the cart
      const existingCartItemIndex = cartItems.findIndex(item => item.id === product.id);
  
      if (existingCartItemIndex !== -1) {
        // If product exists, update its quantity
        cartItems[existingCartItemIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add it to the cart
        const newCartItem = { id: product.id, quantity };
        cartItems.push(newCartItem);
      }
  
      // Save the updated cart items to local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-lg bg-white">
      <Toaster position="top-right" richColors />
      <div className="relative h-[15rem]">
        {/* Link to the single product page */}
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.images[0]?.src}
            alt={product.name}
            layout="fill"
            className="object-cover"
          />
        </Link>
        {/* Wishlist heart icon */}
        <div
          className="absolute top-6 right-2 cursor-pointer"
          onClick={handleWishlistClick}
        >
          <div
               className="relative mr-[20px]">
              <LikeButton wishlistFilled={wishlistFilled} />

              </div>
        </div>
      </div>
      <div className="p-4">
        {/* Product name and price */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-playfair-display font-bold text-black">
            {product.name}
          </h3>
          <p className="text-lg font-playfair-display font-semibold text-black">
            ₹{product.price}
          </p>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity controls */}
          <div className="flex items-center justify-center w-[125px] h-[40px] border border-black bg-white rounded-md">
            <button
              onClick={() => onQuantityChange(product.id, -1)}
              className="w-6 h-6 text-black font-poppins font-medium border-black rounded-l-md flex items-center justify-center"
            >
              -
            </button>
            <span className="w-8 h-8 text-black font-poppins font-medium border-black flex items-center justify-center">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(product.id, 1)}
              className="w-8 h-8 text-black font-poppins font-medium rounded-r-md flex items-center justify-center"
            >
              +
            </button>
          </div>
          {/* Add to Cart button */}
          <button
            onClick={handleCartClick}
            className="bg-white text-black w-[125px] h-[40px] border border-black px-4 py-1.5 rounded-md font-merriweather text-sm font-bold hover:bg-gray-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
