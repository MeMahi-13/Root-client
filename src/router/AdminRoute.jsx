import { useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import useUserRole from "../hooks/useUserRole";
import Forbidden from "../pages/others/Forbidden"; // 👈 import it

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isPending } = useUserRole();
  const location = useLocation();

  if (loading || isPending) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  if (user && role === "admin") {
    return children;
  }

  // Show Forbidden instead of redirect
  return <Forbidden />;
};

export default AdminRoute;
