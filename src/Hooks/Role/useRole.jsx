import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import useAuth from "../UseAuth/useAuth";



const useRole = () => {
    const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`)
      return data.role
    },
  })

  return [role, isLoading]
};

export default useRole;