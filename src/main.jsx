import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home";
import About from "./pages/about";
import ROUTES from "./constants/routes";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Signup from "./pages/signup";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.ABOUT,
    element: <About />,
  },
  {
    path: ROUTES.SHOP,
    element: <Shop />,
  },
  {
    path: ROUTES.CONTACT,
    element: <Contact />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
