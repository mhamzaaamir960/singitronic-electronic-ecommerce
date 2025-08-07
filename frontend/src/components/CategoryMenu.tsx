import { categoryMenuList } from "../utils/data";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import CategoryItem from "./CategoryItem";

function CategoryMenu() {
  return (
    <div className="h-[500px] flex justify-center bg-blue-500">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-y-10">
        <h2 className="uppercase text-white text-7xl font-extrabold text-center ">
          Browse Categories
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {categoryMenuList.map((item: categoryMenuList) => (
            <CategoryItem href={item.href} key={item.id} title={item.title} >
              <img
                src={item.src}
                alt={`${item.title} image`}
                width={48}
                height={48}
              />
            </CategoryItem>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default CategoryMenu;
