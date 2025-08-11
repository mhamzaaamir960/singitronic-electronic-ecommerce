import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected successfully! Host: ${response.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed!!! Error: ${error.message}`);
    process.exit(1);
  }
};
