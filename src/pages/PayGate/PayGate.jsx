import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Load Stripe public key securely from env file
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PayGate = ({ amount, paymentId, onSuccess, onClose }) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={amount}
          paymentId={paymentId}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </Elements>
    </div>
  );
};

export default PayGate;
