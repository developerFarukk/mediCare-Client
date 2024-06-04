import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import useAuth from "../UseAuth/useAuth";




const useMedicinCard = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: shop = [] } = useQuery({
        queryKey: ['shop', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/shop?email=${user.email}`)
            return res.data;
        }

    })


    return [shop, refetch]
};

export default useMedicinCard;