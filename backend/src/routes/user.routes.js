import { Router } from "express";
import {
  getAllUsers,
  getUser,
  login,
  logout,
  register,
  updatePassword,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/change-password").put(updatePassword);
router.route("/user").get(getUser);
router.route("/").get(getAllUsers);

export default router;
