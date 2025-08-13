import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken || "";
    if (!token) {
      throw new ApiError(401, "Un-authorized Request!");
    }

    const decodedToken = await jwt.decode(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token!");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token!");
  }
};

const isAdmin = (req, res, next) => {
  // get user role
  // compare
  // throws error

  try {
    if (!req.user) {
      throw new ApiError(401, "Un-authorized request!");
    }
    if (req.user.role !== "admin") {
      throw new ApiError(403, "User has no admin access!");
    }
    next();
  } catch (error) {
    throw new ApiError(400, error?.message || "Access denied!");
  }
};

export { verifyJWT, isAdmin };
