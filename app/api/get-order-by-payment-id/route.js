import Orders from "@/models/Order";
import dbConnect from "../../../lib/mongodb";

export async function GET(request) {
  await dbConnect();
  const url = new URL(request.url);
  const razorpay_payment_id = url.searchParams.get("razorpay_payment_id");
  console.log(razorpay_payment_id);

  if (!razorpay_payment_id) {
    return new Response("Missing razorpay_payment_id", { status: 400 });
  }

  console.log(razorpay_payment_id)
  // Fetch the order using the razorpay_payment_id
  const order = await Orders.findOne({ razorpay_payment_id: razorpay_payment_id });

console.log(order.razorpay_order_id)
  // If the order is not found, return a 404 response
  if (!order) return new Response("Order not found", { status: 404 });

  // Return the order
  return new Response(JSON.stringify(order), { status: 200 });
}
