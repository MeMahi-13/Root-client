import { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";

const PAGE_SIZE = 5;
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const PaymentHistory = () => {
  const { user } = UseAuth();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async (pageNum = 1) => {
    if (!user?.email) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payments?email=${user.email}&page=${pageNum}&limit=${PAGE_SIZE}`
      );
      const data = await res.json();

      if (pageNum === 1) {
        setPayments(data.payments);
      } else {
        setPayments((prev) => [...prev, ...data.payments]);
      }
      setTotal(data.total);
    } catch (err) {
      console.error("Failed to fetch payments", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments(1);
  }, [user?.email]);

  const loadMore = () => {
    if (payments.length >= total) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPayments(nextPage);
  };

  const formatMonth = (month) => {
    if (typeof month === "number") return monthNames[month - 1];
    const index = monthNames.findIndex(
      (m) => m.toLowerCase() === month.toLowerCase().slice(0, 3)
    );
    return index >= 0 ? monthNames[index] : month;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Salary Payment History</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">Month, Year</th>
            <th className="border px-3 py-2">Amount</th>
            <th className="border px-3 py-2">Transaction ID</th>
            <th className="border px-3 py-2">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No payment history available.
              </td>
            </tr>
          ) : (
            payments.map(({ _id, month, year, amount, transactionId, paymentDate }) => (
              <tr key={_id || transactionId}>
                <td className="border px-3 py-2">{`${formatMonth(month)} ${year}`}</td>
                <td className="border px-3 py-2">${Number(amount).toFixed(2)}</td>
                <td className="border px-3 py-2">{transactionId || "—"}</td>
                <td className="border px-3 py-2">{formatDate(paymentDate)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {payments.length < total && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
