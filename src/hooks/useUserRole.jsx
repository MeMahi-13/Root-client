import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxios from './useAxios';

const useUserRole = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxios();

  const { data: role = "", isPending } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      const found = res.data?.find(u => u.email === user.email);
      return found?.role || "employee";
    },
  });

  return { role, isPending };
};

export default useUserRole;
