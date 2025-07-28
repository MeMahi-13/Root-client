const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">403 Forbidden</h1>
        <p className="text-gray-700 mt-4">You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Forbidden;
