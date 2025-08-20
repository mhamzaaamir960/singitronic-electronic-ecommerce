import type { IconType } from "react-icons";
import { FaRegUser, FaTable } from "react-icons/fa";
import { FaBagShopping, FaGear } from "react-icons/fa6";
import { MdCategory, MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";

interface SidebarLinksType {
  name: string;
  link: string;
  icon: IconType;
}

const sidebarLinks: SidebarLinksType[] = [
  {
    name: "Dashboard",
    link: "/admin",
    icon: MdDashboard,
  },
  {
    name: "Orders",
    link: "/admin/orders",
    icon: FaBagShopping,
  },
  {
    name: "Products",
    link: "/admin/products",
    icon: FaTable,
  },
  {
    name: "Categories",
    link: "/admin/categories",
    icon: MdCategory,
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: FaRegUser,
  },
  {
    name: "Settings",
    link: "/admin/settings",
    icon: FaGear,
  },
];

function DashboardSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-h-[900px] h-full flex justify-center bg-white ">
      <MaxWidthWrapper className="flex justify-start mt-40 flex gap-x-10">
        <ul className="w-[300px] max-h-fit bg-blue-500 h-full flex flex-col gap-y-5 py-10  rounded-b-lg ">
          {sidebarLinks.map((link: SidebarLinksType) => (
            <li key={link.name} className="mx-3 select-none">
              <NavLink
                to={link.link}
                end={true}
                className={({ isActive }) =>
                  ` w-full flex gap-x-5 items-center text-white px-5 py-3 ${
                    isActive
                      ? "bg-blue-600 border border-blue-800 rounded-lg font-semibold"
                      : "font-medium"
                  } hover:bg-blue-600 rounded-lg`
                }
              >
                <link.icon className="text-2xl" />
                <span className="text-xl ">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div
          style={{
            overflowY: "scroll",
            scrollbarWidth: "thin", 
            msOverflowStyle: "none", 
            appearance: "none",
            padding: "0px 10px 0px 0px"
          }}
          className="w-full mt-2 h-full"
        >
          {children}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default DashboardSidebar;
