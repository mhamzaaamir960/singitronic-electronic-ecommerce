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
    <div className="w-full h-[250px] bg-blue-500 flex justify-center mt-40">
      <MaxWidthWrapper className="flex flex-col justify-center items-center gap-5 text-center ">
        <h2 className="text-white text-7xl">{pageName} Page</h2>
        <div className=" text-xl text-center text-white flex items-center gap-x-2">
          <Link to={"/"}>Home</Link> | {children}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default HeadingSection;
