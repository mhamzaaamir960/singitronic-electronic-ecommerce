import { isValidObjectId } from "mongoose";
import { ApiError, ApiResponse, asyncHandler } from "../utils";
import { Wishlist } from "../models/wishlist.model";

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
  if (!wishlist) {
    await Wishlist.create({
      user: userId,
      products: [productId],
    });
  } else {
    if (wishlist.products.includes(productId)) {
      throw new ApiError(400, "Product already included in wishlist!");
    }

    wishlist.products.push(productId);
  }

  await wishlist.save();

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
    throw new ApiError(404, "Product not found!");
  }

//   const wishlist = await Wishlist.findOne({user: userId})
});
