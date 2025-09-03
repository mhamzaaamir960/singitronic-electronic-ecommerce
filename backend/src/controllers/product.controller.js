import { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  uploadOnCloudinary,
  removeImageFromCloudinary,
} from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  // get data from frontend
  // check required data is not empty
  // check product image if not return error
  // product image upload on cloudinary
  // create a new prodcut
  // return a response

  const {
    name,
    description,
    price,
    rating,
    slug,
    manufacturer,
    categoryId,
    inStock = false,
  } = req.body;

  if (
    [name, description, price, rating, slug, manufacturer, categoryId].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  if (!isValidObjectId(categoryId)) {
    throw new ApiError(401, "Invalid category id!");
  }

  const imageLocalPath = req.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Product image is required!");
  }
  const productImage = await uploadOnCloudinary(imageLocalPath);

  const newProduct = await Product.create({
    name: name,
    description: description,
    price: Number(price),
    rating: Number(rating),
    slug: slug,
    manufacturer: manufacturer,
    categoryId: categoryId,
    inStock: inStock,
    productImage: {
      url: productImage.url || "",
      public_id: productImage.public_id || "",
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newProduct, "New Product added successfully!"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError("Invalid Product Id!");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }

  const {
    name,
    description,
    price,
    rating,
    slug,
    manufacturer,
    categoryId,
    inStock,
  } = req.body;

  if (
    [name, description, price, rating, slug, manufacturer, categoryId].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  if (!isValidObjectId(categoryId)) {
    throw new ApiError(401, "Invalid category id!");
  }
  const imageLocalPath = await req.files?.productImage[0]?.path;
  let productImage;
  if (!imageLocalPath) {
    throw new ApiError(400, "Product image is required!");
  } else {
    productImage = await uploadOnCloudinary(imageLocalPath);
  }

  const updateProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        name: name,
        description: description,
        price: price,
        rating: rating,
        slug: slug,
        manufacturer: manufacturer,
        categoryId: categoryId,
        inStock: inStock,
        productImage: {
          url: productImage.url || "",
          public_id: productImage.public_id || "",
        },
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updateProduct, "Product updated successfully!"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  // get product id from params
  // validate prodcut id
  // remove product image from cloudinary
  // remove product from db
  // return a response

  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }

  if (product.productImage.public_id) {
    await removeImageFromCloudinary(product.productImage.public_id);
  }

  await Product.findByIdAndDelete(productId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully!"));
});

const getProduct = asyncHandler(async (req, res) => {
  // get product id and validate it
  // find product
  // return a response

  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(401, "Invalid Product Id!");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully!"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  // get all products
  // return a response
  const products = await Product.find().populate("categoryId");
  if (products.length < 1) {
    throw new ApiError(404, "Products not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "All Products fetched successfully!"));
});
const serachProducts = asyncHandler(async (req, res) => {
  // get all products
  // return a response
  const query = req.query;
  let products = await Product.find().populate("categoryId");
  if (query.search) {
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.search.toLowerCase()) ||
        product.description.toLowerCase().includes(query.search.toLowerCase())
    );
  }

  if (products.length < 1) {
    throw new ApiError(404, "Products not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "All Products fetched successfully!"));
});
const getQueryProducts = asyncHandler(async (req, res) => {
  // get query from frontend
  // get all products before checking condition and sort if not default
  // return a response

  const query = req.query;
  console.log(req.url);
  const { page, limit } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  let sortType;
  if (query.sort === "a-z") {
    sortType = { name: 1 };
  } else if (query.sort === "z-a") {
    sortType = { name: -1 };
  } else if (query.sort === "low-to-high") {
    sortType = { price: 1 };
  } else if (query.sort === "high-to-low") {
    sortType = { price: -1 };
  }

  let products = await Product.find()
    .populate("categoryId")
    .sort(sortType)
    .skip(skip)
    .limit(parseInt(limit));
  let filteredProducts;

  if (query.inStock === "true" && query.outStock === "true") {
    filteredProducts = products.filter(
      (product) =>
        product.rating <= query.rating && product.price <= query.price
    );
  } else if (query.inStock === "true" && query.outStock === "false") {
    filteredProducts = products.filter(
      (product) =>
        product.inStock === true &&
        product.rating <= query.rating &&
        product.price <= query.price
    );
  } else if (query.inStock === "false" && query.outStock === "true") {
    filteredProducts = products.filter(
      (product) =>
        product.inStock === false &&
        product.rating <= query.rating &&
        product.price <= query.price
    );
  } else {
    filteredProducts = [];
  }

  if (query.category && query.category !== "null") {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.categoryId.name.toLowerCase() === query.category.toLowerCase()
    )
  }

  if (filteredProducts.length < 1) {
    throw new ApiError(404, "Products not found!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        filteredProducts,
        "All Products fetched successfully!"
      )
    );
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  getQueryProducts,
  serachProducts,
};
