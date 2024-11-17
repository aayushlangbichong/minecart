import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import ROUTES from "../constants/routes";
import React from "react";
import useAuthStore from "../store/auth-store";
import { api } from "../lib/api";
import { setToken } from "../utils/tokens";
import { toast } from "react-toastify";

const Signup = () => {
  const [fields, setFields] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFields((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const authStore = useAuthStore();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    if (fields.confirmPassword !== fields.password) {
      toast.error("Passwords didn't match.");
      return;
    }

    try {
      const response = await api.post("/auth/signup", {
        email: fields.email,
        password: fields.password,
        firstName: fields.firstName,
        lastName: fields.lastName,
      });

      if (response) {
        setToken(response.data.token);
        authStore.setIsLoggedIn(true);
        authStore.setUser(response.data.user);
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  }

  return (
    <Layout>
      <div className="mx-auto my-20 max-w-[300px]">
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <Input
            label={"First Name"}
            type={"text"}
            placeholder={""}
            name="firstName"
            onChange={handleInputChange}
            value={fields.firstName}
          />

          <Input
            label={"Last Name"}
            type={"text"}
            placeholder={""}
            name="lastName"
            onChange={handleInputChange}
            value={fields.lastName}
          />

          <Input
            label={"Email"}
            placeholder={"Your Email"}
            name="email"
            onChange={handleInputChange}
            value={fields.email}

            // error={"user name iunvalidS"}
          />

          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Your password"}
            name="password"
            onChange={handleInputChange}
            value={fields.password}
          />
          <Input
            label={"Confirm Password"}
            type={"password"}
            name="confirmPassword"
            onChange={handleInputChange}
            value={fields.confirmPassword}
          />

          <Button
            variant="primary"
            type="submit"
            className="w-full justify-center"
          >
            Sign Up
          </Button>
        </form>
        <p className="mt-6">
          Already have an account?{" "}
          <Link className="text-orange-600 hover:underline" to={ROUTES.LOGIN}>
            Login here
          </Link>
          .
        </p>
      </div>
    </Layout>
  );
};

export default Signup;
