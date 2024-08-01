"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import initialProducts from "@/constants/products";
import Accordion from "./Accordian";
import ProductCard from "./ProductCard";
import { useCart } from "/context/CartContext.js";
import { useWishlist } from "/context/WishlistContext.js";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Footer from "./Footer";
import Header from "./Header";

const SingleProductPage = ({ productId }) => {
  const [product] = useState(initialProducts.find((p) => p.id === productId));
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedQuantities, setRelatedQuantities] = useState({});
  const [hoveredShade, setHoveredShade] = useState(null);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { addToCart, cart } = useCart();
  const [wishlistFilled, setWishlistFilled] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    // Fetch related products based on category
    const fetchRelatedProducts = () => {
      const fetchedRelatedProducts = initialProducts
        .filter((p) => p.category === product.category)
        .sort(() => 0.5 - Math.random());
      setRelatedProducts(fetchedRelatedProducts);
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product, productId]);

  useEffect(() => {
    setWishlistFilled(wishlist.has(product));
  }, [wishlist, product]);

  useEffect(() => {
    setInCart(cart.some((item) => item.id === product.id));
  }, [cart, product]);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const handleRelatedQuantityChange = (productId, delta) => {
    setRelatedQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 1) + delta;
      return {
        ...prevQuantities,
        [productId]: newQuantity > 0 ? newQuantity : 1,
      };
    });
  };

  const handleCartClick = (e) => {
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      const newQuantity = cartItem.quantity + quantity;
      addToCart(product, newQuantity);
    } else {
      addToCart(product, quantity);
    }

    setInCart(!inCart);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (wishlistFilled) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setWishlistFilled(!wishlistFilled);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-white" : "text-gray-400"}`}
        />
      );
    }
    return stars;
  };

  const handleToggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (img) => {
    setSelectedImage(img);
  };

  const handleShadeClick = (img) => {
    setSelectedImage(img);
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header Placeholder */}
      <Header />
      <div className="p-4 max-w-7xl mx-auto pt-[130px] ">
        <div className="flex space-between">
          {/* Product Images and Main Image */}
          <div className="flex space-x-4 w-3/4 ">
            <div className=" flex w-full h-[500px]">
              <div className="w-20 space-y-2 mr-[1rem] ">
                {[
                  product.image,
                  ...product.shades.map(
                    (shade, index) => product.images[index]
                  ),
                ].map((img, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer ${
                      selectedImage === img
                        ? "border-white"
                        : "border-transparent"
                    } border rounded-lg`}
                    onMouseEnter={() => handleMouseEnter(img)}
                  >
                    <Image
                      src={img}
                      alt={`Product image ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                ))}
              </div>

              <div className="w-2/3 ">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-[400px] h-[400px] rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-2/3 space-y-4 ">
            <div className="flex items-center justify-between">
              <h1 className="font-size-heading font-bold font-playfair-display">
                {product.name}
              </h1>
              {wishlistFilled ? (
                <FaHeart
                  onClick={handleWishlistClick}
                  className="w-8 h-8 text-[#D76D8E] cursor-pointer"
                />
              ) : (
                <FaRegHeart
                  onClick={handleWishlistClick}
                  className="w-8 h-8 text-[#D76D8E] cursor-pointer"
                />
              )}
            </div>
            <p className="text-sm font-normal font-merriweather text-white mt-2">
              {product.details}
            </p>
            <p className="text-xl font-playfair-display font-bold mt-4">
              {product.price}
            </p>
            <div className="flex items-center mt-2">
              {renderStars(product.rating)}
              <span className="text-white font-poppins font-medium ml-2">
                ({product.reviews} reviews)
              </span>
            </div>
            {/* Color Palette */}
            <h3 className="text-lg font-bold font-merriweather mt-4">Shades</h3>
            <div className="grid grid-cols-2 w-[48px] my-2">
              {" "}
              {product.shades.map((shade, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 relative"
                >
                  {" "}
                  <div
                    className="w-6 h-6"
                    style={{ backgroundColor: shade }}
                    onMouseEnter={() =>
                      setHoveredShade(product.shadeNames[index])
                    }
                    onMouseLeave={() => setHoveredShade(null)}
                    onClick={() => handleShadeClick(product.images[index])}
                  />{" "}
                  <span
                    className={`text-white text-xs font-poppins font-medium absolute transition-opacity duration-300 ${
                      hoveredShade === product.shadeNames[index]
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    style={{ left: index % 2 === 0 ? "-3rem" : "1.5rem" }}
                  >
                    {" "}
                    {product.shadeNames[index]}{" "}
                  </span>{" "}
                </div>
              ))}{" "}
            </div>

            <div className="flex items-center mt-4">
              <div className="flex items-center border border-white bg-black rounded-md mr-6">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-6 h-6 text-white font-poppins font-medium border-white rounded-l-md flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 h-8 text-white font-poppins font-medium border-r border-l border-white flex items-center justify-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 text-white font-poppins font-medium rounded-r-md flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleCartClick(product)}
                className="bg-white text-black border border-black px-6 py-2 rounded-md font-merriweather font-bold w-full max-w-xs hover:bg-gray-300"
              >
                Add to Cart
              </button>
            </div>

            <Accordion
              title="Details"
              isOpen={openIndex === 0}
              onToggle={() => handleToggleAccordion(0)}
              noTopBorder={true}
              textColor="text-white"
              fontWeight="font-bold"
            >
              <p className="text-sm font-medium font-poppins text-gray-400">
                {product.description}
              </p>
            </Accordion>
            <Accordion
              title="Ingredients"
              isOpen={openIndex === 1}
              onToggle={() => handleToggleAccordion(1)}
              textColor="text-white"
              fontWeight="font-bold"
            >
              <p className="text-sm font-medium font-poppins text-gray-400">
                {product.ingredients}
              </p>
            </Accordion>
            <Accordion
              title="How to Apply"
              isOpen={openIndex === 2}
              onToggle={() => handleToggleAccordion(2)}
              isLast={true}
              textColor="text-white"
              fontWeight="font-bold"
            >
              <p className="text-sm font-medium font-poppins text-gray-400">
                {product.howToUse}
              </p>
            </Accordion>

            {/* Product Feature Section */}
            <div className="flex justify-center space-x-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 border border-white rounded-full bg-black">
                  <Image
                    src="/assets/images/paraben-free.webp"
                    alt="Paraben Free"
                    width={32}
                    height={32}
                    className="w-6 h-6"
                  />
                </div>
                <p className="text-sm font-normal font-merriweather text-white mt-2">
                  Paraben Free
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 border border-white rounded-full bg-black">
                  <Image
                    src="/assets/images/vegan.webp"
                    alt="Vegan"
                    width={32}
                    height={32}
                    className="w-6 h-6"
                  />
                </div>
                <p className="text-sm font-normal font-merriweather text-white mt-2">
                  Vegan
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 border border-white rounded-full bg-black">
                  <Image
                    src="/assets/images/cruelty-free.webp"
                    alt="Cruelty Free"
                    width={32}
                    height={32}
                    className="w-6 h-6"
                  />
                </div>
                <p className="text-sm font-normal font-merriweather text-white mt-2">
                  Cruelty Free
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Seprator */}
        <div className="flex items-center my-12">
          <h2 className="font-size-heading font-medium font-playfair-display flex-shrink-0">
            You May Also Like
          </h2>
          <div className="flex-grow ml-4 bg-white h-[1px] my-6"></div>
        </div>

        {/* You May Also Like Section */}
        <section className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                quantity={relatedQuantities[p.id] || 1}
                onQuantityChange={handleRelatedQuantityChange}
                onAddToCart={handleCartClick}
                onAddToWishlist={handleWishlistClick}
                isInWishlist={false}
              />
            ))}
          </div>
        </section>

        {/* Review Separator */}
        <div className="flex items-center my-12">
          <h2 className="font-size-heading font-medium font-playfair-display flex-shrink-0">
            Reviews
          </h2>
          <div className="flex-grow ml-4 bg-white h-[1px] my-6"></div>
        </div>

        {/* Reviews Section */}
        <div className="relative flex items-center justify-center space-x-12 mb-8">
          <div className="flex items-center space-x-12">
            <p className="text-white font-medium font-size-heading font-playfair-display">
              0/5
            </p>
            <div className="flex flex-col items-center">
              <span className="text-white text-lg font-bold font-merriweather">
                Overall Rating
              </span>
            </div>
          </div>
          <div className="border-l border-white h-20 mx-12"></div>
          <div className="flex flex-col">
            <p className="text-white font-merriweather text-lg font-bold mb-4">
              Write Us a Review !
            </p>
            <button className="bg-black text-[#D9D9D9] border px-6 py-2 rounded font-merriweather font-bold">
              Write Review
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SingleProductPage;
