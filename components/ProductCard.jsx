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
      const wishListproducts = await getWishlistProducts();
      // console.log(wishListproducts);
      const contains = wishListproducts?.some((prod) => {
        // console.log(prod.productId, product.id)
        return prod.productId === product.id;
      });
      setWishlistFilled(contains);
    };

    fetchWishlistProducts();
  });

  const handleWishlistClick = async (e) => {
    e.stopPropagation();
    if (!isSignedIn) {
      return router.push("/sign-in");
    }

    if (wishlistFilled) {
      await removeProductFromWishlist(product.id);
      toast.error("Removed from wishlist");
    } else {
      await addProductToWishlist(product.id);
      toast.success("Added to wishlist");
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
      setQuantities({ ...quantities, [product.id]: 1 });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return;
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
          className="absolute top-4 right-2 cursor-pointer"
          onClick={handleWishlistClick}
        >
          <svg
            className="w-8 h-8"
            fill={wishlistFilled ? "#D76D8E" : "none"}
            stroke="#D76D8E"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
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
          <div className="flex items-center border border-black bg-white rounded-md">
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
            className="bg-white text-black border border-black px-4 py-1.5 rounded-md font-merriweather font-bold hover:bg-gray-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
