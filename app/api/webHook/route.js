import dbConnect from "@/lib/mongodb";
import Orders from "@/models/Order";

export async function POST(request) {
  await dbConnect();
  console.log("webhook called");
  const body = await request.json();

  console.log(body);
  const secret = process.env.SR_WEBHOOK_SECRET;
  console.log(secret)
  const requestHeaders = new Headers(request.headers);
  const webhookSignature = requestHeaders.get("x-api-key");

  console.log(webhookSignature)
  const { current_status, order_id } = body;
  console.log(webhookSignature)
  if (webhookSignature === secret) {
    try {
      const updatedOrder = await Orders.findOneAndUpdate(
        { razorpay_order_id: order_id },
        { tracking_status: current_status },
        { new: true } // This option returns the updated document
      );

      if (!updatedOrder) {
        throw new Error("Order not found");
      }

      console.log(updatedOrder);

      return new Response(
        JSON.stringify({
          message: "Webhook received successfully",
        }),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    return new Response(
      JSON.stringify({
        message: "Invalid webhook signature",
      }),
      { status: 400 }
    );
  }

}
