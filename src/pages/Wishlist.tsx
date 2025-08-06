import { HeadingSection } from "../components";
import { demoProducts } from "../utils/data";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { MdDelete } from "react-icons/md";

function Wishlist() {
  return (
    <>
      <HeadingSection pageName="Wishlist">
        <h3>Wishlist</h3>
      </HeadingSection>
      <div className="w-full min-h-[500px] flex justify-center bg-white">
        <MaxWidthWrapper className="flex justify-center p-10">
          <table className="w-full mx-auto table-auto border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="  py-2 ">No.</th>
                <th className="px-4 py-2 ">Image</th>
                <th className="px-4 py-2 ">Name</th>
                <th className="px-4 py-2 ">Stock Status</th>
                <th className="px-4 py-2 ">Price</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {demoProducts.map((product: ProductType, index: number) => (
                <tr
                  key={product.id}
                  className=" rounded-lg bg-gray-50  border-b border-8 border-red-50"
                >
                  <td className="py-2 text-center text-gray-800 font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={product.mainImage}
                      alt={product.title}
                      className="w-12 h-12 object-cover inline-block"
                    />
                  </td>
                  <td className="px-4 py-2 text-center text-gray-800">
                    {product.title}
                  </td>
                  <td
                    className={`px-4 py-2 text-center text-sm font-semibold ${
                      product.inStock ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-800">
                    ${product.price}
                  </td>
                  <td className="text-center">
                    <MdDelete className="cursor-pointer text-xl text-gray-800 hover:text-red-600 inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Wishlist;
