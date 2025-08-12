import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getUserReviewsById,
  updateReview,
} from "../controllers/review.controller";

const router = Router();

router.route("/user").get(getUserReviewsById);
router.route("/").post(createReview).get(getAllReviews);
router.route("/:reviewId").patch(updateReview).delete(deleteReview);

export default router;
