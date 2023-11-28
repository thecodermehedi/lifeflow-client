import useAuth from "./useAuth";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "../api/users";

const useUser = () => {
  const {user, isUserLoading} = useAuth();
  const userMail = user?.email;
  const {data: currentUser, isLoading: isCurrentUserLoading} = useQuery({
    enabled: !isUserLoading && !!userMail,
    queryKey: ["user", userMail],
    queryFn: async () => await getUser(userMail),
  });
  return {currentUser, isCurrentUserLoading};
};

export default useUser;
