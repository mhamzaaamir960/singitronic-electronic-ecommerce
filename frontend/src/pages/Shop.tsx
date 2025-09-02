import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { AllProducts, BreadCrumb, Filters } from "../components";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Shop() {
  const [inStock, setInStock] = useState<boolean>(true);
  const [outOfStock, setOutOfStock] = useState<boolean>(true);
  const [price, setprice] = useState<number>(400000);
  const [rating, setRating] = useState<number>(5);
  const [openSidebar, setIsOpenSidebar] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryValue: string | "" = searchParams.get("category") as string;
  // console.log(categoryValue);

  return (
    <div className="min-w-[300px] w-full min-h-[800px] bg-white flex justify-center mt-20 sm:mt-24 md:mt-40 p-5">
      <MaxWidthWrapper className="w-full flex flex-col gap-y-5 mt-10">
        <BreadCrumb />
        <div className="flex justify-center gap-x-5 xl:gap-x-10">
          <Filters
            inStock={inStock}
            outOfStock={outOfStock}
            rating={rating}
            rangeValue={price}
            setInStock={setInStock}
            setOutOfStock={setOutOfStock}
            setRating={setRating}
            setRangeValue={setprice}
            openSidebar={openSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
          <AllProducts
            inStock={inStock}
            outOfStock={outOfStock}
            rating={rating}
            price={price}
            setIsOpenSidebar={setIsOpenSidebar}
            category={categoryValue}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Shop;
