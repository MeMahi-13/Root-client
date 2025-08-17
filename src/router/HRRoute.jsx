import UseAuth from '../hooks/UseAuth';
import useUserRole from '../hooks/useUserRole';
import Forbidden from '../pages/others/Forbidden';

const HRRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isPending } = useUserRole();

  if (loading || isPending) return <p>Loading...</p>;

  if (user && role === 'HR') {
    return children;
  }

  return <Forbidden />;
};

export default HRRoute;
