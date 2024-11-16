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
import ProductDetails from "./pages/product-details";
import Cart from "./pages/cart";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin-dashboard";
import AdminAddProduct from "./pages/admin-add-product";
import AdminProducts from "./pages/admin-products";
import AdminEditProduct from "./pages/admin-edit-product";

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
    path: `${ROUTES.SIGNUP}`,
    element: <Signup />,
  },
  {
    path: `${ROUTES.SHOP}/:product-id`,
    element: <ProductDetails />,
  },
  {
    path: ROUTES.CART,
    element: <Cart />,
  },

  {
    path: ROUTES.ADMIN_ADD_PRODUCT,
    element: <AdminAddProduct />,
  },
  {
    path: ROUTES.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
  },
  {
    path: ROUTES.ADMIN_PRODUCTS,
    element: <AdminProducts />,
  },
  {
    path: ROUTES.ADMIN_EDIT_PRODUCT,
    element: <AdminEditProduct />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer autoClose={4000} />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
