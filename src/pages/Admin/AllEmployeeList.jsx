import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const AllEmployeeList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFireModalOpen, setIsFireModalOpen] = useState(false);
  const [salaryEdits, setSalaryEdits] = useState({});
  const [viewMode, setViewMode] = useState("table");

  // Fetch verified users (employees + HRs)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users?isVerified=true`
        );
        const data = await res.json();
        setUsers(data);
        const initialSalaries = {};
        data.forEach((u) => (initialSalaries[u._id] = u.salary));
        setSalaryEdits(initialSalaries);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  const openFireModal = (user) => {
    setSelectedUser(user);
    setIsFireModalOpen(true);
  };

  const fireUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${selectedUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isFired: true }),
        }
      );
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === selectedUser._id ? { ...u, isFired: true } : u
          )
        );
        Swal.fire("Fired!", `${selectedUser.name} has been fired.`, "success");
      } else {
        throw new Error("Failed to fire user");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to fire user", "error");
    } finally {
      setIsFireModalOpen(false);
      setSelectedUser(null);
    }
  };

  const makeHR = async (user) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "hr" }),
        }
      );
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === user._id ? { ...u, role: "hr" } : u
          )
        );
        Swal.fire("Success", `${user.name} is now HR.`, "success");
      } else {
        throw new Error("Failed to update role");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to update role", "error");
    }
  };

  const handleSalaryChange = (userId, value) => {
    setSalaryEdits((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  const updateSalary = async (user) => {
    const newSalary = parseFloat(salaryEdits[user._id]);
    const currentSalary = parseFloat(user.salary);

    if (isNaN(newSalary) || newSalary <= currentSalary) {
      return Swal.fire(
        "Error",
        "New salary must be greater than current salary",
        "error"
      );
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salary: newSalary }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === user._id ? { ...u, salary: newSalary } : u
          )
        );
        Swal.fire("Success", `Salary increased for ${user.name}`, "success");
      } else {
        throw new Error("Failed to update salary");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to update salary", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Verified Employees & HRs</h2>
        <button
          className="btn btn-sm btn-info"
          onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
        >
          Switch to {viewMode === "table" ? "Card View" : "Table View"}
        </button>
      </div>

      {/* ====================== TABLE VIEW ===================== */}
      {viewMode === "table" ? (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Salary</th>
              <th className="border px-4 py-2">Make HR</th>
              <th className="border px-4 py-2">Fire</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No verified users found.
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user._id} className={user.isFired ? "opacity-50" : ""}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.designation || "N/A"}</td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2 flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    className="input input-sm input-bordered w-24"
                    value={salaryEdits[user._id] || ""}
                    onChange={(e) =>
                      handleSalaryChange(user._id, e.target.value)
                    }
                    disabled={user.isFired}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => updateSalary(user)}
                    disabled={user.isFired}
                  >
                    Update
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  {user.role === "Employee" && !user.isFired ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => makeHR(user)}
                    >
                      Promote to HR
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  {user.isFired ? (
                    <span className="text-red-600 font-semibold">Fired</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => openFireModal(user)}
                    >
                      Fire
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // ====================== CARD GRID VIEW =====================
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className={`border p-4 rounded shadow ${user.isFired ? "opacity-50" : ""}`}
            >
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-sm">Designation: {user.designation || "N/A"}</p>
              <p className="text-sm capitalize">Role: {user.role}</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  className="input input-sm input-bordered w-24"
                  value={salaryEdits[user._id] || ""}
                  onChange={(e) => handleSalaryChange(user._id, e.target.value)}
                  disabled={user.isFired}
                />
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => updateSalary(user)}
                  disabled={user.isFired}
                >
                  Update
                </button>
              </div>
              {user.role === "employee" && !user.isFired && (
                <button
                  className="btn btn-sm btn-success mt-2"
                  onClick={() => makeHR(user)}
                >
                  Make HR
                </button>
              )}
              <div className="mt-2">
                {user.isFired ? (
                  <span className="text-red-600 font-semibold">Fired</span>
                ) : (
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => openFireModal(user)}
                  >
                    Fire
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= Fire Confirmation Modal ================= */}
      <Modal
        isOpen={isFireModalOpen}
        onRequestClose={() => setIsFireModalOpen(false)}
        className="bg-white max-w-md mx-auto mt-24 p-6 rounded shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start z-50"
      >
        <h3 className="text-xl font-semibold mb-4">Confirm Fire Employee</h3>
        <p className="mb-6">
          Are you sure you want to fire <strong>{selectedUser?.name}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button className="btn btn-secondary" onClick={() => setIsFireModalOpen(false)}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={fireUser}>
            Fire
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AllEmployeeList;
