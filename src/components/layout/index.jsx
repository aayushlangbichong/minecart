import { useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import { api } from "../../lib/api";
import useAuthStore from "../../store/auth-store";
import { getToken } from "../../utils/tokens";

const Layout = ({ children }) => {
  const authStore = useAuthStore();

  useEffect(() => {
    const token = getToken();

    const fetchProfile = async () => {
      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        authStore.setUser(res.data);
        authStore.setIsLoggedIn(true);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
