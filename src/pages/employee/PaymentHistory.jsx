import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import UseAuth from '../../hooks/UseAuth';
import useAxios from '../../hooks/useAxios';

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    isPending,
    data = {},
  } = useQuery({
    queryKey: ['payments', user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user?email=${user.email}&page=${page}&limit=${limit}`);
      return res.data;
    },
    enabled: !!user?.email, // ✅ ensures query only runs when user.email is defined
  });

  const payments = data.payments || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">My Salary Payment History</h2>

      {isPending ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-500 text-center">No payment history available.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Month</th>
                  <th className="border px-4 py-2">Year</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Payment Date</th>
                  <th className="border px-4 py-2">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id}>
                    <td className="border px-4 py-2 capitalize">{p.month}</td>
                    <td className="border px-4 py-2">{p.year}</td>
                    <td className="border px-4 py-2">${Number(p.amount).toFixed(2)}</td>
                    <td className="border px-4 py-2">{p.paymentDate || '—'}</td>
                    <td className="border px-4 py-2">{p._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-4 items-center">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-4 py-1 border rounded bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-4 py-1 border rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
