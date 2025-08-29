import { useDispatch, useSelector } from "react-redux";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import CategoryItem from "./CategoryItem";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchCategories } from "../store/slices/categorySlice";
import { Skeleton } from "./ui/skeleton";

function CategoryMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categorySlice);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="relative min-w-[300px] min-h-[450px] flex justify-center bg-blue-500 py-10">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-10">
        <h2 className="uppercase text-white text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-center ">
          Browse Categories
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-2 2xl:gap-5">
          {categories && categories.length > 0
            ? categories.map((category: Category) => {
                const image = category.categoryImage as CategoryImage;
                return (
                  <CategoryItem key={category._id} title={category.name}>
                    <img
                      src={image.url}
                      alt={`${category.name} image`}
                      className="w-[36px] h-[36px] lg:w-[45px] lg:h-[45px]"
                    />
                  </CategoryItem>
                );
              })
            : Array.from({ length: 10 }, (_, index: number) => (
                <Skeleton
                  key={index}
                  className="w-[120px] h-[80px] sm:w-[150px] h-[100px] md:w-[175px] lg:w-[200px] xl:w-[240px] lg:h-[120px] rounded bg-blue-100"
                />
              ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default CategoryMenu;
