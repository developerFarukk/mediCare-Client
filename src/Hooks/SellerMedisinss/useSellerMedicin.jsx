import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import useAuth from "../UseAuth/useAuth";



const useSellerMedicin = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();


    const { data: sellermedicin = [], refetch } = useQuery({
        queryKey: ['medicins', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicins?sellerEmail=${user?.email}`);
            return res.data;
        }
    })
    return [ sellermedicin, refetch ]
};

export default useSellerMedicin;