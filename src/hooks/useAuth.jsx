import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";

const useAuth = () => {
  const values = useContext(AuthContext);
  return values;
};

export default useAuth;
