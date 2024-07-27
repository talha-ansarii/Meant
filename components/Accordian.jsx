import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Accordion = ({
  title,
  children,
  isOpen,
  onToggle,
  noTopBorder,
  isLast,
}) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = "0px";
    }
  }, [isOpen]);

  return (
    <div
      className={`relative border-t border-gray-600 ${
        noTopBorder ? "border-t-0" : "border-t"
      }  mb-6 mt-6`}
    >
      <div
        className="flex items-center justify-between cursor-pointer py-2"
        onClick={onToggle}
      >
        <h2 className="text-xl font-bold font-merriweather">{title}</h2>
        <span
          className={`text-white text-xl transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? <FaMinus /> : <FaPlus />}
        </span>
      </div>
      <div
        ref={contentRef}
        className="transition-max-height duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: "0px" }}
      >
        <div className="mt-2 text-sm text-white">{children}</div>
      </div>
      {isLast && (
        <div className="relative border-t border-gray-600 mb-6 mt-3" />
      )}
    </div>
  );
};

export default Accordion;
