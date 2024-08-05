import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { auth } from '@clerk/nextjs/server'

export async function POST(request) {
  await dbConnect();
  const { userId } = await auth();
  const { productId, quantity } = await request.json();

  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({ userId, cart: [], wishlist: [], addresses: [] });
  }

  const existingProduct = user.cart.find(item => item.productId === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
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
  if (!user) return new Response('User not found', { status: 404 });

  user.cart = user.cart.filter(item => item.productId !== productId);
  await user.save();

  return new Response(JSON.stringify(user.cart), { status: 200 });
}
