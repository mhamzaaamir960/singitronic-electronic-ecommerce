import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getUserReviewsById,
  updateReview,
} from "../controllers/review.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/user").get(verifyJWT, getUserReviewsById);
router.route("/").post(verifyJWT, createReview).get(getAllReviews);
router
  .route("/:reviewId")
  .patch(verifyJWT, updateReview)
  .delete(verifyJWT, deleteReview);

export default router;
