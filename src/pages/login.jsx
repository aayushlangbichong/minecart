import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import ROUTES from "../constants/routes";
import React from "react";
import { api } from "../lib/api";
import { setToken } from "../utils/tokens";
import Counter from "../components/storeexample";
import useAuthStore from "../store/auth-store";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const authStore = useAuthStore();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email: username,
        password: password,
      });

      if (response) {
        toast.success("Logged in");
        setToken(response.data.token);
        authStore.setIsLoggedIn(true);
        authStore.setUser(response.data.user);

        if (response.data.user.role === "admin") {
          navigate(ROUTES.ADMIN_DASHBOARD);
        } else {
          navigate(ROUTES.HOME);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  }
  return (
    <Layout>
      <div className="mx-auto my-20 max-w-[300px] justify-center">
        <form onSubmit={handleLogin}>
          <Input
            label={"Username"}
            placeholder={"Your Username"}
            // error={"user name invalidS"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br>

          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Your password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <Button
            variant="primary"
            type="submit"
            className="w-full justify-center"
          >
            Login
          </Button>
        </form>
        <p className="mt-6">
          Don't have account?{" "}
          <Link className="text-orange-600 hover:underline" to={ROUTES.SIGNUP}>
            Sign up here
          </Link>
          .
        </p>
      </div>
    </Layout>
  );
};

export default Login;
