import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
},{ timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
