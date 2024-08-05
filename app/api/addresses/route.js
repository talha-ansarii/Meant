import { authMiddleware } from '@clerk/nextjs';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { auth } from '@clerk/nextjs/server';

export async function POST(request) {
  await dbConnect();
  const { userId } = await auth();
  const { address } = await request.json();

  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({ userId, cart: [], wishlist: [], addresses: [] });
  }

  user.addresses.push({ address });
  await user.save();

  return new Response(JSON.stringify(user.addresses), { status: 200 });
}
