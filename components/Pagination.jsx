import React from "react";
import { useRouter } from "next/navigation"; // Updated import
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const router = useRouter();

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(`?page=${page}`);
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center mt-96 space-x-4">
      {/* Previous button */}
      <button
        className={`text-white text-lg px-4 py-2 ${
          currentPage === 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-5 h-5 inline-block mr-2" />
        Previous
      </button>

      {/* Page numbers */}
      <div className="mx-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`text-white text-lg px-4 py-2 ${
              page === currentPage ? "text-gray-400" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next button */}
      {currentPage < totalPages && (
        <button
          className={`text-white text-lg px-4 py-2`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRightIcon className="w-5 h-5 inline-block ml-2" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
