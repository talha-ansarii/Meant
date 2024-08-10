import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import { auth } from "@clerk/nextjs/server";

export async function POST(request) {
  await dbConnect();
  const { userId } = await auth();
  const { productId } = await request.json();

  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({ userId, cart: [], wishlist: [], addresses: [] });
  }

  if (!user.wishlist.some((item) => item.productId === productId)) {
    user.wishlist.push({ productId });
  }

  await user.save();

  return new Response(JSON.stringify(user.wishlist), { status: 200 });
}

export async function DELETE(request) {
  await dbConnect();
  const { userId } = await auth();
  const { productId } = await request.json();

  const user = await User.findOne({ userId });
  if (!user) return new Response("User not found", { status: 404 });

  user.wishlist = user.wishlist.filter((item) => item.productId !== productId);
  await user.save();

  return new Response(JSON.stringify(user.wishlist), { status: 200 });
}

export async function GET(request) {
  await dbConnect();
  const { userId } = await auth();

  // Fetch the user from the database
  const user = await User.findOne({ userId });
  if (!user) return new Response("User not found", { status: 404 });

  // Return the products
  return new Response(JSON.stringify(user.wishlist), { status: 200 });
}
