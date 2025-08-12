import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  cartRouter,
  categoryRouter,
  orderRouter,
  productRouter,
  reviewRouter,
  userRouter,
  wishlistRouter,
} from "./routes";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
