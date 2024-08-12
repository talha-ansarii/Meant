"use client";
import React, { useState } from "react";
import "./LikeButton.css";

const LikeButton = ({wishlistFilled}) => {


  return (
    <div className="placement" >
      <div className={`heart ${wishlistFilled ? "is-active" : ""}`}></div>
    </div>
  );
};

export default LikeButton;
