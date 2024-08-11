import React from "react";

import ROUTES from "../../constants/routes";
import logo from "../../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import Button, { ButtonLink } from "../ui/button";

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
];
function Header() {
  return (
    <div className="flex items-center justify-between gap-8 bg-primary-400 px-4 py-6 text-white">
      <div className="">
        <img className="h-16" src={logo} alt="logo" />
      </div>
      <nav className="flex">
        <ul className="flex gap-8">
          {NAV_LINK.map((nav) => {
            return (
              <li>
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
        <ButtonLink variant="tertiary" to={ROUTES.SIGNUP}>
          Sign up
        </ButtonLink>{" "}
        <ButtonLink to={ROUTES.LOGIN}>Log in</ButtonLink>
      </div>
    </div>
  );
}

export default Header;
