import useAuth from "./useAuth";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
  getUser,
  getUsers,
  updateUserRoleToDB,
  updateUserStatus,
} from "../api/users";
import toast from "react-hot-toast";

const useUser = () => {
  const {user, isUserLoading} = useAuth();
  const queryClient = useQueryClient();
  const userMail = user?.email;
  const {data: currentUser, isLoading: isCurrentUserLoading} = useQuery({
    enabled: !isUserLoading && !!userMail,
    queryKey: ["user", userMail],
    queryFn: async () => await getUser(userMail),
  });

  const isAdmin = currentUser?.role === "admin";

  const {data: users = [], isLoading: isUsersLoading} = useQuery({
    enabled: !isUserLoading && !!userMail && !!isAdmin,
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
  });

  const createMutation = (mutationFn, successMessage, errorMessage) => ({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("user", userMail);
      toast.success(successMessage);
    },
    onError: (error) => {
      console.error(errorMessage, error);
      toast.error("Something went wrong");
    },
  });

  const {mutateAsync: UpdateStatusBlocked} = useMutation(
    createMutation(
      async (id) => await updateUserStatus(id, "blocked"),
      "User is blocked",
      "Error blocking user:"
    )
  );
  const {mutateAsync: UpdateStatusActive} = useMutation(
    createMutation(
      async (id) => await updateUserStatus(id, "active"),
      "User is active",
      "Error activating user:"
    )
  );

  const {mutateAsync: updateUserRoleFn} = useMutation(
    createMutation(
      async ({id, role}) => await updateUserRoleToDB(id, role),
      "User role updated",
      "Error updating user role:"
    )
  );

  return {
    users,
    currentUser,
    isCurrentUserLoading,
    isUsersLoading,
    UpdateStatusBlocked,
    UpdateStatusActive,
    updateUserRoleFn,
  };
};

export default useUser;
