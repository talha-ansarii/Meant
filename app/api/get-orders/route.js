import Orders from "@/models/Order";
import dbConnect from "../../../lib/mongodb";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
  await dbConnect();
  const { userId } = await auth();

  // Fetch all orders for the authenticated user
  const orders = await Orders.find({ userId });

  // Return the orders
  return new Response(JSON.stringify(orders), { status: 200 });
}
