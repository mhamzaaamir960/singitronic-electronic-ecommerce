import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  rating: {
    type: Number,
    default: 5,
  },
  productImage: {
    url: { type: String },
    public_id: { type: String },
  }, // upload on cloudinary before
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  inStock: {
    type: Boolean,
    default: false,
  },
});

export const Product = mongoose.model("Product", productSchema);
