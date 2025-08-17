import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const PaymentHistory = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
        setEmployeeId(null);
        setPayments([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const fetchUserId = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_BASE_URL}/users/email/${userEmail}`);
        setEmployeeId(res.data._id);
      } catch (err) {
        setError("Failed to load user info.");
        setEmployeeId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [userEmail]);

  useEffect(() => {
    if (!employeeId) return;

    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError(null);
        const paymentsRes = await axios.get(
          `${API_BASE_URL}/payments/user/byEmployeeId?employeeId=${employeeId}`
        );
        setPayments(paymentsRes.data.payments || []);
      } catch (err) {
        setError("Failed to load payment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [employeeId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Payment History</h2>

      {!userEmail && <p>Please log in to view your payment history.</p>}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && payments.length === 0 && userEmail && <p>No payments found.</p>}

      {payments.length > 0 && (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Month</th>
              <th className="p-2 border">Year</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">${p.amount.toFixed(2)}</td>
                <td className="p-2 border">{p.month}</td>
                <td className="p-2 border">{p.year}</td>
                <td className="p-2 border">{p.status}</td>
                <td className="p-2 border">{p.paymentDate || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
