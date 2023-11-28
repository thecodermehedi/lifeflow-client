import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import Blog from "../pages/Blog/Blog";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound";
import {createBrowserRouter} from "react-router-dom";
import DashHome from "../pages/Dashboard/Common/DashHome/DashHome";
import Profile from "../pages/Dashboard/Common/Profile/Profile";
import MyRequest from "../pages/Dashboard/MyRequest/MyRequest";
import CreateRequest from "../pages/Dashboard/CreateRequest/CreateRequest";
import Users from "../pages/Dashboard/Admin/Users/Users";
import Requests from "../pages/Dashboard/Admin/Requests/Requests";
import Content from "../pages/Dashboard/Common/Content/Content";
import AddBlog from "../pages/Dashboard/Admin/AddBlog/AddBlog";
import UpdateRequest from "../pages/Dashboard/UpdateRequest/UpdateRequest";
import DonationDetails from "../pages/Dashboard/Common/DonationDetails/DonationDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {path: "/", element: <Home />},
      {path: "/search", element: <Search />},
      {path: "/blog", element: <Blog />},
      {path: "/donation-request", element: <DonationRequest />},
    ],
  },
  {path: "/login", element: <Login />},
  {path: "/register", element: <Register />},
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {path: "home", element: <DashHome />},
      {path: "profile", element: <Profile />},
      {path: "request/:id/edit", element: <UpdateRequest />},
      {path: "request/:id/details", element: <DonationDetails />},

      // Donor
      {path: "my-donation-requests", element: <MyRequest />},
      {path: "create-donation-request", element: <CreateRequest />},
      // Admin
      {path: "all-users", element: <Users />},
      {path: "all-blood-donation-request", element: <Requests />},
      {path: "content-management", element: <Content />},
      {path: "content-management/add-blog", element: <AddBlog />},
      // Volunteer
      // {path: "my-donation-requests", element: <Dashboard />},
      // {path: "content-management", element: <Dashboard />},
    ],
  },
]);

export default router;
