import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    cart: [
      {
        productId: Number,
        quantity: Number,
      },
    ],
    wishlist: [
      {
        productId: Number,
      },
    ],
    addresses: [
      {
        address: Object,
      },
    ],
    orders: [
      {
        orderId: String,
        products: [
          {
            productId: Number,
            quantity: Number,
          },
        ],
      },
    ],
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
