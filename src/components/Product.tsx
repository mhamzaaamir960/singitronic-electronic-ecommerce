import { AiFillStar } from "react-icons/ai";

function Product({
  src,
  title,
  price,
  color,
}: {
  src: string;
  title: string;
  price: number;
  color?: string;
}) {
  return (
    <div className="w-[300px] h-[450px] flex flex-col items-center gap-y-2">
      <img src={src} alt="" className="w-full h-[300px]" />
      <h3
        className={
          color
            ? "text-xl text-blue-500 font-normal mt-2 uppercase"
            : "text-xl text-white font-normal mt-2 uppercase"
        }
      >
        {title}
      </h3>
      <p
        className={
          color
            ? "text-lg text-blue-500 font-semibold"
            : "text-lg text-white font-semibold"
        }
      >
        ${price}
      </p>
      <div className="flex">
        <AiFillStar className="text-yellow-500 text-xl" />
        <AiFillStar className="text-yellow-500 text-xl" />
        <AiFillStar className="text-yellow-500 text-xl" />
        <AiFillStar className="text-yellow-500 text-xl" />
        <AiFillStar className="text-yellow-500 text-xl" />
      </div>
      <button className="block cursor-pointer flex justify-center items-center w-full uppercase bg-white px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2">
        View Product
      </button>
    </div>
  );
}

export default Product;
