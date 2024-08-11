import React from "react";
import { cn } from "../../lib/cn";
import { Link } from "react-router-dom";

/**
 * @param variant = ["primary","secondary","tertiary","danger","success"]
 * **/
const Button = ({
  className,
  variant = "primary",
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getButtonStyles({ className, variant })}
    >
      {children}
    </button>
  );
};

const ButtonLink = ({ className, variant = "primary", children, to }) => {
  return (
    <Link to={to} className={getButtonStyles({ className, variant })}>
      {children}
    </Link>
  );
};

//get button styles
const getButtonStyles = ({ variant = "primary", className }) => {
  return cn([
    // common properties
    "rounded-md px-2 py-1 duration-200 active:scale-90 disabled:opacity-60",
    variant === "primary" &&
      "bg-orange-500 text-white duration-200 hover:bg-orange-600",

    variant === "secondary" &&
      "border-2 border-orange-600 text-orange-600 duration-200 hover:bg-orange-50",

    variant === "tertiary" && "border-2 border-white text-white duration-200",
    variant === "danger" &&
      "bg-red-500 text-white duration-200 hover:bg-red-600",
    className,
  ]);
};

export { ButtonLink };
export default Button;
