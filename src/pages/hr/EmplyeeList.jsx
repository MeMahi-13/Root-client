import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";

Modal.setAppElement("#root");

const EmployeeList = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users?role=Employee`)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch(console.error);
  }, []);

  const toggleVerify = async (emp) => {
    const updated = { isVerified: !emp.isVerified };
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${emp._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }
    );

    if (res.ok) {
      setEmployees((prev) =>
        prev.map((e) =>
          e._id === emp._id ? { ...e, isVerified: updated.isVerified } : e
        )
      );
    } else {
      Swal.fire("Error", "Failed to update verification", "error");
    }
  };

  const handlePayClick = (emp) => {
    setSelectedEmployee(emp);
    setMonth("");
    setYear("");
    setModalIsOpen(true);
  };

  const handlePaySubmit = async () => {
    if (!month || !year) {
      return Swal.fire("Error", "Month and Year required", "error");
    }

    const payload = {
      employeeId: selectedEmployee._id,
      email: selectedEmployee.email,
      amount: selectedEmployee.salary,
      month,
      year,
      status: "pending",
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      Swal.fire("Success", "Payment request sent", "success");
      setModalIsOpen(false);
    } else {
      Swal.fire("Error", "Failed to send payment", "error");
    }
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "verified",
        header: "Verified",
        cell: ({ row }) => {
          const emp = row.original;
          return (
            <button
              className="text-xl"
              onClick={() => toggleVerify(emp)}
              title="Toggle verification"
            >
              {emp.isVerified ? "✅" : "❌"}
            </button>
          );
        },
      }),
      columnHelper.accessor("bank_account_no", {
        header: "Bank Account",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("salary", {
        header: "Salary",
        cell: (info) => `$${info.getValue()}`,
      }),
      columnHelper.display({
        id: "pay",
        header: "Pay",
        cell: ({ row }) => {
          const emp = row.original;
          return (
            <button
              disabled={!emp.isVerified}
              onClick={() => handlePayClick(emp)}
              className={`btn btn-sm ${
                emp.isVerified ? "btn-primary bg-green-400 px-6 py-2 rounded-md hover:shadow-md hover:shadow-gray-400 cursor:pointer" : "btn-disabled cursor-not-allowed opacity-50"
              }`}
              title={emp.isVerified ? "Pay Employee" : "Verify employee to enable payment"}
            >
              Pay
            </button>
          );
        },
      }),
      columnHelper.display({
        id: "details",
        header: "Details",
        cell: ({ row }) => {
          const emp = row.original;
          return (
            <button
              className="btn btn-sm btn-info"
              onClick={() =>
                navigate(`/dashboard/details/${encodeURIComponent(emp.email)}`)
              }
              title="View Details"
            >
              Details
            </button>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: employees || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row._id,
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Employee List</h2>
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="border border-gray-300 px-5 py-3 text-left font-semibold text-gray-700"
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No employees found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border border-gray-300 px-5 py-3 align-middle"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pay Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white max-w-md mx-auto mt-24 p-6 rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start z-50"
      >
        <h3 className="text-2xl font-semibold mb-5">Pay {selectedEmployee?.name}</h3>
        <div className="flex flex-col gap-4">
          <label className="font-medium">Salary</label>
          <input
            readOnly
            value={`$${selectedEmployee?.salary || ""}`}
            className="input input-bordered mb-2"
          />
          <label className="font-medium">Month</label>
          <input
            type="text"
            placeholder="Month (e.g. July)"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input input-bordered"
          />
          <label className="font-medium">Year</label>
          <input
            type="number"
            placeholder="Year (e.g. 2025)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input input-bordered"
          />
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="btn btn-secondary px-5 py-2 rounded-md"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary px-5 py-2 rounded-md"
              onClick={handlePaySubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeList;
