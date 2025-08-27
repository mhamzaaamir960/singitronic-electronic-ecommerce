function Filters({
  rangeValue,
  rating,
  inStock,
  outOfStock,
  setInStock,
  setOutOfStock,
  setRangeValue,
  setRating,
}: {
  rangeValue: number;
  rating: number;
  inStock: boolean;
  outOfStock: boolean;
  setInStock: (inStock: boolean) => void;
  setOutOfStock: (outOfStock: boolean) => void;
  setRating: (rating: number) => void;
  setRangeValue: (rangeValue: number) => void;
}) {
  return (
    <div className="max-w-[250px] w-full flex flex-col gap-y-2">
      <h3 className="text-2xl text-gray-800 font-medium">Filters</h3>
      <div className="w-full h-0.5 bg-gray-300/50 rounded-full my-3" />
      <div className="flex flex-col gap-y-3">
        <h4 className="text-xl">Availability</h4>
        <ul>
          <li className="flex items-center gap-x-2">
            <input
              id="inStock"
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
            />
            <label
              htmlFor="inStock"
              className="label-text text-lg ml-2 text-black"
            >
              In Stock
            </label>
          </li>
          <li className="flex items-center gap-x-2">
            <input
              id="outOfStock"
              type="checkbox"
              checked={outOfStock}
              onChange={() => setOutOfStock(!outOfStock)}
            />
            <label
              htmlFor="outOfStock"
              className="label-text text-lg ml-2 text-black"
            >
              Out of Stock
            </label>
          </li>
        </ul>
      </div>
      <div className="w-full h-0.5 bg-gray-300/50 rounded-full my-3" />
      <div className="flex flex-col gap-y-5">
        <h4 className="text-xl">Price</h4>
        <input
          type="range"
          name=""
          id=""
          value={rangeValue}
          min={0}
          max={400000}
          onChange={(e) => setRangeValue(e.target.value as unknown as number)}
          className={`w-full h-7 bg-blue-500 rounded-full px-1 appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-white
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:transition-all
         `}
        />
        <p>Max Price: ${rangeValue}</p>
      </div>
      <div className="w-full h-0.5 bg-gray-300/50 rounded-full my-3" />
      <div className="flex flex-col gap-y-5">
        <h4 className="text-xl">Minimum Rating:</h4>
        <input
          type="range"
          name=""
          id=""
          value={rating}
          min={0}
          max={5}
          onChange={(e) => setRating(e.target.value as unknown as number)}
          className={`w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-blue-500
                    [&::-webkit-slider-thumb]:shadow-md
                    [&::-webkit-slider-thumb]:transition-all
         `}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
}

export default Filters;
