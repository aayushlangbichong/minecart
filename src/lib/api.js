import axios from "axios";
import { getToken } from "../utils/tokens";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const authApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

authApi.interceptors.request.use(
  function (config) {
    const token = getToken;
    if (token) {
      config.headers.Authorization = `Bearer ${getToken()}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { api, authApi };
