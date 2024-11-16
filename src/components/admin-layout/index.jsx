import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import ROUTES from "../../constants/routes";
import { Link, NavLink } from "react-router-dom";

const DASHBOARD_MENUS = [
  {
    icon: "material-symbols:dashboard",
    label: "Dashboard",
    link: ROUTES.ADMIN_DASHBOARD,
  },
  {
    icon: "fluent-mdl2:product",
    label: "Products",
    link: ROUTES.ADMIN_PRODUCTS,
  },
  {
    icon: "system-uicons:box-add",
    label: "Add product",
    link: ROUTES.ADMIN_ADD_PRODUCT,
  },
  {
    icon: "system-uicons:box-add",
    label: "Edit product",
    link: ROUTES.ADMIN_EDIT_PRODUCT,
  },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="h-screen w-80 border-r bg-white">
        <div className="flex items-center border-b p-4">
          <div className="text-2xl font-semibold text-blue-500">Admin</div>
        </div>
        <nav className="mt-4">
          <ul>
            {/* popuate admin list menu */}
            {DASHBOARD_MENUS.map((menu) => {
              return (
                <li>
                  <NavLink
                    to={menu.link}
                    className="flex cursor-pointer items-center p-3 hover:bg-primary-50 [&.active]:bg-primary-600 [&.active]:text-white"
                  >
                    <Icon icon={menu.icon} className="mr-3" />
                    <span>{menu.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="min-h-screen grow bg-gray-100 p-6">{children}</div>
    </div>
  );
};
export default AdminLayout;
