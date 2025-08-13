import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrdersByStatus,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/").post(createOrder).get(getAllOrders);
router
  .route("/order/:orderId")
  .get(getOrderById)
  .patch(updateOrderStatus)
  .delete(deleteOrder);
router.route('/status').get(getOrdersByStatus)


export default router;
