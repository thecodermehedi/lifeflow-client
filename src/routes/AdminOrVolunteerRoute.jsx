import useAuth from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";
import useUser from "../hooks/useUser";
import Spinner from "../components/Spinner";
import {useParams} from "react-router-dom";

const AdminOrVolunteerRoute = ({children}) => {
  const {user, isUserLoading} = useAuth();
  const {currentUser, isCurrentUserLoading} = useUser();
  const {role} = useParams();
  const isAuthorized =
    currentUser?.role === role && (role === "volunteer" || role === "admin");
  const location = useLocation();

  if (isUserLoading || isCurrentUserLoading) {
    return <Spinner />;
  }

  if (user && isAuthorized) {
    return children;
  }

  return <Navigate to="/login" state={{from: location}} replace />;
};

export default AdminOrVolunteerRoute;
