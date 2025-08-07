import { HeadingSection } from "../components";
import Product from "../components/Product";
import { demoProducts } from "../utils/data";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";

function Search() {
  return (
    <>
      <HeadingSection pageName="Search">
        <h3>Search</h3>
      </HeadingSection>
      <div className="w-full min-h-[500px] flex justify-center bg-white p-10">
        <MaxWidthWrapper className="flex flex-col items-center gap-y-10">
          <h4 className="text-4xl text-gray-800 font-medium">
            Showing result for "Product Name"
          </h4>
          <div className="flex flex-wrap justify-between gap-5 p-5">
            {demoProducts.map((product: ProductType) => (
              <Product
                key={product.id}
                price={product.price}
                src={product.mainImage}
                title={product.title}
                color="blue"
              />
            ))}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Search;
