import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Products from "./assets/components/Products";
import Comments from "./assets/components/Comments";
import Users from "./assets/components/Users";
import Orders from "./assets/components/Orders";
import Offers from "./assets/components/Offers";
import RegisterPage from "./assets/pages/registerPage";
import Dashbord from "./assets/components/Dashbord";

const router = [
  { path: "/", element: <Dashbord /> },
  { path: "/registerorlogin", element: <RegisterPage /> },
  { path: "/Products", element: <Products /> },
  { path: "/Comments", element: <Comments /> },
  { path: "/Users", element: <Users /> },
  { path: "/Orders", element: <Orders /> },
  { path: "/Offers", element: <Offers /> },
];

export default router;
