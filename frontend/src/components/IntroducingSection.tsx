import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { Link } from "react-router-dom";

function IntroducingSection() {
  return (
    <div className="min-w-[300px] min-h-[300px] bg-gradient-to-r from-blue-600 to-blue-200 lg:to-white flex justify-center py-10">
      <MaxWidthWrapper className=" flex flex-col justify-center items-center gap-1">
        <h2 className="text-white text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold text-center">
          {" "}
          INTRODUCING <span className="text-black">SINGI</span>
          <span className="text-blue-600">TRONIC</span>
        </h2>
        <p className="text-white text-center text-lg sm:text-xl lg:text-2xl font-semibold mt-5 md:mt-8 lg:mt-10">
          Buy the latest electronics.
        </p>
        <p className="text-white text-center text-lg sm:text-xl lg:text-2xl font-semibold">
          The best electronics for tech lovers.
        </p>
        <Link
          to="/shop"
          className=" text-blue-600 bg-white font-bold text-lg sm:text-xl md:text-2xl hover:bg-gray-100 mt-5 px-12 sm:px-16 md:px-24 lg:px-32 py-3"
        >
          SHOP NOW
        </Link>
      </MaxWidthWrapper>
    </div>
  );
}

export default IntroducingSection;
