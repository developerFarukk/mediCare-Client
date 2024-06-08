import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../../../Hooks/UseAuth/useAuth";



const UserPayment = () => {


    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();


    const { data: userPayment = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    })

    console.log(userPayment);


    return (
        <div>
            <div>
                <div className="">
                    <div className="flex justify-evenly my-4">
                        {/* <h2 className="text-3xl">All Users</h2> */}
                        <h2 className="text-3xl">Total Payment: {userPayment.length}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL No</th>
                                    <th>Transaction ID</th>
                                    <th>Invoice ID</th>
                                    <th>Date</th>
                                    <th className="text-right">Price</th>
                                    <th className="">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userPayment.map((pay, index) => <tr key={pay._id}>
                                        <th>{index + 1}</th>
                                        <td>{pay.transactionId}</td>
                                        <td>{pay._id}</td>
                                        <td>{new Date(pay.date).toLocaleDateString()}</td>
                                        <td className="text-right">$ {pay.price}</td>

                                        <td>
                                            {/* <button className="btn btn-sm  bg-red-800 rounded-full"><p>{pay.status}</p></button> */}
                                            <button
                                                className="btn btn-sm bg-blue-100 rounded-full">
                                                {pay.status}
                                            </button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPayment;