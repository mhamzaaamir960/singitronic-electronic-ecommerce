import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { AllProducts, BreadCrumb, Filters } from "../components";
import { useState } from "react";

function Shop() {
  const [inStock, setInStock] = useState<boolean>(true);
  const [outOfStock, setOutOfStock] = useState<boolean>(true);
  const [price, setprice] = useState<number>(400000);
  const [rating, setRating] = useState<number>(5);

  return (
    <div className="w-full min-h-[800px] bg-white flex justify-center mt-40 p-5">
      <MaxWidthWrapper className="w-full flex flex-col gap-y-5 mt-10">
        <BreadCrumb />
        <div className="flex justify-between gap-x-10">
          <Filters
            inStock={inStock}
            outOfStock={outOfStock}
            rating={rating}
            rangeValue={price}
            setInStock={setInStock}
            setOutOfStock={setOutOfStock}
            setRating={setRating}
            setRangeValue={setprice}
          />
          <AllProducts
            inStock={inStock}
            outOfStock={outOfStock}
            rating={rating}
            price={price}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Shop;
