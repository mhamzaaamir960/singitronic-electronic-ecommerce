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
import { fetchUser } from "../store/slices/authSlice";

function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authSlice
  );
  const { totalCartItems } = useSelector((state: RootState) => state.cartSlice);
  const { totalItems } = useSelector((state: RootState) => state.wishlistSlice);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const profileImage = user?.profileImage as CategoryImage;

  useEffect(() => {
    dispatch(getTotalCartItems());
    dispatch(fetchWishlist());
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <header className="fixed top-0 w-full flex flex-col items-center bg-white z-40">
      <HeaderTop />
      <MaxWidthWrapper className="h-20 sm:h-24 md:h-32 bg-white flex justify-between items-center gap-x-3 md:gap-x-0">
        <Link to={"/"}>
          <img
            src="/logo.svg"
            width={300}
            height={300}
            alt="singitronic logo"
            className="w-[140px] sm:w-[200px]"
          />
        </Link>
        <SearchInput />
        <ul className="flex justify-center items-center gap-x-5 sm:gap-x-8">
          <li className="relative top-0">
            <Link to={"/wishlist"}>
              <FaHeart className="text-black text-2xl sm:text-3xl" />
              <span className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full bg-blue-500 text-white text-[10px] sm:text-sm font-semibold flex justify-center items-center ">
                {totalItems}
              </span>
            </Link>
          </li>
          <li className="relative top-0 ">
            <Link to={"/cart"}>
              <FaCartShopping className="text-black text-2xl sm:text-3xl" />
              <span className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full bg-blue-500 text-white text-[10px] sm:text-sm font-semibold flex justify-center items-center ">
                {totalCartItems}
              </span>
            </Link>
          </li>
          {isAuthenticated && (
            <li className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
              <Link to={"/profile"}>
                {profileImage ? (
                  <img
                    src={profileImage.url}
                    width={300}
                    height={300}
                    alt={user?.fullName}
                    className="cursor-pointer w-full h-full  bg-white border-2 border-blue-500 rounded-full object-fill"
                  />
                ) : (
                  <img
                    src="/avatar.png"
                    width={300}
                    height={300}
                    alt={user?.fullName}
                    className="cursor-pointer w-[50px] h-[50px] bg-white border-2 border-blue-500 rounded-full"
                  />
                )}
              </Link>
            </li>
          )}
        </ul>
      </MaxWidthWrapper>
    </header>
  );
}

export default Header;
