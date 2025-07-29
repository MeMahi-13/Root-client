import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { paymentId } = useParams();
    const { user } = UseAuth();
    const axiosSecure = useAxios();
    const navigate = useNavigate(); // ✅ added for navigation

    const [error, setError] = useState('');

    const { isPending, data: paymentInfo = {} } = useQuery({
        queryKey: ['payments', paymentId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${paymentId}`);
            return res.data;
        }
    });

    if (isPending) return;

    const amount = paymentInfo.amount;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            paymentId
        });
        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                }
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            console.log('✅ Payment succeeded!');

            try {
                await axiosSecure.patch(`/payments/${paymentId}`);
                // ✅ Show success alert and navigate
                Swal.fire({
                    title: 'Payment Successful!',
                    text: 'Salary payment has been completed.',
                    icon: 'success',
                    confirmButtonText: 'Go to Payroll',
                    confirmButtonColor: '#10B981'
                }).then(() => {
                    navigate('/dashboard/payroll');
                });
            } catch (err) {
                console.error("Failed to update payment status:", err);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded" />
                <button
                    type='submit'
                    disabled={!stripe}
                    className="btn btn-primary bg-green-500 text-white rounded-full p-2 w-full"
                >
                    Pay ${amount}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;