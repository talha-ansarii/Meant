import { auth } from "@clerk/nextjs/server";
import Razorpay from "razorpay";
const shortid = require("shortid");

export async function POST(request) {
  const { userId } = await auth();
  const body = await request.json();

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
  });
  console.log(body.amount);
  const payment_capture = 1;
  const amount = body.amount * 100; // amount in paise.
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: {
      userId: userId,
      products: body.products,
      address: body.address,
      amount: body.amount,
    },
  };
  console.log("above try catch");
  try {
    const order = await razorpay.orders.create(options);

    console.log(order);
    return new Response(
      JSON.stringify({
        order,
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
      }),
      { status: 500 }
    );
  }
}
