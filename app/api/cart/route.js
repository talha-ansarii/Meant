import { auth } from "@clerk/nextjs/server";

import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(request) {
  await dbConnect();

  const { userId } = await auth();
  const { productId, quantity } = await request.json();

  // console.log(userId, productId, quantity);

  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({
      userId,
      cart: [],
      wishlist: [],
      addresses: [],
      orders: [],
    });
  }

  const existingProductIndex = user.cart.findIndex(
    (item) => item.productId === productId
  );
  if (existingProductIndex !== -1) {
    user.cart[existingProductIndex].quantity += quantity;
  } else {
    user.cart.push({ productId, quantity });
  }
  await user.save();
  return new Response(JSON.stringify(user.cart), { status: 200 });
}

export async function DELETE(request) {
  await dbConnect();
  const { userId } = await auth();
  const { productId } = await request.json();

  const user = await User.findOne({ userId });
  if (!user) return new Response("User not found", { status: 404 });

  user.cart = user.cart.filter((item) => item.productId !== productId);
  await user.save();

  return new Response(JSON.stringify(user.cart), { status: 200 });
}

export async function GET(request) {
  await dbConnect();
  const { userId } = await auth();

  // Fetch the user from the database using their userId
  const user = await User.findOne({ userId });

  // If the user is not found, return a 404 response
  if (!user) return new Response("User not found", { status: 404 });

  // Return the user's cart
  return new Response(JSON.stringify(user.cart), { status: 200 });
}

export async function PATCH(request) {
  await dbConnect();
  const { userId } = await auth();
  const { productId, action } = await request.json();

  // Fetch the user from the database using their userId
  const user = await User.findOne({ userId });
  if (!user) return new Response("User not found", { status: 404 });

  // Find the product in the cart
  const productIndex = user.cart.findIndex(
    (item) => item.productId === productId
  );

  if (productIndex === -1) {
    return new Response("Product not found in cart", { status: 404 });
  }

  // Increase or decrease the quantity
  if (action === "increase") {
    user.cart[productIndex].quantity += 1;
  } else if (action === "decrease") {
    user.cart[productIndex].quantity -= 1;
    // Remove the product if quantity is less than 1
    if (user.cart[productIndex].quantity < 1) {
      user.cart.splice(productIndex, 1);
    }
  } else {
    return new Response("Invalid action", { status: 400 });
  }

  // Save the updated user
  await user.save();

  return new Response(JSON.stringify(user.cart), { status: 200 });
}
