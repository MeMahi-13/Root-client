import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const MakeAdmin = () => {
  const axiosSecure = useAxios();
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setAllUsers(res.data || []);
    });
  }, [axiosSecure]);

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}`, { role: "admin" });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "User promoted to Admin!", "success");
        setAllUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: "admin" } : user
          )
        );
      }
    } catch (err) {
      console.error("Failed to promote:", err);
      Swal.fire("Error", "Failed to make user admin", "error");
    }
  };

  // 🔍 Filter users by email search
  const filteredUsers = allUsers.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>

      <input
        type="text"
        placeholder="Search by email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role || "employee"}</td>
                <td className="border px-4 py-2 text-center">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm bg-blue-600 text-white"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
