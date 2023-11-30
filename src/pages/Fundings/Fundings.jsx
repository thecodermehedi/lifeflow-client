import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm/PaymentForm";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Fundings = () => {
  return (
    <section className="mx-4 sm:mx-8 lg:mx-28">
      <div className="text-center py-5">
        <h1 className="text-xl text-primary font-bold">Support Our Cause</h1>
        <p className="text-gray-800">
          Your generous funding helps us maintain our services and save more
          lives through blood donation.
        </p>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </section>
  );
};

export default Fundings;
