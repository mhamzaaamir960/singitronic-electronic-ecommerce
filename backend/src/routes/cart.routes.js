import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCartItemsByUserId,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getSingleProductQuantity,
  totalCartItems,
} from "../controllers/cart.controllers.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/product/:productId")
  .post(verifyJWT, addToCart)
  .get(verifyJWT, getSingleProductQuantity)
  .delete(verifyJWT, removeFromCart);

router.route("/increment/:productId").patch(verifyJWT, incrementQuantity);
router.route("/decrement/:productId").patch(verifyJWT, decrementQuantity);
router.route("/cart-items").get(verifyJWT, totalCartItems);

router
  .route("/")
  .get(verifyJWT, getCartItemsByUserId)
  .delete(verifyJWT, clearCart);

export default router;
