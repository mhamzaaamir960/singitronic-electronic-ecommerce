import MaxWidthWrapper from "../utils/MaxWidthWrapper";

function Hero() {
  return (
    <div className="h-[700px] w-full bg-blue-500 flex justify-center mt-40">
      <MaxWidthWrapper className="h-full flex items-center">
        <div className="flex flex-col gap-5">
          <h1 className="uppercase text-6xl text-white font-bold">
            The Products of the future
          </h1>
          <p className="text-white max-sm:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            velit necessitatibus debitis eius eveniet cupiditate? Et eum eius
            magni, amet dicta ea facilis rem placeat doloribus dolorem in, ipsa
            molestiae!
          </p>
          <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1">
            <button className="cursor-pointer bg-white text-blue-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100">
              BUY NOW
            </button>
            <button className="cursor-pointer bg-white text-blue-600 font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-gray-100">
              LEARN MORE
            </button>
          </div>
        </div>
        <img src="watch for banner.png" alt="watch banner" />
      </MaxWidthWrapper>
    </div>
  );
}

export default Hero;
