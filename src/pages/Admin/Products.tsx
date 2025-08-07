import {
  AddNewButton,
  AdminLayout,
  AdminSectionHeading,
  TableHeadingWrapper,
  TableWrapper,
} from "../../components";
import { demoProducts } from "../../utils/data";

function Products() {
  return (
    <AdminLayout>
      <AdminSectionHeading title="All Products" />
      <AddNewButton buttonTitle="ADD NEW PRODUCT" />
      <TableWrapper>
        <thead>
          <tr className="text-left">
            <TableHeadingWrapper>
              <input type="checkbox" />
            </TableHeadingWrapper>
            <TableHeadingWrapper>Product</TableHeadingWrapper>
            <TableHeadingWrapper className="text-center">
              Stock Availablity
            </TableHeadingWrapper>
            <TableHeadingWrapper className="text-center">
              Price
            </TableHeadingWrapper>
            <TableHeadingWrapper className="text-center">
              Details
            </TableHeadingWrapper>
          </tr>
        </thead>
        <tbody className="overflow-y-auto ">
          {demoProducts.map((product: ProductType) => (
            <tr key={product.id} className="bg-gray-100 p-2">
              <td className="px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2 flex gap-x-3 items-center">
                <img
                  src={`/${product.mainImage}`}
                  alt={product.title}
                  width={50}
                  className="w-[50px] object-cover rounded-xl"
                />
                <div className="inline-block">
                  <h3 className="text-lg font-medium text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.manufacturer}
                  </p>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                {product.inStock ? (
                  <span className="text-white text-[12px] font-semibold bg-green-500 rounded-full px-3 py-1">
                    In Stock
                  </span>
                ) : (
                  <span className="text-white text-[12px] font-semibold bg-red-500 rounded-full px-3 py-1">
                    Out Of Stock
                  </span>
                )}
              </td>
              <td className="px-4 py-2 text-center text-gray-800 font-medium">
                ${product.price}
              </td>
              <td className="text-center">details</td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </AdminLayout>
  );
}

export default Products;
