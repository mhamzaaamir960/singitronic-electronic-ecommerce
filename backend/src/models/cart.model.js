import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      subtotal: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Cart = mongoose.model("Cart", cartSchema);
