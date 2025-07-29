import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const EmployeeDetails = () => {
  const { slug } = useParams();
  const [employee, setEmployee] = useState(null);
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch both employee details and salary chart
    const fetchData = async () => {
      try {
        const encodedSlug = encodeURIComponent(slug);
       const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/${encodedSlug}`);
const salaryRes = await axios.get(`${import.meta.env.VITE_API_URL}/salary-chart/${encodedSlug}`);
        setEmployee(userRes.data);
        setSalaryData(
          salaryRes.data.map((item) => ({
            monthYear: `${item.month}-${item.year}`,
            salary: item.salary,
          }))
        );
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!employee) return <p className="text-center mt-10">Employee not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <img
          src={employee.photoURL}
          alt={employee.name}
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <div>
          <h2 className="text-3xl font-semibold">{employee.name}</h2>
          <p className="text-gray-600">{employee.designation}</p>
          <p className="text-sm text-gray-500">{employee.email}</p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Salary History</h3>
      <div className="w-full h-96 bg-white rounded-xl shadow p-4">
       <ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={salaryData}
    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
    <XAxis
      dataKey="monthYear"
      angle={-35}
      textAnchor="end"
      interval={0}
      height={60}
      tick={{ fontSize: 12, fill: "#334155" }}
      label={{
        value: 'Month-Year',
        position: 'insideBottom',
        dy: 45,
        style: { fill: '#475569', fontSize: 14 },
      }}
    />
    <YAxis
      tick={{ fontSize: 12, fill: "#334155" }}
      label={{
        value: 'Salary (BDT)',
        angle: -90,
        position: 'insideLeft',
        dx: -10,
        style: { fill: '#475569', fontSize: 14 },
      }}
    />
    <Tooltip
      contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
      labelStyle={{ fontSize: 13, color: "#1f2937" }}
      itemStyle={{ fontSize: 13, color: "#1f2937" }}
    />
    <Legend
      wrapperStyle={{
        fontSize: 13,
        color: "#475569",
        paddingTop: 10,
      }}
    />
    <Bar
      dataKey="salary"
      fill="#6366f1"
      radius={[8, 8, 0, 0]}
      barSize={40}
      name="Monthly Salary"
    />
  </BarChart>
</ResponsiveContainer>

      </div>
    </div>
  );
};

export default EmployeeDetails;
