import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  cart: [
    {
      productId: String,
      quantity: Number,
    },
  ],
  wishlist: [
    {
      productId: String,
    },
  ],
  addresses: [
    {
      address: String,
    },
  ],
  orders: [
    {
      orderId: String,
        products: [
            {
            productId: String,
            quantity: Number,
            },
        ],
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
