import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { Link } from "react-router-dom";

function IntroducingSection() {
  return (
    <div className="h-[400px] bg-gradient-to-r from-blue-600 to-white flex justify-center">
      <MaxWidthWrapper className=" flex flex-col justify-center items-center gap-1">
        <h2 className="text-white text-8xl font-extrabold text-center">
          {" "}
          INTRODUCING <span className="text-black">SINGI</span>
          <span className="text-blue-600">TRONIC</span>
        </h2>
        <p className="text-white text-center text-2xl font-semibold mt-10">
          Buy the latest electronics.
        </p>
        <p className="text-white text-center text-2xl font-semibold">
          The best electronics for tech lovers.
        </p>
        <Link
          to="/shop"
          className=" text-blue-600 bg-white font-bold text-2xl hover:bg-gray-100 mt-5 px-32 py-3"
        >
          SHOP NOW
        </Link>
      </MaxWidthWrapper>
    </div>
  );
}

export default IntroducingSection;
