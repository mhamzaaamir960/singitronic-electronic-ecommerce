import { Link } from "react-router-dom";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { FaHeadphones, FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { fetchUser } from "../store/slices/authSlice";

function HeaderTop() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authSlice
  );
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/v1/users/logout", {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setLoading(false);
      toast.success(data.message);
      dispatch(fetchUser());
    } catch (error) {
      setLoading(false);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    }
  };
  return (
    <div className="w-full h-10 flex br justify-center items-center bg-blue-500">
      <MaxWidthWrapper className="flex justify-between">
        <ul className="flex items-center gap-x-5">
          <li className="flex items-center gap-x-2">
            <FaHeadphones className="text-white text-xl" />
            <span className="text-white text-base font-semibold">
              +92 326 3454889
            </span>
          </li>
          <li className="flex items-center gap-x-2">
            <FaRegEnvelope className="text-white text-xl" />
            <span className="text-white text-base font-semibold">
              singitronic@gmail.com
            </span>
          </li>
        </ul>

        {isAuthenticated ? (
          <ul className="flex items-center gap-x-5">
            <li className="text-white text-base font-semibold">
              {user?.fullName}
            </li>
            {user?.role === "admin" && (
              <li>
                <Link
                  to={"/admin"}
                  className="text-white text-base font-semibold"
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <FaRegUser className="text-white text-xl" />
                <span className="text-white text-base font-semibold">
                  Logout
                </span>
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-x-5">
            <li>
              <Link to={"/login"} className="flex items-center gap-x-2">
                <FaRegUser className="text-white text-xl" />
                <span className="text-white text-base font-semibold">
                  Login
                </span>
              </Link>
            </li>
            <li>
              <Link to={"/register"} className="flex items-center gap-x-2">
                <FaRegUser className="text-white text-xl" />
                <span className="text-white text-base font-semibold">
                  Register
                </span>
              </Link>
            </li>
          </ul>
        )}
      </MaxWidthWrapper>
    </div>
  );
}

export default HeaderTop;
