import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BreadCrumb() {
  return (
    <ul className="flex gap-x-2">
      <li>
        <Link to={"/"} className="flex justify-center items-center">
          <FaHouse className="mr-2" />
          Home
        </Link>
      </li>
      <li className="text-gray-400">/</li>
      <li>
        <Link to={"/shop"}>Shop</Link>
      </li>
      <li className="text-gray-400">/</li>
      <li>Products</li>
    </ul>
  );
}

export default BreadCrumb;
