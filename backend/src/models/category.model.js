import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  categoryImage: {
    url: { type: String },
    public_id: { type: String }, // upload on cloudinary
  },
});

export const Category = mongoose.model("Category", categorySchema);
