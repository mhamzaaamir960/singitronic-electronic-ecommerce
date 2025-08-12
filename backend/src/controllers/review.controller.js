import { Review } from "../models/review.model";
import { ApiError, ApiResponse, asyncHandler } from "../utils";
import { isValidObjectId } from "mongoose";

const createReview = asyncHandler(async (req, res) => {
  // user id and validate it
  // get rating and comment frontend
  // check required data is not empty
  // create review
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const { rating, comment } = req.body;
  if (typeof rating !== "number") {
    throw new ApiError(400, "Rating number is required!");
  }

  const newReview = await Review.create({
    user: userId,
    rating: rating,
    comment: comment || "",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newReview, "Review posted successfully!"));
});
const updateReview = asyncHandler(async (req, res) => {
  // get review and validate it
  // check review is existed if not throws error
  // update the review
  // return a response

  const { reviewId } = req.params;
  if (!isValidObjectId(reviewId)) {
    throw new ApiError(401, "Invalid Review Id!");
  }

  const { rating, comment } = req.body;
  if (typeof rating !== "number") {
    throw new ApiError(400, "Rating number is required!");
  }

  await Review.findByIdAndUpdate(
    reviewId,
    { $set: { rating: rating, comment: comment } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Review updated successfully!"));
});
const deleteReview = asyncHandler(async (req, res) => {
  // get review id and validate it
  // find and delete review
  // return a response

  const { reviewId } = req.params;
  if (!isValidObjectId(reviewId)) {
    throw new ApiError(401, "Invalid Review Id!");
  }

  await Review.findByIdAndDelete(reviewId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Review deleted successfully!"));
});
const getUserReviewsById = asyncHandler(async (req, res) => {
  // get user id and validate it
  // find the user reviews if not thorws error
  // return a response

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const userReviews = await Review.find({ user: userId });
  if (userReviews.length === 0) {
    throw new ApiError(404, "Not found user reviews!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userReviews,
        "All user reviews fetched successfully!"
      )
    );
});
const getAllReviews = asyncHandler(async (req, res) => {
  // get all reviews
  // check reviews exist
  // return a response

  const allReviews = await Review.find();
  if (allReviews.length === 0) {
    throw new ApiError(404, "Reviews not found!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, allReviews, "All reviews fetched successfully!")
    );
});

export {
  createReview,
  updateReview,
  deleteReview,
  getUserReviewsById,
  getAllReviews,
};
