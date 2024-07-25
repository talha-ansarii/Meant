"use client";

import React, { useState } from "react";
import initialProducts from "@/constants/products"; // Import products as initialProducts
import Image from "next/image";
import Pagination from "@/components/Pagination";

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts); // Initialize state with initialProducts
  const [quantities, setQuantities] = useState(
    initialProducts.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );
  const [wishlist, setWishlist] = useState(new Set());
  const [sortOption, setSortOption] = useState("Featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const handleAddToCart = (product) => {
    console.log(`Added ${quantities[product.id]} ${product.name} to the cart.`);
  };

  const handleAddToWishlist = (product) => {
    setWishlist((prev) => {
      const updatedWishlist = new Set(prev);
      if (updatedWishlist.has(product.id)) {
        updatedWishlist.delete(product.id);
        console.log(`Removed ${product.name} from the wishlist.`);
      } else {
        updatedWishlist.add(product.id);
        console.log(`Added ${product.name} to the wishlist.`);
      }
      return updatedWishlist;
    });
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedProducts = [...products];

    const parsePrice = (price) => {
      // Remove the dollar sign and convert to number
      return parseFloat(price.replace("$", "").replace(",", ""));
    };

    switch (option) {
      case "Featured":
        sortedProducts = [...initialProducts];
        break;
      case "Newest":
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Best Selling":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "High to Low":
        sortedProducts.sort(
          (a, b) => parsePrice(b.price) - parsePrice(a.price)
        );
        break;
      case "Low to High":
        sortedProducts.sort(
          (a, b) => parsePrice(a.price) - parsePrice(b.price)
        );
        break;
      default:
        sortedProducts = [...initialProducts];
    }

    setProducts(sortedProducts);
    setCurrentPage(1);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 relative">
      {/* Product count and sort by filter */}
      <div className="flex justify-between items-center mb-6">
        {/* Product count */}
        <h2 className="text-white font-poppins font-semibold text-lg">
          {products.length} Products
        </h2>
        <div className="flex items-center space-x-2">
          {/* Sort By Filter */}
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-black text-white border border-white rounded-md px-4 py-2"
          >
            <option value="Featured">Sort By: Featured</option>
            <option value="Newest">Sort By: Newest</option>
            <option value="Best Selling">Sort By: Best Selling</option>
            <option value="High to Low">Sort By: Price: High to Low</option>
            <option value="Low to High">Sort By: Price: Low to High</option>
          </select>
          {/* Filter button */}
          <button
            onClick={toggleFilter}
            className="bg-black text-white border border-white rounded-md px-4 py-2"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Filter Popup */}
      {filterOpen && (
        <div
          className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-50"
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="bg-white w-80 h-full max-h-screen p-4 transition-transform transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setFilterOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <h3 className="text-black font-poppins font-semibold text-lg mb-4">
              Filter
            </h3>
            {/* Filter Options */}
            <div className="space-y-6">
              <div>
                <h4 className="font-poppins font-medium text-black">Price Range</h4>
                {/* Add your price range options here */}
              </div>
              <div>
                <h4 className="font-poppins font-medium text-black">Shade</h4>
                {/* Add your shade options here */}
              </div>
              <div>
                <h4 className="font-poppins font-medium text-black">Category</h4>
                {/* Add your category options here */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative border rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={350}
                className="w-full h-auto"
              />
              {/* Wishlist heart icon */}
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => handleAddToWishlist(product)}
              >
                <svg
                  className="w-8 h-8"
                  fill={wishlist.has(product.id) ? "#D76D8E" : "none"}
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
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating ? "text-black" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 15l-5.878 3.09L5.092 12.37 1.115 8.91l6.017-.868L10 2l2.868 5.031 6.017.868-4.977 3.46 1.248 5.72L10 15z" />
                    </svg>
                  ))}
                </span>
                <span className="text-gray-600">({product.rating})</span>
              </div>

              {/* Product name and price */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-poppins font-medium text-black">
                  {product.name}
                </h3>
                <p className="text-lg font-poppins font-semibold text-black">
                  {product.price}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center justify-between mt-4">
                {/* Quantity controls */}
                <div className="flex items-center border border-black bg-white rounded-md">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="w-8 h-8 text-black font-poppins font-medium border-black rounded-l-md flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 h-8 text-black font-poppins font-medium border-black flex items-center justify-center">
                    {quantities[product.id]}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="w-8 h-8 text-black font-poppins font-medium rounded-r-md flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                {/* Add to Cart button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-white text-black border border-black px-4 py-1.5 rounded-md font-poppins font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
