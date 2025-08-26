import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getQueryProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, isAdmin, upload.single("productImage"), addProduct)
  .get(getAllProducts);
router
  .route("/product/:productId")
  .get(getProduct)
  .patch(verifyJWT, isAdmin, updateProduct)
  .delete(verifyJWT, isAdmin, deleteProduct);
router.route("/query-products").get(getQueryProducts);

export default router;
