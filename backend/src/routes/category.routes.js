import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, isAdmin, createCategory)
  .get(getAllCategories);
router
  .route("/:categoryId")
  .patch(verifyJWT, isAdmin, updateCategory)
  .delete(verifyJWT, isAdmin, deleteCategory);

export default router;
