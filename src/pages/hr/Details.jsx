import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useAxios from "../../hooks/useAxios";

const Details = () => {
  const { slug } = useParams();
  const axiosSecure = useAxios();

  // Fetch user info
  const { data: user = {}, isLoading: userLoading } = useQuery({
    queryKey: ["userDetails", slug],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data.find((u) => u.email === slug || u.uid === slug) || {};
    },
    enabled: !!slug,
  });

  // Fetch salary chart data
  const { data: salaryData = [], isLoading: salaryLoading } = useQuery({
    queryKey: ["salaryChart", slug],
    queryFn: async () => {
      const res = await axiosSecure.get(`/salary-chart/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  if (userLoading || salaryLoading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <img
          src={user.photoURL || "https://via.placeholder.com/120"}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.designation || "No designation found"}</p>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Salary History</h3>
      {salaryData.length === 0 ? (
        <p>No salary data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={(entry) => `${entry.month}/${entry.year}`} />
            <YAxis label={{ value: 'Salary ($)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Details;
