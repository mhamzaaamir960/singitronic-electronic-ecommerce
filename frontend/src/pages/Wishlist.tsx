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
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authSlice
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
      <div className="w-full min-w-[300px] min-h-[300px] flex justify-center bg-white">
        <MaxWidthWrapper className="flex justify-center p-5 md:p-10">
          {isAuthenticated ? (
            !error ? (
              <TableWrapper>
                <thead>
                  <tr>
                    <th className="hidden sm:block px-4 py-2 text-[12px] sm:text-base ">
                      No.
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-[12px] sm:text-base ">
                      Image
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-[12px] sm:text-base ">
                      Name
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-[12px] sm:text-base ">
                      Stock Status
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-[12px] sm:text-base ">
                      Price
                    </th>
                    <th className="px-3 sm:px-4 py-2 text-[12px] sm:text-base ">
                      Action
                    </th>
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
                          <td className="hidden sm:block px-4 py-2 pt-6 text-sm sm:text-base text-center text-gray-800 font-semibold">
                            {index + 1}
                          </td>
                          <td className="px-3 sm:px-4 py-2 text-center">
                            <img
                              src={image.url}
                              alt={item.name}
                              className="w-12 h-12 object-cover inline-block"
                            />
                          </td>
                          <td className="px-3 sm:px-4 py-2 text-[12px] sm:text-base text-center text-gray-800">
                            {item.name}
                          </td>
                          <td
                            className={`px-3 sm:px-4 py-2 text-[10px] sm:text-base text-center text-sm font-semibold ${
                              item.inStock ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </td>
                          <td className="px-3 sm:px-4 py-2 text-[12px] sm:text-base text-center text-gray-800">
                            Rs.{item.price}
                          </td>
                          <td className="text-center">
                            <MdDelete
                              onClick={() =>
                                handleRemoveItemClick(item._id as string)
                              }
                              className="cursor-pointer text-lg sm:text-xl text-gray-800 hover:text-red-600 inline-block"
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </TableWrapper>
            ) : (
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-medium">
                {error}
              </p>
            )
          ) : (
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-medium">
              Wishlist is empty!
            </p>
          )}
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Wishlist;
