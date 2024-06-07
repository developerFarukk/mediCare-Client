import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axiospablic/useAxiosPublic";



const useMediAll = () => {
    const axiosPublic = useAxiosPublic();

    const { refetch, data: medicinAll = [] } = useQuery({
        queryKey: ['medicin', ],
        queryFn: async () => {
            const res = await axiosPublic.get('/medicin')
            return res.data;
        }

    })


    return [medicinAll, refetch]
};

export default useMediAll;