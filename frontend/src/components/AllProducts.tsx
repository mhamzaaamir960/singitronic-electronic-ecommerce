import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import SortBy from "./SortBy";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import type { AppDispatch, RootState } from "../store/store";
import { fetchQueryProducts } from "../store/slices/productSlice";

function AllProducts({
  rangeValue,
  rating,
  inStock,
  outOfStock,
}: {
  rangeValue: number;
  rating: number;
  inStock: boolean;
  outOfStock: boolean;
}) {
  const [sortValue, setSortValue] = useState<string>("default");
  const dispatch = useDispatch<AppDispatch>();
  const { queryProducts } = useSelector(
    (state: RootState) => state.productsSlice
  );

  useEffect(() => {
    dispatch(fetchQueryProducts(sortValue));
  }, [dispatch, sortValue]);
  return (
    <div className=" w-full flex flex-col gap-y-5 ">
      <div className="flex justify-between items-center">
        <h3 className="uppercase text-3xl text-black font-semibold f">
          All Products
        </h3>
        <div className="flex gap-x-5">
          <h3 className="text-2xl">Sort By:</h3>
          <SortBy sortValue={sortValue} setSortValue={setSortValue} />
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-300/50 rounded-full my-3" />
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 p-5">
        {queryProducts &&
          queryProducts.length > 0 &&
          queryProducts.map((product: Product) => {
            const image = product.productImage as CategoryImage;
            return (
              <Product
                key={product._id}
                price={product.price}
                src={image.url}
                title={product.name}
                _id={product._id!}
                color="blue"
              />
            );
          })}
      </div>
      <div className=" w-full h-[50px] flex justify-center items-center mt-5 ">
        <button className="h-full cursor-pointer bg-blue-500/95 hover:bg-blue-500/100  px-3 rounded-l-lg">
          <MdOutlineKeyboardDoubleArrowLeft className="text-2xl text-white " />
        </button>
        <p className="h-full bg-blue-500/95 text-xl font-semibold text-white border-x border-white flex justify-center items-center px-5">
          1
        </p>
        <button className="h-full cursor-pointer bg-blue-500/95 hover:bg-blue-500/100 px-3 rounded-r-lg">
          <MdOutlineKeyboardDoubleArrowRight className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
