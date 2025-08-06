import { useState } from "react";
import { HeadingSection } from "../components";
import { demoProducts } from "../utils/data";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { LuMinus, LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

function Cart() {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <HeadingSection pageName="Cart">
        <h3>Cart</h3>
      </HeadingSection>
      <div className="w-full min-h-[700px] flex justify-center bg-white">
        <MaxWidthWrapper className="max-w-[1300px] flex flex-col items- gap-y-10 p-10">
          <h4 className="text-4xl text-gray-800 font-semibold self-start mt-10">
            Shopping Cart
          </h4>
          <div className="flex  justify-between gap-x-5">
            <div className="w-full flex flex-col"> 
              {demoProducts.map((product: ProductType) => (
                <div key={product.id} className="max-w-[600px] h-[250px] w-full flex gap-x-5 border-y border-gray-300 py-10">
                  <img
                    src={product.mainImage}
                    alt={product.title}
                    width={150}
                    className="w-[150px]  object-cover inline-block "
                  />
                  <div className="w-full flex flex-col justify-between">
                    <div className="w-full   flex justify-between ">
                      <div>
                        <h6 className="text-lg font-semibold text-gray-800">
                          {product.title}
                        </h6>
                        <p className="text-base mt-2">${product.price}</p>
                      </div>
                      <div className=" h-8 flex items-center gap-x-1 border border-gray-300">
                        <button
                          onClick={() => setCounter(counter - 1)}
                          className="px-2 cursor-pointer"
                        >
                          <LuMinus className="text-xl text-gray-800" />
                        </button>
                        <input
                          type="text"
                          disabled
                          className="text-md  text-center max-w-[50px] text-gray-800 px-1"
                          value={counter}
                        />
                        <button
                          onClick={() => setCounter(counter + 1)}
                          className="px-2  cursor-pointer  hover:bg-gray-50"
                        >
                          <LuPlus className="text-lg text-gray-800" />
                        </button>
                      </div>
                      <button className="cursor-pointer h-fit">
                        <RxCross2 className="text-xl text-gray-500 hover:text-gray-600" />
                      </button>
                    </div>
                    <div className="text-lg flex items-center gap-x-2">
                      <FaCheck className="text-green-400 text-lg" />
                      <p>In Stock</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full max-w-[500px] h-[380px] flex flex-col gap-y-3 bg-gray-50 rounded p-8 shadow">
              <h5 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h5>
              <div className="w-full flex items-center justify-between mt-5">
                <p className="text-md text-gray-500 font-medium">Subtotal</p>
                <p className="text-md text-gray-800 font-medium">$30</p>
              </div>
              <div className="w-full h-[2px] bg-gray-200 rounded-full" />
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-x-1 text-md text-gray-500 font-medium">
                  <p>Shipping estimate</p>
                  <HiQuestionMarkCircle className="text-xl text-gray-500" />
                </div>
                <p className="text-md text-gray-800 font-medium">$5.00</p>
              </div>
              <div className="w-full h-[2px] bg-gray-200 rounded-full" />
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-x-1 text-md text-gray-500 font-medium">
                  <p>Tax estimate</p>
                  <HiQuestionMarkCircle className="text-xl text-gray-500" />
                </div>
                <p className="text-md text-gray-800 font-medium">$44</p>
              </div>
              <div className="w-full h-[2px] bg-gray-200 rounded-full" />
              <div className="w-full flex items-center justify-between">
                <p className="text-lg text-gray-800 font-semibold">
                  Order Total
                </p>
                <p className="text-lg text-gray-800 font-semibold">$269</p>
              </div>
              <Link
                to={"/cart/checkout"}
                className="cursor-pointer uppercase w-full text-lg text-center font-semibold text-blue-500 bg-white hover:bg-gray-100  border border-gray-300 rounded py-2 mt-5"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Cart;
