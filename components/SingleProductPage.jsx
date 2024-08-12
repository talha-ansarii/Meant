"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import Accordion from "./Accordian";
import ProductCard from "./ProductCard";
import ReviewForm from "./ReviewForms";
import ReviewCard from "./ReviewCard";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import productShades from "@/constants/productShades";
import Footer from "./Footer";
import Header from "./Header";
import Modal from "./Modal";
import { addProductToCart } from "@/utils/cartUtils";
import {
  addProductToWishlist,
  getWishlistProducts,
  removeProductFromWishlist,
} from "@/utils/wishlistUtils";
import VideoLoader from "./VideoLoader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const shades = ["#A32C42", "#663024", "#AD5B55", "#995A60"];

const SingleProductPage = ({ productId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedQuantities, setRelatedQuantities] = useState({});
  const [hoveredShade, setHoveredShade] = useState(null);
  const [wishlistFilled, setWishlistFilled] = useState(false);
  const [initialProducts, setInitialProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { isSignedIn } = useUser();

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(`/api/get-product/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setLoading(false);
        setProduct(data);
        setSelectedImage(data.images[0].src);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products");
        const data = await response.json();

        console.log(data);

        setInitialProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (product && product.categories && product.categories.length > 0) {
      const fetchRelatedProducts = () => {
        const productCategoryName = product.categories[0].name;

        // Filter products that belong to the same category
        const fetchedRelatedProducts = initialProducts
          .filter((p) =>
            p.categories.some((cat) => cat.name != productCategoryName)
          )
          .sort(() => 0.5 - Math.random());

        setRelatedProducts(fetchedRelatedProducts);
      };

      fetchRelatedProducts();
    }
  }, [product, initialProducts]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/get-reviews/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        console.log(data);

        setReviews(data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

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

  const handleCartClick = async (e) => {
    e.stopPropagation();
  
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
  
    try {
      await addProductToCart(product.id, quantity);
      toast.success("Added to cart");
  
      // Update quantities state
      setQuantity(1);
  
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

  const handleWishlistClick = async (e) => {
    e.stopPropagation();
    const wishlistKey = 'wishlist';

    const product_id = parseInt(productId);
    
    // Initialize the wishlist from localStorage or an empty array
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  
    if (!isSignedIn) {
      if (wishlistFilled) {
        wishlist = wishlist.filter((item) => item !== product_id);
        toast.error("Removed from wishlist");
      } else {
        if (!wishlist.includes(product_id)) {
          wishlist.push(product_id);
        }
        toast.success("Added to wishlist");
      }
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    } else {
      try {
        if (wishlistFilled) {
          await removeProductFromWishlist(product_id);
          toast.error("Removed from wishlist");
        } else {
          await addProductToWishlist(product_id);
          toast.success("Added to wishlist");
        }
  
        // Update local storage
        if (!wishlist.includes(product_id)) {
          wishlist.push(product_id);
        } else {
          wishlist = wishlist.filter((item) => item !== product_id);
        }
        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      } catch (error) {
        console.error("Error updating wishlist in the database", error);
        toast.error("Error updating wishlist");
      }
    }
  
    setWishlistFilled(!wishlistFilled);
  };

  const handleReviewFormClose = () => {
    setShowReviewForm(false);
  };

  const handleToggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  const productStyle = productShades[productId] || {
    shades: [],
    shadeNames: [],
  };

  const handleShadeClick = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  useEffect(() => {

    const product_id = parseInt(productId);
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
      const contains = wishListproducts.some(prod => prod.productId === product_id);
      setWishlistFilled(contains);
    };

    fetchWishlistProducts();
  }, [productId, isSignedIn]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce(
      (acc, review) => acc + review.starRating,
      0
    );
    return (totalRating / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  if (loading)
    return (
      <>
        {isClient && (
          <div className="w-[100vw] h-[100vh] ">
           Loading...
          </div>
        )}
      </>
    );

  return (
    <div className="bg-black text-white min-h-screen">
      <Toaster position="top-right" richColors />
      {/* Header Placeholder */}
      <Header />
      <div className="p-4 max-w-7xl mx-auto pt-[130px] ">
        <div className="flex md:flex-row lg:flex-row flex-col space-between">
          {/* Product Images and Main Image */}
          <div className="flex lg:space-x-4 w-[90%] px-2 md:px-0 lg:px-0 lg:w-3/4 md:w-3/4 ">
            <div className=" flex w-full md:h-[500px] lg:h-[500px]">
              <div className="lg:w-20 w-[52px]  space-y-2 lg:mr-[1rem] ">
                {[
                  product.images[0].src,
                  ...shades.map(
                    (shade, index) => product.images[index + 1]?.src
                  ),
                ].map(
                  (imgSrc, index) =>
                    imgSrc && (
                      <div
                        key={index}
                        className={`cursor-pointer ${
                          selectedImage === imgSrc
                            ? "border-white"
                            : "border-transparent"
                        } border rounded-lg`}
                        onMouseEnter={() => handleMouseEnter(imgSrc)}
                      >
                        <Image
                          src={imgSrc}
                          alt={`Product image ${index + 1}`}
                          width={80}
                          height={80}
                          className="lg:w-[80px] lg:h-[80px] w-[52px] h-[53px] rounded-md"
                        />
                      </div>
                    )
                )}
              </div>

              <div className="lg:w-2/3 ">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={440}
                  height={440}
                  className="lg:w-[440px] lg:h-[440px] w-[296px] h-[296px] rounded-xl ml-8"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-2/3 mt-8 lg:mt-0 md:mt-0 lg:w-2/3 w-full lg:space-y-4 md:space-y-4 ">
            <div className="flex items-center justify-between">
              <h1 className="lg:font-size-heading font-bold text-[28px] font-playfair-display">
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
            <p className="lg:text-sm text-[10px] font-normal font-merriweather text-white mt-2">
              {product.meta_data.find((meta) => meta.key === "details")
                ?.value || "No details available."}
            </p>
            <p className="lg:text-xl text-[17px] font-playfair-display font-bold mt-4">
              ₹{product.price}
            </p>

            {/* Color Palette */}
            <h3 className="lg:text-lg text-[10px] font-bold font-merriweather mt-4">
              Shades
            </h3>
            <div className="grid ml-[1.7rem] md:ml-0 lg:ml-0 grid-cols-2 w-[31px] lg:w-[48px] my-2">
              {" "}
              {productStyle.shades.map((shade, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 relative"
                >
                  {" "}
                  <div
                    className="lg:w-6 lg:h-6 w-[16px] h-[16px] "
                    style={{ backgroundColor: shade }}
                    onMouseEnter={() =>
                      setHoveredShade(productStyle.shadeNames[index])
                    }
                    onMouseLeave={() => setHoveredShade(null)}
                    onClick={() =>
                      handleShadeClick(product.images[index + 1].src)
                    }
                  />{" "}
                  <span
                    className={`text-white text-xs font-poppins font-medium absolute transition-opacity duration-300 ${
                      hoveredShade === productStyle.shadeNames[index]
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    style={{ left: index % 2 === 0 ? "-3rem" : "1.5rem" }}
                  >
                    {" "}
                    {productStyle.shadeNames[index]}{" "}
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
                onClick={handleCartClick}
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
                {product.meta_data.find((meta) => meta.key === "description")
                  ?.value || "No description available."}
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
                {product.meta_data.find((meta) => meta.key === "ingredients")
                  ?.value || "No ingredients available."}
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
                {product.meta_data.find((meta) => meta.key === "howtoapply")
                  ?.value || "No how to apply available."}
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
        </div>

        {/* You May Also Like Section */}
        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                quantity={relatedQuantities[p.id] || 1}
                onQuantityChange={handleRelatedQuantityChange}
              />
            ))}
          </div>
        </section>

        {/* Review Separator */}
        <div className="flex items-center my-12">
          <h2 className="font-size-heading font-medium font-playfair-display flex-shrink-0">
            Reviews
          </h2>
        </div>

        {/* Render Reviews */}
        <div className="mt-8">
          <h2 className="font-medium text-2xl font-playfair-display">
            Customer Reviews
          </h2>
          <div className="mt-8 mb-8 flex flex-row flex-wrap gap-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  username={review.name}
                  comment={review.comment}
                  starRating={review.starRating}
                />
              ))
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="relative flex md:flow-row lg:flex-row md:gap-0 lg:gap-0 gap-8 flex-col items-center justify-center space-x-12 mb-8">
          <div className="flex items-center space-x-12">
            <p className="text-white font-medium font-size-heading font-playfair-display">
              {averageRating} / 5
            </p>
            <div className="flex flex-col items-center">
              <span className="text-white text-lg font-bold font-merriweather">
                Overall Rating
              </span>
            </div>
          </div>
          <div className="border-l hidden lg:block md:block border-white h-20 mx-12"></div>
          <div className="flex flex-col">
            <p className="text-white font-merriweather text-lg font-bold mb-4">
              Write Us a Review !
            </p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-black text-[#D9D9D9] border px-6 py-2 rounded font-merriweather font-bold hover:bg-gray-600"
            >
              Write Review
            </button>
          </div>
        </div>

        {/* Review Form Popup */}
        <Modal isOpen={showReviewForm} onClose={handleReviewFormClose}>
          <ReviewForm productId={productId} onClose={handleReviewFormClose} />
        </Modal>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SingleProductPage;
