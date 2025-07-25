import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-screen w-64 bg-gray-800 text-white transform 
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:z-auto
        `}
      >
        <div className="p-4 text-xl font-semibold border-b border-gray-600">Dashboard</div>
        <nav className="p-4 space-y-3">
          <Link onClick={handleLinkClick} to="/dashboard" className="block hover:bg-gray-700 p-2 rounded">Home</Link>
          <Link onClick={handleLinkClick} to="/dashboard/workSheet" className="block hover:bg-gray-700 p-2 rounded">Work Sheet</Link>
          <Link onClick={handleLinkClick} to="/dashboard/payments" className="block hover:bg-gray-700 p-2 rounded">Payment History</Link>
          <Link onClick={handleLinkClick} to="/dashboard/employees" className="block hover:bg-gray-700 p-2 rounded">Employees List</Link>
           <Link onClick={handleLinkClick} to="/dashboard/progress" className="block hover:bg-gray-700 p-2 rounded">Progress</Link>

             <Link onClick={handleLinkClick} to="/dashboard/all-employees" className="block hover:bg-gray-700 p-2 rounded">All Employees</Link>
               <Link onClick={handleLinkClick} to="/dashboard/payroll" className="block hover:bg-gray-700 p-2 rounded">Payroll</Link>
          <Link onClick={handleLinkClick} to="/" className="block hover:bg-gray-700 p-2 rounded">Back to Home</Link>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* ✅ Top Navbar */}
        <header className="bg-gray-100 px-4 py-3 flex items-center justify-between shadow-md">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-800 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Welcome to Dashboard</h1>
        </header>

        {/* ✅ Page Content */}
        <main className="p-6 bg-gray-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
