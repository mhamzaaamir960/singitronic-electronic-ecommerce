import { useDispatch, useSelector } from "react-redux";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import Product from "./Product";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchProducts } from "../store/slices/productSlice";
import { Skeleton } from "@/components/ui/skeleton";

function FeaturedProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.productsSlice);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="relative w-full min-h-[500px] flex justify-center bg-blue-500 border-t-4 border-t-white py-20 z-[-1]">
      <MaxWidthWrapper className="flex flex-col justify-center items-center gap-y-20">
        <h2 className="uppercase text-white text-7xl font-extrabold text-center ">
          Featured Products
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
            gap: "40px",
          }}
          className="w-full flex flex-wrap justify-between"
        >
          {products && products.length > 0
            ? products.map((product: Product) => {
                const image = product.productImage as CategoryImage;
                return (
                  <Product
                    key={product._id}
                    src={image.url}
                    title={product.name}
                    price={product.price}
                    _id={product._id!}
                  />
                );
              })
            : Array.from({ length: 12 }, (_, index: number) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="w-[300px] h-[350px] rounded bg-blue-100" />
                  <Skeleton className="w-[300px] h-[20px] rounded bg-blue-100" />
                  <Skeleton className="w-[300px] h-[20px] rounded bg-blue-100" />
                </div>
              ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default FeaturedProducts;
