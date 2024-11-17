import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import ROUTES from "../../constants/routes";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth-store";
import { delToken } from "@/utils/tokens";
import { LogOut } from "lucide-react";
import Button, { ButtonLink } from "../ui/button";
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
];

const UnAuthorizedWall = ({ children, authoriedRoles = [] }) => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const logout = () => {
    delToken();
    setUser(null);
    setIsLoggedIn(false);
    navigate(ROUTES.LOGIN);
  };

  const isAuthorized = authoriedRoles?.includes(user?.role);

  if (!isAuthorized) {
    return (
      <div className="grid h-screen w-screen place-items-center">
        <div>
          <h2 className="text-4xl font-bold"> User Not-authorized</h2>
          <div className="mt-6 flex justify-center">
            {isLoggedIn ? (
              <div>
                You are logged in as <strong>{user?.role}</strong> role which
                does not have access to this page.{" "}
                <p className="mt-6">
                  <Button onClick={logout}>Logout</Button> and login as
                  different user.
                </p>
              </div>
            ) : (
              <div>
                You are not logged in.
                <p className="mt-6">
                  <ButtonLink to={ROUTES.LOGIN}>Login Now</ButtonLink>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};
export default UnAuthorizedWall;
