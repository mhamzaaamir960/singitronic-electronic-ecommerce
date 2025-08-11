import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String, // upload on cloudinary
  },
});

export const Category = mongoose.model("Category", categorySchema);
