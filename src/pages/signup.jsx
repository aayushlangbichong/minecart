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
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authStore = useAuthStore();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", {
        email: username,
        password: password,
      });

      if (response) {
        setToken(response.data.token);
        authStore.isLoggedIn(true);
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
            label={"Username"}
            placeholder={"Your Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // error={"user name iunvalidS"}
          />

          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Your password"}
            s
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Your password"}
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
