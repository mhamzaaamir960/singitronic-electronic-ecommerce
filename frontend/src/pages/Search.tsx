import { Skeleton } from "@/components/ui/skeleton";
import { HeadingSection } from "../components";
import Product from "../components/Product";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { searchProducts } from "@/store/slices/productSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const { serachProducts } = useSelector((state: RootState) => state.productsSlice);
  const [searchParams] = useSearchParams();
  let searchValue: string | "" = searchParams.get("search") as string;
  if (searchValue === null) {
    searchValue = "";
  }
  useEffect(() => {
    dispatch(searchProducts({ searchValue }));
  }, [dispatch, searchValue]);
  return (
    <>
      <HeadingSection pageName="Search">
        <h3>Search</h3>
      </HeadingSection>
      <div className="min-w-[300px] w-full min-h-[500px] flex justify-center bg-white p-10 text-center">
        <MaxWidthWrapper className="flex flex-col items-center gap-y-10">
          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-medium">
            Showing result for {searchValue}
          </h4>
          <div className="w-full flex flex-wrap justify-center gap-3 sm:gap-10 md:gap-5 lg:gap-8 2xl:gap-10">
            {serachProducts && serachProducts.length > 0
              ? serachProducts.map((product: Product) => {
                  const image = product.productImage as CategoryImage;
                  return (
                    <Product
                      key={product._id}
                      src={image.url}
                      title={product.name}
                      price={product.price}
                      _id={product._id!}
                      rating={product.rating}
                      color="white"
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
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Search;
