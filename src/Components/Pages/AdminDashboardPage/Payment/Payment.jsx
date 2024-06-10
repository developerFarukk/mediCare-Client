import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const Payment = () => {

    const axiosSecure = useAxiosSecure();

    const { data: payment = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment',
            );
            return res.data;
        }
    })


    // Status fantionality
    const handleStatus = pay => {
        axiosSecure.patch(`/payment/status/${pay._id}`, { status: 'Paid' })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${pay.name} payment has been paid `,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    console.log(payment);

    return (
        <div>

            {/* Dynamic Title section */}
            <div>
                <Helmet>
                    <title> Payment Menegment | MediCare</title>
                </Helmet>
            </div>

            <div>
                <div className="">
                    <div className="flex justify-evenly my-4">
                        {/* <h2 className="text-3xl">All Users</h2> */}
                        <h2 className="text-3xl">Total Payment: {payment.length}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table  w-full">
                            {/* head */}
                            <thead className="bg-green-300">
                                <tr className="text-black">
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Invoice ID</th>
                                    <th>Date</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    payment.map((pay, index) => <tr className="hover:bg-blue-200 " key={pay._id}>
                                        <th>{index + 1}</th>
                                        <td>{pay.name}</td>
                                        <td>{pay.email}</td>
                                        <td>{pay._id}</td>
                                        <td>{new Date(pay.date).toLocaleDateString()}</td>

                                        <td className="text-center">
                                            {/* <button className="btn btn-sm  bg-red-800 rounded-full"><p>{pay.status}</p></button> */}
                                            {pay.status === 'Paid' ? 'Paid' : <button
                                                onClick={() => handleStatus(pay)}
                                                className="btn btn-sm border-none bg-red-800 rounded-full">
                                                {pay.status}
                                            </button>}
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

export default Payment;