import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import dayjs from "dayjs";
import usePayment from "../../../hooks/usePayment";
const PaymentForm = () => {
  const {addPaymentFn, addPaymentIntentFn} = usePayment();
  const {user, isUserLoading} = useAuth();
  const userMail = user?.email;
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(50);

  useEffect(() => {
    const getClientSecret = async () => {
      if (userMail && !isUserLoading) {
        const res = await addPaymentIntentFn(amount);
        setClientSecret(res?.clientSecret);
      }
    };
    getClientSecret();
  }, [addPaymentIntentFn, amount, isUserLoading, userMail]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    const {paymentIntent, error: paymentIntentError} =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (paymentIntentError) {
      console.log(paymentIntentError);
      toast.error(`Payment Intent failed: ${paymentIntentError.message}`);
    }
    if (paymentIntent) {
      if (paymentIntent.status === "succeeded") {
        const paymentDetails = {
          name: user?.displayName,
          email: user?.email,
          transactionId: paymentIntent?.id,
          date: dayjs().format("DD-MM-YYYY"),
          time: dayjs().format("h:mm A"),
          amount: paymentIntent?.amount,
        };
        await addPaymentFn(paymentDetails);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" h-80 bg-base mb-20 rounded-2xl flex justify-center items-center flex-col gap-4"
    >
      <div className="flex items-center justify-center">
        <label htmlFor="amount" className="font-bold">
          Amount:{" "}
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="1"
          placeholder="50"
          className="border-2 border-gray-300 text-gray-900 rounded-lg p-1 ml-2 w-20"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              iconColor: "black",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        className="bg-white h-[30%] p-9 w-[90%] md:w-[60%] rounded-2xl mx-auto"
      />
      <button
        className="uppercase py-2 px-8  font-medium text-center btn shadow md:inline cursor-pointer disabled:bg-foreground disabled:cursor-not-allowed"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        <span> Fund Now</span>
      </button>
    </form>
  );
};

export default PaymentForm;
