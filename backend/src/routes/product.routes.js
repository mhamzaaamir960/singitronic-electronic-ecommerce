import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.route("/").post(addProduct).get(getAllProducts);
router
  .route("/:productId")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
