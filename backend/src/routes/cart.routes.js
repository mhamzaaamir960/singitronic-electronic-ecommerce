import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCartItemsByUserId,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cart.controllers.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/:productId")
  .post(verifyJWT, addToCart)
  .patch(verifyJWT, updateCartQuantity)
  .delete(verifyJWT, removeFromCart);
router
  .route("/")
  .get(verifyJWT, getCartItemsByUserId)
  .delete(verifyJWT, clearCart);

export default router;
