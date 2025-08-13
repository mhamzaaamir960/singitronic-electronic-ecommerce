import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  subtotal: price * quantity,
});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);
