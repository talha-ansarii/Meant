import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { auth } from '@clerk/nextjs/server';

export async function POST(request) {
  await dbConnect();
  const { userId } = await auth();
  const address  = await request.json();

  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({ userId, cart: [], wishlist: [], addresses: [] });
  }

  user.addresses.push({ address });
  await user.save();

  return new Response(JSON.stringify(user.addresses), { status: 200 });
}


export async function GET(request) {
  await dbConnect();
  const { userId } = await auth();

  const user = await User.findOne({ userId });

  if (!user) {
    return new Response(JSON.stringify([]), { status: 200 });
  }
  // console.log(user.addresses)
  return new Response(JSON.stringify(user.addresses), { status: 200 });
}

export async function PUT(request) {
  await dbConnect();
  const { userId } = await auth();
  const { addressId, newAddress } = await request.json();

  const user = await User.findOne({ userId });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  const address = user.addresses.id(addressId);
  if (!address) {
    return new Response(JSON.stringify({ error: 'Address not found' }), { status: 404 });
  }

  address.address = newAddress;
  await user.save();

  return new Response(JSON.stringify(user.addresses), { status: 200 });
}
