import {useQuery} from "@tanstack/react-query";
import {getTotalRequests} from "../api/requests";
import {getTotalUsers} from "../api/users";
import useUser from "./useUser";
import useAuth from "./useAuth";

const useDashboard = () => {
  const {user, isUserLoading} = useAuth();
  const {currentUser} = useUser();
  const userMail = user?.email;
  const {data: totalUsers, isLoading: isTotalUsersLoading} = useQuery({
    enabled: !isUserLoading && !!userMail && currentUser?.role === "admin",
    queryKey: ["totalUsers"],
    queryFn: async () => await getTotalUsers(),
  });

  const {data: totalRequests, isLoading: isTotalRequestsLoading} = useQuery({
    enabled: !isUserLoading && !!userMail && currentUser?.role === "admin",
    queryKey: ["totalRequests"],
    queryFn: async () => await getTotalRequests(),
  });

  // const {data: totalFunds, isLoading: isTotalFundsLoading} = useQuery({
  //   queryKey: ["totalFunds"],
  //   queryFn: async () => await getTotalFunds(),
  // });

  return {
    totalUsers,
    isTotalUsersLoading,
    totalRequests,
    isTotalRequestsLoading,
  };
};

export default useDashboard;
