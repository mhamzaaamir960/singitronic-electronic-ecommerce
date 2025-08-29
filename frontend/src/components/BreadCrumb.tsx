import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BreadCrumb() {
  return (
    <ul className="flex gap-x-2 items-center">
      <li>
        <Link
          to={"/"}
          className="text-sm sm:text-base flex justify-center items-center"
        >
          <FaHouse className="mr-2" />
          Home
        </Link>
      </li>
      <li className="text-sm sm:text-base text-gray-400">/</li>
      <li>
        <Link to={"/shop"} className="text-sm sm:text-base">
          Shop
        </Link>
      </li>
      <li className="text-gray-400 text-sm sm:text-base">/</li>
      <li className="text-sm sm:text-base">Products</li>
    </ul>
  );
}

export default BreadCrumb;
