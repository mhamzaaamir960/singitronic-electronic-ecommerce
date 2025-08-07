import { Link } from "react-router-dom";
import { HeadingSection } from "../components";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { demoProducts } from "../utils/data";
import { RxCross2 } from "react-icons/rx";

function Checkout() {
  const product = demoProducts[5];
  return (
    <>
      <HeadingSection pageName="Checkout">
        <Link to={"/cart"}>Cart</Link>
        <span>|</span>
        <h3>Checkout</h3>
      </HeadingSection>

      <div className="w-full min-h-[1000px] flex justify-center bg-white">
        <MaxWidthWrapper className="flex justify-between gap-x-10 p-10">
          <div className="w-[45%] flex flex-col gap-y-10 p-2">
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
                  First Name
                </label>
                <input
                  id="firstName"
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
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="emailAddress"
                  className="text-sm font-medium text-gray-800"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="phoneNo"
                  className="text-sm font-medium text-gray-800"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNo"
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
            </div>
            {/* Payment Details */}
            <div className="w-full min-h-[300px] flex flex-col gap-y-5">
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
            </div>
            {/* Shipping address */}
            <div className="w-full min-h-[300px] flex flex-col gap-y-5">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                Shipping Address
              </h4>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="company"
                  className="text-sm font-medium text-gray-800"
                >
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-800"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="appartment"
                  className="text-sm font-medium text-gray-800"
                >
                  Appartment, suite, etc.
                </label>
                <input
                  id="appartment"
                  type="text"
                  className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
              <div className="flex items-center gap-x-5">
                <div className="w-full flex flex-col gap-y-1">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-gray-800"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                  />
                </div>
                <div className="w-full flex flex-col gap-y-1">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-800"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                  />
                </div>

                <div className="w-full flex flex-col gap-y-1">
                  <label
                    htmlFor="postalCode"
                    className="text-sm font-medium text-gray-800"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    className="w-full h-10 border border-gray-300 focus:outline-blue-500 rounded p-2"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label
                  htmlFor="orderNotice"
                  className="text-sm font-medium text-gray-800"
                >
                  Order notice
                </label>
                <textarea
                  id="orderNotice"
                  rows={3}
                  className="w-full appearance-none min-h-32 max-h-40 border border-gray-300 focus:outline-blue-500 rounded p-2"
                />
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 rounded-full" />
            <button className="cursor-pointer w-full h-10 bg-blue-500 hover:bg-blue-500/90 text-xl font-semibold text-white rounded ">
              Pay Now
            </button>
          </div>

          <div className="w-[45%] p-2">
            <h4 className="text-xl font-semibold text-gray-700">
              Order Summary
            </h4>
            <div className="w-full border-b border-gray-300 flex  gap-x-5 py-10">
              <img
                src={`/${product.mainImage}`}
                className="w-[100px] h-[100px] object-cover"
              />
              <div className="w-full flex justify-between">
                <div className="">
                  <h5 className="text-base font-medium text-gray-800">
                    {product.title}
                  </h5>
                  <p className="flex items-center text-base text-gray-500">
                    <RxCross2 className="text-sm" />3
                  </p>
                </div>
                <p className="text-base font-semibold">${product.price}</p>
              </div>
            </div>
            <div className="w-full h-[150px] border-b border-gray-300 flex items-center gap-x-5">
              <img
                src={`/${product.mainImage}`}
                className="w-[100px] h-[100px] object-cover"
              />
              <div className="w-full flex justify-between">
                <div className="">
                  <h5 className="text-base font-medium text-gray-800">
                    {product.title}
                  </h5>
                  <p className="flex items-center text-base text-gray-500">
                    <RxCross2 className="text-sm" />3
                  </p>
                </div>
                <p className="text-base font-semibold">${product.price}</p>
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-10">
              <p className="text-md text-gray-500">Subtotal</p>
              <p className="text-md text-gray-800 font-medium">$500.00</p>
            </div>
            <div className="w-full flex items-center justify-between my-5">
              <p className="text-md text-gray-500">Shipping</p>
              <p className="text-md text-gray-800 font-medium">$22.00</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-md text-gray-500">Taxes</p>
              <p className="text-md text-gray-800 font-medium">$44</p>
            </div>
            <div className="w-full h-[1px] bg-gray-200 rounded-full my-5" />
            <div className="w-full flex items-center justify-between">
              <p className="text-lg text-gray-800 font-semibold"> Total</p>
              <p className="text-lg text-gray-800 font-semibold">$269</p>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Checkout;
