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
import { Skeleton } from "./ui/skeleton";
import { IoMenuOutline } from "react-icons/io5";

function AllProducts({
  price,
  rating,
  inStock,
  outOfStock,
  category,
  setIsOpenSidebar,
}: {
  price: number;
  rating: number;
  inStock: boolean;
  outOfStock: boolean;
  category: string | "";
  setIsOpenSidebar: (openSidebar: boolean) => void;
}) {
  const [sortValue, setSortValue] = useState<string>("default");
  const dispatch = useDispatch<AppDispatch>();
  const { queryProducts } = useSelector(
    (state: RootState) => state.productsSlice
  );
  const [pageCounter, setPageCounter] = useState<number>(1);
  // const page: string = searchParams.get("page");
  // const limit: string = searchParams.get("limit");

  useEffect(() => {
    dispatch(
      fetchQueryProducts({
        sort: sortValue,
        price,
        inStock,
        outOfStock,
        rating,
        category,
        page: pageCounter,
        limit: 6,
      })
    );
  }, [
    dispatch,
    sortValue,
    inStock,
    outOfStock,
    rating,
    price,
    category,
    pageCounter,
  ]);
  return (
    <div className=" w-full flex flex-col gap-y-5 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-start justify-center gap-y-3">
          <h3 className="uppercase  text-xl sm:text-2xl md:text-3xl text-black font-semibold f">
            All Products
          </h3>
          <div className="lg:hidden flex items-center gap-x-2">
            <button onClick={() => setIsOpenSidebar(true)}>
              <IoMenuOutline id="filter" className="text-2xl" />
            </button>
            <label htmlFor="filter" className="text-xl text-gray-800">
              Filters
            </label>
          </div>
        </div>
        <div className="flex gap-x-1 sm:gap-x-3 md:gap-x-5 items-center">
          <h3 className="hidden sm:block text-base sm:text-xl md:text-2xl text-nowrap">
            Sort By:
          </h3>
          <SortBy sortValue={sortValue} setSortValue={setSortValue} />
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-300/50 rounded-full my-3" />
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 p-5 ">
        {queryProducts && queryProducts.length > 0
          ? queryProducts.map((product: Product) => {
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
            })
          : Array.from({ length: 12 }, (_, index: number) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="w-[187px] sm:w-[225px] lg:w-[300px] h-[200px] sm:h-[230px] lg:h-[300px] rounded bg-blue-100" />
                <Skeleton className="w-[187px] sm:w-[225px] lg:w-[300px] h-[10px] sm:h-[14px] md:h-[20px] rounded bg-blue-100" />
                <Skeleton className="w-[187px] sm:w-[225px] lg:w-[300px] h-[10px] sm:h-[14px] md:h-[20px] rounded bg-blue-100" />
              </div>
            ))}
      </div>
      <div className=" w-full h-[50px] flex justify-center items-center mt-5 ">
        <button
          disabled={pageCounter < 2}
          onClick={() => setPageCounter(pageCounter - 1)}
          className="h-full cursor-pointer bg-blue-500/95 hover:bg-blue-500/100  px-3 rounded-l-lg"
        >
          <MdOutlineKeyboardDoubleArrowLeft className="text-2xl text-white " />
        </button>
        <p className="h-full bg-blue-500/95 text-xl font-semibold text-white border-x border-white flex justify-center items-center px-5">
          {pageCounter}
        </p>
        <button
          onClick={() => setPageCounter(pageCounter + 1)}
          className="h-full cursor-pointer bg-blue-500/95 hover:bg-blue-500/100 px-3 rounded-r-lg"
        >
          <MdOutlineKeyboardDoubleArrowRight className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
