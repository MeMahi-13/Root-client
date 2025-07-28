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
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "employee";
    },
  });

  return { role, isPending };
};

export default useUserRole;
