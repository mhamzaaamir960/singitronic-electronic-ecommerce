import { Link } from "react-router-dom";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { FaHeadphones, FaRegEnvelope, FaRegUser } from "react-icons/fa";

function HeaderTop() {
  return (
    <div className="w-full h-10 flex br justify-center items-center bg-blue-500">
      <MaxWidthWrapper className="flex justify-between">
        <ul className="flex items-center gap-x-5">
          <li className="flex items-center gap-x-2">
            <FaHeadphones className="text-white text-xl" />
            <span className="text-white text-base font-semibold">+92 326 3454889</span>
          </li>
          <li className="flex items-center gap-x-2">
            <FaRegEnvelope className="text-white text-xl" />
            <span className="text-white text-base font-semibold">singitronic@gmail.com</span>
          </li>
        </ul>

        <ul className="flex items-center gap-x-5">
          <li >
            <Link to={'/login'} className="flex items-center gap-x-2">
            <FaRegUser className="text-white text-xl" />
            <span className="text-white text-base font-semibold">Login</span>
            </Link>
          </li>
          <li >
            <Link to={'/register'} className="flex items-center gap-x-2">
            <FaRegUser className="text-white text-xl" />
            <span className="text-white text-base font-semibold">Register</span>
            </Link>
          </li>
        </ul>
      </MaxWidthWrapper>
    </div>
  );
}

export default HeaderTop;
