import { useDispatch, useSelector } from "react-redux";
import { HeadingSection, TableWrapper } from "../components";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { MdDelete } from "react-icons/md";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import {
  fetchWishlist,
  removeItemFromWishlist,
} from "../store/slices/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, error } = useSelector(
    (state: RootState) => state.wishlistSlice
  );

  const handleRemoveItemClick = async (productId: string) => {
    await dispatch(removeItemFromWishlist(productId));
    await dispatch(fetchWishlist());
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);
  return (
    <>
      <HeadingSection pageName="Wishlist">
        <h3>Wishlist</h3>
      </HeadingSection>
      <div className="w-full min-h-[500px] flex justify-center bg-white">
        <MaxWidthWrapper className="flex justify-center p-10">
          {!error ? (
            <TableWrapper>
              <thead>
                <tr>
                  <th className="px-4  py-2 ">No.</th>
                  <th className="px-4 py-2 ">Image</th>
                  <th className="px-4 py-2 ">Name</th>
                  <th className="px-4 py-2 ">Stock Status</th>
                  <th className="px-4 py-2 ">Price</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.length > 0 &&
                  items.map((item: Product, index: number) => {
                    const image = item.productImage as CategoryImage;
                    return (
                      <tr
                        key={item._id}
                        className="rounded-lg h-20 bg-gray-50  border-b border-8 border-red-50"
                      >
                        <td className="py-2 text-center text-gray-800 font-semibold">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <img
                            src={image.url}
                            alt={item.name}
                            className="w-12 h-12 object-cover inline-block"
                          />
                        </td>
                        <td className="px-4 py-2 text-center text-gray-800">
                          {item.name}
                        </td>
                        <td
                          className={`px-4 py-2 text-center text-sm font-semibold ${
                            item.inStock ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </td>
                        <td className="px-4 py-2 text-center text-gray-800">
                          ${item.price}
                        </td>
                        <td className="text-center">
                          <MdDelete
                            onClick={() =>
                              handleRemoveItemClick(item._id as string)
                            }
                            className="cursor-pointer text-xl text-gray-800 hover:text-red-600 inline-block"
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </TableWrapper>
          ) : (
            <p className="text-3xl font-medium">{error}</p>
          )}
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Wishlist;
