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
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
});

export const Cart = mongoose.model("Cart", cartSchema);
