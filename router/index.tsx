import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home/index";
import Cart from "../pages/Cart/index";
import Login from "../pages/Login/index";
import Profile from "../pages/Profile/index";
import ProductDetail from "../pages/ProductDetail/index";
import Category from "../pages/Category/index";
import Search from "../pages/Search/index";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <Profile /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "category", element: <Category /> },
      { path: "search", element: <Search /> },
    ],
  },
];

export default function Router() {
  return useRoutes(routes);
}
