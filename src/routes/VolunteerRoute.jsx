import useAuth from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";
import useUser from "../hooks/useUser";
import Spinner from "../components/Spinner";
const VolunteerRoute = ({children}) => {
  const {user, isUserLoading} = useAuth();
  const {currentUser, isCurrentUserLoading} = useUser();
  const isVolunteer = currentUser?.role === "volunteer";
  const location = useLocation();
  if (isUserLoading || isCurrentUserLoading) {
    return <Spinner />;
  }
  if (user && isVolunteer) {
    return children;
  }
  return <Navigate to="/login" state={{from: location}} replace />;
};

export default VolunteerRoute;
