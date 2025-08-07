import { demoProducts } from "../utils/data";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import Product from "./Product";

function FeaturedProducts() {
  return (
    <div className="w-full min-h-[500px] flex justify-center bg-blue-500 border-t-4 border-t-white py-20">
      <MaxWidthWrapper className="flex flex-col justify-center items-center gap-y-20">
        <h2 className="uppercase text-white text-7xl font-extrabold text-center ">
          Featured Products
        </h2>
        <div className="w-full flex flex-wrap justify-center gap-10">
          {demoProducts.map((product: ProductType) => (
            <Product key={product.id} src={product.mainImage} title={product.title} price={product.price} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default FeaturedProducts;
