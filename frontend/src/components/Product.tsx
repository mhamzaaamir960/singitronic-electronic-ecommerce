import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function Product({
  src,
  title,
  price,
  rating,
  _id,
  color,
}: {
  src: string;
  title: string;
  price: number;
  rating: number;
  _id: string;
  color?: string;
}) {
  return (
    <div className="w-[140px] sm:w-[225px] lg:w-[300px]  flex flex-col items-center gap-y-1 sm:gap-y-2 text-center">
      <img
        src={src}
        alt={`${title} image`}
        className="w-full h-[140px] sm:h-[230px] lg:h-[300px]"
      />
      <h3
        className={
          color
            ? "text-[16px] lg:text-xl text-blue-500 font-normal mt-2 uppercase flex line-clamp-1"
            : "text-[16px] lg:text-xl text-white font-normal mt-2 uppercase line-clamp-1"
        }
      >
        {title}
      </h3>
      <p
        className={
          color
            ? "text-sm sm:text-base lg:text-lg text-blue-500 font-semibold"
            : "text-sm sm:text-base lg:text-lg text-white font-semibold"
        }
      >
        Rs.{price}
      </p>
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) =>
          rating >= index + 1 ? (
            <AiFillStar className="text-yellow-500 text-base sm:text-lg md:text-xl" />
          ) : (
            <AiFillStar className="text-gray-500 text-base sm:text-lg md:text-xl" />
          )
        )}
      </div>
      <Link
        to={`/shop/${_id}`}
        className=" flex justify-center items-center w-full bg-white uppercase py-2 text-sm sm:text-base border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2"
      >
        View Product
      </Link>
    </div>
  );
}

export default Product;
