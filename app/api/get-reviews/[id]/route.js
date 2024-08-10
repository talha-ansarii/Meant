import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params }) {
  // Convert params.id to a number
  const productId = Number(params.id) ;
  console.log("Product ID:", productId);

  await dbConnect();

  try {
    // Find all users with reviews for the specified productId
    const users = await User.find({
      "reviews.productId": productId,
    });

    console.log("Users with matching reviews:", users);

    // Extract reviews for the specified productId
    const reviews = users.flatMap((user) =>
      user.reviews.filter((review) => review.productId === productId)
    );

    console.log("Extracted Reviews:", reviews);

    return new Response(JSON.stringify({ reviews }), { status: 200 });
  } catch (error) {
    console.log("Error fetching reviews:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
      status: 500,
    });
  }
}
