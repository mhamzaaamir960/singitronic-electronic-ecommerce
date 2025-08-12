import { Router } from "express";
import {
  addProductInWishlist,
  getAllWishlistProductsByUserId,
  removeProductFromWishlist,
} from "../controllers/wishlist.controller";

const router = Router();

router
  .route("/:productId")
  .post(addProductInWishlist)
  .delete(removeProductFromWishlist);
router.route("/").get(getAllWishlistProductsByUserId);

export default router;
