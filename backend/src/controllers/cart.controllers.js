import { isValidObjectId } from "mongoose";
import { ApiError, ApiResponse, asyncHandler } from "../utils";
import { Cart } from "../models/cart.model";

const addToCart = asyncHandler(async (req, res) => {
  // get user id and validate it
  // product id and validate it
  // check product exists
  // using mongodb operation ($addToSet)
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }

  await Cart.findOneAndUpdate(
    { user: userId, "items.product": { $ne: productId } },
    { $push: { items: { product: productId, quantity: 1 } } },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product added in cart successfully!"));
});
const removeFromCart = asyncHandler(async (req, res) => {
  // get userid and validate it
  // get productId and validate it
  // find and update delete from from cart
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { product: productId } } },
    { new: true }
  );

  if (updatedCart && updatedCart.items.length === 0) {
    await updatedCart.deleteOne({ _id: updatedCart._id });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Item is removed from cart successfully!"));
});
const updateCartQuantity = asyncHandler(async (req, res) => {
  // get usedId and validate it
  // get productid and validate it
  // get quantity from frontend
  // find and update the quantity
  // get quantity form forntend and update it
  // if quanttiy < 1 remove item from cart
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }

  const { itemQuantity } = req.body;
  if (typeof itemQuantity !== "number") {
    throw new ApiError(400, "Quantity number is required!");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart is empty!");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex === -1) {
    throw new ApiError(404, "Item not found in cart!");
  }

  cart.items[itemIndex].quantity += itemQuantity;
  if (cart.items[itemIndex].quantity < 1) {
    cart.items.splice(itemIndex, 1);
  }
  await cart.save();
});
const clearCart = asyncHandler(async (req, res) => {
  // get user id and validate it
  // check cart and delete cart
  // return a response

  const userId = req.user_id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  await Cart.findOneAndDelete({ user: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Cart is cleared successfully!"));
});
const getCartItemsByUserId = asyncHandler(async (req, res) => {
  // get user id and validate it
  // find cart and return
  // check cart is not empty
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const cartItems = await Cart.find({ user: userId }).populate("items");
  if (cartItems.length === 0) {
    throw new ApiError(404, "Cart is empty!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cartItems, "Cart items fetched successfully!"));
});

export {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  getCartItemsByUserId,
};
