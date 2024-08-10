import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ productId, onClose }) => {
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        starRating,
        comment,
        userId: user?.id,
        username: user.username
      }),
    });

    console.log(response);

    if (response.ok) {
      alert("Review submitted successfully!");
      onClose();
    } else {
      alert("Failed to submit review");
    }
  };

  const handleStarClick = (rating) => {
    setStarRating(rating);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 font-merriweather bg-black text-white rounded-lg shadow-lg max-w-lg mx-auto"
    >
    <p className="font-bold text-[1.5rem]"> Rate and Review</p>
      <p className="text-[1.2rem]">
        <span>{user.username}</span>
      </p>
      <div>
        <label className="block font-medium mb-2 text-[1.2rem]">
          Rate the product:
          <div className="flex mt-2 group">
            {[1, 2, 3, 4, 5].map((rating) => (
              <FaStar
                key={rating}
                className={`cursor-pointer transition-colors ${
                  rating <= starRating ? "text-white" : "text-gray-400  group-hover:text-gray-200"
                }`}
                onClick={() => handleStarClick(rating)}
                size="24"
              />
            ))}
          </div>
        </label>
      </div>
      <div>
        <label className="block font-medium mb-2 text-[1.2rem]">
          Write your review:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="mt-2 p-2 border border-gray-600 rounded-lg w-full h-32 resize-none bg-gray-800 text-white focus:outline-none focus:border-gray-400"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full border bg-black text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
