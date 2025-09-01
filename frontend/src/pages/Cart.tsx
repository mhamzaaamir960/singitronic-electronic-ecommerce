import { useEffect } from "react";
import { HeadingSection } from "../components";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { LuMinus, LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  decreasedQuantity,
  fetchCartItems,
  getItemQuantity,
  getTotalCartItems,
  incrementQuantity,
  removeFromCart,
} from "../store/slices/cartSlice";
import { Skeleton } from "@/components/ui/skeleton";

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalPrice, loading } = useSelector(
    (state: RootState) => state.cartSlice
  );
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authSlice
  );

  const handleRemoveItem = async (productId: string) => {
    await dispatch(removeFromCart(productId as string));
    await dispatch(fetchCartItems());
    await dispatch(getTotalCartItems());
  };

  const handleIncrement = async (productId: string) => {
    await dispatch(incrementQuantity(productId as string));
    await dispatch(getItemQuantity(productId as string));
    await dispatch(fetchCartItems());
  };

  const handleDecrement = async (productId: string) => {
    await dispatch(decreasedQuantity(productId as string));
    await dispatch(getItemQuantity(productId as string));
    await dispatch(fetchCartItems());
  };

  useEffect(() => {
    dispatch(fetchCartItems());
    dispatch(getTotalCartItems());
  }, [dispatch]);

  return (
    <>
      <HeadingSection pageName="Cart">
        <h3>Cart</h3>
      </HeadingSection>
      <div className="w-full min-w-[300px] min-h-[700px] flex justify-center bg-white">
        <MaxWidthWrapper className="max-w-[1300px] flex flex-col  gap-y-10 p-5 sm:p-10">
          {isAuthenticated ? (
            loading || (items && items.length) ? (
              <>
                <h4 className="w-full text-center md:text-start text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-semibold self-start mt-5 text-center">
                  Shopping Cart
                </h4>
                <div className="flex flex-col md:flex-row justify-between gap-10">
                  <div
                    className={`w-full flex flex-col ${
                      items && items.length > 0 ? "gap-0" : "gap-5"
                    }`}
                  >
                    {loading
                      ? Array.from({ length: 3 }, (_, index: number) => (
                          <div key={index} className="flex flex-col gap-y-3">
                            <Skeleton className="md:max-w-[600px] h-[200px] w-full rounded bg-blue-100" />
                          </div>
                        ))
                      : items.map(
                          (item: { productId: Product; quantity: number }) => {
                            const image = item.productId
                              .productImage as CategoryImage;
                            return (
                              <div
                                key={item.productId._id}
                                className="relative  md:max-w-[600px] h-[200px] w-full flex gap-x-5 border-y border-gray-300 py-6"
                              >
                                <img
                                  src={image.url}
                                  alt={item.productId.name}
                                  width={150}
                                  className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] object-fill inline-block"
                                />
                                <div className="w-full flex flex-col justify-between">
                                  <div className="w-full flex flex-col lg:flex-row justify-start gap-3 lg:gap-x-20">
                                    <div>
                                      <h6 className="text-lg font-semibold text-gray-800">
                                        {item.productId.name}
                                      </h6>
                                      <p className="text-base mt-2">
                                        Rs.{item.productId.price}
                                      </p>
                                    </div>
                                    <div className="w-fit h-8 flex items-center gap-x-1 border border-gray-300">
                                      <button
                                        disabled={item.quantity < 2}
                                        onClick={() =>
                                          handleDecrement(
                                            item.productId._id as string
                                          )
                                        }
                                        className="px-1 xl:px-2 cursor-pointer"
                                      >
                                        <LuMinus className="text-xl text-gray-800" />
                                      </button>
                                      <input
                                        type="text"
                                        disabled
                                        className="text-md text-center max-w-[50px] text-gray-800 px-1"
                                        value={item.quantity}
                                      />
                                      <button
                                        onClick={() =>
                                          handleIncrement(
                                            item.productId._id as string
                                          )
                                        }
                                        className="px-1 xl:px-2 cursor-pointer  hover:bg-gray-50"
                                      >
                                        <LuPlus className="text-lg text-gray-800" />
                                      </button>
                                    </div>
                                    <button
                                      onClick={() =>
                                        handleRemoveItem(
                                          item.productId._id as string
                                        )
                                      }
                                      className="absolute right-3 top-3 cursor-pointer h-fit"
                                    >
                                      <RxCross2 className="text-xl text-gray-500 hover:text-gray-600" />
                                    </button>
                                  </div>
                                  <div className="text-lg flex items-center gap-x-2 ">
                                    <FaCheck className="text-green-400 text-lg" />
                                    <p>In Stock</p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                  </div>
                  {items && items.length > 0 && (
                    <div className="w-full ms:max-w-[350px] lg:max-w-[400px] xl:max-w-[500px] h-[380px] flex flex-col gap-y-3 bg-gray-50 rounded p-8 shadow">
                      <h5 className="text-xl font-semibold text-gray-800">
                        Order Summary
                      </h5>
                      <div className="w-full flex items-center justify-between mt-5">
                        <p className="text-md text-gray-500 font-medium">
                          Subtotal
                        </p>
                        <p className="text-md text-gray-800 font-medium">
                          {totalPrice}
                        </p>
                      </div>
                      <div className="w-full h-[2px] bg-gray-200 rounded-full" />
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-x-1 text-md text-gray-500 font-medium">
                          <p>Shipping estimate</p>
                          <HiQuestionMarkCircle className="text-xl text-gray-500" />
                        </div>
                        <p className="text-base text-gray-800 font-medium">
                          Rs.300
                        </p>
                      </div>
                      <div className="w-full h-[2px] bg-gray-200 rounded-full" />
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-x-1 text-md text-gray-500 font-medium">
                          <p>Tax estimate</p>
                          <HiQuestionMarkCircle className="text-xl text-gray-500" />
                        </div>
                        <p className="text-md text-gray-800 font-medium">
                          Rs.50
                        </p>
                      </div>
                      <div className="w-full h-[2px] bg-gray-200 rounded-full" />
                      <div className="w-full flex items-center justify-between">
                        <p className="text-base md:text-lg text-gray-800 font-semibold">
                          Order Total
                        </p>
                        <p className="text-base md:text-lg text-gray-800 font-semibold">
                          Rs. {totalPrice && 350 + totalPrice}
                        </p>
                      </div>
                      <Link
                        to={"/cart/checkout"}
                        className="cursor-pointer uppercase w-full text-lg text-center font-semibold text-blue-500 bg-white hover:bg-gray-100  border border-gray-300 rounded py-2 mt-5"
                      >
                        CHECKOUT
                      </Link>
                    </div>
                  )}
                </div>{" "}
              </>
            ) : (
              <p className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-medium">
                {" "}
                Cart is empty!
              </p>
            )
          ) : (
            <p className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-medium">
              {" "}
              Cart is empty!
            </p>
          )}
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Cart;
