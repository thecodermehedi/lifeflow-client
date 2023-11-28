import useAuth from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";
import useUser from "../hooks/useUser";
import Spinner from "../components/Spinner";
const AdminRoute = ({children}) => {
  const {user, isUserLoading} = useAuth();
  const {currentUser, isCurrentUserLoading} = useUser();
  const isAdmin = currentUser?.role === "admin";
  const location = useLocation();
  if (isUserLoading || isCurrentUserLoading) {
    return <Spinner />;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{from: location}} replace />;
};

export default AdminRoute;
