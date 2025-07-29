import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EmployeeDetails = () => {
  const { slug } = useParams(); // slug is the employee email
  const [employee, setEmployee] = useState(null);
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const encoded = encodeURIComponent(slug);

        // 1. Get user info
        const res1 = await axios.get(`${import.meta.env.VITE_API_URL}/users/email/${encoded}`);
        setEmployee(res1.data);

        // 2. Get salary chart data
        const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/salary-chart/${encoded}`);
        const chartData = res2.data.map((item) => ({
          monthYear: `${item.month} ${item.year}`,
          amount: item.amount,
        }));

        setSalaryData(chartData);
      } catch (err) {
        console.error("Error fetching employee detail/chart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!employee) return <p className="text-center mt-10">Employee not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <img
          src={employee.photoURL}
          alt={employee.name}
          className="w-32 h-32 rounded-full object-cover shadow"
        />
        <div>
          <h2 className="text-3xl font-semibold">{employee.name}</h2>
          <p className="text-gray-600">{employee.designation}</p>
          <p className="text-sm text-gray-500">{employee.email}</p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Salary History</h3>
      {salaryData.length > 0 ? (
        <div className="w-full h-96 bg-white rounded-xl shadow p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthYear" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#4f46e5" name="Salary (BDT)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No paid salary data yet.</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
