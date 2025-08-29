import { Link } from "react-router-dom";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";

function HeadingSection({
  pageName,
  children,
}: {
  pageName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-[300px] w-full h-[130px] sm:h-[160px] md:h-[200px] bg-blue-500 flex justify-center mt-32 sm:mt-36  md:mt-44">
      <MaxWidthWrapper className="flex flex-col justify-center items-center gap-2 sm:gap-5 text-center ">
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
          {pageName} Page
        </h2>
        <div className=" text-base sm:text-lg md:text-xl text-center text-white flex items-center gap-x-2">
          <Link to={"/"}>Home</Link> | {children}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default HeadingSection;
