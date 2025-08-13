import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrdersByStatus,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, createOrder)
  .get(verifyJWT, isAdmin, getAllOrders);
router
  .route("/order/:orderId")
  .get(verifyJWT, getOrderById)
  .patch(verifyJWT, isAdmin, updateOrderStatus)
  .delete(verifyJWT, isAdmin, deleteOrder);
router.route("/status").get(verifyJWT, getOrdersByStatus);

export default router;
