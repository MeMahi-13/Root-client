import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const Progress = () => {
  const axiosSecure = useAxios();
  const [entries, setEntries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const months = [
    "2025-01", "2025-02", "2025-03", "2025-04", "2025-05",
    "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12"
  ];

  useEffect(() => {
    // Fetch employee data from the 'users' database
    axiosSecure.get("/users?role=employee").then((res) => {
      setEmployees(res.data);
    });
  }, [axiosSecure]);

  useEffect(() => {
    // Construct query parameters based on selected filters
    let query = "";
    if (selectedEmail) query += `email=${selectedEmail}&`;
    if (selectedMonth) query += `month=${selectedMonth}`;

    // Fetch work entries from the 'work' database
    axiosSecure.get(`/work-entries?${query}`).then((res) => {
      setEntries(res.data);
    });
  }, [selectedEmail, selectedMonth, axiosSecure]);

  // Function to get employee name by email
 const getEmployeeName = (email) => {
  if (!email) return "Unknown";
  const employee = employees.find(emp => emp.email.toLowerCase() === email.toLowerCase());
  return employee ? employee.name : "Unknown";
};


  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Work Progress</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="select select-bordered"
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp.email}>{emp.name}</option>
          ))}
        </select>

        <select
          className="select select-bordered"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {months.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <table className="table w-full border">
        <thead>
          <tr>
            <th className="border px-3 py-2">Employee</th>
            <th className="border px-3 py-2">Task</th>
            <th className="border px-3 py-2">Hours</th>
            <th className="border px-3 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">No records found</td>
            </tr>
          ) : (
            entries.map((entry, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-2">{getEmployeeName(entry.email)}</td>
                <td className="border px-3 py-2">{entry.task}</td>
                <td className="border px-3 py-2">{entry.hoursWorked}</td>
                <td className="border px-3 py-2">{new Date(entry.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Progress;
