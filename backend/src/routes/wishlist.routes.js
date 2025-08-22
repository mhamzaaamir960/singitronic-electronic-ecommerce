import { Router } from "express";
import {
  addProductInWishlist,
  checkItemInWishlist,
  getAllWishlistProductsByUserId,
  removeProductFromWishlist,
  toggleProductWishlist,
} from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/:productId")
  .post(verifyJWT, toggleProductWishlist)
  .delete(verifyJWT, removeProductFromWishlist)
  .get(verifyJWT, checkItemInWishlist);
router.route("/").get(verifyJWT, getAllWishlistProductsByUserId);

export default router;
