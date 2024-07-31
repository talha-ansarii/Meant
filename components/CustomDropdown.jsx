"use client"

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const CustomDropdown = ({
  options,
  selectedOption,
  onSelect,
  prefix,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedOption);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="bg-black text-white border border-white rounded-md px-4 py-2 flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>
          {prefix} {selected}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-gray-200 mt-2 rounded-md w-full shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              className={`block text-left w-full px-4 py-2 text-black hover:bg-gray-100 ${
                option === selected ? "bg-gray-200" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  className: PropTypes.string,
};

CustomDropdown.defaultProps = {
  prefix: "",
  className: "",
};

export default CustomDropdown;
