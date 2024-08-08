import mongoose from "mongoose";

const RazorpayOrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ], // [{productId: "123", quantity: 2}, {productId: "124", quantity: 1}]
    amount: { type: Number, default: 0, required: true },
    razorpay_order_id: { type: String, default: "", required: true, unique: true},
    razorpay_payment_id: { type: String, default: "", required: false },
    razorpay_signature: { type: String, default: "", required: false },
    payment_confirmation: { type: Boolean, default: false, required: true }, // true, false
    tracking_status: { type: String, default: "pending", required: true }, // pending, shipped, delivered
    address: { type: Object, required: true },
  },
  { timestamps: true }
);

const Orders =
  mongoose.models.Orders || mongoose.model("Orders", RazorpayOrderSchema);

export default Orders;
