import {Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const BlockRoute = ({children}) => {
  const {user, isUserLoading} = useAuth();
  if (isUserLoading) {
    return <Spinner />;
  }
  if (!user?.email) {
    return children;
  }
  return <Navigate to={"/"} replace />;
};

export default BlockRoute;
