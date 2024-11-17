import { Link, useNavigate } from "react-router-dom";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import React from "react";
import { api } from "@/lib/api";
import { setToken } from "@/utils/tokens";
import Counter from "@/components/storeexample";
import useAuthStore from "@/store/auth-store";
import { toast } from "react-toastify";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import useLoginWallStore from "@/store/login-wall-store";
import { X } from "lucide-react";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

const LoginWall = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { open, setOpen } = useLoginWallStore();

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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="relative">
        <div>Your are not logged in. Login now!!</div>

        <form onSubmit={handleLogin}>
          <Input
            label={"Username"}
            placeholder={"Your Username"}
            // error={"user name iunvalidS"}
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
        <AlertDialogCancel asChild>
          <Button variant="option" className="absolute right-1 top-1">
            <X className="size-6" />
          </Button>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginWall;
