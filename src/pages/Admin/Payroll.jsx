import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CheckoutForm from "../PayGate/CheckoutForm"; // import from step 2

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payroll = () => {
  const [requests, setRequests] = useState([]);
  const [payingId, setPayingId] = useState(null); // payment id being paid

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/payments`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(Array.isArray(data) ? data : data.payments || []);
      })
      .catch((err) => console.error("Failed to fetch payments:", err));
  }, []);

  const handlePaymentSuccess = async (id) => {
    // Update backend to mark payment as paid
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/${id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        const today = new Date().toISOString().split("T")[0];
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: "paid", paymentDate: today } : req
          )
        );
      } else {
        Swal.fire("Error", "Failed to update payment status", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Payment update request failed", "error");
    }
  };

  // Show payment modal
  const openPaymentModal = (id) => setPayingId(id);
  const closePaymentModal = () => setPayingId(null);

  const payingRequest = payingId ? requests.find((r) => r._id === payingId) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Payroll Requests</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Payment Date</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(requests) && requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req._id}>
                <td className="border px-4 py-2">{req.employeeName || "N/A"}</td>
                <td className="border px-4 py-2">{req.email || "N/A"}</td>
                <td className="border px-4 py-2">{`$${Number(req.amount || 0).toFixed(2)}`}</td>
                <td className="border px-4 py-2 capitalize">{req.month || "N/A"}</td>
                <td className="border px-4 py-2">{req.year || "N/A"}</td>
                <td className="border px-4 py-2 capitalize">{req.status || "pending"}</td>
                <td className="border px-4 py-2">{req.status === "paid" ? req.paymentDate || "—" : "—"}</td>
                <td className="border px-4 py-2 text-center">
                  {req.status === "paid" ? (
                    <button className="btn btn-sm btn-disabled" disabled>
                      Paid
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-success" onClick={() => openPaymentModal(req._id)}>
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No payroll records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Payment Modal */}
      {payingRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded max-w-md w-full relative">
            <button
              onClick={closePaymentModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">
              Pay {payingRequest.employeeName || "Employee"} - ${Number(payingRequest.amount).toFixed(2)}
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={Number(payingRequest.amount)}
                paymentId={payingRequest._id}
                onSuccess={handlePaymentSuccess}
                onClose={closePaymentModal}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
