import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import axios from "axios";

const generateAccessAndRefreshTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens!"
    );
  }
};

const register = asyncHandler(async (req, res) => {
  // get data from frontend
  // check fields are not empty
  // check user already exists(email)
  // check image is existed
  // upload on cloudinary
  // create field in the database
  // remove password from response
  // return a response

  const { fullName, emailAddress, password } = req.body;
  if ([fullName, emailAddress, password].some((field) => field.trim() === "")) {
    throw new ApiError(
      400,
      "FullName, Email address and password is required!"
    );
  }

  const existedUser = await User.findOne({ emailAddress });
  if (existedUser) {
    throw new ApiError(409, "User already exists!");
  }

  const imageLocalPath = req.files?.profileImage[0]?.path;
  let profileImage;
  if (imageLocalPath) {
    profileImage = await uploadOnCloudinary(imageLocalPath);
  }

  const newUser = await User.create({
    fullName: fullName,
    emailAddress: emailAddress,
    password: password,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, newUser, "New user registered successfully!"));
});

const googleLogin = asyncHandler(async (req, res) => {
  const { code } = req.query;

  const sendData = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  };
  const { data } = await axios.post(process.env.TOKEN_URL, sendData);

  const { access_token, id_token } = data;
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const profile = await response.json();
  const user = await User.findOne({ emailAddress: profile.email });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 24 * 60 * 60 * 1000,
  };

  if (!user) {
    const newUser = await User.create({
      fullName: profile.name,
      emailAddress: profile.email,
      password: profile.id,
      googleId: profile.id,
      authProvider: "google",
      profileImage: {
        url: profile.picture,
        public_id: "",
      },
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      newUser
    );
    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .redirect("https://singitronic-electronics.vercel.app");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user
  );

  if (user.authProvider === "") {
    res.redirect("https://singitronic-electronics.vercel.app");
  }

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .redirect("https://singitronic-electronics.vercel.app");
});

const login = asyncHandler(async (req, res) => {
  // get credentianls form frontend
  // check not empty
  // check user exits or not
  // check passsword is correct
  // generate access and refresh tokens
  // store cookies and return response

  const { emailAddress, password } = req.body;
  if (!emailAddress || !password) {
    throw new ApiError(400, "All fields are required!");
  }

  const user = await User.findOne({ emailAddress: emailAddress });
  if (!user) {
    throw new ApiError(404, "User not found!");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully!"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  // save undefined in refresh token field
  // remove the token from cookeis

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully!"));
});

const getUser = asyncHandler(async (req, res) => {
  // get user id
  // find user if not throw error
  // return a response

  const userId = req.user?._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Un-authorized request!");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, user, "User fetched successfully!"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  // get all users
  // return a response

  const users = await User.find();
  if (!users) {
    throw new ApiError(404, "Users not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, users, "All users fetched successfully!"));
});

const updatePassword = asyncHandler(async (req, res) => {
  // get old password
  // get user id and check id is correct
  // find user
  // compare both passwords
  // update password
  // return a response
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All fields are required!");
  }

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Un-authorized request!");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Old password is incorrect!");
  }

  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        password: newPassword,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully!"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  // get user id and validate it
  // get data from frontend and validate neccessary data

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User Id!");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const { fullName, phoneNumber, street, city, country, zipCode } = req.body;

  if (!fullName) {
    throw new ApiError(400, "Name is required!");
  }

  const imagePath = req.file?.path;
  let profileImage;
  if (imagePath) {
    profileImage = await uploadOnCloudinary(imagePath);
  } else {
    profileImage = "";
  }

  const updatedUser = await user.updateOne({
    $set: {
      fullName: fullName,
      phoneNumber: phoneNumber,
      address: { street, city, country, zip: zipCode },
      profileImage: profileImage,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User Details updated successfully!")
    );
});

export {
  register,
  login,
  logout,
  getUser,
  getAllUsers,
  updatePassword,
  updateUserDetails,
  googleLogin,
};
