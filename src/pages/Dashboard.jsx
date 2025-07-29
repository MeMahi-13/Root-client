import SalesChart from "./SalesChartDemo";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
     
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Welcome Back, User!</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">Notifications</button>
            <button className="text-gray-600">Settings</button>
            <button className="text-gray-600">Profile</button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Total Users</h3>
            <p className="text-3xl font-bold">1,245</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Revenue</h3>
            <p className="text-3xl font-bold">$12,345</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Bookings</h3>
            <p className="text-3xl font-bold">6,278</p>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
          <SalesChart/>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
