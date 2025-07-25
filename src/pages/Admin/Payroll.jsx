import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Payroll = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/payments`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched payments data:", data);
        setRequests(Array.isArray(data) ? data : data.payments || []);
      })
      .catch((err) => console.error("Failed to fetch payments:", err));
  }, []);

  const handlePay = async (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

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
                    <button className="btn btn-sm btn-success" onClick={() => handlePay(req._id)}>

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
    </div>
  );
};

export default Payroll;
