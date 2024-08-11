import { Link } from "react-router-dom";
import Layout from "../components/layout";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import ROUTES from "../constants/routes";

const Signup = () => {
  return (
    <Layout>
      <div className="mx-auto my-20 max-w-[300px]">
        <form className="flex flex-col gap-4">
          <Input
            label={"Email"}
            placeholder={"Your email"}
            // error={"user name iunvalidS"}
          />

          <Input
            label={"Username"}
            placeholder={"Your Username"}
            // error={"user name iunvalidS"}
          />

          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Your password"}
          />
          <Input
            label={"Confirm Password"}
            type={"password"}
            placeholder={"Your password"}
          />

          <Button
            variant="primary"
            onClick={() => alert("Allertt")}
            className="w-full"
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
