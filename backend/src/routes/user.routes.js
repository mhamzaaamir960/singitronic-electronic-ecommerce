import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {
  getAllUsers,
  getUser,
  login,
  logout,
  register,
  updatePassword,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/change-password").put(verifyJWT, updatePassword);
router.route("/user").get(verifyJWT, getUser);
router.route("/").get(verifyJWT, isAdmin, getAllUsers);
router.route("/update-user").patch(verifyJWT,upload.single("profileImage"), updateUserDetails);
export default router;
