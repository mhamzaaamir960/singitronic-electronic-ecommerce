import MaxWidthWrapper from "../utils/MaxWidthWrapper";

function Hero() {
  return (
    <div className="min-w-[300px] min-h-[500px] md:h-[600px] lg:h-[700px] w-full bg-blue-500 flex justify-center mt-20 md:mt-40">
      <MaxWidthWrapper className="h-full flex flex-col-reverse md:flex-row items-center gap-y-10 py-20 ">
        <div className="flex flex-col gap-3 sm:gap-5 justify-center items-center md:items-start text-center md:text-start">
          <h1 className="uppercase  text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl text-white font-bold">
            The Products of the future
          </h1>
          <p className="text-white text-sm sm:text-base xl:text-lg 2xl:text-xl ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            velit necessitatibus debitis eius eveniet cupiditate? Et eum eius
            magni, amet dicta ea facilis rem placeat doloribus dolorem in, ipsa
            molestiae!
          </p>
          <div className="flex gap-x-1 max-lg:gap-y-1">
            <button className="cursor-pointer  bg-white text-blue-600 font-bold  px-5 sm:px-8 lg:px-12 py-3 text-base sm:text-lg lg:text-xl hover:bg-gray-100">
              BUY NOW
            </button>
            <button className="cursor-pointer bg-white text-blue-600 font-bold px-4 sm:px-8 lg:px-12 py-3 text-base sm:text-lg lg::text-xl hover:bg-gray-100">
              LEARN MORE
            </button>
          </div>
        </div>
        <img src="watch for banner.png" alt="watch banner" className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]  md:w-[350px] md:h-[350px] xl:w-[400px] xl:h-[400px] 2xl:w-[500px] 2xl:h-[500px]" />
      </MaxWidthWrapper>
    </div>
  );
}

export default Hero;
