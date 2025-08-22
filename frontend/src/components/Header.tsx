import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import HeaderTop from "./HeaderTop";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { getTotalCartItems } from "../store/slices/cartSlice";
import { fetchWishlist } from "../store/slices/wishlistSlice";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authSlice
  );
  const { totalCartItems } = useSelector((state: RootState) => state.cartSlice);
  const { totalItems } = useSelector((state: RootState) => state.wishlistSlice);

  useEffect(() => {
    dispatch(getTotalCartItems());
    dispatch(fetchWishlist());
  }, [dispatch]);
  return (
    <header className="fixed top-0 w-full flex flex-col items-center bg-white">
      <HeaderTop />
      <MaxWidthWrapper className=" h-32 bg-white flex justify-between items-center">
        <Link to={"/"}>
          <img
            src="/logo.svg"
            width={300}
            height={300}
            alt="singitronic logo"
            className=""
          />
        </Link>
        <SearchInput />
        <ul className="flex justify-center items-center gap-x-8">
          <li className="relative top-0">
            <Link to={"/wishlist"}>
              <FaHeart className="text-black text-3xl" />
              <span className="absolute -right-4 -top-4 w-[20px] h-[20px] rounded-full bg-blue-500 text-white text-sm font-semibold flex justify-center items-center ">
                {totalItems}
              </span>
            </Link>
          </li>
          <li className="relative top-0 ">
            <Link to={"/cart"}>
              <FaCartShopping className="text-black text-3xl" />
              <span className="absolute -right-4 -top-4 w-[20px] h-[20px] rounded-full bg-blue-500 text-white text-sm font-semibold flex justify-center items-center ">
                {totalCartItems}
              </span>
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to={"/profile"}>
                <div className="cursor-pointer w-[50px] h-[50px] bg-white border-2 border-blue-500 rounded-full">
                  <img />
                </div>
              </Link>
            </li>
          )}
        </ul>
      </MaxWidthWrapper>
    </header>
  );
}

export default Header;
