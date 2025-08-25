import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";

const createOrder = asyncHandler(async (req, res) => {
  // get userid and validate it
  // get data from frontend
  // check required data is not empty
  // create the order
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    items,
    totalAmount,
    shippingAddress,
    paymentStatus,
    status,
  } = req.body;
  const {street, city, country, zip} = shippingAddress
  if (items.length === 0) {
    throw new ApiError(400, "Items are required!");
  }
  if (
    [firstName, emailAddress, phoneNumber,street, city, country, zip ].some((item) => item.trim() === "")
  ) {
    throw new ApiError(400, "Aistarick fields are required!");
  }

  if (typeof totalAmount !== "number") {
    throw new ApiError(400, "Total amount in numbers are required!");
  }

  const newOrder = await Order.create({
    user: userId,
    items: items,
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    phoneNumber: phoneNumber,
    paymentStatus: paymentStatus,
    status: status,
    totalAmount: totalAmount,
    shippingAddress: shippingAddress,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newOrder, "Order placed successfully!"));
});
const deleteOrder = asyncHandler(async (req, res) => {
  // get order id and validate it
  // find and delete order
  // return a response

  const { orderId } = req.params;
  if (!isValidObjectId(orderId)) {
    throw new ApiError(401, "Invalid Order Id!");
  }
  await Order.findByIdAndDelete(orderId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order deleted successfully!"));
});
const getOrderById = asyncHandler(async (req, res) => {
  // get orderid and validate it
  // find the order and check order exists
  // return a response

  const { orderId } = req.params;
  if (!isValidObjectId(orderId)) {
    throw new ApiError(401, "Invalid Order Id!");
  }

  const order = await Order.findById(orderId).populate("items");
  if (!order) {
    throw new ApiError(404, "Order not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully!"));
});
const getUserOrders = asyncHandler(async (req, res) => {
  // get user id and validate it
  // find user order and check order exits
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const orders = await Order.find({ user: userId }).populate("items");
  if (orders.length === 0) {
    throw new ApiError(404, "Orders not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "User orders feteched successfully!"));
});
const getAllOrders = asyncHandler(async (req, res) => {
  // get All order and check orders exist
  // return a response

  const allOrders = await Order.find().populate("items");
  if (allOrders.length === 0) {
    throw new ApiError(404, "Orders not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allOrders, "All orders fetched successfully!"));
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  // get orderId and status from frontend
  // check fields are not empty
  // find order and update it
  // return a response

  const { orderId, status } = req.body;
  if (!isValidObjectId(orderId)) {
    throw new ApiError(401, "Invalid Order Id!");
  }

  if (!status) {
    throw new ApiError(400, "Status is required!");
  }

  await Order.findByIdAndUpdate(
    orderId,
    {
      $set: { status: status },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order status updated successfully!"));
});
const getOrdersByStatus = asyncHandler(async (req, res) => {
  // get status from frontend and check field is not empty
  // match the status using aggregation pieplines
  // return a response

  const { q } = req.query;
  if (!q) {
    throw new ApiError(400, "Query parameter is required!");
  }

  const orders = await Order.aggregate([{ $match: { status: q } }]);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully!"));
});

export {
  createOrder,
  deleteOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrdersByStatus,
};
