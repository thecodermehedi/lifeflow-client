import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosSecure from "../api";
import toast from "react-hot-toast";

const usePayment = () => {
  const queryClient = useQueryClient();
  const {mutateAsync: addPaymentFn} = useMutation({
    mutationFn: async (payment) => {
      const res = await axiosSecure.post("/payments", payment);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Payment succeeded");
      queryClient.invalidateQueries("payments");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const {mutateAsync: addPaymentIntentFn} = useMutation({
    mutationFn: async (amount) => {
      const res = await axiosSecure.post("/payment-intent", {
        amount,
      });
      return res.data;
    },
  });

  return {
    addPaymentFn,
    addPaymentIntentFn,
  };
};

export default usePayment;
