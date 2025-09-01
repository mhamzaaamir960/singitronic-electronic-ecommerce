import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

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

  const cartProduct = await Cart.findOne({
    user: userId,
    "items.productId": productId,
  });

  if (cartProduct) {
    throw new ApiError(400, "Product already in cart!");
  }
  const product = await Product.findById(productId);

  await Cart.findOneAndUpdate(
    { user: userId },
    {
      $push: {
        items: {
          productId: productId,
          quantity: 1,
          subtotal: product.price * 1,
        },
      },
      $setOnInsert: { user: userId },
    },
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

  await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { productId: productId } } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Item removed from cart successfully!"));
});
const incrementQuantity = asyncHandler(async (req, res) => {
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

  const cartProduct = await Cart.findOne({
    user: userId,
    "items.productId": productId,
  });

  if (!cartProduct) {
    throw new ApiError(
      404,
      "Please add to cart before then increase quantity!"
    );
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }

  const itemIndex = cartProduct.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  const item = cartProduct.items[itemIndex];
  item.quantity += 1;
  item.subtotal = product.price * item.quantity;
  await cartProduct.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Quantity increased successfully!"));
});
const decrementQuantity = asyncHandler(async (req, res) => {
  // get user id and validate it
  // get productId and validate it
  // find the product in cart and throw error in case not exits in cart
  // find and update the quantity of product
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }

  const cartProduct = await Cart.findOne({
    user: userId,
    "items.productId": productId,
  });

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }

  const itemIndex = cartProduct.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  const item = cartProduct.items[itemIndex];
  if (item.quantity >= 1) {
    item.quantity -= 1;
    item.subtotal = product.price * item.quantity;
    await cartProduct.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Quantity decreased successfully!"));
  } else {
    return res.status(200);
  }
});
const getSingleProductQuantity = asyncHandler(async (req, res) => {
  // get userid and product and validate both
  // get the item quantity
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart is empty!");
  }

  const item = cart.items.find((i) => i.productId.toString() === productId);
  const quantity = item ? item.quantity : 0;

  return res
    .status(200)
    .json(
      new ApiResponse(200, quantity, "Product Quantity fetched successfully!")
    );
});
const clearCart = asyncHandler(async (req, res) => {
  // get user id and validate it
  // check cart and delete cart
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const cartProducts = await Cart.findOne({ user: userId });
  cartProducts.items = [];
  await cartProducts.save();

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

  const cartItems = await Cart.find({ user: userId }).populate(
    "items.productId"
  );
  if (cartItems.length === 0) {
    throw new ApiError(404, "Cart is empty!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cartItems, "Cart items fetched successfully!"));
});
const totalCartItems = asyncHandler(async (req, res) => {
  // get user id and validate
  // find the cart and check exists
  // count the cart items
  //  return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const cart = await Cart.findOne({ user: userId });
  const itemsCount = cart.items.length;

  return res
    .status(200)
    .json(
      new ApiResponse(200, itemsCount, "Items counts fetched successfully!")
    );
});

export {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  getSingleProductQuantity,
  removeFromCart,
  clearCart,
  getCartItemsByUserId,
  totalCartItems,
};
