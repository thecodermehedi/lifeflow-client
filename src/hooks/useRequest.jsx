import toast from "react-hot-toast";
import {
  deleteRequest,
  getRequests,
  updateRequest,
  updateRequestStatus,
} from "../api/requests";
import useAuth from "./useAuth";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const useRequest = () => {
  const {user, isUserLoading} = useAuth();
  const queryClient = useQueryClient();
  const userMail = user?.email;
  const {data: requests = [], isLoading: isRequestsLoading} = useQuery({
    enabled: !isUserLoading && !!userMail,
    queryKey: ["requests", userMail],
    queryFn: async () => await getRequests(userMail),
  });

  const createMutation = (mutationFn, successMessage, errorMessage) => ({
    mutationFn,
    onSuccess: (id) => {
      queryClient.invalidateQueries("requests", id);
      toast.success(successMessage);
    },
    onError: (error) => {
      console.error(errorMessage, error);
      toast.error("Something went wrong");
    },
  });

  const {mutateAsync: UpdateStatusInProgress} = useMutation(
    createMutation(
      async (id) => await updateRequestStatus(id, "inprogress"),
      "Request status updated to inprogress",
      "Error updating status to inprogress:"
    )
  );
  const {mutateAsync: UpdateStatusDone} = useMutation(
    createMutation(
      async (id) => await updateRequestStatus(id, "done"),
      "Request status updated to done",
      "Error updating status to done:"
    )
  );

  const {mutateAsync: UpdateStatusCanceled} = useMutation(
    createMutation(
      async (id) => await updateRequestStatus(id, "canceled"),
      "Request status updated to canceled",
      "Error updating status to canceled:"
    )
  );

  const {mutateAsync: DeleteRequestFn} = useMutation(
    createMutation(
      async (id) => await deleteRequest(id),
      "Request is deleted",
      "Error deleting request:"
    )
  );

  const {mutateAsync: UpdateRequestFn} = useMutation({
    mutationFn: async ({id, newRequestInfo}) =>
      await updateRequest(id, newRequestInfo),
    onSuccess: (id) => {
      queryClient.invalidateQueries("requests", id);
      toast.success("Request is updated");
    },
    onError: (error) => {
      console.error("Error updating request:", error);
      toast.error("Something went wrong");
    },
  });

  return {
    requests,
    isRequestsLoading,
    UpdateStatusDone,
    UpdateStatusCanceled,
    DeleteRequestFn,
    UpdateRequestFn,
    UpdateStatusInProgress,
  };
};

export default useRequest;
