import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ username, comment, starRating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < starRating ? "text-black" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white font-merriweather border p-4 rounded-lg mb-4 w-full max-w-sm">
      <p className="text-black font-semibold text-lg mb-2">{username}</p>
      <p className="text-black mb-2 overflow-wrap break-words">{comment}</p>
      <div className="flex items-center">{renderStars()}</div>
    </div>
  );
};

export default ReviewCard;
