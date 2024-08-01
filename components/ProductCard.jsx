import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "/context/WishlistContext.js";
import { useCart } from "/context/CartContext.js";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, quantity, onQuantityChange }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { addToCart, cart } = useCart();
  const [wishlistFilled, setWishlistFilled] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setWishlistFilled(wishlist.has(product));
  }, [wishlist, product]);

  useEffect(() => {
    setInCart(cart.some((item) => item.id === product.id));
  }, [cart, product]);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (wishlistFilled) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setWishlistFilled(!wishlistFilled);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();

    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      const newQuantity = cartItem.quantity + quantity;
      addToCart(product, newQuantity);
    } else {
      addToCart(product, quantity);
    }

    setInCart(!inCart);
  };

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative">
        {/* Link to the single product page */}
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={350}
            className="w-full h-auto"
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
        {/* Ratings section */}
        <div className="flex items-center mb-2 font-poppins">
          <span className="text-black mr-2 flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "text-black" : "text-gray-300"
                }`}
              />
            ))}
          </span>
          <span className="text-black font-poppins font-medium">
            ({product.rating})
          </span>
        </div>

        {/* Product name and price */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-playfair-display font-bold text-black">
            {product.name}
          </h3>
          <p className="text-lg font-playfair-display font-semibold text-black">
            {product.price}
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
