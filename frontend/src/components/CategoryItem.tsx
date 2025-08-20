import { type ReactNode } from "react";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
}

const CategoryItem = ({ title, children }: CategoryItemProps) => {
  return (
    <div>
      <div className="w-[250px] h-[120px] flex flex-col items-center gap-y-2  cursor-pointer bg-white py-5 text-black hover:bg-gray-100">
        {children}

        <h3 className="font-semibold text-xl">{title}</h3>
      </div>
    </div>
  );
};

export default CategoryItem;
