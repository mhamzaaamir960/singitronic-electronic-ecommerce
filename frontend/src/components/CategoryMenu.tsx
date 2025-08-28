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
    <div className="h-[500px] flex justify-center bg-blue-500">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-10">
        <h2 className="uppercase text-white text-7xl font-extrabold text-center ">
          Browse Categories
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {categories && categories.length > 0
            ? categories.map((category: Category) => {
                const image = category.categoryImage as CategoryImage;
                return (
                  <CategoryItem key={category._id} title={category.name}>
                    <img
                      src={image.url}
                      alt={`${category.name} image`}
                      width={48}
                      height={48}
                    />
                  </CategoryItem>
                );
              })
            : Array.from({ length: 10 }, (_, index: number) => (
                  <Skeleton
                    key={index}
                    className="w-[250px] h-[120px] rounded bg-blue-100"
                  />
              ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default CategoryMenu;
