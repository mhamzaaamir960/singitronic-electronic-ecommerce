import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Wishlist } from "../models/wishlist.model.js";

const addProductInWishlist = asyncHandler(async (req, res) => {
  // get user id and validate it
  // get product id and validate it
  // add product in wishlist
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }
  const wishlist = await Wishlist.findOne({ user: userId });

  // first way to add item in wishlist using mongodb operations
  await wishlist.updateOne(
    { user: userId },
    { $addToSet: { products: productId } },
    { new: true, upsert: true }
  );

  // second way to add item in wishlist
  // if (!wishlist) {
  //   await Wishlist.create({
  //     user: userId,
  //     products: [productId],
  //   });
  // } else {
  //   if (wishlist.products.includes(productId)) {
  //     throw new ApiError(400, "Product already included in wishlist!");
  //   }
  //   wishlist.products.push(productId);
  // }
  // await wishlist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product added in wishlist successfully!"));
});

const removeProductFromWishlist = asyncHandler(async (req, res) => {
  // user id and validate it
  // product id and validate it
  // find and remove product from wishlist

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid product Id!");
  }
  const wishlist = await Wishlist.findOne({ user: userId });

  // first way to remove item using mongodb operators
  // const result = await wishlist.updateOne(
  //   { user: userId },
  //   { $pull: { products: productId } },
  //   { new: true }
  // );

  // if (!result) {
  //   throw new ApiError(404, "Product not found in wishlist!");
  // }

  // second way to remove item fetch and then remove get index and splice
  const productIndex = wishlist.products.indexOf(productId);
  if (productIndex === -1) {
    throw new ApiError(404, "Product not found in wishlist!");
  }
  wishlist.products.splice(productIndex, 1);
  await wishlist.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "Product removed from wishlist successfully!")
    );
});

const toggleProductWishlist = asyncHandler(async (req, res) => {
  // get user id and validate it
  // get product id and validate it
  // check product already exists other wise add in wishlist
  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }
  const wishlist = await Wishlist.findOne({ user: userId });
  let message;
  if (!wishlist) {
    await Wishlist.create({
      user: userId,
      products: [productId],
    });
    message = "Item added in wishlist successfully!";
  } else {
    const itemIndex = wishlist.products.findIndex(
      (item) => item._id.toString() === productId
    );
    if (itemIndex === -1) {
      wishlist.products.push(productId);
      message = "Item added in wishlist successfully!";
    } else {
      wishlist.products.splice(itemIndex, 1);
      message = "Item removed from wishlist successfully!";
    }
    await wishlist.save();
  }
  return res.status(200).json(new ApiResponse(200, {}, message));
});

const getAllWishlistProductsByUserId = asyncHandler(async (req, res) => {
  // userid and validate it
  // find user wishlist and check wishlist is not empty
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const wishlist = await Wishlist.findOne({ user: userId }).populate(
    "products"
  );
  if (!wishlist || wishlist.products.length < 1) {
    throw new ApiError(404, "Wishlist is empty!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        wishlist.products,
        "All wishlist products fetched successfully!"
      )
    );
});

const checkItemInWishlist = asyncHandler(async (req, res) => {
  // get userid and validate it
  // get product id and validate
  // find the product id
  // return a response
  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }

  const wishlist = await Wishlist.findOne({ user: userId });
  const isItemInWishlist = wishlist.products.some(
    (item) => item._id.toString() === productId
  )
    ? true
    : false;

  return res
    .status(200)
    .json(new ApiResponse(200, isItemInWishlist, "Item checked successfully!"));
});

export {
  addProductInWishlist,
  removeProductFromWishlist,
  toggleProductWishlist,
  getAllWishlistProductsByUserId,
  checkItemInWishlist,
};
