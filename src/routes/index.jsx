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
import BlockRoute from "./BlockRoute";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";
import PrivateRoute from "./PrivateRoute";
import Spinner from "../components/Spinner";

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
  {
    path: "/login",
    element: (
      <BlockRoute>
        <Login />
      </BlockRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <BlockRoute>
        <Register />
      </BlockRoute>
    ),
  },
  {path: "/loading", element: <Spinner />},
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: (
          <PrivateRoute>
            <DashHome />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "request/:id/edit",
        element: (
          <PrivateRoute>
            <UpdateRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "request/:id/details",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },

      // Donor
      {
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            <MyRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <CreateRequest />
          </PrivateRoute>
        ),
      },
      // Admin
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <PrivateRoute>
            <Requests />
          </PrivateRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <PrivateRoute>
            <Content />
          </PrivateRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      // Volunteer
      // {path: "my-donation-requests", element: <Dashboard />},
      // {path: "content-management", element: <Dashboard />},
    ],
  },
]);

export default router;
