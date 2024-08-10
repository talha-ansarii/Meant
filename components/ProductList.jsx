"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import Accordion from "./Accordian";
import ProductCard from "./ProductCard";
import CustomDropdown from "@/components/CustomDropdown";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";
import VideoLoader from "./VideoLoader";

const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryChange,
  onReset,
}) => {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <li key={category} className="flex items-center">
            <label
              onClick={() => onCategoryChange(category)}
              className={`cursor-pointer font-poppins text-lg ${
                selectedCategories.includes(category)
                  ? "text-black font-normal"
                  : "text-gray-400"
              }`}
            >
              {category}
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={onReset}
        className="text-gray-400 underline font-poppins mt-4 block"
      >
        reset filter
      </button>
    </div>
  );
};

const PriceFilter = ({ priceRange, onPriceChange, onReset }) => {
  return (
    <div>
      <div className="grid grid-cols-2">
        {["0-50", "50-100"].map((range) => (
          <div key={range} className="flex items-center">
            <label
              onClick={() => onPriceChange(range)}
              className={`cursor-pointer font-poppins text-lg ${
                priceRange === range
                  ? "text-black font-normal"
                  : "text-gray-400"
              }`}
            >
              {range === "0-50" ? "$0 - $50" : "$50 - $100"}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="text-gray-400 underline font-poppins mt-4 block"
      >
        reset filter
      </button>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [sortOption, setSortOption] = useState("Featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false)
 
useEffect(() => {
  setIsClient(true)
}, [])


  const productsPerPage = 16;

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/get-products");
        const data = await response.json();
        // console.log("Fetched products:", data);

        setProducts(data);
        setQuantities(
          data.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
        );
        setLoading(false);

      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const parsePrice = (price) => {
    // Remove the dollar sign and convert to number
    return parseFloat(price.replace("$", "").replace(",", ""));
  };

  // State for selected categories and price range
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("");

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedProducts = [...products];

    switch (option) {
      case "Featured":
        sortedProducts = [...products];
        break;
      case "Newest":
        sortedProducts.sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        );
        break;
      case "Best Selling":
        sortedProducts.sort((a, b) => b.average_rating - a.average_rating);
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
        sortedProducts = [...products];
    }

    setProducts(sortedProducts);
    setCurrentPage(1);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const resetCategoryFilter = () => {
    setSelectedCategories([]);
  };

  const resetPriceFilter = () => {
    setPriceRange("");
  };

  // Filter products based on selected categories and price range
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategories.length
      ? product.categories.some((cat) => selectedCategories.includes(cat.name))
      : true; // If no category is selected, include all products

    const matchesPrice = priceRange
      ? (priceRange === "0-50" && parsePrice(product.price) <= 50) ||
        (priceRange === "50-100" &&
          parsePrice(product.price) > 50 &&
          parsePrice(product.price) <= 100) ||
        (priceRange === "100-200" &&
          parsePrice(product.price) > 100 &&
          parsePrice(product.price) <= 200) ||
        (priceRange === "200-500" &&
          parsePrice(product.price) > 200 &&
          parsePrice(product.price) <= 500) ||
        (priceRange === "500+" && parsePrice(product.price) > 500)
      : true; // If no price range is selected, include all products

    return matchesCategory && matchesPrice;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) return <>{isClient && <div className="w-[100vw] h-[100vh] ">
    Loading...
     </div>}</>;


  return (
    <div className="pb-4">
      <Header />
      <div className="banner pt-[8rem]">
        <Banner />
      </div>
      <div className="p-4 relative w-[82%] m-auto pt-[2rem]">
        {/* Product count and sort by filter */}
        <div className="flex justify-between items-center mb-6">
          {/* Product count */}
          <h2 className="text-white font-poppins font-semibold lg:text-lg text-xs md:text-lg">
            {currentProducts.length} Products
          </h2>
          <div className="flex items-center space-x-2">
            {/* Sort By Filter */}
            <CustomDropdown
              options={[
                "Featured",
                "Newest",
                "Best Selling",
                "High to Low",
                "Low to High",
              ]}
              selectedOption={sortOption}
              onSelect={handleSortChange}
              prefix="Sort By:"
            />
            {/* Filter button */}
            <button
              onClick={toggleFilter}
              className="bg-black text-white border border-white rounded-md pl-[.7rem] pr-[.83rem] py-2"
            >
              Filter
            </button>
          </div>
        </div>

        {/* Filter Popup */}
        <div
          className={`fixed inset-0 flex items-start justify-end bg-black bg-opacity-50 z-50 transition-transform duration-700 ${
            filterOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="bg-white w-80 h-full max-h-screen p-4"
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
            <h3 className="text-black font-playfair-display font-semibold text-[25px] mb-4">
              Filter
            </h3>

            {/* Filter Options */}
            <Accordion
              title="Price Range"
              isOpen={openIndex === 0}
              noTopBorder={true}
              onToggle={() => handleToggleAccordion(0)}
              textColor="text-black"
              fontWeight="font-normal"
            >
              <PriceFilter
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                onReset={resetPriceFilter}
              />
            </Accordion>
            <Accordion
              title="Category"
              isOpen={openIndex === 1}
              onToggle={() => handleToggleAccordion(1)}
              isLast={true}
              textColor="text-black"
              fontWeight="font-normal"
            >
              <CategoryFilter
                categories={["Day", "Night"]}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                onReset={resetCategoryFilter}
              />
            </Accordion>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {" "}
          {currentProducts.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              product={product}
              quantity={quantities[product.id]}
              onQuantityChange={handleQuantityChange}
              setQuantities={setQuantities}
              quantities={quantities}
            />
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
