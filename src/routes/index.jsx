import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/blog",
        element: <h1>blog</h1>,
      },
      {
        path: "/donation-request",
        element: <h1>donation-request</h1>,
      }
    ],
  },
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
]);
