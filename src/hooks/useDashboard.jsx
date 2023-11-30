import {useQuery} from "@tanstack/react-query";
import {getTotalRequests} from "../api/requests";
import {getTotalUsers} from "../api/users";
import useUser from "./useUser";
import useAuth from "./useAuth";
import axiosSecure from "../api";

const useDashboard = () => {
  const {user, isUserLoading} = useAuth();
  const {currentUser} = useUser();
  const userMail = user?.email;
  const isAuthorized =
    currentUser?.role === "volunteer" || currentUser?.role === "admin";
  const {data: totalUsers, isLoading: isTotalUsersLoading} = useQuery({
    enabled: !isUserLoading && !!userMail && !!isAuthorized,
    queryKey: ["totalUsers"],
    queryFn: async () => await getTotalUsers(),
  });

  const {data: totalRequests, isLoading: isTotalRequestsLoading} = useQuery({
    enabled: !isUserLoading && !!userMail && !!isAuthorized,
    queryKey: ["totalRequests"],
    queryFn: async () => await getTotalRequests(),
  });

  const {data: totalFunds, isLoading: isTotalFundsLoading} = useQuery({
    enabled: !isUserLoading && !!userMail && !!isAuthorized,
    queryKey: ["totalFunds"],
    queryFn: async () => {
      const {data} = await axiosSecure("/funding-ammount");
      return data[0];
    },
  });

  return {
    totalUsers,
    isTotalUsersLoading,
    totalRequests,
    isTotalRequestsLoading,
    totalFunds,
    isTotalFundsLoading,
  };
};

export default useDashboard;
