import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCartItemsByUserId,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cart.controllers";

const router = Router();

router
  .route("/:productId")
  .post(addToCart)
  .patch(updateCartQuantity)
  .delete(removeFromCart);
router.route("/").get(getCartItemsByUserId).delete(clearCart);

export default router;
