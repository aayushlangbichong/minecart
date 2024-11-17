import React from "react";

import { api } from "@/lib/api";
import useAuthStore from "@/store/auth-store";
import { getToken } from "@/utils/tokens";

const AuthChecker = () => {
  const authStore = useAuthStore();

  React.useEffect(() => {
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
  return <></>;
};

export default AuthChecker;
