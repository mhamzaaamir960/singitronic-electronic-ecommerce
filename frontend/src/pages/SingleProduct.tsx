import { AiFillStar } from "react-icons/ai";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { FaCheck, FaHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";
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
import {
  checkItemInWishlist,
  fetchWishlist,
  toogleItemWishlit,
} from "../store/slices/wishlistSlice";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

function SingleProduct() {
  const { productId } = useParams();
  const { product, loading } = useSelector(
    (state: RootState) => state.productsSlice
  );
  const { itemQuantity } = useSelector((state: RootState) => state.cartSlice);
  const { isItemInWishlist } = useSelector(
    (state: RootState) => state.wishlistSlice
  );
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authSlice
  );

  const image = product?.productImage as CategoryImage;
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Login your account before purschasing!");
    } else {
      await dispatch(addToCart(productId as string));
      await dispatch(getItemQuantity(productId as string));
      await dispatch(getTotalCartItems());
    }
  };

  const handleIncrement = async () => {
    if (!isAuthenticated) {
      toast.error("Login your account before purschasing!");
    } else {
      await dispatch(incrementQuantity(productId as string));
      await dispatch(getItemQuantity(productId as string));
    }
  };

  const handleDecrement = async () => {
    if (!isAuthenticated) {
      toast.error("Login your account before purschasing!");
    } else {
      await dispatch(decreasedQuantity(productId as string));
      await dispatch(getItemQuantity(productId as string));
    }
  };

  const handleWishlistClick = async () => {
     if (!isAuthenticated) {
      toast.error("Login your account before purschasing!");
    } else {
    await dispatch(toogleItemWishlit(productId as string));
    await dispatch(fetchWishlist());
    await dispatch(checkItemInWishlist(productId as string));
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(getSingleProduct(productId as string));
      dispatch(getItemQuantity(productId as string));
      dispatch(fetchWishlist());
      dispatch(checkItemInWishlist(productId as string));
    }
  }, [dispatch, productId]);

  return (
    <div className="w-full min-w-[300px] min-h-[700px] lg:min-h-[800px] flex justify-center items-center bg-white  mt-24">
      <MaxWidthWrapper className="flex flex-col md:flex-row justify-center items-center gap-10 xl:gap-14 py-20 md:py-0 ">
        {image ? (
          <img
            src={image?.url}
            alt={product?.name}
            className="shadow w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[500px] xl:h-[500px] xl:w-[550px] xl:h-[550px]"
          />
        ) : (
          <Skeleton className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[500px] xl:h-[500px] xl:w-[550px] xl:h-[550px] bg-gray-200" />
        )}
        <div className="flex flex-col items-center md:items-start gap-y-1 xl:gap-y-2 ">
          <div className="flex items-center gap-x-1 text-base">
            <AiFillStar className="text-yellow-500 text-xl" />
            <AiFillStar className="text-yellow-500 text-xl" />
            <AiFillStar className="text-yellow-500 text-xl" />
            <AiFillStar className="text-yellow-500 text-xl" />
            <AiFillStar className="text-yellow-500 text-xl" />
            (3 Reviews)
          </div>
          {product?.name ? (
            <h3 className="text-3xl font-medium mt-3 xl:mt-5 mb-2 xl:mb-3">
              {product.name}
            </h3>
          ) : (
            <Skeleton className="w-[200px] h-8 bg-gray-200" />
          )}
          {product?.price ? (
            <p className="text-lg font-semibold">Rs.{product?.price}</p>
          ) : (
            <Skeleton className="w-[200px] h-8 bg-gray-200" />
          )}
          <div className="flex items-center gap-x-2 my-2 xl:my-3 text-xl ">
            <p className="font-medium">Avaiability: </p>
            {loading ? (
              <Skeleton className="w-[170px] h-8 bg-gray-200" />
            ) : product?.inStock ? (
              <p className="text-green-400 text-base flex items-center gap-x-2">
                In Stock <FaCheck className="text-green-400 text-lg" />
              </p>
            ) : (
              <p className="text-red-400 text-base flex items-center gap-x-2">
                Out Of Stock <RxCross2 className="text-red-400 text-lg" />
              </p>
            )}
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
              className="uppercase text-blue-500 text-base lg:text-lg border border-gray-300 hover:bg-gray-50 px-3 lg:px-5 xl:px-10 py-1 rounded-lg cursor-pointer"
            >
              Add to Cart
            </button>
            <button className="uppercase text-white text-base lg:text-lg bg-blue-500 hover:bg-blue-500/90 px-5 lg:px-7 xl:px-12 py-1 rounded-lg cursor-pointer  ">
              Buy Now
            </button>
          </div>
          <div
            onClick={handleWishlistClick}
            className="cursor-pointer select-none flex items-center gap-x-2 "
          >
            {isItemInWishlist ? (
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
