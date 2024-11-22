import React from "react";

import ROUTES from "../../constants/routes";
import logo from "../../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import Button, { ButtonLink } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import useCountStore from "../../store/count-store";
import useAuthStore from "../../store/auth-store";
import { delToken } from "../../utils/tokens";
import useCartStore from "@/store/cart-store";

const NAV_LINK = [
  {
    link: ROUTES.HOME,
    label: "Home",
  },
  {
    link: ROUTES.ABOUT,
    label: "About",
  },
  {
    link: ROUTES.CONTACT,
    label: "Contact",
  },
  {
    link: ROUTES.SHOP,
    label: "Shop",
  },
  {
    link: ROUTES.MY_ORDERS,
    label: "My orders",
  },
];
function Header() {
  const authStore = useAuthStore();
  const { cart, setCart } = useCartStore();
  const logout = () => {
    delToken();
    authStore.setUser(null);
    authStore.setIsLoggedIn(false);
    setCart(null);
  };

  return (
    <div className="flex items-center justify-between gap-8 bg-primary-400 px-4 py-6 text-white">
      <div className="">
        <img className="h-16" src={logo} alt="logo" />
      </div>

      <nav className="flex">
        <ul className="flex gap-8">
          {NAV_LINK.map((nav) => {
            return (
              <li key={nav.link}>
                <NavLink
                  to={nav.link}
                  className={({ isActive }) => {
                    if (isActive) return "border-b";
                  }}
                >
                  {nav.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex gap-8">
        {!authStore.isLoggedIn && (
          <>
            <ButtonLink to={ROUTES.LOGIN}>Log in</ButtonLink>
            <ButtonLink variant="tertiary" to={ROUTES.SIGNUP}>
              Sign up
            </ButtonLink>{" "}
          </>
        )}

        {authStore.user && <span>{authStore.user.email}</span>}
        {authStore.isLoggedIn && (
          <Button onClick={logout}>
            <Icon icon={"material-symbols:logout"} />
            Logout
          </Button>
        )}

        <ButtonLink to={ROUTES.CART}>
          <Icon className="size-6" icon={"mdi:cart"} />
          <span>{cart?.items?.length || 0}</span>
        </ButtonLink>
      </div>
    </div>
  );
}

export default Header;
