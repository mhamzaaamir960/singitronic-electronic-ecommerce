import { type ReactNode } from "react";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
}

const CategoryItem = ({ title, children }: CategoryItemProps) => {
  return (
    <div className="w-[120px] h-[80px] sm:w-[150px] h-[100px] md:w-[175px] lg:w-[200px] xl:w-[240px] lg:h-[120px] flex flex-col items-center gap-y-1 sm:gap-y-2  cursor-pointer bg-white py-5 text-black hover:bg-gray-100">
      {children}
      <h3 className="font-semibold text-base sm:text-lg lg:text-xl">{title}</h3>
    </div>
  );
};

export default CategoryItem;
