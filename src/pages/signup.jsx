import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import ROUTES from "../constants/routes";
import React, { useState } from "react";
import useAuthStore from "../store/auth-store";
import { api } from "../lib/api";
import { setToken } from "../utils/tokens";
import { toast } from "react-toastify";

const Signup = () => {
  const [fields, setFields] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!fields.firstName.trim()) {
      formErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!fields.lastName.trim()) {
      formErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!fields.email.trim()) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      formErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!fields.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    } else if (fields.password?.length < 8) {
      formErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    if (!fields.confirmPassword) {
      formErrors.confirmPassword = "Confirm password is required.";
      isValid = false;
    } else if (fields.confirmPassword !== fields.password) {
      formErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const authStore = useAuthStore();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    if (!validateForm()) return;

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
      console.error(error);
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  }

  return (
    <Layout>
      <div className="mx-auto my-20 max-w-[300px]">
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <Input
            label="First Name"
            name="firstName"
            value={fields.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />

          <Input
            label="Last Name"
            name="lastName"
            value={fields.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />

          <Input
            label="Email"
            name="email"
            value={fields.email}
            onChange={handleInputChange}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={fields.password}
            onChange={handleInputChange}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={fields.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
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
