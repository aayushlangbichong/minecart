import { Link } from "react-router-dom";
import Layout from "../components/layout";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import ROUTES from "../constants/routes";

const Login = () => {
  return (
    <Layout>
      <div className="mx-auto my-20 max-w-[300px] justify-center">
        <form>
          <Input
            label={"Username"}
            placeholder={"Your Username"}
            // error={"user name iunvalidS"}
          />
          <br></br>
          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Your password"}
          />
          <br />

          <Button
            variant="primary"
            onClick={() => alert("Allertt")}
            className="w-full"
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
