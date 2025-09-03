import type { IconType } from "react-icons";
import { FaRegUser, FaTable } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdCategory, MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";
import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

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
  // {
  //   name: "Settings",
  //   link: "/admin/settings",
  //   icon: FaGear,
  // },
];

function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className=" w-full max-h-[900px] h-fit flex justify-center bg-white">
      <MaxWidthWrapper className="relative flex justify-start mt-28 sm:mt-32 md:mt-40 flex gap-x-10">
        <ul
          className={`absolute left-0 lg:relative lg:left-auto h-full lg:max-h-fit  ${
            openSidebar ? "flex" : "hidden lg:flex"
          } w-[300px] bg-blue-500 flex-col gap-y-5 py-10 rounded-b-lg  pt-14 z-20 px-5 lg:px-0 `}
        >
          <button
            title="Close Sidebar"
            onClick={() => setOpenSidebar(false)}
            className="absolute top-5 right-3 lg:hidden"
          >
            <RxCross2 className="text-white text-2xl" />
          </button>
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
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          className={"self-start cursor-pointer mt-2 absolute"}
        >
          {openSidebar ? (
            <RiMenuUnfold4Line
              title="Close Sidebar"
              className="text-3xl text-blue-500"
            />
          ) : (
            <RiMenuFold4Line
              title="Open Sidebar"
              className="text-3xl text-blue-500"
            />
          )}
        </button>
        <div
          style={{
            overflowY: "scroll",
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
            appearance: "none",
            padding: "0px 10px 0px 0px",
          }}
          className="w-full mt-2 h-full min-h-[400px]"
        >
          {children}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default DashboardSidebar;
