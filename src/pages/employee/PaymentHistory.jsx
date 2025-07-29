import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../hooks/UseAuth';
import useAxios from '../../hooks/useAxios';

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();

  const {
    isLoading,
    isError,
    error,
    data: payments = [],
  } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`, {
        params: {
          email: user.email,
          status: 'paid',
        },
      });
      return res.data?.payments || res.data;
    },
  });

  if (!user?.email) return <p>Please login to see your payments.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p>No paid payments found for {user.email}.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Month, Year</th>
              <th className="border p-2 text-right">Amount</th>
              <th className="border p-2 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="even:bg-gray-50">
                <td className="border p-2">
                  {p.month}, {p.year}
                </td>
                <td className="border p-2 text-right">${p.amount.toFixed(2)}</td>
                <td className="border p-2">{p._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
