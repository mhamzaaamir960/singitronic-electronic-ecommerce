import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/").post(createCategory).get(getAllCategories);
router.route("/:categoryId").patch(updateCategory).delete(deleteCategory);

export default router;
