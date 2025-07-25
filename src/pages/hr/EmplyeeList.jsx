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
    const fetchEmployees = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users?role=employee`);
      const data = await res.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const toggleVerify = async (employee) => {
    const updated = { isVerified: !employee.isVerified };
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${employee._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === employee._id ? { ...emp, isVerified: updated.isVerified } : emp
        )
      );
    }
  };

  const handlePayClick = (employee) => {
    setSelectedEmployee(employee);
    setModalIsOpen(true);
  };

  const handlePaySubmit = async () => {
    const newPayment = {
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
      body: JSON.stringify(newPayment),
    });

    if (res.ok) {
      Swal.fire("Success", "Payment request sent for approval", "success");
      setModalIsOpen(false);
      setMonth("");
      setYear("");
    } else {
      Swal.fire("Error", "Failed to send payment request", "error");
    }
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
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
          <button onClick={() => toggleVerify(emp)}>
            {emp.isVerified ? "✅" : "❌"}
          </button>
        );
      },
    }),
    columnHelper.accessor("bankAccount", {
      header: "Bank Account",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("salary", {
      header: "Salary",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "pay",
      header: "Pay",
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <button
            onClick={() => handlePayClick(emp)}
            className="btn btn-sm btn-primary"
            disabled={!emp.isVerified}
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
            onClick={() => navigate(`/dashboard/details/${encodeURIComponent(emp.email)}`)}
            className="btn btn-sm btn-info"
          >
            Details
          </button>
        );
      },
    }),
  ], []);

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      <table className="table w-full border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2 bg-gray-100">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No employees found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pay Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white max-w-md mx-auto mt-24 p-6 rounded shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start z-50"
      >
        <h3 className="text-xl font-semibold mb-4">Pay {selectedEmployee?.name}</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={selectedEmployee?.salary}
            readOnly
            className="input input-bordered"
          />
          <input
            type="text"
            placeholder="Month (e.g. July)"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input input-bordered"
          />
          <input
            type="number"
            placeholder="Year (e.g. 2025)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input input-bordered"
          />
          <div className="flex justify-end gap-2">
            <button className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handlePaySubmit}>
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeList;
