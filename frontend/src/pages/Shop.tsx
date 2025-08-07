import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { AllProducts, BreadCrumb, Filters } from "../components";

function Shop() {
  return (
    <div className="w-full min-h-[800px] bg-white flex justify-center mt-40 p-5">
      <MaxWidthWrapper className="w-full flex flex-col gap-y-5 mt-10">
        <BreadCrumb />
        <div className="flex justify-between gap-x-10">
          <Filters />
          <AllProducts />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Shop;
