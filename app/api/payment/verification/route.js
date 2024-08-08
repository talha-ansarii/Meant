import dbConnect from "@/lib/mongodb";
import Orders from "@/models/Order";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";
const shortid = require("shortid");

const secret = process.env.WEBHOOK_SECRET; // Replace with your actual webhook secret

export async function POST(request) {
  await dbConnect();

  const requestHeaders = new Headers(request.headers);
  const webhookSignature = requestHeaders.get("X-Razorpay-Signature");
  const body = await request.json();
  console.log(body);

  const { userId } = await auth();

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(body))
    .digest("hex");

  console.log("webhook called");

  if (webhookSignature === generatedSignature) {
    const event = body.event;
    const payload = body.payload;
    console.log(body);
    console.log(body.payload.payment.entity.order_id);
    console.log(body.payload.payment.entity.notes);
    console.log("Webhook received: ", event);

    switch (event) {
      case "payment.captured":
        try {
          const data = await Orders.create({
            userId: body.payload.payment.entity.notes.userId,
            products: body.payload.payment.entity.notes.products,
            amount: body.payload.payment.entity.notes.amount,
            address: body.payload.payment.entity.notes.address,
            razorpay_order_id: body.payload.payment.entity.order_id,
            razorpay_payment_id: body.payload.payment.entity.id,
            razorpay_signature: webhookSignature,
            payment_confirmation: true,
            tracking_status: "pending",
          });

          console.log(data);
        } catch (error) {
          console.log(error);
        }

        try {
          const user = await User.findOne({
            userId: body.payload.payment.entity.notes.userId,
          });
          if (!user) return new Response("User not found", { status: 404 });

          user.cart = [];
          await user.save();
        } catch (error) {
          console.log(error);
        }

        break;
      case "payment.failed":
        console.log(
          "Payment failed for order: ",
          body.payload.payment.entity.error_description
        );
        console.log("Order ID: ", body.payload.payment.entity.order_id);
        break;
      default:
        console.log("Unhandled event: ", event);
        break;
    }
    return new Response(
      JSON.stringify({
        message: "Webhook received successfully",
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "Invalid webhook signature",
      }),
      { status: 400 }
    );
  }
}
