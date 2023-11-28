import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
const PrivateRoute = ({children}) => {
  const location = useLocation();
  const {user, isUserLoading} = useAuth();
  if (isUserLoading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{from: location}} replace />;
};

export default PrivateRoute;
