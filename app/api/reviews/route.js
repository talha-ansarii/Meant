import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(req) {
  const { productId, starRating, comment, username, userId } = await req.json();

  console.log("Received data:", {
    productId,
    starRating,
    comment,
    userId,
    username,
  });

  await dbConnect();

  try {
    if (!userId) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
      });
    }

    // Find the user in the MongoDB database
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({
        userId,
        cart: [],
        wishlist: [],
        addresses: [],
        orders: [],
        reviews: [],
      });
    }

    // Create a new review object
    const newReview = {
      productId,
      name: username,
      starRating,
      comment,
    };

    // Add the review to the user's reviews array
    user.reviews.push(newReview);

    // Save the user with the new review
    await user.save();

    return new Response(JSON.stringify({ reviews: user.reviews }), {
      status: 200,
    });
  } catch (error) {
    console.log("Error posting review:", error);
    return new Response(JSON.stringify({ error: "Failed to post review" }), {
      status: 500,
    });
  }
}
