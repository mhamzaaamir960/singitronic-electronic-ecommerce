import { AiFillStar } from "react-icons/ai";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { FaCheck, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import {
  FaSquareFacebook,
  FaSquarePinterest,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { getSingleProduct } from "../store/slices/productSlice";
import {
  addToCart,
  decreasedQuantity,
  getItemQuantity,
  getTotalCartItems,
  incrementQuantity,
} from "../store/slices/cartSlice";

function SingleProduct() {
  const { productId } = useParams();
  const { product } = useSelector((state: RootState) => state.productsSlice);
  const { itemQuantity } = useSelector((state: RootState) => state.cartSlice);
  const image = product?.productImage as CategoryImage;
  const dispatch = useDispatch<AppDispatch>();

  const [wishlist, setWishlist] = useState(false);

  const handleAddToCart = async () => {
    await dispatch(addToCart(productId as string));
    await dispatch(getItemQuantity(productId as string));
    await dispatch(getTotalCartItems());
  };

  const handleIncrement = async () => {
    await dispatch(incrementQuantity(productId as string));
    await dispatch(getItemQuantity(productId as string));
  };

  const handleDecrement = async () => {
    await dispatch(decreasedQuantity(productId as string));
    await dispatch(getItemQuantity(productId as string));
  };

  useEffect(() => {
    if (productId) {
      dispatch(getSingleProduct(productId as string));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getItemQuantity(productId as string));
  }, [dispatch, productId]);

  return (
    <div className="w-full min-h-[900px] flex justify-center items-center bg-white mt-20">
      <MaxWidthWrapper className="flex justify-center items-center gap-14 ">
        <img
          src={image?.url}
          alt={product?.name}
          width={550}
          className="shadow"
        />
        <div className="flex flex-col gap-y-2 ">
          <div className="flex items-center gap-x-1 text-base">
            <AiFillStar className="text-yellow-500 text-xl" />
            <AiFillStar className="text-yellow-500 text-xl" />
            <AiFillStar className="text-yellow-500 text-xl" />
            <AiFillStar className="text-yellow-500 text-xl" />
            <AiFillStar className="text-yellow-500 text-xl" />
            (3 Reviews)
          </div>
          <h3 className="text-3xl font-medium mt-5 mb-3">{product?.name}</h3>
          <p className="text-lg font-semibold">${product?.price}</p>
          <div className="flex items-center gap-x-2 my-3 text-xl ">
            <p className="font-medium">Avaiability: </p>
            <p className="text-green-400 text-base flex items-center gap-x-2">
              In Stock <FaCheck className="text-green-400 text-sm" />
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <p className="text-xl font-medium">Quantity: </p>
            <div className="flex items-center gap-x-1">
              <button
                disabled={itemQuantity < 2}
                onClick={handleDecrement}
                className="disabled:bg-gray-100 h-8 px-2 cursor-pointer border border-gray-300 hover:bg-gray-50 "
              >
                <LuMinus className="text-xl text-gray-800" />
              </button>
              <input
                type="text"
                disabled
                className="h-8 text-md max-w-[70px] text-gray-800 border border-gray-300 px-1"
                value={itemQuantity}
              />
              <button
                onClick={handleIncrement}
                className="h-8 px-2  cursor-pointer border border-gray-300 hover:bg-gray-50"
              >
                <LuPlus className="text-lg text-gray-800" />
              </button>
            </div>
          </div>
          <div className="flex gap-x-5 my-5">
            <button
              onClick={handleAddToCart}
              className="uppercase text-blue-500 text-lg border border-gray-300 hover:bg-gray-50 px-10 py-1 rounded-lg cursor-pointer"
            >
              Add to Cart
            </button>
            <button className="uppercase text-white text-lg bg-blue-500 hover:bg-blue-500/90 px-12 py-1 rounded-lg cursor-pointer  ">
              Buy Now
            </button>
          </div>
          <div
            onClick={() => setWishlist(!wishlist)}
            className="cursor-pointer select-none flex items-center gap-x-2 "
          >
            {wishlist ? (
              <FaHeart id="wishlist" className="text-red-500" />
            ) : (
              <FaHeart id="wishlist" />
            )}
            <label htmlFor="wishlist" className="uppercase cursor-pointer">
              Add to wishlist
            </label>
          </div>
          <p className="my-1 text-base text-gray-800">SKU: abccd-18</p>
          <div className="flex gap-x-2">
            <p className="text-base text-gray-800">Share: </p>
            <div className="flex items-center gap-x-1 text-2xl">
              <FaSquareFacebook />
              <FaSquareXTwitter />
              <FaSquarePinterest />
            </div>
          </div>
          <div className="flex gap-x-2 mt-2">
            <img
              src="/visa.svg"
              width={50}
              height={50}
              alt="visa icon"
              className="w-auto h-auto"
            />
            <img
              src="/mastercard.svg"
              width={50}
              height={50}
              alt="mastercard icon"
              className="h-auto w-auto"
            />
            <img
              src="/ae.svg"
              width={50}
              height={50}
              alt="americal express icon"
              className="h-auto w-auto"
            />
            <img
              src="/paypal.svg"
              width={50}
              height={50}
              alt="paypal icon"
              className="w-auto h-auto"
            />
            <img
              src="/dinersclub.svg"
              width={50}
              height={50}
              alt="diners club icon"
              className="h-auto w-auto"
            />
            <img
              src="/discover.svg"
              width={50}
              height={50}
              alt="discover icon"
              className="h-auto w-auto"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default SingleProduct;
