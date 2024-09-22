import { createBrowserRouter } from "react-router-dom";
import MainScreen from "../screen/MainScreen";
import NavbarLayout from "../layout/NavBarLayout";
import ProductScreen from "../screen/ProductScreen";
import SearchScreen from "../screen/SearchScreen";
import ProfileCartScreen from "../screen/ProfileCartScreen";
import OrderScreen from "../screen/OrderScreen";
import TransactionScreen from "../screen/TransactionScreen";
import ProfileScreen from "../screen/ProfileScreen";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import FilterScreen from "../screen/FilterScreen";
import ArticleScreen from "../screen/ArticleScreen";

const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <MainScreen />,
      },
      {
        path: "/order/",
        element: <TransactionScreen />,
      },
      {
        path: "/profile/",
        element: <ProfileScreen />,
      },
    ],
  },
  {
    path: "/filter",
    element: <FilterScreen />,
  },
  {
    path: "/profile/cart",
    element: <ProfileCartScreen />,
  },
  {
    path: "/profile/transaction/:TransId",
    element: <OrderScreen />,
  },
  {
    path: "/product/:slug",
    element: <ProductScreen />,
  },
  {
    path: "/search",
    element: <SearchScreen />,
  },
  {
    path: "/search/:slug",
    element: <ArticleScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  {
    path: "/article/:slug",
    element: <ArticleScreen />,
  },
]);

export default router;
