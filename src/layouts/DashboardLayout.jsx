import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

import {
  FaArrowLeft,
  FaChartLine,
  FaHome,
  FaListAlt,
  FaMoneyCheckAlt,
  FaRegClock,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role, isPending } = useUserRole();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  if (isPending) return <div className="p-6">Loading dashboard...</div>;

  // Normalize role to lowercase for safe comparison
  const normalizedRole = role?.toLowerCase();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:z-auto`}
        aria-label="Sidebar navigation"
      >
        <div className="p-4 text-xl font-semibold border-b border-gray-600">Dashboard</div>
        <nav className="p-4 space-y-3" aria-label="Dashboard links">
          {normalizedRole === "employee" && (
            <>
              <Link
                to="/dashboard/home"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaHome /> Home
              </Link>
              <Link
                to="/dashboard/workSheet"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaRegClock /> Work Sheet
              </Link>
              <Link
                to="/dashboard/payments"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaMoneyCheckAlt /> Payment History
              </Link>
            </>
          )}

          {normalizedRole === "hr" && (
            <>
              <Link
                to="/dashboard/home"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaHome /> Home
              </Link>
              <Link
                to="/dashboard/employees"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaUsers /> Employees List
              </Link>
              <Link
                to="/dashboard/progress"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaChartLine /> Progress
              </Link>
            </>
          )}

          {normalizedRole === "admin" && (
            <>
              <Link
                to="/dashboard/home"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaHome /> Home
              </Link>
              <Link
                to="/dashboard/all-employees"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaListAlt /> All Employees
              </Link>
              <Link
                to="/dashboard/payroll"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaMoneyCheckAlt /> Payroll
              </Link>

               <Link
                to="/dashboard/messages"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaMoneyCheckAlt /> Messages
              </Link>
              <Link
                to="/dashboard/manage-admins"
                onClick={handleLinkClick}
                className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
              >
                <FaUserShield /> Manage Admins
              </Link>
            </>
          )}

          {/* Common link */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded transition"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white px-4 py-3 shadow-md flex justify-between items-center sticky top-0 z-10">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Welcome to Dashboard</h1>
          <div aria-hidden="true" />
        </header>

        <main className="p-6 bg-gray-50 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
