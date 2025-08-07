import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
  href: string;
}

const CategoryItem = ({ title, children, href }: CategoryItemProps) => {
  return (
    <Link to={href}>
      <div className="w-[250px] h-[120px] flex flex-col items-center gap-y-2  cursor-pointer bg-white py-5 text-black hover:bg-gray-100">
        {children}

        <h3 className="font-semibold text-xl">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryItem;
