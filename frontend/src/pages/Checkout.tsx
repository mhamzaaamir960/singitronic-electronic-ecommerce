import { Link } from "react-router-dom";
import { HeadingSection } from "../components";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { fetchCartItems } from "../store/slices/cartSlice";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalPrice } = useSelector(
    (state: RootState) => state.cartSlice
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Order>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    status: "PENDING",
    paymentStatus: "PENDING",
    totalAmount: 0,
    shippingAddress: { country: "", city: "", street: "", zip: "" },
    items: items,
    orderMessage: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData: Order) => {
      if (name in data.shippingAddress) {
        return {
          ...prevData,
          shippingAddress: {
            ...prevData.shippingAddress,
            [name]: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data);
    try {
      setLoading(true);
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoading(false);
      setData({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        status: "PENDING",
        paymentStatus: "PENDING",
        totalAmount: 0,
        shippingAddress: { country: "", city: "", street: "", zip: "" },
        items: items,
        orderMessage: "",
      });
      toast.success(responseData.message);
    } catch (error: Error | unknown) {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : (error as string));
    }
  };

  useEffect(() => {
    setData((prevData: Order) => ({ ...prevData, items: items }));
  }, [items]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);
  return (
    <>
      <HeadingSection pageName="Checkout">
        <Link to={"/cart"}>Cart</Link>
        <span>|</span>
        <h3>Checkout</h3>
      </HeadingSection>

      <div className="w-full min-h-[1000px] flex justify-center bg-white">
        <MaxWidthWrapper className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-5 lg:gap-20 p-5 md:p-10">
          <div className="w-full md:w-[45%] flex flex-col gap-y-10 p-2">
            {/* Contact Information */}
            <div className="w-full min-h-[300px] flex flex-col gap-y-5">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                Contact Information
              </h4>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-800"
                >
                  First Name*
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  required={true}
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-800"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="emailAddress"
                  className="text-sm font-medium text-gray-800"
                >
                  Email Address*
                </label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  value={data.emailAddress}
                  onChange={handleChange}
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-800"
                >
                  Phone Number*
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
            </div>
            {/* Payment Details */}
            {/* <div className="w-full min-h-[300px] flex flex-col gap-y-5">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                Payment Details
              </h4>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="nameOnCard"
                  className="text-sm font-medium text-gray-800"
                >
                  Name on card
                </label>
                <input
                  id="nameOnCard"
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="cardNumber"
                  className="text-sm font-medium text-gray-800"
                >
                  Card number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="flex items-center gap-x-5">
                <div className="w-[70%] flex flex-col gap-y-1">
                  <label
                    htmlFor="expirationData"
                    className="text-sm font-medium text-gray-800"
                  >
                    Expiration Date (MM/YY)
                  </label>
                  <input
                    id="expirationData"
                    type="text"
                    className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                  />
                </div>
                <div className="w-[30%] flex flex-col gap-y-1">
                  <label
                    htmlFor="CVC"
                    className="text-sm font-medium text-gray-800"
                  >
                    CVC or CVV
                  </label>
                  <input
                    id="CVC"
                    type="text"
                    className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                  />
                </div>
              </div>
            </div> */}
            {/* Shipping address */}
            <div className="w-full min-h-[300px] flex flex-col gap-y-5">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                Shipping Address
              </h4>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="street"
                  className="text-sm font-medium text-gray-800"
                >
                  Street Address*
                </label>
                <input
                  id="street"
                  name="street"
                  value={data.shippingAddress.street}
                  onChange={handleChange}
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="flex items-center gap-x-5">
                <div className="w-full flex flex-col gap-y-1">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-800"
                  >
                    City*
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={data.shippingAddress.city}
                    onChange={handleChange}
                    type="text"
                    className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                  />
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-gray-800"
                  >
                    Country*
                  </label>
                  <input
                    id="country"
                    name="country"
                    value={data.shippingAddress.country}
                    onChange={handleChange}
                    type="text"
                    className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                  />
                </div>

                <div className="w-full flex flex-col gap-y-1">
                  <label
                    htmlFor="zip"
                    className="text-sm font-medium text-gray-800"
                  >
                    Zip Code*
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    value={data.shippingAddress.zip}
                    onChange={handleChange}
                    type="text"
                    className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="orderMessage"
                  className="text-sm font-medium text-gray-800"
                >
                  Order Message
                </label>
                <textarea
                  id="orderMessage"
                  name="orderMessage"
                  value={data.orderMessage}
                  onChange={handleChange}
                  rows={3}
                  className="w-full appearance-none min-h-32 max-h-40 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 rounded-full" />
            <button
              onClick={handleSubmit}
              className="hidden md:block cursor-pointer w-full h-10 bg-blue-500 hover:bg-blue-500/90 text-xl font-semibold text-white rounded "
            >
              {loading ? (
                <span className="loader w-[20px] h-[20px] border-2 border-gray-100" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>

          <div className="w-full md:w-[45%] p-2">
            <h4 className="text-xl font-semibold text-gray-700">
              Order Summary
            </h4>

            <div className={`flex flex-col ${items.length > 0 ? "gap-0": "gap-3 mt-5"}`}>
              {items.length > 0
                ? items.map(
                    (item: { productId: Product; quantity: number }) => {
                      const image = item.productId
                        .productImage as CategoryImage;
                      return (
                        <div
                          key={item.productId._id}
                          className="w-full h-[150px] border-b border-gray-300 flex items-center gap-x-5"
                        >
                          <img
                            src={image.url}
                            className="w-[100px] h-[100px] object-cover"
                          />
                          <div className="w-full flex justify-between">
                            <div className="">
                              <h5 className="text-base font-medium text-gray-800">
                                {item.productId.name}
                              </h5>
                              <p className="flex items-center text-base text-gray-500">
                                <RxCross2 className="text-sm" />
                                {item.quantity}
                              </p>
                            </div>
                            <p className="text-base font-semibold">
                              Rs.{item.productId.price}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )
                : Array.from({ length: 2 }, (_, index: number) => (
                    <Skeleton key={index} className="w-full h-[150px]" />
                  ))}
            </div>
            <div className="w-full flex items-center justify-between mt-10">
              <p className="text-md text-gray-500">Subtotal</p>
              <p className="text-md text-gray-800 font-medium">
                Rs.{totalPrice}
              </p>
            </div>
            <div className="w-full flex items-center justify-between my-5">
              <p className="text-md text-gray-500">Shipping</p>
              <p className="text-md text-gray-800 font-medium">Rs.300.00</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-md text-gray-500">Taxes</p>
              <p className="text-md text-gray-800 font-medium">Rs.120.00</p>
            </div>
            <div className="w-full h-[1px] bg-gray-200 rounded-full my-5" />
            <div className="w-full flex items-center justify-between">
              <p className="text-lg text-gray-800 font-semibold">Total</p>
              <p className="text-lg text-gray-800 font-semibold">
                Rs.{totalPrice && totalPrice + 420.0}
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="md:hidden cursor-pointer w-full h-10 bg-blue-500 hover:bg-blue-500/90 text-xl font-semibold text-white rounded "
          >
            {loading ? (
              <span className="loader w-[20px] h-[20px] border-2 border-gray-100" />
            ) : (
              "Place Order"
            )}
          </button>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Checkout;
