import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import ROUTES from "../../constants/routes";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth-store";
import { delToken } from "@/utils/tokens";
import { LogOut } from "lucide-react";
import { ButtonLink } from "../ui/button";
import UnAuthorizedWall from "../modules/unauthorized-wall";
const DASHBOARD_MENUS = [
  {
    icon: "material-symbols:dashboard",
    label: "Dashboard",
    link: ROUTES.ADMIN_DASHBOARD,
  },
  {
    icon: "system-uicons:box-add",
    label: "Product categories",
    link: ROUTES.ADMIN_PRODUCT_CATEGORIES,
  },
  {
    icon: "fluent-mdl2:product",
    label: "Products",
    link: ROUTES.ADMIN_PRODUCTS,
  },
  {
    icon: "grommet-icons:gallery",
    label: "Image Gallery",
    link: ROUTES.ADMIN_IMAGE_GALLERY,
  },
  {
    icon: "grommet-icons:gallery",
    label: "Orders",
    link: ROUTES.ADMIN_ORDERS,
  },
];

const AdminLayout = ({ children }) => {
  const { user, setUser, setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  if (user?.role !== "admin") {
    return <UnAuthorizedWall authoriedRoles={["admin"]} />;
  }

  const logout = () => {
    delToken();
    setUser(null);
    setIsLoggedIn(false);
    navigate(ROUTES.LOGIN);
  };
  return (
    <div className="flex">
      <div className="flex h-screen w-[250px] shrink-0 flex-col border-r bg-white py-6 4xl:w-80">
        <div className="flex items-center border-b p-4">
          <div className="text-2xl font-semibold text-blue-500">Admin</div>
        </div>
        <nav className="mt-4">
          <ul>
            {/* popuate admin list menu */}
            {DASHBOARD_MENUS.map((menu) => {
              return (
                <li key={menu.label}>
                  <NavLink
                    to={menu.link}
                    className="flex cursor-pointer items-center p-3 hover:bg-primary-50 [&.active]:bg-primary-600 [&.active]:text-white"
                  >
                    <Icon icon={menu.icon} className="mr-3 size-6" />
                    <span>{menu.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto">
          <button
            className="flex w-full cursor-pointer items-center p-3 hover:bg-primary-50 [&.active]:bg-primary-600 [&.active]:text-white"
            onClick={logout}
          >
            <LogOut className="mr-3" /> Logout
          </button>
        </div>
      </div>
      <div className="min-h-screen grow bg-gray-100 p-6">{children}</div>
    </div>
  );
};
export default AdminLayout;
