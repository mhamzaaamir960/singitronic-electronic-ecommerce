import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getAllUsers,
  getUser,
  googleLogin,
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
router
  .route("/update-user")
  .patch(verifyJWT, upload.single("profileImage"), updateUserDetails);
router.route("/auth/google").get((req, res) => {
  console.log("omer")
  const url = `${process.env.AUTH_URI}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});
router.route("/auth/google/callback").get(googleLogin);
export default router;``
