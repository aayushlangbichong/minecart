import LoginWall from "../modules/login-wall";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <LoginWall />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
