import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  uploadOnCloudinary,
  removeImageFromCloudinary,
} from "../utils/cloudinary.js";
import { Category } from "../models/category.model.js";
import { isValidObjectId } from "mongoose";

const createCategory = asyncHandler(async (req, res) => {
  // get data from frontend
  // check required data is not empty
  // check category image comes from frontend
  // image upload on cloudinary
  // create category
  // return a response

  const { name, description } = req.body;
  if (!name) {
    throw new ApiError(400, "Category name is required!");
  }

  const imageLocalPath = req.file?.path;
  let categoryImage;
  if (imageLocalPath) {
    categoryImage = await uploadOnCloudinary(imageLocalPath);
  }
  const newCategory = await Category.create({
    name: name,
    description: description,
    categoryImage: {
      url: categoryImage.url || "",
      public_id: categoryImage.public_id || "",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(201, newCategory, "New Category created successfully!")
    );
});

const updateCategory = asyncHandler(async (req, res) => {
  // get categoryid
  // check id is valid
  // find category
  // if category exits update it
  // return a response

  const { categoryId } = req.params;
  if (!isValidObjectId(categoryId)) {
    throw new ApiError(401, "Invalid Category ID!");
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found!");
  }

  const { name, description } = req.body;
  if (!name) {
    throw new ApiError(400, "Category name is required!");
  }

  const imageLocalPath = req.files?.categoryImage[0]?.path;

  if (imageLocalPath) {
    if (category.categoryImage.public_id) {
      await removeImageFromCloudinary(category.categoryImage.public_id);
    }
    let categoryImage = await uploadOnCloudinary(imageLocalPath);
    category.categoryImage.url = categoryImage.url;
    category.categoryImage.public_id = categoryImage.public_id;
  }

  category.name = name;
  category.description = description;
  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Category update successfully!"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  // get categoryid
  // validate id
  // find and deletectegory

  const { categoryId } = req.params;
  if (!isValidObjectId(categoryId)) {
    throw new ApiError(401, "Invalid category id!");
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found!");
  }
  if (category.categoryImage.public_id) {
    await removeImageFromCloudinary(category.categoryImage.public_id);
  }

  await Category.findByIdAndDelete(categoryId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Category deleted successfully!"));
});

const getAllCategories = asyncHandler(async (req, res) => {
  // get all categories
  // return a response

  const categories = await Category.find();
  if (!categories) {
    throw new ApiError(404, "Categories not found!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, categories, "All categories fetched successfully!")
    );
});

export { createCategory, updateCategory, deleteCategory, getAllCategories };
