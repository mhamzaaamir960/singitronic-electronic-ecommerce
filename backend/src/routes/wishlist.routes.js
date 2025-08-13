import { Router } from "express";
import {
  addProductInWishlist,
  getAllWishlistProductsByUserId,
  removeProductFromWishlist,
} from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/:productId")
  .post(verifyJWT, addProductInWishlist)
  .delete(verifyJWT, removeProductFromWishlist);
router.route("/").get(verifyJWT, getAllWishlistProductsByUserId);

export default router;
